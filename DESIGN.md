---
name: Whale
description: AI operations platform website as a live particle-detector event display.
colors:
  vacuum-white: "#F8F7F4"
  elevated-white: "#FFFFFF"
  cool-mist: "#EEF2F6"
  detector-ink: "#0B1020"
  near-black: "#0F172A"
  steel: "#475569"
  steel-blue: "#4A6C8C"
  steel-blue-light: "#6B8EAE"
  muted-silver: "#94A3B8"
  track-vision: "#FFD23F"
  track-voice: "#00E5FF"
  track-sensor: "#FF4D8D"
  track-sensor-ink: "#DB2777"
  accent-purple: "#8B5CF6"
  accent-red: "#FF4B4B"
typography:
  display:
    fontFamily: "'Chakra Petch', system-ui, sans-serif"
    fontSize: "clamp(2.8rem, 7vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "'Chakra Petch', system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  title:
    fontFamily: "'Chakra Petch', system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 2vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Manrope', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  lead:
    fontFamily: "'Manrope', system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 2vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  body-small:
    fontFamily: "'Manrope', system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  code:
    fontFamily: "'Space Mono', monospace"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  data:
    fontFamily: "'Space Mono', monospace"
    fontSize: "1.1rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  caption:
    fontFamily: "'Manrope', system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  logo:
    fontFamily: "'Chakra Petch', system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body-large:
    fontFamily: "'Manrope', system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "'Space Mono', monospace"
    fontSize: "0.85rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.05em"
  micro:
    fontFamily: "'Space Mono', monospace"
    fontSize: "0.7rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.05em"
rounded:
  xs: "1px"
  sm: "10px"
  md: "18px"
  pill: "999px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "3rem"
  xl: "5rem"
  xxl: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.near-black}"
    textColor: "{colors.vacuum-white}"
    rounded: "{rounded.pill}"
    padding: "0.65rem 1.25rem"
  button-primary-hover:
    backgroundColor: "{colors.near-black}"
    textColor: "{colors.vacuum-white}"
  button-large:
    backgroundColor: "{colors.near-black}"
    textColor: "{colors.vacuum-white}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.8rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.near-black}"
    rounded: "{rounded.pill}"
    padding: "0.65rem 1.25rem"
  layer-card:
    backgroundColor: "rgba(248, 247, 244, 0.04)"
    textColor: "{colors.vacuum-white}"
    rounded: "{rounded.md}"
    padding: "3rem 1.5rem"
  usecase-card:
    backgroundColor: "{colors.elevated-white}"
    textColor: "{colors.near-black}"
    rounded: "{rounded.md}"
    padding: "1.5rem"
  integration-terminal:
    backgroundColor: "{colors.detector-ink}"
    textColor: "{colors.track-voice}"
    rounded: "{rounded.md}"
    padding: "0"
  cta-input:
    backgroundColor: "rgba(248, 247, 244, 0.08)"
    textColor: "{colors.vacuum-white}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.2rem"
---

# Design System: Sensorium

## Overview

**Creative North Star: "The Particle Detector Event Display"**

Sensorium's visual world treats every visit as a single multimodal collision event. The interface borrows the spare, scientific notation of high-energy physics — concentric detector rings, colored particle tracks, and deposited-energy markers — but renders it on a warm, bright ground so the result feels approachable rather than archival. The system is built for B2B buyers who need to trust Whale's operations platform, but it refuses the dark, dense aesthetic that enterprise AI sites usually inherit.

The page moves from the macro (the full-bleed interactive detector) to the micro (spec numbers in tabular mono) and back out to the human outcome (use cases, integration code, contact). Color is functional first: yellow for SpaceSight video, cyan for Echo voice, magenta for Alivia orchestration. The same three colors thread through every section, so the visitor learns the palette as they scroll.

**Key Characteristics:**
- Bright vacuum-chamber white ground with one deep-ink section for contrast.
- Signal tracks in yellow, cyan, and magenta carry meaning across the whole site.
- Technical grotesk display type (Chakra Petch) paired with a clean body face (Manrope) and tabular mono for data.
- Every interactive state is authored; no browser-default focus rings or unstyled hover.
- The hero is a real WebGL stage, not a decorative illustration.

## Colors

The palette is built around a scientific display that has been moved into daylight: warm neutrals for the ground, steel blue for structure, and three signal colors for the sensing streams.

