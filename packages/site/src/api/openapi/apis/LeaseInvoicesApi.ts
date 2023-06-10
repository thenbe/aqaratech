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
	LeaseInvoiceDto,
	LeaseInvoicePublicDto,
	MessageDto,
	UpdateLeaseInvoiceDto,
	UpdatedDto,
} from '../models';

export interface LeaseInvoicesApiFindMessagesRequest {
	id: string;
}

export interface LeaseInvoicesApiFindOneRequest {
	id: string;
}

export interface LeaseInvoicesApiFindOnePublicRequest {
	id: string;
}

export interface LeaseInvoicesApiMyfatoorahCallbackRequest {
	paymentId: string;
}

export interface LeaseInvoicesApiPayInvoiceRequest {
	id: string;
}

export interface LeaseInvoicesApiRemoveRequest {
	id: string;
}

export interface LeaseInvoicesApiUpdateRequest {
	id: string;
	updateLeaseInvoiceDto: UpdateLeaseInvoiceDto;
}

/**
 *
 */
export class LeaseInvoicesApi extends runtime.BaseAPI {
	/**
	 */
	async findMessagesRaw(
		requestParameters: LeaseInvoicesApiFindMessagesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<Array<MessageDto>>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling findMessages.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/leaseInvoices/{id}/messages`.replace(
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
	 */
	async findMessages(
		requestParameters: LeaseInvoicesApiFindMessagesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<Array<MessageDto>> {
		const response = await this.findMessagesRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 */
	async findOneRaw(
		requestParameters: LeaseInvoicesApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<LeaseInvoiceDto>> {
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
				path: `/leaseInvoices/{id}`.replace(
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
	 */
	async findOne(
		requestParameters: LeaseInvoicesApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<LeaseInvoiceDto> {
		const response = await this.findOneRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 */
	async findOnePublicRaw(
		requestParameters: LeaseInvoicesApiFindOnePublicRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<LeaseInvoicePublicDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling findOnePublic.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/leaseInvoices/{id}/public`.replace(
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
	 */
	async findOnePublic(
		requestParameters: LeaseInvoicesApiFindOnePublicRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<LeaseInvoicePublicDto> {
		const response = await this.findOnePublicRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 */
	async myfatoorahCallbackRaw(
		requestParameters: LeaseInvoicesApiMyfatoorahCallbackRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<void>> {
		if (
			requestParameters.paymentId === null ||
			requestParameters.paymentId === undefined
		) {
			throw new runtime.RequiredError(
				'paymentId',
				'Required parameter requestParameters.paymentId was null or undefined when calling myfatoorahCallback.',
			);
		}

		const queryParameters: any = {};

		if (requestParameters.paymentId !== undefined) {
			queryParameters['paymentId'] = requestParameters.paymentId;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/leaseInvoices/myfatoorah-callback`,
				method: 'GET',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.VoidApiResponse(response);
	}

	/**
	 */
	async myfatoorahCallback(
		requestParameters: LeaseInvoicesApiMyfatoorahCallbackRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<void> {
		await this.myfatoorahCallbackRaw(requestParameters, initOverrides);
	}

	/**
	 */
	async payInvoiceRaw(
		requestParameters: LeaseInvoicesApiPayInvoiceRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<void>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling payInvoice.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/leaseInvoices/{id}/pay`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.VoidApiResponse(response);
	}

	/**
	 */
	async payInvoice(
		requestParameters: LeaseInvoicesApiPayInvoiceRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<void> {
		await this.payInvoiceRaw(requestParameters, initOverrides);
	}

	/**
	 */
	async removeRaw(
		requestParameters: LeaseInvoicesApiRemoveRequest,
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
				path: `/leaseInvoices/{id}`.replace(
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
	 */
	async remove(
		requestParameters: LeaseInvoicesApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<string> {
		const response = await this.removeRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 */
	async updateRaw(
		requestParameters: LeaseInvoicesApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<UpdatedDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling update.',
			);
		}

		if (
			requestParameters.updateLeaseInvoiceDto === null ||
			requestParameters.updateLeaseInvoiceDto === undefined
		) {
			throw new runtime.RequiredError(
				'updateLeaseInvoiceDto',
				'Required parameter requestParameters.updateLeaseInvoiceDto was null or undefined when calling update.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/leaseInvoices/{id}`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'PATCH',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.updateLeaseInvoiceDto,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 */
	async update(
		requestParameters: LeaseInvoicesApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<UpdatedDto> {
		const response = await this.updateRaw(requestParameters, initOverrides);
		return await response.value();
	}
}
