import { db, posts } from './db';
import { eq, desc } from 'drizzle-orm';

export type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  tags: string;
  createdAt: Date;
};

export function getAllPosts(): Post[] {
  return db.select().from(posts).orderBy(desc(posts.createdAt)).all() as Post[];
}

export function getPostBySlug(slug: string): Post | undefined {
  const result = db.select().from(posts).where(eq(posts.slug, slug)).all();
  return result[0] as Post | undefined;
}
