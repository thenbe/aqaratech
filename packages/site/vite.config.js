import { sveltekit } from '@sveltejs/kit/vite';
// import basicSsl from '@vitejs/plugin-basic-ssl';
import icons from 'unplugin-icons/vite';

/** @type {import('vite').UserConfig} */
const config = {
	// envDir: process.env.RENDER ? resolve(__dirname, '../..') : undefined,
	// test: {
	// 	exclude: ['**/tests/**', 'node_modules'],
	// 	deps: {
	// 		inline: ['date-fns'],
	// 	},
	// },
	define:
		process.env.NODE_ENV === 'production'
			? {
					__SENTRY_DEBUG__: false,
					VITE_MY_VAR: 'SOME_VALUE',
			  }
			: undefined,
	plugins: [
		sveltekit(),
		icons({ compiler: 'svelte' }),
		// basicSsl(),
	],
	ssr: {
		noExternal: ['@self/sdk', 'chart.js'],
	},
};

export default config;
