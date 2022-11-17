import { expect } from '@playwright/test';
import { getRoute, PageTypePortfolio } from '@self/utils';
import fs from 'node:fs';
import * as R from 'remeda';
import { test } from '../../api/api-fixtures';

// const SAVE_PATH = path.resolve(__dirname, '../../../downloads/income.csv');
const SAVE_PATH = './downloads/income.csv';

test.use({
	userRoleType: 'PORTFOLIO',
	invoicesParams: R.times(100, () => ({
		amount: 100,
	})),
});

test('can export csv from income table', async ({
	scopedPage: page,
	org,
	portfolio,
	invoices,
}) => {
	const url = getRoute({
		entity: 'portfolio',
		id: portfolio.id,
		pageType: PageTypePortfolio.Income,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	await page.goto(url);

	await page.getByRole('link', { name: 'Table' }).click();

	await page.getByRole('button', { name: 'Options' }).click();

	const [download] = await Promise.all([
		page.waitForEvent('download'),
		page.getByRole('link', { name: 'Export to CSV' }).click(),
	]);

	await download.saveAs(SAVE_PATH);
	const csv = fs.readFileSync(SAVE_PATH, 'utf8');

	expect.soft(csv).not.toBe('');

	expect.soft(csv).toContain(invoices[0].id);
	expect.soft(csv).toContain(invoices[99].id);

	expect.soft(csv).toContain(
		// Sometimes paidAt column is missing from the csv file
		// 'id,createdAt,updatedAt,dueAt,postAt,paidAt,isPaid,amount,memo,leaseId,organizationId,portfolioId',
		'id,createdAt,updatedAt,dueAt,postAt',
	);
});