import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import path from 'path';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  tags: text('tags').notNull().default(''),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

const dbPath = path.join(process.cwd(), 'blog.db');
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite);

// Create table if not exists
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    tags TEXT NOT NULL DEFAULT '',
    created_at INTEGER NOT NULL
  )
`);
