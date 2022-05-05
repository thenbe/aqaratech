import { router, TRPCError } from '@trpc/server';
import type { Context } from '../../config';

export const createRouter = () =>
	router<Context>().middleware(({ ctx, next }) => {
		if (ctx.authz?.isTenant || ctx.authz?.isAdmin) {
			return next({
				ctx: { authz: ctx.authz },
			});
		} else {
			throw new TRPCError({ code: 'FORBIDDEN', message: 'Forbidden' });
		}
	});
