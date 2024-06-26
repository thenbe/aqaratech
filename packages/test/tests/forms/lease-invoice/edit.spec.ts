import { expect } from '@playwright/test';
import * as R from 'remeda';

import { leaseInvoicePartialFactory } from '@self/seed';
import { FIELDS, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

const entity = 'leaseInvoice';
const pageType = PageType.Edit;

test('can be submitted with minimal fields', async ({
	org,
	portfolio,
	invoice,
	page,
}) => {
	const fields = R.pick(leaseInvoicePartialFactory(), [
		...FIELDS.leaseInvoice.required,
	]);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: invoice.id,
		fixtures: { org, portfolio },
	});

	await formPage.goto();
	await formPage.fillForm(fields);
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});

test('can be submitted with all fields', async ({
	org,
	portfolio,
	invoice,
	page,
}) => {
	const fields = R.pick(leaseInvoicePartialFactory(), [
		...FIELDS.leaseInvoice.required,
	]);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: invoice.id,
		fixtures: { org, portfolio },
	});

	await formPage.goto();
	await formPage.fillForm(fields);
	await formPage.save();

	await formPage.verifyDetails(fields);

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});
