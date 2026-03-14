import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  tags: text('tags').notNull().default(''),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

function createDb() {
  if (process.env.TURSO_DATABASE_URL) {
    // Production: Turso (libsql)
    const { createClient } = require('@libsql/client');
    const { drizzle } = require('drizzle-orm/libsql');
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    client.execute(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        content TEXT NOT NULL,
        tags TEXT NOT NULL DEFAULT '',
        created_at INTEGER NOT NULL
      )
    `);
    return drizzle(client);
  } else {
    // Development: local SQLite
    const Database = require('better-sqlite3');
    const { drizzle } = require('drizzle-orm/better-sqlite3');
    const path = require('path');
    const dbPath = path.join(process.cwd(), 'blog.db');
    const sqlite = new Database(dbPath);
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
    return drizzle(sqlite);
  }
}

export const db = createDb();
