import { relations } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  email: text('email', { length: 128 }),
  name: text('name', { length: 128 }).notNull(),
  avatar: text('avatar', { length: 255 }),
  githubUserId: text('github_user_id').notNull().unique(),
})

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(userSession),
  guestbooks: many(guestbook),
}))

export const userSession = sqliteTable('user_session', {
  id: text('id').primaryKey(),
  expiresAt: integer('expires_at').notNull(),
  userId: text('user_id').notNull().references(() => user.id),
})

export const userSessionRelations = relations(userSession, ({ one }) => ({
  user: one(user, {
    fields: [userSession.userId],
    references: [user.id],
  }),
}))

export const guestbook = sqliteTable('guestbook', {
  id: text('id').primaryKey(),
  createdAt: integer('created_at').notNull(),
  sign: text('sign').notNull(),
  userId: text('user_id').notNull().references(() => user.id),
})

export const guestbookRelations = relations(guestbook, ({ one }) => ({
  user: one(user, {
    fields: [guestbook.userId],
    references: [user.id],
  }),
}))
