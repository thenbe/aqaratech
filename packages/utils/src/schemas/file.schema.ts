import { z } from 'zod';
import { fileRelationKeySchema } from './file-relation-key.schema';
import { filenameSchema } from './utils/filename.schema';
import { isID } from './utils/id.schema';

export const fileCreateSchema = z
	.object({
		organizationId: isID,
		fileName: filenameSchema,
		file: z.record(z.any()).transform((value) => value as File),

		relationKey: fileRelationKeySchema,
		relationValue: isID,
	})
	.strict();