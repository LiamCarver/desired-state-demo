# Implementation Roadmap

## Phase 1: Basic Rendering
- Create app shell and panel layout.
- Implement shape renderer for a single in-memory list.
- Add minimal styling for clear panel separation.
- Seed with static demo data.
- Atomic tasks:
  - Define initial `Shape` type.
  - Render circle/triangle/square primitives.
  - Display ids in debug label mode.

## Phase 2: Desired vs Actual State
- Split single list into `desiredState` and `actualState`.
- Build editors for both state lists.
- Ensure desired edits do not auto-sync actual.
- Atomic tasks:
  - Implement desired state editor interactions.
  - Implement actual state drift simulator interactions.
  - Add basic diff summary (count mismatch/update/delete).

## Phase 3: Reconciliation Loop
- Implement pure diff and apply functions.
- Add interval-based reconciler with run/pause + step.
- Update actual state through reconciler only (except drift simulator).
- Atomic tasks:
  - Add deterministic operation ordering.
  - Add reconcile speed controls.
  - Add in-sync/no-op handling.

## Phase 4: Animations + UX Polish
- Add per-action transitions (create/update/delete).
- Improve monitor clarity (pulse/tick/action details).
- Refine layout for mobile and desktop readability.
- Atomic tasks:
  - Add animation hooks by action type.
  - Improve visual hierarchy and labels.
  - Add reset-to-baseline flow.

## Phase 5: Advanced Features
- Add optional diff panel showing exact resource deltas.
- Add structured event log with filtering.
- Add optional batch-vs-stepwise mode toggle.
- Atomic tasks:
  - Persist last N reconcile events in memory.
  - Add log categories (drift/reconcile/system).
  - Add educational presets (easy, drift-heavy scenarios).
