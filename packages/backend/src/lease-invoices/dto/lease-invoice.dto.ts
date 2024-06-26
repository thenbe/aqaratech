import {
	ApiHideProperty,
	ApiProperty,
	IntersectionType,
	OmitType,
	PartialType,
	PickType,
} from '@nestjs/swagger';
import { LeaseInvoice } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

import {
	LeaseInvoiceCreateManySchema,
	LeaseInvoiceCreateSchema,
	LeaseInvoiceUpdateSchema,
} from '@self/utils';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import {
	BreadcrumbDto,
	BreadcrumbsDto,
	IBreadcrumbs,
} from 'src/common/dto/breadcrumb.dto';
import { NonComputed } from 'src/types/common.types';

class LeaseInvoiceRequiredDto {
	organizationId: string;

	portfolioId: string;

	amount: number;

	postAt: Date;

	leaseId: string;
}

class LeaseInvoiceOptionalDto {
	dueAt: Date | null;

	paidAt: Date | null;

	isPaid: boolean;

	memo: string | null;

	mfPaymentId: string | null;
}

class LeaseInvoiceBreadcrumbsDto extends PickType(BreadcrumbsDto, [
	'tenant',
	'portfolio',
	'property',
	'unit',
	'lease',
]) {}

export class LeaseInvoiceDto
	extends IntersectionType(
		AbstractDto,
		IntersectionType(LeaseInvoiceRequiredDto, LeaseInvoiceOptionalDto),
	)
	implements Omit<LeaseInvoice, 'mfData'>
{
	constructor(data: NonComputed<LeaseInvoiceDto>) {
		super();
		Object.assign(this, data);
	}

	@ApiHideProperty()
	@Exclude()
	lease: IBreadcrumbs['lease'];

	@ApiProperty()
	@Expose()
	get breadcrumbs(): LeaseInvoiceBreadcrumbsDto {
		return {
			portfolio: new BreadcrumbDto({
				id: this.portfolioId,
				title: this.lease.unit.property.portfolio.title,
			}),
			property: new BreadcrumbDto({
				id: this.lease.unit.property.id,
				title: this.lease.unit.property.title,
			}),
			unit: new BreadcrumbDto({
				id: this.lease.unit.id,
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				title: this.lease.unit.computed!.title,
			}),
			tenant: new BreadcrumbDto({
				id: this.lease.tenant.id,
				title: this.lease.tenant.title,
			}),
			lease: new BreadcrumbDto({
				id: this.lease.id,
				title: this.lease.id,
			}),
		};
	}
}

export class LeaseInvoicePublicDto extends PickType(LeaseInvoiceDto, [
	'id',
	'amount',
	'isPaid',
	'postAt',
	'paidAt',
	'memo',
]) {}

export class CreateLeaseInvoiceDto implements LeaseInvoiceCreateSchema {
	portfolioId: string;
	leaseId: string;
	amount: number;
	isPaid: boolean;
	postAt: string;
	paidAt?: string | null;
	memo?: string | null;
}

export class UpdateLeaseInvoiceDto
	extends PartialType(
		OmitType(CreateLeaseInvoiceDto, ['portfolioId', 'leaseId']),
	)
	implements LeaseInvoiceUpdateSchema {}

export class CreateManyLeaseInvoicesDto
	extends OmitType(CreateLeaseInvoiceDto, ['leaseId'])
	implements LeaseInvoiceCreateManySchema {}
