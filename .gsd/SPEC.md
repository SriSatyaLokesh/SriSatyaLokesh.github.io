# SPEC.md — Responsive Overhaul (Mobile & Tablet)

> **Status**: `FINALIZED`

## Vision
Transform the Sri Satya Lokesh portfolio into a world-class, fully responsive experience. The site will maintain its premium "dark mode" aesthetic, smooth GSAP animations, and interactive elements, but with a fluid layout that adapts seamlessly to Mobile and Tablet viewports.

## Goals
1. **Full Responsive Support** — Ensure every section (Hero, About, Skills, Experience, Projects, Contact) is optimized for 320px up to 2560px+.
2. **Fluid Typography & Spacing** — Implement a consistent design system using `clamp()` and relative units for headings and container padding.
3. **Interactive Touch Hygiene** — Adapt hover-based effects (scramble text, card lifts) to be touch-friendly or mobile-appropriate.
4. **Performance & Navigation** — Maintain 90+ Lighthouse scores while introducing a mobile-friendly menu system.

## Non-Goals (Out of Scope)
- Changing the core Tech Stack (Vanilla JS/CSS).
- Introducing a JS framework (React/Vue/etc.).
- Redesigning the visual identity (colors, key fonts).

## Users
Professional recruiters, engineering managers, and open-source contributors viewing the portfolio on diverse devices (iPhones, Androids, iPads, and High-Res Monitors).

## Constraints
- **Stack**: Vanilla HTML, CSS, JS.
- **Animations**: Must use GSAP (already present).
- **Background**: Must preserve Vanta.js integration performance on mobile.

## Success Criteria
- [ ] Zero horizontal scrolling on all viewports down to 320px.
- [ ] Interactive elements (Skill Chips, Project Cards) have minimum 44px tap targets where appropriate.
- [ ] Animated name scramble works intuitively on touch (e.g., on tap or scroll-into-view).
- [ ] Hero section massive-text scales without breaking layout.
- [ ] All sections stack logically on vertical viewports.

## Technical Requirements

| Requirement | Priority | Notes |
|-------------|----------|-------|
| Fluid Typography | P0 | Use `clamp()` for all `h1`, `h2`, `h3`. |
| Adaptive Grid | P0 | Refactor Skill Bento Grid for mobile stacking. |
| Touch Interaction | P1 | Map hover animations to touch/active states. |
| Mobile Navigation | P0 | Functional Hamburger menu or sticky bottom bar. |
| Custom Cursor | P2 | Disable on touch devices to prevent lag/bugs. |
