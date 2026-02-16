import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { admins } from "../drizzle/schema.js";
import argon2 from "argon2";

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
  return await argon2.hash(password);
};

export const comparePass = async (password, hashed) => {
  return await argon2.verify(hashed, password);
};
