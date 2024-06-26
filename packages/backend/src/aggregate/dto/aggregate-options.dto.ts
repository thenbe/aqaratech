import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';

import { RangeKind } from '@self/utils';
import {
	AggregateOptionsExpensesSchema,
	AggregateOptionsSchema,
} from 'src/aggregate/dto/aggregate-options.schema';
import { Exactly } from 'src/types/exactly.type';

export class AggregateOptionsDto
	implements Exactly<AggregateOptionsSchema, AggregateOptionsDto>
{
	@ApiPropertyOptional() // optional because of default value
	start: string;

	@ApiPropertyOptional() // optional because of default value
	end: string;

	portfolioId?: string;
	propertyId?: string;
	unitId?: string;

	@ApiPropertyOptional({
		enum: ['postAt', 'paidAt'] satisfies RangeKind[],
		enumName: 'RangeKind',
	})
	rangeKind: RangeKind;
}

export class GetOccupancyOptionsDto extends OmitType(AggregateOptionsDto, [
	'portfolioId',
]) {}

/**
 * Differentiates between `undefined` and `null` values for `propertyId` and `unitId` properties.
 *
 * `undefined` means means that we don't care about the value of the propertyId or unitId.
 *
 * `null` means that we want to explicitly filter by `null` value of the propertyId or unitId.
 *
 * @example
 *
 * We want to get an entire portfolio's expenses: use `undefined` for `propertyId` and `unitId`.
 *
 * We want to get expenses where property is `unspecified`: use `null` for `propertyId` and `undefined` for `unitId`.
 *
 * Otherwise identical to `AggregateOptionsDto`.
 */
export class AggregateOptionsExpensesDto
	extends OmitType(AggregateOptionsDto, [
		'portfolioId', // expense aggregate is scoped to a single portfolio
		'propertyId',
		'unitId',
		'rangeKind',
	])
	implements
		Exactly<AggregateOptionsExpensesSchema, AggregateOptionsExpensesDto>
{
	propertyId?: string | null;
	unitId?: string | null;
}
