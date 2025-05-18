"use client";
import { authClient } from "@/lib/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		const { data, error } = await authClient.signUp.email({
			email,
			password,
			name,
		});
		if (error) {
			setError(error.message || "Sign up failed");
			return;
		}
		router.push("/dashboard");
	};

	return (
		<div className="max-w-md mx-auto mt-20 p-8 border rounded shadow">
			<h1 className="text-2xl font-bold mb-6">Sign Up</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					className="border p-2 rounded"
				/>
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
					Sign Up
				</button>
			</form>
			<div className="mt-4 text-sm">
				<a href="/signin" className="text-blue-600 hover:underline">
					Already have an account? Sign In
				</a>
			</div>
		</div>
	);
}
