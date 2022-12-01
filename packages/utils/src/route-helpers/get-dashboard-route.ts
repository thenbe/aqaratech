import { PageTypePortfolio } from './enums/page-tab-portfolio.enum';
import { entitiesMap } from 'src/entity/entity-map';
import type { GetDashboardRoute } from './types/id-route.type';

const filterKeyMap = {
	propertyId: 'initialPropertyId',
	unitId: 'initialUnitId',
} as const;

const pageTypeToUrl = {
	[PageTypePortfolio.Summary]: 'financials/summary',
	[PageTypePortfolio.Income]: 'financials/income',
	[PageTypePortfolio.IncomeTable]: 'financials/income/table',
	[PageTypePortfolio.Expenses]: 'financials/expenses',
	[PageTypePortfolio.ExpensesTable]: 'financials/expenses/table',
	[PageTypePortfolio.Payouts]: 'financials/payouts/table',
	[PageTypePortfolio.PayoutsTable]: 'financials/payouts/table',
};

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
		if (key in filterKeyMap) {
			search.set(filterKeyMap[key], value);
		} else {
			search.set(key, value);
		}
	}

	// when	we have predefined filters, we want to use redirectTo
	search.set('redirectTo', destination);

	return `${idRoute}/set-filter?${search.toString()}`;
};
