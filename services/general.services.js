import { desc, eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { contacts, settings } from "../drizzle/schema.js";
import { generateId } from "../helpers/generateID.js";

export const fetchSettings = async () => {
  return await db.query.settings.findFirst();
};

export const updateSettings = async (payload) => {
  return await db
    .update(settings)
    .set({
      name: payload.name,
      keywords: payload.keywords,
      description: payload.description,
      supportEmail: payload.supportEmail,
      supportNo: payload.supportNo,
      footerInfo: payload.footerInfo,
    })
    .where(eq(settings.id, "LEJR5QGCGQ43IS"));
};

export const writeContact = async (body) => {
  return await db.insert(contacts).values({
    id: generateId(),
    name: body.name,
    email: body.email,
    message: body.message,
  });
};

export const fetchContacts = async () => {
  return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
};

export const dropContact = async (id) => {
  return await db.delete(contacts).where(eq(contacts.id, id));
};

export const findContactById = async (id) => {
  const [message] = await db.select().from(contacts).where(eq(contacts.id, id));
  return message;
};
