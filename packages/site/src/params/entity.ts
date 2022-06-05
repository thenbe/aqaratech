import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	const entities = [
		'portfolios',
		'properties',
		'leases',
		'units',
		'tenants',
		'maintenanceOrders',
		'expenses',
		'transactions',
	];
	return entities.includes(param);
};
