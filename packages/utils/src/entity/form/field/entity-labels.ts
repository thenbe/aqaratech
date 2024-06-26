import { isDateOnly } from '../../../schemas/utils/date/is-date-only';
import { isDatetime } from '../../../schemas/utils/date/is-date-time';
import { startCase } from '../../../start-case';

import { fmt } from './format';

import type {
	ExpenseCreateSchema,
	LeaseCreateSchema,
	LeaseInvoiceCreateSchema,
	PortfolioCreateSchema,
	TenantCreateSchema,
} from '../../../schemas';

const entityFieldLabels = {
	fullName: 'Full Name',
	dob: 'Date of Birth',
	civilid: 'Civil ID',

	passportNum: 'Passport Number',
	residencyNum: 'Residency Number',
	residencyEnd: 'Residency Expiration',

	notify: 'Send payment reminders',
	canPay: 'Allow tenant to pay invoices online',
	tenantId: 'Tenant',

	categoryId: 'Category',

	key: 'Name',
	dueDurationMonths: 'Due duration (months)',
	dueDurationDays: 'Due duration (days)',

	postAt: 'Due date',
	dueAt: 'Past due date',
	paidAt: 'Payment date',
} as const satisfies FieldLabels;

export type EntityFieldLabels = typeof entityFieldLabels;

export const getLabel = (key: string) =>
	(entityFieldLabels as Record<string, string>)[key] ?? startCase(key);

/** Displayed when a value is null or undefined. */
export const EMPTY_VALUE = '-';

/** Convenience function to format a field's value. */
export const formatValue = (
	value: unknown,
	locale: 'en' | 'ar' = 'en',
): string => {
	if (value === null || value === undefined) {
		return EMPTY_VALUE;
	} else if (typeof value === 'boolean') {
		const yes = locale === 'en' ? 'Yes' : 'نعم';
		const no = locale === 'en' ? 'No' : 'لا';
		return value ? yes : no;
	} else if (typeof value === 'number') {
		return fmt({ type: 'number', value, locale });
	} else if (
		typeof value === 'string' &&
		(isDatetime(value) || isDateOnly(value))
	) {
		return fmt({ type: 'date', value, locale });
	} else if (typeof value === 'string') {
		return value;
	} else {
		return JSON.stringify(value);
	}
};

type Schemas = PortfolioCreateSchema &
	TenantCreateSchema &
	ExpenseCreateSchema &
	LeaseInvoiceCreateSchema &
	LeaseCreateSchema;

type Keys = keyof Schemas;
type KeysObj = Record<Keys, string>;
type FieldLabels = Partial<KeysObj> & {
	key: string; // FileDto
	dueDurationMonths: string;
	dueDurationDays: string;
	dueAt: string;
};
