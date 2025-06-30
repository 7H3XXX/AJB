import { relations } from 'drizzle-orm';
import * as pg from 'drizzle-orm/pg-core';
import { baseSchema } from 'src/database/utils';

export const user = pg.pgTable('user', {
  ...baseSchema,
  email: pg.text().unique().notNull(),
  email_verified: pg.boolean().default(false),
  firstname: pg.text(),
  lastname: pg.text(),
  passwordHash: pg.text(),
  country: pg.text(),
  imageUrl: pg.text(),
});

export const userRole = pg.pgEnum('userRole', [
  'admin',
  'user',
  'employer',
  'seeker',
]);

export const role = pg.pgTable(
  'role',
  {
    ...baseSchema,
    userId: pg
      .uuid()
      .references(() => user.id, { onDelete: 'cascade' })
      .notNull(),
    role: userRole(),
    isActive: pg.boolean().default(true),
  },
  (table) => ({
    uniqueUserIdRole: pg
      .unique('uniqueUserIdRole')
      .on(table.userId, table.role),
  }),
);

export const userRelations = relations(user, ({ many }) => ({
  roles: many(role),
}));

export const roleRelations = relations(role, ({ one }) => ({
  user: one(user, {
    fields: [role.userId],
    references: [user.id],
  }),
}));
