<script lang="ts">
	import { page } from '$app/stores';
	import { getRoute, PageTypePortfolio } from '@self/utils';

	import type { GroupByMonthDto } from '$api/openapi';

	import L, { locale } from '$i18n/i18n-svelte';
	import Arrow from '$lib/components/Arrow.svelte';
	import TextButton from '$lib/components/buttons/TextButton.svelte';
	import StatisticsPane from '$lib/components/dashboard/stats/StatisticsPane.svelte';
	import Stats from '$lib/components/dashboard/stats/Stats.svelte';
	import { fmtCurrency, fmtMonth } from '$lib/i18n/format';
	import { dateFromShort } from '$lib/utils/common';

	interface Datapoint extends GroupByMonthDto {
		change?: number;
	}

	type Kind = 'Net' | 'Uncollected' | 'Collected' | 'Income' | 'Expenses';

	export let title: string;
	export let kind: Kind;
	export let data: Datapoint[];

	const primary: Record<number, string | undefined> = {
		0: $L.general.thisMonth(),
		1: $L.general.lastMonth(),
		2: undefined,
	};

	const links: Record<string, string> = {
		Income: getRoute({
			entity: 'portfolio',
			id: $page.params['portfolioId']!,
			params: $page.params,
			pageType: PageTypePortfolio.Income,
		}),
		Expenses: getRoute({
			entity: 'portfolio',
			id: $page.params['portfolioId']!,
			params: $page.params,
			pageType: PageTypePortfolio.Expenses,
		}),
	};

	const colors = {
		Net: 'text-gray-900',
		Uncollected: 'text-gray-900',
		Income: 'text-green-600',
		Collected: 'text-green-600',
		Expenses: 'text-red-600',
	} satisfies Record<Kind, string>;
</script>

<Stats {title}>
	<div slot="details">
		{#if links[kind]}
			<a href={links[kind]}>
				<div class="sr-only">
					{title}
				</div>
				<TextButton
					>{$L.general.details()}
					<Arrow />
				</TextButton>
			</a>
		{/if}
	</div>

	<svelte:fragment slot="panes">
		{#each data.slice(0, 3) as { amount, date, change }, i}
			{@const dateobj = dateFromShort(date)}
			{@const primaryText = primary[i] ?? (dateobj && fmtMonth(dateobj)) ?? ''}
			<StatisticsPane
				{primaryText}
				secondaryText={primary[i] && dateobj ? fmtMonth(dateobj) : ''}
				primaryValue={fmtCurrency(amount)}
				textColor={colors[kind] ?? ''}
				chipText={change
					? new Intl.NumberFormat($locale, {
							style: 'percent',
					  }).format(change / 100)
					: ''}
				color={change && change > 0 ? 'green' : 'red'}
			/>
		{/each}
	</svelte:fragment>
</Stats>
