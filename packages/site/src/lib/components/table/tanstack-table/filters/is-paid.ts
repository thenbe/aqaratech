import { invalidate } from '$app/navigation';
import { derived, get } from 'svelte/store';
import type { Readable } from 'svelte/store';

import L from '$i18n/i18n-svelte';
import { getIntlLabel } from '$lib/i18n/get-intl-label';
import {
	FILTER_TYPE,
	type Filter,
} from '$lib/models/interfaces/filter.interface';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { isPaid, PAID_STATUS } from '$lib/stores/filter/is-paid';

export const isPaidFilter = derived(isPaid, ($isPaid) => {
	const LL = get(L);

	return {
		id: FilterEnum.IsPaid,
		label: getIntlLabel('isPaid', false),
		type: FILTER_TYPE.RADIO,
		options: [
			{
				label: LL.badge.paid(),
				value: PAID_STATUS.PAID,
				active: $isPaid === true,
				action: async () => {
					isPaid.set(true);
					await invalidate(FilterEnum.IsPaid);
				},
			},
			{
				label: LL.badge.unpaid(),
				value: PAID_STATUS.UNPAID,
				active: $isPaid === false,
				action: async () => {
					isPaid.set(false);
					await invalidate(FilterEnum.IsPaid);
				},
			},
			{
				label: LL.general.all(),
				value: PAID_STATUS.ALL,
				active: $isPaid === undefined,
				action: async () => {
					isPaid.set(undefined);
					await invalidate(FilterEnum.IsPaid);
				},
			},
		],
	};
}) satisfies Readable<Filter>;
