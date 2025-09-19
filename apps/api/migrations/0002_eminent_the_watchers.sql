CREATE TYPE "public"."job_listing_work_mode" AS ENUM('remote', 'onsite', 'hybrid');--> statement-breakpoint
ALTER TYPE "public"."jobListing_type" RENAME TO "job_listing_type";--> statement-breakpoint
ALTER TABLE "job_listing" ADD COLUMN "salary" jsonb;--> statement-breakpoint
ALTER TABLE "job_listing" ADD COLUMN "work_mode" "job_listing_work_mode";--> statement-breakpoint
ALTER TABLE "job_listing" DROP COLUMN "salary_from";--> statement-breakpoint
ALTER TABLE "job_listing" DROP COLUMN "salary_to";--> statement-breakpoint
ALTER TABLE "job_listing" DROP COLUMN "currency";