import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const menuItems = pgTable("menu_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // in cents
  category: varchar("category", { length: 50 }).notNull(),
  subcategory: varchar("subcategory", { length: 50 }),
  imageUrl: text("image_url").notNull(),
  isAvailable: boolean("is_available").notNull().default(true),
  allergens: text("allergens").array(),
  dietary: text("dietary").array(), // vegetarian, vegan, gluten-free, etc.
  prepTime: varchar("prep_time", { length: 20 }),
  strength: varchar("strength", { length: 20 }), // for drinks: forte, medio, leggero
  servings: varchar("servings", { length: 20 }), // for food: per 1-2 persone, etc.
  alcoholContent: varchar("alcohol_content", { length: 20 }), // for alcoholic drinks
  bottlePrice: integer("bottle_price"), // for wines, in cents
});

export const insertMenuItemSchema = createInsertSchema(menuItems).omit({
  id: true,
});

export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type MenuItem = typeof menuItems.$inferSelect;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
