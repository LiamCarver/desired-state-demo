# Frontend Architecture

## Stack
- React application (implementation details like bundler can be chosen at setup time).

## State Model
- Keep two independent collections in memory:
  - `desiredState: Shape[]`
  - `actualState: Shape[]`
- Keep UI/control state separate:
  - `isReconcilerRunning`
  - `reconcileIntervalMs`
  - `lastDiffSummary`
  - `eventLog`

## Reconciliation Logic
- Pure diff function:
  - Input: desired + actual
  - Output: `{creates, updates, deletes}`
- Pure apply function:
  - Input: actual + actions
  - Output: next actual
- Loop runner:
  - Triggers diff/apply on timer when running.
  - Emits monitor metadata for UI.

## Component Structure
- `AppShell`
- `DesiredStateEditor`
- `ActualStateEditor` (for drift simulation)
- `CanvasRenderer` (shows actual shapes)
- `DiffPanel` (optional, phase-gated)
- `ReconcilerMonitor` (status, tick, last action)
- `ControlBar` (pause/resume, speed, step)
- `EventLogPanel`

## Data Flow
- User intent updates desired state.
- User drift actions update actual state directly.
- Reconciler reads both states and writes only actual state.
- Renderer subscribes to actual state.
- Monitor/log subscribe to reconciliation outputs.

## Separation Rules
- UI components do not contain diff logic.
- Reconciliation module has no DOM dependencies.
- Shape identity rules are centralized in state-model contract.
