<script lang="ts">
	import { page } from '$app/stores';
	import { getRoute, PageTypePortfolio } from '@self/utils';

	import L from '$i18n/i18n-svelte';
	import Arrow from '$lib/components/Arrow.svelte';
	import HeroiconsPresentationChartBar from '~icons/heroicons/presentation-chart-bar';

	export let dataType: 'Expenses' | 'Income';

	$: tabs = [
		{
			label: $L.nav.charts(),
			href: getRoute({
				entity: 'portfolio',
				params: $page.params,
				id: $page.params['portfolioId']!,
				pageType: PageTypePortfolio[dataType],
			}),
			icon: HeroiconsPresentationChartBar,
		},
		{
			label: $L.nav.data(),
			href: getRoute({
				entity: 'portfolio',
				params: $page.params,
				id: $page.params['portfolioId']!,
				pageType: PageTypePortfolio[`${dataType}Table`],
			}),
		},
	] as const;

	$: tab = $page.url.pathname === tabs[0].href ? tabs[1] : tabs[0];
</script>

<a
	class="text-end text-base font-semibold text-indigo-600 hover:text-indigo-700"
	href={tab.href}
>
	{tab.label}
	<Arrow />
</a>
