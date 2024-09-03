import { Module } from '@nestjs/common';

import { CreateProductController } from './product/create-product.controller';

@Module({
  imports: [],
  controllers: [CreateProductController],
  providers: [],
})
export class ApiModule {}
