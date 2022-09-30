import { test as base } from '@playwright/test';
import {
	organizationFactory,
	portfolioFactory,
	propertyFactory,
} from '@self/seed';
import * as R from 'remeda';
import type {
	ExpenseCategoryDto,
	OrganizationCreatedDto,
	PortfolioDto,
	PropertyDto,
} from '../types/api';
import { getToken } from '../utils/get-token';

// Extend basic test by providing an "org" fixture.
// `org` is a fresh organization. Role ID header is set in extraHTTPHeaders.
export const test = base.extend<{
	org: OrganizationCreatedDto;
	portfolio: PortfolioDto;
	property: PropertyDto;
	file: string;
	expenseCategory: ExpenseCategoryDto;
}>({
	// A fixture that returns a fresh organization.
	org: async ({ baseURL, browser }, use) => {
		if (!baseURL) throw new Error('baseURL is not set');

		// baseURL is populated because it is set very early in playwright.config.ts
		// For some reason though, contextOptions.baseURL is not set.
		// P.S. We can't use extraHTTPHeaders here, because it'll cause a circular dependency.
		// contextOptions might be empty because this is executed before test.use is called?
		// For this reason, we create a new context here.

		const context = await browser.newContext({
			baseURL,
			extraHTTPHeaders: {
				Authorization: `Bearer ${await getToken({
					name: 'accessToken',
					domain: baseURL,
				})}`,
			},
		});

		const organization = organizationFactory.build();

		const orgPicked = R.pick(organization, ['fullName']);

		const headers = {
			Authorization: `Bearer ${await getToken({
				name: 'accessToken',
				domain: baseURL,
			})}`,
		};

		const res = await context.request.post(`/organizations`, {
			headers,
			data: orgPicked,
		});

		const created = (await res.json()) as OrganizationCreatedDto;

		await use(created);
		await context.close();
	},

	// A fixture that returns a fresh portfolio in a fresh organization.
	// Fixtures are "composable", i.e when a test uses both org and portfolio fixtures, the same organization is used.
	portfolio: async ({ org, request }, use) => {
		// create fresh portfolio
		const portfolio = portfolioFactory.build({
			organizationId: org.organization.id,
		});

		const picked = R.pick(portfolio, ['fullName', 'organizationId']);

		const res = await request.post(`/portfolios`, { data: picked });

		const created = (await res.json()) as PortfolioDto;

		await use(created);
	},

	// A fixture that returns a fresh property in a fresh organization.
	property: async ({ portfolio, request }, use) => {
		// create fresh property
		const property = propertyFactory.build({
			organizationId: portfolio.organizationId,
			portfolioId: portfolio.id,
		});

		const picked = R.pick(property, ['area', 'number']);

		const res = await request.post(`/properties`, { data: picked });

		const created = (await res.json()) as PropertyDto;

		await use(created);
	},
	// A fixture that returns a fresh file in a fresh portfolio.
	file: async ({ portfolio, request }, use) => {
		const fileName = 'test.txt';

		const res = await request.post(`/files`, {
			multipart: {
				fileName: fileName,
				relationKey: 'portfolio',
				relationValue: portfolio.id,
				organizationId: portfolio.organizationId,
				file: {
					name: fileName,
					mimeType: 'text/plain',
					buffer: Buffer.from('hello world'),
				},
			},
		});

		const name = await res.text();
		const key = `portfolio/${portfolio.id}/${name}`;

		await use(key);
	},

	expenseCategory: async ({ request, org }, use) => {
		const res = await request.get(`/expense-categories`);

		const categories = (await res.json()) as ExpenseCategoryDto[];

		const category = categories.find((c) => !c.isGroup);

		if (!category) throw new Error('No expense category found');

		await use(category);
	},
});
