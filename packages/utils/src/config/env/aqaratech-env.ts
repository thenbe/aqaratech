import type { Object } from 'ts-toolbelt';

export interface AqaratechEnv {
	readonly PUBLIC_AQARATECH_ENV:
		| 'production'
		| 'development'
		| 'staging'
		| 'testing';

	// URL's

	readonly ORIGIN: string;

	/**
	 * The current url origin where the site is hosted.
	 * In development, this could be `http://localhost:3000`.
	 * In a docker environment behind a reverse proxy, this could be something like: `https://aqar.live`,
	 * Handles production, vercel previews, and local dev.
	 * Returns a preview branch's dedicated domain if it exists `https://stage.letand.be`,
	 * otherwise return the deployment domain  `https://my-site-7q03y4pi5.vercel.app`.
	 */
	readonly PUBLIC_SITE_URL: string;

	/**
	 * Api url reachable from the client.
	 * In development, this could be `http://localhost:3002`.
	 * In a docker environment behind a reverse proxy, this could be something like: `https://aqar.live/api`,
	 * where the reverse proxy strips the `/api` path and forwards the request to the backend.
	 * Doing so allows us to avoid a preflight requests and serve both site and api from the same origin.
	 */
	readonly PUBLIC_API_URL: string;

	/**
	 * Api url reachable from the server. Used to access the api from the svelte-kit server.
	 * In development, this could be `http://backend:3002` since both site and backend are on the same docker compose network.
	 * In production, this could be the same as PUBLIC_API_URL.
	 *
	 * From: https://kit.svelte.dev/docs/hooks#externalfetch
	 *
	 * For example, your load function might make a request to a public URL like https://api.yourapp.com when the user performs a client-side navigation to the respective page, but during SSR it might make sense to hit the API directly (bypassing whatever proxies and load balancers sit between it and the public internet).
	 */
	readonly PUBLIC_API_URL_LOCAL: string;

	// Prisma
	readonly DATABASE_URL: string;

	// Auth0
	readonly AUTH0_CLIENT_SECRET: string;

	// Logtail
	readonly LOGTAIL_TOKEN?: string | undefined;

	// Postmark
	readonly POSTMARK_TOKEN?: string | undefined;

	// R2
	readonly R2_ACCOUNT_ID: string;
	readonly R2_ACCESS_KEY_ID: string;
	readonly R2_SECRET_ACCESS_KEY: string;

	// Sentry
	/**
	 * Master toggle for enabling/disabling sentry.
	 * True by default. Set to `0` to disable.
	 */
	readonly PUBLIC_AQ_ENABLE_SENTRY: boolean;
	readonly PUBLIC_TRACE_RATE: number;

	// MeiliSearch
	readonly MEILISEARCH_HOST: string;
	readonly MEILISEARCH_API_KEY: string;

	// Optional: https://github.com/colinhacks/zod/issues/980#issuecomment-1055823443
	readonly PUBLIC_COMMIT_SHA?: string | undefined;

	// Debug
	readonly PUBLIC_AQ_DEBUG_LEVEL:
		| 'error'
		| 'warn'
		| 'info'
		| 'verbose'
		| 'debug'
		| 'silly';

	readonly PUBLIC_AQ_DEBUG_PRISMA: boolean;
	readonly PUBLIC_AQ_DEBUG_SENTRY: boolean;

	// External
	readonly CI?: boolean | undefined;
}

/**
 * Unverified env type
 */
export type UnverfiedAqaratechEnv = Object.Update<
	AqaratechEnv,
	keyof AqaratechEnv,
	// Any.x | undefined
	string | undefined
>;