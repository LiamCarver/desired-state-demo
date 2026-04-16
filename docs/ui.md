# UI Layout and Interactions

## Layout
- Top: `ControlBar` (run/pause, speed, step reconcile, reset).
- Left panel: `Desired State Editor`.
- Center panel: `Current State Renderer` (actual state canvas).
- Right panel: `Actual State Editor` + `Reconciler Monitor`.
- Bottom: `Event Log` (recent drift/reconcile events).

## Desired State Editor
- Display desired shapes as editable list.
- Actions:
  - Add shape.
  - Remove shape.
  - Change `type` and `color`.
- Editing desired state should not mutate actual state immediately; it creates drift until reconciliation acts.
- Color input uses a fixed palette (no free-form color entry).

## Current State Renderer
- Renders `actualState` only.
- Visual encoding:
  - `type` controls shape geometry.
  - `color` controls fill.
  - Optional id labels for teaching/debug mode.

## Actual State Editor (Drift Simulator)
- Directly mutate actual state to simulate out-of-band change.
- Actions:
  - Add rogue shape.
  - Delete existing shape.
  - Change type/color.
- Every drift action writes an event log entry.

## Reconciler Monitor
- Show:
  - Running/paused status.
  - Tick interval.
  - Last diff result (`+create/~update/-delete` counts).
  - Last action timestamp.
- Optional: simple pulse indicator when a reconcile tick executes.

## Controls
- `Run/Pause` reconciliation.
- `Speed` selector (slow/normal/fast).
- `Step` button (single reconcile tick when paused).
- `Reset` to initial demo scenario.
- Initial app state should load in-sync (`desiredState === actualState`).

## UX Constraints
- Keep state visibility explicit; avoid hidden automation.
- Show when system is idle because states already match.
- Keep interactions reversible where practical (reset baseline at minimum).
