import * as Sentry from '@sentry/svelte';

import { ResponseError } from '$api/openapi';

import type { HandleClientError } from '@sveltejs/kit';

export const handleError = (({ error, event }) => {
	console.log({ error });

	if (error instanceof ResponseError) {
		Sentry.captureEvent(
			{
				level: 'error',
				message: error.message,
				tags: {
					status: error.response.status,
					routeId: event.route.id,
					pathname: event.url.pathname,
				},
				request: {
					url: event.url.href,
					query_string: event.url.search,
				},
			},
			{
				originalException: error,
			},
		);

		return {
			message: error.response.statusText || 'An error occurred',
			status: error.response.status,
		};
	} else {
		Sentry.captureException(error, {
			tags: {
				routeId: event.route.id,
				pathname: event.url.pathname,
			},
			extra: {
				href: event.url.href,
				params: event.params,
				query_string: event.url.search,
			},
			requestSession: {
				status: 'errored',
			},
		});

		return;
	}
}) satisfies HandleClientError;
