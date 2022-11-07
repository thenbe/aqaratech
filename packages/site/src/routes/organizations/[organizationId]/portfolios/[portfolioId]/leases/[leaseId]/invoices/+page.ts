import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const { leaseId } = params;

	const leaseInvoices = await api.leases.findInvoices({
		id: leaseId,
	});

	return { leaseInvoices };
};