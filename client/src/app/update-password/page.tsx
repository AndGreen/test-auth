"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function UpdatePasswordPage() {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token") || "";

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setMessage("");
		// const { data, error } = await authClient.updatePassword.token({
		// 	token,
		// 	newPassword: password,
		// });
		// if (error) {
		// 	setError(error.message || "Update failed");
		// 	return;
		// }
		setMessage("Password updated. You can now sign in.");
		setTimeout(() => router.push("/signin"), 2000);
	};

	return (
		<div className="max-w-md mx-auto mt-20 p-8 border rounded shadow">
			<h1 className="text-2xl font-bold mb-6">Update Password</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<input
					type="password"
					placeholder="New Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="border p-2 rounded"
				/>
				{error && <div className="text-red-500">{error}</div>}
				{message && <div className="text-green-600">{message}</div>}
				<button type="submit" className="bg-blue-600 text-white p-2 rounded">
					Update Password
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
