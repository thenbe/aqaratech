const API = '**/tests/api/**/*.spec.ts';
const FILE = [
	'**/tests/forms/file/**/*.spec.ts',
	'**/tests/api/files/**/*.spec.ts',
];
const EXPIRED_TOKEN = ['**/token/**/*.spec.ts'];

const NON_SITE = [API, ...FILE, ...EXPIRED_TOKEN];
const MOBILE_ONLY = ['**/tests/components/sidebar.spec.ts'];
const DESKTOP_ONLY: string[] = [
	// '**/tests/components/expense-tree/drag.spec.ts',
];

export const TESTS = {
	API,
	FILE,
	NON_SITE,
	MOBILE_ONLY,
	DESKTOP_ONLY,
	EXPIRED_TOKEN,
};
