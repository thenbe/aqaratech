import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { computeLabelUnit, hasItems } from '@self/utils';
import {
	AggregateOptionsDto,
	AggregateOptionsExpensesDto,
} from 'src/aggregate/dto/aggregate-options.dto';
import { Occupancy } from 'src/aggregate/dto/occupancy.dto';
import { groupByCategory } from 'src/aggregate/group-by-category';
import { groupByLocation } from 'src/aggregate/group-by-location';
import { groupByMonth } from 'src/aggregate/group-by-month';
import { Action } from 'src/casl/action.enum';
import { PaidStatus } from 'src/constants/paid-status.enum';
import { ExpensesService } from 'src/expenses/expenses.service';
import { IUser } from 'src/interfaces/user.interface';
import { LeaseInvoicesService } from 'src/lease-invoices/lease-invoices.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AggregateService {
	constructor(
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
		private readonly prisma: PrismaService,
		private readonly leaseInvoicesService: LeaseInvoicesService,
		private readonly expensesService: ExpensesService,
	) {}

	async incomeByMonth({
		user,
		organizationId,
		options,
		paidStatus,
	}: {
		user: IUser;
		organizationId: string;
		options: AggregateOptionsDto;
		paidStatus: PaidStatus;
	}) {
		const portfolioId = options.portfolioId;
		const leaseInvoices = await this.prisma.c.leaseInvoice.findMany({
			where: {
				AND: [
					{
						organizationId,
						...(portfolioId && { portfolioId }),
						[options.rangeKind]: { gte: options.start, lte: options.end },
					},
					portfolioId
						? this.leaseInvoicesService.parseLocationFilter({
								filter: {
									portfolioId,
									propertyId: options.propertyId,
									unitId: options.unitId,
								},
						  })
						: {},
					this.leaseInvoicesService.parseIsPaidFilter({ paidStatus }),
					accessibleBy(user.ability, Action.Read).LeaseInvoice,
				],
			},
			select: { amount: true, postAt: true, paidAt: true },
		});

		const records = leaseInvoices
			.map((invoice) => ({
				amount: invoice.amount,
				date: invoice[options.rangeKind],
			}))
			// Calling .filter for type narrowing. We've already filtered out null paidAt's in the db query.
			.filter((n): n is { amount: number; date: Date } => n.date !== null);

		const grouped = groupByMonth(records, {
			includeEmptyMonths: true,
			start: options.start,
			end: options.end,
		});

		return grouped;
	}

	async portfolioExpenses({
		organizationId,
		portfolioId,
		options,
	}: {
		organizationId: string;
		portfolioId: string;
		options: AggregateOptionsExpensesDto;
	}) {
		const expenses = await this.prisma.c.expense.findMany({
			where: {
				AND: [
					{
						organizationId,
						portfolioId,
						...this.expensesService.parseLocationFilter(options),
						postAt: { gte: options.start, lte: options.end },
					},
				],
			},
			// TODO consider getting field names as a parameter to this function
			select: {
				amount: true,
				postAt: true,

				// Group by category
				categoryId: true,

				// Group by location
				portfolioId: true,
				propertyId: true,
				unitId: true,
				unit: {
					select: {
						propertyId: true,
					},
				},
			},
		});

		return expenses;
	}

	async portfolioExpensesByMonth({
		organizationId,
		portfolioId,
		options,
	}: {
		organizationId: string;
		portfolioId: string;
		options: AggregateOptionsExpensesDto;
	}) {
		const expenses = await this.portfolioExpenses({
			organizationId,
			portfolioId,
			options,
		});

		const records = expenses.map((expense) => ({
			amount: expense.amount,
			date: expense.postAt,
		}));

		const grouped = groupByMonth(records, {
			includeEmptyMonths: true,
			start: options.start,
			end: options.end,
		});

		return grouped;
	}

	async portfolioExpensesByCategory({
		organizationId,
		portfolioId,
		options,
	}: {
		organizationId: string;
		portfolioId: string;
		options: AggregateOptionsExpensesDto;
	}) {
		const expenses = await this.portfolioExpenses({
			organizationId,
			portfolioId,
			options,
		});

		const grouped = groupByCategory(expenses);

		return grouped;
	}

	async portfolioExpensesByLocation({
		organizationId,
		portfolioId,
		options,
	}: {
		organizationId: string;
		portfolioId: string;
		options: AggregateOptionsExpensesDto;
	}) {
		const expenses = await this.portfolioExpenses({
			organizationId,
			portfolioId,
			options,
		});

		const grouped = groupByLocation(expenses);

		// Add property label or unit label to each location
		const units = await this.prisma.c.unit.findMany({
			where: {
				organizationId,
				portfolioId,
				OR: [
					{ propertyId: { in: grouped.map((g) => g.propertyId ?? '') } },
					{ id: { in: grouped.map((g) => g.unitId ?? '') } },
				],
			},
			include: { property: true },
		});

		const withLabels = grouped.map((g) => {
			const unit = units.find((u) => u.id === g.unitId);
			// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
			const unitTitle = unit ? unit.label || computeLabelUnit(unit) : null;

			const property = units.find(
				(u) => u.propertyId === g.propertyId,
			)?.property;
			const propertyTitle = property ? property.title : null;

			if (g.unitId && unit && propertyTitle) {
				// Add unitTitle to expenses where unitId is set
				return {
					...g,
					unitTitle,
					propertyTitle,
				};
			} else if (g.propertyId && propertyTitle) {
				// Add propertyTitle to expenses where propertyId is set
				return {
					...g,
					unitTitle: null,
					propertyTitle,
				};
			} else {
				// For expenses where neither unitId nor propertyId is set, set titles to null
				return {
					...g,
					unitTitle: null,
					propertyTitle: null,
				};
			}
		});

		return withLabels;
	}

	async getOccupancy({
		organizationId,
		portfolioId,
		options,
	}: {
		organizationId: string;
		portfolioId: string;
		options: AggregateOptionsDto;
	}) {
		const units = await this.prisma.c.unit.findMany({
			where: {
				organizationId,
				portfolioId,
				...(options.propertyId ? { propertyId: options.propertyId } : {}),
				...(options.unitId ? { id: options.unitId } : {}), // Alternative?: id: options.unitId ?? {},
			},
			select: {
				id: true,
				createdAt: true,
				leases: {
					where: {
						// TODO test this
						start: { lte: options.end },
						end: { gte: options.start },
					},
					select: {
						start: true,
						end: true,
						unitId: true,
					},
				},
			},
			orderBy: {
				createdAt: 'asc',
			},
		});

		const days: Occupancy[] = [];

		if (!hasItems(units)) {
			this.logger.verbose?.(
				'No units found - getOccupancy',
				AggregateService.name,
			);
			return days;
		}

		// avoid looping over dates where no units are created
		const firstUnitCreatedAt = units[0].createdAt;
		const start =
			new Date(options.start) > firstUnitCreatedAt
				? new Date(options.start)
				: firstUnitCreatedAt;

		const end = new Date(options.end);

		// loop through each day in the range
		for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
			// only count units if data is after the unit creation date
			const createdUnits = units.filter((unit) => {
				return unit.createdAt <= date;
			});
			const unitCount = createdUnits.length;

			const occupied = createdUnits.filter((unit) => {
				return unit.leases.some((lease) => {
					return lease.start <= date && lease.end >= date;
				});
			}).length;

			// const vacant = unitCount - occupied;
			const occupiedPct = Math.round((occupied / unitCount) * 100);

			days.push({
				date: date.getTime(),
				occupiedPct,
				// occupied,
				// vacantPct,
				// vacant,
				// unitCount,
			});
		}

		return days;
	}

	async getBalance({
		portfolioId,
		user,
	}: {
		portfolioId: string;
		user: IUser;
	}) {
		const portfolio = await this.prisma.c.portfolio.findUniqueOrThrow({
			where: { id: portfolioId },
			select: {
				id: true,
				organizationId: true,
			},
		});

		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Read,
			subject('Portfolio', portfolio),
		);

		const [leaseInvoices, expenses, payouts] = await Promise.all([
			this.prisma.c.leaseInvoice.aggregate({
				_sum: { amount: true },
				where: {
					portfolioId: portfolioId,
					isPaid: true,
				},
			}),
			this.prisma.c.expense.aggregate({
				_sum: { amount: true },
				where: {
					portfolioId: portfolioId,
				},
			}),
			this.prisma.c.payout.aggregate({
				_sum: { amount: true },
				where: {
					portfolioId: portfolioId,
				},
			}),
		]);

		const leaseInvoiceSum = leaseInvoices._sum.amount ?? 0;
		const expenseSum = expenses._sum.amount ?? 0;
		const payoutSum = payouts._sum.amount ?? 0;

		const total = leaseInvoiceSum - expenseSum - payoutSum;

		const sum = {
			leaseInvoices: leaseInvoiceSum,
			expenses: expenseSum,
			payouts: payoutSum,
			total,
		};

		return sum;
	}
}
