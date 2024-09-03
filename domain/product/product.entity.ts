type NonFunctionKeys = {
  [K in keyof Product]: Product[K] extends (...args: any[]) => any ? never : K; // eslint-disable-line @typescript-eslint/no-explicit-any
}[keyof Product];

type ProductNonFunctionKeys = Pick<Product, NonFunctionKeys>;

export class Product {
  public readonly id?: string;
  public readonly title: string;
  public readonly description: string;
  public readonly externalCode: string;
  public readonly price: number;
  public readonly isActive: boolean;
  public readonly superLogicaId?: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;

  constructor(data: ProductNonFunctionKeys) {
    Object.assign(this, data, {
      id: data.id ?? undefined,
      createdAt: data.createdAt ?? undefined,
      updatedAt: data.updatedAt ?? undefined,
      deletedAt: data.deletedAt ?? undefined,
    });
  }

  static rehydrate(productData: ProductNonFunctionKeys): Product {
    return new Product(productData);
  }

  public update(productData: Partial<ProductNonFunctionKeys>): {
    id: string;
    updateData: Partial<ProductNonFunctionKeys>;
  } {
    const updateData: Partial<Product> = {};
    Object.assign(updateData, productData, { updatedAt: new Date() });

    return { id: this.id, updateData };
  }

  public delete(): {
    id: string;
    updateData: Partial<ProductNonFunctionKeys>;
  } {
    return {
      id: this.id,
      updateData: { deletedAt: new Date(), updatedAt: new Date() },
    };
  }
}
