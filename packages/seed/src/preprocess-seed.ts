import type { Seed } from './create-seed';
import {
	changePermissionsToUndefined,
	convertToDatetimeArray,
	removeEmail,
} from './sanitize';

export const preprocessSeed = (seed: Seed) => {
	const roles = changePermissionsToUndefined(removeEmail(seed.roles));

	const tenants = seed.tenants.map((tenant) =>
		convertToDatetimeArray(['dob'], tenant),
	);

	const portfolios = seed.portfolios.map((portfolio) =>
		convertToDatetimeArray(['dob'], portfolio),
	);

	const leases = seed.leases.map((lease) =>
		convertToDatetimeArray(['start', 'end'], lease),
	);

	const leaseInvoices = seed.leaseInvoices.map((leaseInvoice) =>
		convertToDatetimeArray(['postAt', 'dueAt', 'paidAt'], leaseInvoice),
	);

	const expenses = seed.expenses.map((expense) =>
		convertToDatetimeArray(['postAt'], expense),
	);

	const payouts = seed.payouts.map((payout) =>
		convertToDatetimeArray(['postAt'], payout),
	);

	const processedSeed = {
		...seed,
		roles,
		tenants,
		portfolios,
		leases,
		leaseInvoices,
		expenses,
		payouts,
	};

	return processedSeed;
};

export type PreprocessedSeed = ReturnType<typeof preprocessSeed>;