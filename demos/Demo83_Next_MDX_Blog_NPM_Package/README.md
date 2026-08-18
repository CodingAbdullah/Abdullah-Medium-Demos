# 🌟 Next-MDX-Blog-Starter

***Copied from the official Next MDX blog starter kit project.***

A production-ready technical blog starter kit built with **Next.js (App Router)**, **MDX**, **Supabase**, and **TypeScript** — SSG-first, AI-enhanced, and deployable to Vercel, Docker, or any static host.

**Live demo**: [next-mdx-blog-starter-sigma.vercel.app](https://next-mdx-blog-starter-sigma.vercel.app/)

## 🚀 Quick Start

Scaffold a new blog in an empty directory with a single command:

```bash
npx create-next-mdx-blog-app .
```

The installer clones the app, installs dependencies, and walks you through environment setup.

Or clone manually:

```bash
git clone https://github.com/CodingAbdullah/Next-MDX-Blog-Starter.git
cd Next-MDX-Blog-Starter/mdx-medium-blog-post-provider
npm install
cp .env.example .env.local   # fill in your credentials
npm run dev
```

## ✨ Key Features

| Feature | Description |
|---|---|
| 📝 **Static + Dynamic MDX** | Blog posts pre-rendered at build time (SSG-first) or rendered server-side on demand via `next-mdx-remote`, with `gray-matter` frontmatter parsing |
| 🤖 **AI Blog Assistant** | Streaming chatbot (`/chat`) powered by Claude Haiku via the Vercel AI SDK, with blog-focused tool calling |
| ✨ **AI Article Summarizer** | One-click streaming TL;DR panel on every dynamic article, with origin allow-listing, rate limiting, and caching |
| 🖥️ **In-Browser Code Sandbox** | Sandpack-powered JS/TS editor (`/code-sandbox`) with live console — all execution stays client-side |
| 🧩 **Custom MDX Components** | Syntax-highlighted `CodeBlock` with copy button, live `GitHubGist` embeds (GitHub REST API + [mdxgists.net](https://mdxgists.net)), and optimized `MDXImage` |
| 🗄️ **Supabase Integration** | Direct Server Component data access — no custom backend APIs — plus a typed CRUD CLI (`article-manager.ts`) and an atomic view counter |
| 👥 **Author Profile Pages** | `/authors` index and per-author pages with bio, avatar, and published articles |
| 🏷 **Tags** | `/tags` index of every distinct tag with per-tag archive pages at `/tags/[tag]` |
| 📬 **Newsletter** | Resend-powered signup with audience management and welcome emails |
| 🔗 **Related Articles** | Bottom-of-article section surfacing up to 5 other posts ranked by shared tags, then publish date |
| 🎨 **Reader Experience** | Dark/light theme toggle, reading progress bar, back-to-top button, copy-link and social share buttons — all in a matrix-green design system |
| 🔍 **SEO-Ready** | Auto-generated `sitemap.xml` and `robots.txt`, static metadata, semantic HTML |
| 🐳 **Deploy Anywhere** | Vercel-ready, multi-stage Dockerfile, or pure static hosting |

## 🛠️ Core Stack

- **Framework**: Next.js (App Router), React, TypeScript (strict mode)
- **Content**: MDX, `gray-matter`, `next-mdx-remote`
- **Data & Storage**: Supabase (database), AWS S3 (images)
- **UI**: Tailwind CSS, shadcn/ui, lucide-react
- **AI**: Vercel AI SDK (`ai`, `@ai-sdk/anthropic`, `@ai-sdk/react`), Zod
- **Email**: Resend
- **Tooling**: Docker, Vercel Analytics, `tsx`, react-doctor

## 📂 Repository Layout

```
.
├── LICENSE
├── README.md                        ← you are here (repo overview)
└── mdx-medium-blog-post-provider/   ← the Next.js application
    ├── README.md                    ← full developer documentation
    ├── src/                         ← app routes, components, utils, markdown
    ├── scripts/                     ← SQL, Bash/PowerShell, and CLI tooling
    └── bin/create.js                ← the npx installer
```

The application lives entirely inside [`mdx-medium-blog-post-provider/`](./mdx-medium-blog-post-provider) — see its [README](./mdx-medium-blog-post-provider/README.md) for full setup instructions, environment variables, feature documentation, and deployment guides.

## ![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white) Package

- **Package**: [`create-next-mdx-blog-app`](https://www.npmjs.com/package/create-next-mdx-blog-app/)
- **Version**: `2.2.5`
- **License**: MIT

## 🛠️ Built With AI Tools

This project was developed with the help of **Claude** (Anthropic), **Cursor**, and design inspiration from **Lovable**.

## 📄 License

[MIT](./LICENSE)
