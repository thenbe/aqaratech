import { z } from 'zod';

import { isID } from './utils/id.schema';
import { zodCheckbox } from './utils/zod-checkbox';
import { zodString, zodStringOptional } from './utils/zod-string';

// Represents an ExpenseCategory as returned from DB. Since we store ExpenseCategories in a postgres JSON field, we avoid `undefined` for all fields.
export const expenseCategorySchema = z
	.object({
		id: isID,
		labelEn: zodString,

		// Avoid helper zodString, which does not allow null even when using `.nullable()`.
		// This is because we're using `z.preprocess()`.
		// Instead, we use `z.string().nullable()` to allow null values coming from the db.
		labelAr: z.string().nullable(),

		parentId: zodString.nullable(),
		isGroup: zodCheckbox,
	})
	.strict();

export const expenseCategoryTreeSchema = z.array(expenseCategorySchema);

export const expenseCategoryCreateSchema = z
	.object({
		labelEn: zodString,
		labelAr: zodStringOptional,
		parentId: zodStringOptional,
		isGroup: zodCheckbox,
	})
	.strict();

export const expenseCategoryUpdateSchema = expenseCategoryCreateSchema.omit({
	isGroup: true,
});

export const expenseCategoryTreeUpdateSchema = z.array(
	// Deliberately extends from expenseCategorySchema, rather than expenseCategoryCreateSchema.
	// When updating a tree and inserting json into postgres, no property can be undefined (aka optional).
	// Null is fine, but undefined is not.
	expenseCategorySchema.omit({ isGroup: true }).extend({
		id: isID,
	}),
);

// Export types
export type ExpenseCategory = z.infer<typeof expenseCategorySchema>;

export type ExpenseCategoryTree = z.infer<typeof expenseCategoryTreeSchema>;

export type ExpenseCategoryCreateSchema = z.infer<
	typeof expenseCategoryCreateSchema
>;

export type ExpenseCategoryUpdateSchema = z.infer<
	typeof expenseCategoryUpdateSchema
>;

export type ExpenseCategoryTreeUpdateSchema = z.infer<
	typeof expenseCategoryTreeUpdateSchema
>;
