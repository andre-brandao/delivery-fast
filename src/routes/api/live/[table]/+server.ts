import { PUBLIC_ELECTRIC_URL } from '$env/static/public';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
	const url = new URL(request.url);

	// Construct the upstream URL
	const originUrl = new URL(PUBLIC_ELECTRIC_URL);

	// Copy over the relevant query params that the Electric client adds
	// so that we return the right part of the Shape log.
	url.searchParams.forEach((value, key) => {
		if ([`live`, `table`, `handle`, `offset`, `cursor`].includes(key)) {
			originUrl.searchParams.set(key, value);
		}
	});

	//
	// Authentication and authorization
	//

	const user = {
		roles: [`admin`],
		org_id: 1
	};

	// If the user isn't set, return 401
	if (!user) {
		return new Response(`user not found`, { status: 401 });
	}

	// // Only query data the user has access to unless they're an admin.
	// if (!user.roles.includes(`admin`)) {
	//   originUrl.searchParams.set(`where`, `"org_id" = ${user.org_id}`)
	// }

	// When proxying long-polling requests, content-encoding &
	// content-length are added erroneously (saying the body is
	// gzipped when it's not) so we'll just remove them to avoid
	// content decoding errors in the browser.
	//
	// Similar-ish problem to https://github.com/wintercg/fetch/issues/23
	let resp = await fetch(originUrl.toString());
	if (resp.headers.get(`content-encoding`)) {
		const headers = new Headers(resp.headers);
		headers.delete(`content-encoding`);
		headers.delete(`content-length`);
		resp = new Response(resp.body, {
			status: resp.status,
			statusText: resp.statusText,
			headers
		});
	}
	return resp;
};
