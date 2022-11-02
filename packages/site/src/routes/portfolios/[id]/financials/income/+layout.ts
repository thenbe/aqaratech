import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { range } from '$lib/stores/filter/range';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, params, depends, parent }) => {
	const api = createApi(fetch);

	const { start, end } = get(range);
	depends(FilterEnum.Range);

	const organizationId = (await parent()).user?.role?.organizationId;

	const income = await api.portfolios.getIncomeByMonth({
		organizationId,
		portfolioId: params.id,
		start,
		end,
	});

	return {
		income,
	};
};
