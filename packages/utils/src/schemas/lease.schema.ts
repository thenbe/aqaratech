import { z } from 'zod';
import { isID } from './utils/id.schema';
import { zodIsDateString } from './utils/zod-date-string';

const base = z
	.object({
		monthlyRent: z.number().min(1),
		start: zodIsDateString(),
		end: zodIsDateString(),
		notify: z.boolean(),
		canPay: z.boolean(),
	})
	.strict();

const baseCreate = base.extend({
	portfolioId: isID,
	unitId: isID,
	tenantId: isID,
});

const baseUpdate = base.partial();

export const leaseCreateSchema = refineSchema(baseCreate);

export const leaseUpdateSchema = refineSchema(baseUpdate);

function refineSchema<T extends z.ZodType<Base>>(schema: T) {
	return schema
		.refine(
			(val) =>
				val.start && val.end && Date.parse(val.start) < Date.parse(val.end),
			{
				path: ['start'],
				message: 'Start date must be before end date',
			},
		)
		.refine(
			(val) =>
				val.start && val.end && Date.parse(val.start) < Date.parse(val.end),
			{
				path: ['end'],
				message: 'End date must be after start date',
			},
		);
}

type Base = z.infer<typeof baseCreate | typeof baseUpdate>;

/**
 * Exported seperately to make it easy to implement in DTO
 */
export type LeaseCreateSchema = z.infer<typeof baseCreate>;

/**
 * Exported seperately to make it easy to implement in DTO
 */
export type LeaseUpdateSchema = z.infer<typeof baseUpdate>;