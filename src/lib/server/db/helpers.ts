/* eslint-disable @typescript-eslint/no-unused-vars */
import { sql } from 'drizzle-orm';
import {
	pgTable,
	serial,
	text,
	integer,
	geometry,
	uuid,
	timestamp,
	time,
	date
} from 'drizzle-orm/pg-core';
// columns.helpers.ts
const timestamps = {
	updated_at: timestamp(),
	created_at: timestamp().defaultNow().notNull(),
	deleted_at: timestamp()
};
