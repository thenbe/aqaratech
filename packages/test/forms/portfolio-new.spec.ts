import { expect } from "@playwright/test";
import { test } from "../config";

test.use({ storageState: "./storageState.json" });
test("smoke", async ({ page }, info) => {
	await page.goto("/");
	await page.locator("text=Portfolios").click();
	await expect(page).toHaveURL("http://localhost:3000/portfolios");

	await page.locator("text=Create new portfolio").click();
	await expect(page).toHaveURL("http://localhost:3000/portfolios/new");

	await page.locator('input[name="fullName"]').click();
	await page.locator('input[name="fullName"]').fill("John Doe");

	await page.locator('input[name="label"]').click();
	await page.locator('input[name="label"]').fill("JD");

	await page.locator('input[name="phone"]').click();
	await page.locator('input[name="phone"]').fill("91234567");

	await page.locator('input[name="civilid"]').click();
	await page.locator('input[name="civilid"]').fill("123456789012");

	await page.locator('input[name="dob"]').fill("2022-08-05");

	await page.locator("text=Create new").click();

	const id = new RegExp(
		`/portfolios/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`
	);
	await expect(page).toHaveURL(id);
	const url = page.url();

	// take screenshot
	info.snapshotDir;

	expect(page.locator("text=Portfolio")).toBeTruthy();
	await page.screenshot({
		fullPage: true,
		path: info.snapshotDir + "/portfolio-linux.png",
	});

	await page.locator("text=Edit").click();
	const edit = new RegExp(
		`/portfolios/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/edit`
	);
	await expect(page).toHaveURL(edit);
	await page.locator("text=Save changes").click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	// match screenshot
	expect(page.locator("text=Portfolio")).toBeTruthy();
	expect(await page.screenshot({ fullPage: true })).toMatchSnapshot({
		name: "portfolio.png",
	});
});
