import { relations } from "drizzle-orm";
import {
  decimal,
  int,
  json,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const categories = mysqlTable("categories", {
  id: varchar({ length: 14 }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().onUpdateNow().notNull(),
});

export const products = mysqlTable("products", {
  id: varchar({ length: 14 }).primaryKey(),
  images: json("images").default([]).notNull(),
  name: varchar({ length: 255 }).notNull(),
  category: varchar({ length: 14 }).references(() => categories.id, {
    onDelete: "set null",
  }),
  shortDesc: text().notNull(),
  desc: text().notNull(),
  price: decimal({ precision: 10, scale: 2 }).notNull(),
  discount: decimal({ precision: 10, scale: 2 }).notNull(),
  stock: int().notNull(),
  sales: int().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().onUpdateNow().notNull(),
});

export const specials = mysqlTable("specials", {
  id: varchar({ length: 14 }).primaryKey(),
  fstPrd: varchar({ length: 14 }).references(() => products.id, {
    onDelete: "set null",
  }),
  secPrd: varchar({ length: 14 }).references(() => products.id, {
    onDelete: "set null",
  }),
  thirdPrd: varchar({ length: 14 }).references(() => products.id, {
    onDelete: "set null",
  }),
  frthPrd: varchar({ length: 14 }).references(() => products.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const settings = mysqlTable("settings", {
  id: varchar({ length: 14 }).primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  description: text("description").notNull(),
  keywords: text("keywords").notNull(),
  logo: varchar("logo", { length: 255 }).notNull(),
  favicon: varchar("favicon", { length: 255 }).notNull(),
  footerInfo: text("footer_info"),
  supportEmail: varchar("support_email", { length: 150 }),
  supportNo: int().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const admins = mysqlTable("admins", {
  id: varchar({ length: 14 }).primaryKey(),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const banners = mysqlTable("banners", {
  id: varchar({ length: 14 }).primaryKey(),
  images: json("images").default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

/* <----- Relations -----> */

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  categories: one(categories, {
    fields: [products.category],
    references: [categories.id],
  }),
  specialsAsFirst: many(specials, {
    relationName: "firstProduct",
  }),
  specialsAsSecond: many(specials, {
    relationName: "secondProduct",
  }),
  specialsAsThird: many(specials, {
    relationName: "thirdProduct",
  }),
  specialsAsFourth: many(specials, {
    relationName: "fourthProduct",
  }),
}));

export const specialsRelations = relations(specials, ({ one }) => ({
  firstProduct: one(products, {
    fields: [specials.fstPrd],
    references: [products.id],
    relationName: "firstProduct",
  }),

  secondProduct: one(products, {
    fields: [specials.secPrd],
    references: [products.id],
    relationName: "secondProduct",
  }),

  thirdProduct: one(products, {
    fields: [specials.thirdPrd],
    references: [products.id],
    relationName: "thirdProduct",
  }),

  fourthProduct: one(products, {
    fields: [specials.frthPrd],
    references: [products.id],
    relationName: "fourthProduct",
  }),
}));
