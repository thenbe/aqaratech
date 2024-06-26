<script lang="ts">
	import { ListboxOption } from '@rgossiaux/svelte-headlessui';
	import clsx from 'clsx';

	import type { HitDto } from '$api/openapi';
	import type { Icon } from '$lib/models/types/icon.type';

	import Hoverable from '$lib/components/Hoverable.svelte';
	import { getIntlLabel } from '$lib/i18n/get-intl-label';
	import { classes } from '$lib/utils/classes';

	export let item: HitDto;
	export let icon: Icon;
</script>

<Hoverable let:hovering>
	<ListboxOption value={item}>
		<div
			class={clsx(
				// split to avoid prettier conflict with vscode
				'm-2 cursor-default select-none px-4 py-2',
				'[&_mark]:underline [&_mark]:underline-offset-2',
				hovering
					? [
							'bg-indigo-600 text-white',
							'[&_mark]:bg-inherit [&_mark]:text-white',
					  ]
					: '[&_mark]:bg-inherit [&_mark]:text-indigo-600 [&_mark]:decoration-indigo-500 [&_mark]:decoration-2',
			)}
		>
			<div class="flex">
				<svelte:component
					this={icon}
					class={classes(
						'h-6 w-6 flex-none text-opacity-40 ltr:mr-2 rtl:ml-2',
						hovering ? 'text-white text-opacity-70' : 'text-gray-400',
					)}
					aria-hidden="true"
				/>
				<div class="flex flex-col gap-y-1">
					<p>
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html item.titleHtml}
					</p>
					<div class="flex flex-col gap-y-1 text-xs font-light">
						{#each Object.entries(item.hints) as [key, val]}
							<p>
								<span class="font-extralight">
									{getIntlLabel(key)}:
								</span>
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								{@html val}
							</p>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</ListboxOption>
</Hoverable>
