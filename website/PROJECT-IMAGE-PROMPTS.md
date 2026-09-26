# Portfolio project image prompts

These prompts produced the September 2026 portfolio mockups using the built-in imagegen tool. Attach the referenced images when reusing a prompt. For websites, prefer the [scripted mockups](#scripted-website-mockups).

Every mockup shows the same MacBook on a near-black background (about `#0a0a0c`, with a faint cool light at the top right), to match the dark website. The earlier mockups sat on a bright cyan/lavender/violet/cobalt gradient; they were moved onto the dark background by keeping the laptop and each project's screen pixels and replacing only the backdrop. Desktop apps are shown on the MacBook screen, with the old gradient as the desktop wallpaper.

## References

- Web mockup and shared background: `public/projects/menumate-demo.png`.
- Desktop app on the MacBook screen: `public/projects/backupmaster-demo.png` (light app) and `public/projects/promptstream-demo.png` (dark app).
- Content source: a screenshot of the project being presented.

Use the existing mockup as Image 1 and the new project's screenshot as Image 2. Keep the website or app's own colors inside the screen. Keep the dark background outside it.

## Scripted website mockups

For websites that open in a browser, use the scripts in `scripts/` instead of the prompts. They place real screenshots in the same MacBook frame, so nothing gets redrawn. ABSoft, Taroura Arena, Karta and Internly were made this way.

1. Take the screenshots:

   ```sh
   node scripts/capture.mjs <url> desktop /tmp/desk.png [--reduce-motion]
   node scripts/capture.mjs <url> phone /tmp/phone.png [--reduce-motion]
   ```

   - `desktop`: 1440 x 960 css px at 2x, the same shape as the MacBook screen. Don't zoom out (a 1920 px view was tried and rejected: the text got too small and the hero lost its punch).
   - `phone`: 430 x 885 css px at 3x, with an iPhone user agent and touch. Chrome windows can't go below about 500 px wide, so the script uses Chrome's device emulation instead of resizing a window.
   - `--reduce-motion` shows the page's still poster instead of a random video frame (used for Taroura Arena).
   - `--cookie=name=value` sets a cookie before loading, for example `--cookie=karta_consent=no` so the cookie banner doesn't cover the page.
   - `--width` and `--height` change the view. Keep width / height at about 1.5. When a hero is shorter than the screen, pick the width so the view ends just past the hero: the start of the next section's background shows, but none of its text. ABSoft uses `--width=1360 --height=905`.
   - Run the site locally when it has changes that aren't live yet. For a Next.js site, use a production build (`next build` and `next start`), because the dev server adds its own badge to the page.
   - For apps behind a login, sign in inside the same Chrome session, then take the screenshots. Internly's login form comes filled in with a demo account, so the script only clicks "Log in".

2. Build the mockup (needs Chrome and Pillow: `pip install pillow`):

   ```sh
   python3 scripts/mockup.py /tmp/desk.png ../media/mockups/<name>-demo-draft.png
   python3 scripts/mockup.py /tmp/desk.png ../media/mockups/<name>-demo-draft.png --phone /tmp/phone.png --bar "#241C68"
   ```

### MacBook

- Frame: `public/projects/menumate-demo.png`, the MacBook on the dark background. The script finds its screen (941 x 626 px, top left at x=254, y=187) and keeps the frame's notch and corners.
- The page starts below the notch, with a black strip beside it, like a fullscreen app. No content sits under the notch.

### Phone (only when asked)

Add the phone only when the request asks for it. By default, show the MacBook alone.

- Size on the 1448 x 1086 canvas: 248 x 514 px, bottom right corner at x=1362, y=1036, standing in front of the laptop's right corner.
- Corner radius 45 px, screen inset 10 px, Dynamic Island 72 x 21 px, side buttons on both sides, soft black shadow.
- iOS status bar (9:41, signal, wifi, battery), 47 css px tall, in the site's `theme-color`, like Safari. Pass the color with `--bar`.
- The phone can show a different page of the same project when that tells the story better. For example, MenuMate's landing page on the MacBook and a restaurant's public menu page on the phone. For ABSoft and Taroura Arena, both devices show the landing page.
- The phone screen should end cleanly, with no content cut at the bottom. If the hero doesn't fit, fix the site's mobile layout (ABSoft hides its photo on phones and lets the hero fill the first screen).

### Project pages with more screenshots

Some projects get their own page with plain app screenshots, no mockup and no browser bar (for example `/projects/internly`). Capture them at 1440 x 900 at 2x, save them as WebP in `public/projects/<name>/`, and link the page from the card with `details: "/projects/<name>"`.

## Web apps, landing pages and online stores

```text
Use case: compositing / product-mockup.
Create one landscape 4:3 portfolio thumbnail, 1448 x 1086 pixels.

Image 1 is the edit target and strict presentation template. Preserve its
exact dark background, MacBook Pro hardware, camera angle, size,
position, shadow and margins. Image 2 supplies only the website content.

Replace only the website inside Image 1's screen with [PROJECT NAME]
from Image 2. Preserve the source website's content, logos, typography,
colors, photographs and layout. Fit the complete main interface cleanly
within the display. Do not redesign the website or invent interface text.
Keep important content clear of the display notch.

Use the same centered, straight-on space-gray MacBook Pro, slim black
bezel, small keyboard view and complete visible laptop as Image 1.
Keep the near-black charcoal background (about #0a0a0c) with a faint
cool light at the top right and subtle fine grain. Keep the aluminium a
neutral silver grey. Background colors fill every edge.

No extra devices, badges, text outside the screen, decorative shapes,
patterns, scenery, floor horizon or colored glow. Keep the screen crisp
and the margins balanced.
```

## Desktop apps

```text
Use case: compositing.
Create one landscape 4:3 portfolio thumbnail, 1448 x 1086 pixels.

Image 1 is the MacBook mockup on the dark background. Image 2 is the
native [PROJECT NAME] app screenshot to present. Preserve the screenshot's
interface, typography, icons, colors, content and natural proportions.

Keep Image 1's laptop, camera angle, dark background and margins exactly.
Fill the MacBook screen with a soft cyan, lavender, violet and cobalt
gradient wallpaper, and place one complete native app window on it,
centered and front-on, at about 80% of the screen width, with rounded
corners, a subtle border and a soft shadow. Keep the native window
controls. If the screenshot lacks them, add a slim integrated titlebar
with small red, yellow and green controls.

No dock, OS menu bar, extra text, decorative objects or patterns.
Do not crop or redesign the interface.
```

## BackupMaster demo adjustment

The two edits below were made on the old gradient thumbnails, before the app windows moved onto the MacBook screen.

```text
Remove the entire yellow device-trust notice, including its icon,
message and button. Move the scan panel up immediately below the
Overview heading and device subtitle. Move the backup list upward
by the same amount, keeping the original gap between the panels.
Preserve both panels' sizes, text, controls and row layouts.

Keep the app window's exact outer height, width and position. Leave
the sidebar, titlebar, controls, footer, background gradient and shadow
unchanged. Fill the newly empty lower area with the same off-white
window background. This change is for the demo image only.
```

## Optional PromptStream dictation badge

```text
Edit the existing PromptStream thumbnail. Add one small floating
dictation pill at the bottom center, in the gradient below the app.
Keep the app window, interface, canvas, gradient and shadow unchanged.

On a 1448 x 1086 canvas, center the pill around x=724, y=992.
Use a roughly 250 x 62 pixel rounded capsule with a dark charcoal
surface matching the app, a subtle border and a soft shadow.
Inside, place an amber waveform of five or seven rounded vertical
bars, followed by clear off-white text reading exactly "Dictating…".
Use about 24 pixel text and balanced padding. Keep a visible gap
above the pill, without covering the app or touching the canvas edge.
Add no other decorations or text.
```

## Replacing an image

Save previews separately until reviewed, as `../media/mockups/<name>-demo-draft.png`. Keep final images in
`public/projects/`, preserve the 4:3 aspect ratio, and update the image
URL version in `src/components/home/project-card.jsx` after replacing
assets so the previous optimized images are not served from cache.
