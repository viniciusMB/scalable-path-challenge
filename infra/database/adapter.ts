import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { IDatabaseAdapter } from './interfaces/adapter';
import { DatabaseMethods } from './interfaces/methods';

@Injectable()
export class DatabaseAdapter implements IDatabaseAdapter, OnModuleInit {
  private readonly prisma: PrismaClient;
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(DatabaseAdapter.name);
    this.prisma = new PrismaClient({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
        {
          emit: 'event',
          level: 'error',
        },
      ],
    });
  }

  async onModuleInit() {
    await this.prisma.$connect();

    this.prisma.$on('error' as never, (err: Prisma.LogEvent) => {
      this.logger.error({ ...err, type: 'error' });
    });

    this.prisma.$on('warn' as never, (warn: Prisma.LogEvent) => {
      this.logger.warn({ ...warn, type: 'warn' });
    });

    this.prisma.$on('info' as never, (info: Prisma.LogEvent) => {
      this.logger.debug({ ...info, type: 'info' });
    });

    this.prisma.$on('query' as never, (query: Prisma.QueryEvent) => {
      this.logger.log({ ...query, type: 'query' });
    });
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  async ping() {
    return 'pong';
  }

  getRepository<T>(entityName: string): DatabaseMethods<T> {
    const handler = {
      get: (target: unknown, prop: string) => {
        if (typeof this.prisma[entityName][prop] === 'function') {
          return (...args: unknown[]) => this.prisma[entityName][prop](...args);
        }
        throw new Error(
          `Method ${prop} is not implemented on entity ${entityName}`,
        );
      },
    };

    return new Proxy({}, handler) as DatabaseMethods<T>;
  }
}
