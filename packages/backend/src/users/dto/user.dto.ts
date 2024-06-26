import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

import {
	UserCreateSchema,
	UserSchema,
	UserUpdateSchema,
	ValidatedUserSchema,
} from '@self/utils';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { RoleDto } from 'src/roles/dto/role.dto';
import { Exactly } from 'src/types/exactly.type';

export class UserDto
	extends AbstractDto
	implements Exactly<UserSchema & AbstractDto, UserDto>
{
	email: string;
	fullName: string | null;
	phone: string | null;
	isPhoneVerified: boolean;
}

export class CreateUserDto implements Exactly<UserCreateSchema, CreateUserDto> {
	email: string;
	fullName?: string | null;
}

export class UpdateUserDto
	extends OmitType(CreateUserDto, ['email'])
	implements Exactly<UserUpdateSchema, UpdateUserDto> {}

/**
 * Attach helpful info to the userDto for simpler consumption.
 */
export class ValidatedUserDto
	extends PickType(UserDto, [
		'id',
		'email',
		'fullName',
		'phone',
		'isPhoneVerified',
	] as const)
	implements Exactly<ValidatedUserSchema, ValidatedUserDto>
{
	@ApiProperty({
		type: 'array',
		items: {
			title: 'ValidatedRoleDto',
			allOf: [
				{ $ref: '#/components/schemas/RoleDto' },
				{
					type: 'object',
					required: ['organization'],
					properties: {
						organization: {
							type: 'object',
							required: ['id', 'fullName', 'title'],
							properties: {
								id: { type: 'string' },
								fullName: { type: 'string' },
								title: { type: 'string' },
								isActive: { type: 'boolean' },
							},
						},
						portfolio: {
							type: 'object',
							required: ['title'],
							properties: {
								title: { type: 'string' },
							},
						},
						tenant: {
							type: 'object',
							required: ['title'],
							properties: {
								title: { type: 'string' },
							},
						},
					},
				},
			],
		},
	})
	roles: (RoleDto & {
		organization: {
			id: string;
			fullName: string;
			title: string;
			isActive: boolean;
		};
	})[];
}
