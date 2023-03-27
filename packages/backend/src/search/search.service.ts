import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { computeLabelProperty } from '@self/utils';
import { IUser } from 'src/interfaces/user.interface';
import { PortfolioDto } from 'src/portfolios/dto/portfolio.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PropertyDto } from 'src/properties/dto/property.dto';
import { fuzzyMatch } from 'src/search/fuzzy/fuzzy-match';
import { TenantDto } from 'src/tenants/dto/tenant.dto';

import { SearchDto } from './dto/search.dto';

@Injectable()
export class SearchService {
	constructor(private readonly prisma: PrismaService) {}

	async search({
		query,
		user,
	}: {
		query: string;
		user: IUser;
	}): Promise<SearchDto> {
		const take = 20;
		const roleType = user.role.roleType;

		const portfoliosQuery = this.prisma.c.$queryRaw<PortfolioDto[]>(
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

		const propertiesQuery = this.prisma.c.$queryRaw<PropertyDto[]>(
			Prisma.sql`
				SELECT *,
					GREATEST(
						word_similarity("label", ${query}),
						word_similarity("paci", ${query}),
						word_similarity("area", ${query}),
						word_similarity("street", ${query})
					) AS score
				FROM "Property"
				WHERE ("label" % ${query}
						OR "paci" % ${query}
						OR "area" % ${query}
						OR "street" % ${query})
						AND "organizationId" = ${user.role.organizationId}
						${
							roleType === 'ORGADMIN'
								? Prisma.empty
								: Prisma.sql`AND "portfolioId" = ${user.role.portfolioId}`
						}
				ORDER BY score DESC
				LIMIT ${take};
			`,
		);

		const tenantsQuery = this.prisma.c.$queryRaw<TenantDto[]>(
			Prisma.sql`
				SELECT *,
					GREATEST(
						word_similarity("fullName", ${query}),
						word_similarity("label", ${query}),
						word_similarity("phone", ${query}),
						word_similarity("civilid", ${query}),
						word_similarity("passportNum", ${query}),
						word_similarity("residencyNum", ${query})
					) AS score
				FROM "Tenant"
				WHERE ("fullName" % ${query}
						OR "label" % ${query}
						OR "phone" % ${query}
						OR "civilid" % ${query}
						OR "passportNum" % ${query}
						OR "residencyNum" % ${query})
						AND "organizationId" = ${user.role.organizationId}
						${
							roleType === 'ORGADMIN'
								? Prisma.empty
								: Prisma.sql`AND EXISTS (
								SELECT 1 FROM "Lease" WHERE "Lease"."tenantId" = "Tenant"."id" AND "Lease"."portfolioId" = ${user.role.portfolioId}
							)`
						}
				ORDER BY score DESC
				LIMIT ${take};
			`,
		);

		const [_, tenants, properties, portfolios] =
			await this.prisma.c.$transaction([
				// lower the limit for the similarty function (default is 0.3)
				this.prisma.c.$executeRaw(Prisma.sql`SELECT set_limit(0.05);`),

				// ivs FIX:authz
				tenantsQuery,
				propertiesQuery,

				// avoid returning the portfolio of the user searching
				roleType === 'PORTFOLIO'
					? this.prisma.c.$executeRaw(Prisma.empty)
					: portfoliosQuery,
			]);

		const hits = {
			tenant: fuzzyMatch(query, tenants).map((n) => ({
				...n,
				entity: 'tenant',
				title: n.hints['label'] ?? n.label ?? n.hints['fullName'] ?? n.fullName,
			})),

			portfolio: Array.isArray(portfolios)
				? fuzzyMatch(query, portfolios).map((n) => ({
						...n,
						entity: 'portfolio',
						title:
							n.hints['label'] ?? n.label ?? n.hints['fullName'] ?? n.fullName,
				  }))
				: [],

			property: fuzzyMatch(query, properties).map((n) => ({
				...n,
				title: n.hints['label'] ?? n.label ?? computeLabelProperty(n),
				entity: 'property',
			})),
		} satisfies SearchDto;

		return hits;
	}
}
