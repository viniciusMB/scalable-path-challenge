import { Inject, Injectable } from '@nestjs/common';
import { Product } from '@domain/product/product.entity';
import { IProductRepository } from '@domain/product/product.repository';
import { IDatabaseAdapter } from '@infra/database/interfaces/adapter';

import { database } from '../ioc';

import { BaseRepository } from './abstract/base-repository.repository';

@Injectable()
export class ProductRepository
  extends BaseRepository<Product>
  implements IProductRepository
{
  constructor(
    @Inject(database.adapter)
    databaseService: IDatabaseAdapter,
  ) {
    super(databaseService, 'Product');
  }

  findMany(where?: Partial<Product>): Promise<Product[]> {
    return this.repository.findMany(where);
  }

  async findByExternalCode(externalCode: string): Promise<Product | null> {
    const entity = await this.repository.findUnique({
      where: {
        externalCode,
      },
    });
    return entity ?? null;
  }
}
