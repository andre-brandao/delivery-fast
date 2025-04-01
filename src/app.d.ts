// See https://svelte.dev/docs/kit/types#app.d.ts

import type { auth } from "$lib/server/auth/auth";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: typeof auth.$Infer.Session | null;
			org: typeof auth.$Infer.ActiveOrganization | null;

		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
