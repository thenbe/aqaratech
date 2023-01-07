// @ts-check

import { sveltekit } from '@sveltejs/kit/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { isoImport } from 'vite-plugin-iso-import';

import { version } from './package.json';

const ANALYZE_BUNDLE = process.env['ANALYZE_BUNDLE'] === '1';

export default defineConfig(() => {
	/** @type {import('vite').UserConfig} */
	const config = {
		define: {
			__AQARATECH_APP_VERSION__: JSON.stringify(version),
			__SENTRY_DEBUG__: false,
		},
		plugins: [
			sveltekit(),
			icons({ compiler: 'svelte' }),
			isoImport(),
			...(ANALYZE_BUNDLE
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
			noExternal: ['chart.js', 'chartjs-adapter-date-fns', 'typesafe-i18n'],
		},
		build: {
			// Generate sourcemaps for all builds. In production, remove them before building Docker image.
			// This is to match the random chunk names with their original sourcemaps.
			sourcemap: true,
			rollupOptions: {
				// with rollupOptions, source maps work for BUILD: pnpm build && node --inspect -r source-map-support/register build/index.js
				// without rollupOptions, source maps work for PREVIEW: pnpm build && pnpm vite preview --port 3000
				output: {
					sourcemap: true,
					sourcemapPathTransform: (relativeSourcePath) => {
						if (relativeSourcePath.includes('../src')) {
							// adjust path by one level down
							return relativeSourcePath.replace('../src', 'src');
						}
						return relativeSourcePath;
					},
				},
			},
		},
		// esbuild: {
		// 	sourcemap: true, // no effect?
		// },
	};

	return config;
});
