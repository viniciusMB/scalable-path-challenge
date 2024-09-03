import { registerAs } from '@nestjs/config';

export const superlogicaHttpConfig = registerAs(
  'superlogicaHttpConfig',
  () => ({
    superlogicaBaseUrl:
      process.env.SUPERLOGICA_BASE_URL || 'https://api.superlogica.net/v2',
    superlogicaAppToken: process.env.SUPERLOGICA_APP_TOKEN || '123',
    superlogicaAccessToken: process.env.SUPERLOGICA_ACCESS_TOKEN || '123',
  }),
);
