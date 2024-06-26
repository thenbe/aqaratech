import type { Actions } from './$types';
import { expenseUpdateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

export const actions: Actions = {
	default: async (event) => {
		return await handleForm({
			entity: 'expense',
			schema: expenseUpdateSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.expenses.update({
					id: event.params.expenseId,
					updateExpenseDto: data,
				});

				return submitted.id;
			},
		});
	},
};
