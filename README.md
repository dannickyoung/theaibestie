# The AI Bestie — Landing Page

Landing page for **The AI Bestie** course (@the.ai.bestie) — *AI tutorials even your mom can understand.*

Built as a **full Next.js app** (App Router + TypeScript + Tailwind v4) so the homepage can grow into a complete marketing site.

## Tech stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (available for new sections; the current brand UI lives in `app/globals.css`)
- Fonts: Baloo 2, Nunito, Press Start 2P, Caveat (Google Fonts). Icons: [iconoir](https://iconoir.com).

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
# or
npm run build && npm run start
```

## Structure

```
app/
  layout.tsx        # <html>, fonts, metadata
  page.tsx          # the landing page (banner + lessons)
  globals.css       # brand tokens + sticker-book styles (+ Tailwind import)
components/
  Banner.tsx        # green "THE AI BESTIE" banner
  LessonCard.tsx    # clickable Lesson 1 card → /lesson-01.html
public/
  lesson-01.html    # the live lesson (4 pages) + toolbar w/ Download PDF button
  lesson-01-what-is-claude-code.pdf
  assets/           # wendy cutout, claude code mascot, terminal icon, logos
```

## Flow

1. Visitor lands on `/` → green banner + the **Lesson 1: What is Claude Code?** card.
2. Clicking the card opens **`/lesson-01.html`** — the lesson rendered live in the browser.
3. The **Download PDF** button (top right of the lesson) downloads the PDF.

> The lesson is currently served as a self-contained static page from `public/` to preserve its print-exact design. When you expand the site, it can be promoted to a real Next route (`app/lessons/...`) — see the note in `components/LessonCard.tsx`.

## Brand

Sticker-book style. Palette: green `#0BB14B`, lilac `#BD8DDB`, sky `#86D5EE`, magenta `#FF12E6`, cyan `#35ECEC`, ink `#141414`, paper `#FCFAF5`.
