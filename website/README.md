# Ala Baganne: Portfolio

My personal website, with selected projects, professional experience and technical writing.

**Live website:** [alabaganne.com](https://alabaganne.com)

**Vercel alias:** [alabaganne.vercel.app](https://alabaganne.vercel.app)

## Stack

Next.js 15, React 19 and Tailwind CSS 4. Content is stored in the repository; the blog uses MDX files.

## Run locally

```sh
git clone https://github.com/alabaganne/Portfolio.git
cd Portfolio/website
npm ci
npm run dev
```

Open http://localhost:3000. Optional service configuration is documented in `.env.example`; keep real credentials in a local environment file.

```sh
npm run build
npm start
```

## Content

- `src/components/home/`: home page sections (hero, work, about, services, experience, skills, education).
- `src/components/site-footer.jsx`: the contact section at the bottom of every page.
- `src/lib/site.js`: contact details, social links and navigation.
- `src/app/globals.css`: design tokens (colors, type scale, motion) and blog post styles.
- `src/content/blog/`: blog posts.
- `public/projects/`: project screenshots.
- `src/app/layout.jsx`: page metadata and canonical website URL.

## Deployment

The GitHub repository is connected to the Vercel project `portfolio`, with its root directory set to `website`. Both `alabaganne.com` and `www.alabaganne.com` are assigned to its production deployment. Use the custom domain when sharing this portfolio.

## Contact

[Ala Baganne](https://alabaganne.com) · [LinkedIn](https://www.linkedin.com/in/alabaganne/)
