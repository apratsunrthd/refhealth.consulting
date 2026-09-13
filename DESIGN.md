---
name: ref(health) Consulting
description: Healthcare data, analytics, and practical AI consulting.
colors:
  signal-red: "#d1392d"
  signal-red-deep: "#a7271f"
  signal-amber: "#d69a24"
  signal-green: "#19795b"
  signal-teal: "#1e7177"
  paper: "#edf1ef"
  paper-strong: "#fbfcf6"
  ink: "#11100e"
  black: "#050505"
  line: "#d7ccb7"
typography:
  display:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 5.7vw, 4.85rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "normal"
  headline:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "normal"
  body:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.04em"
rounded:
  sm: "6px"
spacing:
  xs: "0.45rem"
  sm: "0.8rem"
  md: "1.15rem"
  lg: "2rem"
  xl: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-red}"
    textColor: "#fffdf8"
    rounded: "{rounded.sm}"
    padding: "0.86rem 1.12rem"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.paper-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.86rem 1.12rem"
    height: "48px"
---

# Design System: ref(health) Consulting

## Overview

**Creative North Star: "Company Data AI Operating System"**

The site presents healthcare data and AI consulting as an operating system:
business decisions, governed data products, model/provider strategy, workflow
automation, measurement, documentation, and handoff working as one accountable
layer. The first viewport should show this as a clean operating model, not a
decorative diagram.

The system should feel senior, specific, and commercial. It borrows discipline
from traffic-control diagrams and data lineage maps, then keeps the reading
surface calm enough for healthcare executives.

**Key Characteristics:**

- Direct revenue-oriented copy.
- Flat, diagrammatic surfaces with strong borders.
- Red, amber, and green status language tied to risk, governance, and readiness.
- Evidence through diagnostics, working artifacts, controls, and operating
  cadence.

## Colors

The palette uses cool paper and near-black ink, with signal colors reserved for
action, readiness, governance, and risk.

### Primary

- **Signal Red**: Primary action, revenue/risk state, and the ref mark.
- **Signal Red Deep**: Hover state and stronger red text.

### Secondary

- **Signal Amber**: Governance, caution, focus, and review state.
- **Signal Green**: Build readiness and successful signal flow.
- **Signal Teal**: Secondary analytical accent, used sparingly.

### Neutral

- **Cool Paper**: Main page background.
- **Strong Paper**: Raised reading surfaces, proof rows, and offer interiors.
- **Ink**: Primary text and structural rules.
- **Signal Black**: Dark AI and hero-board surfaces.
- **Soft Line**: Low-emphasis dividers and non-critical borders.

### Named Rules

**The No Default Healthcare Blue Rule.** Blue gradients do not belong on this
site unless a future brand decision explicitly changes the palette.

**The Signal Has Meaning Rule.** Red, amber, and green must describe risk,
governance, readiness, or action. Do not use them as random decoration.

## Typography

**Display Font:** IBM Plex Sans with system sans fallback.
**Body Font:** IBM Plex Sans with system sans fallback.
**Label/Mono Font:** IBM Plex Mono.

**Character:** The pairing is operational and precise. Plex Sans carries the
executive argument; Plex Mono is used only where the interface needs a label,
status marker, sequence number, or operating-system layer.

### Hierarchy

- **Display** (700, clamp(3.2rem, 8vw, 6rem), 1.02): Homepage hero.
- **Headline** (700, clamp(2.2rem, 5vw, 4.5rem), 1.02): Major section claims.
- **Title** (700, clamp(1.2rem, 2vw, 1.55rem), 1.02): Offer and proof titles.
- **Body** (400, 1rem, 1.55): Main explanatory copy, with a readable measure.
- **Label** (600, 0.78rem, 0.04em tracking): Short status labels only.

### Named Rules

**The No Eyebrow Rule.** Section headings do not use kicker labels. The heading
must carry its own weight.

## Layout

The site uses constrained full-width bands with a maximum content width near
1160px. Desktop layouts use two-column pairings: argument beside artifact,
question beside evidence, or capability beside system rows. Mobile layouts
collapse to one column with the operating-system panel rendered as stacked rows.

Offer packaging is a bordered row system, not a card grid. The method section is
the only equal-panel sequence because the ordered steps are the content.

## Elevation & Depth

The system is flat by default. Depth comes from tonal contrast, borders, section
bands, and the dark operating-system surface. Shadows are limited to live states such as
primary-button hover.

### Named Rules

**The Flat Control Surface Rule.** Do not pair hairline borders with wide ambient
shadows. Choose a rule or a state shadow, not both.

## Shapes

Corners are small and utilitarian. The standard radius is 6px. Buttons, tags,
evidence rows, and panels use the same controlled corner language.

Borders are straight and structural. Avoid pill chips except where a compact
label would otherwise crowd the layout.

## Components

### Buttons

- **Shape:** Compact rectangle with small radius (6px).
- **Primary:** Signal red background, light text, no visible border at rest,
  subtle state shadow, 48px minimum height.
- **Secondary:** Strong paper background, ink text, black border, 48px minimum
  height.
- **Hover / Focus:** Hover moves up slightly; focus uses amber outline.

### Tags

- **Style:** Thin border, small radius, mono label text.
- **State:** Tags classify timing, evidence type, or engagement type. They are not
  decorative pills.

### Cards / Containers

- **Corner Style:** Small radius (6px).
- **Background:** Strong paper for reading surfaces; black for the operating
  model header and AI capability layer.
- **Shadow Strategy:** Flat at rest.
- **Border:** Ink borders for evidence, offer, method, and article containers.
- **Internal Padding:** At least 1rem for content-bearing containers.

### Navigation

Navigation is compact and text-first. The primary CTA is a black rectangular
button with a 44px minimum touch target. Mobile navigation stacks full-width.

### Operating System Panel

The signature component is the hero operating-system panel: a black header and
stacked rows for business decisions, data products, AI orchestration, workflow,
and operating cadence. It must never use overlapping text, decorative route
lines, or map-like clutter.

## Do's and Don'ts

### Do:

- **Do** sell paid diagnostics, build sprints, prototypes, and advisory work as
  explicit offers.
- **Do** tie AI copy to data readiness, governance, workflow fit, and
  measurable business action.
- **Do** lead with artifact evidence: decision memos, working builds, control
  packages, measurement, and handoff.
- **Do** keep section spacing generous and content blocks scan-friendly.

### Don't:

- **Don't** invent client logos, testimonials, prices, certifications, or
  revenue outcomes.
- **Don't** name private systems or private projects as public case studies.
- **Don't** use generic AI agency language, purple gradients, glassmorphism, or
  decorative icon cards.
- **Don't** turn mono labels into long body copy.
