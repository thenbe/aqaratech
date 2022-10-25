import { ForbiddenError, subject } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { expenseCategorySchema } from '@self/utils';
import { Action } from 'src/casl/action.enum';
import {
	CreateExpenseCategoryDto,
	ExpenseCategoryDto,
	UpdateExpenseCategoryDto,
	UpdateExpenseCategoryTreeDto,
} from 'src/expense-categories/expense-category.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateId } from 'src/utils/generate-id';
import { z } from 'zod';

@Injectable()
export class ExpenseCategoriesService {
	constructor(private readonly prisma: PrismaService) {}
	SubjectType = 'Organization' as const;

	async create({
		organizationId,
		createExpenseCategoryDto,
		user,
	}: {
		organizationId: string;
		createExpenseCategoryDto: CreateExpenseCategoryDto;
		user: IUser;
	}) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Update,
			subject(this.SubjectType, { id: organizationId }),
		);

		const categories = await this.fetchJsonCategories({ organizationId });

		const id = generateId();
		const newCategory = {
			...createExpenseCategoryDto,
			id,
		};

		categories.push(newCategory);

		await this.prisma.organizationSettings.update({
			where: { organizationId },
			data: { expenseCategoryTree: categories },
		});

		return expenseCategorySchema.parse(newCategory);
	}

	async findAll({ organizationId }: { organizationId: string }) {
		const data = await this.prisma.organizationSettings.findUniqueOrThrow({
			where: { organizationId },
		});

		const categories = expenseCategorySchema
			.array()
			.parse(data.expenseCategoryTree);

		return categories;
	}

	async updateAll({
		organizationId,
		updateExpenseCategoryTreeDto,
		user,
	}: {
		organizationId: string;
		updateExpenseCategoryTreeDto: UpdateExpenseCategoryTreeDto[];
		user: IUser;
	}) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Update,
			subject(this.SubjectType, { id: organizationId }),
		);

		const originalTree = await this.fetchJsonCategories({ organizationId });

		// Currently, this applies the changes to all categories.
		const proposed = updateExpenseCategoryTreeDto.map((submitted) => {
			const original = originalTree.find((c) => c.id === submitted.id);

			if (!original) {
				throw new Error('updateAll should not be called with new categories', {
					cause: 'unknown category',
				});
			}

			return this.applyChanges({ original, submitted });
		});

		// check lengths match
		if (originalTree.length !== proposed.length) {
			throw new Error('updateAll should not be called with new categories', {
				cause: 'lengths do not match',
			});
		}

		const settings = await this.prisma.organizationSettings.update({
			where: { organizationId },
			data: { expenseCategoryTree: proposed },
		});

		return expenseCategorySchema.array().parse(settings.expenseCategoryTree);
	}

	async update({
		organizationId,
		expenseCategoryId,
		updateExpenseCategoryDto,
		user,
	}: {
		organizationId: string;
		expenseCategoryId: string;
		updateExpenseCategoryDto: UpdateExpenseCategoryDto;
		user: IUser;
	}) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Update,
			subject(this.SubjectType, { id: organizationId }),
		);

		const categories = await this.fetchJsonCategories({ organizationId });

		categories.forEach((c) => {
			if (c.id === expenseCategoryId) {
				this.applyChanges({
					original: c,
					submitted: updateExpenseCategoryDto,
				});
			}
		});

		const settings = await this.prisma.organizationSettings.update({
			where: { organizationId },
			data: { expenseCategoryTree: categories },
		});

		const tree = expenseCategorySchema
			.array()
			.parse(settings.expenseCategoryTree);

		const updated = tree.find((c) => c.id === expenseCategoryId);

		if (!updated) {
			throw new Error(`Unable to find updated category`);
		} else {
			return updated;
		}
	}

	// HELPERS

	async fetchJsonCategories({ organizationId }: { organizationId: string }) {
		// Reference: https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#advanced-example-update-a-nested-json-key-value
		const settings = await this.prisma.organizationSettings.findUniqueOrThrow({
			where: { organizationId },
			select: { expenseCategoryTree: true },
		});

		const categoriesJson = settings.expenseCategoryTree;

		return expenseCategorySchema.array().parse(categoriesJson);
	}

	applyChanges({
		original,
		submitted,
	}: {
		original: ExpenseCategoryDto;
		submitted: UpdateExpenseCategoryDto;
	}) {
		// submitted should not include any fields that are undefined
		const filtered = z
			.record(z.unknown().refine((v) => v !== undefined))
			.parse(submitted);

		return {
			...original,
			...filtered,
		};
	}
}
