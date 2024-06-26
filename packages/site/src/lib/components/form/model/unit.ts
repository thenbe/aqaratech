import { get } from 'svelte/store';
import { unitCreateSchema, unitUpdateSchema } from '@self/utils';

import L from '$i18n/i18n-svelte';
import { createFormField } from '$lib/components/form/model/form-field';
import { createFormModel } from '$lib/components/form/model/form-model';
import { labelHint } from '$lib/constants/form-hints';
import { unitTypeOptions } from '$lib/constants/unit-options';

export const unitFormModel = () =>
	createFormModel({
		entity: 'unit',

		createSchema: unitCreateSchema,
		updateSchema: unitUpdateSchema,
		fields: {
			unitNumber: createFormField('unitNumber', {
				required: true,
			}),

			type: createFormField('type', {
				type: 'select',
				options: unitTypeOptions,
				hint: get(L).other.customUnitLabel(),
			}),

			label: createFormField('label', {
				hint: labelHint(),
			}),

			bed: createFormField('bed', {
				type: 'number',
			}),

			bath: createFormField('bath', {
				type: 'number',
			}),

			size: createFormField('size'),

			floor: createFormField('floor', {
				type: 'number',
			}),

			marketRent: createFormField('marketRent', {
				type: 'number',
			}),

			usage: createFormField('usage'),
		},
	});
