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
	ByMonthDto,
	CombinedEnum,
	Occupancy,
	PaidStatusEnum,
	SortOrderEnum,
} from '../models';

export interface AggregateApiGetExpensesByMonthRequest {
	xRoleId?: string;
	start?: string;
	end?: string;
	portfolioId?: string;
	propertyId?: string;
	unitId?: string;
}

export interface AggregateApiGetIncomeByMonthRequest {
	xRoleId?: string;
	page?: number;
	take?: number;
	orderBy?: CombinedEnum;
	sortOrder?: SortOrderEnum;
	filter?: object;
	start?: string;
	end?: string;
	paidStatus?: PaidStatusEnum;
	portfolioId?: string;
	propertyId?: string;
	unitId?: string;
}

export interface AggregateApiGetOccupancyRequest {
	xRoleId?: string;
	start?: string;
	end?: string;
	portfolioId?: string;
	propertyId?: string;
	unitId?: string;
}

/**
 * AggregateApi - interface
 *
 * @export
 * @interface AggregateApiInterface
 */
export interface AggregateApiInterface {
	/**
	 *
	 * @summary
	 * @param {string} [xRoleId]
	 * @param {string} [start]
	 * @param {string} [end]
	 * @param {string} [portfolioId]
	 * @param {string} [propertyId]
	 * @param {string} [unitId]
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof AggregateApiInterface
	 */
	getExpensesByMonthRaw(
		requestParameters: AggregateApiGetExpensesByMonthRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<Array<ByMonthDto>>>;

	/**
	 *
	 *
	 */
	getExpensesByMonth(
		requestParameters: AggregateApiGetExpensesByMonthRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<Array<ByMonthDto>>;

	/**
	 *
	 * @summary
	 * @param {string} [xRoleId]
	 * @param {number} [page]
	 * @param {number} [take]
	 * @param {CombinedEnum} [orderBy]
	 * @param {SortOrderEnum} [sortOrder]
	 * @param {object} [filter]
	 * @param {string} [start]
	 * @param {string} [end]
	 * @param {PaidStatusEnum} [paidStatus]
	 * @param {string} [portfolioId]
	 * @param {string} [propertyId]
	 * @param {string} [unitId]
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof AggregateApiInterface
	 */
	getIncomeByMonthRaw(
		requestParameters: AggregateApiGetIncomeByMonthRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<Array<ByMonthDto>>>;

	/**
	 *
	 *
	 */
	getIncomeByMonth(
		requestParameters: AggregateApiGetIncomeByMonthRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<Array<ByMonthDto>>;

	/**
	 *
	 * @summary
	 * @param {string} [xRoleId]
	 * @param {string} [start]
	 * @param {string} [end]
	 * @param {string} [portfolioId]
	 * @param {string} [propertyId]
	 * @param {string} [unitId]
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof AggregateApiInterface
	 */
	getOccupancyRaw(
		requestParameters: AggregateApiGetOccupancyRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<Array<Occupancy>>>;

	/**
	 *
	 *
	 */
	getOccupancy(
		requestParameters: AggregateApiGetOccupancyRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<Array<Occupancy>>;
}

/**
 *
 */
export class AggregateApi
	extends runtime.BaseAPI
	implements AggregateApiInterface
{
	/**
	 *
	 *
	 */
	async getExpensesByMonthRaw(
		requestParameters: AggregateApiGetExpensesByMonthRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<Array<ByMonthDto>>> {
		const queryParameters: any = {};

		if (requestParameters.start !== undefined) {
			queryParameters['start'] = requestParameters.start;
		}

		if (requestParameters.end !== undefined) {
			queryParameters['end'] = requestParameters.end;
		}

		if (requestParameters.portfolioId !== undefined) {
			queryParameters['portfolioId'] = requestParameters.portfolioId;
		}

		if (requestParameters.propertyId !== undefined) {
			queryParameters['propertyId'] = requestParameters.propertyId;
		}

		if (requestParameters.unitId !== undefined) {
			queryParameters['unitId'] = requestParameters.unitId;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		if (
			requestParameters.xRoleId !== undefined &&
			requestParameters.xRoleId !== null
		) {
			headerParameters['x-role-id'] = String(requestParameters.xRoleId);
		}

		const response = await this.request(
			{
				path: `/aggregate/expensesByMonth`,
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
		requestParameters: AggregateApiGetExpensesByMonthRequest = {},
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<Array<ByMonthDto>> {
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
		requestParameters: AggregateApiGetIncomeByMonthRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<Array<ByMonthDto>>> {
		const queryParameters: any = {};

		if (requestParameters.page !== undefined) {
			queryParameters['page'] = requestParameters.page;
		}

		if (requestParameters.take !== undefined) {
			queryParameters['take'] = requestParameters.take;
		}

		if (requestParameters.orderBy !== undefined) {
			queryParameters['orderBy'] = requestParameters.orderBy;
		}

		if (requestParameters.sortOrder !== undefined) {
			queryParameters['sortOrder'] = requestParameters.sortOrder;
		}

		if (requestParameters.filter !== undefined) {
			queryParameters['filter'] = requestParameters.filter;
		}

		if (requestParameters.start !== undefined) {
			queryParameters['start'] = requestParameters.start;
		}

		if (requestParameters.end !== undefined) {
			queryParameters['end'] = requestParameters.end;
		}

		if (requestParameters.paidStatus !== undefined) {
			queryParameters['paidStatus'] = requestParameters.paidStatus;
		}

		if (requestParameters.portfolioId !== undefined) {
			queryParameters['portfolioId'] = requestParameters.portfolioId;
		}

		if (requestParameters.propertyId !== undefined) {
			queryParameters['propertyId'] = requestParameters.propertyId;
		}

		if (requestParameters.unitId !== undefined) {
			queryParameters['unitId'] = requestParameters.unitId;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		if (
			requestParameters.xRoleId !== undefined &&
			requestParameters.xRoleId !== null
		) {
			headerParameters['x-role-id'] = String(requestParameters.xRoleId);
		}

		const response = await this.request(
			{
				path: `/aggregate/incomeByMonth`,
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
		requestParameters: AggregateApiGetIncomeByMonthRequest = {},
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<Array<ByMonthDto>> {
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
	async getOccupancyRaw(
		requestParameters: AggregateApiGetOccupancyRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<Array<Occupancy>>> {
		const queryParameters: any = {};

		if (requestParameters.start !== undefined) {
			queryParameters['start'] = requestParameters.start;
		}

		if (requestParameters.end !== undefined) {
			queryParameters['end'] = requestParameters.end;
		}

		if (requestParameters.portfolioId !== undefined) {
			queryParameters['portfolioId'] = requestParameters.portfolioId;
		}

		if (requestParameters.propertyId !== undefined) {
			queryParameters['propertyId'] = requestParameters.propertyId;
		}

		if (requestParameters.unitId !== undefined) {
			queryParameters['unitId'] = requestParameters.unitId;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		if (
			requestParameters.xRoleId !== undefined &&
			requestParameters.xRoleId !== null
		) {
			headerParameters['x-role-id'] = String(requestParameters.xRoleId);
		}

		const response = await this.request(
			{
				path: `/aggregate/occupancy`,
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
	async getOccupancy(
		requestParameters: AggregateApiGetOccupancyRequest = {},
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<Array<Occupancy>> {
		const response = await this.getOccupancyRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}
}
