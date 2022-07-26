import {
	AnalyticsApi,
	Configuration,
	ExpensesApi,
	LeaseInvoicesApi,
	LeasesApi,
	OrganizationsApi,
	PortfoliosApi,
	PropertiesApi,
	RolesApi,
	SearchApi,
	TenantsApi,
	UnitsApi,
} from '@self/sdk';
import type { LoadEvent } from '@sveltejs/kit';

export const api = ({
	loadFetch,
	token,
	roleId,
}: {
	loadFetch?: LoadEvent['fetch'];
	token: string;
	roleId?: string | undefined;
}) => {
	const headers = {
		Authorization: `Bearer ${token}`,
		...(roleId && { 'x-role-id': roleId }),
	};

	// const basePath = import.meta.env.VITE_API_URL || 'http://localhost:3002';
	const basePath = import.meta.env.VITE_API_URL;
	// const basePath = 'http://localhost:3002';
	// const basePath = 'https://localhost/api';
	// const basePath = 'https://localhost/api/';

	const config = new Configuration({
		...(loadFetch && { fetchApi: loadFetch }),
		headers,
		basePath,
	});

	return {
		tenants: new TenantsApi(config),
		portfolios: new PortfoliosApi(config),
		properties: new PropertiesApi(config),
		units: new UnitsApi(config),
		leases: new LeasesApi(config),
		leaseInvoices: new LeaseInvoicesApi(config),
		expenses: new ExpensesApi(config),
		roles: new RolesApi(config),
		search: new SearchApi(config),
		analytics: new AnalyticsApi(config),
		organizations: new OrganizationsApi(config),
	};
};

export type Api = ReturnType<typeof api>;
