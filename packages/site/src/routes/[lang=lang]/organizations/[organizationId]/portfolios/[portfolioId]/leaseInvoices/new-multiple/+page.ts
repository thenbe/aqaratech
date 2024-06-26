import type { PageLoad } from './$types';

import type { PredefinedInvoice } from '$lib/models/interfaces/predefined.interface';

import { createApi } from '$api';

export const load: PageLoad = async ({ url: { searchParams }, fetch }) => {
	const api = createApi(fetch);

	const leaseId = searchParams.get('leaseId');

	if (!leaseId) {
		throw new Error('No leaseId provided');
	}

	const lease = await api.leases.findOne({ id: leaseId });

	const predefined: PredefinedInvoice = {
		leaseId,
		portfolioId: lease.portfolioId,
	};

	return { predefined, lease };
};
