/* eslint-disable @typescript-eslint/no-unused-vars */

// DB
import { db } from '../db';
import * as schema from '../db/schema';

// AUTH
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { organization } from 'better-auth/plugins';
import { ac, roles } from '../../auth/permissions';

// PLUGINS
import { admin } from 'better-auth/plugins';
import { openAPI } from 'better-auth/plugins';
import { passkey } from 'better-auth/plugins/passkey';
import { expo } from "@better-auth/expo";

// OTHER
import { sendEmail } from '../email';
// import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { trustedOrigins } from '$lib/config';




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
            enabled: true
        }
    },
    emailAndPassword: {
        enabled: true,
        // requireEmailVerification: true,
        sendOnSignUp: true,
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
        expo(),
        organization({
            ac,
            roles,

            organizationCreation: {
                disabled: false, // Set to true to disable organization creation
                beforeCreate: async ({ organization, user }, request) => {
                    // Run custom logic before organization is created
                    // Optionally modify the organization data
                    return {
                        data: {
                            ...organization,
                            metadata: {
                                type: 'restaurant'
                            }
                        }
                    };
                },
                afterCreate: async ({ organization, member, user }, request) => {
                    // Run custom logic after organization is created
                    // e.g., create default resources, send notifications
                    // await setupDefaultResources(organization.id);
                    await sendEmail({
                        to: user.email,
                        subject: 'New organization created' + organization.name,
                        text: `You have been added to the organization: ${organization.name}`
                    });
                }
            },
            sendInvitationEmail: async (data) => {
                const inviteLink = `${env.PUBLIC_URL}/accept-invitation/${data.id}`;

                await sendEmail({
                    to: data.email,
                    subject: 'You have been invited to join an organization',
                    text: `Click the link to accept the invitation: ${inviteLink}
					You have been invited by ${data.inviter.user.name} (${data.inviter.user.email}) to join the organization ${data.organization.name}.
					`
                });
                // sendOrganizationInvitation({
                // 	email: data.email,
                // 	invitedByUsername: data.inviter.user.name,
                // 	invitedByEmail: data.inviter.user.email,
                // 	teamName: data.organization.name,
                // 	inviteLink
                // });
            }
        }),
        admin({}),
        openAPI(),
        passkey({
            rpName: 'Rota88',
            rpID: 'localhost',

        }),
    ],
    advanced: {
        cookiePrefix: 'better-auth',
        defaultCookieAttributes: {
            // secure: true,
            // httpOnly: true,
            sameSite: "none",  // Allows CORS-based cookie sharing across subdomains
            partitioned: true, // New browser standards will mandate this for foreign cookies
        },
    },

    trustedOrigins: trustedOrigins,
});
