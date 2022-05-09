import { trpc, type InferQueryOutput } from '$lib/client/trpc';
import { Client } from '$lib/models/classes/client.class';
import { getAddress } from '$lib/utils/common';
import { schema as baseSchema } from '$models/schemas/property.schema';
import type { Property as PProperty } from '@prisma/client';
import type { z } from 'zod';
import { Entity } from './entity.class';

export class Property extends Entity {
	static urlName = 'properties' as const;
	static singular = 'property';
	static singularCap = 'Property';
	static plural = 'properties';
	static pluralCap = 'Properties';
	static schema = baseSchema;
	static relationalFields = ['clientId'] as const;
	static basicFields = ['area', 'block', 'street', 'avenue', 'number'] as const;

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
		public override basicFields = Property.basicFields,
	) {
		super();
	}

	defaultForm = (): Partial<z.input<typeof baseSchema>> => ({
		area: '',
		block: '',
		avenue: '',
		street: '',
		number: '',
	});

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

	static getList = async (clientId?: string) => {
		const result = await trpc().query('properties:list', {
			size: 1000,
			clientId,
		});
		return result.data.map((data) => new Property(data));
	};

	static async grab(id: string) {
		const data = await trpc().query('properties:read', id);
		return new Property(data);
	}
}

interface ILabel {
	area: string | null;
	block: string | null;
	street: string | null;
	number: string | null;
}
