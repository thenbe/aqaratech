import { env } from '$env/dynamic/public';
import { z } from 'zod';
import type { AqaratechEnv } from '../../../../../types/environment';

type SiteEnvironment = Pick<
	AqaratechEnv,
	| 'PUBLIC_AQARATECH_ENV'
	| 'PUBLIC_SITE_URL'
	| 'PUBLIC_API_URL'
	| 'PUBLIC_API_URL_LOCAL'
	| 'PUBLIC_TRACE_RATE'
	| 'PUBLIC_AQ_DEBUG_LEVEL'
	| 'PUBLIC_AQ_DEBUG_SITE'
	| 'PUBLIC_AQ_DEBUG_SENTRY'
	| 'PUBLIC_COMMIT_SHA'
	| 'PUBLIC_AQ_ENABLE_SENTRY'
>;

const envSchema = z.object({
	PUBLIC_AQARATECH_ENV: z.enum([
		'development',
		'testing',
		'staging',
		'production',
	]),

	PUBLIC_SITE_URL: z.string(),
	PUBLIC_API_URL: z.string(),
	PUBLIC_API_URL_LOCAL: z.string(),
	PUBLIC_AQ_ENABLE_SENTRY: z.string(),
	PUBLIC_AQ_DEBUG_SENTRY: z.string(),
	PUBLIC_TRACE_RATE: z.string(),
	PUBLIC_AQ_DEBUG_SITE: z.string(),
	PUBLIC_COMMIT_SHA: z.string().optional(),

	// validate debug level, if validation fails, set it to verbose
	PUBLIC_AQ_DEBUG_LEVEL: z
		.enum(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
		.optional()
		.transform((value) => {
			if (value === undefined) {
				console.log(
					'PUBLIC_AQ_DEBUG_LEVEL is undefined or has failed validation, setting to verbose',
				);
				return 'verbose';
			} else {
				return value;
			}
		}),
});

// TODO: use new typescript `satisfies` directive for return type
const environmentInput = {
	PUBLIC_AQARATECH_ENV: env.PUBLIC_AQARATECH_ENV,
	PUBLIC_SITE_URL: env.PUBLIC_SITE_URL,
	PUBLIC_API_URL: env.PUBLIC_API_URL,
	PUBLIC_API_URL_LOCAL: env.PUBLIC_API_URL_LOCAL,
	PUBLIC_AQ_ENABLE_SENTRY: env.PUBLIC_AQ_ENABLE_SENTRY,
	PUBLIC_AQ_DEBUG_SENTRY: env.PUBLIC_AQ_DEBUG_SENTRY,
	PUBLIC_TRACE_RATE: env.PUBLIC_TRACE_RATE,
	PUBLIC_AQ_DEBUG_LEVEL: env.PUBLIC_AQ_DEBUG_LEVEL,
	PUBLIC_AQ_DEBUG_SITE: env.PUBLIC_AQ_DEBUG_SITE,
	PUBLIC_COMMIT_SHA: env.PUBLIC_COMMIT_SHA,
};

// validate environment variables using zod
export const environment: SiteEnvironment = envSchema.parse(environmentInput);
