'use client';

import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';

const MDPreview = dynamic(
  () => import('@uiw/react-md-editor').then(m => m.default.Markdown),
  { ssr: false }
);

export default function MarkdownPreview({ content }: { content: string }) {
  return (
    <div data-color-mode="dark">
      <MDPreview source={content} />
    </div>
  );
}
