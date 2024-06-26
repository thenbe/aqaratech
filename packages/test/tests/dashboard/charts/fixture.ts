import { expect } from '@playwright/test';
import * as R from 'remeda';

import type { PageTypePortfolio } from '@self/utils';
import { getRoute } from '@self/utils';

import { test as base } from '../../api/api-fixtures';
import { Filters } from '../filter-model';

import { addDays } from './add-days';
import { nonrandomAttribution } from './random-attribution';

interface TestOptions {
	tab: PageTypePortfolio.Income | PageTypePortfolio.Expenses | null;
}

// Try to aim for dates that fall within the START_YEAR.
const START_YEAR = 2021;
const BASE_DATE = new Date(START_YEAR, 0, 2); // set to 2 to avoid timezone issues in CI
const RECORD_COUNT = 10;
const DAYS_BETWEEN_RECORDS = 10;

export const test = base.extend<TestOptions>({
	tab: [null, { option: true }],

	page: async (
		{ page, org, portfolio, tab, invoices: _invoices, expenses: _expenses },
		use,
	) => {
		if (!tab) {
			throw new Error('Must specify a tab');
		}

		const url = getRoute({
			entity: 'portfolio',
			id: portfolio.id,
			pageType: tab,
			params: {
				organizationId: org.organization.id,
				portfolioId: portfolio.id,
			},
		});

		await page.goto(url);

		// Set date range to match test data
		const filters = new Filters(page);

		await expect(filters.range.el).toHaveValue('12');
		expect(await filters.range.label()).toBe('Last 12 months');

		// wait for navigation between setting filters to avoid race condition
		const responsePromise1 = page.waitForResponse(
			(res) => res.status() === 200,
		);
		await filters.start.fill(`${START_YEAR}-01-01`);
		await responsePromise1;

		const responsePromise2 = page.waitForResponse(
			(res) => res.status() === 200,
		);
		await filters.end.fill(`${START_YEAR}-12-31`);
		await responsePromise2;

		// wait for all charts to load
		const empty = page.getByText('No data').first();
		await expect(empty).toBeHidden();

		await use(page);
	},
});

// Generate consistent data for visual regression testing
// Spread out dates. Try to aim for dates that fall within the filter range we set above.

export const portfoliosParams = [{ fullName: 'Evan Evans' }];

export const propertiesParams = [
	{ area: 'بيان', block: '1', avenue: '2', street: '3', number: '44' },
];

export const unitsParams = [{ type: 'apartment', unitNumber: '100' }];

/** Common fixtures for both income and expenses */
export const fixtureParams = {
	portfoliosParams,
	propertiesParams,
	unitsParams,
};

// ### Income test fixtures ###

export const invoicesParams = R.times(RECORD_COUNT, (n) => {
	const postAt = addDays(BASE_DATE, n * DAYS_BETWEEN_RECORDS);
	const isPaid = n % 2 === 0;

	return {
		amount: n * 100,
		isPaid,
		postAt: postAt.toISOString().slice(0, 10),
		paidAt: isPaid ? addDays(postAt, 3).toISOString().slice(0, 10) : null,
		memo: `Memo for sample invoice #${n}`,
	};
});

// ### Expenses test fixtures ###

export const expensesParams = R.times(RECORD_COUNT, (n) => {
	const postAt = addDays(BASE_DATE, n * DAYS_BETWEEN_RECORDS);

	return {
		amount: n * 100,
		postAt: postAt.toISOString().slice(0, 10),
		memo: `Memo for sample expense #${n}`,
		// Attribute an expense to either a portfolio, property, or unit
		...nonrandomAttribution(n),
		// TODO: add category
	};
});
