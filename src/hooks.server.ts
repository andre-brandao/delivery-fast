/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from '$lib/server/auth/auth'; // path to your auth file
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler, toSvelteKitHandler, isAuthPath } from 'better-auth/svelte-kit';

const handleUser: Handle = async ({ event, resolve }) => {
	const { request } = event;

	try {
		const session = await auth.api.getSession({
			headers: request.headers
		});

		const org = await auth.api.getFullOrganization({
			headers: request.headers
		});

		event.locals.session = session;
		event.locals.org = org;
		return resolve(event);
	} catch (error) {
		return resolve(event);
	}
};
const authHandler: Handle = ({ event, resolve }) => svelteKitHandler({ event, resolve, auth });
export const handle = sequence(authHandler, handleUser);
