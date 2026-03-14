'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Post } from '@/lib/posts';

export default function AdminPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/login');
  }

  async function loadPosts() {
    const r = await fetch('/api/admin/posts-list');
    if (r.ok) {
      setPosts(await r.json());
    }
    setLoading(false);
  }

  useEffect(() => { loadPosts(); }, []);

  async function handleDelete(id: number, title: string) {
    if (!confirm(`确定删除「${title}」？`)) return;
    await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
    setPosts(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">文章管理</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/new"
            className="border border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            + 新建文章
          </Link>
          <button
            onClick={handleLogout}
            className="border border-gray-600 text-gray-400 hover:border-red-400 hover:text-red-400 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            退出登录
          </button>
        </div>
      </div>
      {loading ? (
        <p className="text-gray-400">加载中…</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-400">暂无文章</p>
      ) : (
        <div className="flex flex-col gap-2">
          {posts.map(post => {
            const date = new Date(post.createdAt).toLocaleDateString('zh-CN', {
              year: 'numeric', month: 'short', day: 'numeric',
            });
            return (
              <div
                key={post.id}
                className="flex items-center justify-between border border-gray-700 rounded-lg px-5 py-4"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div>
                  <Link href={`/posts/${post.slug}`} className="font-medium hover:text-sky-400">
                    {post.title}
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">{date}</p>
                </div>
                <div className="flex gap-3">
                  <Link
                    href={`/admin/${post.id}/edit`}
                    className="text-sm text-gray-400 hover:text-sky-400 transition-colors"
                  >
                    编辑
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                  >
                    删除
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
