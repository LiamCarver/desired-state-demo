# UI Layout and Interactions

## Layout
- Top: `ControlBar` (run/pause, speed, step reconcile, reset).
- Left panel: `Desired State Editor`.
- Center panel: `Event Toast Stream` (ephemeral change notifications).
- Right panel: `Current State Canvas` (actual state renderer + direct edit interactions).
- Bottom: `Event Log` (recent drift/reconcile events).

## Desired State Editor
- Display desired shapes as editable list.
- Actions:
  - Add shape.
  - Remove shape.
  - Change `type` and `color`.
- Editing desired state should not mutate actual state immediately; it creates drift until reconciliation acts.
- Color input uses a fixed palette (no free-form color entry).

## Current State Canvas
- Renders `actualState` only.
- Visual encoding:
  - `type` controls shape geometry.
  - `color` controls fill.
  - Optional id labels for teaching/debug mode.
- Direct manipulation (drift simulation) happens on-canvas:
  - Select shape.
  - Change selected shape color from fixed palette.
  - Delete selected shape.
  - Optional context actions: duplicate shape as rogue.

## Drift Simulation UX
- Drift actions mutate `actualState` directly via the canvas interaction layer.
- Every drift action writes an event log entry.
- Drift controls should be visibly labeled as out-of-band/manual changes.

## Event Toast Stream
- Show short-lived toast messages when meaningful events occur:
  - desired state change
  - manual drift action on canvas
  - reconcile action applied
  - in-sync reached
- Keep each toast concise and action-oriented (e.g., `Reconciler: updated b2.color green -> blue`).
- Display newest toast near top-center; auto-dismiss after short timeout.

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

## Wireframes
### Desktop (Primary)
```text
+----------------------------------------------------------------------------------+
| Desired State Demo                                   [Run] [Step] [Pause] [Reset]|
| Speed: [ Slow v ]                                                            |
+------------------------------+-------------------------------+-------------------+
| Desired State Editor         | Event Toast Stream            | Actual State Canvas
|------------------------------|-------------------------------|-------------------|
| [ + Add Shape ]              | [toast] Desired: add a4       | [select shape]
| a1 circle blue               | [toast] Drift: delete b2      | [color chips]
| b2 triangle green            | [toast] Reconcile: create b2  | [delete selected]
| c3 square orange             | [toast] In sync               | (renders actualState)
+------------------------------+-------------------------------+-------------------+
| Event Log                                                                        |
| [12:31:04] Desired: add a4                                                      |
| [12:31:05] Drift: delete b2                                                     |
| [12:31:06] Reconcile: create b2                                                 |
+----------------------------------------------------------------------------------+
```

### Responsive (Desktop-First)
```text
+----------------------------------------------+
| Desired State Demo                           |
| [Run] [Step] [Pause] [Reset] [Speed v]       |
+----------------------------------------------+
| Event Toast Stream                           |
| [toast] Reconcile: updated a1.color          |
+----------------------------------------------+
| Actual State Canvas                          |
| [select] [color chips] [delete]              |
| (renders actualState)                        |
+----------------------------------------------+
| Desired State Editor                         |
| [ + Add Shape ]                              |
| a1 circle blue                               |
| b2 triangle green                            |
+----------------------------------------------+
| Event Log                                    |
| [12:31:04] ...                               |
| [12:31:05] ...                               |
+----------------------------------------------+
```
