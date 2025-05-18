"use client";
import { authClient } from "@/lib/authApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
	const [user, setUser] = useState<{ email: string } | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const { data, error } = await authClient.getSession();
			if (error || !data?.user) {
				setError(error?.message || "Not authenticated");
				router.push("/signin");
				return;
			}
			setUser(data.user);
			setLoading(false);
		})();
	}, [router]);

	const handleSignOut = async () => {
		await authClient.signOut();
		router.push("/signin");
	};

	if (loading) return <div className="mt-20 text-center">Loading...</div>;
	if (!user) return null;

	return (
		<div className="max-w-md mx-auto mt-20 p-8 border rounded shadow">
			<h1 className="text-2xl font-bold mb-6">Dashboard</h1>
			{error && <div className="text-red-500 mb-4">{error}</div>}
			<div className="mb-4">
				Welcome, <span className="font-semibold">{user.email}</span>!
			</div>
			<button
				type="button"
				onClick={handleSignOut}
				className="bg-red-600 text-white p-2 rounded"
			>
				Sign Out
			</button>
		</div>
	);
}
