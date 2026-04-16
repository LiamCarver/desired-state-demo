# Desired State Demo Plan

## Summary
- Build a small interactive web app that teaches desired state reconciliation using simple shapes.
- Make desired state, actual state, drift, reconciliation, and convergence visible at all times.
- Prioritize conceptual clarity over framework complexity.
- Implementation stack: React frontend.

## Document Map
- [Concepts](./concepts.md)
- [Architecture](./architecture.md)
- [UI](./ui.md)
- [State Model](./state-model.md)
- [Reconciliation](./reconciliation.md)
- [Roadmap](./roadmap.md)
- [Open Questions](./open-questions.md)

## Execution Order
1. Align on concept definitions and assumptions:
   - `concepts.md`
   - `open-questions.md`
2. Finalize state and algorithm contracts:
   - `state-model.md`
   - `reconciliation.md`
3. Lock implementation structure:
   - `architecture.md`
   - `ui.md`
4. Execute delivery in phases:
   - `roadmap.md`

## Implementation Phases (High-Level)
1. Visual baseline and shape rendering.
2. Explicit desired vs actual state editing.
3. Continuous reconciliation loop and drift handling.
4. Animation and observability polish.
5. Advanced controls and educational tooling.

## Definition of Done (Planning Stage)
- All docs are internally consistent.
- Open questions are resolved or explicitly deferred.
- Team can implement Phase 1 without additional planning docs.
