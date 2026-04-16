# Core Concepts

## Desired State vs Actual State
- `desiredState`: what the user/system intends the world to look like.
- `actualState`: what is currently rendered/simulated.
- In a desired state system, users modify intent, not imperative steps.

## Drift
- Drift occurs when `actualState` differs from `desiredState`.
- In this app, drift is intentionally introduced by direct edits to `actualState`.
- Drift should be visibly detectable (shape mismatch by count/type/color/id).

## Reconciliation Loop
- A loop runs on an interval.
- Each tick:
  - Compare desired and actual.
  - Compute differences.
  - Apply one or more corrective actions.
- Reconciler should be observable (status text, tick counter, recent action).

## Convergence
- Convergence means `actualState` eventually equals `desiredState`.
- Not necessarily instant; can be stepwise for teaching.
- If reconciliation is paused, convergence stops.
- If desired state changes continuously, convergence target shifts.

## Teaching Outcome
- Users should leave understanding:
  - Why drift happens.
  - Why a controller loop is needed.
  - Why eventual consistency is acceptable in many systems.
