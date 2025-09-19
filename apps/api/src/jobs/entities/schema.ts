import { InferSelectModel, relations } from 'drizzle-orm';
import * as pg from 'drizzle-orm/pg-core';
import { baseSchema } from 'src/database/utils';
import { organisation } from 'src/organisations/entities/schema';
import { user } from 'src/users/entities/schema';

export const jobCategory = pg.pgTable('job_category', {
  ...baseSchema,
  name: pg.text().notNull(),
  iconUrl: pg.text(),
});

export const experienceLevelEnum = pg.pgEnum('job_experience_level', [
  'no-experience',
  'fresher',
  'intermediate',
  'expert',
]);

export const listingTypeEnum = pg.pgEnum('job_listing_type', [
  'full-time',
  'part-time',
  'freelance',
  'seasonal',
  'contract',
  'fixed-price',
]);

export const listingWorkModeEnum = pg.pgEnum('job_listing_work_mode', [
  'remote',
  'onsite',
  'hybrid',
]);

export const listingStatusEnum = pg.pgEnum('job_listing_status', [
  'created',
  'drafted',
  'pending-review',
  'approved',
  'rejected',
  'suspended',
]);

export type jobListingStatus = NonNullable<
  InferSelectModel<typeof jobListing>['status']
>;
export type jobListingType = NonNullable<
  InferSelectModel<typeof jobListing>['type']
>;
export type jobListingExperienceLevel = NonNullable<
  InferSelectModel<typeof jobListing>['experienceLevel']
>;

export type jobListingWorkMode = NonNullable<
  InferSelectModel<typeof jobListing>['workMode']
>;

export type jobListingSalary = {
  from: number;
  to: number;
  currency: string;
  currencySymbol: string;
};

export const jobListing = pg.pgTable('job_listing', {
  ...baseSchema,
  title: pg.text().notNull(),
  description: pg.text(),
  requirements: pg.text(),
  salary: pg.jsonb().$type<jobListingSalary>(),
  country: pg.text(),
  city: pg.text(),
  experienceLevel: experienceLevelEnum(),
  type: listingTypeEnum(),
  workMode: listingWorkModeEnum(),
  status: listingStatusEnum(),
  isActive: pg.boolean().default(false),
  website: pg.text(),

  // relation columns
  categoryId: pg
    .uuid()
    .notNull()
    .references(() => jobCategory.id),
  createdById: pg
    .uuid()
    .notNull()
    .references(() => user.id),
  organisationId: pg
    .uuid()
    .notNull()
    .references(() => organisation.id),
});

export const jobListingRelations = relations(jobListing, ({ one, many }) => ({
  category: one(jobCategory, {
    fields: [jobListing.categoryId],
    references: [jobCategory.id],
  }),
  createdBy: one(user, {
    fields: [jobListing.createdById],
    references: [user.id],
  }),
  organisation: one(organisation, {
    fields: [jobListing.organisationId],
    references: [organisation.id],
  }),
  jobToSkills: many(jobListingToJobSkill),
}));

export const jobListingToJobSkill = pg.pgTable(
  'job_listing_to_job_skill',
  {
    jobId: pg.uuid().references(() => jobListing.id),
    skillId: pg.uuid().references(() => jobSkill.id),
  },
  (table) => [pg.primaryKey({ columns: [table.jobId, table.skillId] })],
);

export const jobListingToJobSkillRelations = relations(
  jobListingToJobSkill,
  ({ one }) => ({
    jobListing: one(jobListing, {
      fields: [jobListingToJobSkill.jobId],
      references: [jobListing.id],
    }),
    jobSkill: one(jobSkill, {
      fields: [jobListingToJobSkill.skillId],
      references: [jobSkill.id],
    }),
  }),
);

export const jobSkill = pg.pgTable('job_skill', {
  ...baseSchema,
  name: pg.text(),
});

export const jobSkillRelations = relations(jobSkill, ({ many }) => ({
  skillToJobs: many(jobListingToJobSkill),
}));
