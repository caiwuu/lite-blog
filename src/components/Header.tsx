import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-700 mb-8">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:text-sky-400 transition-colors" style={{ color: 'var(--foreground)' }}>
          My Blog
        </Link>
        <nav className="flex items-center gap-5 text-sm text-gray-400">
          <Link href="/" className="hover:text-sky-400 transition-colors">首页</Link>
          <Link href="/tags" className="hover:text-sky-400 transition-colors">标签</Link>
          <Link href="/search" className="hover:text-sky-400 transition-colors">搜索</Link>
          <Link href="/about" className="hover:text-sky-400 transition-colors">关于</Link>
          <Link href="/admin" className="hover:text-sky-400 transition-colors border border-gray-600 hover:border-sky-400 px-3 py-1 rounded transition-colors">后台</Link>
        </nav>
      </div>
    </header>
  );
}
