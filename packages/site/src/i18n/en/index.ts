import { aqaratech } from './aqaratech';
import { entity } from './entity';
import { fields } from './fields';
import { landing } from './landing';

import type { BaseTranslation } from '../i18n-types';

const en: BaseTranslation = {
	entity,
	fields,
	buttons: {
		login: 'Log in',
		logout: 'Log out',
		contact: 'Contact us',
		search: 'Search',
		view: 'View',

		// actions
		edit: 'Edit',
		new: 'New',
		save: 'Save',
		cancel: 'Cancel',
		delete: 'Delete',
		export: 'Export',
		close: 'Close',
		addMultiple: 'Add multiple',
		toggleAll: 'Toggle all',
		markAsPaid: 'Mark as paid',
		export: 'Export',
		options: 'Options',
	},
	nav: {
		financials: 'Financials',
		income: 'Income',
		charts: 'Charts',
		data: 'Data',
		occupancy: 'Occupancy',
		list: 'List',
		settings: 'Settings',
		account: 'Account',
		info: 'Info',
	},
	general: {
		name: 'Name',
		phone: 'Phone',
		email: 'Email',
		paymentSchedule: 'Payment schedule',
		balance: 'Balance',
		details: 'Details',
		columns: 'Columns',
		all: 'All',
		unspecified: 'Unspecified',
	},
	filter: {
		filters: 'Filters',
		start: 'Start',
		end: 'End',
		range: 'Range',
	},
	pagination: {
		next: 'Next',
		previous: 'Previous',
		showing: 'Showing',
		show: 'Show',
		to: 'to',
		of: 'of',
		page: 'Page',
		// rows: 'Rows',
		// entries: 'entries',
		// records: 'records',
	},
	landing,
	aqaratech,
	other: {
		progress: 'Progress',
		vacancy: 'Vacancy',
		vacant: 'Vacant',
		occupied: 'Occupied',
	},
};

export default en;
