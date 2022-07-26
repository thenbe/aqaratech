import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { defaultExpenseCategoryTree } from 'src/constants/default-expense-categories';
import { IUser } from 'src/interfaces/user.interface';
import { CreateOrganizationDto } from 'src/organizations/dto/organization.dto';
import { UpdateOrganizationSettingsDto } from 'src/organizations/dto/organizationSettings.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  create({
    createOrganizationDto,
    user,
  }: {
    createOrganizationDto: CreateOrganizationDto;
    user: IUser;
  }) {
    return this.prisma.organization.create({
      data: {
        fullName: createOrganizationDto.fullName,
        label: createOrganizationDto.label,
        roles: {
          create: [
            {
              roleType: 'ORGADMIN',
              isAccepted: true,
              user: { connect: { email: user.email } },
            },
          ],
        },
        organizationSettings: {
          create: {
            expenseCategoryTree:
              defaultExpenseCategoryTree as unknown as Prisma.JsonArray,
          },
        },
      },
    });
  }

  async findOne({ id }: { id: string }) {
    const data = await this.prisma.organization.findUnique({ where: { id } });
    return data;
  }

  async remove({ id }: { id: string }) {
    return this.prisma.organization.delete({ where: { id } });
  }

  // ### SETTINGS ###
  async findSettings({ organizationId }: { organizationId: string }) {
    return this.prisma.organizationSettings.findUnique({
      where: { id: organizationId },
    });
  }

  async updateSettings({
    organizationId,
    updateOrganizationSettingsDto,
  }: {
    organizationId: string;
    updateOrganizationSettingsDto: UpdateOrganizationSettingsDto;
  }) {
    return this.prisma.organizationSettings.update({
      where: { organizationId },
      data: {
        // @ts-ignore
        expenseCategoryTree: updateOrganizationSettingsDto.expenseCategoryTree,
      },
    });
  }
}
