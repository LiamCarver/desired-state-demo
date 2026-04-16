# Shape State Model

## Shape Schema
```json
{
  "id": "shape-1",
  "type": "circle",
  "color": "blue"
}
```

## Type Definitions
- `id: string`
  - Stable unique identifier across desired and actual states.
- `type: "circle" | "triangle" | "square"` (initial set; extensible).
- `color: string` (controlled palette in UI, stored as token/string).

## Collection Structure
```json
{
  "desiredState": [{ "id": "shape-1", "type": "circle", "color": "blue" }],
  "actualState": [{ "id": "shape-1", "type": "triangle", "color": "blue" }]
}
```

## Identity and Update Rules
- Identity is `id` only.
- Reconciliation comparisons are performed by `id`.
- If same `id` but different `type` or `color`: treat as update.
- Item in desired but not actual: create.
- Item in actual but not desired: delete.

## Validation Rules
- `id` must be non-empty and unique within each state collection.
- `type` must be one of supported primitives.
- `color` must be from allowed UI palette (implementation can enforce).

## Examples
### Drift by Update
Desired:
```json
[{ "id": "a", "type": "circle", "color": "green" }]
```
Actual:
```json
[{ "id": "a", "type": "triangle", "color": "green" }]
```
Result: update `a.type` to `circle`.

### Drift by Extra Resource
Desired:
```json
[{ "id": "a", "type": "circle", "color": "green" }]
```
Actual:
```json
[
  { "id": "a", "type": "circle", "color": "green" },
  { "id": "rogue-1", "type": "square", "color": "red" }
]
```
Result: delete `rogue-1`.
