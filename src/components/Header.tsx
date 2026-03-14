import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-200 mb-8">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-600">
          My Blog
        </Link>
      </div>
    </header>
  );
}
