import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';

import { Action } from 'src/casl/action.enum';
import { crumbs } from 'src/common/breadcrumb-select';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import {
	RemoveDocumentsEvent,
	UpdateIndexEvent,
} from 'src/events/update-index.event';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { PropertySearchDocument } from 'src/properties/dto/property-search-document';
import {
	CreatePropertyDto,
	PropertyDto,
	UpdatePropertyDto,
} from 'src/properties/dto/property.dto';

@Injectable()
export class PropertiesService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly eventEmitter: EventEmitter2,
	) {}
	SubjectType = 'Property' as const;
	IndexName = 'property' as const;
	IndexConstructor = PropertySearchDocument;

	async create({
		createPropertyDto,
		organizationId,
	}: {
		createPropertyDto: CreatePropertyDto;
		organizationId: string;
	}) {
		const created = await this.prisma.property.create({
			data: {
				...createPropertyDto,
				organizationId,
			},
		});

		const property = new PropertyDto(created);

		this.eventEmitter.emit(
			'update.index',
			new UpdateIndexEvent([property], this.IndexName, this.IndexConstructor),
		);

		return property;
	}

	async findAll({
		queryOptions,
		user,
		where,
	}: {
		queryOptions: QueryOptionsDto;
		user: IUser;
		where?: Prisma.PropertyWhereInput;
	}): Promise<WithCount<PropertyDto>> {
		const { take, skip, sort } = queryOptions;

		const filter: Prisma.PropertyWhereInput = {
			AND: [
				accessibleBy(user.ability, Action.Read).Property,
				...(where ? [where] : []),
			],
		};

		const [results, total] = await Promise.all([
			this.prisma.property.findMany({
				take,
				skip,
				orderBy: sort,
				where: filter,
				include: { portfolio: crumbs.portfolio },
			}),
			this.prisma.property.count({ where: filter }),
		]);

		return { total, results: results.map((p) => new PropertyDto(p)) };
	}

	async findOne({ id, user }: { id: string; user: IUser }) {
		const property = await this.prisma.property.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Read).Property],
			},
			include: { portfolio: crumbs.portfolio },
		});

		return new PropertyDto(property);
	}

	async update({
		id,
		updatePropertyDto,
		user,
	}: {
		id: string;
		updatePropertyDto: UpdatePropertyDto;
		user: IUser;
	}) {
		const updated = await this.prisma.property.update({
			where: { id, AND: accessibleBy(user.ability, Action.Update).Property },
			data: updatePropertyDto,
		});

		const property = new PropertyDto(updated);

		this.eventEmitter.emit(
			'update.index',
			new UpdateIndexEvent([property], this.IndexName, this.IndexConstructor),
		);

		return property;
	}

	async remove({ id, user }: { id: string; user: IUser }) {
		await this.prisma.property.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Delete).Property],
			},
		});

		const deleted = await this.prisma.property.delete({ where: { id } });

		this.eventEmitter.emit(
			'remove.documents',
			new RemoveDocumentsEvent([id], this.IndexName),
		);

		return new PropertyDto(deleted);
	}
}
