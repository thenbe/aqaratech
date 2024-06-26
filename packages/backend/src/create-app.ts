import {
	INestApplication,
	Logger,
	LoggerService,
	NestApplicationOptions,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { envSchema } from '@self/utils';
import { AppModule } from 'src/app.module';
import { EnvService } from 'src/env/env.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { setupSwagger } from 'src/swagger';

import { version } from '../package.json';

Logger.log(version, 'AqaratechConfig');

const options = {
	// snapshot: !isLiveEnv(process.env.PUBLIC_AQARATECH_ENV),
	abortOnError: false,
	cors: {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		origin: process.env.PUBLIC_SITE_URL!,
		credentials: true,
		allowedHeaders: [
			'Authorization',
			'Cookie',
			'Content-Type',
			'x-sws-authenticated',
			'baggage', // sentry
			'sentry-trace', // sentry
		],
		maxAge: 24 * 60 * 60,
	},
} satisfies NestApplicationOptions;

export async function bootstrap() {
	let app: INestApplication;
	const env = envSchema
		.pick({
			PUBLIC_AQARATECH_ENV: true,
			PUBLIC_IS_TESTING: true,
		})
		.parse(process.env);

	if (env.PUBLIC_IS_TESTING) {
		console.log('PUBLIC_IS_TESTING is set. Using test app.');
		const createTestApp = (await import('../test/create-app.stub'))
			.createTestApp;
		app = await createTestApp(options);
	} else {
		app = await NestFactory.create(AppModule, options);
	}

	const loggerService = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
	app.useLogger(loggerService);

	// Log config
	// Don't clutter the console when running tests
	if (!env.PUBLIC_IS_TESTING) {
		const envService = app.get(EnvService);
		loggerService.log(
			{
				message: 'Config',
				...envService.getLoggable(),
			},
			envService.constructor.name,
		);
	}

	Logger.log(`Version: ${version}`);

	app.use(helmet()); // before other middleware
	app.use(cookieParser());

	// https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

	if (process.env['GENERATE_SWAGGER'] === '1') {
		await setupSwagger(app);
		console.log('Exiting after generating swagger');
		process.exit(0); // revert to using tree-kill if this doesn't work through pnpm/turbo/task/etc
	} else {
		Logger.warn('Swagger is not enabled in production/staging');
	}

	return app;
}

process.on('unhandledRejection', (error) => {
	// By default, Nestjs will crash and exit if an error is thrown during an
	// event handler (when not in dev)

	console.error('Unhandled Rejection caught. Logging and exiting.');
	console.error(error);

	if (Logger) {
		Logger.error(error); // pretty print stack trace
	}

	process.exit(1);
});
