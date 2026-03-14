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

export async function getAllPosts(): Promise<Post[]> {
  return db.select().from(posts).orderBy(desc(posts.createdAt)) as Promise<Post[]>;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const result = await db.select().from(posts).where(eq(posts.slug, slug));
  return result[0] as Post | undefined;
}

export async function getPostById(id: number): Promise<Post | undefined> {
  const result = await db.select().from(posts).where(eq(posts.id, id));
  return result[0] as Post | undefined;
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const all = await getAllPosts();
  return all.filter(p => p.tags.split(',').map(t => t.trim()).includes(tag));
}

export async function searchPosts(query: string): Promise<Post[]> {
  const q = `%${query}%`;
  return db.select().from(posts)
    .where(or(like(posts.title, q), like(posts.content, q)))
    .orderBy(desc(posts.createdAt)) as Promise<Post[]>;
}

export async function getAdjacentPosts(slug: string): Promise<{ prev: Post | null; next: Post | null }> {
  const all = await getAllPosts();
  const idx = all.findIndex(p => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx + 1 < all.length ? all[idx + 1] : null,
    next: idx - 1 >= 0 ? all[idx - 1] : null,
  };
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const all = await getAllPosts();
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

export async function createPost(data: CreatePostInput): Promise<Post> {
  const createdAt = new Date(Math.floor(Date.now() / 1000) * 1000);
  const result = await db.insert(posts).values({
    title: data.title,
    slug: data.slug,
    content: data.content,
    tags: data.tags,
    createdAt,
  }).returning();
  return result[0] as Post;
}

export async function updatePost(id: number, data: Partial<CreatePostInput>): Promise<Post> {
  const result = await db.update(posts).set(data).where(eq(posts.id, id)).returning();
  return result[0] as Post;
}

export async function deletePost(id: number): Promise<void> {
  await db.delete(posts).where(eq(posts.id, id));
}
