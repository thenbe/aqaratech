import type { PageLoad } from './$types';
import { get } from 'svelte/store';

import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { isPaid } from '$lib/stores/filter/is-paid';
import { isPaidOnline } from '$lib/stores/filter/is-paid-online';
import { payPhase } from '$lib/stores/filter/pay-phase';
import { range, rangeKind } from '$lib/stores/filter/range';
import { parseParams } from '$lib/utils/parse-params';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	fetch,
	depends,
}) => {
	// Filter options
	const { start, end } = get(range);
	const rangeKindFilter = get(rangeKind);
	const isPaidFilter = get(isPaid);
	const isPaidOnlineFilter = get(isPaidOnline);
	const payPhaseFilter = get(payPhase);

	depends(
		FilterEnum.Range,
		FilterEnum.RangeKind,
		FilterEnum.IsPaid,
		FilterEnum.IsPaidOnline,
		FilterEnum.PayPhase,
	);

	const filter: Record<string, unknown> = {
		[rangeKindFilter]: { gte: new Date(start), lte: new Date(end) },
		isPaid: isPaidFilter,
		mfPaymentId:
			isPaidOnlineFilter === true
				? { not: null }
				: isPaidOnlineFilter === false
				? { equals: null }
				: undefined,
	};

	const api = createApi(fetch);

	const invoices = await api.organizations.findAllLeaseInvoices({
		id: params.organizationId,
		filter,
		filterCustom: {
			payPhase: payPhaseFilter,
		},
		...parseParams(searchParams),
	});

	return { invoices };
};
