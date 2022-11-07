import { PageTypePortfolio } from 'src/route-helpers/enums/page-tab-portfolio.enum';
import type { PageTab } from 'src/route-helpers/enums/page-tab.enum';
import { PageType } from 'src/route-helpers/enums/page-type.enum';
import { getRoute } from 'src/route-helpers/get-route';
import { expect, test } from 'vitest';

const baseInput = {
	entity: 'portfolio',
	params: { organizationId: '1' },
	id: '3',
};

const untabbed: [PageTypePortfolio | PageTab | PageType, string][] = [
	[PageType.Edit, 'edit'],
	[PageTypePortfolio.Summary, 'financials/summary'],
	[PageTypePortfolio.Income, 'financials/income'],
	[PageTypePortfolio.Expenses, 'financials/expenses'],
	[PageTypePortfolio.Payouts, 'financials/payouts/table'],
];

test.each(untabbed)(
	'portfolio non-tab is not prefixed: %s',
	(pageType, expected) => {
		const url = `/organizations/1/portfolios/3/${expected}`;

		const input = {
			...baseInput,
			pageType,
		};

		// @ts-expect-error test
		expect(getRoute(input)).toBe(url);
	},
);