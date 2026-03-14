import { getAllPosts } from '@/lib/posts';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const posts = await getAllPosts();
  const baseUrl = 'http://localhost:3000';

  const items = posts.map(post => {
    const date = new Date(post.createdAt).toUTCString();
    const desc = post.content.replace(/[<>&"]/g, c =>
      ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c] ?? c)
    ).slice(0, 200);
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/posts/${post.slug}</link>
      <guid>${baseUrl}/posts/${post.slug}</guid>
      <pubDate>${date}</pubDate>
      <description><![CDATA[${desc}]]></description>
    </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>My Blog</title>
    <link>${baseUrl}</link>
    <description>A simple blog built with Next.js and SQLite</description>
    <language>zh-CN</language>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
