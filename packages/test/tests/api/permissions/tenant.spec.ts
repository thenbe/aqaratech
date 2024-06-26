import { expect } from '@playwright/test';
import { resolveURL } from 'ufo';

import { prisma } from '../../../prisma';
import { getUrl } from '../../../utils/post-url';
import { test } from '../api-fixtures';

import type { PaginatedTenantDto } from '../../../types/api';

test.use({
	userRoleType: 'TENANT',
});

const accessible = ['/leases', '/maintenance-orders'];
const notAccessible = [
	'/portfolios',
	'/properties',
	// '/units',
	// "/search",
];

// check all accessible routes
for (const route of accessible) {
	test(`should be able to get ${route}`, async ({ request }) => {
		const res = await request.get(route);

		await expect(res).toBeOK();
	});
}

test('can get own invoices', async ({ tenant, request }) => {
	const res = await request.get(`/tenants/${tenant.id}/leaseInvoices`);

	await expect(res).toBeOK();
});

test('can get leases invoices', async ({ lease, request }) => {
	const res = await request.get(`/leases/${lease.id}/leaseInvoices`);

	await expect(res).toBeOK();
});

// check all not accessible routes
for (const route of notAccessible) {
	test(`should not be able to get ${route}`, async ({ request }) => {
		const res = await request.get(route);

		expect(res.status()).toBe(403);
	});
}

test('can only get self from /tenants', async ({ request }) => {
	const res = await request.get('/tenants');

	const body = (await res.json()) as PaginatedTenantDto;

	expect(body.results).toHaveLength(1);
});

test('cannot get data from /aggregate/income - must specify portfolioId', async ({
	portfolio,
	request,
}) => {
	const base = getUrl({
		organizationId: portfolio.organizationId,
	});

	const url = base.incomeAggregate;

	const res = await request.get(url);

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});

test('cannot get data from /aggregate/income - specify portfolioId', async ({
	portfolio,
	request,
}) => {
	const base = getUrl({
		organizationId: portfolio.organizationId,
	});

	const url = base.incomeAggregate;

	const portfolioId = portfolio.id;
	const res = await request.get(url, { params: { portfolioId } });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});

test('cannot get data from /aggregate/expenses', async ({
	portfolio,
	request,
}) => {
	const base = getUrl({
		organizationId: portfolio.organizationId,
		portfolioId: portfolio.id,
	});

	const url = base.expensesAggregate;

	const res = await request.get(url);

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});

test('cannot get data from /aggregate/expenses - specify portfolioId', async ({
	portfolio,
	request,
}) => {
	const base = getUrl({
		organizationId: portfolio.organizationId,
	});

	const url = base.expensesAggregate;

	const portfolioId = portfolio.id;
	const res = await request.get(url, { params: { portfolioId } });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});

test.describe('files', () => {
	test.use({ createBucket: true });

	test('can get files for mo', async ({ tenant, request, lease }) => {
		const maintenanceOrder = await prisma.maintenanceOrder.create({
			data: {
				title: 'test',
				organizationId: tenant.organizationId,
				portfolioId: lease.portfolioId,
				tenantId: tenant.id,
			},
		});

		const res = await request.get(
			resolveURL('organizations', tenant.organizationId, 'files'),
			{
				params: {
					relationKey: 'maintenanceOrder',
					relationValue: maintenanceOrder.id,
				},
			},
		);

		expect.soft(res.status()).toBe(200);
	});

	test('can not get files for non mo', async ({ tenant, request }) => {
		const res = await request.get(
			resolveURL('organizations', tenant.organizationId, 'files'),
			{
				params: {
					relationKey: 'tenant',
					relationValue: tenant.id,
				},
			},
		);
		expect(res.status()).toBe(403);
	});
});

const scoped = ['/leaseInvoices', '/expenses'];

for (const route of scoped) {
	test(`cannot get ${route} `, async ({ portfolio, request }) => {
		const url = `/portfolios/${portfolio.id}${route}`;

		const res = await request.get(url);

		await expect.soft(res).not.toBeOK();

		expect(res.status()).toBe(403);
	});
}

test('cannot get /files', async ({ portfolio, request }) => {
	const res = await request.get(
		resolveURL('organizations', portfolio.organizationId, 'files'),
		{
			params: {
				relationKey: 'portfolio',
				relationValue: portfolio.id,
			},
		},
	);

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});

const units = ['/units', '/units-minimal'];

for (const route of units) {
	test(`can get units: ${route}`, async ({ portfolio, request }) => {
		const url = `/portfolios/${portfolio.id}${route}`;

		const res = await request.get(url);

		await expect(res).not.toBeOK();
		expect(res.status()).toBe(403);
	});
}
