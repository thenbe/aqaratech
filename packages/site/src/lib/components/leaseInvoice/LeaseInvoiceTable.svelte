<script lang="ts">
	import { createApi } from '$api';
	import type { LeaseInvoiceDto, PaginatedLeaseInvoiceDto } from '$api/openapi';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Badge from '$lib/components/Badge.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterRadio from '$lib/components/filter/FilterRadio.svelte';
	import ActionButton from '$lib/components/table/tanstack-table/ActionButton.svelte';
	import {
		locationColumnDef,
		viewColumnDef,
	} from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { addSuccessToast, handleApiError } from '$lib/stores/toast';
	import { toUTCFormat } from '$lib/utils/common';
	import { getInvoiceBadge } from '$lib/utils/get-badge';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';
	import Fa6SolidFileCsv from '~icons/fa6-solid/file-csv';

	export let data: PaginatedLeaseInvoiceDto;
	export let showOptions = false;

	const columnHelper = createColumnHelper<LeaseInvoiceDto>();

	const columns = [
		columnHelper.accessor('postAt', {
			header: 'Post Date',
			cell: (info) => toUTCFormat(info.getValue().toLocaleString()),
		}),

		columnHelper.accessor('dueAt', {
			header: 'Due Date',
			cell: (info) => {
				const val = info.getValue();
				return val ? toUTCFormat(val) : '';
			},
		}),

		columnHelper.accessor('paidAt', {
			header: 'Paid Date',
			cell: (info) => {
				const val = info.getValue();
				return val ? toUTCFormat(val) : '';
			},
		}),

		columnHelper.accessor('isPaid', {
			header: 'Paid',
			cell: (props) => {
				const invoice = props.row.original;

				const badge = getInvoiceBadge({
					dueAt: invoice.dueAt,
					isPaid: invoice.isPaid,
					postAt: invoice.postAt,
				});

				return renderComponent(Badge, {
					label: badge.label,
					badgeColor: badge.color,
				});
			},
		}),

		columnHelper.accessor('amount', {
			header: 'Amount (KWD)',
			cell: (info) => info.getValue().toLocaleString(),
		}),

		locationColumnDef(columnHelper),
		viewColumnDef(columnHelper, 'leaseInvoice', $page.params),
	];

	const adminColumns = [
		columnHelper.display({
			id: 'markAsPaid',
			header: '',
			cell: (props) => {
				const invoice = props.row.original;

				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return renderComponent(ActionButton, {
					options: {
						label: 'Mark as Paid',
						disabled: invoice.isPaid,
						onClick: async () => {
							try {
								await createApi().leaseInvoices.update({
									id: invoice.id,
									updateLeaseInvoiceDto: {
										isPaid: !invoice.isPaid,
										paidAt: invoice.isPaid
											? null
											: new Date().toISOString().split('T')[0],
									},
								});
								addSuccessToast('Invoice updated');
								await invalidateAll();
							} catch (e) {
								console.error(e);
								await handleApiError(e);
							}
						},
					},
				});
			},
		}),
	];
</script>

<Table
	items={data.results}
	paginationDto={data.pagination}
	columns={$page.data.user?.role?.roleType === 'ORGADMIN'
		? [...columns, ...adminColumns]
		: columns}
	paginationType="server"
	columnVisibility={{
		dueAt: false,
		paidAt: false,
	}}
>
	<div slot="filter" let:filters>
		<FilterBar responsive={filters}>
			<div slot="custom">
				{#if showOptions}
					<FilterRadio label="Options">
						<MenuItem as="div" let:active>
							<a
								href={`${$page.url.pathname}/csv`}
								download="leaseInvoices.csv"
							>
								<MenuItemChild {active}>
									<MenuItemIcon icon={Fa6SolidFileCsv} />
									Export to CSV
								</MenuItemChild>
							</a>
						</MenuItem>
					</FilterRadio>
				{/if}
			</div>
		</FilterBar>
	</div>
</Table>