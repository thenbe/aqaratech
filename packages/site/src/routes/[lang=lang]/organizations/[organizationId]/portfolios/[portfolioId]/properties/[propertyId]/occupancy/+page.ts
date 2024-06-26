import type { PageLoad } from './$types';

import { createApi } from '$api';
import { occupancyRange } from '$lib/components/charts/utils/occupancy-range';

export const load: PageLoad = async ({ fetch, params }) => {
	const { organizationId, portfolioId, propertyId } = params;

	const api = createApi(fetch);

	const [occupancy, futureOccupancy] = await Promise.all([
		api.portfolios.getOccupancy({
			organizationId,
			portfolioId,
			propertyId,
			...occupancyRange.previous,
		}),

		api.portfolios.getOccupancy({
			organizationId,
			portfolioId,
			propertyId,
			...occupancyRange.future,
		}),
	]);

	return {
		occupancy,
		futureOccupancy,
	};
};
