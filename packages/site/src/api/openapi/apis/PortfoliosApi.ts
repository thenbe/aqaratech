/* tslint:disable */
/* eslint-disable */
/**
 * Aqaratech
 * Aqaratech API
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from '../runtime';
import type {
	BalanceDto,
	GroupByMonthDto,
	IncomeByMonthDto,
	PaginatedExpenseDto,
	PaginatedLeaseInvoiceDto,
	PaginatedPayoutDto,
	PaginatedPortfolioDto,
	PaginatedPropertyDto,
	PaginatedRoleDto,
	PaginatedUnitDto,
	PortfolioDto,
	UpdatePortfolioDto,
} from '../models';

export interface PortfoliosApiFindAllRequest {
	page?: number;
	skip?: number;
	take?: number;
	sort?: Array<string>;
	filter?: object;
}

export interface PortfoliosApiFindAllExpensesRequest {
	id: string;
	page?: number;
	skip?: number;
	take?: number;
	sort?: Array<string>;
	filter?: object;
}

export interface PortfoliosApiFindAllLeaseInvoicesRequest {
	id: string;
	page?: number;
	skip?: number;
	take?: number;
	sort?: Array<string>;
	filter?: object;
}

export interface PortfoliosApiFindOneRequest {
	id: string;
}

export interface PortfoliosApiFindPayoutsRequest {
	id: string;
	page?: number;
	skip?: number;
	take?: number;
	sort?: Array<string>;
	filter?: object;
}

export interface PortfoliosApiFindPropertiesRequest {
	id: string;
	page?: number;
	skip?: number;
	take?: number;
	sort?: Array<string>;
	filter?: object;
}

export interface PortfoliosApiFindRolesRequest {
	id: string;
	page?: number;
	skip?: number;
	take?: number;
	sort?: Array<string>;
	filter?: object;
}

export interface PortfoliosApiFindUnitsRequest {
	id: string;
	page?: number;
	skip?: number;
	take?: number;
	sort?: Array<string>;
	filter?: object;
}

export interface PortfoliosApiGetBalanceRequest {
	id: string;
}

export interface PortfoliosApiGetExpensesByMonthRequest {
	organizationId: string;
	portfolioId: string;
	start?: string;
	end?: string;
	propertyId?: string;
	unitId?: string;
}

export interface PortfoliosApiGetIncomeByMonthRequest {
	organizationId: string;
	portfolioId: string;
	start?: string;
	end?: string;
	propertyId?: string;
	unitId?: string;
}

export interface PortfoliosApiRemoveRequest {
	id: string;
}

export interface PortfoliosApiUpdateRequest {
	id: string;
	updatePortfolioDto: UpdatePortfolioDto;
}

/**
 * PortfoliosApi - interface
 *
 * @export
 * @interface PortfoliosApiInterface
 */
