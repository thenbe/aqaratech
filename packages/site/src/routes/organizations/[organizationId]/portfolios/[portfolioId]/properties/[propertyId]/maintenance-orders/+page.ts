import { parseParams } from '$lib/utils/parse-params';

import { createApi } from '$api';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	fetch,
	params,
	url: { searchParams },
}) => {
	const api = createApi(fetch);

	const maintenanceOrders = await api.maintenanceOrders.findAll({
		filter: {
			propertyId: { equals: params.propertyId },
		},
		...parseParams(searchParams),
	});

	return {
		maintenanceOrders,
	};
};