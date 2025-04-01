/* eslint-disable @typescript-eslint/no-unused-vars */
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { organization } from 'better-auth/plugins';
import { db } from '../db';
import * as schema from '../db/schema';
import { admin } from 'better-auth/plugins';
import { openAPI } from "better-auth/plugins"

import { ac, roles } from '$lib/auth/permissions';
import { sendEmail } from '../email';
import { dev } from '$app/environment';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: { ...schema, users: schema.user }
	}),
	user: {
		changeEmail: {
			enabled: true,
			sendChangeEmailVerification: async ({ user, newEmail, url, token }, request) => {
				await sendEmail({
					to: user.email, // verification email must be sent to the current user email to approve the change
					subject: 'Approve email change to: ' + newEmail,
					text: `Click the link to approve the change: ${url}`
				});
			}
		}
	},
	account: {
        accountLinking: {
            enabled: true, 
        }
    },
	emailAndPassword: {
		enabled: true,
		// requireEmailVerification: true,
		sendResetPassword: async ({ user, url, token }, request) => {
			await sendEmail({
				to: user.email,
				subject: 'Reset your password',
				text: `Click the link to reset your password: ${url}`
			});
		}
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url, token }, request) => {
			await sendEmail({
				to: user.email,
				subject: 'Verify your email address',
				text: `Click the link to verify your email: ${url}`
			});
		}
	},
	plugins: [
		organization({
			ac,
			roles
		}),
		admin({}),
		openAPI()
	],
	advanced: {
		cookiePrefix: 'rota88'
	}
});
