import { relations } from "drizzle-orm";
import {
  integer,
  bigint,
  pgTable,
  uniqueIndex,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { init } from "@paralleldrive/cuid2";

const createId = init({ length: 15 });

export const pageview = pgTable(
  "pageview",
  {
    id: varchar("id", { length: 15 })
      .$defaultFn(() => createId())
      .primaryKey(),
    path: text("path"),
    count: integer("count"),
  },
  (pageview) => {
    return {
      pathIndex: uniqueIndex("path_idx").on(pageview.path),
    };
  }
);

export const user = pgTable("user", {
  id: varchar("id", { length: 15 }).primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  email: varchar("email", { length: 128 }),
  avatar: varchar("avatar", { length: 255 }),
  githubUserId: bigint("github_user_id", { mode: "number" }).unique(),
});

export const userSession = pgTable("user_session", {
  id: varchar("id", { length: 128 }).primaryKey(),
  userId: varchar("user_id", { length: 15 })
    .notNull()
    .references(() => user.id),
  activeExpires: bigint("active_expires", { mode: "number" }).notNull(),
  idleExpires: bigint("idle_expires", { mode: "number" }).notNull(),
});

export const userKey = pgTable("user_key", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 15 })
    .notNull()
    .references(() => user.id),
  hashedPassword: varchar("hashed_password", { length: 255 }),
});

export const usersRelations = relations(user, ({ many }) => ({
  posts: many(guestbook),
}));

export const guestbook = pgTable("guestbook", {
  id: varchar("id", { length: 15 })
    .$defaultFn(() => createId())
    .primaryKey(),
  userId: varchar("user_id", { length: 15 })
    .notNull()
    .references(() => user.id),
  sign: text("sign").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const guestbookRelations = relations(guestbook, ({ one }) => ({
  user: one(user, {
    fields: [guestbook.userId],
    references: [user.id],
  }),
}));
