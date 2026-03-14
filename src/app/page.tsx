import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2" style={{ letterSpacing: '-0.04em', color: 'var(--foreground)' }}>文章</h1>
        <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem' }}>共 {posts.length} 篇</p>
      </div>
      {posts.length === 0 ? (
        <p style={{ color: 'var(--foreground-muted)' }}>暂无文章，请先运行 <code>npm run seed</code> 初始化数据。</p>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
