import "dotenv/config";
import { admins } from "../drizzle/schema.js";
import { db } from "../config/db.js";
import { hashPass } from "../services/auth.services.js";
import { generateId } from "../helpers/generateID.js";

async function seed() {
  const pass = await hashPass("8T2a7a0hrAGn");
  await db.insert(admins).values({
    id: generateId(),
    username: "admin",
    email: "admin@gmail.com",
    password: pass,
  });
  console.log("✅ Admin seeded");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed", err);
  process.exit(1);
});
