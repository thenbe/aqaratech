import { AggregateModule } from 'src/aggregate/aggregate.module';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { LeaseInvoicesModule } from 'src/lease-invoices/lease-invoices.module';
import { LeasesModule } from 'src/leases/leases.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { PortfoliosModule } from 'src/portfolios/portfolios.module';
import { PropertiesModule } from 'src/properties/properties.module';
import { RolesModule } from 'src/roles/roles.module';
import { SearchModule } from 'src/search/search.module';
import { TenantsModule } from 'src/tenants/tenants.module';
import { UnitsModule } from 'src/units/units.module';
import { UsersModule } from 'src/users/users.module';
import { AppModule } from './app.module';

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { BreadcrumbDto, BreadcrumbsDto } from 'src/common/dto/breadcrumb.dto';
import { PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { ExpenseCategoriesModule } from 'src/expense-categories/expense-categories.module';
import { FilesModule } from 'src/files/files.module';

export const setupSwagger = async (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Aqaratech API')
    .setDescription('The Aqratech API description')
    .setVersion('1.0')
    .addTag('aqaratech')
    // first server will be the default one in generated sdk
    .addServer('http://localhost:3002')
    // .setBasePath('/api')
    // .addBearerAuth()
    .addSecurityRequirements('oauth-swagger')
    .addOAuth2(
      {
        type: 'oauth2',
        // scheme: 'Bearer',
        flows: {
          authorizationCode: {
            authorizationUrl:
              'https://dev-eehvhdp2.eu.auth0.com/authorize?audience=letand.be/api',
            tokenUrl: 'https://dev-eehvhdp2.eu.auth0.com/oauth/token',
            scopes: {
              'openid profile email': 'default scope',
              openid:
                "to indicate that the application intends to use OIDC to verify the user's identity",
              profile: 'to get name, nickname, and picture',
              email: 'to get email and email_verified',
            },
          },
        },
      },
      'oauth-swagger',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [
      AppModule,
      UsersModule,
      TenantsModule,
      PortfoliosModule,
      PropertiesModule,
      UnitsModule,
      LeasesModule,
      LeaseInvoicesModule,
      ExpensesModule,
      SearchModule,
      RolesModule,
      OrganizationsModule,
      AggregateModule,
      ExpenseCategoriesModule,
      FilesModule,
    ],
    extraModels: [BreadcrumbDto, BreadcrumbsDto, PaginatedMetaDto],
    ignoreGlobalPrefix: true,

    operationIdFactory(controllerKey, methodKey) {
      return methodKey;
    },
  });

  if (process.env.PUBLIC_AQARATECH_ENV !== 'production') {
    const { dump } = await import('js-yaml');
    // For consumption of swagger-ui
    writeFileSync(
      './openapi.yaml',
      dump(document, {
        // schema: 'http://json-schema.org/draft-04/schema#',
      }),
    );

    SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {
        // https://github.com/nestjs/swagger/issues/1828#issuecomment-1084833100
        oauth: {
          clientId: 'z6oqyOuPLao6XhJeCje9tZ8ZbiJa5zct',
          clientSecret:
            'uSR4Gjf3XNN-1kfZGuppDqRdbz7XD6A4o2g8yY1GdZgqCXeYhWhdqfPUoIIJLBRf',
          scopes: ['openid', 'profile', 'email'], // default scopes to request
        },
        persistAuthorization: true,
      },
    });
  }

  return document;
};
