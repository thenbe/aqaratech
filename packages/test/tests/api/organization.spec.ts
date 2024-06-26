import { expect } from '@playwright/test';
import * as R from 'remeda';

import { organizationFactory } from '@self/seed';

import { test } from './api-fixtures';

test(`can create organization`, async ({ request }) => {
	const organization = R.pick(organizationFactory.build(), [
		'fullName',
		'label',
	]);

	const res = await request.post(`/organizations`, {
		data: organization,
	});

	expect.soft(res.status()).toBe(201);
});

test(`can get organization`, async ({ request, org }) => {
	const res = await request.get(`/organizations/${org.organization.id}`);

	expect.soft(res.status()).toBe(200);
	expect.soft(await res.json()).toMatchObject({
		id: org.organization.id,
		fullName: org.organization.fullName,
		label: org.organization.label,
	});
});
