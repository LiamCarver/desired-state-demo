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
  - `activeToasts`

## Reconciliation Logic
- Pure diff function:
  - Input: desired + actual
  - Output: `{creates, updates, deletes}`
- Pure apply function:
  - Input: actual + actions
  - Output: next actual
- Loop runner:
  - Triggers diff/apply on timer when running.
  - Emits event payloads for toasts/log.

## Component Structure
- `AppShell`
- `DesiredStateEditor`
- `ToastLayer` (center column: ephemeral event messages)
- `ActualStateCanvas` (shows actual shapes and supports direct drift edits)
- `DiffPanel` (optional, phase-gated)
- `ControlBar` (pause/resume, speed, step)
- `EventLogPanel`

## Data Flow
- User intent updates desired state.
- User drift actions originate from canvas interactions and update actual state directly.
- Reconciler reads both states and writes only actual state.
- Canvas subscribes to actual state and emits edit/delete/color-change events.
- Toast layer and log subscribe to reconciliation/drift outputs.

## Separation Rules
- UI components do not contain diff logic.
- Reconciliation module has no DOM dependencies.
- Shape identity rules are centralized in state-model contract.
