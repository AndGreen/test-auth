"use client";
import { authClient } from "@/lib/authApi";
import { useState } from "react";

export default function ResetPasswordPage() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setMessage("");
		const { data, error } = await authClient.forgetPassword({
			email,
			redirectTo: "/update-password",
		});
		if (error) {
			setError(error.message || "Reset failed");
			return;
		}
		setMessage("If your email is registered, you will receive a reset link.");
	};

	return (
		<div className="max-w-md mx-auto mt-20 p-8 border rounded shadow">
			<h1 className="text-2xl font-bold mb-6">Reset Password</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="border p-2 rounded"
				/>
				{error && <div className="text-red-500">{error}</div>}
				{message && <div className="text-green-600">{message}</div>}
				<button type="submit" className="bg-blue-600 text-white p-2 rounded">
					Send Reset Link
				</button>
			</form>
			<div className="mt-4 text-sm">
				<a href="/signin" className="text-blue-600 hover:underline">
					Back to Sign In
				</a>
			</div>
		</div>
	);
}
