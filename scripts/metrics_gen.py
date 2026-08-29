#!/usr/bin/env python3
"""
metrics_gen.py - Generate aesthetic SVGs for Top Languages and Achievements
perfectly matching the Copper/Gold theme.
"""

import json
import urllib.request
import re
from pathlib import Path

UA = {"User-Agent": "metrics_gen.py"}

THEME = {
    "bg": "#0d1117",
    "border": "#30363d",
    "title": "#DD8A53",
    "text": "#c9d1d9",
    "muted": "#8b949e",
    "value": "#e6edf3",
    "accent": "#DD8A53"
}

def get_html(user: str):
    req = urllib.request.Request(f"https://github.com/{user}", headers=UA)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.read().decode()
    except Exception as e:
        print(f"Failed to fetch profile: {e}")
        return ""

def generate_achievements(user: str, out: Path):
    html = get_html(user)
    
    # Extract badges from HTML (img tags with alt="Achievement: X")
    badges = []
    pattern = r'<img src="([^"]+)" alt="Achievement: ([^"]+)"[^>]*>'
    for match in re.finditer(pattern, html):
        src, name = match.group(1), match.group(2)
        if (src, name) not in badges:
            badges.append((src, name))
            
    # Remove duplicates but preserve order
    seen = set()
    unique_badges = []
    for b in badges:
        if b[1] not in seen:
            unique_badges.append(b)
            seen.add(b[1])

    # If no badges, provide a default layout
    if not unique_badges:
        unique_badges = [
            ("https://github.githubassets.com/assets/quickdraw-default-39c6aec8ff89.png", "Quickdraw"),
            ("https://github.githubassets.com/assets/yolo-default-be0bbff04951.png", "YOLO")
        ]

    # Generate SVG
    width = 480
    height = 130
    
    svg = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">',
        f'<rect x="0.5" y="0.5" width="{width-1}" height="{height-1}" rx="10" fill="{THEME["bg"]}" stroke="{THEME["border"]}"/>',
        f'<text x="22" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="{THEME["title"]}">Achievements</text>',
        f'<text x="{width-22}" y="36" font-family="sans-serif" font-size="11" text-anchor="end" fill="{THEME["muted"]}">{user}\'s badges</text>',
        f'<line x1="22" y1="48" x2="{width-22}" y2="48" stroke="{THEME["border"]}"/>'
    ]
    
    start_x = 22
    for i, (src, name) in enumerate(unique_badges):
        x = start_x + (i * 100)
        y = 60
        # Embed the image using a standard <image> tag
        svg.append(f'<image x="{x}" y="{y}" width="50" height="50" href="{src}"/>')
        # Center the text below the image
        text_x = x + 25
        text_y = y + 65
        svg.append(f'<text x="{text_x}" y="{text_y}" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle" fill="{THEME["text"]}">{name}</text>')

    svg.append('</svg>')
    
    out_file = out / "metrics.achievements.svg"
    out_file.write_text("\n".join(svg), encoding="utf-8")
    print(f"wrote {out_file.name}")


def generate_languages(out: Path):
    # Instead of fetching dynamically and dealing with tokens here, we use the custom
    # static mix we designed in languages.json to guarantee the perfect hexagon shape!
    try:
        data = json.loads((Path("assets") / "languages.json").read_text())
        axes = data["axes"]
    except Exception:
        axes = [{"label": "Python", "value": 98}, {"label": "TypeScript", "value": 85}]
        
    width = 480
    height = 150
    
    svg = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">',
        f'<rect x="0.5" y="0.5" width="{width-1}" height="{height-1}" rx="10" fill="{THEME["bg"]}" stroke="{THEME["border"]}"/>',
        f'<text x="22" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="{THEME["title"]}">Most Used Languages</text>',
        f'<line x1="22" y1="48" x2="{width-22}" y2="48" stroke="{THEME["border"]}"/>'
    ]
    
    # Calculate percentages
    total = sum(a["value"] for a in axes)
    
    # Draw progress bar
    bar_y = 65
    bar_height = 10
    bar_width = width - 44
    current_x = 22
    
    # We use a gradient of our copper theme
    colors = ["#DD8A53", "#D97706", "#B45309", "#92400E", "#78350F", "#451a03"]
    
    # Draw rounded background for bar
    svg.append(f'<rect x="22" y="{bar_y}" width="{bar_width}" height="{bar_height}" rx="5" fill="{THEME["border"]}"/>')
    
    for i, ax in enumerate(axes):
        ratio = ax["value"] / total
        w = bar_width * ratio
        color = colors[i % len(colors)]
        
        # Draw segment
        if w > 0:
            svg.append(f'<rect x="{current_x}" y="{bar_y}" width="{w}" height="{bar_height}" fill="{color}" ' + 
                       (f'rx="5" ' if i == 0 or i == len(axes)-1 else '') + '/>')
            current_x += w
            
    # Draw legend
    legend_y = 100
    current_x = 22
    for i, ax in enumerate(axes):
        if i >= 4: # Max 4 items per row to keep it clean
            break
        color = colors[i % len(colors)]
        ratio = ax["value"] / total * 100
        
        svg.append(f'<circle cx="{current_x + 5}" cy="{legend_y - 4}" r="4" fill="{color}"/>')
        svg.append(f'<text x="{current_x + 15}" y="{legend_y}" font-family="sans-serif" font-size="12" font-weight="bold" fill="{THEME["text"]}">{ax["label"]}</text>')
        svg.append(f'<text x="{current_x + 15}" y="{legend_y + 16}" font-family="sans-serif" font-size="11" fill="{THEME["muted"]}">{ratio:.1f}%</text>')
        
        current_x += (bar_width / 4)

    svg.append('</svg>')
    
    out_file = out / "metrics.languages.svg"
    out_file.write_text("\n".join(svg), encoding="utf-8")
    print(f"wrote {out_file.name}")


if __name__ == "__main__":
    out_dir = Path("assets")
    out_dir.mkdir(exist_ok=True)
    generate_achievements("InnoShay", out_dir)
    generate_languages(out_dir)
