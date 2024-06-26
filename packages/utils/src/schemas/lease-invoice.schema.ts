import { z } from 'zod';

import { zodDateOnly, zodDateOnlyOptional } from './utils/date/zod-date-only';
import { isID } from './utils/id.schema';
import { zodCheckbox } from './utils/zod-checkbox';
import { zodNumber } from './utils/zod-number';
import { zodStringOptional } from './utils/zod-string';

const base = z
	.object({
		postAt: zodDateOnly,
		paidAt: zodDateOnlyOptional,
		isPaid: zodCheckbox,
		amount: zodNumber,
		memo: zodStringOptional,
	})
	.strict();

const baseCreate = base.extend({
	portfolioId: isID,
	leaseId: isID,
});

const baseCreateMany = base.extend({
	portfolioId: isID,
});

const baseUpdate = base.partial();

export const leaseInvoiceCreateSchema = refineSchema(baseCreate);

export const leaseInvoiceUpdateSchema = refineSchema(baseUpdate);

export const leaseInvoiceCreateManySchema =
	refineSchema(baseCreateMany).array();

export const leaseInvoiceCreateManySchema2 = z.array(
	refineSchema(baseCreateMany),
);

// Version 3.19.1 breaks this type. Wait for a fix before upgrading.
// Issue: https://github.com/colinhacks/zod/issues/1473
function refineSchema<
	T extends z.ZodType<
		z.TypeOf<typeof base | typeof baseUpdate>,
		z.ZodTypeDef,
		unknown
	>,
>(schema: T) {
	return schema.refine(
		(val) => (val.isPaid && val.paidAt) || (!val.isPaid && !val.paidAt),
		(val) => ({
			path: ['paidAt'],
			message: val.isPaid
				? 'If this transaction is paid, you must enter a payment date'
				: 'If this transaction is not paid, you must clear the payment date',
		}),
		// Cast back to T to make it easier for z.infer to infer the type.
	) as unknown as T;
}

// Export types

/**
 * Exported seperately to make it easy to implement in DTO
 */
export type LeaseInvoiceCreateSchema = z.infer<typeof baseCreate>;

/**
 * Exported seperately to make it easy to implement in DTO
 */
export type LeaseInvoiceUpdateSchema = z.infer<typeof baseUpdate>;

// Manually set type until zod can infer the leaseId does not exist in the baseCreateMany schema.
export type LeaseInvoiceCreateManySchema = z.infer<typeof baseCreateMany>;

// Doesn't infer the type correctly.
// export type LeaseInvoiceCreateManySchema = z.infer<
// 	typeof leaseInvoiceCreateManySchema
// >;
