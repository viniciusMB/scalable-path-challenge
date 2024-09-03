import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import { ApiModule } from '@api/api.module';
import { ApplicationModule } from '@application/application.module';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { superlogicaHttpConfig } from '@infra/http/superlogica-http.config';
import { configLogger } from '@infra/logger';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [configLogger, superlogicaHttpConfig],
  ignoreEnvFile: process.env.NODE_ENV === 'TEST',
  cache: true,
};
@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    HttpModule,
    LoggerModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('logger-config'),
      inject: [ConfigService],
    }),
    DatabaseModule,
    ApiModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
