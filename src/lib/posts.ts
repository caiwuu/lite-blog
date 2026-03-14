import { db, posts } from './db';
import { eq, desc, like, or } from 'drizzle-orm';

export type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  tags: string;
  createdAt: Date;
};

export type CreatePostInput = {
  title: string;
  slug: string;
  content: string;
  tags: string;
};

export function getAllPosts(): Post[] {
  return db.select().from(posts).orderBy(desc(posts.createdAt)).all() as Post[];
}

export function getPostBySlug(slug: string): Post | undefined {
  const result = db.select().from(posts).where(eq(posts.slug, slug)).all();
  return result[0] as Post | undefined;
}

export function getPostById(id: number): Post | undefined {
  const result = db.select().from(posts).where(eq(posts.id, id)).all();
  return result[0] as Post | undefined;
}

export function getPostsByTag(tag: string): Post[] {
  const all = getAllPosts();
  return all.filter(p => p.tags.split(',').map(t => t.trim()).includes(tag));
}

export function searchPosts(query: string): Post[] {
  const q = `%${query}%`;
  return db.select().from(posts)
    .where(or(like(posts.title, q), like(posts.content, q)))
    .orderBy(desc(posts.createdAt))
    .all() as Post[];
}

export function getAdjacentPosts(slug: string): { prev: Post | null; next: Post | null } {
  const all = getAllPosts();
  const idx = all.findIndex(p => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx + 1 < all.length ? all[idx + 1] : null,
    next: idx - 1 >= 0 ? all[idx - 1] : null,
  };
}

export function getAllTags(): { tag: string; count: number }[] {
  const all = getAllPosts();
  const map = new Map<string, number>();
  for (const post of all) {
    for (const tag of post.tags.split(',').map(t => t.trim()).filter(Boolean)) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function createPost(data: CreatePostInput): Post {
  const createdAt = new Date(Math.floor(Date.now() / 1000) * 1000);
  const result = db.insert(posts).values({
    title: data.title,
    slug: data.slug,
    content: data.content,
    tags: data.tags,
    createdAt,
  }).returning().all();
  return result[0] as Post;
}

export function updatePost(id: number, data: Partial<CreatePostInput>): Post {
  const result = db.update(posts).set(data).where(eq(posts.id, id)).returning().all();
  return result[0] as Post;
}

export function deletePost(id: number): void {
  db.delete(posts).where(eq(posts.id, id)).run();
}
