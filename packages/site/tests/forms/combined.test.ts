import { expect, test } from '../config/test-setup.js';
import {
	ClientForm,
	LeaseForm,
	PropertyForm,
	TenantForm,
	UnitForm,
} from './form.js';

const formEntities = [
	ClientForm,
	PropertyForm,
	UnitForm,
	TenantForm,
	LeaseForm,
];

for (const Form of formEntities) {
	test.describe(`Form: new ${Form.urlName}`, async () => {
		// TODO: consider deleting in an afterEach
		test.beforeEach(async ({ page, trpcClient }) => {
			const form = new Form(page);
			await form.setupNew(trpcClient);
			const url = form.getUrl('new');
			await page.goto(url);
			await page.evaluate(() => window.started);
			await form.fill();
		});

		test(`${Form.urlName} returns 200`, async ({ page }) => {
			const form = new Form(page);
			const request = await form.getRequest();
			const response = await request.response();
			expect(response?.status()).toBe(200);
			await page.waitForNavigation();
		});

		test(`${Form.urlName} redirects to details page`, async ({ page }) => {
			const form = new Form(page);
			await form.submit();
			await page.waitForNavigation();
			const re = new RegExp(
				`/${form.urlName}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
			);
			await expect(page).toHaveURL(re);
		});

		test(`${Form.urlName} basic details are correct`, async ({ page }) => {
			const form = new Form(page);
			await form.submit();
			await page.waitForNavigation();

			for (const b in form.basic()) {
				const el = page.locator(`text=${b}`).first();
				const re = new RegExp(`${b}`);
				expect(await el.textContent()).toMatch(re);
			}
		});
	});
}

for (const Form of formEntities) {
	test.describe(`Form: edit ${Form.urlName}`, async () => {
		// TODO: consider deleting in an afterEach
		test.beforeEach(async ({ page, trpcClient }) => {
			const form = new Form(page);
			await form.setup(trpcClient);
			const url = form.getUrl('edit');
			await page.goto(url);
			await page.evaluate(() => window.started);
			form.alter();
			await form.fill();
		});

		test(`${Form.urlName} returns 200`, async ({ page }) => {
			const form = new Form(page);
			const request = await form.getRequest();
			const response = await request.response();
			expect(response?.status()).toBe(200);
			await page.waitForNavigation();
		});

		test(`${Form.urlName} redirects to details page`, async ({ page }) => {
			const form = new Form(page);
			await form.submit();
			await page.waitForNavigation();
			const re = new RegExp(
				`/${form.urlName}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
			);
			await expect(page).toHaveURL(re);
		});

		test(`${Form.urlName} basic details are correct`, async ({ page }) => {
			const form = new Form(page);
			await form.submit();
			await page.waitForNavigation();

			for (const b in form.basic()) {
				const el = page.locator(`text=${b}`).first();
				const re = new RegExp(`${b}`);
				expect(await el.textContent()).toMatch(re);
			}
		});
	});
}
