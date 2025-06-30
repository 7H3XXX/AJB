import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { DATABASE_CONNECTION } from './database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class DatabaseMigrationService implements OnModuleInit {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase,
  ) {}
  onModuleInit() {}
}
