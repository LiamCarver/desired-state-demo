# UI Decisions (Current)

## Visual Direction
- Dark, grid-based background.
- Slightly translucent gradient panels.
- PS-inspired iconography and shape styling.

## Panel and Card Styling
- Cards use gradient + subtle transparency.
- Heading spacing in cards is explicit to prevent cramped titles.

## Shape Styling
- Shapes are hollow glyphs (not solid fills).
- Shapes render inside round black shell components for PS-like look where appropriate.
- Shared shell component: `ShapeButtonShell`.

## Buttons Panel
- Intentionally icon-only circular controls.
- No text labels shown visually.
- Accessible labels provided through `aria-label`/`title`.

## Canvas Controls
- Color chips are round black shells with inner color indicator.
- Color chip hover uses modest grow effect.
- Palette animation is contextual (selection-driven).

## Interaction Motion Rules
- Keep motion expressive but stable.
- Avoid layout reflow/vertical jump during reveal/hide.
- Prefer transform/opacity/clip-based transitions for contextual UI.

## Accessibility Baseline
- Focus-visible outlines on interactive controls.
- Button/icon actions carry accessible names.
- Semantic section/heading structure retained in routes.
