import Link from 'next/link';
import type { Post } from '@/lib/posts';

export default function PostCard({ post }: { post: Post }) {
  const date = new Date(post.createdAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const tags = post.tags ? post.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  const words = post.content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));

  return (
    <article
      className="group rounded-xl p-6 transition-all duration-200"
      style={{
        background: 'var(--background-card)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <Link href={`/posts/${post.slug}`} className="block mb-3">
        <h2
          className="text-lg font-semibold leading-snug transition-colors group-hover:text-sky-400"
          style={{ color: 'var(--foreground)', letterSpacing: '-0.02em' }}
        >
          {post.title}
        </h2>
      </Link>
      <div className="flex items-center gap-3 mb-4" style={{ color: 'var(--foreground-muted)', fontSize: '0.8rem' }}>
        <span>{date}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>约 {minutes} 分钟</span>
      </div>
      {tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {tags.map(tag => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="text-xs px-2.5 py-0.5 rounded-full transition-colors hover:text-sky-400"
              style={{ border: '1px solid var(--border)', color: 'var(--foreground-muted)' }}
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
