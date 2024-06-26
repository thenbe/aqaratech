<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { getRoute, PageTab, getPayURL } from '@self/utils';

	import L from '$i18n/i18n-svelte';
	import Badge from '$lib/components/Badge.svelte';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import { buttonCn } from '$lib/components/buttons/button-cn';
	import Button from '$lib/components/buttons/Button.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import LeaseInvoiceTabs from '$lib/components/leaseInvoice/LeaseInvoiceTabs.svelte';
	import { environment } from '$lib/environment';
	import { addSuccessToast } from '$lib/stores/toast';
	import { getInvoiceBadge } from '$lib/utils/get-badge';
	import RoleGuard from '$lib/utils/RoleGuard.svelte';
	import HeroiconsClipboardDocument from '~icons/heroicons/clipboard-document';
	import HeroiconsCreditCard from '~icons/heroicons/credit-card';
	import HeroiconsDocumentText from '~icons/heroicons/document-text';

	export let data: LayoutData;

	$: badge = getInvoiceBadge(data.leaseInvoice);

	$: payURL = getPayURL({
		invoiceId: data.leaseInvoice.id,
		apiURL: environment.PUBLIC_API_URL,
	});
	$: payDisabled = data.leaseInvoice.isPaid;
</script>

<Heading
	title={$L.entity.leaseInvoice.singular()}
	id={data.leaseInvoice.id}
	entity="leaseInvoice"
	onDelete={async (api) => {
		await api.leaseInvoices.remove({ id: data.leaseInvoice.id });

		const url = getRoute({
			entity: 'lease',
			id: data.leaseInvoice.leaseId,
			pageType: PageTab.Invoices,
			params: $page.params,
		});

		return url;
	}}
>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={data.leaseInvoice.breadcrumbs} />
	</svelte:fragment>

	<svelte:fragment slot="actions">
		<RoleGuard roles={['ORGADMIN']}>
			<Button
				as="button"
				icon={HeroiconsClipboardDocument}
				on:click={async () => {
					await navigator.clipboard.writeText(payURL);
					addSuccessToast();
				}}
				text={$L.buttons.copyPayLink()}
				solid
				disabled={payDisabled}
			/>
		</RoleGuard>

		<a
			href={payDisabled ? null : payURL}
			class={buttonCn({
				disabled: payDisabled,
			})}
			rel="external"
			data-sveltekit-reload
		>
			<svelte:component
				this={HeroiconsCreditCard}
				aria-hidden="true"
				class="hidden h-5 w-5 ltr:mr-2 rtl:ml-2 sm:block"
			/>
			{$L.buttons.pay()}
		</a>

		<Button
			icon={HeroiconsDocumentText}
			text={$L.buttons.print()}
			as="button"
			on:click={() => {
				window.print();
			}}
			class="w-full sm:w-auto"
			prefetch
		/>
	</svelte:fragment>
</Heading>

<Badge
	label={badge.label}
	badgeColor={badge.color}
/>

<LeaseInvoiceTabs />

<slot />
