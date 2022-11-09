import { handleForm } from '$lib/components/form/handle-form';
import { propertyCreateSchema } from '@self/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'property',
			schema: propertyCreateSchema,
			event,
			fromParams: ['portfolioId'],
			onSubmit: async (api, data, event) => {
				const submitted = await api.organizations.createProperty({
					organizationId: event.params.organizationId,
					createPropertyDto: {
						...data,
						portfolioId: event.params.portfolioId,
					},
				});

				return submitted.id;
			},
		});
	},
};
