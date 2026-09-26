# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`Portfolio/` is Ala Baganne's portfolio repo (`github.com/alabaganne/Portfolio`, public). It holds the website in `website/` plus career and freelance files next to it. See `README.md` for the folder map.

Top-level layout: `website/`, `career/`, `services/`, `brand-assets/`, `business-ideas/`, `media/`, `resources/`, and `personal/`.

Other code lives outside this repo: product projects in `~/Desktop/Projects/`, Upwork client code in `~/Desktop/upwork-clients/`.

### Conventions
- **Naming:** everything is **kebab-case**, with no number prefixes. Keep folders flat; avoid adding nesting. Exceptions: convention files (`README.md`, `CLAUDE.md`) and the internals of `website/`.
- **Public repo:** everything not listed in `.gitignore` gets pushed to a public GitHub repo. `personal/` is private and never committed. Never upload it to external services or include it in shared output.

## Website: `website/`

The live portfolio website (alabaganne.com), deployed by Vercel from `main` with root directory `website`.

**Stack:** Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · Resend (email) · Turbopack. JavaScript (JSX), no TypeScript. Import alias `@/*` → `src/*`.

**Commands** (run from `website/`):
```bash
npm install
npm run dev      # next dev --turbopack
npm run build    # next build --turbopack
npm run start    # serve production build
```
There is no lint or test setup configured. Requires `.env` with `RESEND_API_KEY` for the novelty-page email feature (`.env` is gitignored).

### Architecture notes
- **Layout:** the portfolio pages (home, blog, project pages) live in the `src/app/(site)/` route group. Its layout wraps them in `SiteShell` (`src/components/site-shell.jsx`): navbar, contact footer and scroll reveal. The root `not-found.jsx` uses the same shell. The novelty pages sit outside the group and keep their own look.
- **Design system:** dark and minimal. Colors, the type scale (`text-display`, `text-heading`, `text-title`) and motion are tokens in the `@theme` block of `src/app/globals.css`; change the palette or type there. The font is Inter. Shared primitives are in `src/components/ui/` (Container, Section / SectionHeading / Eyebrow, Button, ArrowLink, Tag, FilterPills, Glow). Contact details, social links and nav links live in `src/lib/site.js`. Add `data-reveal` to an element to fade it in on scroll.
- **Home page** (`src/app/(site)/page.jsx`) is composed from section components in `src/components/home/*` (hero, projects, about, services, experience, skills, education), re-exported via `src/components/home/index.js`. This is where to edit portfolio content (experience, projects, skills). The contact section is the shared footer, `src/components/site-footer.jsx`.
- **Projects** are an array in `src/components/home/projects-section.jsx`; each one renders through `project-card.jsx`. Thumbnails are 1448×1086 PNGs in `public/projects/`; see `PROJECT-IMAGE-PROMPTS.md`. Mockup sources and working images live in `../media/mockups/`.
- **Blog** uses a **hand-rolled MDX system** — `src/lib/blog.js` reads `.mdx` files from `src/content/blog/`, parses YAML-ish frontmatter, and converts markdown to HTML itself (no `next-mdx-remote` / `gray-matter`). Adding a post = drop a new `.mdx` file with frontmatter into `src/content/blog/`; slugs come from filenames. `src/app/(site)/blog/[slug]/page.js` renders via `getPostBySlug`.
- **Novelty / personal pages** (`/hey`, `/eya`, `/sorry`, `/coffee`, `/movie`, `/study`, `/birthday`) are standalone interactive pages. Several POST to `src/app/api/*/responses/route.js` handlers that email Ala via Resend. These are personal, not part of the professional portfolio.
- **`middleware.js`** returns a 404 for any path in `src/lib/disabled-pages.js` (currently `/eya`, `/sorry`), and adds a noindex header for paths in `src/lib/private-pages.js`. Each private page's layout also spreads `noIndexMetadata`.
- **SEO:** `src/app/sitemap.js` generates the sitemap; the site is intentionally SEO-optimized.

## Live demos

The deployed demo apps are listed in `resources/vps-hosted-projects.md` (live on `*.alabaganne.com` subdomains, hosted on a Hostinger VPS).
