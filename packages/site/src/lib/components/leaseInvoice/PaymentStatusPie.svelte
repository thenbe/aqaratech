<script lang="ts">
	import type { LeaseInvoiceAggregateDto } from '$api/openapi';
	import type { PieConfig } from '$lib/models/interfaces/pie-config.interface';

	import L from '$i18n/i18n-svelte';
	import Pie from '$lib/components/leaseInvoice/Pie.svelte';
	import { PAID_STATUS } from '$lib/stores/filter/is-paid';
	import { getColor } from '$lib/utils/colors';

	export let aggregate: LeaseInvoiceAggregateDto[];

	const config: PieConfig<Extract<typeof PAID_STATUS, 'PAID' | 'UNPAID'>> = {
		labels: {
			[PAID_STATUS.PAID]: $L.badge.paid(),
			[PAID_STATUS.UNPAID]: $L.badge.unpaid(),
		},
		colors: {
			[PAID_STATUS.PAID]: getColor(0, 2),
			[PAID_STATUS.UNPAID]: getColor(1, 2),
		},
		groupByFunc: (x) => (x.isPaid ? PAID_STATUS.PAID : PAID_STATUS.UNPAID),
	};
</script>

<Pie
	{aggregate}
	{config}
>
	<slot />
</Pie>
