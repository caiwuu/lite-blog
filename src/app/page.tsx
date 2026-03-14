import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">文章列表</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">暂无文章，请先运行 <code>npm run seed</code> 初始化数据。</p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
