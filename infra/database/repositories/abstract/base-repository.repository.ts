import { IDatabaseAdapter } from '@infra/database/interfaces/adapter';
import { DatabaseMethods } from '@infra/database/interfaces/methods';

import { IBaseRepository } from './base-repository.interface';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected repository: DatabaseMethods<T>;

  constructor(
    protected readonly databaseService: IDatabaseAdapter,
    protected readonly entityName: string,
  ) {
    this.repository = databaseService.getRepository<T>(entityName);
  }

  async save(entity: T): Promise<T> {
    const created = await this.repository.create({
      data: entity,
    });

    return created;
  }

  async update(id: string, entity: Partial<T>): Promise<T> {
    await this.repository.update({ where: { id }, data: entity });
    return this.repository.findUnique({ where: { id } });
  }

  async findById(id: string): Promise<T | null> {
    const entity = await this.repository.findUnique({
      where: { id, deletedAt: null },
    });
    return entity ?? null;
  }

  async findMany(where: Partial<T> = undefined): Promise<T[]> {
    return this.repository.findMany({ where: { ...where, deletedAt: null } });
  }
}
