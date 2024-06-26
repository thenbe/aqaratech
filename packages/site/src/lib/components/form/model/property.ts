import { propertyCreateSchema, propertyUpdateSchema } from '@self/utils';

import { createFormField } from '$lib/components/form/model/form-field';
import { createFormModel } from '$lib/components/form/model/form-model';
import { areas } from '$lib/constants/areas-kwt';
import { labelHint } from '$lib/constants/form-hints';

export const propertyFormModel = () =>
	createFormModel({
		entity: 'property',

		createSchema: propertyCreateSchema,
		updateSchema: propertyUpdateSchema,
		fields: {
			area: createFormField('area', {
				type: 'select',
				required: true,
				combobox: true,
				options: areas.map((area) => ({
					value: area[1],
					label: `${area[0]} | ${area[1]}`,
				})),
				// autoInit: true,
			}),

			block: createFormField('block', {
				required: true,
			}),

			avenue: createFormField('avenue'),

			street: createFormField('street', {
				required: true,
			}),

			number: createFormField('number', {
				required: true,
			}),

			parcel: createFormField('parcel', {
				required: false,
				hint: 'رقم القسيمة',
			}),

			paci: createFormField('paci', {
				required: false,
				hint: 'الرقم الآلي للعنوان',
			}),

			label: createFormField('label', {
				hint: labelHint(),
			}),
		},
	});
