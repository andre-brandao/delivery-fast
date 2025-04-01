import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
export const POST: RequestHandler = async () => {
	await db.insert(user).values({ age: Math.floor(Math.random() * 100) });
	return new Response("ok");
};

export const DELETE: RequestHandler = async () => {
    await db.delete(user).execute();
    return new Response("ok");
}
