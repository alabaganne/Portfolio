# Design

How the portfolio looks and moves, and how to keep new pages in line with it. The look follows the [Irene](https://irene-template.webflow.io/) Webflow template: a near-black page, big uppercase headings, a pale yellow accent, lots of space, and very little decoration.

Tokens live in the `@theme` block of `src/app/globals.css`. Use the generated utilities (`bg-canvas`, `text-fg-muted`, `text-display`...) instead of raw values.

## Color

| Token | Value | Use |
| --- | --- | --- |
| `canvas` | `#0a0a09` | Page background. |
| `surface` | white at 6% | Work sheet, blog cards, the stats card, the "Let's work together" card, code blocks. |
| `surface-2` | white at 12% | Tags, secondary buttons, inline code. |
| `line` | white at 12% | Dividers between sections and list items. |
| `line-strong` | white at 18% | Hover state of secondary buttons, rings. |
| `fg` | `#ffffff` | Headings and key text. |
| `fg-muted` | white at 80% | Body paragraphs. |
| `fg-subtle` | white at 64% | Second lines (role, school, tagline), labels. |
| `fg-faint` | white at 50% | Small print: tech lists, years, copyright. |
| `accent` | `#f4fa94` | The yellow: label dots, one highlighted word per big heading, the current page in the nav, primary buttons, the email in the contact card, the hover arrow on project cards. |

Surfaces are see-through white, so they get a little lighter each time they stack. Project cards are the exception: they are solid black, image and text alike. Keep the yellow rare: one accent per heading, never whole paragraphs.

## Type

Two families from Fontshare, loaded in `site-shell.jsx` through Fontshare's CSS API:

- **Clash Display** (500, 600): every heading (`h1`–`h6` get it automatically inside `.site-shell`), nav links, buttons, tags, card titles, the logo.
- **Clash Grotesk** (400, 500): body text. Paragraphs, list items and headings get `0.015em` letter spacing and links `0.01em`, each set on the element itself (an `em` value set on a parent would be passed down as a fixed px value).

Don't copy the font files into the repo. The repo is public, and the ITF Free Font License forbids sharing the files. Loading them from Fontshare is allowed.

| Utility | Size | Used for |
| --- | --- | --- |
| `text-display` | 42 → 96px, line height 1, uppercase | Page heroes, "Let's work together". |
| `text-heading` | 36 → 64px | Blog post titles (uppercase), stat numbers. |
| `text-label` | 32 → 40px | Section labels ("• Experience"). |
| `text-title` | 24 → 32px | List item titles (company, degree), contact links, page intros. |
| `text-heading-sm` | 20 → 24px | Card titles and taglines. |
| `text-heading-xs` | 18 → 20px | Small headings: facts, certifications, the years next to "Selected work". |
| `text-lead` | 24 → 32px, white | The first paragraph of a section when it should stand out. |
| `text-body` | 18 → 20px | Paragraphs. |

Sizes are fluid between phone and desktop, and match the template at 1440px. Big headings are uppercase with a single word in `text-accent`, for example "I'm Ala, a **full-stack** engineer". Use curly apostrophes (’) in display headings.

## Pages

Recruiters skim one page, so all portfolio content is on the home page and each section appears once:

- **Home** (`/`): a compact hero (name, role, one-line pitch, job search line, "View selected work", "Download CV", main stack), Experience (every job with its summary, details and tech), Selected work (four case study rows), More projects, Skills, About (a short bio, a card with the key numbers and "How I work"), Education and Certifications. At about 1165×747 the hero and its buttons fit on the first screen and Experience starts just below. `/about` redirects to `/#about`.
- **Contact** (`/contact`): "Reach out and say hi", an intro, then Contact (email, phone, resume) and Connect (LinkedIn, GitHub, Upwork).
- **Blog** (`/blog`, `/blog/[slug]`) and case studies at `/projects/menumate`, `/projects/kartatunisie`, `/projects/internly` and `/projects/promptstream` (`components/case-study.jsx`).

Every page ends with the "Let's work together" card and the footer links.

## Layout

- **Container:** max 1400px wide with 24 / 40 / 64 / 80px side padding (phone → desktop), so content is 1240px wide on big screens.
- **Section spacing:** `sectionPadding` (64 / 96 / 144px top and bottom) from `components/ui/section.jsx`. Sections are separated by a 1px `line` divider inside the container.
- **Split sections:** most sections use `SplitSection`: a "• Label" on the left half and the content on the right half, aligned on the text baseline. On phones they stack.
- **Page heroes:** a centered uppercase `text-display` title, then a divider, then (optionally) a centered intro in Clash Display (`PageHeader`). Detail pages (a blog post, Internly) use a left-aligned title with tags underneath instead.
- **Lists:** items are split by a `line` border with 48px above and below. Titles use two lines: the name in white, the role or school in `fg-subtle`.
- **The work sheet:** the Work section sits on a full-width `surface` sheet with 24px corners.

## Components

- **Logo** (`ui/logo.jsx`): "B.Ala" in Clash Display Semibold (30px) with a yellow dot. `LogoMark` is the round "BA" mark, used as the author avatar on blog posts.
- **Favicon:** a black circle with a white "BA" in Clash Display Bold (`app/icon.svg`, `favicon.ico` and `apple-icon.png`). The letters are outlines, so it doesn't need the font. The script that made it isn't in the repo; to change it, edit `icon.svg` and export the other two from it.
- **Navbar:** 76px, sticky, `canvas` at 85% with a light blur. Links (Home, About, Blog, Contact) are Clash Display 18px. Hovering a link grows a small white dot under it; the current page is yellow with a yellow dot. On phones a menu slides in from the left.
- **Buttons** (`ui/button.jsx`): uppercase Clash Display with 1px letter spacing and 6px corners. `primary` is yellow with black text, `secondary` is `surface-2`. Sizes are 40, 48 and 56px tall. They fade a little on hover and shrink slightly when pressed.
- **Tags** (`ui/tag.jsx`): `surface-2` boxes with 6px corners and Clash Display text, in two sizes.
- **Featured work rows** (`home/projects-section.jsx`): the mockup on black next to the project's type and status, name, one-sentence summary, role, one key engineering decision, tech tags, a "Read case study" button and live links. They stack on phones. No horizontal scrolling.
- **Project cards** (`home/project-card.jsx`): the "More projects" grid (2 columns on phones, 3 on tablets, 4 on desktop). Solid black, the mockup (4:3), then the name, a short tagline and the tech. The name link covers the whole card. On hover or focus the card lifts 4px and a yellow arrow circle appears.
- **Case studies** (`components/case-study.jsx`): left-aligned title, summary, a facts row (role, type, timeline, status), tags and links, the mockup, then one split section per heading (Problem, Ownership, Constraints, Architecture, Tradeoff, Testing & reliability, Outcome, Evidence) and optional screenshots. Only add a section when its facts are verified.
- **Contact card** (`site-footer.jsx`): "Let's work together" on a `surface` card, with the email in yellow uppercase below it. It's on every page, above the footer links.
- **Blog cards** (`post-card.jsx`): the same card style as the projects, with the cover image, title, category and date.

## Motion

- **Page load:** a `#181817` cover wipes up over 0.7s (`animate-cover`, ease out expo) while the page fades in over 0.45s (`animate-page-in`, ease out quart), so text is readable almost at once. The cover is in `SiteShell` and runs once. The fade is in `(site)/template.jsx`, so it runs again on every page change.
- **Scroll reveal:** add `data-reveal` to fade an element up as it scrolls into view.
- **Hover:** links fade to 80%, cards lift 4px (0.3s, ease out quart), and images zoom by 3%.
- **Reduced motion:** the cover, the fade, the reveals, smooth scrolling and the card lift all turn off.

## Writing

Short, plain sentences in the first person. Section labels are one word where possible ("About", "Experience", "Skills"). Keep facts exact: don't round up numbers or claim results that aren't in the resume.
