import type {
	BrowserContext,
	Fixtures,
	PlaywrightTestArgs,
	PlaywrightWorkerArgs,
} from '@playwright/test';
import type {
	ExpenseCategoryFactoryParams,
	ExpenseFactoryParams,
	LeaseFactoryParams,
	LeaseInvoiceFactoryParams,
	PayoutFactoryParams,
	RoleFactoryParams,
	TenantFactoryParams,
} from '@self/seed';
import type {
	ExpenseCategoryDto,
	ExpenseDto,
	LeaseDto,
	LeaseInvoiceDto,
	OrganizationCreatedDto,
	PayoutDto,
	PortfolioDto,
	PropertyDto,
	RoleDto,
	TenantDto,
	UnitDto,
} from '../../../types/api';

export interface TestFixtures {
	// auth
	scopedContext: PlaywrightTestArgs['context'];
	scopedRequest: PlaywrightTestArgs['request'];
	scopedPage: PlaywrightTestArgs['page'];
	roleCookie: Parameters<BrowserContext['addCookies']>[0][0];

	org: OrganizationCreatedDto;
	role: RoleDto;
	tenant: TenantDto;
	tenants: [TenantDto, ...TenantDto[]];
	portfolio: PortfolioDto;
	property: PropertyDto;
	unit: UnitDto;
	lease: LeaseDto;
	leases: [LeaseDto, ...LeaseDto[]];
	invoice: LeaseInvoiceDto;
	invoices: [LeaseInvoiceDto, ...LeaseInvoiceDto[]];
	expense: ExpenseDto;
	expenses: ExpenseDto[];
	payout: PayoutDto;
	payouts: [PayoutDto, ...PayoutDto[]];
	expenseCategory: ExpenseCategoryDto;
	file: string;
}

export interface TestOptions {
	// auth
	userRoleType: RoleDto['roleType'];
	roleParams: RoleFactoryParams | undefined;

	tenantsParams: [TenantFactoryParams, ...TenantFactoryParams[]] | undefined;
	leasesParams: LeaseFactoryParams[] | undefined;
	payoutsParams: PayoutFactoryParams[] | undefined;
	invoicesParams:
		| [LeaseInvoiceFactoryParams, ...LeaseInvoiceFactoryParams[]]
		| undefined;

	expenseParams: ExpenseFactoryParams | undefined;
	/**
	 * Both propertyId and unitId are defined by default. If you want to override,
	 * explicitly set the value to null.
	 */
	expensesParams: ExpenseFactoryParams[] | undefined;
	expenseCategoryParams: ExpenseCategoryFactoryParams | undefined;
}

export type AllFixtures = Fixtures<
	TestFixtures & TestOptions,
	// eslint-disable-next-line @typescript-eslint/ban-types
	{},
	PlaywrightTestArgs,
	PlaywrightWorkerArgs
>;

// `AllFixtures` type taken from TestType.extend.params[0]
// extend<T extends KeyValue, W extends KeyValue = {}>(fixtures: Fixtures<T, W, TestArgs, WorkerArgs>): TestType<TestArgs & T, WorkerArgs & W>;
