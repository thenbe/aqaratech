import type { createTRPCHandle } from '$lib/server/trpc';
import type { RequestEvent } from '@sveltejs/kit/types/private';
import * as jose from 'jose';
import {
	router as trpcRouter,
	TRPCError,
	type inferAsyncReturnType,
} from '@trpc/server';

type TRPCHandler = Parameters<typeof createTRPCHandle>;
type ResponseMetaFn = NonNullable<TRPCHandler[0]['responseMeta']>;

interface Auth0UserMeta {
	userMetadata: {
		idInternal?: string;
	};
}

export const createContext = async (event: RequestEvent) => {
	return {
		user: event.locals.user,
		rawAccessToken: event.locals.accessToken,
	};
};

export type Context = inferAsyncReturnType<typeof createContext>;

export const createRouter = () => {
	return trpcRouter<Context>().middleware(async ({ ctx, next }) => {
		if (!ctx.rawAccessToken) {
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}
		try {
			// TODO use .env
			const JWKS = jose.createRemoteJWKSet(
				new URL('https://dev-eehvhdp2.eu.auth0.com/.well-known/jwks.json'),
			);
			const { payload } = await jose.jwtVerify(ctx.rawAccessToken, JWKS, {
				audience: 'letand.be/api',
				issuer: 'https://dev-eehvhdp2.eu.auth0.com/',
				algorithms: ['RS256'],
			});
			const accessToken = {
				...payload,
				roles: payload['https://letand.be/roles'] as string[],
				userMetadata: payload[
					'https://letand.be/userMetadata'
				] as Auth0UserMeta['userMetadata'],
			};
			console.log({ accessToken }, 'config.ts ~ 50');
			return next({
				ctx: {
					...ctx,
					accessToken,
				},
			});
		} catch (err) {
			// TODO remove in prod
			console.log({ err }, 'config.ts ~ 42');
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}
	});
};

export const responseMeta: ResponseMetaFn = ({ type, errors, paths }) => {
	const charts = paths?.every((path) => path.startsWith('charts'));
	if (type === 'query' && errors.length === 0 && charts) {
		// TODO review caching, charts and others
		const duration = 60 * 10;
		return {
			headers: {
				'cache-control': `max-age=10, stale-while-revalidate=${duration}, private`,
			},
		};
	} else {
		return {};
	}
};
