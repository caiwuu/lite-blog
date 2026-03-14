import { searchPosts } from '@/lib/posts';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? '';
  if (!q.trim()) return NextResponse.json([]);
  const results = searchPosts(q.trim());
  return NextResponse.json(results);
}
