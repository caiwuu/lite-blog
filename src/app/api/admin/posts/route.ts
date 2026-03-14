import { createPost } from '@/lib/posts';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, slug, content, tags } = body;
  if (!title || !slug || !content) {
    return NextResponse.json({ error: 'title, slug, content are required' }, { status: 400 });
  }
  const post = createPost({ title, slug, content, tags: tags ?? '' });
  return NextResponse.json(post, { status: 201 });
}
