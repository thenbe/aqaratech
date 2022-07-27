/// <reference types="node" />

// import type { PrismaClient } from '@prisma/client';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // TODO prune unused
      readonly DATABASE_URL: string;

      /**
       * Auth0 client secret provided by Auth0
       */
      readonly AUTH0_CLIENT_SECRET: string;

      /**
       * Auth0 domain as configured in Auth0
       */
      readonly AUTH0_DOMAIN: string;

      /**
       * Default domain generated by Auth0 (not custom domain)
       */
      readonly AUTH0_DEFAULT_DOMAIN: string;

      readonly MYFATOORAH_TOKEN: string;
      readonly TWILIO_AUTH_TOKEN: string;

      /**
       * The current url origin where the site is hosted.
       * Used for callbacks (Twilio, myFatoorah).
       * Handles production, vercel previews, and local dev.
       * Returns a preview branch's dedicated domain if it exists `https://stage.letand.be`,
       * otherwise return the deployment domain  `https://my-site-7q03y4pi5.vercel.app`.
       */
      readonly URL_ORIGIN: string | undefined;

      /**
       * An indicator that the app is deployed and running on Vercel. Example: `1`.
       */
      readonly VERCEL: string;

      /**
       * Email used for myfatoorah invoices when not in production
       * The URL of the deployment. Example: `my-site-7q03y4pi5.vercel.app`
       */
      readonly VERCEL_URL: string;

      /**
       * The Environment that the app is deployed an running on. The value can be either `production`, `preview`, or `development`.
       */
      readonly VERCEL_ENV: 'production' | 'preview' | 'development';

      /**
       * The git branch of the commit the deployment was triggered by. Example: `improve-about-page`.
       */
      readonly VERCEL_GIT_COMMIT_REF: string;

      readonly SITE_ORIGIN: string;
      readonly POSTMARK_TOKEN: string;
      readonly MEILISEARCH_HOST: string;
      readonly MEILISEARCH_API_KEY: string;
    }
  }

  // eslint-disable-next-line no-var
  // var prismaClient: PrismaClient;
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
