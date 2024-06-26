export enum PageTypePortfolio {
	Summary = 'summary-dashboard',
	Income = 'income-dashboard',
	IncomeTable = 'income-table-dashboard',
	Expenses = 'expenses-dashboard',
	ExpensesTable = 'expenses-table-dashboard',
	/**
	 * @deprecated
	 * @see PageTypePortfolio.PayoutsTable
	 */
	Payouts = 'payouts-dashboard',
	PayoutsTable = 'payouts-table-dashboard',
}

export const isPageTypePortfolio = (
	pageType: string,
): pageType is PageTypePortfolio => {
	return Object.values(PageTypePortfolio).includes(
		pageType as PageTypePortfolio,
	);
};
