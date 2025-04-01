import { createAuthClient } from "better-auth/svelte"
import { organizationClient } from "better-auth/client/plugins"
import { adminClient } from "better-auth/client/plugins"
const client = createAuthClient({
    plugins: [ 
        organizationClient(),
        adminClient()
    ] 
});


export default client;