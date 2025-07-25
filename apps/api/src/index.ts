import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { users } from "@db/schema";

export type Bindings = {
  DB: D1Database;
  API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  const db = drizzle(c.env.DB, {
    schema: {
      users,
      // ここにスキーマを定義する
    },
  });

  return c.text("Hello Hono!");
});

export default app;
