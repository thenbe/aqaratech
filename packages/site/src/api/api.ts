import { environment } from '$aqenvironment';
import * as SentryNode from '@sentry/node?server';
import * as SentrySvelte from '@sentry/svelte?client';
import type { LoadEvent } from '@sveltejs/kit';
import {
	AggregateApi,
	Configuration,
	ExpenseCategoriesApi,
	ExpensesApi,
	FilesApi,
	LeaseInvoicesApi,
	LeasesApi,
	OrganizationsApi,
	PayoutsApi,
	PortfoliosApi,
	PropertiesApi,
	RolesApi,
	SearchApi,
	TenantsApi,
	UnitsApi,
	UsersApi,
} from './openapi';

export const api = ({
	loadFetch,
	roleId,
}: {
	loadFetch?: LoadEvent['fetch'];
	roleId?: string | undefined;
}) => {
	const headers: Record<string, string> = {
		...(roleId ? { 'x-role-id': roleId } : {}),
		// origin: PUBLIC_SITE_URL,
	};

	let basePath: string;
	const isReverseProxy = environment.PUBLIC_API_URL.endsWith('/api');

	if (loadFetch && isReverseProxy) {
		basePath = '/api';
	} else {
		basePath = environment.PUBLIC_API_URL;
	}

	// Sentry
	let traceValue: string | undefined;

	if (import.meta.env.SSR) {
		const transactionNode = SentryNode.getCurrentHub()
			.getScope()
			?.getTransaction();

		traceValue = transactionNode?.toTraceparent();
	}

	if (!import.meta.env.SSR) {
		const transactionSvelte = SentrySvelte.getCurrentHub()
			.getScope()
			?.getTransaction();

		if (transactionSvelte) {
			traceValue = transactionSvelte.toTraceparent();
		} else {
			// create a new transaction manually
			// when running in load in the browser, the Sentry browser SDK does not create a transaction (yet)
			const transaction = SentrySvelte.startTransaction({
				op: 'site.api.call',
				name: 'api()',
			});

			traceValue = transaction.toTraceparent();
		}
	}

	if (traceValue) {
		// TODO avoid reusing api() more than once to ensure no duplicate trace headers
		// Applying middleware to the Config class causes loadFetch to be not used (duplicate data requests)
		// Alternative: update node version in production 18.3.0+
		headers['sentry-trace'] = traceValue;
	}

	const config = new Configuration({
		...(loadFetch ? { fetchApi: loadFetch } : {}),
		headers,
		basePath,
		credentials: 'include',
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
		aggregate: new AggregateApi(config),
		organizations: new OrganizationsApi(config),
		users: new UsersApi(config),
		expenseCategories: new ExpenseCategoriesApi(config),
		files: new FilesApi(config),
		payouts: new PayoutsApi(config),
	};
};

export type Api = ReturnType<typeof api>;
