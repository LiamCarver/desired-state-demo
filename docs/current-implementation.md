# Current Implementation

## Code Structure
- `app/src/routes`
  - `HomeRoute.tsx`
  - `DesignRoute.tsx`
  - `CanvasComponentRoute.tsx`
  - `DesiredStateEditorComponentRoute.tsx`
- `app/src/components`
  - `ActualStateCanvas.tsx`
  - `DesiredStateEditor.tsx`
  - `ShapeButtonShell.tsx`
  - `ShapeGlyph.tsx`
  - `BackgroundPreview.tsx`
  - `ShapeGallery.tsx`
  - `ButtonShowcase.tsx`
  - `PaletteGrid.tsx`
- `app/src/design`
  - `designTokens.ts`
  - `shapeTypes.ts`

## Design Tokens
- Shape palette order is intentionally aligned to shape order:
  1. Coral
  2. Mint
  3. Purple
  4. Ocean

## Shape/Color Mapping (PS-style)
- Circle: red/coral
- Triangle: green/mint
- Square: purple
- X: blue/ocean

## Canvas Preview Behavior
- Default: no selected shape.
- Shape click: selects shape.
- Empty canvas click: clears selection.
- Color palette:
  - hidden by default
  - appears only when selection exists
  - hide/show uses animated reveal with per-chip stagger
- Delete control:
  - icon-only PS shell
  - dustbin icon

## Desired Editor Preview Behavior
- Component remains props-driven.
- Preview route owns sample state for demonstration.
- Type/color menus close on selection and click-away.

## Testing/Validation
- Lint: `npm run lint`
- Tests: `npm run test:run`
- Build: `npm run build`

## Known Intentional Boundaries
- No reconciliation engine wired yet.
- No backend/persistence.
- Preview routes are intentionally sandbox-like and not production flows.
