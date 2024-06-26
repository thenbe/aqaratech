import type { Actions } from './$types';
import { leaseInvoiceUpdateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

export const actions: Actions = {
	default: async (event) => {
		return await handleForm({
			entity: 'leaseInvoice',
			schema: leaseInvoiceUpdateSchema,
			checkboxKeys: {
				isPaid: true,
			},
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.leaseInvoices.update({
					id: event.params.leaseInvoiceId,
					updateLeaseInvoiceDto: data,
				});

				return submitted.id;
			},
		});
	},
};
