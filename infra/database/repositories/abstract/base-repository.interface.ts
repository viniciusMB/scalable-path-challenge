export interface IBaseRepository<T> {
  save(entity: T): Promise<T>;
  update(id: string, entity: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
}
