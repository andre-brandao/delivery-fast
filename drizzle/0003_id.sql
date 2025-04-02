CREATE TYPE "public"."motoboy_status" AS ENUM('available', 'unavailable', 'busy');--> statement-breakpoint
ALTER TABLE "motoboy" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "motoboy" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();