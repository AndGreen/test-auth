import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { user } from "./schema";

const client = new Client({
	connectionString: process.env.DATABASE_URL,
});

await client.connect();

export const db = drizzle(client);
export { user };
