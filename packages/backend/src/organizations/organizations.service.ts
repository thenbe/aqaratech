import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { generateExpenseCategoryTree } from 'src/constants/default-expense-categories';
import { AuthenticatedUser } from 'src/interfaces/user.interface';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from 'src/organizations/dto/organization.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService, private s3: S3Service) {}

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
    // TODO set org.isActive to false, delete all portfolios and tenants, which should cascade down
    await this.prisma.role.deleteMany({ where: { organizationId: id } });
    const deactivated = await this.prisma.organization.update({
      where: { id },
      data: { isActive: false },
    });
    return deactivated.id;
  }

  // ### FILES ###

  async uploadFile({ file }: { file: Express.Multer.File }) {
    console.log(file); // TODO remove

    await this.s3.putObject({
      Key: file.filename,
      Body: file.buffer,
    });

    // TODO only return necessary fields
    await this.s3.listObjects();
  }

  async findFiles() {
    // TODO only return necessary fields
    return await this.s3.listObjects();
  }
}
