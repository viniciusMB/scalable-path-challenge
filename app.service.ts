import { Inject, Injectable } from '@nestjs/common';
import { IDatabaseAdapter } from '@infra/database/interfaces/adapter';
import { database } from '@infra/database/ioc';

@Injectable()
export class AppService {
  constructor(
    @Inject(database.adapter)
    private readonly databaseService: IDatabaseAdapter,
  ) {}

  async databaseStatus(): Promise<string> {
    return this.databaseService.ping();
  }
}
