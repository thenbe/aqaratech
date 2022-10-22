import {
	CallHandler,
	ExecutionContext,
	HttpException,
	Inject,
	Injectable,
	LoggerService,
	NestInterceptor,
} from '@nestjs/common';
import {
	formatRequestLog,
	formatResponseLog,
	isHealthCheck,
} from '@self/utils';
import { Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	constructor(
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {}

	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<Response> | Promise<Observable<Response>> {
		const request = context.switchToHttp().getRequest<Request>();

		const url = new URL(
			request.originalUrl,
			`${request.protocol}://${request.get('host') ?? ''}`,
		);

		// TODO: req.url vs req.baseUrl vs req.originalUrl

		// skip logging health checks
		if (
			isHealthCheck(request.url) &&
			process.env.PUBLIC_AQ_DEBUG_LEVEL !== 'silly'
		) {
			return next.handle();
		}

		this.logRequest(request, url);

		const start = Date.now();

		return next.handle().pipe(
			tap({
				// `complete` is not called when an error is thrown, see `finalize` instead
				complete: () => {
					const response = context.switchToHttp().getResponse<Response>();

					const { statusCode } = response;

					this.logResponse({ request, url, statusCode, start });
				},

				error: (err) => {
					this.logger.error(err);

					if (err instanceof HttpException) {
						let statusMessage: string | undefined;

						try {
							statusMessage = (err.getResponse() as Record<string, unknown>)[
								'message'
							] as string;
						} catch (e) {
							this.logger.error('Unable to get error status message', e);
						}

						this.logResponse({
							request,
							url,
							statusCode: err.getStatus(),
							statusMessage,
							start,
						});
					} else {
						// TODO: monitor
						this.logResponse({
							request,
							url,
							statusCode: 500,
							statusMessage: 'Internal Server Error',
							start,
						});

						this.logger.error('err is not instance of HttpException', err);
					}
				},
			}),
		);
	}

	private logRequest(request: Request, url: URL) {
		const log = formatRequestLog({
			request,
			url,
			extra: {
				ip: request.ip,
				userAgent: request.get('user-agent') ?? '',
			},
		});

		this.logger.log(log, 'Request');
	}

	private logResponse({
		request,
		statusCode,
		statusMessage,
		start,
		url,
	}: {
		request: Request;
		statusCode: number;
		statusMessage?: string;
		start: number;
		url: URL;
	}) {
		// TODO: fix ip

		const text = formatResponseLog({
			response: { status: statusCode },
			method: request.method,
			url,
			start,
			extra: {
				ip: request.ip,
				userAgent: request.get('user-agent') ?? '',
				statusMessage,
			},
		});

		if (statusCode >= 500) {
			this.logger.error(
				{
					...text,
					level: 'error',
				},
				'Response',
			);
		} else if (statusCode >= 400) {
			this.logger.warn(
				{
					...text,
					level: 'warn',
				},
				'Response',
			);
		} else {
			this.logger.log(text, 'Response');
		}
	}
}
