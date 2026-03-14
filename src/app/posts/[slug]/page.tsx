import { getPostBySlug, getAllPosts, getAdjacentPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MarkdownPreview from '@/components/MarkdownPreview';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const date = new Date(post.createdAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const tags = post.tags ? post.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  const minutes = readingTime(post.content);
  const { prev, next } = getAdjacentPosts(slug);

  return (
    <article>
      <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>{post.title}</h1>
      <div className="flex items-center gap-4 mb-6 text-sm text-gray-400 flex-wrap">
        <span>{date}</span>
        <span>·</span>
        <span>约 {minutes} 分钟阅读</span>
        {tags.map(tag => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="border border-gray-600 text-gray-300 hover:border-sky-400 hover:text-sky-400 px-2 py-0.5 rounded text-xs transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
      <MarkdownPreview content={post.content} />

      {(prev || next) && (
        <nav className="flex justify-between gap-4 mt-12 pt-6 border-t border-gray-700">
          <div className="flex-1">
            {prev && (
              <Link href={`/posts/${prev.slug}`} className="group flex flex-col">
                <span className="text-xs text-gray-500 mb-1">← 上一篇</span>
                <span className="text-sm text-gray-300 group-hover:text-sky-400 transition-colors">{prev.title}</span>
              </Link>
            )}
          </div>
          <div className="flex-1 text-right">
            {next && (
              <Link href={`/posts/${next.slug}`} className="group flex flex-col items-end">
                <span className="text-xs text-gray-500 mb-1">下一篇 →</span>
                <span className="text-sm text-gray-300 group-hover:text-sky-400 transition-colors">{next.title}</span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </article>
  );
}
