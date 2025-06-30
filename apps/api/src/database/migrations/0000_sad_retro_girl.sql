CREATE TYPE "public"."userRole" AS ENUM('admin', 'user', 'employer', 'seeker');--> statement-breakpoint
CREATE TABLE "role" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"userId" uuid NOT NULL,
	"role" "userRole",
	"isActive" boolean DEFAULT true,
	CONSTRAINT "uniqueUserIdRole" UNIQUE("userId","role")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false,
	"firstname" text,
	"lastname" text,
	"passwordHash" text,
	"country" text,
	"imageUrl" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "role" ADD CONSTRAINT "role_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;