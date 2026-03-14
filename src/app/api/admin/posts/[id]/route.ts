import { updatePost, deletePost, getPostById } from '@/lib/posts';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numId = parseInt(id);
  const existing = getPostById(numId);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const body = await req.json();
  const post = updatePost(numId, body);
  return NextResponse.json(post);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numId = parseInt(id);
  const existing = getPostById(numId);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  deletePost(numId);
  return NextResponse.json({ success: true });
}
