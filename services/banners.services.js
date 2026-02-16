import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { banners } from "../drizzle/schema.js";

export const handleBanners = async (imagePaths) => {
  const existing = await db.query.banners.findFirst();

  return await db
    .update(banners)
    .set({
      images: imagePaths,
    })
    .where(eq(banners.id, existing.id));
};

export const fetchBanners = async () => {
  const rows = db.query.banners.findFirst();
  return rows;
};
