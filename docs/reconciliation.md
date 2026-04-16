# Reconciliation Algorithm

## Goal
- Move `actualState` toward `desiredState` on each loop tick.
- Make each correction visible for learning.

## Drift Detection
- Build index maps by `id` for desired and actual.
- Compute:
  - `creates`: ids in desired, missing in actual.
  - `updates`: ids in both, but different `type` or `color`.
  - `deletes`: ids in actual, missing in desired.

## Resolution Strategy
- Default deterministic order per tick:
  1. Creates
  2. Updates
  3. Deletes
- Within each operation class, process by stable sort (e.g., lexical `id`).
- Determinism helps users mentally model behavior.

## Granularity Options
- `batch` mode: apply all actions in one tick (faster convergence).
- `stepwise` mode: apply one action per tick (clearer visualization).
- Recommended default for teaching: `stepwise`.

## Tick Flow
1. Exit if reconciler paused.
2. Compute diff.
3. If no diff:
   - Mark status as `in sync`.
   - Emit concise `in-sync` toast/log event.
4. If diff exists:
   - Select next action by policy.
   - Apply action to actual state.
   - Emit toast/log event with action detail.

## Delay and Animation Behavior
- Reconcile interval is user-configurable (e.g., 250ms, 750ms, 1500ms).
- Optional action animation:
  - Create: fade in shape.
  - Update: brief highlight pulse.
  - Delete: fade out shape.
- Animation should not change algorithm outcome; only visual timing.

## Edge Cases
- Duplicate ids in input should block reconciliation and surface error.
- Unsupported type/color should surface validation warning.
- If desired state changes mid-convergence, next tick recalculates against latest desired state.
