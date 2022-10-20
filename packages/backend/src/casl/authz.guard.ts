import { subject } from '@casl/ability';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Action } from 'src/casl/action.enum';
import { IUser } from 'src/interfaces/user.interface';

// this guard needs
// user.ability - done
// Action type
// subject (subjectType, subjectObject)

@Injectable()
export class AuthzGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const methodKey = context.getHandler().name;

		const className = context.getClass().name;

		const request = context.switchToHttp().getRequest<Request>();

		const user = request.user as IUser;

		const subjectObject = request.body;

		// @ts-ignore
		const orgIdFromUrl = request.params.organizationId;

		const result = user.ability.can(
			Action.Create,
			subject('Tenant', {
				...subjectObject,
				organizationId: orgIdFromUrl,
			}),
		);

		return result;
	}
}