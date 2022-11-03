import { portfolioRoute } from '$lib/utils/route-helpers';
import {
	PageType,
	type GetIdRouteInput,
} from '$lib/utils/route-helpers/route-helpers.type';
import { entitiesMap } from '@self/utils';

export const getIdRoute = (input: GetIdRouteInput) => {
	const portfolio = portfolioRoute(input.params);

	const entity = entitiesMap[input.entity].urlName;

	if (input.page === PageType.Id) {
		return `${portfolio}/${entity}/${input.id}`;
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	} else if (input.page === PageType.Edit) {
		return `${portfolio}/${entity}/${input.id}/edit`;
	} else {
		throw new Error(`Invalid page address`);
	}
};
