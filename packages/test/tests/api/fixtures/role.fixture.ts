import { roleFactory } from '@self/seed';
import * as R from 'remeda';
import type { RoleDto } from '../../../types/api';
import { PostUrlRole } from '../../../utils/post-url';
import { apiURL } from './api-url';
import type { AllFixtures } from './test-fixtures.interface';

export const roleFixtures: AllFixtures = {
	roleParams: [undefined, { option: true }],

	role: async ({ org, portfolio, tenant, request, roleParams }, use) => {
		const role = roleFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			tenantId: tenant.id,
			...roleParams,
		});

		const url = PostUrlRole({
			organizationId: role.organizationId,
			portfolioId: role.portfolioId,
			tenantId: role.tenantId,
		})[role.roleType];

		const res = await request.post(`${apiURL}${url}`, {
			data: R.pick(role, ['email']),
		});

		const created = (await res.json()) as RoleDto;

		await use(created);
	},
};