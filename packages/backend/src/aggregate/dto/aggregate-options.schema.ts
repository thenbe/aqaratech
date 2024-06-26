import { z } from 'zod';

import {
	RangeKind,
	endOfMonthN,
	startOfMonthN,
	zodDateOnly,
} from '@self/utils';

export const aggregateOptionsSchema = z
	.object({
		start: zodDateOnly.default(() => startOfMonthN(1).slice(0, 10)),
		end: zodDateOnly.default(() => endOfMonthN(0).slice(0, 10)),
		portfolioId: z.string().uuid().optional(),
		propertyId: z.string().uuid().optional(),
		unitId: z.string().uuid().optional(),
		rangeKind: z
			.enum(['postAt', 'paidAt'] as const satisfies Readonly<RangeKind[]>)
			.default('postAt'),
	})
	.strict();

/**
 * Treats literal `null` as null.
 */
const zodNullishQueryParam = z.preprocess((arg) => {
	if (typeof arg == 'string' && arg === 'null') {
		return null;
	} else {
		return arg;
	}
}, z.string().uuid().nullish());

export const aggregateOptionsExpensesSchema = z
	.object({
		start: zodDateOnly.default(() => startOfMonthN(1).slice(0, 10)),
		end: zodDateOnly.default(() => endOfMonthN(0).slice(0, 10)),
		propertyId: zodNullishQueryParam,
		unitId: zodNullishQueryParam,
	})
	.strict();

// Export types

export type AggregateOptionsSchema = z.infer<typeof aggregateOptionsSchema>;

export type AggregateOptionsExpensesSchema = z.infer<
	typeof aggregateOptionsExpensesSchema
>;
