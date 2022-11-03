import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, fetch }) => {
	const api = createApi(fetch);
	const sParams = parseParams(searchParams);

	const leases = await api.leases.findAll(sParams);

	return { leases };
};