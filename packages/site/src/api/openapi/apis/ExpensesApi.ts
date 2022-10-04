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
	CombinedEnum,
	CreateExpenseDto,
	ExpenseDto,
	PaginatedExpenseDto,
	PartialExpenseDto,
	SortOrderEnum,
	UpdateExpenseDto,
} from '../models';

export interface ExpensesApiCreateRequest {
	createExpenseDto: CreateExpenseDto;
}

export interface ExpensesApiFindAllRequest {
	page?: number;
	take?: number;
	orderBy?: CombinedEnum;
	sortOrder?: SortOrderEnum;
	filter?: object;
	start?: string;
	end?: string;
	portfolioId?: string;
	propertyId?: string;
	unitId?: string;
}

export interface ExpensesApiFindOneRequest {
	id: string;
}

export interface ExpensesApiRemoveRequest {
	id: string;
}

export interface ExpensesApiUpdateRequest {
	id: string;
	updateExpenseDto: UpdateExpenseDto;
}

/**
 * ExpensesApi - interface
 *
 * @export
 * @interface ExpensesApiInterface
 */
export interface ExpensesApiInterface {
	/**
	 *
	 * @summary
	 * @param {CreateExpenseDto} createExpenseDto
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ExpensesApiInterface
	 */
	createRaw(
		requestParameters: ExpensesApiCreateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PartialExpenseDto>>;

	/**
	 *
	 *
	 */
	create(
		requestParameters: ExpensesApiCreateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PartialExpenseDto>;

	/**
	 *
	 * @summary
	 * @param {number} [page]
	 * @param {number} [take]
	 * @param {CombinedEnum} [orderBy]
	 * @param {SortOrderEnum} [sortOrder]
	 * @param {object} [filter]
	 * @param {string} [start]
	 * @param {string} [end]
	 * @param {string} [portfolioId]
	 * @param {string} [propertyId]
	 * @param {string} [unitId]
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ExpensesApiInterface
	 */
	findAllRaw(
		requestParameters: ExpensesApiFindAllRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedExpenseDto>>;

	/**
	 *
	 *
	 */
	findAll(
		requestParameters: ExpensesApiFindAllRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedExpenseDto>;

	/**
	 *
	 * @summary
	 * @param {string} id
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ExpensesApiInterface
	 */
	findOneRaw(
		requestParameters: ExpensesApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<ExpenseDto>>;

	/**
	 *
	 *
	 */
	findOne(
		requestParameters: ExpensesApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<ExpenseDto>;

	/**
	 *
	 * @summary
	 * @param {string} id
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ExpensesApiInterface
	 */
	removeRaw(
		requestParameters: ExpensesApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<string>>;

	/**
	 *
	 *
	 */
	remove(
		requestParameters: ExpensesApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<string>;

	/**
	 *
	 * @summary
	 * @param {string} id
	 * @param {UpdateExpenseDto} updateExpenseDto
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ExpensesApiInterface
	 */
	updateRaw(
		requestParameters: ExpensesApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PartialExpenseDto>>;

	/**
	 *
	 *
	 */
	update(
		requestParameters: ExpensesApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PartialExpenseDto>;
}

/**
 *
 */
export class ExpensesApi
	extends runtime.BaseAPI
	implements ExpensesApiInterface
{
	/**
	 *
	 *
	 */
	async createRaw(
		requestParameters: ExpensesApiCreateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PartialExpenseDto>> {
		if (
			requestParameters.createExpenseDto === null ||
			requestParameters.createExpenseDto === undefined
		) {
			throw new runtime.RequiredError(
				'createExpenseDto',
				'Required parameter requestParameters.createExpenseDto was null or undefined when calling create.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		if (this.configuration && this.configuration.accessToken) {
			const token = this.configuration.accessToken;
			const tokenString = await token('bearer', []);

			if (tokenString) {
				headerParameters['Authorization'] = `Bearer ${tokenString}`;
			}
		}
		const response = await this.request(
			{
				path: `/expenses`,
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.createExpenseDto,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async create(
		requestParameters: ExpensesApiCreateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PartialExpenseDto> {
		const response = await this.createRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findAllRaw(
		requestParameters: ExpensesApiFindAllRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedExpenseDto>> {
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

		if (this.configuration && this.configuration.accessToken) {
			const token = this.configuration.accessToken;
			const tokenString = await token('bearer', []);

			if (tokenString) {
				headerParameters['Authorization'] = `Bearer ${tokenString}`;
			}
		}
		const response = await this.request(
			{
				path: `/expenses`,
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
		requestParameters: ExpensesApiFindAllRequest = {},
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedExpenseDto> {
		const response = await this.findAllRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findOneRaw(
		requestParameters: ExpensesApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<ExpenseDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling findOne.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		if (this.configuration && this.configuration.accessToken) {
			const token = this.configuration.accessToken;
			const tokenString = await token('bearer', []);

			if (tokenString) {
				headerParameters['Authorization'] = `Bearer ${tokenString}`;
			}
		}
		const response = await this.request(
			{
				path: `/expenses/{id}`.replace(
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
		requestParameters: ExpensesApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<ExpenseDto> {
		const response = await this.findOneRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async removeRaw(
		requestParameters: ExpensesApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<string>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling remove.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		if (this.configuration && this.configuration.accessToken) {
			const token = this.configuration.accessToken;
			const tokenString = await token('bearer', []);

			if (tokenString) {
				headerParameters['Authorization'] = `Bearer ${tokenString}`;
			}
		}
		const response = await this.request(
			{
				path: `/expenses/{id}`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'DELETE',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.TextApiResponse(response) as any;
	}

	/**
	 *
	 *
	 */
	async remove(
		requestParameters: ExpensesApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<string> {
		const response = await this.removeRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async updateRaw(
		requestParameters: ExpensesApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PartialExpenseDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling update.',
			);
		}

		if (
			requestParameters.updateExpenseDto === null ||
			requestParameters.updateExpenseDto === undefined
		) {
			throw new runtime.RequiredError(
				'updateExpenseDto',
				'Required parameter requestParameters.updateExpenseDto was null or undefined when calling update.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		if (this.configuration && this.configuration.accessToken) {
			const token = this.configuration.accessToken;
			const tokenString = await token('bearer', []);

			if (tokenString) {
				headerParameters['Authorization'] = `Bearer ${tokenString}`;
			}
		}
		const response = await this.request(
			{
				path: `/expenses/{id}`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'PATCH',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.updateExpenseDto,
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
		requestParameters: ExpensesApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PartialExpenseDto> {
		const response = await this.updateRaw(requestParameters, initOverrides);
		return await response.value();
	}
}
