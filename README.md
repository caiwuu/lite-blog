# lite-blog

一个基于 Next.js + SQLite + Drizzle ORM 构建的轻量级博客系统。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/caiwuu/lite-blog&env=ADMIN_PASSWORD,TURSO_DATABASE_URL,TURSO_AUTH_TOKEN&envDescription=后台密码+Turso数据库配置&envLink=https://github.com/caiwuu/lite-blog%23%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)

## 功能特性

- 文章列表 & 详情页（含上下篇导航）
- 标签系统 & 全文搜索
- RSS Feed
- 后台管理（密码认证 + Markdown 实时预览）
- 支持 Turso 云数据库（生产环境）

## 本地开发

```bash
npm install
npm run seed   # 填充示例数据
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 环境变量

| 变量 | 说明 |
|------|------|
| `ADMIN_PASSWORD` | 后台管理密码 |
| `TURSO_DATABASE_URL` | Turso 数据库 URL（生产环境）|
| `TURSO_AUTH_TOKEN` | Turso 认证 Token（生产环境）|

## 技术栈

- [Next.js 16](https://nextjs.org) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Drizzle ORM](https://orm.drizzle.team) + SQLite / [Turso](https://turso.tech)
