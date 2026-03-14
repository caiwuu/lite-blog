'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import type { Post } from '@/lib/posts';
import MarkdownEditor from '@/components/MarkdownEditor';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/posts-list')
      .then(r => r.json())
      .then((posts: Post[]) => {
        const post = posts.find(p => p.id === parseInt(id));
        if (post) {
          setTitle(post.title);
          setSlug(post.slug);
          setTags(post.tags);
          setContent(post.content);
        }
        setLoading(false);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !slug || !content) { setError('标题、slug 和内容不能为空'); return; }
    setSubmitting(true);
    setError('');
    const res = await fetch(`/api/admin/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, content, tags }),
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      const data = await res.json();
      setError(data.error ?? '保存失败');
      setSubmitting(false);
    }
  }

  const inputCls = 'w-full bg-transparent border border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-sky-400';

  if (loading) return <p className="text-gray-400">加载中…</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">编辑文章</h1>
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm text-gray-400 mb-1">标题</label>
          <input className={inputCls} style={{ color: 'var(--foreground)' }} value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Slug</label>
          <input className={inputCls} style={{ color: 'var(--foreground)' }} value={slug} onChange={e => setSlug(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">标签（逗号分隔）</label>
          <input className={inputCls} style={{ color: 'var(--foreground)' }} value={tags} onChange={e => setTags(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">内容（Markdown）</label>
          <MarkdownEditor value={content} onChange={setContent} />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="border border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white px-6 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            {submitting ? '保存中…' : '保存修改'}
          </button>
          <button type="button" onClick={() => router.back()} className="border border-gray-600 text-gray-400 hover:border-gray-400 px-6 py-2 rounded-lg text-sm transition-colors">
            取消
          </button>
        </div>
      </form>
    </div>
  );
}
