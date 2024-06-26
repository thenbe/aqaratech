import {
	ClassSerializerInterceptor,
	MiddlewareConsumer,
	Module,
	RequestMethod,
} from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import * as Sentry from '@sentry/node';
import { PolymorphicRequest } from '@sentry/node';
import {
	addRequestDataToEvent,
	extractPathForTransaction,
} from '@sentry/utils';
import { SentryInterceptor, SentryModule } from '@travelerdev/nestjs-sentry';
import { WinstonModule } from 'nest-winston';

import { isLiveEnv } from '@self/utils';
import { AppController } from 'src/app.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AbilitiesGuard } from 'src/casl/abilities.guard';
import { RoleGuard } from 'src/casl/role.guard';
import { WinstonConfigService } from 'src/config/winston-config.service';
import { HttpLoggerService } from 'src/http-logger/HttpLogger.service';
import { ResponseInterceptor } from 'src/http-logger/response.interceptor';
import { AllExceptionsFilter } from 'src/interceptors/all-exceptions.filter';
import { ErrorsInterceptor } from 'src/interceptors/error.interceptor';
import { TimeoutInterceptor } from 'src/interceptors/timeout.interceptor';
import { LoggingMiddleware } from 'src/middleware/logging.middleware';
import { PrismaService } from 'src/prisma/prisma.service';
import { TraceMiddleware } from 'src/sentry/trace.middleware';

import { AppService } from './app.service';
import { EnvModule } from './env/env.module';
import { EnvService } from './env/env.service';
import { ExpenseCategoriesModule } from './expense-categories/expense-categories.module';
import { LogtailModule } from './logtail/logtail.module';
import { MaintenanceOrdersModule } from './maintenance-orders/maintenance-orders.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PhoneVerifyModule } from './phone-verify/phone-verify.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		EnvModule,
		// Example for centralized config module: https://github.com/podkrepi-bg/api/blob/13eadd726f3ae45c49ef9be66b76c589e2394b16/apps/api/src/config/swagger.config.ts

		WinstonModule.forRootAsync({
			imports: [LogtailModule],
			useClass: WinstonConfigService,
		}),

		PrismaModule,

		// or use async: https://github.com/podkrepi-bg/api/blob/f62fba53eea6405539653c022c13f1d49990b93c/apps/api/src/app/app.module.ts#L60
		SentryModule.forRootAsync({
			inject: [EnvService, PrismaService],
			useFactory: (env: EnvService, prisma: PrismaService) => {
				const sentryConfig = env.sentry;
				return {
					...sentryConfig,
					/** Adding data using the beforeSend callback seems to be more
					 * consistent, especially for nested objects. For example, calling
					 * sentry.captureEvent() and setting the extra & data properties renders nested
					 * objects as [object Object] in the sentry UI. */
					beforeSend(event, hint) {
						// enrich error events with additional data
						const error = hint.originalException;

						const cause = error instanceof Error ? error.cause : undefined;

						// Add request data to the event (might already be added by the sentry sdk)
						const request = event.extra?.['req'] as
							| PolymorphicRequest
							| undefined;
						if (request) {
							addRequestDataToEvent(event, request, {
								include: {
									transaction: true,
									user: true,
									request: true,
								},
							});

							// Set better transaction name
							const [name] = extractPathForTransaction(request, {
								path: true,
								method: true,
							});
							console.log({
								oldTransaction: event.transaction,
								newTransaction: name,
							});
							event.transaction = name;
						}

						const extra = {
							...event.extra,
							cause,
							innerCause: cause instanceof Error ? cause.cause : undefined,

							// Manually add the hint here, otherwise it won't be sent to sentry
							...hint,
						};

						event.extra = extra;

						if (env.sentry.debug) {
							console.log('Sentry beforeSend');
							console.log('user', event.user);
							console.log('event', event);
							console.log('hint', hint);
							console.log('extra', extra);
						}

						if (
							!isLiveEnv(env.e.PUBLIC_AQARATECH_ENV) &&
							sentryConfig.tracesSampleRate === 0
						) {
							console.log('Sentry tracesSampleRate is 0. Not sending event');
							return null;
						}

						console.log('Sending event to Sentry');
						return event;
					},
					integrations: [
						// Enabling debug will make sentry list integrations on startup
						// More info: https://docs.sentry.io/platforms/node/configuration/integrations/default-integrations/
						// enable HTTP calls tracing
						new Sentry.Integrations.Http({
							tracing: true,
							breadcrumbs: true,
						}),

						// Potential troublemaker. Investigate: shutdown hooks, add prisma to imports array, prisma in main.ts vs using nestjs-prisma package.
						new Sentry.Integrations.Prisma({ client: prisma.c }),
						...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
					],
				};
			},
		}),

		UsersModule,
		OrganizationsModule,
		MaintenanceOrdersModule,
		ExpenseCategoriesModule,
		ScheduleModule.forRoot(),
		PhoneVerifyModule,
	],
	controllers: [AppController],
	providers: [
		{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
		{ provide: APP_INTERCEPTOR, useFactory: () => new SentryInterceptor() },
		{ provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor },
		{ provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
		AppService,
		{ provide: APP_GUARD, useClass: JwtAuthGuard },
		{ provide: APP_GUARD, useClass: RoleGuard },
		{ provide: APP_GUARD, useClass: AbilitiesGuard },
		{ provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
		HttpLoggerService,
		{ provide: APP_FILTER, useClass: AllExceptionsFilter },
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer): void {
		const healthCheck: RouteInfo = {
			path: 'health',
			method: RequestMethod.GET,
		};

		consumer.apply(LoggingMiddleware).exclude(healthCheck).forRoutes('*');
		consumer.apply(TraceMiddleware).exclude(healthCheck).forRoutes('*');
	}
}
