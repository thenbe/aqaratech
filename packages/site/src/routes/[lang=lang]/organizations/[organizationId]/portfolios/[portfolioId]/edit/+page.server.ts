import type { Actions } from './$types';
import { portfolioUpdateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

export const actions: Actions = {
	default: async (event) => {
		return await handleForm({
			entity: 'portfolio',
			schema: portfolioUpdateSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.portfolios.update({
					id: event.params.portfolioId,
					updatePortfolioDto: data,
				});

				return submitted.id;
			},
		});
	},
};
