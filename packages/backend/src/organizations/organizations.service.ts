import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { generateExpenseCategoryTree } from 'src/constants/default-expense-categories';
import { AuthenticatedUser } from 'src/interfaces/user.interface';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from 'src/organizations/dto/organization.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(OrganizationsService.name);

  async create({
    createOrganizationDto,
    user,
  }: {
    createOrganizationDto: CreateOrganizationDto;
    user: AuthenticatedUser;
  }) {
    this.logger.debug(
      `${user.email} creating organization ${createOrganizationDto.fullName}`,
    );

    const organization = await this.prisma.organization.create({
      data: {
        fullName: createOrganizationDto.fullName,
        label: createOrganizationDto.label,
        roles: {
          create: [
            {
              roleType: 'ORGADMIN',
              isAccepted: true,
              user: {
                connectOrCreate: {
                  where: { email: user.email },
                  create: { email: user.email },
                },
              },
            },
          ],
        },
        organizationSettings: {
          create: {
            expenseCategoryTree:
              generateExpenseCategoryTree() as unknown as Prisma.JsonArray,
          },
        },
      },
      include: { roles: true }, // used to redirect user to switch roles in frontend
    });

    return { organization, roleId: organization.roles[0].id };
  }

  async findOne({ id }: { id: string }) {
    const data = await this.prisma.organization.findUnique({ where: { id } });
    return data;
  }

  async update({
    id,
    updateOrganizationDto,
  }: {
    id: string;
    updateOrganizationDto: UpdateOrganizationDto;
  }) {
    const updated = await this.prisma.organization.update({
      where: { id },
      data: {
        fullName: updateOrganizationDto.fullName,
        label: updateOrganizationDto.label,
      },
    });
    return updated.id;
  }

  async remove({ id }: { id: string }) {
    return this.prisma.organization.delete({ where: { id } });
  }
}
