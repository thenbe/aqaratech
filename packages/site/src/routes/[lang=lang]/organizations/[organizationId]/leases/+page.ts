import type { PageLoad } from './$types';

import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';

export const load: PageLoad = async ({ url: { searchParams }, fetch }) => {
	const api = createApi(fetch);

	const leases = await api.leases.findAll({
		...parseParams(searchParams),
	});

	return { leases };
};