export interface PortfoliosApiInterface {
	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof PortfoliosApiInterface
	 */
	findAllRaw(
		requestParameters: PortfoliosApiFindAllRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedPortfolioDto>>;

	/**
	 *
	 *
	 */
	findAll(
		requestParameters: PortfoliosApiFindAllRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedPortfolioDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof PortfoliosApiInterface
	 */
	findAllExpensesRaw(
		requestParameters: PortfoliosApiFindAllExpensesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedExpenseDto>>;

	/**
	 *
	 *
	 */
	findAllExpenses(
		requestParameters: PortfoliosApiFindAllExpensesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedExpenseDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof PortfoliosApiInterface
	 */
	findAllLeaseInvoicesRaw(
		requestParameters: PortfoliosApiFindAllLeaseInvoicesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedLeaseInvoiceDto>>;

	/**
	 *
	 *
	 */
	findAllLeaseInvoices(
		requestParameters: PortfoliosApiFindAllLeaseInvoicesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedLeaseInvoiceDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof PortfoliosApiInterface
	 */
	findOneRaw(
		requestParameters: PortfoliosApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PortfolioDto>>;

	/**
	 *
	 *
	 */
	findOne(
		requestParameters: PortfoliosApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PortfolioDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof PortfoliosApiInterface
	 */
	findPayoutsRaw(
		requestParameters: PortfoliosApiFindPayoutsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedPayoutDto>>;

	/**
	 *
	 *
	 */
	findPayouts(
		requestParameters: PortfoliosApiFindPayoutsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedPayoutDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof PortfoliosApiInterface
	 */
	findPropertiesRaw(
		requestParameters: PortfoliosApiFindPropertiesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedPropertyDto>>;

	/**
	 *
	 *
	 */
	findProperties(
		requestParameters: PortfoliosApiFindPropertiesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedPropertyDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof PortfoliosApiInterface
	 */
	findRolesRaw(
		requestParameters: PortfoliosApiFindRolesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedRoleDto>>;

	/**
	 *
	 *
	 */
	findRoles(
		requestParameters: PortfoliosApiFindRolesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedRoleDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof PortfoliosApiInterface
	 */
	findUnitsRaw(
		requestParameters: PortfoliosApiFindUnitsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedUnitDto>>;

	/**
	 *
	 *
	 */
	findUnits(
		requestParameters: PortfoliosApiFindUnitsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedUnitDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof PortfoliosApiInterface
	 */
	getBalanceRaw(
		requestParameters: PortfoliosApiGetBalanceRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<BalanceDto>>;

	/**
	 *
	 *
	 */
	getBalance(
		requestParameters: PortfoliosApiGetBalanceRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<BalanceDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof PortfoliosApiInterface
	 */
	getExpensesByMonthRaw(
		requestParameters: PortfoliosApiGetExpensesByMonthRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<Array<GroupByMonthDto>>>;

	/**
	 *
	 *
	 */
	getExpensesByMonth(
		requestParameters: PortfoliosApiGetExpensesByMonthRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<Array<GroupByMonthDto>>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof PortfoliosApiInterface
	 */
	getIncomeByMonthRaw(
		requestParameters: PortfoliosApiGetIncomeByMonthRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<IncomeByMonthDto>>;

	/**
	 *
	 *
	 */
	getIncomeByMonth(
		requestParameters: PortfoliosApiGetIncomeByMonthRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<IncomeByMonthDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof PortfoliosApiInterface
	 */
	removeRaw(
		requestParameters: PortfoliosApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PortfolioDto>>;

	/**
	 *
	 *
	 */
	remove(
		requestParameters: PortfoliosApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PortfolioDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof PortfoliosApiInterface
	 */
	updateRaw(
		requestParameters: PortfoliosApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PortfolioDto>>;

	/**
	 *
	 *
	 */
	update(
		requestParameters: PortfoliosApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PortfolioDto>;
}

/**
 *
 */
export class PortfoliosApi
	extends runtime.BaseAPI
	implements PortfoliosApiInterface
{
	/**
	 *
	 *
	 */
	async findAllRaw(
		requestParameters: PortfoliosApiFindAllRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedPortfolioDto>> {
		const queryParameters: any = {};

		if (requestParameters.page !== undefined) {
			queryParameters['page'] = requestParameters.page;
		}

		if (requestParameters.skip !== undefined) {
			queryParameters['skip'] = requestParameters.skip;
		}

		if (requestParameters.take !== undefined) {
			queryParameters['take'] = requestParameters.take;
		}

		if (requestParameters.sort) {
			queryParameters['sort'] = requestParameters.sort;
		}

		if (requestParameters.filter !== undefined) {
			queryParameters['filter'] = requestParameters.filter;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/portfolios`,
				method: 'GET',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async findAll(
		requestParameters: PortfoliosApiFindAllRequest = {},
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedPortfolioDto> {
		const response = await this.findAllRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findAllExpensesRaw(
		requestParameters: PortfoliosApiFindAllExpensesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedExpenseDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling findAllExpenses.',
			);
		}

		const queryParameters: any = {};

		if (requestParameters.page !== undefined) {
			queryParameters['page'] = requestParameters.page;
		}

		if (requestParameters.skip !== undefined) {
			queryParameters['skip'] = requestParameters.skip;
		}

		if (requestParameters.take !== undefined) {
			queryParameters['take'] = requestParameters.take;
		}

		if (requestParameters.sort) {
			queryParameters['sort'] = requestParameters.sort;
		}

		if (requestParameters.filter !== undefined) {
			queryParameters['filter'] = requestParameters.filter;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/portfolios/{id}/expenses`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async findAllExpenses(
		requestParameters: PortfoliosApiFindAllExpensesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedExpenseDto> {
		const response = await this.findAllExpensesRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findAllLeaseInvoicesRaw(
		requestParameters: PortfoliosApiFindAllLeaseInvoicesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedLeaseInvoiceDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling findAllLeaseInvoices.',
			);
		}

		const queryParameters: any = {};

		if (requestParameters.page !== undefined) {
			queryParameters['page'] = requestParameters.page;
		}

		if (requestParameters.skip !== undefined) {
			queryParameters['skip'] = requestParameters.skip;
		}

		if (requestParameters.take !== undefined) {
			queryParameters['take'] = requestParameters.take;
		}

		if (requestParameters.sort) {
			queryParameters['sort'] = requestParameters.sort;
		}

		if (requestParameters.filter !== undefined) {
			queryParameters['filter'] = requestParameters.filter;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/portfolios/{id}/lease-invoices`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async findAllLeaseInvoices(
		requestParameters: PortfoliosApiFindAllLeaseInvoicesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedLeaseInvoiceDto> {
		const response = await this.findAllLeaseInvoicesRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findOneRaw(
		requestParameters: PortfoliosApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PortfolioDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling findOne.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/portfolios/{id}`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async findOne(
		requestParameters: PortfoliosApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PortfolioDto> {
		const response = await this.findOneRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findPayoutsRaw(
		requestParameters: PortfoliosApiFindPayoutsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedPayoutDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling findPayouts.',
			);
		}

		const queryParameters: any = {};

		if (requestParameters.page !== undefined) {
			queryParameters['page'] = requestParameters.page;
		}

		if (requestParameters.skip !== undefined) {
			queryParameters['skip'] = requestParameters.skip;
		}

		if (requestParameters.take !== undefined) {
			queryParameters['take'] = requestParameters.take;
		}

		if (requestParameters.sort) {
			queryParameters['sort'] = requestParameters.sort;
		}

		if (requestParameters.filter !== undefined) {
			queryParameters['filter'] = requestParameters.filter;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/portfolios/{id}/payouts`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async findPayouts(
		requestParameters: PortfoliosApiFindPayoutsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedPayoutDto> {
		const response = await this.findPayoutsRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findPropertiesRaw(
		requestParameters: PortfoliosApiFindPropertiesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedPropertyDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling findProperties.',
			);
		}

		const queryParameters: any = {};

		if (requestParameters.page !== undefined) {
			queryParameters['page'] = requestParameters.page;
		}

		if (requestParameters.skip !== undefined) {
			queryParameters['skip'] = requestParameters.skip;
		}

		if (requestParameters.take !== undefined) {
			queryParameters['take'] = requestParameters.take;
		}

		if (requestParameters.sort) {
			queryParameters['sort'] = requestParameters.sort;
		}

		if (requestParameters.filter !== undefined) {
			queryParameters['filter'] = requestParameters.filter;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/portfolios/{id}/properties`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async findProperties(
		requestParameters: PortfoliosApiFindPropertiesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedPropertyDto> {
		const response = await this.findPropertiesRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findRolesRaw(
		requestParameters: PortfoliosApiFindRolesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedRoleDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling findRoles.',
			);
		}

		const queryParameters: any = {};

		if (requestParameters.page !== undefined) {
			queryParameters['page'] = requestParameters.page;
		}

		if (requestParameters.skip !== undefined) {
			queryParameters['skip'] = requestParameters.skip;
		}

		if (requestParameters.take !== undefined) {
			queryParameters['take'] = requestParameters.take;
		}

		if (requestParameters.sort) {
			queryParameters['sort'] = requestParameters.sort;
		}

		if (requestParameters.filter !== undefined) {
			queryParameters['filter'] = requestParameters.filter;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/portfolios/{id}/roles`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async findRoles(
		requestParameters: PortfoliosApiFindRolesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedRoleDto> {
		const response = await this.findRolesRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findUnitsRaw(
		requestParameters: PortfoliosApiFindUnitsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedUnitDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling findUnits.',
			);
		}

		const queryParameters: any = {};

		if (requestParameters.page !== undefined) {
			queryParameters['page'] = requestParameters.page;
		}

		if (requestParameters.skip !== undefined) {
			queryParameters['skip'] = requestParameters.skip;
		}

		if (requestParameters.take !== undefined) {
			queryParameters['take'] = requestParameters.take;
		}

		if (requestParameters.sort) {
			queryParameters['sort'] = requestParameters.sort;
		}

		if (requestParameters.filter !== undefined) {
			queryParameters['filter'] = requestParameters.filter;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/portfolios/{id}/units`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async findUnits(
		requestParameters: PortfoliosApiFindUnitsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedUnitDto> {
		const response = await this.findUnitsRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async getBalanceRaw(
		requestParameters: PortfoliosApiGetBalanceRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<BalanceDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling getBalance.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/portfolios/{id}/balance`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async getBalance(
		requestParameters: PortfoliosApiGetBalanceRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<BalanceDto> {
		const response = await this.getBalanceRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async getExpensesByMonthRaw(
		requestParameters: PortfoliosApiGetExpensesByMonthRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<Array<GroupByMonthDto>>> {
		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling getExpensesByMonth.',
			);
		}

		if (
			requestParameters.portfolioId === null ||
			requestParameters.portfolioId === undefined
		) {
			throw new runtime.RequiredError(
				'portfolioId',
				'Required parameter requestParameters.portfolioId was null or undefined when calling getExpensesByMonth.',
			);
		}

		const queryParameters: any = {};

		if (requestParameters.start !== undefined) {
			queryParameters['start'] = requestParameters.start;
		}

		if (requestParameters.end !== undefined) {
			queryParameters['end'] = requestParameters.end;
		}

		if (requestParameters.propertyId !== undefined) {
			queryParameters['propertyId'] = requestParameters.propertyId;
		}

		if (requestParameters.unitId !== undefined) {
			queryParameters['unitId'] = requestParameters.unitId;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/portfolios/{portfolioId}/aggregate/expenses`
					.replace(
						`{${'organizationId'}}`,
						encodeURIComponent(String(requestParameters.organizationId)),
					)
					.replace(
						`{${'portfolioId'}}`,
						encodeURIComponent(String(requestParameters.portfolioId)),
					),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async getExpensesByMonth(
		requestParameters: PortfoliosApiGetExpensesByMonthRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<Array<GroupByMonthDto>> {
		const response = await this.getExpensesByMonthRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async getIncomeByMonthRaw(
		requestParameters: PortfoliosApiGetIncomeByMonthRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<IncomeByMonthDto>> {
		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling getIncomeByMonth.',
			);
		}

		if (
			requestParameters.portfolioId === null ||
			requestParameters.portfolioId === undefined
		) {
			throw new runtime.RequiredError(
				'portfolioId',
				'Required parameter requestParameters.portfolioId was null or undefined when calling getIncomeByMonth.',
			);
		}

		const queryParameters: any = {};

		if (requestParameters.start !== undefined) {
			queryParameters['start'] = requestParameters.start;
		}

		if (requestParameters.end !== undefined) {
			queryParameters['end'] = requestParameters.end;
		}

		if (requestParameters.propertyId !== undefined) {
			queryParameters['propertyId'] = requestParameters.propertyId;
		}

		if (requestParameters.unitId !== undefined) {
			queryParameters['unitId'] = requestParameters.unitId;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/portfolios/{portfolioId}/aggregate/income`
					.replace(
						`{${'organizationId'}}`,
						encodeURIComponent(String(requestParameters.organizationId)),
					)
					.replace(
						`{${'portfolioId'}}`,
						encodeURIComponent(String(requestParameters.portfolioId)),
					),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async getIncomeByMonth(
		requestParameters: PortfoliosApiGetIncomeByMonthRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<IncomeByMonthDto> {
		const response = await this.getIncomeByMonthRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async removeRaw(
		requestParameters: PortfoliosApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PortfolioDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling remove.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/portfolios/{id}`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'DELETE',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async remove(
		requestParameters: PortfoliosApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PortfolioDto> {
		const response = await this.removeRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async updateRaw(
		requestParameters: PortfoliosApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PortfolioDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling update.',
			);
		}

		if (
			requestParameters.updatePortfolioDto === null ||
			requestParameters.updatePortfolioDto === undefined
		) {
			throw new runtime.RequiredError(
				'updatePortfolioDto',
				'Required parameter requestParameters.updatePortfolioDto was null or undefined when calling update.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/portfolios/{id}`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'PATCH',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.updatePortfolioDto,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async update(
		requestParameters: PortfoliosApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PortfolioDto> {
		const response = await this.updateRaw(requestParameters, initOverrides);
		return await response.value();
	}
}
