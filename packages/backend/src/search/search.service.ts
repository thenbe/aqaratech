import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';

import { computeLabelProperty } from '@self/utils';
import { Action } from 'src/casl/action.enum';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { fuzzyMatch } from 'src/search/fuzzy/fuzzy-match';

import { SearchDto } from './dto/search.dto';
import { SearchableFields } from './dto/searchable-fields';
import { fieldSearchBuilder } from './search-builder/field-search-builder';
import { searchFor } from './search-builder/search-for';

@Injectable()
export class SearchService {
	constructor(private readonly prisma: PrismaService) {}

	async search({ query, user }: { query: string; user: IUser }) {
		const take = 20;

		// lower the limit for the similarty function (default is 0.3)
		await this.prisma.c.$executeRaw(Prisma.sql`SELECT set_limit(0.1);`);

		const p = this.prisma.c.$queryRaw(
			Prisma.sql`
				SELECT *, 
					GREATEST(
						word_similarity("fullName", ${query}),
						word_similarity("label", ${query}),
						word_similarity("phone", ${query})
					) AS score
				FROM "Portfolio"
				WHERE ("fullName" % ${query}
						OR "label" % ${query}
						OR "phone" % ${query})
						AND "organizationId" = ${user.role.organizationId}
				ORDER BY score DESC
				LIMIT ${take};
			`,
		);

		const [tenants, portfolios, properties] = await Promise.all([
			this.prisma.c.tenant.findMany({
				where: {
					AND: [
						accessibleBy(user.ability, Action.Read).Tenant,
						{
							OR: [
								...searchFor(
									[
										'fullName',
										'label',
										'phone',
										'civilid',
										'passportNum',
										'residencyNum',
									] satisfies typeof SearchableFields.tenant,
									query,
								),

								// email
								// prettier-ignore
								{ roles: { some: { user: { OR: fieldSearchBuilder('email', query) } } } },
							],
						},
					],
				},
				take,
			}),
			// avoid returning the portfolio of the user searching
			user.role.roleType === 'PORTFOLIO'
				? []
				: this.prisma.c.portfolio.findMany({
						where: {
							AND: [
								accessibleBy(user.ability, Action.Read).Portfolio,
								{
									OR: [
										...searchFor(
											[
												'fullName',
												'label',
												'phone',
												'civilid',
											] satisfies typeof SearchableFields.portfolio,
											query,
										),

										// email
										// prettier-ignore
										{ roles: { some: { user: { OR: fieldSearchBuilder('email', query) } } } },
									],
								},
							],
						},
						take,
				  }),
			this.prisma.c.property.findMany({
				where: {
					AND: [
						accessibleBy(user.ability, Action.Read).Property,
						{
							OR: [
								...searchFor(
									[
										'label',
										'paci',
										'area',
										'street',
									] satisfies typeof SearchableFields.property,
									query,
								),
							],
						},
					],
				},
				take,
			}),
		]);

		const hits = {
			tenant: fuzzyMatch(query, tenants).map((n) => ({
				...n,
				entity: 'tenant',
				title: n.hints['label'] ?? n.label ?? n.hints['fullName'] ?? n.fullName,
			})),

			portfolio: fuzzyMatch(query, portfolios).map((n) => ({
				...n,
				entity: 'portfolio',
				title: n.hints['label'] ?? n.label ?? n.hints['fullName'] ?? n.fullName,
			})),

			property: fuzzyMatch(query, properties).map((n) => ({
				...n,
				title: n.hints['label'] ?? n.label ?? computeLabelProperty(n),
				entity: 'property',
			})),
		} satisfies SearchDto;

		return hits;
	}
}
