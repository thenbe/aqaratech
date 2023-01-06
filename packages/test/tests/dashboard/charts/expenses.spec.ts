import { expect } from '@playwright/test';

import { PageTypePortfolio } from '@self/utils';

import { test } from './fixture';

// PERF: Perform all tests in the same context/instance

// NOTE: declaring expenses fixture here doesn't seem to work. Needs to be
// declared in fixture.ts (page property)

test.use({ tab: PageTypePortfolio.Expenses });

test.describe('expense page', () => {
	test('looks the same', async ({ page }) => {
		await expect(page).toHaveScreenshot({
			fullPage: true,
			maxDiffPixelRatio: 0.01,
		});
	});

	test('expense bar chart', async ({ page }) => {
		const chart = page
			.getByTestId('chart-card')
			.filter({ hasText: 'Expenses: by Month' });

		await expect(chart).toHaveScreenshot({
			maxDiffPixelRatio: 0.01, // firefox fails without this
		});
	});

	test('expense treemap - location', async ({ page }) => {
		const chart = page
			.getByTestId('chart-card')
			.filter({ hasText: 'Expenses: by Location' });

		await expect(chart).toHaveScreenshot();
	});

	// TEST: add treemap - category
});
