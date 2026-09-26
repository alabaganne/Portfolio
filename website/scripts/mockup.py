# Put a desktop screenshot in the MacBook frame, and optionally a phone screenshot in an iPhone.
# usage: python3 scripts/mockup.py <desktop.png> <out.png> [--phone phone.png --bar "#hex"] [--frame frame.png]
import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = Path(__file__).resolve().parent
parser = argparse.ArgumentParser()
parser.add_argument("desktop")
parser.add_argument("out")
parser.add_argument("--phone", help="phone screenshot from capture.mjs (430 css px wide at 3x)")
parser.add_argument("--bar", default="#000000", help="status bar color, use the site's theme-color")
parser.add_argument("--frame", default=HERE.parent / "public/projects/menumate-demo.png")
args = parser.parse_args()

frame = Image.open(args.frame).convert("RGB")
px = frame.load()


def lum(p):
    return 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]


def cover(img, w, h):
    scale = max(w / img.width, h / img.height)
    img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    ox = (img.width - w) // 2
    return img.crop((ox, 0, ox + w, h))


def edge(points):
    seen_dark = False
    for x, y in points:
        v = lum(px[x, y])
        if v < 45:
            seen_dark = True
        elif seen_dark and v > 150:
            return x, y
    raise SystemExit("screen edge not found in frame")


# laptop screen: find it inside the bezel, keep the frame's notch and corners.
# Scans start on the black bezel, past the lid's bright aluminium rim.
top = edge([(400, y) for y in range(175, 400)])[1]
bottom = edge([(400, y) for y in range(900, 600, -1)])[1]
left = edge([(x, 500) for x in range(240, 500)])[0]
right = edge([(x, 500) for x in range(1208, 900, -1)])[0]
pad = 3
box = (left - pad, top - pad, right + pad + 1, bottom + pad + 1)
crop = frame.crop(box)
mask = Image.new("L", crop.size, 0)
cp, mp = crop.load(), mask.load()
for y in range(crop.height):
    for x in range(crop.width):
        if lum(cp[x, y]) < 35:
            mp[x, y] = 255
ImageDraw.floodfill(mask, (0, 0), 128)
bezel = mask.point(lambda v: 255 if v == 128 else 0)
# page starts below the notch and runs under the bezel, like a fullscreen app
nx = (left + right) // 2 + 30
band = 0
while lum(px[nx, top + band]) < 35:
    band += 1
screen = Image.new("RGB", crop.size, (0, 0, 0))
screen.paste(cover(Image.open(args.desktop).convert("RGB"), crop.width, crop.height - pad - band), (0, pad + band))
screen.paste(crop, (0, 0), bezel)
frame.paste(screen, box[:2])
canvas = frame.convert("RGBA")

if args.phone:
    mob = Image.open(args.phone).convert("RGB")
    S = 4  # draw big, then shrink for smooth edges
    PW, PH = 248, 514
    X1, Y1 = 1362, 1036
    X0, Y0 = X1 - PW, Y1 - PH
    k = PW / 220
    R_OUT, RIM, INSET = 40 * k, 2.5, 10

    for dy, alpha, blur in ((22, 150, 22), (7, 120, 7)):
        sh = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        ImageDraw.Draw(sh).rounded_rectangle((X0 + 4, Y0 + dy, X1 - 4, Y1 + dy), R_OUT, fill=(0, 0, 0, alpha))
        canvas = Image.alpha_composite(canvas, sh.filter(ImageFilter.GaussianBlur(blur)))

    M = 4  # room for the side buttons
    layer = Image.new("RGBA", ((PW + 2 * M) * S, (PH + 2 * M) * S), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)

    def r(x0, y0, x1, y1):
        return tuple(round((v + M) * S) for v in (x0, y0, x1, y1))

    btn = (58, 59, 64, 255)
    for y, h in ((86, 22), (124, 42), (174, 42)):
        d.rounded_rectangle(r(-2.2, y * k, 2, (y + h) * k), 1.5 * S, fill=btn)
    d.rounded_rectangle(r(PW - 2, 146 * k, PW + 2.2, 212 * k), 1.5 * S, fill=btn)
    d.rounded_rectangle(r(0, 0, PW, PH), R_OUT * S, fill=(88, 89, 96, 255))
    d.rounded_rectangle(r(0.8, 0.8, PW - 0.8, PH - 0.8), (R_OUT - 0.8) * S, fill=(38, 39, 44, 255))
    d.rounded_rectangle(r(RIM, RIM, PW - RIM, PH - RIM), (R_OUT - RIM) * S, fill=(5, 5, 6, 255))

    # iOS status bar above the page, sized in css px (screenshot is 3x)
    u = 3
    css_w = mob.width / u
    bar = tuple(int(args.bar.lstrip("#")[i : i + 2], 16) for i in (0, 2, 4))
    ink = (255, 255, 255) if lum(bar) < 140 else (0, 0, 0)
    dim = (150, 150, 155) if ink[0] else (110, 110, 115)
    content = Image.new("RGB", (mob.width, 47 * u + mob.height), bar)
    content.paste(mob, (0, 47 * u))
    cd = ImageDraw.Draw(content)
    font = ImageFont.truetype("/System/Library/Fonts/SFNS.ttf", 17 * u)
    font.set_variation_by_name("Semibold")
    cy = 24 * u
    cd.text((54 * u, cy), "9:41", font=font, fill=ink, anchor="mm")
    bx = (css_w - 97) * u
    for i, h in enumerate((4, 6, 8.5, 11)):
        x = bx + i * 4.6 * u
        cd.rounded_rectangle((x, cy + 5.5 * u - h * u, x + 3 * u, cy + 5.5 * u), u, fill=ink)
    wx, wy = (css_w - 68) * u, cy + 5.5 * u
    for rad in (11.5, 7.7, 3.9):
        cd.pieslice((wx - rad * u, wy - rad * u, wx + rad * u, wy + rad * u), 225, 315, fill=ink)
        inner = (rad - 2.4) * u
        cd.pieslice((wx - inner, wy - inner, wx + inner, wy + inner), 225, 315, fill=bar)
    bl, bt = (css_w - 50) * u, cy - 6 * u
    cd.rounded_rectangle((bl, bt, bl + 25 * u, bt + 12 * u), 3.8 * u, outline=dim, width=u)
    cd.rounded_rectangle((bl + 2 * u, bt + 2 * u, bl + 23 * u, bt + 10 * u), 2.2 * u, fill=ink)
    cd.rounded_rectangle((bl + 26 * u, bt + 4 * u, bl + 27.5 * u, bt + 8 * u), 0.7 * u, fill=dim)

    sw, sh_ = round((PW - 2 * INSET) * S), round((PH - 2 * INSET) * S)
    scr = cover(content, sw, sh_)
    smask = Image.new("L", scr.size, 0)
    ImageDraw.Draw(smask).rounded_rectangle((0, 0, sw - 1, sh_ - 1), (R_OUT - INSET) * S, fill=255)
    layer.paste(scr, (round((INSET + M) * S), round((INSET + M) * S)), smask)

    iw, ih, it = 64 * k, 18.5 * k, INSET + 6.5 * k
    d.rounded_rectangle(r(PW / 2 - iw / 2, it, PW / 2 + iw / 2, it + ih), ih / 2 * S, fill=(0, 0, 0, 255))

    layer = layer.resize((PW + 2 * M, PH + 2 * M), Image.LANCZOS)
    canvas.alpha_composite(layer, (X0 - M, Y0 - M))

canvas.convert("RGB").save(args.out, optimize=True)
print("saved", args.out, canvas.size)
