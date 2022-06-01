import prismaClient from '$lib/server/prismaClient';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const expenseMeta = createRouter()
	.mutation('group:save', {
		input: z.object({
			id: z.number().optional(),
			en: z.string(),
			ar: z.string(),
		}),
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.expenseGroup.update({
						data,
						where: { id },
						select: {
							id: true,
							en: true,
							ar: true,
						},
				  })
				: prismaClient.expenseGroup.create({
						data,
						select: {
							id: true,
							en: true,
							ar: true,
						},
				  }),
	})
	.mutation('group:delete', {
		input: z.number(),
		resolve: async ({ input }) => {
			await prismaClient.expenseGroup.delete({
				where: { id: input },
			});
		},
	});
