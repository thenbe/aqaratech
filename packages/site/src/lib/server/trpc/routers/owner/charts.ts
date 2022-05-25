import { Property, Unit } from '$lib/models/classes';
import prismaClient from '$lib/server/prismaClient';
import { getAddress } from '$lib/utils/common';
import { groupOccupancy } from '$lib/utils/group';
import { TRPCError } from '@trpc/server';
import * as R from 'remeda';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const filterSchema = z.object({
	clientId: z.string().uuid(),
	start: z.number(),
	end: z.number(),
	propertyId: z.string().uuid().nullish(),
	unitId: z.string().uuid().nullish(),
});

export const charts = createRouter()
	.middleware(({ ctx, next, rawInput }) => {
		const schema = z.object({ clientId: z.string().uuid() });
		const input = schema.safeParse(rawInput);
		if (!input.success) {
			throw new TRPCError({ code: 'BAD_REQUEST' });
		}
		if (ctx.authz.id === input.data.clientId || ctx.authz.isAdmin) {
			return next();
		}
		throw new TRPCError({ code: 'FORBIDDEN' });
	})
	.query('client', {
		input: z.object({
			clientId: z.string().uuid(),
		}),
		resolve: async ({ input }) => {
			const data = await prismaClient.client.findUnique({
				where: { id: input.clientId },
				include: { properties: { include: { client: true, units: true } } },
			});
			if (data) return data;
			throw new TRPCError({ code: 'NOT_FOUND', message: 'Client not found' });
		},
	})
	.query('income', {
		input: filterSchema,
		resolve: async ({
			input: { end, start, clientId, propertyId, unitId },
		}) => {
			const data = await prismaClient.client.findUnique({
				where: {
					id: clientId,
				},
				include: {
					properties: {
						take: 5, // TODO remove in prod
						where: propertyId ? { id: propertyId } : {},
						include: {
							units: {
								where: unitId ? { id: unitId } : {},
								include: {
									leases: {
										include: {
											transactions: {
												where: {
													postAt: {
														gte: new Date(start),
														lte: new Date(end),
													},
												},
												select: {
													id: true,
													postAt: true,
													amount: true,
													isPaid: true,
												},
											},
										},
									},
								},
							},
						},
					},
				},
			});
			if (!data) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Unable to get data',
				});
			}

			// single Client object => array of transactions
			const normalized = data.properties.flatMap((property) =>
				property.units.flatMap((unit) =>
					unit.leases.flatMap((lease) =>
						lease.transactions.flatMap((transaction) => {
							const { amount, isPaid, postAt, id } = transaction;
							const address = getAddress(property);
							const { propertyId } = unit;
							return {
								amount,
								isPaid,
								postAt,
								address,
								propertyId,
								id,
								property,
								unit,
							};
						}),
					),
				),
			);
			const slim = normalized.map((trx) => {
				return {
					...R.pick(trx, [
						'id',
						'amount',
						'isPaid',
						'propertyId',
						'address',
						'postAt',
					]),
					propertyLabel: Property.getLabel(trx.property),
					unitLabel: Unit.getLabel(trx.unit),
				};
			});
			const sorted = R.sortBy(slim, (i) => i.postAt);
			return sorted;
		},
	})
	.query('expenses', {
		input: filterSchema,
		resolve: async ({
			input: { end, start, clientId, propertyId, unitId },
		}) => {
			const dated = {
				where: {
					postAt: {
						gte: new Date(start),
						lte: new Date(end),
					},
				},
			};
			const ordered = {
				orderBy: {
					postAt: 'asc' as const,
				},
			};
			const getExpenses = {
				...dated,
				...ordered,
			};
			const data = await prismaClient.client.findUnique({
				where: {
					id: clientId,
				},
				include: {
					expenses: propertyId || unitId ? false : getExpenses,
					properties: {
						take: 5, // TODO remove in prod
						where: propertyId ? { id: propertyId } : {},
						include: {
							expenses: unitId ? false : getExpenses,
							units: {
								where: unitId ? { id: unitId } : {},
								include: {
									expenses: getExpenses,
								},
							},
						},
					},
				},
			});
			if (!data) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Unable to get data',
				});
			}

			// group all expenses in one array
			const clientExpenses =
				// if there's a property or unit id, then we only want the expenses for that property or unit
				propertyId || unitId
					? []
					: data.expenses.map((e) => ({
							...e,
							relatedProperty: null,
					  })) || [];
			const propertyExpenses = unitId
				? // if there's a unit id, then we only want the expenses for that unit
				  []
				: data.properties.flatMap(
						(property) =>
							property.expenses.map((e) => ({
								...e,
								relatedProperty: {
									area: property.area,
									block: property.block,
									street: property.street,
									number: property.number,
								},
							})) || [],
				  );
			const unitExpenses = data.properties.flatMap((property) =>
				property.units.flatMap(
					(unit) =>
						unit.expenses.map((e) => ({
							...e,
							relatedProperty: {
								area: property.area,
								block: property.block,
								street: property.street,
								number: property.number,
							},
						})) || [],
				),
			);
			type Trx =
				| typeof clientExpenses[0]
				| typeof propertyExpenses[0]
				| typeof unitExpenses[0];

			const all: Trx[] = [
				...clientExpenses,
				...propertyExpenses,
				...unitExpenses,
			];

			const slim = all.map((expense) => {
				return {
					...R.pick(expense, ['id', 'amount', 'expenseCategoryId', 'postAt']),
					address: expense.relatedProperty
						? Property.getLabel(expense.relatedProperty)
						: 'Common',
				};
			});

			const sorted = R.sortBy(slim, (e) => e.postAt);
			return sorted;
		},
	})
	.query('occupancy', {
		input: filterSchema,
		resolve: async ({
			input: { end, start, clientId, propertyId, unitId },
		}) => {
			const data = await prismaClient.client.findUnique({
				where: {
					id: clientId,
				},
				include: {
					properties: {
						where: propertyId ? { id: propertyId } : {},
						include: {
							units: {
								where: unitId ? { id: unitId } : {},
								include: {
									leases: true,
								},
							},
						},
					},
				},
			});
			if (!data) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Unable to get data',
				});
			}
			const occupancyData = groupOccupancy(
				data,
				new Date(start),
				new Date(end),
			);
			return occupancyData;
		},
	});
