import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { createdAt, updatedAt } from '../utils/dates';
import { fakeDate } from '../utils/fake-date';

import type { Lease } from '../utils/date-or-string';

const base = Factory.Sync.makeFactoryWithRequired<
	Lease,
	'organizationId' | 'portfolioId' | 'unitId' | 'tenantId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	// Dates
	start: Factory.each(() => fakeDate()),

	end: Factory.each(() => fakeDate()),

	license: Factory.each(() => faker.company.buzzPhrase()),

	monthlyRent: Factory.each(
		() => Math.round(faker.number.int({ min: 500, max: 3000 }) / 50) * 50,
	),

	deposit: Factory.each(
		() => Math.round(faker.number.int({ min: 500, max: 2000 }) / 100) * 100,
	),

	canPay: Factory.each(() => faker.datatype.boolean()),

	notify: Factory.each(() => faker.datatype.boolean()),
});

export const leaseFactory = base.withDerivation('end', (lease) => {
	const end = new Date(lease.start);
	end.setFullYear(end.getFullYear() + 1);
	return end.toISOString().slice(0, 10);
});

export const leasePartialFactory = () =>
	leaseFactory.build({
		organizationId: '',
		portfolioId: '',
		tenantId: '',
		unitId: '',
	});

export type LeaseFactoryParams = Partial<
	Parameters<typeof leaseFactory.build>[0]
>;
