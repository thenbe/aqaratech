import { ForbiddenError, subject } from '@casl/ability';
import { Injectable } from '@nestjs/common';

import { computeLabelProperty } from '@self/utils';

import { Action } from 'src/casl/action.enum';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { fuzzyMatch } from 'src/search/fuzzy/fuzzy-match';
import { searchBuilder } from 'src/search/search-builder';

@Injectable()
export class SearchService {
	constructor(private readonly prisma: PrismaService) {}

	async search({
		query,
		organizationId,
		user,
	}: {
		query: string;
		organizationId: string;
		user: IUser;
	}) {
		// search is only allowed for admins
		// TODO: Remove and rely on ability check?
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Manage,
			subject('Organization', { id: organizationId }),
		);

		const take = 20;

		const [tenants, portfolios, properties] = await Promise.all([
			this.prisma.tenant.findMany({
				// FIX:add permissions to filter
				where: {
					OR: [
						...searchBuilder('fullName', query),
						...searchBuilder('label', query),
						...searchBuilder('phone', query),
						...searchBuilder('civilid', query),
						...searchBuilder('passportNum', query),
						...searchBuilder('residencyNum', query),
						// email
						// prettier-ignore
						{ roles: { some: { user: { OR: searchBuilder('email', query) } } } },
					],
				},
				take,
			}),
			this.prisma.portfolio.findMany({
				where: {
					// FIX:add permissions to filter
					OR: [
						...searchBuilder('fullName', query),
						...searchBuilder('phone', query),
						...searchBuilder('label', query),
						...searchBuilder('civilid', query),
						// email
						// prettier-ignore
						{ roles: { some: { user: { OR: searchBuilder('email', query) } } } },
					],
				},
				take,
			}),
			this.prisma.property.findMany({
				// FIX:add permissions to filter
				where: {
					OR: [
						...searchBuilder('label', query),
						...searchBuilder('paci', query),
						...searchBuilder('area', query),
						...searchBuilder('street', query),
						// ...searchBuilder('portfolioId', query), // WARN: Remove? Inherited from old search
						// ...searchBuilder('address', query), // NOTE: Use client extensions to search in address?
					],
				},
				take,
			}),
		]);

		const hits = {
			tenants: fuzzyMatch(query, tenants).map((n) => ({
				...n,
				// @ts-expect-error
				title: n.label || n.fullName,
				entityType: 'tenant',
			})),

			portfolios: fuzzyMatch(query, portfolios).map((n) => ({
				...n,
				// @ts-expect-error
				title: n.label || n.fullName,
				entityType: 'portfolio',
			})),

			properties: fuzzyMatch(query, properties).map((n) => ({
				...n,
				// @ts-expect-error
				title: n.label || computeLabelProperty(n),
				entityType: 'property',
			})),
		};

		// TODO: Add common title field
		console.log(hits); // TODO: remove
		return hits;
	}
}
