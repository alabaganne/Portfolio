# Make the dark background around a mockup transparent, keeping the device shadows.
# usage: python3 scripts/cutout.py <in.png> <out.png>
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

src, out = sys.argv[1:3]
rgb = np.array(Image.open(src).convert("RGB")).astype(float)
lum = rgb @ [0.299, 0.587, 0.114]

# background = dark pixels connected to the canvas edge; the bright device rims stop it
labels, _ = ndimage.label(lum < 30)
edge_ids = np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))
outside = np.isin(labels, edge_ids[edge_ids > 0])
inside = ndimage.gaussian_filter((~outside).astype(float), 0.7)

# old background level, filled in under the device from the plain areas around it
far = outside & (ndimage.distance_transform_edt(outside) > 60)
bg = ndimage.gaussian_filter(lum * far, 40) / np.maximum(ndimage.gaussian_filter(far.astype(float), 40), 1e-6)
smooth = ndimage.gaussian_filter(lum * outside, 2) / np.maximum(ndimage.gaussian_filter(outside.astype(float), 2), 1e-6)
shadow = np.clip((1 - smooth / np.maximum(bg, 1)) - 0.1, 0, 1) / 0.9 * outside

alpha = np.maximum(inside, shadow)
color = np.where((outside & (inside < 0.01))[..., None], 0, rgb)
rgba = np.dstack([color, alpha * 255]).round().clip(0, 255).astype(np.uint8)
Image.fromarray(rgba, "RGBA").save(out, optimize=True)
print("saved", out)
