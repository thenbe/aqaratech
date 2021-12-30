import preprocess from 'svelte-preprocess';
import path from 'path';
// import vercel from '@sveltejs/adapter-vercel';
// import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-auto';
import { optimizeImports, optimizeCss } from 'carbon-preprocess-svelte';
import { elements } from 'carbon-preprocess-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess(),
		optimizeImports(),
		// elements()
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		// adapter: vercel(),
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$components: path.resolve('./src/components'),
					$generated: path.resolve('./src/generated'),
					$routes: path.resolve('./src/routes'),
					$lib: path.resolve('./src/lib'),
				},
			},
			// optimizeDeps: { include: ['broadcast-channel'] },

			// plugins: [process.env.NODE_ENV === "production" && optimizeCss()]
		},
	},
};

export default config;
