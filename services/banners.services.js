import { eq, inArray } from "drizzle-orm";
import { db } from "../config/db.js";
import { banners, products, specials } from "../drizzle/schema.js";

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

export const fetchBannersBySp = async () => {
  const [bannerRow, specialsRow] = await Promise.all([
    db.select().from(banners).limit(1),
    db.select().from(specials).limit(1),
  ]);

  const banner = bannerRow[0] ?? null;
  const specialsData = specialsRow[0];

  const fstProductId = specialsData?.fstPrd;
  const secProductId = specialsData?.frthPrd;

  if (!fstProductId || !secProductId) {
    return {
      banner,
      product: null,
      secProduct: null,
    };
  }

  const productRows = await db
    .select()
    .from(products)
    .where(inArray(products.id, [fstProductId, secProductId]));

  const fstProduct = productRows.find((p) => p.id === fstProductId) ?? null;
  const secProduct = productRows.find((p) => p.id === secProductId) ?? null;

  return {
    banner,
    product: fstProduct,
    secProduct,
  };
};
