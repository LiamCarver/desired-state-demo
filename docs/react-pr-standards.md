# React PR Review Standards

## Purpose
- Provide consistent, high-signal criteria for reviewing React changes.
- Prioritize correctness, maintainability, accessibility, and user experience.

## PR Scope and Structure
- PR has a clear goal and limited scope.
- Changes are broken into logical commits.
- No unrelated refactors mixed with feature/fix work.
- New routes/components are split into focused files (avoid large monolith files).

## Component Design
- Components follow single-responsibility.
- Reusable UI is extracted instead of duplicated.
- Props are typed explicitly and minimally.
- Avoid prop drilling when composition/context is more appropriate.
- Business logic is not tightly coupled to presentation markup.

## State Management
- State is colocated at the lowest level that needs it.
- Derived state is computed, not duplicated in state.
- Avoid unnecessary global state.
- State updates are immutable and predictable.
- Async state transitions handle loading, success, and error explicitly.

## Effects and Side Effects
- `useEffect` is used only for real side effects.
- Effect dependencies are complete and intentional.
- No stale closures in callbacks/effects.
- Timers/listeners/subscriptions are cleaned up correctly.

## Routing and Navigation
- Route responsibilities are clear (route container vs presentational sections).
- Navigation uses declarative patterns where possible.
- Route-level loading/error/empty states are handled.

## Styling and Design System
- Styling follows project tokens/variables rather than hardcoded one-off values.
- Visual primitives (buttons, cards, badges, spacing) are consistent.
- Responsive behavior is intentional and tested at common breakpoints.
- Avoid style regressions by reusing established component patterns.

## Accessibility
- Semantic HTML is preferred over generic containers.
- Interactive elements are keyboard accessible.
- Buttons/inputs/links have clear accessible names.
- Focus states are visible.
- Color contrast is adequate for text and controls.

## Performance
- Avoid unnecessary re-renders (memoization only where justified).
- Large lists use stable keys and efficient rendering patterns.
- Expensive computations are memoized when needed.
- Bundle impact is considered for new dependencies.

## Error Handling and Resilience
- User-visible errors are actionable and non-technical.
- Edge cases and empty states are covered.
- UI should fail gracefully when data is partial or invalid.

## Testing Expectations
- New behavior has tests at the right level (unit/integration/e2e as needed).
- Tests assert user-observable behavior, not implementation details.
- Critical flows include success and failure paths.
- No flaky/timing-fragile tests introduced.

## PR Checklist (Reviewer)
- [ ] Code matches intended behavior and acceptance criteria.
- [ ] Component boundaries and file structure are maintainable.
- [ ] State/effect logic is correct and free of common React pitfalls.
- [ ] Accessibility basics are met.
- [ ] Styling is consistent with the design system.
- [ ] Tests are sufficient and meaningful.
- [ ] No obvious performance or security concerns.

## PR Checklist (Author)
- [ ] I kept this PR focused and documented tradeoffs.
- [ ] I added/updated tests for new behavior.
- [ ] I validated keyboard and responsive behavior.
- [ ] I removed dead code and debug artifacts.
- [ ] I updated docs when architecture or conventions changed.
