import type { TrpcClient } from '$lib/client/trpc';
import type { AppRouter } from '$lib/server/trpc/router';
import { test as base } from '@playwright/test';
import * as trpc from '@trpc/client';
import cookie from 'cookie';
import fetch from 'cross-fetch';
import superjson from 'superjson';
import { v4 as uuid } from 'uuid';
import {
	fakeClient,
	fakeProperty,
	fakeUnit,
	fakeTenant,
	fakeLease,
} from '../../../seed/generators.js';
import {
	ClientForm,
	LeaseForm,
	PropertyForm,
	TenantForm,
	UnitForm,
} from '../forms/form.js';

type MyOptions = {
	defaultForm: typeof ClientForm | typeof PropertyForm;
	formOption: ClientForm | PropertyForm;
};
export type Newable<T> = { new (...args: any[]): T };

base.use({ storageState: './config/adminStorageState.json' });
export const test = base.extend<
	MyOptions & {
		clientForm: ClientForm;
		propertyForm: PropertyForm;
		unitForm: UnitForm;
		tenantForm: TenantForm;
		leaseForm: LeaseForm;
		forms: Array<ClientForm | PropertyForm | UnitForm | TenantForm | LeaseForm>;
		single: string;
	},
	{
		trpcClient: TrpcClient;
	}
>({
	trpcClient: [
		async ({ browser }, use) => {
			const context = browser.contexts()[0];
			const baseURL = 'http://localhost:3000';

			const allCookies = await context.cookies();
			const cookies = allCookies.filter(
				(c) => c.name === 'accessToken' || c.name === 'idToken',
			);

			const cookieStrings = cookies.map((c) =>
				cookie.serialize(c.name, c.value),
			);
			const cookieString = cookieStrings.join('; ');

			const trpcClient = trpc.createTRPCClient<AppRouter>({
				fetch,
				url: baseURL + '/trpc',
				transformer: superjson,
				headers: {
					cookie: cookieString,
				},
			});
			await use(trpcClient);
		},
		{ scope: 'worker' },
	],
	page: async ({ page }, use) => {
		// Ensures that sveltekit is done hydrating the page
		// Ensures non-flaky tests
		await page.addInitScript({
			content: `
			window.started = new Promise((fulfil, reject) => {
				setTimeout(() => {
					reject(new Error('Did not receive sveltekit:start event'));
				}, 5000);
				addEventListener('sveltekit:start', () => {
					fulfil();
				});
			});
		`,
		});
		await use(page);
	},
	clientForm: async ({ page, trpcClient }, use) => {
		const clientForm = new ClientForm(page);
		await clientForm.setup(trpcClient);
		await use(clientForm);
		// await clientForm.clean(trpcClient);
	},
	propertyForm: async ({ page, trpcClient }, use) => {
		const form = new PropertyForm(page);
		await form.setup(trpcClient);
		await use(form);
		await form.clean(trpcClient);
	},
	unitForm: async ({ page, trpcClient }, use) => {
		const form = new UnitForm(page);
		await form.setup(trpcClient);
		await use(form);
		await form.clean(trpcClient);
	},
	tenantForm: async ({ page, trpcClient }, use) => {
		const form = new TenantForm(page);
		await form.setup(trpcClient);
		await use(form);
		await form.clean(trpcClient);
	},
	leaseForm: async ({ page, trpcClient }, use) => {
		const form = new LeaseForm(page);
		await form.setup(trpcClient);
		await use(form);
		await form.clean(trpcClient);
	},
	forms: async (
		{ clientForm, propertyForm, unitForm, tenantForm, leaseForm },
		use,
	) => {
		await use([clientForm, propertyForm, unitForm, tenantForm, leaseForm]);
	},
	// defaultForm: [() => ClientForm, { option: true }],
	defaultForm: async ({}, use) => {
		// await use(PropertyForm);
		await use(ClientForm);
	},
	formOption: async ({ page, trpcClient, defaultForm }, use) => {
		const form = new defaultForm(page);
		await form.setup(trpcClient);
		await use(form);
		await form.clean(trpcClient);
	},

	// formOption: [
	// 	async ({ page, trpcClient, defaultForm }, use) => {
	// 		const form = new defaultForm(page);
	// 		await form.setup(trpcClient);
	// 		await use(form);
	// 		await form.clean(trpcClient);
	// 	},
	// 	{ option: true },
	// ],
});

export { expect } from '@playwright/test';
