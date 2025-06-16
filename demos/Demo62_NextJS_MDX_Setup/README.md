# 📝 Demo 62: Next.js MDX Blog Starter Kit

A fully customizable, production-ready blog starter kit built using **Next.js**, **MDX**, **Supabase**, **AWS S3**, and **React**. Easily render both static and dynamic MDX content, use custom JSX components inside Markdown, and scale using Supabase as your backend.

---

## 🚀 Features

- 🔧 MDX integration with custom JSX components
- ⚛️ Next.js App Router setup
- 💡 Dynamic & static rendering for blog content
- 🌐 Supabase as a Postgres-powered headless CMS
- 📷 Optimized image rendering with Next.js Image and AWS S3
- 🔒 Safe GitHub Gist embedding with custom component
- 📦 Custom `CodeBlock`, `MDXImage`, and `GitHubGist` components
- 🐳 Dockerfile included for containerized deployment

---

## 📁 Project Structure
```
├── src/
│ ├── app/
│ │ ├── sample-blog-post-page/ # Static content route
│ │ ├── dynamic/ # Dynamic MDX route
│ ├── components/
│ │ └── customMDXComponents/ # Custom MDX components
│ ├── markdown/ # MDX content files
│ └── utils/ # Supabase client + CRUD
├── scripts/ # SQL + utility scripts
├── .env # Environment variables
├── Dockerfile # Container setup
└── next.config.ts # MDX & S3 config
```

---

## 📦 MDX & JSX Setup

- Uses: `@mdx-js/react`, `@mdx-js/loader`, `@types/mdx`, `@next/mdx`
- MDX components defined in `mdx-components.tsx`
- Uses a `useMDXComponents()` hook to map standard tags (e.g., `h1`, `code`, `img`) to custom-styled components
- Automatically applies global styles without importing them in every file

---

## 🧱 Custom Components

### 🔹 `CodeBlock`
- Uses `react-syntax-highlighter` with the `vscDarkPlus` theme
- Easy integration of styled code snippets inside MDX

### 🔹 `GitHubGist`
- Embeds GitHub Gists securely
- Fetches Gist content using GitHub’s API and `raw_url`
- Prevents XSS by avoiding unsafe script injections

### 🔹 `MDXImage`
- Custom figure component for images
- Supports captions, alt text, sizing, and Next.js optimization

---

## 🗂 Static vs Dynamic Rendering

### 📝 Static MDX Content

- Stored locally (e.g., `ArticleContent.mdx`)
- Imported and rendered using `StaticArticle.tsx`
- Accessible via route: `/sample-blog-post-page`

### 🔄 Dynamic MDX Content

- Stored and fetched from Supabase
- Uses dynamic routing via `/dynamic/[dynamic_blog_post]`
- `DynamicArticle.tsx` handles content fetching by `slug`
- Content is rendered using `MDXRemote` from `next-remote-mdx/rsc`

---

## 🗃 Supabase Integration

- Define `.env` file:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
```
---

## 🔗 Useful Links
- <a href="https://nextjs.org/docs/pages/guides/mdx">Next.js Documentation</a>
- <a href="https://mdxjs.com/docs/">MDX Documentation</a>
- <a href="https://supabase.com/docs">Supabase Documentation</a>