// @ts-check

import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

import { version } from './package.json';

console.log({
	SENTRY_RELEASE_ENABLE: process.env.SENTRY_RELEASE_ENABLE,
	SENTRY_RELEASE_VERSION: process.env.SENTRY_RELEASE_VERSION,
	SENTRY_RELEASE_ENVIRONMENT: process.env.SENTRY_RELEASE_ENVIRONMENT,
	ANALYZE_BUNDLE: process.env.ANALYZE_BUNDLE,
});

/** @type {import('vite').UserConfigExport} */
export default defineConfig({
	define: {
		__AQARATECH_APP_VERSION__: JSON.stringify(version),
		__SENTRY_DEBUG__: false,
	},
	plugins: [
		sentrySvelteKit({
			debug: !!process.env.SENTRY_RELEASE_ENABLE,
			autoUploadSourceMaps: !!process.env.SENTRY_RELEASE_ENABLE,
			// Other sentry config in `sentry.properties`
			sourceMapsUploadOptions: {
				debug: true,
				release: 'site-' + (process.env.SENTRY_RELEASE_VERSION ?? 'unknown'),
				setCommits: {
					auto: true,
				},
				deploy: {
					env:
						process.env.SENTRY_RELEASE_ENVIRONMENT === 'prod'
							? 'production'
							: 'staging',
				},
				// cleanArtifacts: true, // enable?
			},
		}),
		sveltekit(),
		icons({ compiler: 'svelte' }),
		// See: https://github.com/btd/rollup-plugin-visualizer#usage
		...(process.env.ANALYZE_BUNDLE === '1'
			? [
					visualizer({
						emitFile: true,
						filename: 'stats.html',
					}),
			  ]
			: []),
	],
	clearScreen: false,
	ssr: {
		// set chart.js && papaparse as `noExternal` to avoid issues in SSR (when running `vite preview`)
		noExternal: ['typesafe-i18n'],
	},
});
