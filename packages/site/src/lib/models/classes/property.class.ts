import type { InferQueryOutput } from '$lib/client/trpc.js';
import { Client } from '$lib/models/classes/client.class.js';
import { getAddress } from '$lib/utils/common.js';
import { schema as baseSchema } from '../schemas/property.schema.js';
import type { Property as PProperty } from '@prisma/client';
import type { z } from 'zod';
import { Entity } from './entity.class.js';
import { Field } from '$lib/models/classes/Field.class.js';

export class Property extends Entity {
	static urlName = 'properties' as const;
	static singular = 'property';
	static singularCap = 'Property';
	static plural = 'properties';
	static pluralCap = 'Properties';
	static schema = baseSchema;
	static relationalFields = ['clientId'] as const;

	constructor(
		public data?:
			| InferQueryOutput<'properties:basic'>
			| InferQueryOutput<'properties:read'>
			| Partial<PProperty>
			| InferQueryOutput<'properties:list'>['data'][number],
		public urlName = Property.urlName,
		public singular = 'property',
		public singularCap = 'Property',
		public plural = 'properties',
		public pluralCap = 'Properties',
		public schema = baseSchema,
		public override relationalFields = Property.relationalFields,
	) {
		super();
	}

	defaultForm = (): Record<
		keyof Omit<z.input<typeof baseSchema>, 'id'>,
		any
	> => ({
		area: '',
		block: '',
		avenue: '',
		street: '',
		number: '',
		paci: '',
		parcel: '',
		clientId: '',
	});

	get basicFields() {
		return [
			new Field('area', { required: true, value: this.data?.area }),
			new Field('block', { required: true, value: this.data?.block }),
			new Field('avenue', { value: this.data?.avenue }),
			new Field('street', { required: true, value: this.data?.street }),
			new Field('number', { required: true, value: this.data?.number }),
			new Field('parcel', {
				required: false,
				value: this.data?.parcel,
				hint: 'رقم القسيمة',
			}),
			new Field('paci', {
				required: false,
				value: this.data?.paci,
				hint: 'الرقم الآلي للعنوان',
			}),
		];
	}

	override getRelationOptions = () => ({
		client:
			this.data && 'client' in this.data
				? new Client(this.data.client).toOption()
				: undefined,
		property: undefined,
		unit: undefined,
		tenant: undefined,
		lease: undefined,
	});

	public static getLabel = (item: ILabel) => getAddress(item);

	// TODO: DRY this with Entity classes once the following is fixed:
	// Problem: importing property.class in a test file breaks vscode playwright extenstion
	override getLabel = () => {
		if (this?.data?.area && this.data.block && this.data.number) {
			return getAddress(this.data);
			// return concatIfExists([
			// 	this.data.area,
			// 	'ق',
			// 	this.data.block,
			// 	'م',
			// 	this.data.number,
			// ]);
		} else {
			console.warn('no area or block');
			return '';
		}
	};

	static getParentFilter = (id: string) => ({
		clientId: id,
	});
}

interface ILabel {
	area: string | null;
	block: string | null;
	street: string | null;
	number: string | null;
}
