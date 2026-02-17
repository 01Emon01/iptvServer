import { and, eq, like } from "drizzle-orm";
import { db } from "../config/db.js";
import { categories, products, specials } from "../drizzle/schema.js";
import { generateId } from "../helpers/generateID.js";

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
  if (!categorySlug && !name) {
    return await db.query.products.findMany({
      with: { categories: true },
    });
  }

  let filters = [];

  if (categorySlug) {
    const categoryRow = await db.query.categories.findFirst({
      where: (categories, { eq }) => eq(categories.slug, categorySlug),
    });

    if (!categoryRow) return [];

    filters.push(eq(products.category, categoryRow.id));
  }

  if (name) {
    filters.push(like(products.name, `%${name}%`));
  }

  return await db.query.products.findMany({
    where: filters.length ? and(...filters) : undefined,
    with: {
      categories: true,
    },
  });
};

export const fetchProductById = async (id) => {
  const product = await db.query.products.findFirst({
    where: (products, { eq }) => eq(products.id, id),
    with: {
      categories: true,
    },
  });
  return product;
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
  return await db.insert(specials).values({
    id: generateId(),
    fstPrd,
    secPrd,
    thirdPrd,
    frthPrd,
  });
};

export const fetchSpecials = async () => {
  return await db.query.specials.findFirst({
    with: {
      firstProduct: true,
      secondProduct: true,
      thirdProduct: true,
      fourthProduct: true,
    },
  });
};

export const fetchSubsProduct = async () => {
  return await db.query.products.findMany({
    where: (products, { eq }) => eq(products.category, "F53VQFCOIDM6SU"),
    with: {
      categories: true,
      specialsAsFourth: true,
    },
  });
};

export const fetchBoxesProduct = async () => {
  return await db.query.products.findMany({
    where: (products, { eq }) => eq(products.category, "2GAC37NTXWQTN9"),
    with: {
      categories: true,
      specialsAsSecond: true,
      specialsAsThird: true,
    },
  });
};
