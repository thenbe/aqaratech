import prisma from '$lib/config/prisma';
import { formSchema, entityData } from '$lib/definitions/client';
import type { Prisma } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const patch: RequestHandler = async (event) => {
	type Updated = Prisma.ClientUpdateArgs['data'];
	const data: Updated = await event.request.json();

	try {
		formSchema.parse(data);
		if (data.dob) {
			data.dob = new Date(data.dob);
		}
		const updated = await prisma.client.update({
			where: { id: event.params.id },
			data,
			select: entityData.select,
		});
		return {
			status: 200,
			body: updated,
		};
	} catch (error: any) {
		console.error(error);
		return {
			status: 400,
			body: {
				error: error.message,
			},
		};
	}
};

export const del: RequestHandler = async (event) => {
	const deleted = await prisma.client.delete({
		where: {
			id: event.params.id,
		},
	});
	return {
		body: {
			message: 'Deleted',
			deleted,
		},
	};
};

export const get: RequestHandler = async (event) => {
	const data = await prisma.client.findUnique({
		where: {
			id: event.params.id,
		},
		select: entityData.select,
	});
	return {
		body: data,
	};
};
