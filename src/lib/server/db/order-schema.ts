/* eslint-disable @typescript-eslint/no-unused-vars */
import * as authS from './auth-schema';

import {
	pgTable,
	text,
	integer,
	timestamp,
	boolean,
	geometry,
	pgEnum,
	uuid,
	json
} from 'drizzle-orm/pg-core';

export const motoboyStatusEnum = pgEnum('motoboy_status', ['available', 'unavailable', 'busy']);

export const motoboy = pgTable('motoboy', {
	id: uuid('id').primaryKey().defaultRandom(),
	// memberId: text('member_id').notNull().references(() => authS.member.id, { onDelete: 'cascade' }),
	location: geometry('location', { mode: 'tuple', srid: 4326 }).notNull(),
	status: motoboyStatusEnum('status').notNull().default('available')
});

export type Motoboy = typeof motoboy.$inferSelect;

export const orderStatusEnum = pgEnum('order_status', [
	'pending',
	'accepted',
	'preparing',
	'delivering',
	'delivered',
	'canceled',
	'refunded',
	'failed'
]);

export const route = pgTable('route', {
	id: uuid('id').primaryKey().defaultRandom(),
	motoboyId: uuid('motoboy_id')
		.references(() => motoboy.id, { onDelete: 'set null' }),
	createdAt: timestamp('created_at').notNull().defaultNow()
});
export const order = pgTable('order', {
	id: uuid('id').primaryKey().defaultRandom(),
	data: json('data').notNull(),
	status: orderStatusEnum('status').notNull().default('pending'),
	routeId: uuid('route_id').references(() => route.id, { onDelete: 'cascade' })
});
