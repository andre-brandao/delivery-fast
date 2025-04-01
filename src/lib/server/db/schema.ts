/* eslint-disable @typescript-eslint/no-unused-vars */
import { pgTable, serial, text, integer, geometry, uuid, timestamp } from 'drizzle-orm/pg-core';

const timestampz = {
	created_at: timestamp()
}

export const user = pgTable('user', {
	id: serial().primaryKey(),
	age: integer()
});

export const Tmotoboy = pgTable('motoboy', {
	id: uuid('id').primaryKey().defaultRandom(),
	location: geometry('location', {
		type: 'point',
		mode: 'xy',
		srid: 4326
	})
});
