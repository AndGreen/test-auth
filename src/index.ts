import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { authHandler, openAPISchema } from "./auth";

const app = new Elysia()
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
	.mount("/auth", authHandler)
	.listen(3000);

console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}/swagger`,
);
