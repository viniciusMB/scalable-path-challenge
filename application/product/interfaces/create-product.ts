import { Product } from '@domain/product/product.entity';

export interface ICreateProductUsecaseInput {
  title: string;
  description: string;
  externalCode: string;
  price: number;
  isActive: boolean;
  superLogicaId?: number;
}

export interface ICreateProductUsecase {
  execute(input: ICreateProductUsecaseInput): Promise<Product>;
}
