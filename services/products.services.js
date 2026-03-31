import { and, eq, like } from "drizzle-orm";
import { db } from "../config/db.js";
import { categories, products, specials } from "../drizzle/schema.js";
import { generateId } from "../helpers/generateID.js";
import { alias } from "drizzle-orm/mysql-core";

export const findCateBySlug = async (slug) => {
  const [category] = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug));
  console.log(category);
};

export const createCategory = async ({ name, slug }) => {
  await db.insert(categories).values({
    id: generateId(),
    name,
    slug,
  });
};

export const fetchCategories = async () => {
  const rows = await db.select().from(categories);
  return rows;
};

export const fetchCategoryById = async (id) => {
  const [row] = await db.select().from(categories).where(eq(categories.id, id));
  return row;
};

export const changeCategory = async (id, data) => {
  await db
    .update(categories)
    .set({
      name: data.name,
      slug: data.slug,
    })
    .where(eq(categories.id, id));
};

export const dropCategory = async (id) => {
  return await db.delete(categories).where(eq(categories.id, id));
};

export const createProduct = async (data) => {
  await db.insert(products).values({
    id: generateId(),
    images: data.images,
    name: data.name,
    category: data.category,
    shortDesc: data.shortDesc,
    desc: data.desc,
    price: Number(data.price),
    discount: Number(data.discount),
    stock: Number(data.stock),
    sales: Number(data.sales),
  });
};

export const fetchProducts = async (categorySlug, name) => {
  let filters = [];

  // Filter by category slug
  if (categorySlug) {
    const categoryRow = await db.query.categories.findFirst({
      where: (categories, { eq }) => eq(categories.slug, categorySlug),
    });

    if (!categoryRow) return [];

    filters.push(eq(products.category, categoryRow.id));
  }

  // Filter by product name
  if (name) {
    filters.push(like(products.name, `%${name}%`));
  }

  // Build query
  const query = db
    .select({
      product: products,
      category: categories,
    })
    .from(products)
    .leftJoin(categories, eq(products.category, categories.id))
    .where(filters.length ? and(...filters) : undefined);

  const result = await query;

  return result;
};

export const fetchProductById = async (id) => {
  const result = await db
    .select({
      product: products,
      category: categories,
    })
    .from(products)
    .leftJoin(categories, eq(products.category, categories.id))
    .where(eq(products.id, id))
    .limit(1);

  if (!result.length) return null;

  const row = result[0];

  return {
    ...row.product,
    category: row.category,
  };
};

export const updateProduct = async (id, data) => {
  await db
    .update(products)
    .set({
      images: data.images,
      name: data.name,
      category: data.category,
      shortDesc: data.shortDesc,
      desc: data.desc,
      stock: data.stock,
      sales: data.sales,
      price: Number(data.price),
      discount: Number(data.discount),
    })
    .where(eq(products.id, id));
};

export const editSpecials = async ({ fstPrd, secPrd, thirdPrd, frthPrd }) => {
  return await db
    .update(specials)
    .set({
      fstPrd,
      secPrd,
      thirdPrd,
      frthPrd,
    })
    .where(eq(specials.id, "VKI9JKIMCQVYO7"));
};

export const fetchSpecials = async () => {
  // Aliases for products
  const firstProduct = alias(products, "firstProduct");
  const secondProduct = alias(products, "secondProduct");
  const thirdProduct = alias(products, "thirdProduct");
  const fourthProduct = alias(products, "fourthProduct");

  const result = await db
    .select({
      special: specials,
      firstProduct,
      secondProduct,
      thirdProduct,
      fourthProduct,
    })
    .from(specials)
    // ✅ FIXED JOIN KEYS
    .leftJoin(firstProduct, eq(specials.fstPrd, firstProduct.id))
    .leftJoin(secondProduct, eq(specials.secPrd, secondProduct.id))
    .leftJoin(thirdProduct, eq(specials.thirdPrd, thirdProduct.id))
    .leftJoin(fourthProduct, eq(specials.frthPrd, fourthProduct.id))
    .limit(1);

  if (!result.length) return null;

  const row = result[0];

  return {
    ...row.special,
    firstProduct: row.firstProduct,
    secondProduct: row.secondProduct,
    thirdProduct: row.thirdProduct,
    fourthProduct: row.fourthProduct,
  };
};

export const fetchSubsProduct = async () => {
  const result = await db
    .select({
      product: products,
      category: categories,
      special: specials, // represents specialsAsFourth
    })
    .from(products)
    .leftJoin(categories, eq(products.category, categories.id))
    // ✅ FIXED HERE
    .leftJoin(specials, eq(specials.frthPrd, products.id))
    .where(eq(products.category, "R4ZUUKL1BBEZMF"));

  return result.map((row) => ({
    ...row.product,
    category: row.category,
    specialsAsFourth: row.special,
  }));
};

export const fetchBoxesProduct = async () => {
  // Alias specials table twice
  const specialsSecond = alias(specials, "specialsSecond");
  const specialsThird = alias(specials, "specialsThird");

  const result = await db
    .select({
      product: products,
      category: categories,
      specialsSecond,
      specialsThird,
    })
    .from(products)
    .leftJoin(categories, eq(products.category, categories.id))
    // ✅ FIXED HERE
    .leftJoin(specialsSecond, eq(specialsSecond.secPrd, products.id))
    .leftJoin(specialsThird, eq(specialsThird.thirdPrd, products.id))
    .where(eq(products.category, "2GAC37NTXWQTN9"));

  return result.map((row) => ({
    ...row.product,
    category: row.category,
    specialsAsSecond: row.specialsSecond,
    specialsAsThird: row.specialsThird,
  }));
};

export const dropProduct = async (id) => {
  return await db.delete(products).where(eq(products.id, id));
};
