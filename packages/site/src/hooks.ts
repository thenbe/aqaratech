import { dev } from '$app/env';
import { environment } from '$environment';
import { getUser } from '$lib/server/utils/get-user';
import { validateToken } from '$lib/server/utils/validate';
import type { ResponseError } from '@self/sdk';
import * as Sentry from '@sentry/node';
import type {
	ExternalFetch,
	GetSession,
	Handle,
	HandleError,
} from '@sveltejs/kit';
import { parse, serialize } from 'cookie';

if (
	process.env.VERCEL_ENV === 'production' ||
	process.env.VERCEL_ENV === 'preview'
) {
	Sentry.init({
		dsn: 'https://9b3cb0c95789401ea34643252fed4173@o1210217.ingest.sentry.io/6345874',
		tracesSampleRate: 0.25,
		release: import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA ?? 'localServerRelease',
		environment: process.env.VERCEL
			? process.env.VERCEL_GIT_COMMIT_REF
			: 'localServer',
		debug: dev,
	});
}

export const getSession: GetSession = async ({ locals }) => {
	let isAuthenticated = false;
	if (locals.idToken) {
		try {
			await validateToken(locals.idToken, 'idToken'); // TODO ensure this throws if it fails
			isAuthenticated = true;
		} catch (e) {
			console.error(e);
			Sentry.captureException(e);
		}
	}
	return {
		user: locals.user,
		accessToken: locals.accessToken,
		// TODO remove xRoleId and use user.role.id instead.
		// Ensure it persists role changes. Works for new signups.
		// also change in layout/rolechange endpoint/and api.ts
		isAuthenticated,
	};
};

export const handle: Handle = async ({ event, resolve }) => {
	const now = Date.now();
	const method = event.request.method;
	console.log(
		`${new Date().toISOString()} Request: ${method} ${event.url.href}: ${
			event.routeId
		} ${event.request.headers.get('user-agent')}`,
	);

	// TODO cast cookie type to avoid typos. OpenApi Auth0 type?
	const cookies = parse(event.request.headers.get('cookie') || '');
	const user = await getUser({
		token: cookies.accessToken,
		selectedRoleId: cookies.xRoleId,
	});

	event.locals.idToken = cookies.idToken || '';
	event.locals.accessToken = cookies.accessToken || '';
	event.locals.user = user;

	// Place `xRoleId` in locals for it be picked up after `resolve` has been called.
	// After `resolve` is called, xRoleId is serialized into a cookie to persist the role change.
	// Additionally, if the user never changes roles,
	// this will take care of setting & persisting the default role.
	event.locals.xRoleId = user?.role.id || '';

	const response = await resolve(event);
	console.log(
		`${new Date().toISOString()} Response: ${Date.now() - now}ms - ${method} ${
			event.url.pathname
		} ${response.status} - ${event.request.headers.get('user-agent')} - ${
			event.locals.user?.email
		}`,
	);

	response.headers.append(
		'Set-Cookie',
		serialize('idToken', event.locals.idToken, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	response.headers.append(
		'Set-Cookie',
		serialize('accessToken', event.locals.accessToken, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	response.headers.append(
		'Set-Cookie',
		serialize('xRoleId', event.locals.xRoleId, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	if (environment.envName !== 'prod') {
		response.headers.set('X-Robots-Tag', 'noindex'); // TODO remove in prod
	}
	return response;
};

export const handleError: HandleError = async ({ error, event }) => {
	console.error(error);
	const { locals, params } = event;
	const details = {
		name: 'handleError',
		url: event.url.href,
		locals,
		params,
	};
	console.error(details);

	const thrown = error as Error | ResponseError;
	const res = 'response' in thrown ? thrown.response : undefined;
	if (res) {
		const body = await res.json();
		const resDetails = {
			name: 'Response Error (from handleError)',
			status: res.status,
			url: res.url,
			body,
		};
		console.error(resDetails);
	}

	const user = event.locals.user;
	Sentry.captureException(error, {
		user: {
			id: user?.id || '',
			email: user?.email || '',
			username: user?.fullName || '',
		},
	});
};

export const externalFetch: ExternalFetch = async (request) => {
	const basePath = import.meta.env.VITE_API_URL;
	const newPath = import.meta.env.VITE_API_URL_LOCAL;

	if (basePath && newPath && request.url.startsWith(basePath)) {
		request = new Request(request.url.replace(basePath, newPath), request);
	}

	return fetch(request);
};
