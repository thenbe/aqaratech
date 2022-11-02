import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { property } from '$lib/stores/filter/property';
import { range } from '$lib/stores/filter/range';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import { calculateNet } from './calculate-net';

export const load: PageLoad = async ({ fetch, params, depends, parent }) => {
	// Filter options
	const { start, end } = get(range);
	const propertyId = get(property);
	depends(FilterEnum.Range, FilterEnum.Property);

	const api = createApi(fetch);

	const organizationId = (await parent()).user?.role?.organizationId;

	const [properties, income, expenses] = await Promise.all([
		api.portfolios.findProperties({
			id: params.id,
		}),

		api.portfolios.getIncomeByMonth({
			organizationId,
			portfolioId: params.id,
			propertyId,
			start,
			end,
		}),

		api.portfolios.getExpensesByMonth({
			organizationId,
			portfolioId: params.id,
			propertyId,
			start,
			end,
		}),
	]);

	return {
		net: calculateNet(income.paid, expenses),
		properties,
		income,
		expenses,
	};
};
