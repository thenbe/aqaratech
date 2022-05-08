import { trpc, type InferQueryOutput } from '$lib/client/trpc';
import { Entity } from '$lib/models/classes/entity.class';
import { Lease } from '$lib/models/classes/lease.class';
import { schema as baseSchema } from '$models/schemas/transaction.schema';
import type { Transaction as PTransaction } from '@prisma/client';
import type { z } from 'zod';

export class Transaction extends Entity {
	static urlName = 'transactions' as const;
	static singular = 'transaction';
	static singularCap = 'Transaction';
	static plural = 'transactions';
	static pluralCap = 'Transactions';
	static schema = baseSchema;

	constructor(
		public data:
			| InferQueryOutput<'transactions:basic'>
			| InferQueryOutput<'transactions:read'>
			| InferQueryOutput<'transactions:list'>['data'][number]
			| Partial<PTransaction>,
		public urlName = Transaction.urlName,
		public singular = 'transaction',
		public singularCap = 'Transaction',
		public plural = 'transactions',
		public pluralCap = 'Transactions',
		public schema = baseSchema,
	) {
		super();
	}
	
	defaultForm = (): z.input<typeof baseSchema> => ({
		dueAt: new Date(),
		postAt: new Date(),
		isPaid: false,
		amount: 0,
		memo: '',
		leaseId: '',
		paidAt: '',
	});

	basicFields = [
		'amount',
		'dueAt',
		'postAt',
		'isPaid',
		'paidAt',
		'memo',
	] as const;

	override getRelationOptions = (data = this.data) => ({
		lease: 'lease' in data ? new Lease(data.lease).toOption() : undefined,
		client: undefined,
		property: undefined,
		unit: undefined,
		tenant: undefined,
	});

	static getList = async () => {
		const result = await trpc().query('transactions:list', { size: 20 });
		return result.data.map((data) => new Transaction(data));
	};

	static async grab(id: string) {
		const data = await trpc().query('transactions:read', id);
		return new Transaction(data);
	}

	static getBadge = (trx: {
		isPaid: boolean;
		dueAt: Date | null;
		postAt: Date;
	}) => {
		if (trx.isPaid) {
			return {
				label: 'Paid',
				color: 'green',
			};
		} else if (trx.dueAt && trx.dueAt < new Date()) {
			return {
				label: 'Past due',
				color: 'red',
			};
		} else if (trx.postAt < new Date()) {
			return {
				label: 'Due',
				color: 'yellow',
			};
		} else {
			return {
				label: 'Not yet due',
				color: 'indigo',
			};
		}
	};
}
