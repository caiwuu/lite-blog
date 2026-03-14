import { getPostsByTag } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = await getPostsByTag(decodedTag);

  if (posts.length === 0) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl font-bold">标签：</h1>
        <span className="text-3xl font-bold text-sky-400">{decodedTag}</span>
        <span className="text-gray-400 text-lg">({posts.length} 篇)</span>
      </div>
      <div className="flex flex-col gap-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
