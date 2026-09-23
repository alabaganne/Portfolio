# Portfolio project image prompts

These prompts produced the September 2026 portfolio mockups using the built-in imagegen tool. Attach the referenced images when reusing a prompt.

## References

- Web mockup and shared background: `public/projects/menumate-demo.png`.
- Light desktop window: `public/projects/backupmaster-demo.png`.
- Dark desktop window: `public/projects/promptstream-demo.png`.
- Content source: a screenshot of the project being presented.

Use the existing mockup as Image 1 and the new project's screenshot as Image 2. Keep the website or app's own colors inside the screen. Use the shared gradient outside it.

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

Save previews separately until reviewed. Keep final images in
`public/projects/`, preserve the 4:3 aspect ratio, and update the image
URL version in `src/components/home/projects-section.jsx` after replacing
assets so the previous optimized images are not served from cache.
