import type { InferMutationInput } from '$lib/client/trpc';
import { concatIfExists } from '$lib/utils/table-utils';
import { z } from 'zod';
import type { EntityDefinition } from '.';

export const schema = z
	.object({
		id: z.string().uuid().optional(),
		monthlyRent: z.number().nonnegative(),
		deposit: z.number().nonnegative(),
		startDate: z.preprocess((arg) => {
			if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
		}, z.date()),
		endDate: z.preprocess((arg) => {
			if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
		}, z.date()),
		tenantId: z.string().uuid(),
		unitId: z.string().uuid(),
	})
	.refine((val) => val.startDate < val.endDate, {
		path: ['startDate'],
		message: 'Start date must be before end date',
	})
	.refine((val) => val.startDate < val.endDate, {
		path: ['endDate'],
		message: 'End date must be after start date',
	});

type Lease = InferMutationInput<'leases:save'>;
const defaultForm = (): Lease => ({
	startDate: new Date(),
	endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
	deposit: 0,
	monthlyRent: 0,
	tenantId: '',
	unitId: '',
});

const label: typeof definition['label'] = (item) =>
	`${item.startDate.toLocaleDateString()} - ${item.endDate.toLocaleDateString()}  ${concatIfExists(
		[item.tenant.firstName, item.tenant.lastName],
	)}`;

const definition: EntityDefinition<'leases'> = {
	schema,
	defaultForm,
	label,
};

export default definition;
