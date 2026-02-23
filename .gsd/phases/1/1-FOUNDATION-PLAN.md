---
phase: 1
plan: 1
wave: 1
objective: Establish responsive foundation and fluid typography.
---

# Task 1: Global Responsive Foundation
**File:** `.gsd/roadmap.md:L16-25`

## Context
We need to refactor the base CSS to use relative units and fluid scaling.

## Implementation
1. Update `:root` variables in `main.css`.
2. Add touch detection logic in `scripts.js`.

## Verification
- Check `body` tag for `is-touch` class in devtools.
- Verify `h1` font-size changes on resize.

# Task 2: Hero Section Responsiveness
**File:** `index.html`, `main.css`

## Context
The massive text hides and reveals another layer. This must work on mobile.

## Implementation
1. Adjust `.massive-text` line-height and scale.
2. Disable custom cursor interaction on touch.

## Verification
- No horizontal scroll on 375px.
- Text does not overlap nav.
