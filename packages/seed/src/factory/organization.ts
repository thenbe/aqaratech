import { faker } from '@faker-js/faker';
import type { Organization } from '@prisma/client';
import * as Factory from 'factory.ts';
import { createdAt, updatedAt } from '../utils/dates';
import { ID } from '../utils/uuid';

export const organizationFactory = Factory.Sync.makeFactory<Organization>({
	id: ID(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	fullName: faker.company.name(),
	label: null,
	isActive: faker.datatype.boolean(),
	planId: null,
});
