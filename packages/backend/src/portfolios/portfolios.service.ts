import { subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { IUser } from 'src/interfaces/user.interface';
import {
  PortfolioDto,
  UpdatePortfolioDto,
} from 'src/portfolios/dto/portfolio.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { search } from 'src/utils/search';

@Injectable()
export class PortfoliosService {
  constructor(
    private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  create({
    createPortfolioDto,
    user,
  }: {
    createPortfolioDto: PortfolioDto;
    user: IUser;
  }) {
    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Create,
      subject('Portfolio', createPortfolioDto),
    );
    const { organizationId, ...toCreate } = createPortfolioDto;

    // use Prisma's `connect` to enforce referential integrity
    const input: Prisma.PortfolioCreateArgs['data'] = {
      ...toCreate,
      organization: { connect: { id: organizationId } },
    };
    return this.prisma.portfolio.create({ data: input });
  }

  async findAll({
    portfolioPageOptionsDto,
    user,
  }: {
    portfolioPageOptionsDto: PageOptionsDto;
    user: IUser;
  }): Promise<PaginatedMetaDto<PortfolioDto>> {
    const { page, take, q } = portfolioPageOptionsDto;

    const ability = await this.caslAbilityFactory.defineAbility(user);
    // TODO test this
    // https://casl.js.org/v5/en/package/casl-prisma#finding-accessible-records
    let [results, itemCount] = await Promise.all([
      this.prisma.portfolio.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(ability).Portfolio,
      }),
      this.prisma.portfolio.count({
        where: accessibleBy(ability).Portfolio,
      }),
    ]);

    if (q) {
      results = search({
        data: results,
        q,
        keys: ['fullName', 'shortName', 'civilid', 'dob', 'phone', 'email'],
      });
    }

    const meta = new PaginatedDto({
      itemCount,
      pageOptionsDto: portfolioPageOptionsDto,
    });

    return { meta, results };
  }

  async findOne({ id, user }: { id: string; user: IUser }) {
    const ability = await this.caslAbilityFactory.defineAbility(user);
    const data = await this.prisma.portfolio.findFirst({
      where: {
        AND: [accessibleBy(ability).Portfolio, { id }],
      },
    });
    return data;
  }

  async update({
    id,
    updatePortfolioDto,
    user,
  }: {
    id: string;
    updatePortfolioDto: UpdatePortfolioDto;
    user: IUser;
  }) {
    const toUpdate = await this.prisma.portfolio.findUnique({ where: { id } });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Update,
      subject('Portfolio', toUpdate),
    );

    const input: Prisma.PortfolioUpdateArgs['data'] = updatePortfolioDto;
    return this.prisma.portfolio.update({
      where: { id },
      data: input,
    });
  }

  async remove({ id, user }: { id: string; user: IUser }) {
    const data = await this.prisma.portfolio.findUnique({ where: { id } });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Delete,
      subject('Portfolio', data),
    );

    return this.prisma.portfolio.delete({ where: { id } });
  }
}
