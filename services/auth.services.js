import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { admins } from "../drizzle/schema.js";
import bcrypt from "bcryptjs";

export const getAdmin = async (username) => {
  const [admin] = await db
    .select()
    .from(admins)
    .where(eq(admins.username, username));
  return admin;
};

export const getAdminById = async (id) => {
  const [admin] = await db.select().from(admins).where(eq(admins.id, id));
  return admin;
};

export const hashPass = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const comparePass = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};
