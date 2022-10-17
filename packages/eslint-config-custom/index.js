/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	env: {
		node: true,
	},
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:@typescript-eslint/strict',
		'turbo',
		'prettier',

		// eslint-config-prettier helps with detecting circular dependencies
		// https://github.com/import-js/eslint-plugin-import/blob/main/config/recommended.js
		'plugin:import/recommended',
		'plugin:import/typescript',
	],
	plugins: ['@typescript-eslint'],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: [
			// For sibling packages: Helps each .eslintrc.js file find its own tsconfig.json file
			'../*/tsconfig.json',
			// For root: Helps root .eslintrc.js file find its own tsconfig.json file
			'../../tsconfig.json',
			// sourceType: 'module',
		],
	},
	root: true,
	settings: {
		// https://github.com/import-js/eslint-plugin-import#typescript
		'import/resolver': {
			node: true,
			typescript: true,
			// typescript: {
			// 	alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
			// 	project: [
			// 		// For sibling packages: Helps each .eslintrc.js file find its own tsconfig.json file
			// 		'../*/tsconfig.json',
			// 		// For root: Helps root .eslintrc.js file find its own tsconfig.json file
			// 		'../../tsconfig.json',
			// 	],
			// },
		},
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts'],
		},
	},
	rules: {
		// https://github.com/vercel/turborepo/blob/main/packages/eslint-plugin-turbo/docs/rules/no-undeclared-env-vars.md
		'turbo/no-undeclared-env-vars': [
			'off',
			{
				// An array of strings (or regular expressions) to exclude.
				// NOTE: an env variable should only be excluded if it has no effect on build outputs.
				allowList: [
					'ORIGIN',
					'PUBLIC_AQARATECH_ENV',
					'PUBLIC_SITE_URL',
					'PUBLIC_API_URL',
					'PUBLIC_API_URL_LOCAL',
					'PUBLIC_AQ_DEBUG_LEVEL',
					'PUBLIC_AQ_DEBUG_SITE',
					'PUBLIC_AQ_DEBUG_NEST',
					'PUBLIC_AQ_DEBUG_PRISMA',
					'PUBLIC_AQ_DEBUG_SENTRY',
					'PUBLIC_TRACE_RATE',
					'MEILISEARCH_HOST',
					'CI',
					'PUBLIC_COMMIT_SHA',
					'PUBLIC_AQ_ENABLE_SENTRY',
					'LOGTAIL_TOKEN',
				],
			},
		],
		// 'import/no-cycle': 'error',
		// 'import/no-cycle': [2, { maxDepth: 3 }],

		// Detect circular dependencies.
		// Be conservative with maxDepth, as it can be expensive.
		'import/no-cycle': ['error', { maxDepth: 2 }],
		'import/no-self-import': 'error',

		// complains about svelte's $app and $env
		'import/no-unresolved': 'off',

		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ destructuredArrayIgnorePattern: '^_' },
		],

		// https://eslint.org/docs/latest/rules/prefer-const#options
		'prefer-const': [
			'error',
			{
				destructuring: 'all',
				ignoreReadBeforeAssign: false,
			},
		],

		'@typescript-eslint/restrict-template-expressions': [
			'error',
			{
				allowBoolean: true,
			},
		],
	},
	ignorePatterns: ['.eslintrc.js'],
};
