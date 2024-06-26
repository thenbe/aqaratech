import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { TAppAbility } from 'src/casl/abilities/ability-types';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class UsersService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly caslAbilityFactory: CaslAbilityFactory,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
	) {}

	private readonly logger = new Logger(UsersService.name);

	async create({ createUserDto }: { createUserDto: CreateUserDto }) {
		return await this.prisma.c.user.create({ data: createUserDto });
	}

	async findOneByEmail(email: string) {
		let user = await this.prisma.c.user.findUnique({
			where: { email },
			include: {
				roles: {
					include: {
						organization: {
							select: {
								id: true,
								fullName: true,
								label: true,
								title: true,
								isActive: true,
							},
						},
						portfolio: {
							select: {
								title: true,
							},
						},
						tenant: {
							select: {
								title: true,
							},
						},
					},
				},
			},
		});

		if (!user) {
			// If user does not exist, create it. New users who have just signed up
			// will only in exist in Auth0, not in our database.
			this.logger.log(
				`User with email: ${email} does not yet exist in our db. Creating...`,
			);

			user = await this.prisma.c.user.create({
				data: {
					email,
				},
				include: {
					roles: {
						include: {
							organization: {
								select: {
									id: true,
									fullName: true,
									label: true,
									title: true,
									isActive: true,
								},
							},
							portfolio: {
								select: {
									title: true,
								},
							},
							tenant: {
								select: {
									title: true,
								},
							},
						},
					},
				},
			});
		}

		const result = {
			...user,
			roles: user.roles.map((role) => ({
				...role,
				email, // needed?
				organization: {
					id: role.organization.id,
					fullName: role.organization.fullName,
					title: role.organization.title,
					isActive: role.organization.isActive,
				},
			})),
		};

		return result;
	}

	async getAbility(email: string, roleId: string) {
		const cacheKey = `${email}:${roleId}:ability`;

		const cached = await this.cacheManager.get<TAppAbility>(cacheKey);

		if (cached) {
			return cached;
		} else {
			// define fresh ability
			const ability = await this.caslAbilityFactory.defineAbility({
				email,
				roleId,
			});

			// cache it
			await this.cacheManager.set(cacheKey, ability, 300000); // 5 min

			return ability;
		}
	}
}
