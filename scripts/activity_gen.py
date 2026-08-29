#!/usr/bin/env python3
"""
activity_gen.py - Generate a stunning, copper-themed area chart 
of GitHub contributions over the last year.
"""

import urllib.request
import re
from pathlib import Path

UA = {"User-Agent": "activity_gen.py"}

THEME = {
    "bg": "#0d1117",
    "border": "#30363d",
    "title": "#DD8A53",
    "text": "#c9d1d9",
    "muted": "#8b949e",
    "value": "#e6edf3",
    "accent": "#DD8A53"
}

def get_contributions(user: str):
    url = f"https://github.com/users/{user}/contributions"
    req = urllib.request.Request(url, headers=UA)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            html = r.read().decode()
    except Exception as e:
        print(f"Failed to fetch contributions: {e}")
        return []

    pattern = r'<tool-tip[^>]*>(\d+|No) contributions? on ([^<]+)</tool-tip>'
    days = []
    for match in re.finditer(pattern, html):
        count_str = match.group(1)
        count = 0 if count_str == 'No' else int(count_str)
        days.append(count)
        
    return days

def generate_activity_graph(user: str, out: Path):
    days = get_contributions(user)
    if not days:
        # Fallback dummy data if scraping fails
        days = [0] * 365
        for i in range(0, 365, 7):
            days[i] = (i % 15)
            
    # Group by weeks to smooth the graph
    weeks = []
    for i in range(0, len(days), 7):
        weeks.append(sum(days[i:i+7]))
        
    if not weeks:
        return
        
    width = 800
    height = 200
    padding_x = 40
    padding_y = 50
    graph_w = width - (padding_x * 2)
    graph_h = height - (padding_y * 1.5)
    
    max_val = max(weeks)
    if max_val == 0:
        max_val = 1
        
    # Generate path coordinates
    points = []
    num_weeks = len(weeks)
    for i, val in enumerate(weeks):
        x = padding_x + (i * (graph_w / (num_weeks - 1)))
        y = padding_y + graph_h - ((val / max_val) * graph_h)
        points.append((x, y))
        
    # Create smooth cubic bezier curve
    path_d = f"M {points[0][0]} {points[0][1]}"
    
    # We will use simple line for now, but smooth curve is better
    # A simple smoothing strategy: control points at x + distance/3
    for i in range(len(points) - 1):
        p0 = points[i]
        p1 = points[i+1]
        dist_x = (p1[0] - p0[0]) * 0.5
        path_d += f" C {p0[0] + dist_x} {p0[1]}, {p1[0] - dist_x} {p1[1]}, {p1[0]} {p1[1]}"
        
    # Area path (closes the shape down to the baseline)
    area_d = path_d + f" L {points[-1][0]} {padding_y + graph_h} L {points[0][0]} {padding_y + graph_h} Z"
    
    # Try to load the stats card to combine them
    stats_svg = ""
    stats_h = 150
    try:
        stats_file = out / "card-stats-dark.svg"
        if stats_file.exists():
            content = stats_file.read_text(encoding="utf-8")
            h_match = re.search(r'height="(\d+)"', content)
            if h_match:
                stats_h = int(h_match.group(1))
            body_match = re.search(r'<rect[^>]+/>(.*)</svg>', content, flags=re.DOTALL)
            if body_match:
                stats_svg = body_match.group(1)
    except Exception as e:
        print(f"Failed to merge stats card: {e}")
        
    total_height = stats_h + height
    
    svg = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {total_height}" width="100%" height="{total_height}">',
        f'<defs>',
        f'  <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">',
        f'  <style>',
        f'    text {{ font-family: ui-sans-serif,-apple-system,Segoe UI,Helvetica,Arial,sans-serif; }}',
        f'  </style>',
        f'    <stop offset="0%" stop-color="{THEME["accent"]}" stop-opacity="0.6" />',
        f'    <stop offset="100%" stop-color="{THEME["accent"]}" stop-opacity="0.0" />',
        f'  </linearGradient>',
        f'</defs>',
        f'<rect x="0.5" y="0.5" width="{width-1}" height="{total_height-1}" rx="10" fill="{THEME["bg"]}" stroke="{THEME["border"]}"/>',
    ]
    
    # Embed stats card horizontally centered
    if stats_svg:
        offset_x = (width - 480) / 2
        svg.append(f'<g transform="translate({offset_x}, 0)">')
        svg.append(stats_svg)
        svg.append('</g>')
        
        # Add a subtle separator line between the two sections
        svg.append(f'<line x1="22" y1="{stats_h}" x2="{width-22}" y2="{stats_h}" stroke="{THEME["border"]}" stroke-width="1" />')

    # Add the activity graph in a translated group
    svg.append(f'<g transform="translate(0, {stats_h})">')
    svg.append(f'<text x="22" y="32" font-family="sans-serif" font-size="16" font-weight="bold" fill="{THEME["title"]}">Contribution Activity</text>')
    svg.append(f'<text x="{width-22}" y="32" font-family="sans-serif" font-size="12" text-anchor="end" fill="{THEME["muted"]}">{sum(days)} contributions in the last year</text>')
    
    # The area fill
    svg.append(f'<path d="{area_d}" fill="url(#grad)" />')
    
    # The line stroke
    svg.append(f'<path d="{path_d}" fill="none" stroke="{THEME["accent"]}" stroke-width="2" />')
    
    # Grid lines (optional, maybe just baseline)
    baseline_y = padding_y + graph_h
    svg.append(f'<line x1="{padding_x}" y1="{baseline_y}" x2="{width - padding_x}" y2="{baseline_y}" stroke="{THEME["border"]}" stroke-dasharray="4" />')
    
    # Min/Max labels
    svg.append(f'<text x="{padding_x - 10}" y="{padding_y + 4}" font-family="sans-serif" font-size="10" text-anchor="end" fill="{THEME["muted"]}">{max_val}</text>')
    svg.append(f'<text x="{padding_x - 10}" y="{baseline_y + 4}" font-family="sans-serif" font-size="10" text-anchor="end" fill="{THEME["muted"]}">0</text>')
    
    svg.append('</g>')
    svg.append('</svg>')
    
    out_file = out / "activity.svg"
    out_file.write_text("\n".join(svg), encoding="utf-8")
    print(f"wrote {out_file.name}")

if __name__ == "__main__":
    out_dir = Path("assets")
    out_dir.mkdir(exist_ok=True)
    generate_activity_graph("InnoShay", out_dir)
