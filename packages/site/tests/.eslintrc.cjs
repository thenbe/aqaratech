module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	// plugins: ['@typescript-eslint', 'deprecation'],
	plugins: ['@typescript-eslint'],
	// ignorePatterns: ["lib", ".eslintrc.cjs", "index.ts", "test"],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		// "prettier",
	],
	rules: {
		// recommended for safety
		'@typescript-eslint/no-floating-promises': 'error', // forgetting to await Activities and Workflow APIs is bad
		// 'deprecation/deprecation': 'warn',

		// code style preference
		'object-shorthand': ['error', 'always'],

		// relaxed rules, for convenience
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
	},
};
