<script lang="ts">
	import { MenuItem } from '@rgossiaux/svelte-headlessui';

	import { page } from '$app/stores';
	import { getRoute, PageType, type Entity } from '@self/utils';

	import type { IconTooltip } from '$lib/models/types/icon-tooltip.type';

	import L from '$i18n/i18n-svelte';
	import Dropdown from '$lib/components/buttons/Dropdown.svelte';
	import DropdownMenu from '$lib/components/buttons/DropdownMenu.svelte';
	import HybridButton from '$lib/components/buttons/HybridButton.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import {
		createModalDelete,
		type OnDelete,
	} from '$lib/components/toast/create-modal-delete';
	import { openModal } from '$lib/components/toast/Modal.svelte';
	import { classes } from '$lib/utils/classes';
	import Fa6SolidTrashCan from '~icons/fa6-solid/trash-can';

	export let title: string;
	export let id: string;
	export let entity: Entity;
	export let icons: IconTooltip[] | undefined = undefined;
	export let deletePrompt: string | undefined = undefined;
	export let disallowEdit = false;
	export let onDelete: OnDelete | undefined = undefined;
</script>

<div class="grid grid-cols-2 items-center justify-between gap-y-4 print:hidden">
	<!-- Breadcrumbs -->
	{#if $$slots.breadcrumbs}
		<div class="col-span-full">
			<slot name="breadcrumbs" />
		</div>
	{/if}

	<!-- Title -->
	<h2
		class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
	>
		{title}
	</h2>

	{#if $page.data.user?.role?.roleType === 'ORGADMIN'}
		<!-- Edit/Delete button -->
		<div class="flex justify-end">
			<Dropdown>
				<div slot="beforeButton">
					<a
						href={disallowEdit
							? null
							: getRoute({
									entity,
									pageType: PageType.Edit,
									id,
									params: $page.params,
							  })}
						class={classes(
							'relative inline-flex items-center border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ltr:rounded-l-md rtl:rounded-r-md',
							disallowEdit ? 'cursor-not-allowed opacity-50' : '',
						)}
					>
						{$L.buttons.edit()}
					</a>
				</div>
				<div slot="button">
					<!-- Rename to HybridButtonChevron  -->
					<HybridButton />
				</div>
				<div slot="menu">
					<DropdownMenu>
						<slot name="menu-items" />
						<MenuItem
							as="div"
							disabled={!onDelete}
							let:active
							let:disabled
						>
							<button
								{disabled}
								on:click={() => {
									if (!onDelete) {
										throw new Error('Delete not allowed');
									}

									openModal(
										createModalDelete({
											deletePrompt,
											onDelete,
										}),
									);
								}}
								class="w-full"
							>
								<MenuItemChild
									{active}
									{disabled}
								>
									<MenuItemIcon
										icon={Fa6SolidTrashCan}
										{disabled}
									/>
									{$L.buttons.delete()}
								</MenuItemChild>
							</button>
						</MenuItem>
					</DropdownMenu>
				</div>
			</Dropdown>
		</div>
	{:else}
		<!-- hack to keep flex children position consistent -->
		<div />
	{/if}

	<!-- Icons -->
	{#if icons}
		<div
			class="col-span-full mt-0 flex flex-row flex-wrap gap-x-6 sm:col-span-1"
		>
			{#each icons as { label, icon, tooltip } (tooltip)}
				{#if label != undefined && icon}
					<div class="mt-2 flex items-center text-sm text-gray-500">
						<svelte:component
							this={icon}
							class="h-5 w-5 flex-shrink-0 text-gray-400 ltr:mr-1.5 rtl:ml-1.5"
						/>
						{label}
					</div>
				{/if}
			{/each}
		</div>
	{/if}

	<!-- Actions -->
	{#if $$slots.actions}
		<div
			class="col-span-full col-start-1 flex flex-col justify-between gap-y-4 sm:flex-row sm:justify-end sm:gap-x-4 sm:gap-y-0"
		>
			<slot name="actions" />
		</div>
	{/if}
</div>

<!-- Title (print) -->
<h2
	class="hidden text-2xl font-bold leading-7 text-gray-900 print:hidden sm:truncate sm:text-3xl"
>
	{title}
</h2>
