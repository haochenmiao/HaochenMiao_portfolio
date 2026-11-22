#!/usr/bin/env python3
"""Generate a 1200x675 (16:9) blog cover placeholder with a vertical gradient
and a centered title. Used when a real screenshot of the post isn't available
(Cloudflare blocks, LinkedIn login wall, etc.).

Usage:
  python3 scripts/make_blog_placeholder.py <output.jpg> "<title>" <top_hex> <bottom_hex>

Example:
  python3 scripts/make_blog_placeholder.py \\
      assets/img/blogs/pycaret-stock.jpg \\
      "PyCaret · Stock Prediction" \\
      "#0f2a1a" "#17d672"
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 675
TITLE_SIZE = 48
TITLE_COLOR = (255, 255, 255)

# Prefer Space Grotesk if it's installed anywhere on the system; otherwise fall
# back through other sans-serifs so the placeholder always renders something.
FONT_CANDIDATES = [
    "~/Library/Fonts/SpaceGrotesk-SemiBold.ttf",
    "~/Library/Fonts/SpaceGrotesk-Medium.ttf",
    "/Library/Fonts/SpaceGrotesk-SemiBold.ttf",
    "/System/Library/Fonts/HelveticaNeue.ttc",
    "/System/Library/Fonts/Helvetica.ttc",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/Library/Fonts/Arial.ttf",
]

def load_font(size: int):
    for path in FONT_CANDIDATES:
        p = Path(path).expanduser()
        if p.exists():
            try:
                return ImageFont.truetype(str(p), size)
            except Exception:
                continue
    return ImageFont.load_default()

def hex_to_rgb(h: str):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))

def gradient(top: str, bottom: str) -> Image.Image:
    """Vertical gradient from top color to bottom color."""
    t = hex_to_rgb(top)
    b = hex_to_rgb(bottom)
    img = Image.new("RGB", (W, H))
    px = img.load()
    for y in range(H):
        f = y / (H - 1)
        row = tuple(int(t[c] + (b[c] - t[c]) * f) for c in range(3))
        for x in range(W):
            px[x, y] = row
    return img

def render(out_path: Path, title: str, top: str, bottom: str) -> None:
    img = gradient(top, bottom)
    draw = ImageDraw.Draw(img)
    font = load_font(TITLE_SIZE)
    # Center the title; Pillow's textbbox gives tight bounds including descent.
    bbox = draw.textbbox((0, 0), title, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (W - tw) // 2 - bbox[0]
    y = (H - th) // 2 - bbox[1]
    draw.text((x, y), title, fill=TITLE_COLOR, font=font)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path, "JPEG", quality=88, optimize=True)
    print(f"wrote {out_path}  ({W}x{H})")

def main():
    if len(sys.argv) != 5:
        print(__doc__)
        sys.exit(1)
    out = Path(sys.argv[1])
    title = sys.argv[2]
    top = sys.argv[3]
    bottom = sys.argv[4]
    render(out, title, top, bottom)

if __name__ == "__main__":
    main()
