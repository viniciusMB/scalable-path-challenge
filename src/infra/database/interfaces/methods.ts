export interface DatabaseMethods<T> {
  findUnique(where: unknown): Promise<T | null>;
  findMany(where: unknown): Promise<T[]>;
  create(data: { data: T }): Promise<T>;
  update(query: { where: unknown; data: Partial<T> }): Promise<T>;
  delete(where: unknown): Promise<T>;
}
