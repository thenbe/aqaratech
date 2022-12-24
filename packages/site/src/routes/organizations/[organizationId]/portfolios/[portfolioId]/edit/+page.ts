import type { PageLoad } from './$types';

import { createApi } from '$api';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const portfolio = await api.portfolios.findOne({
		id: params.portfolioId,
	});

	return { portfolio };
};
