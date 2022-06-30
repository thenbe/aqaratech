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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface UnitVacancyDto
 */
export interface UnitVacancyDto {
    /**
     * 
     * @type {string}
     * @memberof UnitVacancyDto
     */
    readonly id: string;
    /**
     * 
     * @type {Date}
     * @memberof UnitVacancyDto
     */
    readonly createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof UnitVacancyDto
     */
    readonly updatedAt: Date;
    /**
     * 
     * @type {boolean}
     * @memberof UnitVacancyDto
     */
    isVacant: boolean;
    /**
     * 
     * @type {string}
     * @memberof UnitVacancyDto
     */
    vacancyDistance: string | null;
    /**
     * 
     * @type {Date}
     * @memberof UnitVacancyDto
     */
    vacancy: Date | null;
    /**
     * 
     * @type {string}
     * @memberof UnitVacancyDto
     */
    propertyId: string;
    /**
     * 
     * @type {string}
     * @memberof UnitVacancyDto
     */
    unitNumber: string;
    /**
     * 
     * @type {number}
     * @memberof UnitVacancyDto
     */
    floor: number | null;
    /**
     * 
     * @type {number}
     * @memberof UnitVacancyDto
     */
    size: number | null;
    /**
     * 
     * @type {number}
     * @memberof UnitVacancyDto
     */
    bed: number | null;
    /**
     * 
     * @type {number}
     * @memberof UnitVacancyDto
     */
    bath: number | null;
    /**
     * 
     * @type {number}
     * @memberof UnitVacancyDto
     */
    marketRent: number | null;
    /**
     * 
     * @type {string}
     * @memberof UnitVacancyDto
     */
    type: string | null;
    /**
     * 
     * @type {string}
     * @memberof UnitVacancyDto
     */
    usage: string | null;
}

export function UnitVacancyDtoFromJSON(json: any): UnitVacancyDto {
    return UnitVacancyDtoFromJSONTyped(json, false);
}

export function UnitVacancyDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UnitVacancyDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
        'isVacant': json['isVacant'],
        'vacancyDistance': json['vacancyDistance'],
        'vacancy': (json['vacancy'] === null ? null : new Date(json['vacancy'])),
        'propertyId': json['propertyId'],
        'unitNumber': json['unitNumber'],
        'floor': json['floor'],
        'size': json['size'],
        'bed': json['bed'],
        'bath': json['bath'],
        'marketRent': json['marketRent'],
        'type': json['type'],
        'usage': json['usage'],
    };
}

export function UnitVacancyDtoToJSON(value?: UnitVacancyDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'isVacant': value.isVacant,
        'vacancyDistance': value.vacancyDistance,
        'vacancy': (value.vacancy === null ? null : value.vacancy.toISOString()),
        'propertyId': value.propertyId,
        'unitNumber': value.unitNumber,
        'floor': value.floor,
        'size': value.size,
        'bed': value.bed,
        'bath': value.bath,
        'marketRent': value.marketRent,
        'type': value.type,
        'usage': value.usage,
    };
}

