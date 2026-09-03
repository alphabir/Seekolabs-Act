# seekolabs.tech

Marketing site for **SeekoLabs**, an independent digital app publishing house and product
studio based in Kolkata, India.

A single-page React app served by a small Express host. In development the host runs Vite in
middleware mode; in production it serves the prebuilt `dist/` folder.

## Stack

| Layer    | Choice                                                  |
| -------- | ------------------------------------------------------- |
| Build    | Vite 6                                                  |
| UI       | React 19, Tailwind CSS v4 (via `@tailwindcss/vite`)      |
| Icons    | lucide-react                                            |
| Host     | Express 4, bundled for production with esbuild          |

Tailwind v4 is configured through the Vite plugin, so there is no `tailwind.config.js` and no
PostCSS config. `src/index.css` is the only stylesheet.

## Getting started

```bash
npm install
npm run dev
```

The site is then available at http://localhost:3000.

## Scripts

| Script          | What it does                                                        |
| --------------- | ------------------------------------------------------------------- |
| `npm run dev`   | Runs `server.ts` through tsx with Vite in middleware mode            |
| `npm run build` | Builds the client into `dist/`, then bundles the host to `dist/server.cjs` |
| `npm start`     | Serves the production build (`node dist/server.cjs --production`)    |
| `npm run lint`  | Typechecks with `tsc --noEmit`                                       |

`npm start` passes `--production` explicitly rather than setting `NODE_ENV`, so the same
command works on Windows, macOS, and Linux. A host that sets `NODE_ENV=production` itself is
also honoured.

## Environment

Both variables are optional. See `.env.example`.

| Variable   | Default | Purpose                                            |
| ---------- | ------- | -------------------------------------------------- |
| `PORT`     | `3000`  | Port the Express host listens on                    |
| `NODE_ENV` | unset   | `production` serves `dist/` instead of starting Vite |

Cloud Run and most PaaS hosts inject `PORT` automatically.

## Layout

```
index.html          Document head: SEO, Open Graph, JSON-LD, pre-paint theme script
server.ts           Express host: /api routes + Vite middleware or static dist/
src/App.tsx         Page composition, theme state, in-page scrolling
src/components/     Navbar, Hero, AboutSection, SolutionsSection, ContactForm, Footer
src/index.css       Tailwind import, theme base colours, scroll margins
public/             Favicons, social card, robots.txt, sitemap.xml, web manifest
```

## Theming

The theme is resolved before first paint by an inline script in `index.html`, which sets
`data-theme` on `<html>` from `localStorage` or the OS preference. `src/App.tsx` reads that
value as its initial state and keeps both in sync. Components receive an explicit `theme`
prop; the `data-theme` attribute only paints the page background behind them, so overscroll
and the pre-hydration frame match.

## API

The Express host exposes a small API. The contact section currently renders `mailto:` links
rather than posting to it.

| Route               | Method | Notes                                        |
| ------------------- | ------ | -------------------------------------------- |
| `/api/health`       | GET    | Liveness check                                |
| `/api/contact`      | POST   | Requires `fullName` and `email`               |
| `/api/leads/count`  | GET    | Count of leads collected this process         |

Leads are held in memory and are lost on restart. Point this at a real datastore before
wiring the contact form up to it.

## Social preview

`public/og-image.png` is generated from `public/og-image.svg`. Edit the SVG and re-render at
1200x630 if the card needs to change; keep both files in step.
