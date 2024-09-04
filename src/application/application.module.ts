import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';

import { CreateProductUsecase } from './product/handlers/create-product.handler';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [CreateProductUsecase],
  exports: [CreateProductUsecase],
})
export class ApplicationModule {}
