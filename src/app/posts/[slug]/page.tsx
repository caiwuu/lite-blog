import { getPostBySlug, getAllPosts } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
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

  return (
    <article>
      <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
      <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
        <span>{date}</span>
        {tags.map(tag => (
          <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
      <div className="prose prose-gray max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
