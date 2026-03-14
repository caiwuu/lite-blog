'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff\s-]/g, '')
    .trim()
    .replace(/[\s]+/g, '-');
}

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function handleTitleChange(v: string) {
    setTitle(v);
    setSlug(toSlug(v));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !slug || !content) { setError('标题、slug 和内容不能为空'); return; }
    setSubmitting(true);
    setError('');
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, content, tags }),
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      const data = await res.json();
      setError(data.error ?? '创建失败');
      setSubmitting(false);
    }
  }

  const inputCls = 'w-full bg-transparent border border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-sky-400';

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">新建文章</h1>
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm text-gray-400 mb-1">标题</label>
          <input className={inputCls} style={{ color: 'var(--foreground)' }} value={title} onChange={e => handleTitleChange(e.target.value)} placeholder="文章标题" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Slug（URL 路径）</label>
          <input className={inputCls} style={{ color: 'var(--foreground)' }} value={slug} onChange={e => setSlug(e.target.value)} placeholder="my-post-slug" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">标签（逗号分隔）</label>
          <input className={inputCls} style={{ color: 'var(--foreground)' }} value={tags} onChange={e => setTags(e.target.value)} placeholder="Next.js,React" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">内容（Markdown）</label>
          <textarea
            className={`${inputCls} h-64 resize-y font-mono text-xs`}
            style={{ color: 'var(--foreground)' }}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="# 标题\n\n正文内容…"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="border border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white px-6 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            {submitting ? '发布中…' : '发布文章'}
          </button>
          <button type="button" onClick={() => router.back()} className="border border-gray-600 text-gray-400 hover:border-gray-400 px-6 py-2 rounded-lg text-sm transition-colors">
            取消
          </button>
        </div>
      </form>
    </div>
  );
}
