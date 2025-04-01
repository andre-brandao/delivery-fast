import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { organization } from 'better-auth/plugins';
import { db } from '../db';
import * as schema from '../db/schema';
import { admin } from 'better-auth/plugins';
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: { ...schema, users: schema.user }
	}),
	user: {
        changeEmail: {
            enabled: true,
			// sendChangeEmailVerification: async ({ user, newEmail, url, token }, request) => {
            //     await sendEmail({
            //         to: user.email, // verification email must be sent to the current user email to approve the change
            //         subject: 'Approve email change',
            //         text: `Click the link to approve the change: ${url}`
            //     })
            // }
        }
    },
	emailAndPassword: {
		enabled: true
	},
	plugins: [organization(), admin()]
});
