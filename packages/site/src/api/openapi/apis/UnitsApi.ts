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
	CreateUnitDto,
	PaginatedLeaseDto,
	PaginatedUnitDto,
	PartialUnitDto,
	SortOrderEnum,
	UnitDto,
	UpdateUnitDto,
} from '../models';

export interface UnitsApiCreateRequest {
	createUnitDto: CreateUnitDto;
}

export interface UnitsApiFindAllRequest {
	page?: number;
	take?: number;
	sortOrder?: SortOrderEnum;
	filter?: object;
	orderBy?: string;
}

export interface UnitsApiFindLeasesRequest {
	id: string;
	page?: number;
	take?: number;
	sortOrder?: SortOrderEnum;
	filter?: object;
	orderBy?: string;
}

export interface UnitsApiFindOneRequest {
	id: string;
}

export interface UnitsApiRemoveRequest {
	id: string;
}

export interface UnitsApiUpdateRequest {
	id: string;
	updateUnitDto: UpdateUnitDto;
}

/**
 * UnitsApi - interface
 *
 * @export
 * @interface UnitsApiInterface
 */
export interface UnitsApiInterface {
	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof UnitsApiInterface
	 */
	createRaw(
		requestParameters: UnitsApiCreateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PartialUnitDto>>;

	/**
	 *
	 *
	 */
	create(
		requestParameters: UnitsApiCreateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PartialUnitDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof UnitsApiInterface
	 */
	findAllRaw(
		requestParameters: UnitsApiFindAllRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedUnitDto>>;

	/**
	 *
	 *
	 */
	findAll(
		requestParameters: UnitsApiFindAllRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedUnitDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof UnitsApiInterface
	 */
	findLeasesRaw(
		requestParameters: UnitsApiFindLeasesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedLeaseDto>>;

	/**
	 *
	 *
	 */
	findLeases(
		requestParameters: UnitsApiFindLeasesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedLeaseDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof UnitsApiInterface
	 */
	findOneRaw(
		requestParameters: UnitsApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<UnitDto>>;

	/**
	 *
	 *
	 */
	findOne(
		requestParameters: UnitsApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<UnitDto>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof UnitsApiInterface
	 */
	removeRaw(
		requestParameters: UnitsApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<string>>;

	/**
	 *
	 *
	 */
	remove(
		requestParameters: UnitsApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<string>;

	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof UnitsApiInterface
	 */
	updateRaw(
		requestParameters: UnitsApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PartialUnitDto>>;

	/**
	 *
	 *
	 */
	update(
		requestParameters: UnitsApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PartialUnitDto>;
}

/**
 *
 */
export class UnitsApi extends runtime.BaseAPI implements UnitsApiInterface {
	/**
	 *
	 *
	 */
	async createRaw(
		requestParameters: UnitsApiCreateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PartialUnitDto>> {
		if (
			requestParameters.createUnitDto === null ||
			requestParameters.createUnitDto === undefined
		) {
			throw new runtime.RequiredError(
				'createUnitDto',
				'Required parameter requestParameters.createUnitDto was null or undefined when calling create.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/units`,
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.createUnitDto,
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
		requestParameters: UnitsApiCreateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PartialUnitDto> {
		const response = await this.createRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findAllRaw(
		requestParameters: UnitsApiFindAllRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedUnitDto>> {
		const queryParameters: any = {};

		if (requestParameters.page !== undefined) {
			queryParameters['page'] = requestParameters.page;
		}

		if (requestParameters.take !== undefined) {
			queryParameters['take'] = requestParameters.take;
		}

		if (requestParameters.sortOrder !== undefined) {
			queryParameters['sortOrder'] = requestParameters.sortOrder;
		}

		if (requestParameters.filter !== undefined) {
			queryParameters['filter'] = requestParameters.filter;
		}

		if (requestParameters.orderBy !== undefined) {
			queryParameters['orderBy'] = requestParameters.orderBy;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/units`,
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
		requestParameters: UnitsApiFindAllRequest = {},
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedUnitDto> {
		const response = await this.findAllRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findLeasesRaw(
		requestParameters: UnitsApiFindLeasesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PaginatedLeaseDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling findLeases.',
			);
		}

		const queryParameters: any = {};

		if (requestParameters.page !== undefined) {
			queryParameters['page'] = requestParameters.page;
		}

		if (requestParameters.take !== undefined) {
			queryParameters['take'] = requestParameters.take;
		}

		if (requestParameters.sortOrder !== undefined) {
			queryParameters['sortOrder'] = requestParameters.sortOrder;
		}

		if (requestParameters.filter !== undefined) {
			queryParameters['filter'] = requestParameters.filter;
		}

		if (requestParameters.orderBy !== undefined) {
			queryParameters['orderBy'] = requestParameters.orderBy;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/units/{id}/leases`.replace(
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
	async findLeases(
		requestParameters: UnitsApiFindLeasesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedLeaseDto> {
		const response = await this.findLeasesRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findOneRaw(
		requestParameters: UnitsApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<UnitDto>> {
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
				path: `/units/{id}`.replace(
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
		requestParameters: UnitsApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<UnitDto> {
		const response = await this.findOneRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async removeRaw(
		requestParameters: UnitsApiRemoveRequest,
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

		const response = await this.request(
			{
				path: `/units/{id}`.replace(
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
		requestParameters: UnitsApiRemoveRequest,
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
		requestParameters: UnitsApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PartialUnitDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling update.',
			);
		}

		if (
			requestParameters.updateUnitDto === null ||
			requestParameters.updateUnitDto === undefined
		) {
			throw new runtime.RequiredError(
				'updateUnitDto',
				'Required parameter requestParameters.updateUnitDto was null or undefined when calling update.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/units/{id}`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'PATCH',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.updateUnitDto,
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
		requestParameters: UnitsApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PartialUnitDto> {
		const response = await this.updateRaw(requestParameters, initOverrides);
		return await response.value();
	}
}
