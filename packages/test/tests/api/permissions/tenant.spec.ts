import { expect } from '@playwright/test';
import type { PaginatedTenantDto } from '../../../types/api';
import { test } from '../api-fixtures';

test.use({
	userRoleType: 'TENANT',
});

const accessible = ['/leases', '/leaseInvoices'];
const notAccessible = [
	'/portfolios',
	'/properties',
	'/units',
	'/expenses',
	'/aggregate/incomeByMonth',
	'/aggregate/expensesByMonth',
	// "/search",
];

// check all accessible routes
for (const route of accessible) {
	test(`should be able to get ${route}`, async ({ scopedRequest }) => {
		const res = await scopedRequest.get(route);
		await expect(res).toBeOK();
	});
}

// check all not accessible routes
for (const route of notAccessible) {
	test(`should not be able to get ${route}`, async ({ scopedRequest }) => {
		const res = await scopedRequest.get(route);
		expect(res.status()).toBe(403);
	});
}

test('can only get self from /tenants', async ({ scopedRequest }) => {
	const res = await scopedRequest.get('/tenants');

	const body = (await res.json()) as PaginatedTenantDto;

	expect(body.results.length).toBe(1);
});

// test('cannot get files from "/files"', async ({ tenant, scopedRequest }) => {
// 	const res = await scopedRequest.get('/files', {
// 		params: {
// 			relationKey: 'tenant',
// 			relationValue: tenant.id,
// 		},
// 	});
// 	expect(res.status()).toBe(403);
// });
