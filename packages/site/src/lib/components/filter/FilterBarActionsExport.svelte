<script lang="ts">
	import { MenuItem } from '@rgossiaux/svelte-headlessui';

	import { page } from '$app/stores';

	import L from '$i18n/i18n-svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import Fa6SolidFileCsv from '~icons/fa6-solid/file-csv';
</script>

<MenuItem
	as="div"
	let:active
>
	<a
		href={`${$page.url.pathname}/csv`}
		download="data.csv"
	>
		<MenuItemChild {active}>
			<MenuItemIcon icon={Fa6SolidFileCsv} />
			{$L.buttons.export()}
		</MenuItemChild>
	</a>
</MenuItem>
