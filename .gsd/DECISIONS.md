# DECISIONS.md

> **Architecture Decision Record (ADR)**

## [ADR-001] Design Methodology
- **Status**: Decided
- **Date**: 2026-02-23
- **Context**: The user wants to overhaul the website for mobile and tablet while maintaining existing design patterns.
- **Decision**: Use Vanilla CSS with `clamp()` for fluid typography and relative units (vh, vw, rem, %) for layouts. Avoid introducing new frameworks.
- **Consequences**: High performance, zero dependency bloat, but requires more manual CSS work compared to Tailwind.
