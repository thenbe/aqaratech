import { expect } from '@playwright/test';
import * as R from 'remeda';

import { leaseFactory } from '@self/seed';
import { FIELDS } from '@self/utils';

import { test } from './api-fixtures';

const columns = ['portfolioId', 'unitId', ...FIELDS.lease.all] as const;

const utc = (year: number, month: number, day: number) =>
	new Date(Date.UTC(year, month, day)).toISOString();

test('lease start date cannot be after end date', async ({
	request,
	org,
	portfolio,
	unit,
	tenant,
}) => {
	const lease = R.pick(
		leaseFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			unitId: unit.id,
			tenantId: tenant.id,
			start: utc(2021, 0, 1),
			end: utc(2020, 0, 1),
		}),
		columns,
	);

	const url = `/organizations/${org.organization.id}/leases`;

	const res = await request.post(url, { data: lease });

	expect(res.status()).toBe(400);

	const body: unknown = await res.json();

	expect
		.soft(body)
		.toHaveProperty(
			'fieldErrors.start',
			expect.arrayContaining(['Start date must be before end date']),
		);

	expect
		.soft(body)
		.toHaveProperty(
			'fieldErrors.end',
			expect.arrayContaining(['End date must be after start date']),
		);
});

test('start needs to be a properly formatted date', async ({
	request,
	org,
	portfolio,
	unit,
	tenant,
}) => {
	const lease = R.pick(
		leaseFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			unitId: unit.id,
			tenantId: tenant.id,
			start: '2019-1-1',
			end: utc(2020, 0, 1),
		}),
		columns,
	);

	const url = `/organizations/${org.organization.id}/leases`;

	const res = await request.post(url, { data: lease });

	expect.soft(res.status()).toBe(400);

	const body: unknown = await res.json();

	expect
		.soft(body)
		.toHaveProperty(
			'fieldErrors.start',
			expect.arrayContaining(['Invalid date']),
		);
});

test('start needs to be a valid datestring', async ({
	request,
	org,
	portfolio,
	unit,
	tenant,
}) => {
	const lease = R.pick(
		leaseFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			unitId: unit.id,
			tenantId: tenant.id,
			start: 'abc',
			end: utc(2020, 0, 1),
		}),
		columns,
	);

	const url = `/organizations/${org.organization.id}/leases`;

	const res = await request.post(url, { data: lease });

	expect(res.status()).toBe(400);

	const body: unknown = await res.json();

	expect(body).toHaveProperty(
		'fieldErrors.start',
		expect.arrayContaining(['Invalid date']),
	);
});

test('start can be a date only', async ({
	request,
	org,
	portfolio,
	unit,
	tenant,
}) => {
	const lease = R.pick(
		leaseFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			unitId: unit.id,
			tenantId: tenant.id,
			start: '2022-01-01',
			end: '2022-12-31',
		}),
		columns,
	);

	const url = `/organizations/${org.organization.id}/leases`;

	const res = await request.post(url, { data: lease });

	expect.soft(res.status()).toBe(201);

	const body: unknown = await res.json();

	expect(body).toHaveProperty('start', '2022-01-01T00:00:00.000Z');
});

test('rejects date range validation if one date is invalid ', async ({
	request,
	org,
	portfolio,
	unit,
	tenant,
}) => {
	const lease = R.pick(
		leaseFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			unitId: unit.id,
			tenantId: tenant.id,
			start: '2022-01-01',
			end: '2022-99-12',
		}),
		columns,
	);

	const url = `/organizations/${org.organization.id}/leases`;

	const res = await request.post(url, { data: lease });

	expect.soft(res.status()).toBe(400);

	const body: unknown = await res.json();

	expect
		.soft(body)
		.not.toHaveProperty(
			'fieldErrors.start',
			expect.arrayContaining(['Invalid date']),
		);

	expect
		.soft(body)
		.toHaveProperty(
			'fieldErrors.end',
			expect.arrayContaining(['Invalid date']),
		);
});

test('end can be a date only', async ({
	request,
	org,
	portfolio,
	unit,
	tenant,
}) => {
	const lease = R.pick(
		leaseFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			unitId: unit.id,
			tenantId: tenant.id,
			start: '2021-01-01',
			end: '2022-01-01',
		}),
		columns,
	);

	const url = `/organizations/${org.organization.id}/leases`;

	const res = await request.post(url, { data: lease });

	expect.soft(res.status()).toBe(201);

	const body: unknown = await res.json();

	expect(body).toHaveProperty('end', '2022-01-01T00:00:00.000Z');
});

test('start can be an ISO date', async ({
	request,
	org,
	portfolio,
	unit,
	tenant,
}) => {
	const lease = R.pick(
		leaseFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			unitId: unit.id,
			tenantId: tenant.id,
			start: '2022-01-01',
			end: '2022-12-31',
		}),
		columns,
	);

	const url = `/organizations/${org.organization.id}/leases`;

	const res = await request.post(url, { data: lease });

	expect.soft(res.status()).toBe(201);

	const body: unknown = await res.json();

	expect(body).toHaveProperty('start', '2022-01-01T00:00:00.000Z');
	expect(body).toHaveProperty('end', '2022-12-31T00:00:00.000Z');
});

test('number can be a decimal', async ({
	request,
	org,
	portfolio,
	unit,
	tenant,
}) => {
	const lease = R.pick(
		leaseFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			unitId: unit.id,
			tenantId: tenant.id,
			monthlyRent: 123.456,
			deposit: 987.0,
		}),
		columns,
	);

	const url = `/organizations/${org.organization.id}/leases`;

	const res = await request.post(url, { data: lease });

	expect(res.status()).toBe(201);

	const body: unknown = await res.json();

	expect(body).toHaveProperty('monthlyRent', 123.456);
	expect(body).toHaveProperty('deposit', 987);
});

test('number can be a string', async ({
	request,
	org,
	portfolio,
	unit,
	tenant,
}) => {
	const lease = R.pick(
		leaseFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			unitId: unit.id,
			tenantId: tenant.id,
			// @ts-expect-error testing for number coercion
			monthlyRent: '123.456',
			// @ts-expect-error testing for number coercion
			deposit: '987.000',
		}),
		columns,
	);

	const url = `/organizations/${org.organization.id}/leases`;

	const res = await request.post(url, { data: lease });

	expect(res.status()).toBe(201);

	const body: unknown = await res.json();

	expect(body).toHaveProperty('monthlyRent', 123.456);
	expect(body).toHaveProperty('deposit', 987);
});
