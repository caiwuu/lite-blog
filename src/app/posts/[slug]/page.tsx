import { getPostBySlug, getAdjacentPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MarkdownPreview from '@/components/MarkdownPreview';

export const dynamic = 'force-dynamic';

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const date = new Date(post.createdAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const tags = post.tags ? post.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  const minutes = readingTime(post.content);
  const { prev, next } = await getAdjacentPosts(slug);

  return (
    <article>
      {/* Hero */}
      <div className="mb-10">
        <h1
          className="text-4xl font-bold mb-4 leading-tight"
          style={{ letterSpacing: '-0.04em', color: 'var(--foreground)' }}
        >
          {post.title}
        </h1>
        <div className="flex items-center gap-3 flex-wrap" style={{ color: 'var(--foreground-muted)', fontSize: '0.82rem' }}>
          <span>{date}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>约 {minutes} 分钟阅读</span>
          {tags.length > 0 && <span style={{ opacity: 0.4 }}>·</span>}
          {tags.map(tag => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="transition-colors hover:text-sky-400 px-2 py-0.5 rounded-full"
              style={{ border: '1px solid var(--border)', color: 'var(--foreground-muted)' }}
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', marginBottom: '2rem' }} />

      {/* Content */}
      <MarkdownPreview content={post.content} />

      {/* Prev / Next */}
      {(prev || next) && (
        <nav
          className="flex justify-between gap-6 mt-16 pt-8"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div className="flex-1">
            {prev && (
              <Link href={`/posts/${prev.slug}`} className="group flex flex-col gap-1">
                <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>← 上一篇</span>
                <span
                  className="text-sm font-medium transition-colors group-hover:text-sky-400 leading-snug"
                  style={{ color: 'var(--foreground)' }}
                >
                  {prev.title}
                </span>
              </Link>
            )}
          </div>
          <div className="flex-1 text-right">
            {next && (
              <Link href={`/posts/${next.slug}`} className="group flex flex-col gap-1 items-end">
                <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>下一篇 →</span>
                <span
                  className="text-sm font-medium transition-colors group-hover:text-sky-400 leading-snug"
                  style={{ color: 'var(--foreground)' }}
                >
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </article>
  );
}
