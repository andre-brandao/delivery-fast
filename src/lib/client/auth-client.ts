import { createAuthClient } from "better-auth/svelte"
import { organizationClient } from "better-auth/client/plugins"
import { adminClient } from "better-auth/client/plugins"
import { ac, roles } from "$lib/auth/permissions";


const client = createAuthClient({
    plugins: [ 
        organizationClient({
			ac,
			roles,
		}),
        adminClient()
    ] 
});


export default client;


// ----------------------------- ERROR CODES -----------------------------
type ErrorTypes = Partial<
	Record<
		keyof typeof client.$ERROR_CODES,
		{
			en: string;
			pt: string;
		}
	>
>;
 
const errorCodes = {
	USER_ALREADY_EXISTS: {
		en: "user already registered",
		pt: "usuario ya registrada",
	},
	USER_NOT_FOUND: {
		en: "user not found",
		pt: "usuario não encontrado",
	},

} satisfies ErrorTypes;
 
export const getErrorMessage = (code: string, lang: "en" | "pt") => {
	if (code in errorCodes) {
		return errorCodes[code as keyof typeof errorCodes][lang];
	}
	return "Error: " + code;
};
