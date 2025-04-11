/* eslint-disable @typescript-eslint/no-unused-vars */
import { trustedOrigins } from '$lib/config';
import { auth } from '$lib/server/auth/auth'; // path to your auth file
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler, toSvelteKitHandler, isAuthPath } from 'better-auth/svelte-kit';

const handleUser: Handle = async ({ event, resolve }) => {
	const { request } = event;

	console.log(`${request.method}: ${new URL(request.url).pathname}`);

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

const handleCors: Handle = async ({ event, resolve }) => {
	const origin = event.request.headers.get('origin');

	const isTrusted: boolean = origin != null && trustedOrigins.some((o) => origin.startsWith(o));

	console.log(
		`CORS: ${event.request.method} ${event.url.pathname} - Origin: ${origin} - Trusted: ${isTrusted} `
	);

	if (event.url.pathname.startsWith('/api')) {
		// Handle preflight (OPTIONS) requests
		if (event.request.method === 'OPTIONS') {
			return new Response(null, {
				status: isTrusted ? 204 : 403,
				headers: {
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
					'Access-Control-Allow-Origin': isTrusted ? origin! : '',
					'Access-Control-Allow-Headers': 'Content-Type, Authorization',
					'Access-Control-Allow-Credentials': 'true',
					Vary: 'Origin'
				}
			});
		}
	}

	const response = await resolve(event);

	if (event.url.pathname.startsWith('/api') && isTrusted) {
		response.headers.append('Access-Control-Allow-Origin', origin!);
		response.headers.append('Access-Control-Allow-Credentials', 'true');
		response.headers.append('Vary', 'Origin');
	}

	return response;
};

const authHandler: Handle = ({ event, resolve }) => svelteKitHandler({ event, resolve, auth });
export const handle = sequence(handleCors, authHandler, handleUser);
