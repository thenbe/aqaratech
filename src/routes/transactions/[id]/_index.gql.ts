// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type TransactionDetails = {
	__typename?: 'transactions';
	id: number;
	amount?: number | null | undefined;
	created_at?: any | null | undefined;
	due_date?: string | null | undefined;
	is_paid?: boolean | null | undefined;
	lease_id?: number | null | undefined;
	memo?: string | null | undefined;
	receipt_url?: string | null | undefined;
};

export type TransactionDetailsVariables = Types.Exact<{ [key: string]: never }>;

export type TransactionDetailPageVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type TransactionDetailPage = {
	__typename?: 'query_root';
	transactions_by_pk?:
		| {
				__typename?: 'transactions';
				id: number;
				amount?: number | null | undefined;
				created_at?: any | null | undefined;
				due_date?: string | null | undefined;
				is_paid?: boolean | null | undefined;
				lease_id?: number | null | undefined;
				memo?: string | null | undefined;
				receipt_url?: string | null | undefined;
		  }
		| null
		| undefined;
};

export type TransactionById = {
	__typename?: 'query_root';
	transactions_by_pk?:
		| {
				__typename?: 'transactions';
				id: number;
				amount?: number | null | undefined;
				created_at?: any | null | undefined;
				due_date?: string | null | undefined;
				is_paid?: boolean | null | undefined;
				lease_id?: number | null | undefined;
				memo?: string | null | undefined;
				receipt_url?: string | null | undefined;
		  }
		| null
		| undefined;
};

export type TransactionByIdVariables = Types.Exact<{ [key: string]: never }>;

export type DeleteTransactionVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type DeleteTransaction = {
	__typename?: 'mutation_root';
	delete_transactions_by_pk?:
		| { __typename?: 'transactions'; id: number }
		| null
		| undefined;
};

export const TransactionDetails = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'transactionDetails' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'transactions' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'amount' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'due_date' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'is_paid' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'lease_id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'memo' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'receipt_url' } },
				],
			},
		},
	],
} as unknown as DocumentNode<TransactionDetails, TransactionDetailsVariables>;
export const TransactionById = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'transactionById' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'query_root' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'transactions_by_pk' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'id' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'id' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'transactionDetails' },
								},
							],
						},
					},
				],
			},
		},
		...TransactionDetails.definitions,
	],
} as unknown as DocumentNode<TransactionById, TransactionByIdVariables>;
export const TransactionDetailPageDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'TransactionDetailPage' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'FragmentSpread',
						name: { kind: 'Name', value: 'transactionById' },
					},
				],
			},
		},
		...TransactionById.definitions,
	],
} as unknown as DocumentNode<
	TransactionDetailPage,
	TransactionDetailPageVariables
>;
export const DeleteTransactionDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DeleteTransaction' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'delete_transactions_by_pk' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'id' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'id' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<DeleteTransaction, DeleteTransactionVariables>;
export type TransactionDetailPageStore = OperationStore<
	TransactionDetailPage,
	TransactionDetailPageVariables
>;
export type DeleteTransactionStore = OperationStore<
	DeleteTransaction,
	DeleteTransactionVariables
>;
