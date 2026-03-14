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
    if (r.ok) setPosts(await r.json());
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
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold" style={{ letterSpacing: '-0.04em', color: 'var(--foreground)' }}>文章管理</h1>
          {!loading && <p className="text-sm mt-1" style={{ color: 'var(--foreground-muted)' }}>共 {posts.length} 篇</p>}
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/new"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}
          >
            <span>＋</span> 新建文章
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm transition-all"
            style={{ border: '1px solid var(--border)', color: 'var(--foreground-muted)' }}
          >
            退出
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex flex-col gap-2">
          {[1,2,3].map(i => (
            <div key={i} className="rounded-xl px-5 py-4 animate-pulse" style={{ background: 'var(--background-card)', border: '1px solid var(--border)', height: '68px' }} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--foreground-muted)' }}>
          <p className="text-4xl mb-3">✦</p>
          <p className="text-sm">暂无文章</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {posts.map(post => {
            const date = new Date(post.createdAt).toLocaleDateString('zh-CN', {
              year: 'numeric', month: 'short', day: 'numeric',
            });
            const tags = post.tags ? post.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
            return (
              <div
                key={post.id}
                className="admin-row flex items-center justify-between rounded-xl px-5 py-4 transition-all"
                style={{ background: 'var(--background-card)', border: '1px solid var(--border)' }}
              >
                <div className="min-w-0 flex-1 mr-4">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="font-medium text-sm leading-snug hover:text-sky-400 transition-colors block truncate"
                    style={{ color: 'var(--foreground)' }}
                    target="_blank"
                  >
                    {post.title}
                  </Link>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>{date}</span>
                    {tags.map(tag => (
                      <span key={tag} className="text-xs px-1.5 py-0.5 rounded" style={{ border: '1px solid var(--border)', color: 'var(--foreground-muted)' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Link
                    href={`/admin/${post.id}/edit`}
                    className="px-3 py-1.5 rounded-md text-xs transition-colors hover:text-sky-400"
                    style={{ color: 'var(--foreground-muted)' }}
                  >
                    编辑
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="px-3 py-1.5 rounded-md text-xs transition-colors hover:text-red-400"
                    style={{ color: 'var(--foreground-muted)' }}
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
