import { expect, test } from 'vitest';

import { PageTab } from '../enums/page-tab.enum';
import { PageType } from '../enums/page-type.enum';
import { getRoute } from '../get-route';

import type { GetRoute } from '../types/route-helpers.type';

const params = {
	organizationId: '1',
	portfolioId: '2',
};

const inputs: [GetRoute, string][] = [
	// Organizations
	[
		{
			entity: 'organization',
			pageType: PageType.Id,
			params: {},
			id: '1',
		},
		'/organizations/1',
	],

	[
		{
			entity: 'organization',
			pageType: PageTab.Billing,
			params: {},
			id: '1',
		},
		'/organizations/1/billing',
	],

	// Properties
	[
		{
			entity: 'property',
			pageType: PageType.Id,
			params,
			id: '3',
		},
		'/organizations/1/portfolios/2/properties/3',
	],

	[
		{
			entity: 'property',
			pageType: PageType.Edit,
			params,
			id: '3',
		},
		'/organizations/1/portfolios/2/properties/3/edit',
	],

	[
		{
			entity: 'property',
			pageType: PageType.New,
			params,
		},
		'/organizations/1/portfolios/2/properties/new',
	],
	[
		{
			entity: 'property',
			pageType: PageType.New,
			params,
			predefined: {
				name: 'test',
			},
		},
		'/organizations/1/portfolios/2/properties/new?name=test',
	],
	[
		{
			entity: 'property',
			pageType: PageType.List,
			params,
		},
		'/organizations/1/portfolios/2/properties',
	],

	// Tenants
	[
		{
			entity: 'tenant',
			pageType: PageType.Id,
			params: { organizationId: '1' },
			id: '3',
		},
		'/organizations/1/tenants/3',
	],

	[
		{
			entity: 'tenant',
			pageType: PageType.Edit,
			params: { organizationId: '1' },
			id: '3',
		},
		'/organizations/1/tenants/3/edit',
	],

	[
		{
			entity: 'tenant',
			pageType: PageType.New,
			params: { organizationId: '1' },
		},
		'/organizations/1/tenants/new',
	],
	[
		{
			entity: 'tenant',
			pageType: PageType.New,
			params: { organizationId: '1' },
			predefined: {
				name: 'test',
			},
		},
		'/organizations/1/tenants/new?name=test',
	],
	[
		{
			entity: 'tenant',
			pageType: PageType.List,
			params: { organizationId: '1' },
		},
		'/organizations/1/tenants',
	],

	// Portfolios
	[
		{
			entity: 'portfolio',
			pageType: PageType.Id,
			params: { organizationId: '1' },
			id: '3',
		},
		'/organizations/1/portfolios/3',
	],

	[
		{
			entity: 'portfolio',
			pageType: PageType.Edit,
			params: { organizationId: '1' },
			id: '3',
		},
		'/organizations/1/portfolios/3/edit',
	],

	[
		{
			entity: 'portfolio',
			pageType: PageType.New,
			params: { organizationId: '1' },
		},
		'/organizations/1/portfolios/new',
	],
	[
		{
			entity: 'portfolio',
			pageType: PageType.New,
			params: { organizationId: '1' },
			predefined: {
				name: 'test',
			},
		},
		'/organizations/1/portfolios/new?name=test',
	],
	[
		{
			entity: 'portfolio',
			pageType: PageType.List,
			params: { organizationId: '1' },
		},
		'/organizations/1/portfolios',
	],
	[
		{
			entity: 'unit',
			pageType: PageType.New,
			params: { organizationId: '1', portfolioId: '2', propertyId: '3' },
		},
		'/organizations/1/portfolios/2/units/new?propertyId=3',
	],
	[
		{
			entity: 'lease',
			pageType: PageType.New,
			params: { organizationId: '1', portfolioId: '2', unitId: '3' },
		},
		'/organizations/1/portfolios/2/leases/new?unitId=3',
	],
	[
		{
			entity: 'role',
			pageType: PageType.New,
			params: { organizationId: '1', portfolioId: '2' },
			predefined: {
				relationKey: 'portfolio',
				relationValue: '2',
			},
		},
		'/organizations/1/roles/new?relationKey=portfolio&relationValue=2',
	],
	[
		{
			entity: 'role',
			pageType: PageType.New,
			params: { organizationId: '1', tenantId: '2' },
			predefined: {
				relationKey: 'tenant',
				relationValue: '2',
			},
		},
		'/organizations/1/roles/new?relationKey=tenant&relationValue=2',
	],
	[
		{
			entity: 'role',
			pageType: PageType.New,
			params: { organizationId: '1' },
			predefined: {
				relationKey: 'organization',
				relationValue: '1',
			},
		},
		'/organizations/1/roles/new?relationKey=organization&relationValue=1',
	],

	// Tenant portal
	[
		{
			entity: 'lease',
			pageType: PageType.List,
			params: { organizationId: '1', tenantId: '2' },
		},
		'/portal/tenant/2/leases',
	],
	[
		{
			entity: 'leaseInvoice',
			pageType: PageType.List,
			params: { organizationId: '1', tenantId: '2' },
		},
		'/portal/tenant/2/leaseInvoices',
	],
	[
		{
			entity: 'maintenanceOrder',
			pageType: PageType.List,
			params: { organizationId: '1', tenantId: '2' },
		},
		'/portal/tenant/2/maintenance-orders',
	],
];

test.each(inputs)('getRoute(%o) === %s', (input, expected) => {
	expect(getRoute(input)).toBe(`/en${expected}`);
});
