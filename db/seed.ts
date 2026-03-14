import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'blog.db');
const sqlite = new Database(dbPath);

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    tags TEXT NOT NULL DEFAULT '',
    created_at INTEGER NOT NULL
  )
`);

const insert = sqlite.prepare(`
  INSERT OR REPLACE INTO posts (title, slug, content, tags, created_at)
  VALUES (@title, @slug, @content, @tags, @createdAt)
`);

const seedData = [
  {
    title: 'Next.js 14 App Router 入门指南',
    slug: 'nextjs-14-app-router-guide',
    content: '# Next.js 14 App Router 入门指南\n\nNext.js 14 引入了全新的 App Router。\n\n## 核心概念\n\n### Server Components\n\n默认使用 React Server Components，组件在服务器上渲染。\n\n```tsx\nexport default async function Page() {\n  const data = await fetchData();\n  return <div>{data}</div>;\n}\n```\n\n### 文件系统路由\n\n- `app/page.tsx` → `/`\n- `app/posts/[slug]/page.tsx` → `/posts/:slug`\n\n## 总结\n\nApp Router 是 Next.js 的未来，掌握它将大大提升你的开发效率。',
    tags: 'Next.js,React,TypeScript',
    createdAt: Math.floor(new Date('2024-01-15').getTime() / 1000),
  },
  {
    title: 'SQLite + Drizzle ORM：轻量级数据库方案',
    slug: 'sqlite-drizzle-orm-guide',
    content: '# SQLite + Drizzle ORM\n\n对于中小型项目，SQLite 是一个极佳的选择。\n\n## 为什么选择 SQLite？\n\n- **零配置**：无需单独部署数据库服务\n- **文件即数据库**：便于备份和迁移\n\n## 示例代码\n\n```typescript\nexport const users = sqliteTable(\'users\', {\n  id: integer(\'id\').primaryKey({ autoIncrement: true }),\n  name: text(\'name\').notNull(),\n});\n```\n\n## 总结\n\nSQLite + Drizzle 是构建轻量级全栈应用的理想组合。',
    tags: 'SQLite,Drizzle ORM,数据库',
    createdAt: Math.floor(new Date('2024-02-20').getTime() / 1000),
  },
  {
    title: 'Tailwind CSS v4 新特性速览',
    slug: 'tailwind-css-v4-features',
    content: '# Tailwind CSS v4 新特性速览\n\nTailwind CSS v4 带来了许多令人兴奋的新特性。\n\n## 主要变化\n\n### 全新配置方式\n\n```css\n@import "tailwindcss";\n\n@theme {\n  --color-primary: #3b82f6;\n}\n```\n\n### 性能大幅提升\n\n- 构建速度提升 **5x**\n- 增量构建提升 **100x**\n\n## 总结\n\nTailwind CSS v4 是一次重大革新，值得每个前端开发者关注。',
    tags: 'Tailwind CSS,CSS,前端',
    createdAt: Math.floor(new Date('2024-03-10').getTime() / 1000),
  },
];

for (const post of seedData) {
  insert.run(post);
}

console.log(`✅ Seeded ${seedData.length} posts into ${dbPath}`);
sqlite.close();
