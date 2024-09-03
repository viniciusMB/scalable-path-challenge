import { DatabaseMethods } from './methods';

export interface IDatabaseAdapter {
  getRepository<T>(entityName: string): DatabaseMethods<T>;
  onModuleInit(): Promise<void>;
  onModuleDestroy(): Promise<void>;
  ping(): Promise<string>;
}
