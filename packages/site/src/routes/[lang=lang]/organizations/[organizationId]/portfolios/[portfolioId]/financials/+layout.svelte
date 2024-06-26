<script lang="ts">
	import clsx from 'clsx';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { getRoute, PageType } from '@self/utils';

	import L from '$i18n/i18n-svelte';
	import Arrow from '$lib/components/Arrow.svelte';
	import Filter from '$lib/components/dashboard/filter/Filter.svelte';
	import PortfolioSelect from '$lib/components/dashboard/filter/PortfolioSelect.svelte';
	import { property } from '$lib/stores/filter/property';
	import { unit } from '$lib/stores/filter/unit';
	import RoleGuard from '$lib/utils/RoleGuard.svelte';
	import { getUpdatedRoute } from '$lib/utils/update-route';

	export let data: LayoutData;

	const hideRangePaths = ['financials/summary', 'payouts/table'];
	const hidePropertyPaths = ['payouts/table'];
	const showName = $page.data.user?.role?.roleType === 'ORGADMIN';
</script>

<div
	class={clsx(
		'grid grid-cols-1 gap-8 rounded-lg border bg-white shadow',
		showName ? 'xl:grid-cols-3' : 'xl:grid-cols-2',
	)}
>
	<div
		class="flex flex-col items-start justify-start rounded-lg bg-white p-4 pb-0"
		class:hidden={!showName}
	>
		<div class="flex items-center gap-2 self-stretch">
			<div class="block text-sm font-medium text-gray-700">
				{$L.misc.searchByName()}
			</div>

			<RoleGuard roles={['ORGADMIN']}>
				<a
					class="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
					href={getRoute({
						entity: 'portfolio',
						id: data.portfolio.id,
						pageType: PageType.Id,
						params: $page.params,
					})}>{$L.general.details()}<Arrow /></a
				>
			</RoleGuard>
		</div>
		{#if $page.data.user?.role?.roleType === 'ORGADMIN'}
			<RoleGuard roles={['ORGADMIN']}>
				<PortfolioSelect
					defaultLabel={data.portfolio.title}
					comboboxInputClass="text-sm leading-7 text-gray-900 sm:tracking-tight"
					on:select={async (e) => {
						if (!$page.route.id) {
							throw new Error('Route id is not defined');
						}

						// @ts-expect-error Type Limitation
						const portfolioId = e.detail.id;

						if (!portfolioId) {
							throw new Error('Portfolio ID is not defined');
						}

						const route = getUpdatedRoute({
							params: $page.params,
							routeId: $page.route.id,
							props: new Map([
								['lang=lang', $page.params['lang']],
								['organizationId', $page.params['organizationId']],
								['portfolioId', portfolioId],
							]),
						});

						// Reset filters when switching portfolios
						property.set(undefined);
						unit.set(undefined);
						await goto(route, {
							keepFocus: true,
							noScroll: true,
						});
					}}
				/>
			</RoleGuard>
		{:else}
			<h2 class="text-sm leading-7 text-gray-900 sm:tracking-tight">
				{data.portfolio.title}
			</h2>
		{/if}
	</div>

	<div class="xl:col-span-2">
		<!-- Dashboard Filter -->
		<Filter
			properties={data.properties}
			units={data.units}
			hideRange={hideRangePaths.some((str) => $page.url.pathname.endsWith(str))}
			hideProperty={hidePropertyPaths.some((str) =>
				$page.url.pathname.endsWith(str),
			)}
		/>
	</div>
</div>

<slot />
