import { Cookie } from '@self/utils';

import {
	EXPIRED_ACCESS_TOKEN,
	EXPIRED_ID_TOKEN,
} from '../../../constants/expired-id-token';
import { siteURL } from '../../api/fixtures/site-url';
import { expect, test } from '../auth-fixtures';

// Consider using test.use() to skip global setup login?
// test.use({ token: { name: Cookie.idToken, value: '123' } });

const tokens = [EXPIRED_ID_TOKEN, EXPIRED_ACCESS_TOKEN];

for (const token of tokens) {
	test.describe(`Expired ${token.name} token`, () => {
		test.use({
			token,
		});

		test('redirect to login form', async ({ page }) => {
			// expect to be redirected to login page
			// Checking for username/password input is flaky because it's on an external site,
			// if we still want to do so, at lease use test.slow()
			// await page.goto(siteURL);
			// const emailInput = page.locator('input[name="username"]');
			// const passwordInput = page.locator('input[name="password"]');
			// await expect(emailInput).toBeVisible();
			// await expect(passwordInput).toBeVisible();

			// Instead, test for the redirect to /auth/login

			// catch the request when it happens
			const requestPromise = page.waitForRequest((res) =>
				res.url().includes('/auth/login'),
			);

			await page.goto(siteURL);

			const request = await requestPromise;

			const response = await request.response();
			expect(response).toBeTruthy();

			if (!response) throw new Error('No response'); // type purposes only
			expect.soft(response.status()).toBe(302);

			const locationHeader = response.headers()['location'];
			expect(locationHeader).toBeTruthy();

			const location = new URL(locationHeader!);
			expect.soft(location.host).toContain('auth0.com');
			expect.soft(location.pathname).toBe('/authorize');

			const redirectParam = new URL(location.searchParams.get('redirect_uri')!);
			const redirect = new URL(redirectParam);

			expect.soft(redirect.pathname).toBe('/auth/callback');
		});

		test('cookies are cleared', async ({ page }) => {
			await page.goto(`${siteURL}/concierge`);
			// expect idToken and accessToken to be cleared
			const cookies = await page.context().cookies();

			const cookieNames = [Cookie.idToken, Cookie.accessToken];

			for (const cookieName of cookieNames) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
				const cookie = cookies.find((cookie) => cookie.name === cookieName);

				expect(cookie).toBe(undefined);
			}
		});
	});
}
