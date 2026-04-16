# Desired State Demo App

## Purpose
This app is an interactive teaching tool for desired-state systems.

Current implementation is focused on:
- visual system and component previews
- interaction patterns for core UI panels
- props-driven component contracts before full reconciliation logic

## Quick Start
```bash
cd app
cmd /c npm install
cmd /c npm run dev
```

## Validation Commands
```bash
cmd /c npm run lint
cmd /c npm run test:run
cmd /c npm run build
```

## Routes
- `/` Home
- `/design` Design sandbox
- `/design/components/canvas` `ActualStateCanvas` preview
- `/design/components/desired-state-editor` `DesiredStateEditor` preview

## Core Components
- `ActualStateCanvas`
- `DesiredStateEditor`
- `ShapeButtonShell`
- `ShapeGlyph`

## Current UI Behavior Highlights
- PS-inspired round black shell styling for icon/shape controls.
- Hollow shape glyphs with PS-style color mapping.
- Contextual color palette in canvas:
  - hidden by default
  - revealed when a shape is selected
  - hidden when deselected by canvas click-away

## Important Docs
- [Fresh Context Handoff](../docs/fresh-context-handoff.md)
- [Current Implementation](../docs/current-implementation.md)
- [UI Decisions](../docs/ui-decisions.md)
- [Plan](../docs/plan.md)

## Next Recommended Work
1. Build `EventToastStream` as a props-driven preview component.
2. Create a composed three-panel route for integrated layout rehearsal.
3. Begin reconciliation/data-flow wiring after panel contracts are locked.
