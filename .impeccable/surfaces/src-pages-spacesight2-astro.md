---
version: 1
slug: "src-pages-spacesight2-astro"
primary_target: "src/pages/spacesight2.astro"
related_targets: []
---

# Surface brief — /spacesight2/

## Scope & mode
Route `/spacesight2/` — alternate SpaceSight landing page built from "SS landing page final ver" copy (Downloads zip). Mode: **Persuade**. Coexists with `/spacesight/` (HUD console version); neither links to the other yet.

## Audience / job / action
- Audience: enterprise ops leaders evaluating camera-based operations intelligence.
- Job: understand offer in seconds, believe deployment works with existing cameras, trust privacy posture.
- Action: Book a Demo (LeadModal, source types `spacesight2页-Hero留资` / `spacesight2页-部署咨询留资` / `spacesight2页-底部留资`). Secondary: `/user-cases/`.

## Direction (locked)
Field Manual / spec-sheet — page as SpaceSight's own ops procedure document. Seed key `77fc822f`, candidate 4 of grounded list; acetate-tab challenger fused as fixed right-edge fore-edge tab rail (scroll-spy, ≥1280px only). Company blue `#2563EB` (page-scoped `--ss2-blue*`) on global daylight tokens; Poppins/Manrope/Space Mono per global.css. Memorable moment: manual cover first viewport with doc-control strip + FIG.00 plate + proof ledger.

## Content map
Cover (doc strip, headline, blue-highlighted subhead, FIG.00 AI Audit image, proof 1,600+/45+/600,000+) → Part 01 Procedures A/B/C (audit SVG schematic, flow SVG schematic, SpaceClaw phone video `ss2-spaceclaw-app.mp4`) → Part 02 Visibility (`ss2-visibility.mp4`) → Part 03 Deployment (HW-1..5 ledger + 4-step ledger) → Part 04 Trust (T-1..3 ledger + 5 cert logos from /cert-logos/) → FAQ (shared FAQSection component) → CTASection (dark, headline repeated).

## Assets
- `public/products/ss2-ai-audit.png` (1376×768, from zip)
- `public/products/ss2-spaceclaw-app.mp4` (mov cut 38s+24s, muted, 210KB)
- `public/products/ss2-visibility.mp4` (re-encoded, 2.1MB)
- Cert logos reuse `/cert-logos/*`.

## Constraints / conventions
- Reveal-on-scroll via page-scoped IntersectionObserver (`data-reveal`, `--i` stagger); `prefers-reduced-motion` disables CSS motion AND pauses ambient looping videos (matchMedia JS swaps in native controls).
- Word-mask headline animation follows company page convention (`.wm/.w` with pad/margin to avoid glyph clipping). H1 tail = blue block + blinking block cursor (spacesight v1 convention, `ss2-blink`); cursor replaces the trailing period in hero H1 only.
- `.ss2-tabs` nav MUST stay inside `<main class="ss2">` — page tokens are `.ss2`-scoped; outside, the rail loses active/hover/border states (finish-review finding).
- Astro dev toolbar (`astro-dev-toolbar`) appears in dev screenshots — remove before capture; absent from build output.
- Detector advisories (font sizes off DESIGN.md ramp, 2px radius) are stale-ramp noise: DESIGN.md documents the pre-Poppins system; page follows live site ramp.

## Finish review (closed, verdict SHIP)
Six findings fixed with evidence: tab-rail token scope; FIG.B SVG text collisions; FIG.02 alpha-splash video (re-cut from 10s + honest caption); SpaceClaw Chinese UI chips (white drawbox mask, v1 technique); duplicate id="faq"; reduced-motion video pause + posters. Post-verdict H1 tail change pixel-verified both breakpoints.

## Accepted residuals (on record)
- SpaceClaw demo query "Help me find the yellow cat" retained as authentic product footage — user decision pending (mask/waive/replace with new recording).
- FIG.02 window title "Alivia 1.0.0" is a real Whale product name — kept.
- Hero H1 trailing period replaced by blinking cursor (terminal voice); closing CTA keeps the period.

## Unresolved
- `/spacesight/` vs `/spacesight2/`: which becomes canonical is a user decision; no nav links to spacesight2 yet; near-duplicate content SEO strategy open.
- SVG schematics carry synthetic data (labeled "schematic, synthetic data" in captions).
