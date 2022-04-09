/// <reference types="@sveltejs/kit" />

interface Auth0Profile {
	sub: string;
	name: string;
	picture: string;
	email: string;
	updated_at: string;
}
declare namespace App {
	interface Locals {
		accessToken: string | undefined;
		idToken: string | undefined;
		user: Auth0Profile | undefined;
	}

	// interface Platform {}

	interface Session {
		user: Readonly<Auth0Profile> | undefined;
		accessToken: string | undefined; // TODO remove in prod
		idToken: string | undefined; // TODO remove in prod
	}

	interface Stuff {
		lease: import('$lib/client/trpc').InferQueryOutput<'leases:read'>;
	}
}

type FormType = 'create' | 'update';

declare module 'chart.js/dist/chart.esm' {
	// https://github.com/ivanhofer/sveltekit-typescript-showcase#2-extend-existing-type-definitions
	import { Chart } from 'chart.js/types/index.esm';
	export * from 'chart.js/types/index.esm';
	export default Chart;
}

declare module 'svelte-select' {
	import { SelectProps } from 'svelte-select/src/index.d';
	import { SvelteComponentTyped } from 'svelte';
	export default class SvelteSelect extends SvelteComponentTyped<SelectProps> {}
}
