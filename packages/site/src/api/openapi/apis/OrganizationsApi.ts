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
	CreateExpenseDto,
	CreateLeaseDto,
	CreateLeaseInvoiceDto,
	CreateManyLeaseInvoicesDto,
	CreateOrganizationDto,
	CreatePayoutDto,
	CreatePortfolioDto,
	CreatePropertyDto,
	CreateTenantDto,
	CreateUnitDto,
	CreatedDto,
	OrganizationCreatedDto,
	OrganizationDto,
	PaginatedLeaseInvoiceDto,
	PaginatedRoleDto,
	PartialExpenseDto,
	PartialLeaseDto,
	PartialLeaseInvoiceDto,
	PartialUnitDto,
	PortfolioDto,
	SearchDto,
	TenantDto,
	UpdateOrganizationDto,
} from '../models';

export interface OrganizationsApiCreateRequest {
	createOrganizationDto: CreateOrganizationDto;
}

export interface OrganizationsApiCreateExpenseRequest {
	organizationId: string;
	createExpenseDto: CreateExpenseDto;
}

export interface OrganizationsApiCreateInvoicesRequest {
	organizationId: string;
	id: string;
	createManyLeaseInvoicesDto: Array<CreateManyLeaseInvoicesDto>;
}

export interface OrganizationsApiCreateLeaseRequest {
	organizationId: string;
	createLeaseDto: CreateLeaseDto;
}

export interface OrganizationsApiCreateLeaseInvoiceRequest {
	organizationId: string;
	createLeaseInvoiceDto: CreateLeaseInvoiceDto;
}

export interface OrganizationsApiCreatePayoutRequest {
	organizationId: string;
	createPayoutDto: CreatePayoutDto;
}

export interface OrganizationsApiCreatePortfolioRequest {
	organizationId: string;
	createPortfolioDto: CreatePortfolioDto;
}

export interface OrganizationsApiCreatePropertyRequest {
	organizationId: string;
	createPropertyDto: CreatePropertyDto;
}

export interface OrganizationsApiCreateTenantRequest {
	organizationId: string;
	createTenantDto: CreateTenantDto;
}

export interface OrganizationsApiCreateUnitRequest {
	organizationId: string;
	createUnitDto: CreateUnitDto;
}

export interface OrganizationsApiFindAllLeaseInvoicesRequest {
	id: string;
	page?: number | undefined;
	skip?: number | undefined;
	take?: number | undefined;
	sort?: Array<string> | undefined;
	filter?: object | undefined;
	filterCustom?: object | undefined;
}

export interface OrganizationsApiFindOneRequest {
	id: string;
}

export interface OrganizationsApiFindRolesRequest {
	id: string;
	page?: number | undefined;
	skip?: number | undefined;
	take?: number | undefined;
	sort?: Array<string> | undefined;
	filter?: object | undefined;
	filterCustom?: object | undefined;
}

export interface OrganizationsApiRemoveRequest {
	id: string;
}

export interface OrganizationsApiSearchRequest {
	organizationId: string;
	query: string;
}

export interface OrganizationsApiSendInvoiceEmailRequest {
	id: string;
	organizationId: string;
}

export interface OrganizationsApiStatusRefreshRequest {
	id: string;
}

export interface OrganizationsApiUpdateRequest {
	id: string;
	updateOrganizationDto: UpdateOrganizationDto;
}

/**
 *
 */
