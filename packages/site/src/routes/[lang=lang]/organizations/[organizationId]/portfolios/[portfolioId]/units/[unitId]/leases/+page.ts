import type { PageLoad } from './$types';

import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';

export const load: PageLoad = async ({
	fetch,
	params,
	url: { searchParams },
}) => {
	const api = createApi(fetch);

	const leases = await api.units.findLeases({
		id: params.unitId,
		...parseParams(searchParams),
	});

	return {
		leases,
	};
};
