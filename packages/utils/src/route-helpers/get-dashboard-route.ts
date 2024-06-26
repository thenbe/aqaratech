import { entitiesMap } from '../entity/entity-map';

import {
	isPageTypePortfolio,
	PageTypePortfolio,
} from './enums/page-tab-portfolio.enum';

import type { GetDashboardRoute } from './types/id-route.type';
import type { GetRoute } from './types/route-helpers.type';

/**
 * Key to use for storing any intial filter value in the URL. The value is used
 * to initialize the filter store in set-filter/+page.ts. Then, the key-value pair is
 * removed from the URL since the user is redirected.
 */
export const FilterInitial = {
	Property: 'initialPropertyId',
	Unit: 'initialUnitId',
};

/**
 * Special keys to handle predefined routes.
 */
const filterKeyMap: Record<string, string> = {
	propertyId: FilterInitial.Property,
	unitId: FilterInitial.Unit,
};

const pageTypeToUrl = {
	[PageTypePortfolio.Summary]: 'financials/summary',
	[PageTypePortfolio.Income]: 'financials/income',
	[PageTypePortfolio.IncomeTable]: 'financials/income/table',
	[PageTypePortfolio.Expenses]: 'financials/expenses',
	[PageTypePortfolio.ExpensesTable]: 'financials/expenses/table',
	[PageTypePortfolio.Payouts]: 'financials/payouts/table',
	[PageTypePortfolio.PayoutsTable]: 'financials/payouts/table',
} as const;

export const getDashboardRoute = (input: GetDashboardRoute, base: string) => {
	const entityName = entitiesMap.portfolio.urlName;

	const entity = `${base}/${entityName}`;

	const idRoute = `${entity}/${input.id}`;

	const destination = `${idRoute}/${pageTypeToUrl[input.pageType]}`;

	if (!input.predefined) {
		// if there	is no predefined filter, return the destination directly
		return destination;
	}

	const search = new URLSearchParams();

	// if predefined propertyId or unitId, add them	to the url search params
	for (const [key, value] of Object.entries(input.predefined)) {
		const specialKey = filterKeyMap[key];

		if (specialKey) {
			search.set(specialKey, value);
		} else {
			search.set(key, value);
		}
	}

	const lang = input.params['lang'] ?? 'en';

	// when	we have predefined filters, we want to use redirectTo
	search.set('redirectTo', `/${lang}${destination}`);

	return `${idRoute}/set-filter?${search.toString()}`;
};

export const isDashboardRoute = (input: GetRoute): input is GetDashboardRoute =>
	isPageTypePortfolio(input.pageType);
