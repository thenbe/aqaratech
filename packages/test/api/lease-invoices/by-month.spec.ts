import { expect } from '@playwright/test';
import { expenseFactory } from '@self/seed';
import * as R from 'remeda';
import type { ByMonthDto } from '../../types/api';
import { test } from '../api-fixtures';

test.use({
	// create 2 expenses for each month of 2021
	portfolio: async ({ request, portfolio }, use) => {
		const expenses = R.range(0, 12).flatMap((month) => {
			const expense = expenseFactory.build({
				organizationId: portfolio.organizationId,
				portfolioId: portfolio.id,
				date: new Date(2021, month, 1).toISOString(),
			});

			const picked = R.pick(expense, [
				'amount',
				'postAt',
				'portfolioId',
				'organizationId',
			]);

			return [picked, picked];
		});

		// send post request for each expense
		await Promise.all(
			expenses.map((expense) =>
				request.post('/expenses', {
					data: expense,
				}),
			),
		);

		await use(portfolio);
	},
});

test(`expenses - data points are equal to the number of months`, async ({
	request,
	portfolio,
}) => {
	const res = await request.get('/aggregate/expensesByMonth', {
		params: {
			portfolioId: portfolio.id,
			start: '2021-01-01',
			end: '2022-01-01',
			// end: '2021-12-31', // TODO: test this too
		},
	});

	const body = (await res.json()) as ByMonthDto[];

	console.log({ body }, 'by-month.spec.ts ~ 22');

	expect(body.length).toBe(12);
});
