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

Like the template, the site is split into pages instead of one long page:

- **Home** (`/`): the hero, a short "• About" intro with "More about me", the Work rows and Skills.
- **About** (`/about`): "Get to know Ala", then Biography, a card with the key numbers, Experience, Education and Certifications.
- **Contact** (`/contact`): "Reach out and say hi", an intro, then Contact (email, phone, resume) and Connect (LinkedIn, GitHub, Upwork).
- **Blog** (`/blog`, `/blog/[slug]`) and case studies like `/projects/internly`.

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
- **Project cards** (`home/project-card.jsx`): solid black, 600px wide on desktop like the template's work cards. The mockup (4:3), then the name and a short tagline in `text-heading-sm` (keep the tagline under about 28 characters). On hover the card lifts 4px and a yellow arrow circle appears at the bottom right of the image.
- **Project rows** (`home/project-marquee.jsx`): two rows of cards. The first drifts left and the second drifts right. A row stops while it's hovered or focused, and can be dragged with the mouse, swiped or scrolled. After a swipe it waits 1.5s before moving again. Projects alternate between the rows, so keep the strongest ones near the top of the list.
- **Contact card** (`site-footer.jsx`): "Let's work together" on a `surface` card, with the email in yellow uppercase below it. It's on every page, above the footer links.
- **Blog cards** (`post-card.jsx`): the same card style as the projects, with the cover image, title, category and date.

## Motion

- **Page load:** a `#181817` cover wipes up over 1s (`animate-cover`, ease out expo) while the page fades in over 0.8s (`animate-page-in`, ease in expo). The cover is in `SiteShell` and runs once. The fade is in `(site)/template.jsx`, so it runs again on every page change.
- **Scroll reveal:** add `data-reveal` to fade an element up as it scrolls into view.
- **Hover:** links fade to 80%, cards lift 4px (0.3s, ease out quart), and images zoom by 3%.
- **Reduced motion:** the cover, the fade, the reveals and the drifting rows all turn off. The rows can still be scrolled by hand.

## Writing

Short, plain sentences in the first person. Section labels are one word where possible ("About", "Experience", "Skills"). Keep facts exact: don't round up numbers or claim results that aren't in the resume.
