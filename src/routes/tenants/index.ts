import prisma from '$lib/config/prisma';
import { select } from '$lib/definitions/Tenants';
import { parseParams } from '$lib/utils/table-utils';
import type { Prisma } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit/types/endpoint';

export const get: RequestHandler<{ totalItems: number; rows: any[] }> = async ({
	url,
	request,
	params,
}) => {
	const {
		options: { pageSize, search, skip, sortDir, sortKey },
	} = parseParams(url);
	console.log(params);
	console.log(url.search);
	console.log(request.url);
	console.log(pageSize);
	console.log(skip);

	const tenants = await prisma.tenant.findMany({
		take: pageSize,
		skip,
		orderBy: { [sortKey]: sortDir as Prisma.SortOrder },
		where: {
			OR: [
				{ firstName: { contains: search } },
				{ secondName: { contains: search } },
				{ thirdName: { contains: search } },
				{ lastName: { contains: search } },
				{ email: { contains: search } },
				{ phone: { contains: search } },
				{ civilid: { contains: search } },
			],
		},
		select,
	});
	// TODO optimize this
	const total = await prisma.tenant.count({
		where: {
			OR: [
				{ firstName: { contains: search } },
				{ secondName: { contains: search } },
				{ thirdName: { contains: search } },
				{ lastName: { contains: search } },
				{ email: { contains: search } },
				{ phone: { contains: search } },
				{ civilid: { contains: search } },
			],
		},
		select: {
			id: true,
		},
	});
	return {
		headers: {
			'cache-control': 's-maxage=3, stale-while-revalidate=59',
		},
		body: {
			rows: tenants,
			totalItems: total.id,
			pageSize,
		},
	};
};

export const post: RequestHandler = async (event) => {
	const data = await event.request.formData();
	const response = await prisma.tenant.create({
		data: {
			firstName: data.get('firstName')?.toString() || null,
			lastName: data.get('lastName')?.toString() || null,
			email: data.get('email')?.toString() || null,
			phone: data.get('phone')?.toString() || null,
			civilid: data.get('civilid')?.toString() || null,
		},
		select,
	});

	console.log(response);

	return {
		body: response,
	};
};
