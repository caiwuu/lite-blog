export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">关于</h1>
      <div className="space-y-4 text-gray-300 leading-7">
        <p>
          这是一个用 <span className="text-sky-400">Next.js</span> +{' '}
          <span className="text-sky-400">SQLite</span> 构建的简洁博客。
        </p>
        <p>
          技术栈：Next.js 16 · TypeScript · Tailwind CSS · Drizzle ORM · better-sqlite3 · React Markdown
        </p>
        <p>
          内容涵盖前端开发、后端技术、工程实践等方向。
        </p>
        <hr className="border-gray-700 my-6" />
        <p className="text-sm text-gray-500">
          RSS 订阅：<a href="/feed.xml" className="text-sky-400 hover:underline">/feed.xml</a>
        </p>
      </div>
    </div>
  );
}
