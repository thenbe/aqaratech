<script lang="ts">
	import { formatDistance } from 'date-fns';

	import type { ValidatedRoleDto } from '$api/openapi';

	import L, { locale } from '$i18n/i18n-svelte';
	import RoleCard from '$lib/components/role/RoleCard.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { NEW_ORGANIZATION } from '$lib/constants/routes';
	import { dateFnsLocale } from '$lib/i18n/date-fns-locale';
	import Fa6SolidUserPlus from '~icons/fa6-solid/user-plus';

	export let roles: ValidatedRoleDto[];
</script>

<StackedList title={$L.entity.role.singular()}>
	{#each roles as role (role.id)}
		{@const icons = [
			{
				label: formatDistance(new Date(role.createdAt), new Date(), {
					locale: dateFnsLocale($locale),
					addSuffix: true,
				}),
				icon: Fa6SolidUserPlus,
				tooltip: 'createdAt',
			},
		]}
		<li>
			<RoleCard
				{role}
				{icons}
				on:delete={(e) => {
					roles = roles.filter((r) => r.id !== e.detail.id);
				}}
			/>
		</li>
	{/each}
</StackedList>

<a
	class="inline-block text-center text-base font-semibold text-indigo-600 hover:text-indigo-700"
	href={NEW_ORGANIZATION($locale)}
>
	<span class="text-lg">+</span>
	{[$L.buttons.new(), $L.entity.organization.singular()].join(' ')}
</a>
