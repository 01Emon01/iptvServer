import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "../drizzle/schema.js";

export const db = drizzle(process.env.DATABASE_URL, {
  schema: schema,
  mode: "default",
});