### Primary
- **Track Vision** (`#FFD23F`): Warm signal yellow for the SpaceSight video stream. Used for SpaceSight accents, the first pipeline stage, and any data tied to visual audit and space analytics.
- **Track Voice** (`#00E5FF`): Cyan for the Echo voice stream. Used for Echo accents, the second pipeline stage, focus rings, and code snippets.
- **Track Sensor** (`#FF4D8D`): Magenta for the Alivia orchestration / fusion stream. Used for Alivia accents and the third pipeline stage.

### Secondary
- **Accent Purple** (`#8B5CF6`): Used sparingly for the fourth pipeline stage and the healthcare use-case icon.
- **Accent Red** (`#FF4B4B`): Used only for terminal-window traffic-light dots.

### Neutral
- **Vacuum White** (`#F8F7F4`): The primary page ground. Warm, slightly desaturated, like paper under daylight.
- **Elevated White** (`#FFFFFF`): Card surfaces and the active track-legend button background.
- **Cool Mist** (`#EEF2F6`): Tinted section backgrounds and code-block wells.
- **Near Black** (`#0F172A`): Primary text, primary-button fill, and the detector-ink dark section.
- **Steel** (`#475569`): Secondary text on light ground.
- **Steel Blue** (`#4A6C8C`): Detector rings, icons, and structural accents.
- **Steel Blue Light** (`#6B8EAE`): Reserved for hover states on steel-blue elements.
- **Muted Silver** (`#94A3B8`): Secondary text on dark ground.
- **Detector Ink** (`#0B1020`): Terminal panels and the CTA/footer section background.

### Named Rules
**The Signal-Color Rule.** Yellow, cyan, and magenta always map to SpaceSight video, Echo voice, and Alivia orchestration respectively. Never use them as generic decoration; their meaning is the interface.

**The One Ink Section Rule.** Only one major section (CTA/footer) uses the near-black/detecto-ink ground. The rest of the page lives in daylight to keep the energy light, not moody.

## Typography

**Display Font:** Chakra Petch (system-ui fallback)
**Body Font:** Manrope (system-ui fallback)
**Label/Mono Font:** Space Mono

**Character:** Chakra Petch gives headlines a technical-but-friendly voice — geometric, slightly stretched, confident. Manrope keeps body copy open and readable. Space Mono is reserved for data, code, and the small legend labels; it is never used as a display face.

### Hierarchy
- **Display** (700, clamp(2.8rem, 7vw, 5.5rem), line-height 1.05, letter-spacing -0.04em): Hero headline only.
- **Headline** (700, clamp(2rem, 4.5vw, 3.5rem), line-height 1.05, letter-spacing -0.04em): Section headlines.
- **Title** (700, clamp(1.2rem, 2vw, 1.5rem), line-height 1.1, letter-spacing -0.02em): Card titles, module names, pipeline stage names.
- **Lead** (400, clamp(1.1rem, 2vw, 1.4rem), line-height 1.5): Hero lead paragraph.
- **Body Large** (400, 1.15rem, line-height 1.5): Section-head descriptions and CTA lead.
- **Body** (400, 1rem, line-height 1.6): Default paragraph text. Max line length 70ch.
- **Body Small** (400, 0.95rem, line-height 1.6): Compact descriptions inside cards and modules.
- **Code** (400, 0.9rem, line-height 1.7): Terminal body and inline code snippets.
- **Data** (700, 1.1rem, line-height 1.2): Tabular spec numbers.
- **Label** (700, 0.85rem, line-height 1.2, letter-spacing 0.05em, uppercase): Mono legends, nav links, and small technical labels.
- **Micro** (700, 0.7rem, line-height 1.2, letter-spacing 0.05em, uppercase): Spec labels.
- **Caption** (400, 0.8rem, line-height 1.5): Footer meta, form notes, and fine print.
- **Logo** (700, 1.25rem, line-height 1.1, letter-spacing -0.02em): Logo wordmark.

### Named Rules
**The Tight Display Rule.** Display and headline letter-spacing is always -0.04em or tighter. The technical face needs to feel locked in, not floating.

**The Mono-For-Data Rule.** Space Mono appears only for numbers, code, command labels, and small technical callouts. Never for marketing headlines or body text.

## Layout

The layout follows a single centered container (`min(1200px, 92vw)`) with generous vertical rhythm. Sections alternate between vacuum-white, cool-mist, and detector-ink to create pacing. The hero breaks the container and is full-bleed; all other sections stay inside the container.

