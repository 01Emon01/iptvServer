import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { settings } from "../drizzle/schema.js";

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
