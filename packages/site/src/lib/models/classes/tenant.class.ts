import type { InferQueryOutput } from '$lib/client/trpc.js';
import { Field } from '$lib/models/classes/Field.class.js';
import { concatIfExists, getName, toDateInput } from '$lib/utils/common.js';
import type { Tenant as PTenant } from '@prisma/client';
import * as R from 'remeda';
import type { z } from 'zod';
import { schema as baseSchema } from '../schemas/tenant.schema.js';
import { Entity } from './entity.class.js';

export class Tenant extends Entity {
	static urlName = 'tenants' as const;
	static singular = 'tenant';
	static singularCap = 'Tenant';
	static plural = 'tenants';
	static pluralCap = 'Tenants';
	static schema = baseSchema;

	constructor(
		public data?:
			| InferQueryOutput<'tenants:basic'>
			| InferQueryOutput<'tenants:read'>
			| Partial<PTenant>
			| InferQueryOutput<'tenants:list'>['data'][number],
		public urlName = Tenant.urlName,
		public singular = 'tenant',
		public singularCap = 'Tenant',
		public plural = 'tenants',
		public pluralCap = 'Tenants',
		public schema = baseSchema,
	) {
		super();
	}

	defaultForm = (): z.input<typeof baseSchema> => ({
		firstName: '',
		secondName: '',
		lastName: '',
		dob: '',
		email: '',
		civilid: '',
		phone: '',
		nationality: '',
		passportNum: '',
		residencyNum: '',
		residencyEnd: '',
	});

	override basicFields = [
		new Field('firstName', { required: true, value: this.data?.firstName }),
		new Field('secondName', { value: R.pathOr(this.data, ['secondName'], '') }),
		new Field('lastName', { required: true, value: this.data?.lastName }),
		new Field('email', {
			type: 'email',
			hint: "Adding a tenant's email unlocks (1) email payment reminders and (2) tenant portal invitations.",
			value: this.data?.email,
		}),
		new Field('phone', {
			hint: "Adding a tenant's phone unlocks SMS payment reminders.",
			value: this.data?.phone,
		}),
		new Field('dob', {
			type: 'date',
			label: 'Date of Birth',
			value: toDateInput(R.pathOr(this.data, ['dob'], '')),
		}),
		new Field('civilid', {
			label: 'Civil ID',
			value: R.pathOr(this.data, ['civilid'], ''),
		}),
		new Field('passportNum', {
			label: 'Passport Number',
			value: R.pathOr(this.data, ['passportNum'], ''),
		}),
		new Field('nationality', {
			value: R.pathOr(this.data, ['nationality'], ''),
		}),
		new Field('residencyNum', {
			label: 'Residency Number',
			value: R.pathOr(this.data, ['residencyNum'], ''),
		}),
		new Field('residencyEnd', {
			type: 'date',
			label: 'Residency Expiration',
			value: toDateInput(R.pathOr(this.data, ['residencyEnd'], '')),
		}),
	];

	static getLabel = (item: ILabel) => getName(item, false);

	override getLabel = () => {
		if (this?.data?.firstName && this.data.lastName) {
			return concatIfExists([
				this.data.firstName,
				this.data.secondName,
				this.data.lastName,
			]);
		} else {
			console.warn('no firstName or lastName');
			return '';
		}
	};
}

interface ILabel {
	firstName: string | null;
	lastName: string | null;
}
