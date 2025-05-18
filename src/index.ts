import { cors } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { authHandler, openAPISchema } from "./auth";
import { db, user } from "./db";

const app = new Elysia()
	.use(
		cors({
			origin: "http://localhost:3001",
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization"],
		}),
	)
	.use(
		swagger({
			documentation: {
				info: {
					title: "BetterAuth API",
					version: "1.0.0",
				},
				components: openAPISchema.components as any,
				paths: openAPISchema.paths as any,
			},
		}),
	)
	.mount(authHandler)
	.get("/users", async () => {
		const users = await db.select().from(user);
		return users;
	})
	.listen(3000);

console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}/swagger`,
);
