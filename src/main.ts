import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from '@application/exceptions/all-exceptions.filter';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  const logger = app.get(Logger);
  app.useLogger(logger);

  const config = new DocumentBuilder()
    .setTitle('Scalable Path')
    .setDescription('The Scalable Path API description')
    .setVersion('1.0')
    .addGlobalParameters({
      in: 'header',
      name: 'x-request-id',
      description:
        'Optional parameter, to improve traceability, if not informed a uuid v4 will be created',
      required: false,
      schema: { example: 'id|uuid|ooid' },
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
