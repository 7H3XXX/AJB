import { env } from 'env.config';
import db from '.';
import { getTableName, sql, Table } from 'drizzle-orm';
import { DBSchema } from './schemas';
import { Injectable, Logger } from '@nestjs/common';
import * as seed from './seeds';

@Injectable()
export class SeedingService {
  logger = new Logger(SeedingService.name);
  async resetTable(db: db, table: Table) {
    return db.execute(
      sql.raw(
        `TRUNCATE TABLE "${getTableName(table)}" RESTART IDENTITY CASCADE`,
      ),
    );
  }
  async startSeeding() {
    if (!env.DATABASE_SEEDING) {
      throw new Error(
        'You must set DATABASE_SEEDING to "true" when running seeds',
      );
    }

    this.logger.debug('Resetting all database tables before seeding...');
    await db.transaction(async (tx) => {
      for (const table of [
        DBSchema.jobListingToJobSkill,
        DBSchema.jobListing,
        DBSchema.jobSkill,
        DBSchema.organisation,
        DBSchema.jobCategory,
        DBSchema.role,
        DBSchema.user,
      ]) {
        await this.resetTable(tx as unknown as db, table);
      }

      this.logger.debug(
        'All tables truncated. Beginning database seeding process...',
      );
      // start seeding
      await seed.users(tx as unknown as db);
      await seed.organisation(tx as unknown as db);
      await seed.jobSkills(tx as unknown as db);
      await seed.jobCategories(tx as unknown as db);
      await seed.jobListing(tx as unknown as db);
      this.logger.debug('Database seeding process completed successfully.');
    });
  }
}
