import type { PageLoad } from './$types';

import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';

export const load: PageLoad = async ({
	fetch,
	params,
	url: { searchParams },
}) => {
	const api = createApi(fetch);

	const units = await api.portfolios.findUnits({
		id: params.portfolioId,
		filter: {
			propertyId: { equals: params.propertyId },
		},
		...parseParams(searchParams),
	});

	return {
		units,
	};
};
