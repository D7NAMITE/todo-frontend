import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const usersClerk = pgTable('users', {
    userId: uuid('user_id').defaultRandom().primaryKey(),
    username: text('username').notNull().unique(),
    createdAt: timestamp('created_at', { withTimezone: false }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: false }).defaultNow(),
});