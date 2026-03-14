import Link from 'next/link';
import type { Post } from '@/lib/posts';

export default function PostCard({ post }: { post: Post }) {
  const date = new Date(post.createdAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const tags = post.tags ? post.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

  return (
    <article className="border border-gray-700 rounded-lg p-6 hover:border-gray-500 transition-colors" style={{ background: 'rgba(255,255,255,0.04)' }}>
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-xl font-semibold hover:text-sky-400 mb-2" style={{ color: 'var(--foreground)' }}>
          {post.title}
        </h2>
      </Link>
      <p className="text-sm text-gray-400 mb-3">{date}</p>
      {tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {tags.map(tag => (
            <span key={tag} className="text-xs border border-gray-600 text-gray-300 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
