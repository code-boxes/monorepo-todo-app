import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const timestamp = (name: string) =>
  integer(name, { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date());

// 共通のベーススキーマ
const _schemaBase = {
  id: text()
    .$defaultFn(() => Math.random() + "")
    .primaryKey()
    .notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
};

// ユーザーマスタ
export const users = sqliteTable("users", {
  ..._schemaBase,
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
});
