# Portfolio project image prompts

These prompts produced the September 2026 portfolio mockups using the built-in imagegen tool. Attach the referenced images when reusing a prompt. For websites, prefer the [scripted mockups](#scripted-website-mockups).

## References

- Web mockup and shared background: `public/projects/menumate-demo.png`.
- Light desktop window: `public/projects/backupmaster-demo.png`.
- Dark desktop window: `public/projects/promptstream-demo.png`.
- Content source: a screenshot of the project being presented.

Use the existing mockup as Image 1 and the new project's screenshot as Image 2. Keep the website or app's own colors inside the screen. Use the shared gradient outside it.

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

- Frame: `public/projects/menumate-demo.png`. The script finds its screen (941 x 626 px, top left at x=254, y=187) and keeps the frame's notch and corners.
- The page starts below the notch, with a black strip beside it, like a fullscreen app. No content sits under the notch.

### Phone (only when asked)

Add the phone only when the request asks for it. By default, show the MacBook alone.

- Size on the 1448 x 1086 canvas: 248 x 514 px, bottom right corner at x=1362, y=1036, standing in front of the laptop's right corner.
- Corner radius 45 px, screen inset 10 px, Dynamic Island 72 x 21 px, side buttons on both sides, soft navy shadow.
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
exact gradient background, MacBook Pro hardware, camera angle, size,
position, shadow and margins. Image 2 supplies only the website content.

Replace only the website inside Image 1's screen with [PROJECT NAME]
from Image 2. Preserve the source website's content, logos, typography,
colors, photographs and layout. Fit the complete main interface cleanly
within the display. Do not redesign the website or invent interface text.
Keep important content clear of the display notch.

Use the same centered, straight-on space-gray MacBook Pro, slim black
bezel, small keyboard view and complete visible laptop as Image 1.
Keep the bright cyan upper right, lavender upper left, violet lower left
and electric cobalt lower right gradient, with subtle fine grain and a
soft grounded shadow. Background colors fill every edge.

No extra devices, badges, text outside the screen, decorative shapes,
patterns, scenery, floor horizon, dramatic glow or dull dark corners.
Keep the screen crisp and the colored margins balanced.
```

## Desktop apps

```text
Use case: compositing.
Create one landscape 4:3 portfolio thumbnail, 1448 x 1086 pixels.

Image 1 is the background and framing reference. Image 2 is the native
[PROJECT NAME] app screenshot to present. Preserve the screenshot's
interface, typography, icons, colors, content and natural proportions.

Place one complete native app window directly on Image 1's bright
cyan/lavender/violet/cobalt gradient. Center it, front-on with no tilt,
at about 80% of the canvas width. Keep generous balanced margins,
rounded corners, a subtle border and a soft controlled shadow.
Keep the native window controls. If the screenshot lacks them, add
a slim integrated titlebar with small red, yellow and green controls.

No laptop, monitor, desktop wallpaper, dock, OS menu bar, extra text,
decorative objects or patterns. Do not crop or redesign the interface.
```

## BackupMaster demo adjustment

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
URL version in `src/components/home/projects-section.jsx` after replacing
assets so the previous optimized images are not served from cache.
