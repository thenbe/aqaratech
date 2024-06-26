import {
	applyDecorators,
	createParamDecorator,
	ExecutionContext,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import {
	RequestParserService,
	RequestQueryOptions,
} from '@prisma-utils/nestjs-request-parser';
import { Request } from 'express';
import { z } from 'zod';

import { queryOptionsParsedSchema } from '@self/utils';
import { QueryOptionsRequestDto } from 'src/common/dto/query-options.dto';
import {
	PAGE_PARAM,
	PAGE_PARAM_DEFAULT,
	TAKE_PARAM,
	TAKE_PARAM_DEFAULT,
} from 'src/constants/pagination.constant';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { handleSortArray } from 'src/utils/handle-sort-array';
import { parseObject } from 'src/utils/query-types';

export const QueryParser = createParamDecorator(
	(options: QueryOptionsDecoratorConfig | undefined, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<Request>();
		// Parse with prisma-utils
		const parsed = new RequestParserService().parseQuery(request.query, {
			pageParamName: PAGE_PARAM,
			pageDefaultValue: PAGE_PARAM_DEFAULT,

			limitDefaultValue: TAKE_PARAM_DEFAULT,
			limitParamName: TAKE_PARAM,

			// Prevent default sort in decorator.
			// Default sort can be set in the controller on a per-handler basis
			orderDefaultValue: '',

			// don't use `prisma-utils` to parse the filter, we do it ourselves using zod
			filterParamName: 'NEVER',

			...options?.parserOptions,
		});

		// Validate output with zod

		// Allow to filter by specific fields only
		const keys = options?.filterOptions?.keys;
		const filterKeySchema = keys ? z.enum(keys) : z.never();

		const schema = queryOptionsParsedSchema.extend({
			filter: z.record(filterKeySchema, z.any()),
		});

		// Convert query string to javascript object
		const queryAsPrimitives = parseObject(request.query);

		// Only keep the filters
		const filter =
			'filter' in queryAsPrimitives ? queryAsPrimitives.filter : {};

		const filterCustom =
			'filterCustom' in queryAsPrimitives ? queryAsPrimitives.filterCustom : {};

		// Validate both the parsed query and the filter This is the final step
		// before we have a valid QueryOptionsRequestDto to use in the
		// controller/services layers.
		const input = {
			...parsed,
			filter,
			filterCustom,
		};

		const output = new ZodValidationPipe(schema).transform(input, {
			type: 'custom',
		});

		return {
			...output,
			sort: handleSortArray(output.sort),
		};
	},
);

/**
 * Decorator to add query options to the swagger spec.
 */
export function ApiQueryOptions() {
	return applyDecorators(
		// https://swagger.io/docs/specification/describing-parameters/#common
		// ApiExtraModels(QueryOptionsRequestDto),
		ApiQuery({ type: QueryOptionsRequestDto }),
	);
}

interface QueryOptionsDecoratorConfig {
	parserOptions?: Partial<RequestQueryOptions>;
	filterOptions?: {
		keys?: [string, ...string[]];
	};
}
