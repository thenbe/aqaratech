import { ExecutionContext } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Request } from 'express';
import { AuthenticatedUser, IUser } from 'src/interfaces/user.interface';

export interface ExtraContext {
	name: string;
	fieldData: Record<string, string>;
}

/**
 * Report an exception with request and additional optional context objects.
 *
 * @param exception
 * @param request A request object if available.
 */
export function reportRequestException(
	exception: Error & { reported?: boolean; status?: number; response?: any },
	request?: Request,
) {
	// Don't report already reported exceptions
	if (exception.reported) {
		return;
	}

	Sentry.withScope((scope: Sentry.Scope) => {
		const common = {
			ip_address: request?.ip,
		};

		const user = request?.user as IUser | AuthenticatedUser | undefined;

		if (user && 'id' in user) {
			scope.setUser({
				...common,
				id: user.id,
				email: user.email,
				roleId: user.xRoleId,
				username: user.fullName || undefined,
				isAqaratechStaff: user.isAqaratechStaff,
			});
		} else if (user) {
			scope.setUser({
				...common,
				email: user.email,
				isAqaratechStaff: user.isAqaratechStaff,
			});
		}

		scope.addEventProcessor((event: Sentry.Event) => {
			if (request) {
				const sentryEvent = Sentry.addRequestDataToEvent(event, request);
				sentryEvent.level = 'error';
				return sentryEvent;
			}
			return null;
		});

		Sentry.captureException(exception);

		exception.reported = true;
	});
}

export function processException(context: ExecutionContext, exception: Error) {
	const request = context.switchToHttp().getRequest();

	reportRequestException(exception, request);
}
