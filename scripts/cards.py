#!/usr/bin/env python3
"""
cards.py - render GitHub stat and repo cards as SVGs. Stdlib only.

Replaces github-readme-stats / github-profile-trophy / streak-stats, which are
shared public instances that go down (503), run out of quota (402) or time out.
These are files in your own repo, so they render as long as GitHub renders.

    python scripts/cards.py --user InnoShay --out assets

Writes <out>/card-stats-{dark,light}.svg plus one card per repo listed in
assets/projects.json, as <out>/card-<repo>-{dark,light}.svg.

Star and fork counts come from the live API on every run. Descriptions come from
projects.json when set, otherwise the repo's own GitHub description.

A token in $GITHUB_TOKEN unlocks the contribution and streak numbers (they need
the GraphQL API). Without one the card still renders, minus those three tiles.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

UA = {"User-Agent": "cards.py"}

THEMES = {
    "dark": {
        "bg": "#0d1117", "border": "#30363d", "title": "#DD8A53",
        "text": "#c9d1d9", "muted": "#8b949e", "value": "#e6edf3",
        "accent": "#DD8A53",
    },
    "light": {
        "bg": "#ffffff", "border": "#d0d7de", "title": "#1a7f37",
        "text": "#1f2328", "muted": "#57606a", "value": "#1f2328",
        "accent": "#1a7f37",
    },
}

# GitHub linguist colours for the languages likely to show up here
LANG_COLOR = {
    "JavaScript": "#f1e05a", "TypeScript": "#3178c6", "Python": "#3572A5",
    "HTML": "#e34c26", "CSS": "#563d7c", "C++": "#f34b7d", "C": "#555555",
    "Java": "#b07219", "Go": "#00ADD8", "Rust": "#dea584", "Shell": "#89e051",
    "PLpgSQL": "#336790", "Vue": "#41b883", "Ruby": "#701516", "PHP": "#4F5D95",
    "Jupyter Notebook": "#DA5B0B", "SCSS": "#c6538c", "Svelte": "#ff3e00",
}

FONT = "ui-sans-serif,-apple-system,Segoe UI,Helvetica,Arial,sans-serif"

ICON_STAR = ("M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 "
             "2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 "
             "01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z")
ICON_FORK = ("M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 "
             "111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 "
             "0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 "
             "10-1.5 0 .75.75 0 001.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-3 "
             "8.75a.75.75 0 100-1.5.75.75 0 000 1.5z")
ICON_REPO = ("M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 "
             "0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 "
             "012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 "
             "12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 "
             "00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z")


def icon(path, x, y, size, fill):
    s = size / 16
    return (f'<path transform="translate({x:.1f},{y:.1f}) scale({s:.3f})" '
            f'fill="{fill}" d="{path}"/>')


def rest(path: str, token: str | None):
    req = urllib.request.Request("https://api.github.com" + path, headers=dict(UA))
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())


def graphql(query: str, variables: dict, token: str):
    body = json.dumps({"query": query, "variables": variables}).encode()
    req = urllib.request.Request("https://api.github.com/graphql", data=body,
                                 headers={**UA, "Content-Type": "application/json",
                                          "Authorization": f"Bearer {token}"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())


CONTRIB_QUERY = """
query($login:String!){
  user(login:$login){
    contributionsCollection{
      contributionCalendar{
        totalContributions
        weeks{ contributionDays{ date contributionCount } }
      }
    }
  }
}
"""


def fetch_contributions(user: str, token: str | None):
    """Return (total_data, current_data, longest_data) dictionaries or None."""
    if not token:
        return None
    try:
        data = graphql(CONTRIB_QUERY, {"login": user}, token)
    except urllib.error.HTTPError as e:
        print(f"  contributions unavailable (HTTP {e.code})", file=sys.stderr)
        return None
    if data.get("errors"):
        print(f"  contributions unavailable: {data['errors'][0].get('message')}",
              file=sys.stderr)
        return None

    cal = data["data"]["user"]["contributionsCollection"]["contributionCalendar"]
    days = [(dt.date.fromisoformat(d["date"]), d["contributionCount"])
            for w in cal["weeks"] for d in w["contributionDays"]]
    days.sort()

    longest = run = 0
    longest_end = None
    for date, c in days:
        if c > 0:
            run += 1
            if run > longest:
                longest = run
                longest_end = date
        else:
            run = 0

    current = 0
    current_end = None
    for date, c in reversed(days):
        if c > 0:
            if current_end is None:
                current_end = date
            current += 1
        elif date != days[-1][0]:
            break
            
    # Format the dates
    def fmt_date(d1, d2):
        if not d1 or not d2:
            return ""
        today = days[-1][0]
        if d2 == today:
            return f"{d1.strftime('%b')} {d1.day}, {d1.year} - Present"
        if d1.year == d2.year:
            return f"{d1.strftime('%b')} {d1.day} - {d2.strftime('%b')} {d2.day}"
        return f"{d1.strftime('%b')} {d1.day}, {d1.year} - {d2.strftime('%b')} {d2.day}, {d2.year}"

    total_data = {
        "count": cal["totalContributions"], 
        "date": fmt_date(days[0][0], days[-1][0]) if days else ""
    }
    
    if longest > 0:
        longest_start = longest_end - dt.timedelta(days=longest-1)
        longest_date = fmt_date(longest_start, longest_end)
    else:
        longest_date = ""
        
    longest_data = {"count": longest, "date": longest_date}
    
    if current > 0:
        current_start = current_end - dt.timedelta(days=current-1)
        current_date = fmt_date(current_start, current_end)
    else:
        current_date = ""
        
    current_data = {"count": current, "date": current_date}
        
    return total_data, current_data, longest_data


def esc(s: str) -> str:
    return (str(s).replace("&", "&amp;").replace("<", "&lt;")
            .replace(">", "&gt;").replace('"', "&quot;"))


def text_width(s: str, size: float) -> float:
    return len(s) * size * 0.53


def wrap(text: str, size: float, max_w: float, max_lines: int) -> list[str]:
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if text_width(trial, size) <= max_w or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
            if len(lines) == max_lines:
                break
    if cur and len(lines) < max_lines:
        lines.append(cur)
    if len(lines) == max_lines and words:
        used = len(" ".join(lines).split())
        if used < len(words):
            while lines and text_width(lines[-1] + "…", size) > max_w:
                lines[-1] = lines[-1].rsplit(" ", 1)[0]
            lines[-1] += "…"
    return lines


def frame(w, h, c, body, label):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'width="{w}" height="{h}" role="img" aria-label="{esc(label)}" '
        f'font-family="{FONT}">'
        f'<rect x="0.5" y="0.5" width="{w - 1}" height="{h - 1}" rx="10" '
        f'fill="{c["bg"]}" stroke="{c["border"]}"/>'
        f"{body}</svg>"
    )


def render_stats(user, total_data, current_data, longest_data, theme):
    c = THEMES[theme]
    W, H = 460, 150
    
    ICON_FLAME = "M8.498 0C8.498 0 5 3.125 5 5.729c0 2.188 1.5 4.167 1.5 4.167s-1-1.563-1-3.125c0 0-3 1.563-3 4.688C2.5 15.104 5 16.667 8 16.667s5.5-1.563 5.5-5.208c0-3.125-3-4.688-3-4.688 0 1.563-1 3.125-1 3.125s1.5-1.562 1.5-4.167C11.5 3.125 8.498 0 8.498 0z"

    # We do NOT use the frame() wrapper for the stats card anymore because we want it to 
    # seamlessly integrate into activity_gen.py without rendering its own <rect> background.
    # Actually, activity_gen.py extracts everything inside the <svg> BUT strips out the <rect>
    # using regex! So we can just return a standard SVG here, and activity_gen will parse it.
    
    out = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" font-family="{FONT}">',
        f'<rect width="{W}" height="{H}" fill="none"/>'
    ]
    
    cols = [76, 230, 384]
    
    out.append(f'<text x="{cols[0]}" y="65" font-size="34" font-weight="bold" fill="{c["value"]}" text-anchor="middle">{total_data["count"]}</text>')
    out.append(f'<text x="{cols[0]}" y="100" font-size="14" fill="{c["muted"]}" text-anchor="middle">Total Contributions</text>')
    out.append(f'<text x="{cols[0]}" y="125" font-size="12" fill="{c["muted"]}" text-anchor="middle">{total_data["date"]}</text>')

    cx, cy = cols[1], 55
    r = 28
    out.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{c["accent"]}" stroke-width="4"/>')
    out.append(f'<path transform="translate({cx-12},{cy-r-16}) scale(1.5)" fill="{c["accent"]}" d="{ICON_FLAME}"/>')
    out.append(f'<text x="{cx}" y="{cy+11}" font-size="30" font-weight="bold" fill="{c["value"]}" text-anchor="middle">{current_data["count"]}</text>')
    out.append(f'<text x="{cx}" y="100" font-size="14" fill="{c["muted"]}" text-anchor="middle">Current Streak</text>')
    out.append(f'<text x="{cx}" y="125" font-size="12" fill="{c["muted"]}" text-anchor="middle">{current_data["date"]}</text>')

    out.append(f'<text x="{cols[2]}" y="65" font-size="34" font-weight="bold" fill="{c["value"]}" text-anchor="middle">{longest_data["count"]}</text>')
    out.append(f'<text x="{cols[2]}" y="100" font-size="14" fill="{c["muted"]}" text-anchor="middle">Longest Streak</text>')
    out.append(f'<text x="{cols[2]}" y="125" font-size="12" fill="{c["muted"]}" text-anchor="middle">{longest_data["date"]}</text>')

    out.append('</svg>')
    return "".join(out)


def render_repo(repo, theme):
    c = THEMES[theme]
    W, H = 420, 132
    pad = 18
    out = []

    out.append(icon(ICON_REPO, pad, pad, 15, c["muted"]))
    out.append(
        f'<text x="{pad + 22}" y="{pad + 12}" font-size="14.5" font-weight="700" '
        f'fill="{c["title"]}">{esc(repo["name"])}</text>'
    )

    desc = repo.get("description") or "No description yet."
    for i, line in enumerate(wrap(desc, 11.5, W - 2 * pad, 3)):
        out.append(
            f'<text x="{pad}" y="{pad + 36 + i * 16}" font-size="11.5" '
            f'fill="{c["text"]}">{esc(line)}</text>'
        )

    fy = H - pad - 2
    x = pad
    if repo.get("language"):
        col = LANG_COLOR.get(repo["language"], c["muted"])
        out.append(f'<circle cx="{x + 5}" cy="{fy - 4}" r="5" fill="{col}"/>')
        out.append(
            f'<text x="{x + 15}" y="{fy}" font-size="11" fill="{c["muted"]}">'
            f'{esc(repo["language"])}</text>'
        )
        x += 15 + text_width(repo["language"], 11) + 18

    for path, count in ((ICON_STAR, repo.get("stars", 0)),
                        (ICON_FORK, repo.get("forks", 0))):
        out.append(icon(path, x, fy - 11, 12, c["muted"]))
        out.append(
            f'<text x="{x + 17}" y="{fy}" font-size="11" fill="{c["muted"]}">'
            f'{count}</text>'
        )
        x += 17 + text_width(str(count), 11) + 18

    return frame(W, H, c, "".join(out), f'{repo["name"]} repository card')


def main(argv=None):
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--user", required=True)
    p.add_argument("--out", type=Path, default=Path("assets"))
    p.add_argument("--projects", type=Path, default=Path("assets/projects.json"),
                   help="repos to render cards for, with description overrides")
    args = p.parse_args(argv)

    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    args.out.mkdir(parents=True, exist_ok=True)

    user = rest(f"/users/{args.user}", token)
    repos = []
    page = 1
    while True:
        batch = rest(f"/users/{args.user}/repos?per_page=100&page={page}&type=owner", token)
        repos += batch
        if len(batch) < 100:
            break
        page += 1
    
    contrib = fetch_contributions(args.user, token)
    if contrib:
        total_data, current_data, longest_data = contrib
        for theme in ("dark", "light"):
            dest = args.out / f"card-stats-{theme}.svg"
            dest.write_text(render_stats(args.user, total_data, current_data, longest_data, theme), encoding="utf-8")
        print("wrote card-stats-*.svg")
    else:
        print("  note: no usable token, skipping contribution tiles", file=sys.stderr)

    if not args.projects.exists():
        print(f"no {args.projects}, skipping repo cards")
        return
    wanted = json.loads(args.projects.read_text(encoding="utf-8"))["projects"]
    by_name = {r["name"].lower(): r for r in repos}

    for entry in wanted:
        src = by_name.get(entry["repo"].lower())
        if not src:
            print(f"  !! {entry['repo']} not found on the account, skipped")
            continue
        card = {
            "name": src["name"],
            "description": entry.get("description") or src.get("description"),
            "language": entry.get("language") or src.get("language"),
            "stars": src["stargazers_count"],
            "forks": src["forks_count"],
        }
        for theme in ("dark", "light"):
            dest = args.out / f"card-{src['name']}-{theme}.svg"
            dest.write_text(render_repo(card, theme), encoding="utf-8")
        print(f"wrote card-{src['name']}-*.svg  "
              f"({card['stars']}star {card['forks']}fork {card['language']})")


if __name__ == "__main__":
    main()
