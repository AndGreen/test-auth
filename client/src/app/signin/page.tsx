"use client";
import { authClient } from "@/lib/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		const { data, error } = await authClient.signIn.email({ email, password });
		if (error) {
			setError(error.message || "Sign in failed");
			return;
		}
		router.push("/dashboard");
	};

	return (
		<div className="max-w-md mx-auto mt-20 p-8 border rounded shadow">
			<h1 className="text-2xl font-bold mb-6">Sign In</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="border p-2 rounded"
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="border p-2 rounded"
				/>
				{error && <div className="text-red-500">{error}</div>}
				<button type="submit" className="bg-blue-600 text-white p-2 rounded">
					Sign In
				</button>
			</form>
			<div className="mt-4 flex justify-between text-sm">
				<a href="/signup" className="text-blue-600 hover:underline">
					Sign Up
				</a>
				<a href="/reset-password" className="text-blue-600 hover:underline">
					Forgot Password?
				</a>
			</div>
		</div>
	);
}
