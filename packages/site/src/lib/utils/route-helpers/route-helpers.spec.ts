import {
	PageType,
	type GetRouteInput,
} from '$lib/utils/route-helpers/route-helpers.type';
import { expect, test } from 'vitest';
import { getRoute } from './get-route';

const params = {
	organizationId: '1',
	portfolioId: '2',
};

const inputs: [GetRouteInput, string][] = [
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
];

test.each(inputs)('getRoute(%o) === %s', (input, expected) => {
	expect(getRoute(input)).toBe(expected);
});
