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
    <article className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 mb-2">
          {post.title}
        </h2>
      </Link>
      <p className="text-sm text-gray-500 mb-3">{date}</p>
      {tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
