module.exports = {
	root: true,
	overrides: [
		{
			files: ['*.js', '*.ts', '*.jsx', '*.tsx'],
			plugins: ['@typescript-eslint', 'eslint-comments'],
			extends: [
				'airbnb',
				'airbnb-typescript',
				'eslint:recommended',
				'plugin:import/recommended',
				'plugin:eslint-comments/recommended',
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'plugin:prettier/recommended',
				'prettier',
				'./rules.cjs',
			],
			parserOptions: {
				project: ['./tsconfig.json', './tsconfig.eslint.json'],
			},
			settings: {
				'import/resolver': {
					typescript: {},
					// node: {
					// 	extensions: ['.js', '.jsx', '.ts', '.tsx', '.svelte'],
					// },
				},
			},
			rules: {
				'import/no-unresolved': [2, { ignore: ['^\\$app', '^\\@sveltejs'] }],
			}
		},

		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3',
			plugins: ['svelte3', '@typescript-eslint', 'eslint-comments', 'import'],
			extends: [
				'airbnb-base',
				'airbnb-typescript/base',
				'eslint:recommended',
				'plugin:import/recommended',
				'plugin:eslint-comments/recommended', // lag
				'plugin:@typescript-eslint/recommended', // lag
				'plugin:@typescript-eslint/recommended-requiring-type-checking', // lag
				// // 'plugin:import/typescript',
				// // 'plugin:jest/recommended',
				// // 'plugin:jest/style',
				'./rules.cjs',
			],
			rules: {
				// // https://github.com/sveltejs/eslint-plugin-svelte3/blob/master/OTHER_PLUGINS.md
				'import/no-mutable-exports': 'off',
				'no-undef': 'off',
				'import/first': 'off',
				'import/no-unresolved': 'off',
				'no-undef-init': 'off',
				'@typescript-eslint/no-unsafe-argument': 'off',
				'@typescript-eslint/restrict-template-expressions': 'off',
				'no-multiple-empty-lines': 'off',
				'implicit-arrow-linebreak': 'off',
				'@typescript-eslint/indent': "off",
				'no-tabs': 'off',
				'no-confusing-arrow': 'off',
				'no-mixed-spaces-and-tabs': 'off',
				'function-paren-newline': 'off',
				'object-curly-newline': 'off',
				'operator-linebreak': 'off',
			},
			parserOptions: {
				project: ['./tsconfig.json'],
				extraFileExtensions: ['.svelte'],
			},
			settings: {
				'svelte3/typescript': () => require('typescript'),
				// 'svelte3/typescript': true,
			}
		},
		{
			files: ['*.json'],
			extends: ['plugin:json/recommended', 'plugin:prettier/recommended'],
		},
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				'consistent-return': 'off',
				'no-undef': 'off',
			},
		},
		// {
		// 	files: ['*.graphql'],
		// 	parser: '@graphql-eslint/eslint-plugin',
		// 	plugins: ['@graphql-eslint'],
		// 	rules: {
		// 		'@graphql-eslint/known-type-names': 'error',
		// 	},
		// },
	],
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	reportUnusedDisableDirectives: true,
};
