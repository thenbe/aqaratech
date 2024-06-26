import { LogtailTransport } from '@logtail/winston';
import { createLogger, format, transports } from 'winston';

import { httpLogFormat, ignoreHttp, isLiveEnv, onlyHttp } from '@self/utils';

import { environment } from '$aqenvironment';
import { logtail } from '$lib/server/utils/logtail';

/**
 * Transport for HTTP logs
 */
const createTransportForHttp = () => {
	console.log('Creating transport for HTTP logs');

	return new transports.Console({
		level: 'http',
		format: format.combine(
			format(onlyHttp)(),
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			httpLogFormat(format.printf, 'site'),
		),
	});
};

/**
 * Transport for all other logs
 */
const createSiteTransport = () => {
	console.log('Creating transport for all other logs');

	return new transports.Console({
		format: format.combine(
			format(ignoreHttp)(),

			...(isLiveEnv(environment.PUBLIC_AQARATECH_ENV)
				? [format.timestamp(), format.json()]
				: [
						format.timestamp({
							format: 'M/D/YYYY, h:mm:ss A',
						}),
						format.colorize({ level: true }),
						format.padLevels(),
						format.printf(({ level, message, label, timestamp }) => {
							// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
							return `[${label}] ${level} ${timestamp}: ${message}`;
						}),
				  ]),
		),
	});
};

export const logger = createLogger({
	level: environment.PUBLIC_AQ_DEBUG_LEVEL,

	// Common log formats for all transports
	format: format.combine(
		// https://github.com/winstonjs/logform#errors
		format.errors({ stack: true }),
		format.label({ label: 'site' }),
	),

	transports: [
		createTransportForHttp(),
		createSiteTransport(),

		// Transport for Logtail
		...(logtail ? [new LogtailTransport(logtail)] : []),
	],
});
