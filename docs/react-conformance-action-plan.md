# React Conformance Action Plan

## Scope Reviewed
- [App.tsx](/C:/Users/Liam/Documents/GitHub/desired-state-demo/app/src/App.tsx)
- [index.css](/C:/Users/Liam/Documents/GitHub/desired-state-demo/app/src/index.css)
- [main.tsx](/C:/Users/Liam/Documents/GitHub/desired-state-demo/app/src/main.tsx)
- [react-pr-standards.md](/C:/Users/Liam/Documents/GitHub/desired-state-demo/docs/react-pr-standards.md)

## Current Conformance Snapshot
- Strong:
  - Token-based styling is in place (`:root` variables).
  - Semantic landmarks are mostly good (`main`, `section`, `header`).
  - Responsive baseline exists (`@media (max-width: 760px)`).
- Gaps:
  - Route/components are still monolithic in `App.tsx`.
  - Routing uses manual `window.location` switching.
  - No explicit keyboard focus styles for `.btn`.
  - Unused legacy stylesheet remains in source tree.
  - No automated tests yet.

## Prioritized Findings
1. P1: Monolithic route/component file reduces maintainability
   - Evidence: [App.tsx:1](/C:/Users/Liam/Documents/GitHub/desired-state-demo/app/src/App.tsx:1)
   - Impact: Violates focused-file and single-responsibility standards; harder PR reviews as app grows.
2. P1: Non-declarative route selection via `window.location`
   - Evidence: [App.tsx:100](/C:/Users/Liam/Documents/GitHub/desired-state-demo/app/src/App.tsx:100)
   - Impact: Limits route scalability, testing ergonomics, and standard React routing patterns.
3. P1: Keyboard focus visibility missing for button system
   - Evidence: [index.css:190](/C:/Users/Liam/Documents/GitHub/desired-state-demo/app/src/index.css:190), [index.css:203](/C:/Users/Liam/Documents/GitHub/desired-state-demo/app/src/index.css:203)
   - Impact: Accessibility gap for keyboard users.
4. P2: Unused legacy stylesheet still present
   - Evidence: [App.css](/C:/Users/Liam/Documents/GitHub/desired-state-demo/app/src/App.css)
   - Impact: Dead code increases confusion and review noise.
5. P1: Test coverage absent for route rendering and design primitives
   - Evidence: no test files under `app/src`.
   - Impact: Regressions in layout/routing/accessibility are likely as implementation starts.

## Action Plan
### Phase A: Structure and Routing (Immediate)
- Split route components:
  - Create `app/src/routes/HomeRoute.tsx`
  - Create `app/src/routes/DesignRoute.tsx`
- Extract reusable view blocks:
  - `app/src/components/ShapeGallery.tsx`
  - `app/src/components/ButtonShowcase.tsx`
  - `app/src/components/PaletteGrid.tsx`
  - `app/src/components/BackgroundPreview.tsx`
- Move constants to data module:
  - `app/src/design/designTokens.ts`
- Adopt declarative routing:
  - Install `react-router-dom`
  - Define routes in a router config and render via `RouterProvider` or `Routes`.

### Phase B: Accessibility Hardening (Immediate)
- Add keyboard focus styles:
  - Implement `.btn:focus-visible` with clear outline + offset.
- Ensure link/button parity:
  - Keep `.btn` styles consistent across `<a>` and `<button>`.
- Add a quick manual checklist in PR description:
  - Tab navigation across interactive controls.
  - Visible focus indicator at all times.

### Phase C: Cleanup (Immediate)
- Remove unused stylesheet:
  - Delete `app/src/App.css`.
- Confirm no stale imports or unreachable assets remain.

### Phase D: Baseline Testing (Next PR)
- Add unit/integration tests (Vitest + RTL):
  - `/` renders home content.
  - `/design` renders all showcase sections.
  - Shape and palette cards render expected counts from token data.
- Add at least one accessibility assertion:
  - Buttons expose accessible names and are keyboard focusable.

## Suggested PR Breakdown
1. PR 1: route/component split + token extraction + dead-code cleanup.
2. PR 2: router adoption and route tests.
3. PR 3: accessibility focus refinements and regression tests.

## Definition of Done
- No monolithic route file for feature surfaces.
- Declarative routing replaces pathname branching.
- All interactive controls have visible `:focus-visible` states.
- Legacy unused files removed.
- Baseline tests cover route rendering + core design primitives.
