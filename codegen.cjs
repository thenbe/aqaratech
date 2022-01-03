module.exports = {
	schema: [
		{
			'https://hasura-xf70.onrender.com/v1/graphql': {
				// 'https://nov22test.hasura.app/v1beta1/relay': {
				headers: {
					// Authorization: 'Bearer ' + process.env.AUTH_TOKEN,
					'x-hasura-admin-secret':
						'myadminsecret',
				},
			},
		},
	],
	documents: [
		'./src/**/*.graphql',
		'./src/**/*.ts',
		'./src/**/*.svelte',
		'/src/**/*.svelte',
	],
	overwrite: true,
	generates: {
		'./src/generated/graphql.ts': {
			plugins: [
				{ add: { content: '/* eslint-disable */' } },

				'typescript',
				'typescript-operations',
				// 'typescript-urql', // replaced with typed-document-node, make life easier
				'urql-svelte-operations-store',
				// https://github.com/FormidableLabs/urql/issues/901
				'typescript-urql-graphcache',
				'typed-document-node',
			],
			config: {
				useTypeImports: true,
				namingConvention: 'keep',
			},
			// hooks: {
			// 	afterAllFileWrite: ['prettier --write', 'eslint --fix'],
			// },
		},
		// OG introspection
		'./src/graphql.schema.json': {
			plugins: ['introspection'],
		},
		// not sure what's different than OG
		// it doesn't seem to minify...?
		// https://github.com/dotansimha/graphql-code-generator/blob/master/packages/plugins/other/urql-introspection/src/index.ts
		'./src/NEWgraphql.schema.json': {
			plugins: ['urql-introspection'],
		},
		'./src': {
			preset: 'near-operation-file',
			presetConfig: {
				baseTypesPath: './generated/graphql',
				extension: '.gql.ts',
			},
			plugins: [
				{ add: { content: '/* eslint-disable */' } },

				'typescript-operations',
				'typed-document-node',
				'urql-svelte-operations-store',
			],
			config: {
				flattenGeneratedTypes: true,
				useTypeImports: true,
				enumsAsTypes: true,

				omitOperationSuffix: true,
				dedupeOperationSuffix: true,
				exportFragmentSpreadSubTypes: true,
				experimentalFragmentVariables: true,
				addUnderscoreToArgsType: true,

				// onlyOperationTypes: true,
				preResolveTypes: true,

				namingConvention: 'keep',

				// scalars:
				//   UnsignedInt: number
				//   URL: string
				//   JSON: any # string | number | boolean | null | Array<Scalars['JSON']> | Scalars['JSONObject']
				//   JSONObject: Record<string, any>
				//   Date: string
				//   DateTime: string
			},
			// hooks: {
			// 	afterAllFileWrite: ['prettier --write', 'eslint --fix'],
			// },
		},
	},
	hooks: {
		afterAllFileWrite: ['prettier --write'],
	},
};
