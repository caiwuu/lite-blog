'use client';

import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';

const MDPreview = dynamic(
  () => import('@uiw/react-md-editor').then(m => m.default.Markdown),
  { ssr: false }
);

export default function MarkdownPreview({ content }: { content: string }) {
  return (
    <div data-color-mode="dark" style={{ padding: '1.5rem 0' }}>
      <MDPreview source={content} style={{ padding: '0' }} />
    </div>
  );
}
