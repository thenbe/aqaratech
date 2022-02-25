import { paginationSchema } from '$lib/definitions/common';
import { schema } from '$lib/definitions/transaction';
import prismaClient from '$lib/server/prismaClient';
import * as trpc from '@trpc/server';
import { z } from 'zod';

export default trpc
	.router()
	.query('read', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.transaction.findUnique({
				where: {
					id,
				},
			}),
	})
	.query('basic', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.transaction.findUnique({
				where: {
					id,
				},
				include: {
					lease: true,
				},
			}),
	})
	.query('list', {
		input: paginationSchema,
		resolve: async ({ input }) => ({
			data: await prismaClient.transaction.findMany({
				take: input.size,
				skip: input.size * (input.pageIndex - 1),
				orderBy: {
					updatedAt: 'desc',
				},
			}),
			pagination: {
				size: input.size,
				start: input.size * (input.pageIndex - 1) + 1,
				pageIndex: input.pageIndex,
			},
		}),
	})
	.query('count', {
		resolve: () => prismaClient.transaction.count({}),
	})
	.mutation('save', {
		input: schema,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.transaction.update({
						data,
						where: { id },
				  })
				: prismaClient.transaction.create({
						data,
				  }),
	})
	.mutation('delete', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.transaction.delete({
				where: {
					id,
				},
				select: {
					id: true,
				},
			}),
	});
