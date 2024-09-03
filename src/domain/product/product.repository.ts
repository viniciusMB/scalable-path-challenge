import { Product } from './product.entity';

export interface IProductRepository {
  save(product: Product): Promise<Product>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findByExternalCode(externalCode: string): Promise<Product | null>;
  findMany(where?: Partial<Product>): Promise<Product[]>;
}
