/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	root: true,
	extends: ['custom'],
	rules: {
		'no-empty-pattern': 'off',
	},
	globals: {
		$: 'readonly',
		ProcessPromise: 'readonly',
		ProcessOutput: 'readonly',
		log: 'readonly',
		$: 'readonly',
		argv: 'readonly',
		cd: 'readonly',
		chalk: 'readonly',
		echo: 'readonly',
		fs: 'readonly',
		glob: 'readonly',
		globby: 'readonly',
		nothrow: 'readonly',
		os: 'readonly',
		path: 'readonly',
		question: 'readonly',
		quiet: 'readonly',
		sleep: 'readonly',
		stdin: 'readonly',
		which: 'readonly',
		within: 'readonly',
		YAML: 'readonly',
	},
};
