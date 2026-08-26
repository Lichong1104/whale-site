---
version: 1
slug: "src-pages-solutions-astro"
primary_target: "src/pages/solutions.astro"
related_targets: []
---

# Surface brief — /solutions/

## Scope & mode
Industry solutions landing page (`src/pages/solutions.astro`). Mode: **Persuade** — first-time industry buyer should self-identify their vertical and book a demo.

## Audience, job, action
- Audience: overseas B2B ops/enterprise buyers in automotive, luxury retail, F&B, healthcare, casinos, museums — arriving from nav "Solutions", outbound links, or search.
- Job: confirm Whale understands their industry's floor reality.
- Action: scroll to their industry, then "Book a Demo" (LeadModal) via closing CTA band.

## Proof & content
- Copy source: `US Website - 内容框架.md` (Solutions landing section). Per-industry detail copy (challenge/help/result) exists in the same doc — reserved for future `/solutions/<industry>/` detail pages.
- Visuals: zip contained NO industry imagery. Placeholders are authored line-SVG detector scenes (car, handbag, cloche, medical cross, casino chip, framed artifact), labeled "PLACEHOLDER VISUAL — INDUSTRY FOOTAGE TO COME" (visible caption + aria-label). Replace with real footage per industry when supplied.

## Chosen direction
- Form REVISED 2026-08-25: user replaced the brief-pinned scroll-showcase with a **horizontal snap reel** (full-width slides: ink stage left, copy right; prev/next arrows, labeled industry ticks, 01/06 counter; mouse drag + swipe + arrow keys + hero index links all drive it). Original form: scroll-spy showcase (kept in git history if needed).
- Hero headline encodes the signal-color story: See it. = vision yellow-ink, Hear it. = voice cyan-ink, Fix it = fusion magenta-ink (stepped values for daylight ground, documented in DESIGN.md as `track-*-ink`).
- Eyebrow copy merged into subhead (craft-floor kicker ban).
- Each industry block carries SpaceSight/Echo chips naming which products serve it.
- Closing CTA reuses CTASection with framework copy.

## Unresolved
- "See how it works for X" links are `href="#"` placeholders until detail pages exist.
- Per-industry detail pages (challenge/how-Whale-helps/result copy in framework doc) not yet built.
- Real industry imagery to replace placeholder scenes.
