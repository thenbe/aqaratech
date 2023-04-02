import { expect } from '@playwright/test';

import { test } from '../api/api-fixtures';

// test that locale switch is preserved on login
test.describe('locale preference', () => {
	test.use({ storageState: { cookies: [], origins: [] } });

	test('persists', async ({ page }) => {
		// expect base locale
		await page.goto('/');
		await expect(page).toHaveURL('/en');

		// switch to arabic
		const arLocale = page.getByRole('link', { name: 'العربية' });
		await arLocale.click();
		await expect(page).toHaveURL('/ar');

		// expect to be redirected to arabic locale when no locale is specified
		await page.goto('/');
		await expect(page).toHaveURL('/ar');
	});
});
