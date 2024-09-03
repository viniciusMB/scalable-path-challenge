import { Module } from '@nestjs/common';

import { ProductRepository } from './repositories/product.repository';
import { DatabaseAdapter } from './adapter';
import { database } from './ioc';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: database.adapter,
      useClass: DatabaseAdapter,
    },
    {
      provide: database.repositories.product,
      useClass: ProductRepository,
    },
  ],
  exports: [database.adapter, database.repositories.product],
})
export class DatabaseModule {}
