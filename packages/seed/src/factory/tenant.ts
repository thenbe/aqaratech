import { faker } from '@faker-js/faker';
import type { Tenant } from '@prisma/client';
import * as Factory from 'factory.ts';
import type { Strict } from '../utils/strict';
import { abstractFactory } from './abstract';

export const tenantFactory = Factory.Sync.makeFactoryWithRequired<
	Strict<Tenant>,
	'organizationId'
>({
	fullName: faker.name.fullName(),
	// @ts-expect-error factory.ts does not support optional/nullable properties
	label: null,
	civilid: faker.datatype
		.number({ min: 200000000000, max: 399999999999 })
		.toString(),
	dob: faker.date.past(),
	phone: faker.phone.number('9#######'),
	passportNum: faker.datatype
		.number({ min: 100000000, max: 999999999 })
		.toString(),
	nationality: faker.address.countryCode('alpha-3'),
	residencyNum: faker.datatype
		.number({ min: 100000000, max: 999999999 })
		.toString(),
	residencyEnd: faker.date.future(2),
}).combine(abstractFactory);
