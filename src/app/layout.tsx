import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'A simple blog built with Next.js and SQLite',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-white text-gray-900 min-h-screen">
        <Header />
        <main className="max-w-3xl mx-auto px-4 pb-16">{children}</main>
      </body>
    </html>
  );
}
