import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpClient } from './http-client.adapter';
import { http } from './ioc';
import { SuperlogicaProvider } from './superlogica.provider';
import { superlogicaHttpConfig } from './superlogica-http.config';

@Module({
  imports: [ConfigModule],
  providers: [
    HttpClient,
    {
      provide: http.provider.superlogica,
      useFactory: (
        httpClient,
        { superlogicaBaseUrl, superlogicaAppToken, superlogicaAccessToken },
      ) =>
        new SuperlogicaProvider(
          httpClient,
          superlogicaBaseUrl,
          superlogicaAppToken,
          superlogicaAccessToken,
        ),
      inject: [HttpClient, superlogicaHttpConfig.KEY],
    },
  ],
  exports: [http.provider.superlogica],
})
export class HttpModule {}
