module.exports = {
	content: ['./src/**/*.svelte'],
	theme: {
		extend: {},
	},
	plugins: [
		// require('@tailwindcss/typography'),
		// require('@tailwindcss/forms'),
	],

	corePlugins: {
		preflight: false,
	}
};
