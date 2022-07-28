import {
  ApiHideProperty,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Property } from '@prisma/client';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { BreadcrumbsDto } from 'src/common/dto/breadcrumb.dto';
import { Nanoid } from 'src/decorators/field.decorators';

class PropertyRequiredDto {
  @Nanoid()
  portfolioId: string;

  @Length(1, 255)
  area: string | null = null;
}

class PropertyOptionalDto {
  @IsString()
  block: string | null = null;

  @IsString()
  avenue: string | null = null;

  @IsString()
  street: string | null = null;

  @IsString()
  number: string | null = null;

  @IsString()
  parcel: string | null = null;

  @IsString()
  paci: string | null = null;

  @IsNumber()
  cost: number | null = null;

  @IsString()
  label: string | null = null;

  @ApiHideProperty()
  @IsLongitude()
  long: number | null = null;

  @ApiHideProperty()
  @IsLatitude()
  lat: number | null = null;
}

export class PropertyBasicDto extends IntersectionType(
  AbstractDto,
  IntersectionType(PropertyRequiredDto, PropertyOptionalDto),
) {}

export class PropertyDto extends PropertyBasicDto {
  breadcrumbs: PropertyBreadcrumbsDto;
}

export class CreatePropertyDto
  extends IntersectionType(
    PropertyRequiredDto,
    PartialType(PropertyOptionalDto),
  )
  implements Partial<Property> {}

export class UpdatePropertyDto extends PartialType(
  OmitType(CreatePropertyDto, ['portfolioId']),
) {}

export class PropertyBreadcrumbsDto extends PickType(BreadcrumbsDto, [
  'portfolio',
  'property',
]) {}
