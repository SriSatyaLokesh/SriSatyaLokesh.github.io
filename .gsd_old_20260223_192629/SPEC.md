# SPEC.md — Mobile UI Overhaul

> **Status**: `DRAFT`
>
> ⚠️ **Planning Lock**: No code may be written until this spec is marked `FINALIZED`.

## Vision
Transform the existing portfolio into a fully responsive, premium mobile experience. The site should maintain its high-end aesthetic (typography, animations, interactions) while being perfectly functional and readable on all screen sizes, from mobile to desktop.

## Goals
1. **Responsive Typography** — Implement fluid font sizes using `clamp()` or media queries for massive-text and headings.
2. **Layout Adaptability** — Ensure all sections stack correctly and maintain balanced proportions on small screens.
3. **Touch Optimized** — Verify all interactive elements (buttons, links, toggle cards) are easy to tap and have appropriate hit areas.
4. **Custom Cursor Hygiene** — Disable or adapt the custom cursor for touch devices to prevent interaction interference.

## Non-Goals (Out of Scope)
- Adding new content or sections (unless required for UX).
- Changing the overall color palette or design language.
- Rewriting the core logic of animations (e.g., Vanta.js or Lenis) unless they break responsiveness.

## Constraints
- Must use vanilla CSS and JS as per established patterns.
- Must ensure 99%+ uptime and fast load times on mobile.
- Must be compatible with modern mobile browsers (Chrome, Safari, Firefox).

## Success Criteria
- [ ] No horizontal scrolling on mobile (down to 320px width).
- [ ] Mobile-friendly navigation that doesn't overlap content.
- [ ] Skills grid is legible and doesn't break overflow.
- [ ] Experience and Project cards stack logically and are readable.
- [ ] Custom cursor is hidden or disabled on touch devices.

## Technical Requirements

| Requirement | Priority | Notes |
|-------------|----------|-------|
| Fluid Typography | Must-have | Focus on Hero massive-text. |
| Vertical Stacking | Must-have | About, Experience, Projects. |
| Navigation Minimalist | Must-have | Avoid overlap, ensure easy access. |
| Touch Interactivity | Must-have | Fix hover-dependent effects for touch. |

---

*Last updated: 2026-02-23*
