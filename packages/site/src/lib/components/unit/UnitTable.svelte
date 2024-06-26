<script lang="ts">
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	import { page } from '$app/stores';

	import { fmtCell } from '../table/tanstack-table/columns/as-date';

	import type { PaginatedUnitDto, UnitDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import Badge from '$lib/components/Badge.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
	import { viewColumnDef } from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getIntlLabel } from '$lib/i18n/get-intl-label';

	export let data: PaginatedUnitDto;

	const columnHelper = createColumnHelper<UnitDto>();

	const columns = [
		columnHelper.accessor('type', { header: getIntlLabel('type') }),

		columnHelper.accessor('unitNumber', { header: getIntlLabel('unitNumber') }),

		columnHelper.accessor('title', {
			id: 'computed.titleScore',
			header: getIntlLabel('label'),
		}),

		columnHelper.accessor('floor', {
			header: getIntlLabel('floor'),
			cell: fmtCell('number'),
		}),

		columnHelper.accessor('bed', {
			header: getIntlLabel('bed'),
			cell: fmtCell('number'),
		}),

		columnHelper.accessor('bath', {
			header: getIntlLabel('bath'),
			cell: fmtCell('number'),
		}),

		columnHelper.accessor('size', {
			header: getIntlLabel('size'),
			cell: fmtCell('number'),
		}),

		columnHelper.accessor('usage', { header: getIntlLabel('usage') }),

		columnHelper.accessor('propertyId', {
			header: $L.entity.property.singular(),
			cell: (info) => info.row.original.breadcrumbs.property.label,
		}),

		columnHelper.display({
			id: 'vacancy',
			header: $L.other.vacancy(),
			cell: (props) => {
				const unit = props.row.original;
				const isVacant = unit.vacancy.isVacant;
				return renderComponent(Badge, {
					label: isVacant ? $L.other.vacant() : $L.other.occupied(),
					badgeColor: isVacant ? 'green' : 'yellow',
				});
			},
		}),

		viewColumnDef(columnHelper, 'unit', $page.params),
	];
</script>

<Table
	items={data.results}
	paginationDto={data.pagination}
	{columns}
	columnVisibility={{
		propertyId: false,
		floor: false,
		usage: false,
	}}
>
	<div
		slot="filter"
		let:filters
	>
		<FilterBar responsive={filters}>
			<div slot="custom">
				<FilterBarButtonForm
					getRouteOptions={{
						entity: 'unit',
					}}
				/>
			</div>
		</FilterBar>
	</div>
</Table>
