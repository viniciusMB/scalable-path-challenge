import { Inject, Logger, PreconditionFailedException } from '@nestjs/common';
import {
  ICreateProductUsecase,
  ICreateProductUsecaseInput,
} from '@application/product/interfaces/create-product';
import { Product } from '@domain/product/product.entity';
import { IProductRepository } from '@domain/product/product.repository';
import { database } from '@infra/database/ioc';

export class CreateProductUsecase implements ICreateProductUsecase {
  private readonly logger: Logger;

  constructor(
    @Inject(database.repositories.product)
    private readonly productRepository: IProductRepository,
  ) {
    this.logger = new Logger(CreateProductUsecase.name);
  }

  async execute(input: ICreateProductUsecaseInput): Promise<Product> {
    const findProduct = await this.productRepository.findByExternalCode(
      input.externalCode,
    );
    if (findProduct)
      throw new PreconditionFailedException(
        `There is already a product with externalCode: ${input.externalCode}`,
      );

    const product = new Product(input);

    return this.productRepository.save(product);
  }
}
