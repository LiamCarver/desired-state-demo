# Open Questions and Assumptions

## Assumptions Made
- Initial shape types are `circle`, `triangle`, `square`.
- Reconciliation defaults to `stepwise` (one action per tick) for teaching clarity.
- Identity is strictly `id`, not positional index.
- App is single-user, in-memory only (no backend persistence).
- React is the chosen frontend framework.
- Initial scenario starts in sync.
- Color selection is constrained to a fixed palette.

## Resolved Decisions (2026-04-16)
- Framework: React.
- Default scenario: start in sync.
- Allowed colors: fixed palette.
- Reconcile mode default: stepwise.
- Mobile scope: responsive desktop-first.

## Decisions Still Open
- Reconcile policy configurability:
  - Keep fixed create -> update -> delete only, or expose as advanced setting?

## Nice-to-Have Clarifications
- Should shape positions be part of state, or auto-layout only?
- Should users be allowed to edit `id` after creation?
- Should event logs be exportable or just visible in UI?

## Blocking vs Non-Blocking
- Blocking for implementation start:
  - None currently; core implementation inputs are defined.
- Non-blocking:
  - Log export.
  - Advanced presets.
