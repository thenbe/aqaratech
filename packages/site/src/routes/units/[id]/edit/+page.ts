import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const unit = await api.units.findOne({ id: params.id });

	return { unit };
};
