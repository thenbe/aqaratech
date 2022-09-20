/* tslint:disable */
/* eslint-disable */
/**
 * Aqaratech API
 * The Aqratech API description
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
  PaginatedFileDto,
} from '../models';

export interface FilesApiCreateRequest {
    xRoleId?: string;
    organizationId?: string;
    relationKey?: CreateRelationKeyEnum;
    relationValue?: string;
    fileName?: string;
    label?: string | null;
    file?: Blob;
}

export interface FilesApiFindAllRequest {
    relationKey: FindAllRelationKeyEnum;
    relationValue: string;
    xRoleId?: string;
}

export interface FilesApiFindOneRequest {
    key: string;
    xRoleId?: string;
}

export interface FilesApiRemoveRequest {
    key: string;
    xRoleId?: string;
}

/**
 * FilesApi - interface
 * 
 * @export
 * @interface FilesApiInterface
 */
export interface FilesApiInterface {
    /**
     * 
     * @summary 
     * @param {string} [xRoleId] 
     * @param {string} [organizationId] 
     * @param {string} [relationKey] 
     * @param {string} [relationValue] 
     * @param {string} [fileName] 
     * @param {string} [label] 
     * @param {Blob} [file] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FilesApiInterface
     */
    createRaw(requestParameters: FilesApiCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;

    /**
     * 
     * 
     */
    create(requestParameters: FilesApiCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;

    /**
     * 
     * @summary 
     * @param {'tenant' | 'portfolio' | 'property' | 'unit' | 'expense' | 'lease' | 'leaseInvoice' | 'maintenanceOrder'} relationKey 
     * @param {string} relationValue 
     * @param {string} [xRoleId] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FilesApiInterface
     */
    findAllRaw(requestParameters: FilesApiFindAllRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedFileDto>>;

    /**
     * 
     * 
     */
    findAll(requestParameters: FilesApiFindAllRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedFileDto>;

    /**
     * 
     * @summary 
     * @param {string} key 
     * @param {string} [xRoleId] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FilesApiInterface
     */
    findOneRaw(requestParameters: FilesApiFindOneRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;

    /**
     * 
     * 
     */
    findOne(requestParameters: FilesApiFindOneRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;

    /**
     * 
     * @summary 
     * @param {string} key 
     * @param {string} [xRoleId] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FilesApiInterface
     */
    removeRaw(requestParameters: FilesApiRemoveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>>;

    /**
     * 
     * 
     */
    remove(requestParameters: FilesApiRemoveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string>;

}

/**
 * 
 */
export class FilesApi extends runtime.BaseAPI implements FilesApiInterface {

    /**
     * 
     * 
     */
    async createRaw(requestParameters: FilesApiCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xRoleId !== undefined && requestParameters.xRoleId !== null) {
            headerParameters['x-role-id'] = String(requestParameters.xRoleId);
        }

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth-swagger", []);
        }

        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.organizationId !== undefined) {
            formParams.append('organizationId', requestParameters.organizationId as any);
        }

        if (requestParameters.relationKey !== undefined) {
            formParams.append('relationKey', requestParameters.relationKey as any);
        }

        if (requestParameters.relationValue !== undefined) {
            formParams.append('relationValue', requestParameters.relationValue as any);
        }

        if (requestParameters.fileName !== undefined) {
            formParams.append('fileName', requestParameters.fileName as any);
        }

        if (requestParameters.label !== undefined) {
            formParams.append('label', requestParameters.label as any);
        }

        if (requestParameters.file !== undefined) {
            formParams.append('file', requestParameters.file as any);
        }

        const response = await this.request({
            path: `/files`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * 
     * 
     */
    async create(requestParameters: FilesApiCreateRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.createRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 
     * 
     */
    async findAllRaw(requestParameters: FilesApiFindAllRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedFileDto>> {
        if (requestParameters.relationKey === null || requestParameters.relationKey === undefined) {
            throw new runtime.RequiredError('relationKey','Required parameter requestParameters.relationKey was null or undefined when calling findAll.');
        }

        if (requestParameters.relationValue === null || requestParameters.relationValue === undefined) {
            throw new runtime.RequiredError('relationValue','Required parameter requestParameters.relationValue was null or undefined when calling findAll.');
        }

        const queryParameters: any = {};

        if (requestParameters.relationKey !== undefined) {
            queryParameters['relationKey'] = requestParameters.relationKey;
        }

        if (requestParameters.relationValue !== undefined) {
            queryParameters['relationValue'] = requestParameters.relationValue;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xRoleId !== undefined && requestParameters.xRoleId !== null) {
            headerParameters['x-role-id'] = String(requestParameters.xRoleId);
        }

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth-swagger", []);
        }

        const response = await this.request({
            path: `/files`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * 
     * 
     */
    async findAll(requestParameters: FilesApiFindAllRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedFileDto> {
        const response = await this.findAllRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 
     * 
     */
    async findOneRaw(requestParameters: FilesApiFindOneRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.key === null || requestParameters.key === undefined) {
            throw new runtime.RequiredError('key','Required parameter requestParameters.key was null or undefined when calling findOne.');
        }

        const queryParameters: any = {};

        if (requestParameters.key !== undefined) {
            queryParameters['key'] = requestParameters.key;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xRoleId !== undefined && requestParameters.xRoleId !== null) {
            headerParameters['x-role-id'] = String(requestParameters.xRoleId);
        }

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth-swagger", []);
        }

        const response = await this.request({
            path: `/files/find-one`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * 
     * 
     */
    async findOne(requestParameters: FilesApiFindOneRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.findOneRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 
     * 
     */
    async removeRaw(requestParameters: FilesApiRemoveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.key === null || requestParameters.key === undefined) {
            throw new runtime.RequiredError('key','Required parameter requestParameters.key was null or undefined when calling remove.');
        }

        const queryParameters: any = {};

        if (requestParameters.key !== undefined) {
            queryParameters['key'] = requestParameters.key;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xRoleId !== undefined && requestParameters.xRoleId !== null) {
            headerParameters['x-role-id'] = String(requestParameters.xRoleId);
        }

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth-swagger", []);
        }

        const response = await this.request({
            path: `/files`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * 
     * 
     */
    async remove(requestParameters: FilesApiRemoveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.removeRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const CreateRelationKeyEnum = {
    Tenant: 'tenant',
    Portfolio: 'portfolio',
    Property: 'property',
    Unit: 'unit',
    Expense: 'expense',
    Lease: 'lease',
    LeaseInvoice: 'leaseInvoice',
    MaintenanceOrder: 'maintenanceOrder'
} as const;
export type CreateRelationKeyEnum = typeof CreateRelationKeyEnum[keyof typeof CreateRelationKeyEnum];
/**
 * @export
 */
export const FindAllRelationKeyEnum = {
    Tenant: 'tenant',
    Portfolio: 'portfolio',
    Property: 'property',
    Unit: 'unit',
    Expense: 'expense',
    Lease: 'lease',
    LeaseInvoice: 'leaseInvoice',
    MaintenanceOrder: 'maintenanceOrder'
} as const;
export type FindAllRelationKeyEnum = typeof FindAllRelationKeyEnum[keyof typeof FindAllRelationKeyEnum];
