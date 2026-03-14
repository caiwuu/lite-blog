import { getAllTags } from '@/lib/posts';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">所有标签</h1>
      {tags.length === 0 ? (
        <p className="text-gray-400">暂无标签</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="flex items-center gap-2 border border-gray-600 text-gray-300 hover:border-sky-400 hover:text-sky-400 px-4 py-2 rounded-full transition-colors"
            >
              <span>{tag}</span>
              <span className="text-xs text-gray-500">{count}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
