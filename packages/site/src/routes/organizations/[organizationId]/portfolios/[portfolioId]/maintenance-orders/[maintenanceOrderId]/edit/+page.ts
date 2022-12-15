import { createApi } from '$api';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const maintenanceOrder = await api.maintenanceOrders.findOne({
		id: params.maintenanceOrderId,
	});

	return { maintenanceOrder };
};