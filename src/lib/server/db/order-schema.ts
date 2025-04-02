/* eslint-disable @typescript-eslint/no-unused-vars */
import * as authS from './auth-schema';

import { pgTable, text, integer, timestamp, boolean, geometry, pgEnum, uuid } from 'drizzle-orm/pg-core';

export const motoboyStatusEnum = pgEnum('motoboy_status', ['available', 'unavailable', 'busy']);

export const motoboy = pgTable('motoboy', {
	id: uuid('id').primaryKey().defaultRandom(),
	// memberId: text('member_id').notNull().references(() => authS.member.id, { onDelete: 'cascade' }),
	location: geometry('location', { mode: 'tuple', srid: 4326 }).notNull(),
	status: motoboyStatusEnum('status').notNull().default('available'),
});

export type Motoboy = typeof motoboy.$inferSelect