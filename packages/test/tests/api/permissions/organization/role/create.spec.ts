import { randomUUID } from 'crypto';

import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';

import { sample } from '@self/seed';

import { PostUrlRole } from '../../../../../utils/post-url';
import { test } from '../../../api-fixtures';

const roleTypes = ['ORGADMIN', 'PORTFOLIO', 'TENANT'] as const;

for (const roleType of roleTypes) {
	test(`can create role in own org: ${roleType}`, async ({
		request,
		org,
		portfolio,
		tenant,
	}) => {
		const email = faker.internet.email();

		const url = PostUrlRole({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			tenantId: tenant.id,
		})[roleType];

		const res = await request.post(url, { data: { email } });

		expect(res.status()).toBe(201);
	});

	test(`cannot create role in another org ${roleType}`, async ({
		request,
		org: _org,
		portfolio,
		tenant,
	}) => {
		const email = faker.internet.email();

		const url = PostUrlRole({
			organizationId: sample.organizations[0].id,
			portfolioId: portfolio.id,
			tenantId: tenant.id,
		})[roleType];

		const res = await request.post(url, { data: { email } });

		await expect.soft(res).not.toBeOK();

		expect(res.status()).toBe(403);
	});

	test(`cannot create role in non-existing org ${roleType}`, async ({
		request,
		org: _org,
		portfolio,
		tenant,
	}) => {
		const email = faker.internet.email();

		const url = PostUrlRole({
			organizationId: randomUUID(),
			portfolioId: portfolio.id,
			tenantId: tenant.id,
		})[roleType];

		const res = await request.post(url, { data: { email } });

		await expect.soft(res).not.toBeOK();

		expect(res.status()).toBe(403);
	});

	test(`cannot create role with invalid email ${roleType}`, async ({
		request,
		org,
		portfolio,
		tenant,
	}) => {
		const url = PostUrlRole({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			tenantId: tenant.id,
		})[roleType];

		const res = await request.post(url, { data: { email: 'invalid-email' } });

		await expect.soft(res).not.toBeOK();

		expect(res.status()).toBe(400);

		expect(await res.json()).toHaveProperty('fieldErrors.email');
	});

	test(`cannot create the same role twice ${roleType}`, async ({
		request,
		org,
		portfolio,
		tenant,
	}) => {
		const email = faker.internet.email();

		const url = PostUrlRole({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			tenantId: tenant.id,
		})[roleType];

		const res = await request.post(url, { data: { email } });

		expect(res.status()).toBe(201);

		const res2 = await request.post(url, { data: { email } });

		await expect.soft(res2).not.toBeOK();

		expect(res2.status()).toBe(400);

		expect(await res2.json()).toHaveProperty(
			'message',
			'Role already exists for this user',
		);
	});
}
