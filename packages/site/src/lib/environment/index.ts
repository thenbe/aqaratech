import { browser, building } from '$app/environment';

import { envSchema } from '@self/utils';

import type { z } from 'zod';

import { env } from '$env/dynamic/public';

const siteEnvSchema = envSchema.pick({
	PUBLIC_AQARATECH_ENV: true,
	PUBLIC_SITE_URL: true,
	PUBLIC_API_URL: true,
	PUBLIC_API_URL_LOCAL: true,
	PUBLIC_AQ_ENABLE_SENTRY: true,
	PUBLIC_AQ_DEBUG_SENTRY: true,
	PUBLIC_TRACE_RATE: true,
	PUBLIC_AQ_DEBUG_SITE: true,
	PUBLIC_COMMIT_SHA: true,
	PUBLIC_AQ_DEBUG_LEVEL: true,
});

type SiteEnvSchema = z.infer<typeof siteEnvSchema>;

/**
 * Validated public environment variables.
 */
export const environment = building
	? (env as unknown as SiteEnvSchema)
	: siteEnvSchema.parse(env);

if (!browser) {
	console.log({ environment });
}
