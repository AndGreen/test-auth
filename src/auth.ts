import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { db, user } from "./db";
import { account, session, verification } from "./schema";

// Placeholder email sender
async function sendEmail({
	to,
	subject,
	text,
}: { to: string; subject: string; text: string }) {
	// TODO: Integrate with your email provider (e.g., Resend, SendGrid, SES, etc.)
	console.log(`Send email to ${to}: ${subject}\n${text}`);
}

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			user,
			session,
			verification,
			account,
		},
	}),
	trustedOrigins: ["http://localhost:3001"],
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url, token }, request) => {
			await sendEmail({
				to: user.email,
				subject: "Reset your password",
				text: `Click the link to reset your password: ${url}`,
			});
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		sendVerificationEmail: async ({ user, url, token }, request) => {
			await sendEmail({
				to: user.email,
				subject: "Verify your email address",
				text: `Click the link to verify your email: ${url}`,
			});
		},
	},
	plugins: [openAPI()],
});

export const openAPISchema = await auth.api.generateOpenAPISchema();
export const authHandler = auth.handler;
