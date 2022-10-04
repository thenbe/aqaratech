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

/**
 * SearchApi - interface
 *
 * @export
 * @interface SearchApiInterface
 */
export interface SearchApiInterface {
	/**
	 *
	 * @summary
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof SearchApiInterface
	 */
	reindexAllRaw(
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<void>>;

	/**
	 *
	 *
	 */
	reindexAll(
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<void>;

	/**
	 *
	 * @summary
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof SearchApiInterface
	 */
	removeRaw(
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<Array<object>>>;

	/**
	 *
	 *
	 */
	remove(
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<Array<object>>;
}

/**
 *
 */
export class SearchApi extends runtime.BaseAPI implements SearchApiInterface {
	/**
	 *
	 *
	 */
	async reindexAllRaw(
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<void>> {
		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/search`,
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.VoidApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async reindexAll(
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<void> {
		await this.reindexAllRaw(initOverrides);
	}

	/**
	 *
	 *
	 */
	async removeRaw(
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<Array<object>>> {
		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/search`,
				method: 'DELETE',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse<any>(response);
	}

	/**
	 *
	 *
	 */
	async remove(
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<Array<object>> {
		const response = await this.removeRaw(initOverrides);
		return await response.value();
	}
}
