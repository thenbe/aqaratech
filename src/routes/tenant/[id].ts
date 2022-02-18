import prisma from '$lib/server/prismaClient';
import { tenantBrowse, tenantData } from '$lib/definitions/select';
import { formSchema } from '$lib/definitions/tenant';
import type { RequestHandler } from '@sveltejs/kit';
import type { ShadowRequestHandler } from '@sveltejs/kit/types/endpoint';

export const patch: RequestHandler = async (event) => {
	const data = await event.request.json();

	try {
		formSchema.parse(data);
		const updated = await prisma.tenant.update({
			where: { id: event.params.id },
			data,
			select: tenantData.select,
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
	const deleted = await prisma.tenant.delete({
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

export const get: ShadowRequestHandler = async (event) => {
	const data = await prisma.tenant.findUnique({
		where: {
			id: event.params.id,
		},
		select: tenantBrowse.select,
	});
	return {
		body: { data },
	};
};
