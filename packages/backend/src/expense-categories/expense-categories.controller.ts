import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/casl-ability.factory';
import { ROLE_HEADER } from 'src/constants/header-role';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import {
  CreateExpenseCategoryDto,
  ExpenseCategoryDto,
  UpdateExpenseCategoryDto,
} from 'src/expense-categories/expense-category.dto';
import { IUser } from 'src/interfaces/user.interface';
import {
  OrganizationSettingsDto,
  UpdateOrganizationSettingsDto,
} from 'src/organizations/dto/organizationSettings.dto';
import { ExpenseCategoriesService } from './expense-categories.service';

@ApiHeader({ name: ROLE_HEADER })
@Controller('expense-categories')
@ApiTags('expense-categories')
@SwaggerAuth()
export class ExpenseCategoriesController {
  constructor(
    private readonly expenseCategoriesService: ExpenseCategoriesService,
  ) {}

  @Post()
  @CheckAbilities({ action: Action.Update, subject: 'Organization' })
  @ApiCreatedResponse({ type: String })
  create(
    @User() user: IUser,
    @Body() createExpenseCategoryDto: CreateExpenseCategoryDto,
  ): Promise<string> {
    return this.expenseCategoriesService.create({
      organizationId: user.role.organizationId,
      createExpenseCategoryDto,
    });
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'Organization' }) // TODO: expensetree field should be accessible by portfolio users
  @ApiOkResponse({ type: ExpenseCategoryDto, isArray: true })
  findAll(@User() user: IUser): Promise<ExpenseCategoryDto[]> {
    return this.expenseCategoriesService.findAll({
      organizationId: user.role.organizationId,
    });
  }

  @Patch()
  @CheckAbilities({ action: Action.Update, subject: 'Organization' })
  @ApiOkResponse({ type: OrganizationSettingsDto })
  updateAll(
    @User() user: IUser,
    @Body() updateOrganizationSettingsDto: UpdateOrganizationSettingsDto,
  ): Promise<OrganizationSettingsDto> {
    // @ts-ignore
    return this.expenseCategoriesService.updateAll({
      organizationId: user.role.organizationId,
      updateOrganizationSettingsDto,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseCategoriesService.findOne(+id);
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: 'Organization' })
  @ApiOkResponse({ type: String })
  update(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto,
  ): Promise<string> {
    return this.expenseCategoriesService.update({
      organizationId: user.role.organizationId,
      expenseCategoryId: id,
      updateExpenseCategoryDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseCategoriesService.remove(+id);
  }
}
