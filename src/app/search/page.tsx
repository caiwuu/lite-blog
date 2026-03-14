'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Post } from '@/lib/posts';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
    setSearched(true);
    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">搜索</h1>
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="搜索文章标题或内容…"
          className="flex-1 bg-transparent border border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-sky-400"
          style={{ color: 'var(--foreground)' }}
        />
        <button
          type="submit"
          disabled={loading}
          className="border border-gray-600 hover:border-sky-400 hover:text-sky-400 px-5 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
        >
          {loading ? '搜索中…' : '搜索'}
        </button>
      </form>

      {searched && (
        results.length === 0 ? (
          <p className="text-gray-400">没有找到相关文章</p>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-400">找到 {results.length} 篇文章</p>
            {results.map(post => {
              const date = new Date(post.createdAt).toLocaleDateString('zh-CN', {
                year: 'numeric', month: 'long', day: 'numeric',
              });
              const tags = post.tags ? post.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
              return (
                <article key={post.id} className="border border-gray-700 rounded-lg p-6" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <Link href={`/posts/${post.slug}`}>
                    <h2 className="text-xl font-semibold hover:text-sky-400 mb-2" style={{ color: 'var(--foreground)' }}>
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-400 mb-3">{date}</p>
                  {tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {tags.map(tag => (
                        <span key={tag} className="text-xs border border-gray-600 text-gray-300 px-2 py-1 rounded">{tag}</span>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}
