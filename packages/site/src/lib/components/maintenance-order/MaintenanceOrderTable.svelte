<script lang="ts">
	import {
		createColumnHelper,
		renderComponent,
		type ColumnDef,
	} from '@tanstack/svelte-table';

	import { page } from '$app/stores';

	import { toUTCFormat } from '@self/utils';

	import Badge from '$lib/components/Badge.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
	import FilterHero from '$lib/components/filter/FilterHero.svelte';
	import {
		locationColumnDef,
		viewColumnDef,
	} from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getMaintenanceOrderBadge } from '$lib/utils/get-badge';

	import type {
		MaintenanceOrderDto,
		PaginatedMaintenanceOrderDto,
	} from '$api/openapi';

	export let data: PaginatedMaintenanceOrderDto;
	export let extraColumns: ColumnDef<MaintenanceOrderDto, string>[] = [];

	const columnHelper = createColumnHelper<MaintenanceOrderDto>();

	const columns = [
		columnHelper.accessor('completedAt', {
			header: 'Completed At',
			cell: (info) => {
				const value = info.getValue();
				return value ? toUTCFormat(value) : null;
			},
		}),

		columnHelper.accessor('status', {
			header: 'Status',
			cell: (props) => {
				const status = props.row.original.status;

				const badge = getMaintenanceOrderBadge(status);

				return renderComponent(Badge, {
					label: badge.label,
					badgeColor: badge.color,
				});
			},
		}),

		...extraColumns,

		locationColumnDef(columnHelper),

		viewColumnDef(columnHelper, 'maintenanceOrder', $page.params),
	];
</script>

<Table items={data.results} paginationDto={data.pagination} {columns}>
	<div slot="filter" let:filters>
		<FilterBar responsive={filters}>
			<div slot="hero">
				<!-- Don't show hero if we're on the unit/property pages -->
				{#if !('unitId' in $page.params) && !('propertyId' in $page.params)}
					<FilterHero title="Maintenance" />
				{/if}
			</div>
			<div slot="custom">
				<!-- Only show button if we're on the unit page -->
				{#if 'unitId' in $page.params || 'propertyId' in $page.params}
					<FilterBarButtonForm
						getRouteOptions={{
							entity: 'maintenanceOrder',
						}}
					/>
				{/if}
			</div>
		</FilterBar>
	</div>
</Table>