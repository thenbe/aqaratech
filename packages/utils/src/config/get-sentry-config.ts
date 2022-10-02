import type { Options } from '@sentry/types';
import type { AqaratechEnv } from '../../../../types/environment';
import { shouldEnableSentry } from './should-enable-sentry';

type AqaratechConfig = Pick<
	AqaratechEnv,
	'PUBLIC_AQARATECH_ENV' | 'PUBLIC_AQ_DEBUG_SENTRY' | 'PUBLIC_TRACE_RATE'
>;

export const getSentryConfig = (
	config: AqaratechConfig,
): AqaratechSentryConfig => {
	const { PUBLIC_AQARATECH_ENV, PUBLIC_TRACE_RATE, PUBLIC_AQ_DEBUG_SENTRY } =
		config;

	const sampleRate = +(PUBLIC_TRACE_RATE ?? 0);

	return {
		enabled: shouldEnableSentry({
			PUBLIC_AQARATECH_ENV,
			PUBLIC_AQ_DEBUG_SENTRY,
		}),
		environment: PUBLIC_AQARATECH_ENV || 'unknown',
		debug: PUBLIC_AQ_DEBUG_SENTRY === '1',
		tracesSampleRate: sampleRate,
		tracesSampler(samplingContext) {
			if (samplingContext.transactionContext?.name?.startsWith('/health')) {
				return 0;
			}
			return sampleRate;
		},
	};
};

type AqaratechSentryConfig = Pick<
	Options,
	'enabled' | 'environment' | 'debug' | 'tracesSampler' | 'tracesSampleRate'
>;
