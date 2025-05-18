import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: "http://localhost:3000/auth/api",
});

export const { signIn, signUp, resetPassword, signOut } = authClient;
