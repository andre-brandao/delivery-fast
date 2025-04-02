CREATE TYPE "public"."motoboy_status" AS ENUM('available', 'unavailable', 'busy');

CREATE TABLE "motoboy" (
	"id" text PRIMARY KEY NOT NULL,
	"location" geometry(point) NOT NULL,
	"status" "motoboy_status" DEFAULT 'available' NOT NULL
);
