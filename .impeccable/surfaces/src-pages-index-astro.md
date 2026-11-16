---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/styles/pc-en-2.css"]
---

# Surface brief — Homepage (/)

## Scope & mode
Homepage (`src/pages/index.astro`, styles `src/styles/pc-en-2.css`). Mode: **Persuade** — a first-time visitor from search, events, or outbound must understand the platform story and book a demo.

## Audience, job, action
- Audience: overseas B2B enterprise buyers and operations leaders evaluating AI for physical operations; secondary tech media, channel partners, and conference referrals.
- Job: understand the World Model / AIOS product ecosystem, the SpaceSight proof, client credibility, and compliance posture within a few scrolls.
- Action: "Book a demo" (LeadModal) from the header, hero, or Plug & Play CTA.

## Visual system actually shipped (pc-en-2 mirror)
This page is a 1:1 mirror of the approved `site9/pc-en-2.html` comp. It does **not** use the Sensorium world documented in root `DESIGN.md`; do not apply Sensorium tokens (Chakra Petch, Manrope, `#F8F7F4`, signal yellow/cyan/magenta) to this surface.

- Ground `#eff3ff`; surfaces `#ffffff`; column tints `rgba(234,240,254,.8)` (World Model BU) and `rgba(243,234,254,.8)` (AIOS BU).
- Brand blue `#2380fb`; AIOS purple `#7d63a9` (large headings only); body grey `#6b7280`; AIOS body `#7e6b80`; ink `#111827`.
- Accessible tag text (WCAG AA on their tints): blue `#1a5fc4` on `#eaf0fe`; purple `#63498c` on `#ebdfff`; orange `#b9481f` on `#fff1e8`; grey `#5b6472` on `#f5f6f8`. Column summaries use `#5b6472` (World) and `#6b5a6d` (AIOS).
- Type: Poppins 400/600/700. Section H2 56/64; BU H3 48; product H4 36/44; app H5 20/28; body 18/28; app copy 17/26; tags 16px/700.
- Radii: 24px cards/sections, 20px inner panels, 16px logo cards, 12px media and small tags, 999px pills.
- Layout: fixed 1920×9262 absolute canvas, scaled to viewport via `transform: scale()` on `#pc-stage` above 1024px, preserving the Figma pixel grid.

## Responsive behavior (added 2026-11-16)
- ≤1024px: `fitStage()` skips scaling, `#pc-stage` reflows in normal document flow (`height:auto`), and every section stacks in one column.
- Header becomes sticky with a horizontally scrollable link row (fade mask hints overflow); hero media uses a 16:10 frame; marquees clip to the viewport.
- Type floors: 16px body, 15px accordion/app copy, 13px tags/pills. Mobile is a true reflow, not a scaled desktop canvas.
- 1024px is the breakpoint because below roughly 0.55 scale the 1920 canvas renders body text under 10px.

## Proof & content
- Client logos: `public/home-assets/logos/leading-industry/*` (63, top carousel) and `public/home-assets/logos/investors/*` (16, bottom carousel), imported from `合作商LOGO.zip` on 2026-11-16.
- SpaceSight card visuals: `public/products/ss2-ai-audit.webp` and `public/products/ss2-audit-vlm.webp`; ecosystem icons are 96px WebP.
- Product names and descriptions come from the approved content framework; do not rewrite claims without approval.

## Unresolved
- The Figma comp's SpaceSight visual slots were empty; they now use existing SpaceSight product screenshots pending approved Figma assets.
- Root `DESIGN.md` still documents the older Sensorium world; this brief is the authority for `/`.
- Page copy was authored for desktop; mobile line breaks are not hand-tuned.
