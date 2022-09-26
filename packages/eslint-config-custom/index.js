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
		'turbo',
		'prettier',
	],
	plugins: ['@typescript-eslint'],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: [
			// For sibling packages: Helps each .eslintrc.js file find its own tsconfig.json file
			'../*/tsconfig.json',
			// For root: Helps root .eslintrc.js file find its own tsconfig.json file
			'../../tsconfig.json',
		],
	},
	root: true,
	rules: {
		// https://github.com/vercel/turborepo/blob/main/packages/eslint-plugin-turbo/docs/rules/no-undeclared-env-vars.md
		'turbo/no-undeclared-env-vars': [
			'error',
			{
				// An array of strings (or regular expressions) to exclude.
				// NOTE: an env variable should only be excluded if it has no effect on build outputs.
				allowList: [
					'ORIGIN',
					'PUBLIC_AQARATECH_ENV',
					'PUBLIC_SITE_URL',
					'PUBLIC_API_URL',
					'PUBLIC_API_URL_LOCAL',
					'PUBLIC_AQ_DEBUG_SITE',
					'PUBLIC_AQ_DEBUG_NEST',
					'PUBLIC_AQ_DEBUG_PRISMA',
					'PUBLIC_AQ_DEBUG_SENTRY',
					'PUBLIC_TRACE_RATE',
					'MEILISEARCH_HOST',
					'CI',
				],
			},
		],
	},
	ignorePatterns: ['.eslintrc.js', 'env.d.ts'],
};
