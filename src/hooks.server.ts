/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "$lib/server/auth/auth"; // path to your auth file
import { svelteKitHandler, toSvelteKitHandler, isAuthPath } from "better-auth/svelte-kit";
 
export async function handle({ event, resolve }) {
    return svelteKitHandler({ event, resolve, auth });
}