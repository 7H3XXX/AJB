import { Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from './database-connection';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DatabaseMigrationService } from './database.service';
import { env } from 'env.config';
import * as user from 'src/users/entities/schema';

export const DBSchema = {
  ...user,
};

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: () => {
        const pool = new Pool({
          host: env.DATABASE_HOST,
          user: env.DATABASE_USER,
          database: env.DATABASE_NAME,
          password: env.DATABASE_PWD,
          port: env.DATABASE_PORT,
        });
        return drizzle({
          client: pool,
          schema: DBSchema,
        });
      },
    },
    DatabaseMigrationService,
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
