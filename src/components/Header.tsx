import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ borderBottom: '1px solid var(--border)', marginBottom: '2.5rem', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(13,13,15,0.85)' }}>
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold tracking-tight text-lg transition-colors"
          style={{ color: 'var(--foreground)', letterSpacing: '-0.03em' }}
        >
          ✦ My Blog
        </Link>
        <nav className="flex items-center gap-1 text-sm" style={{ color: 'var(--foreground-muted)' }}>
          {(['首页', '/', '标签', '/tags', '搜索', '/search', '关于', '/about'] as string[]).reduce<{ label: string; href: string }[]>((acc, _, i, arr) => {
            if (i % 2 === 0) acc.push({ label: arr[i], href: arr[i + 1] });
            return acc;
          }, []).map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-1.5 rounded-md hover:text-sky-400 transition-colors"
              style={{ color: 'inherit' }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="ml-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all hover:text-sky-400"
            style={{ border: '1px solid var(--border)', color: 'var(--foreground-muted)' }}
          >
            后台
          </Link>
        </nav>
      </div>
    </header>
  );
}
