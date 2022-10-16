import { api } from '$api';
import { respondWithCsv } from '$lib/utils/respond-with-csv';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const payouts = await api(fetch).portfolios.findPayouts({
		take: 999999999,
		id: params.id,
	});

	return respondWithCsv(payouts.results, 'payouts');
};