- **Desktop:** detector layers use a 3-column grid; use cases use a 2-column grid; integration uses a 1.4fr / 1fr split with a terminal panel on the left and stacked cards on the right.
- **Mobile:** all grids collapse to a single column. The pipeline becomes a vertical stack of icon-plus-copy rows. Hero CTAs become full-width.
- **Spacing rhythm:** 0.5 / 1 / 1.5 / 3 / 5 / 8 rem steps. Major sections are separated by 8rem vertical padding.

### Named Rules
**The Full-Bleed Hero Rule.** Only the hero and its WebGL canvas are full-bleed. Every other section respects the shared container.

## Elevation & Depth

The system is mostly flat. Depth is conveyed through tonal layering (vacuum white → elevated white → cool mist) rather than heavy shadows. Shadows are reserved for hover response and primary buttons.

### Shadow Vocabulary
- **Button hover** (`0 10px 28px rgba(15, 23, 42, 0.22)`): Lift under primary buttons on hover.
- **Card hover** (`0 12px 32px rgba(15, 23, 42, 0.08)`): Subtle lift under use-case and layer cards on hover.
- **Legend active** (`0 4px 14px rgba(15, 23, 42, 0.1)`): Small pressed shadow for the active track-isolation button.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to state (hover, focus, active). No decorative drop shadows under static cards.

## Shapes

The form language is round and orbital. Corners are either large (18px) for cards and panels or fully pill-shaped (999px) for buttons, inputs, and track-legend items. Detector rings, stage markers, and the logo all reinforce the circle as the system's base geometry.

- **Cards and panels:** 18px radius.
- **Buttons, inputs, and legend pills:** fully rounded.
- **Borders:** 1px hairlines in low-opacity neutrals; never heavy strokes.

### Named Rules
**The Orbital Base Rule.** Circles and rings are the default motif. Angular shapes appear only inside iconography when the meaning demands it (e.g., the "Act" checkmark).

## Components

### Buttons
- **Shape:** Pill radius (999px), bold Chakra Petch label.
- **Primary:** Near-black fill, vacuum-white text, 0.65rem 1.25rem padding. Hover lifts with a shadow.
- **Ghost:** Transparent fill, near-black text, 2px inset stroke. Used for secondary hero actions.
- **Large variant:** 0.85rem 1.8rem padding for the hero and CTA.
- **Focus:** 3px cyan outline with 3px offset.

### Cards
- **Layer card:** Dark detector-ink background with low-opacity border, 18px radius, large internal padding. Holds one SVG ring diagram, a title, description, and two spec pairs.
- **Use-case card:** Elevated-white background, low-opacity border, 18px radius, flex row with a 64px icon. Hover lifts subtly.
- **Integration card:** Elevated-white background, low-opacity border, 18px radius, title, description, and a code snippet in a cool-mist well.

### Terminal Panel
- **Shape:** 18px radius, detector-ink background.
- **Header:** Three colored dots (red, yellow, cyan) plus a mono filename label on a slightly lighter strip.
- **Body:** Cyan mono code on dark ground, padded 1.25rem, horizontal scroll if needed.

### Navigation
- **Header:** Fixed top, near-opaque vacuum-white background, subtle hairline border. Logo left, links center, primary CTA right. Links are steel on default, near-black on hover.
- **Mobile:** Navigation links hide; only logo and "Request Demo" button remain.

### Track Legend
- **Shape:** Pill buttons with a colored dot and mono label.
- **State:** Default is transparent with a steel label. Hover gets an elevated-white background. Pressed/active gets an elevated-white background, colored border matching the dot, and a small shadow.
- **Behavior:** Clicking one isolates that track type in the WebGL hero; clicking again restores all tracks.

### Inputs
- **Shape:** Pill radius.
- **CTA input:** Dark translucent background, vacuum-white text, cyan focus ring.
- **Placeholder:** Muted silver.

## Do's and Don'ts

### Do:
- **Do** use yellow, cyan, and magenta exclusively for SpaceSight video, Echo voice, and Alivia orchestration respectively.
- **Do** keep the page in daylight; use the detector-ink ground only for the terminal panel and CTA/footer.
- **Do** use Chakra Petch for all headlines and Manrope for body text.
- **Do** reserve Space Mono for data, code, and small technical labels.
- **Do** make every interactive element respond with authored hover/focus/active states.
- **Do** let the WebGL hero remain the dominant first impression.

### Don't:
- **Don't** add decorative section numbers (01, 02, 03) unless the sequence itself is required navigation.
- **Don't** use glass or blur as a decorative header effect.
- **Don't** rely on browser-default focus outlines.
- **Don't** use monospace for marketing copy or display type.
- **Don't** make every section the same card grid.
- **Don't** introduce new accent colors that compete with the three signal tracks.
