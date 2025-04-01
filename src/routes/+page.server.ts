import type { PageServerLoad } from './$types';
// import { db } from '$lib/server/db';
// import { user } from '$lib/server/db/schema';
export const load = (async () => {
	// await db.insert(user).values({ age: Math.floor(Math.random() * 100) });
	// return {
	// 	users: await db.select().from(user)
	// };
}) satisfies PageServerLoad;
