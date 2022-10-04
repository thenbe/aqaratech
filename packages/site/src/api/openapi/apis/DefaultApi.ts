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
 * DefaultApi - interface
 *
 * @export
 * @interface DefaultApiInterface
 */
export interface DefaultApiInterface {
	/**
	 *
	 * @summary
	 * @throws {RequiredError}
	 * @memberof DefaultApiInterface
	 */
	getHelloRaw(
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<string>>;

	/**
	 *
	 *
	 */
	getHello(
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<string>;
}

/**
 *
 */
export class DefaultApi extends runtime.BaseAPI implements DefaultApiInterface {
	/**
	 *
	 *
	 */
	async getHelloRaw(
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<string>> {
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
				path: `/health`,
				method: 'GET',
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
	async getHello(
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<string> {
		const response = await this.getHelloRaw(initOverrides);
		return await response.value();
	}
}
