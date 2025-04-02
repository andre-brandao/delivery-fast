/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '$lib/server/db';
import * as s from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const location = toLoc(body.location);
		await db.insert(s.motoboy).values({
			location: location,
			status: 'available',
			id: sql`gen_random_uuid()`
		});
		return new Response();
	} catch (er) {
		console.error(er);
		return new Response('Error', { status: 500 });
	}
};

export const DELETE: RequestHandler = async () => {
	try {
		await db.delete(s.motoboy);
		return new Response();
	} catch (er) {
		console.error(er);
		return new Response('Error', { status: 500 });
	}
};
function toLoc(loc: string) {
	const [lat, lon] = loc.split(',');

	if (!lat || !lon) {
		throw new Error('Invalid location format');
	}
	return sql`ST_SetSRID(ST_MakePoint(${lon}, ${lat}), 4326)`;
}

export const PATCH: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const location = toLoc(body.location);
		const id = body.id;
		if (!id) {
			return new Response('Invalid id', { status: 400 });
		}
		await db
			.update(s.motoboy)
			.set({
				location: location
			})
			.where(eq(s.motoboy.id, id));
		return new Response();
	} catch (error) {
		console.error(error);
		return new Response('error', { status: 501 });
	}
};