export class OrganizationsApi extends runtime.BaseAPI {
	/**
	 *
	 *
	 */
	async createRaw(
		requestParameters: OrganizationsApiCreateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<OrganizationCreatedDto>> {
		if (
			requestParameters.createOrganizationDto === null ||
			requestParameters.createOrganizationDto === undefined
		) {
			throw new runtime.RequiredError(
				'createOrganizationDto',
				'Required parameter requestParameters.createOrganizationDto was null or undefined when calling create.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/organizations`,
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.createOrganizationDto,
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
		requestParameters: OrganizationsApiCreateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<OrganizationCreatedDto> {
		const response = await this.createRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async createExpenseRaw(
		requestParameters: OrganizationsApiCreateExpenseRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PartialExpenseDto>> {
		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling createExpense.',
			);
		}

		if (
			requestParameters.createExpenseDto === null ||
			requestParameters.createExpenseDto === undefined
		) {
			throw new runtime.RequiredError(
				'createExpenseDto',
				'Required parameter requestParameters.createExpenseDto was null or undefined when calling createExpense.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/expenses`.replace(
					`{${'organizationId'}}`,
					encodeURIComponent(String(requestParameters.organizationId)),
				),
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
	async createExpense(
		requestParameters: OrganizationsApiCreateExpenseRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PartialExpenseDto> {
		const response = await this.createExpenseRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async createInvoicesRaw(
		requestParameters: OrganizationsApiCreateInvoicesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<string>> {
		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling createInvoices.',
			);
		}

		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling createInvoices.',
			);
		}

		if (
			requestParameters.createManyLeaseInvoicesDto === null ||
			requestParameters.createManyLeaseInvoicesDto === undefined
		) {
			throw new runtime.RequiredError(
				'createManyLeaseInvoicesDto',
				'Required parameter requestParameters.createManyLeaseInvoicesDto was null or undefined when calling createInvoices.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/lease/{id}/leaseInvoices`
					.replace(
						`{${'organizationId'}}`,
						encodeURIComponent(String(requestParameters.organizationId)),
					)
					.replace(
						`{${'id'}}`,
						encodeURIComponent(String(requestParameters.id)),
					),
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.createManyLeaseInvoicesDto,
			},
			initOverrides,
		);

		return new runtime.TextApiResponse(response) as any;
	}

	/**
	 *
	 *
	 */
	async createInvoices(
		requestParameters: OrganizationsApiCreateInvoicesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<string> {
		const response = await this.createInvoicesRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async createLeaseRaw(
		requestParameters: OrganizationsApiCreateLeaseRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PartialLeaseDto>> {
		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling createLease.',
			);
		}

		if (
			requestParameters.createLeaseDto === null ||
			requestParameters.createLeaseDto === undefined
		) {
			throw new runtime.RequiredError(
				'createLeaseDto',
				'Required parameter requestParameters.createLeaseDto was null or undefined when calling createLease.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/leases`.replace(
					`{${'organizationId'}}`,
					encodeURIComponent(String(requestParameters.organizationId)),
				),
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.createLeaseDto,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async createLease(
		requestParameters: OrganizationsApiCreateLeaseRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PartialLeaseDto> {
		const response = await this.createLeaseRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async createLeaseInvoiceRaw(
		requestParameters: OrganizationsApiCreateLeaseInvoiceRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PartialLeaseInvoiceDto>> {
		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling createLeaseInvoice.',
			);
		}

		if (
			requestParameters.createLeaseInvoiceDto === null ||
			requestParameters.createLeaseInvoiceDto === undefined
		) {
			throw new runtime.RequiredError(
				'createLeaseInvoiceDto',
				'Required parameter requestParameters.createLeaseInvoiceDto was null or undefined when calling createLeaseInvoice.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/leaseInvoices`.replace(
					`{${'organizationId'}}`,
					encodeURIComponent(String(requestParameters.organizationId)),
				),
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.createLeaseInvoiceDto,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async createLeaseInvoice(
		requestParameters: OrganizationsApiCreateLeaseInvoiceRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PartialLeaseInvoiceDto> {
		const response = await this.createLeaseInvoiceRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async createPayoutRaw(
		requestParameters: OrganizationsApiCreatePayoutRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<CreatedDto>> {
		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling createPayout.',
			);
		}

		if (
			requestParameters.createPayoutDto === null ||
			requestParameters.createPayoutDto === undefined
		) {
			throw new runtime.RequiredError(
				'createPayoutDto',
				'Required parameter requestParameters.createPayoutDto was null or undefined when calling createPayout.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/payouts`.replace(
					`{${'organizationId'}}`,
					encodeURIComponent(String(requestParameters.organizationId)),
				),
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.createPayoutDto,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async createPayout(
		requestParameters: OrganizationsApiCreatePayoutRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<CreatedDto> {
		const response = await this.createPayoutRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async createPortfolioRaw(
		requestParameters: OrganizationsApiCreatePortfolioRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PortfolioDto>> {
		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling createPortfolio.',
			);
		}

		if (
			requestParameters.createPortfolioDto === null ||
			requestParameters.createPortfolioDto === undefined
		) {
			throw new runtime.RequiredError(
				'createPortfolioDto',
				'Required parameter requestParameters.createPortfolioDto was null or undefined when calling createPortfolio.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/portfolios`.replace(
					`{${'organizationId'}}`,
					encodeURIComponent(String(requestParameters.organizationId)),
				),
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.createPortfolioDto,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async createPortfolio(
		requestParameters: OrganizationsApiCreatePortfolioRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PortfolioDto> {
		const response = await this.createPortfolioRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async createPropertyRaw(
		requestParameters: OrganizationsApiCreatePropertyRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<CreatedDto>> {
		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling createProperty.',
			);
		}

		if (
			requestParameters.createPropertyDto === null ||
			requestParameters.createPropertyDto === undefined
		) {
			throw new runtime.RequiredError(
				'createPropertyDto',
				'Required parameter requestParameters.createPropertyDto was null or undefined when calling createProperty.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/properties`.replace(
					`{${'organizationId'}}`,
					encodeURIComponent(String(requestParameters.organizationId)),
				),
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.createPropertyDto,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async createProperty(
		requestParameters: OrganizationsApiCreatePropertyRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<CreatedDto> {
		const response = await this.createPropertyRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async createTenantRaw(
		requestParameters: OrganizationsApiCreateTenantRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<TenantDto>> {
		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling createTenant.',
			);
		}

		if (
			requestParameters.createTenantDto === null ||
			requestParameters.createTenantDto === undefined
		) {
			throw new runtime.RequiredError(
				'createTenantDto',
				'Required parameter requestParameters.createTenantDto was null or undefined when calling createTenant.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/tenants`.replace(
					`{${'organizationId'}}`,
					encodeURIComponent(String(requestParameters.organizationId)),
				),
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.createTenantDto,
			},
			initOverrides,
		);

		return new runtime.JSONApiResponse(response);
	}

	/**
	 *
	 *
	 */
	async createTenant(
		requestParameters: OrganizationsApiCreateTenantRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<TenantDto> {
		const response = await this.createTenantRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async createUnitRaw(
		requestParameters: OrganizationsApiCreateUnitRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<PartialUnitDto>> {
		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling createUnit.',
			);
		}

		if (
			requestParameters.createUnitDto === null ||
			requestParameters.createUnitDto === undefined
		) {
			throw new runtime.RequiredError(
				'createUnitDto',
				'Required parameter requestParameters.createUnitDto was null or undefined when calling createUnit.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/units`.replace(
					`{${'organizationId'}}`,
					encodeURIComponent(String(requestParameters.organizationId)),
				),
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
	async createUnit(
		requestParameters: OrganizationsApiCreateUnitRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PartialUnitDto> {
		const response = await this.createUnitRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findAllLeaseInvoicesRaw(
		requestParameters: OrganizationsApiFindAllLeaseInvoicesRequest,
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

		if (requestParameters.filterCustom !== undefined) {
			queryParameters['filterCustom'] = requestParameters.filterCustom;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/organizations/{id}/leaseInvoices`.replace(
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
		requestParameters: OrganizationsApiFindAllLeaseInvoicesRequest,
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
		requestParameters: OrganizationsApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<OrganizationDto>> {
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
				path: `/organizations/{id}`.replace(
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
		requestParameters: OrganizationsApiFindOneRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<OrganizationDto> {
		const response = await this.findOneRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async findRolesRaw(
		requestParameters: OrganizationsApiFindRolesRequest,
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

		if (requestParameters.filterCustom !== undefined) {
			queryParameters['filterCustom'] = requestParameters.filterCustom;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/organizations/{id}/roles`.replace(
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
		requestParameters: OrganizationsApiFindRolesRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<PaginatedRoleDto> {
		const response = await this.findRolesRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async removeRaw(
		requestParameters: OrganizationsApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<OrganizationDto>> {
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
				path: `/organizations/{id}`.replace(
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
		requestParameters: OrganizationsApiRemoveRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<OrganizationDto> {
		const response = await this.removeRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async searchRaw(
		requestParameters: OrganizationsApiSearchRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<SearchDto>> {
		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling search.',
			);
		}

		if (
			requestParameters.query === null ||
			requestParameters.query === undefined
		) {
			throw new runtime.RequiredError(
				'query',
				'Required parameter requestParameters.query was null or undefined when calling search.',
			);
		}

		const queryParameters: any = {};

		if (requestParameters.query !== undefined) {
			queryParameters['query'] = requestParameters.query;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/search`.replace(
					`{${'organizationId'}}`,
					encodeURIComponent(String(requestParameters.organizationId)),
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
	async search(
		requestParameters: OrganizationsApiSearchRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<SearchDto> {
		const response = await this.searchRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 *
	 *
	 */
	async sendInvoiceEmailRaw(
		requestParameters: OrganizationsApiSendInvoiceEmailRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<Array<string>>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling sendInvoiceEmail.',
			);
		}

		if (
			requestParameters.organizationId === null ||
			requestParameters.organizationId === undefined
		) {
			throw new runtime.RequiredError(
				'organizationId',
				'Required parameter requestParameters.organizationId was null or undefined when calling sendInvoiceEmail.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/organizations/{organizationId}/leaseInvoices/{id}/send-invoice-email`
					.replace(
						`{${'id'}}`,
						encodeURIComponent(String(requestParameters.id)),
					)
					.replace(
						`{${'organizationId'}}`,
						encodeURIComponent(String(requestParameters.organizationId)),
					),
				method: 'POST',
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
	async sendInvoiceEmail(
		requestParameters: OrganizationsApiSendInvoiceEmailRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<Array<string>> {
		const response = await this.sendInvoiceEmailRaw(
			requestParameters,
			initOverrides,
		);
		return await response.value();
	}

	/**
	 * Trigger a refresh of the subscription status of an organization.
	 *
	 */
	async statusRefreshRaw(
		requestParameters: OrganizationsApiStatusRefreshRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<void>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling statusRefresh.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		const response = await this.request(
			{
				path: `/organizations/{id}/status-refresh`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
			},
			initOverrides,
		);

		return new runtime.VoidApiResponse(response);
	}

	/**
	 * Trigger a refresh of the subscription status of an organization.
	 *
	 */
	async statusRefresh(
		requestParameters: OrganizationsApiStatusRefreshRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<void> {
		await this.statusRefreshRaw(requestParameters, initOverrides);
	}

	/**
	 *
	 *
	 */
	async updateRaw(
		requestParameters: OrganizationsApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<runtime.ApiResponse<OrganizationDto>> {
		if (requestParameters.id === null || requestParameters.id === undefined) {
			throw new runtime.RequiredError(
				'id',
				'Required parameter requestParameters.id was null or undefined when calling update.',
			);
		}

		if (
			requestParameters.updateOrganizationDto === null ||
			requestParameters.updateOrganizationDto === undefined
		) {
			throw new runtime.RequiredError(
				'updateOrganizationDto',
				'Required parameter requestParameters.updateOrganizationDto was null or undefined when calling update.',
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		const response = await this.request(
			{
				path: `/organizations/{id}`.replace(
					`{${'id'}}`,
					encodeURIComponent(String(requestParameters.id)),
				),
				method: 'PATCH',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.updateOrganizationDto,
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
		requestParameters: OrganizationsApiUpdateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction,
	): Promise<OrganizationDto> {
		const response = await this.updateRaw(requestParameters, initOverrides);
		return await response.value();
	}
}
