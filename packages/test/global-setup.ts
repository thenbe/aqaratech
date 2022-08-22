import { chromium, type FullConfig } from "@playwright/test";
import { testOrgEmail, testPassword } from "@self/seed";

async function globalSetup(config: FullConfig) {
	// await seed();

	const { baseURL, storageState, ignoreHTTPSErrors } = config.projects[0].use;
	// avoid logging in again if cookies have not expired
	try {
		const cookies = (await import("./storageState.json")).cookies;
		const accessToken = cookies.find((c) => c.name === "accessToken");
		if (accessToken) {
			const hasExpired = accessToken.expires < Date.now() / 1000;
			const domain = new URL(baseURL).hostname;
			const isSameDomain = domain === accessToken.domain;

			if (!hasExpired && isSameDomain) {
				console.log(
					"[Global Setup] Skipping login because access token is still valid"
				);
				return;
			} else {
				console.log(
					"[Global Setup] Access token has expired or domain is different. Logging in again"
				);
			}
		}
	} catch (e) {
		console.log("[Global Setup] No storageState.json found. Logging in again");
	}

	const email = testOrgEmail;
	const password = testPassword;

	const browser = await chromium.launch();
	const page = await browser.newPage({ ignoreHTTPSErrors });
	await page.goto(baseURL);
	await page.locator("text=Log In >> visible=true").click();
	await page.fill('input[name="username"]', email);
	await page.fill('input[name="password"]', password);
	await page.click('button[name="action"]');
	await page.context().storageState({ path: storageState.toString() });
	await browser.close();
}

export default globalSetup;
