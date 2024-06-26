import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { unitTypeOptions } from '../constants';
import { createdAt, updatedAt } from '../utils/dates';

import type { Unit } from '../utils/date-or-string';

const unitTypeValues = unitTypeOptions
	.filter((u) => u.value)
	.map((u) => u.value);

export const unitFactory = Factory.Sync.makeFactoryWithRequired<
	Unit,
	'organizationId' | 'portfolioId' | 'propertyId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	floor: Factory.each(() => faker.number.int({ min: -2, max: 10 })),

	size: Factory.each(() => faker.number.int({ min: 1, max: 2000 })),

	bed: Factory.each(() => faker.number.int({ min: 1, max: 10 })),

	bath: Factory.each(() => faker.number.int({ min: 1, max: 10 })),

	marketRent: Factory.each(() => faker.number.int({ min: 100, max: 3000 })),

	unitNumber: Factory.each(() =>
		faker.number.int({ min: 1, max: 100 }).toString(),
	),

	type: Factory.each(() => faker.helpers.arrayElement(unitTypeValues)),

	usage: Factory.each(() => null),

	label: Factory.each(() => null),
});

export const unitPartialFactory = () =>
	unitFactory.build({
		organizationId: '',
		portfolioId: '',
		propertyId: '',
	});

export type UnitFactoryParams = Partial<
	Parameters<typeof unitFactory.build>[0]
>;
