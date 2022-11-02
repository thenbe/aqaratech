import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { leaseUpdateSchema } from '@self/utils';
import { SkipAbilityCheck } from 'src/auth/public.decorator';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import {
	ApiQueryOptions,
	QueryParser,
} from 'src/decorators/query-options.decorator';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';

import { IUser } from 'src/interfaces/user.interface';
import { LeaseInvoiceDto } from 'src/lease-invoices/dto/lease-invoice.dto';
import { LeaseInvoicesService } from 'src/lease-invoices/lease-invoices.service';
import {
	LeaseDto,
	PartialLeaseDto,
	UpdateLeaseDto,
} from 'src/leases/dto/lease.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { LeasesService } from './leases.service';

const SubjectType = 'Lease';

@Controller('leases')
@ApiTags('leases')
@SwaggerAuth()
export class LeasesController {
	constructor(
		private readonly leasesService: LeasesService,
		private readonly leaseInvoicesService: LeaseInvoicesService,
	) {}

	@Get()
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiPaginatedResponse(LeaseDto)
	@ApiQuery({
		name: 'orderBy',
		enum: Prisma.LeaseScalarFieldEnum,
		required: false,
	})
	findAll(
		@User() user: IUser,
		@Query() pageOptionsDto: PageOptionsDto,
	): Promise<WithCount<LeaseDto>> {
		return this.leasesService.findAll({ pageOptionsDto, user });
	}

	@Get(':id')
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiOkResponse({ type: LeaseDto })
	findOne(@Param('id') id: string): Promise<LeaseDto> {
		return this.leasesService.findOne({ id });
	}

	@Patch(':id')
	@SkipAbilityCheck() // TODO rm
	@ApiOkResponse({ type: PartialLeaseDto })
	update(
		@User() user: IUser,
		@Param('id') id: string,
		@Body(new ZodValidationPipe(leaseUpdateSchema))
		updateLeaseDto: UpdateLeaseDto,
	): Promise<PartialLeaseDto> {
		return this.leasesService.update({ id, updateLeaseDto, user });
	}

	@Delete(':id')
	@CheckAbilities({ action: Action.Delete, subject: SubjectType })
	@ApiOkResponse({ type: String })
	remove(@Param('id') id: string): Promise<string> {
		return this.leasesService.remove({ id });
	}

	@Get('/:id/invoices')
	@CheckAbilities(
		{ action: Action.Read, subject: SubjectType },
		{ action: Action.Read, subject: 'LeaseInvoice' },
	)
	@ApiQueryOptions()
	@ApiPaginatedResponse(LeaseInvoiceDto)
	findInvoices(
		@User() user: IUser,
		@Param('id') id: string,
		@QueryParser({
			parserOptions: { orderDefaultValue: 'postAt' },
		})
		queryOptions: QueryOptionsDto,
	): Promise<WithCount<LeaseInvoiceDto>> {
		const where: Prisma.LeaseInvoiceWhereInput = { leaseId: { equals: id } };
		return this.leaseInvoicesService.findAll({ user, queryOptions, where });
	}
}
