# 📘 AA Docs

This is documentation site is built with [VitePress](https://vitepress.dev).

---

## 📁 Project Structure

```
docs/
  guide/            → Technical guides
  examples/         → Integration and usage examples
  index.md          → Home page
  support.md        → Community help, contact
.vitepress/
  config.ts         → Site and theme configuration
```

---

## 📝 Adding New Docs Pages

### 1. Create a New Markdown File

Add your `.md` file to either:

- `docs/guide/` for general documentation
- `docs/examples/` for code/integration examples

Example:

```bash
touch docs/guide/new-feature.md
```

### 2. (optional) Add Frontmatter

Add header:

```md
---
title: New Feature
outline: deep  # or 'false' to disable right-hand table of contents
---
```

Or any other Frontmatter features.

👉 [Frontmatter Docs](https://vitepress.dev/guide/frontmatter)

### 3. Update the Sidebar

Edit `docs/.vitepress/config.ts` and add your page to the appropriate section:

```ts
sidebar: {
  "/guide/": [
    {
      text: "Guide",
      items: [
        { text: "Tech stack", link: "/guide/tech-stack" },
        { text: "New Feature", link: "/guide/new-feature" } // 👈 Add this
      ]
    }
  ]
}
```

### 4. Optional: Add to Navbar

To expose a new top-level page in the navigation:

```ts
nav: [
  { text: "New Feature", link: "/guide/new-feature" }
]
```

---

## 🚀 Local Development

Start the development server:

```bash
npm run docs:dev
```

Preview your built site:

```bash
npm run docs:preview
```

---

## 📦 Build for Production

```bash
npm run docs:build
```

---

## 🚢 Deploy to GitHub Pages

This project uses [`gh-pages`](https://www.npmjs.com/package/gh-pages) to deploy to GitHub Pages.

### Steps

1. **Build** the site:

    ```bash
    npm run docs:build
    ```

2. **Deploy** to the `gh-pages` branch:

    ```bash
    npm run deploy
    ```

---

## 🔗 Resources

- [VitePress Docs](https://vitepress.dev)
- [Theme Config](https://vitepress.dev/reference/default-theme-config)
- [Sidebar Config](https://vitepress.dev/guide/theme-sidebar)
- [Markdown Guide](https://vitepress.dev/guide/markdown)
