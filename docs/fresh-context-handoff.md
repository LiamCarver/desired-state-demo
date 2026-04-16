# Fresh Context Handoff

## Current Goal
- Build an interactive teaching app for desired-state reconciliation.
- Current work is focused on **UI primitives and interaction previews**, not full reconciliation logic yet.

## What Is Already Implemented
- React + TypeScript + Vite app scaffold in `app/`.
- Design sandbox route with visual primitives.
- Component preview routes for:
  - `ActualStateCanvas`
  - `DesiredStateEditor`
- PS-inspired visual styling:
  - dark round button shells
  - hollow glyph shapes
  - PS-like shape color mapping

## Start Here in a New Session
1. Read [app/README.md](../app/README.md)
2. Read [Current Implementation](./current-implementation.md)
3. Read [UI Decisions](./ui-decisions.md)
4. Run app locally and verify current behavior before changing anything.

## Run Commands
- Install deps:
  - `cd app`
  - `cmd /c npm install`
- Run dev server:
  - `cmd /c npm run dev`
- Run checks:
  - `cmd /c npm run lint`
  - `cmd /c npm run test:run`
  - `cmd /c npm run build`

## Route Map
- `/` home
- `/design` design sandbox
- `/design/components/canvas` actual state component preview
- `/design/components/desired-state-editor` desired state component preview

## Important Interaction Notes
- `ActualStateCanvas` preview currently supports:
  - select shape
  - select different shape
  - click empty canvas to clear selection
  - contextual palette reveal/hide with animation
- `DesiredStateEditor` preview currently supports:
  - local preview-state updates in route
  - dropdowns for type/color with click-away close

## Recommended Next Steps
1. Add `EventToastStream` preview route as a props-driven component.
2. Compose all three core panels in a single “main layout preview” route.
3. Introduce shared interaction/state contracts for future reconciliation wiring.
