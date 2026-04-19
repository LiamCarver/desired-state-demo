import { createContext, type Dispatch } from 'react'
import { paletteValues } from '../design/designTokens'
import type { ShapeType } from '../design/shapeTypes'
import type { ActualShape, DesiredShape } from './types'

export type AppState = {
  desiredState: DesiredShape[]
  actualState: ActualShape[]
  selectedActualShapeId?: string
}

export type AppAction =
  | { type: 'actual/sync-with-desired' }
  | { type: 'actual/reconcile-step' }
  | { type: 'actual/select-shape'; shapeId?: string }
  | { type: 'actual/delete-selected' }
  | { type: 'actual/set-selected-color'; color: string }
  | { type: 'desired/add-shape'; nextType: ShapeType; nextColor: string }
  | { type: 'desired/remove-shape'; shapeId: string }
  | { type: 'desired/set-shape-type'; shapeId: string; nextType: ShapeType }
  | { type: 'desired/set-shape-color'; shapeId: string; nextColor: string }

export const initialState: AppState = {
  desiredState: [
    { id: 'shape-1', type: 'circle', color: paletteValues.coral },
    { id: 'shape-2', type: 'triangle', color: paletteValues.mint },
    { id: 'shape-3', type: 'square', color: paletteValues.purple },
    { id: 'shape-4', type: 'x', color: paletteValues.ocean },
  ],
  actualState: [
    { id: 'shape-1', type: 'circle', color: paletteValues.coral, x: 18, y: 30, size: 64 },
    { id: 'shape-2', type: 'triangle', color: paletteValues.mint, x: 42, y: 58, size: 66 },
    { id: 'shape-3', type: 'square', color: paletteValues.purple, x: 66, y: 34, size: 62 },
    { id: 'shape-4', type: 'x', color: paletteValues.ocean, x: 84, y: 56, size: 62 },
  ],
}

const actualShapeLayoutSlots = [
  { x: 16, y: 22 },
  { x: 34, y: 26 },
  { x: 52, y: 22 },
  { x: 70, y: 26 },
  { x: 84, y: 40 },
  { x: 70, y: 58 },
  { x: 52, y: 64 },
  { x: 34, y: 58 },
  { x: 16, y: 44 },
]

function shapeNumericId(shapeId: string) {
  const numericId = Number(shapeId.replace('shape-', ''))
  return Number.isNaN(numericId) ? 0 : numericId
}

function nextShapeNumber(state: AppState) {
  return (
    Math.max(
      ...state.desiredState.map((shape) => shapeNumericId(shape.id)),
      ...state.actualState.map((shape) => shapeNumericId(shape.id)),
      0,
    ) + 1
  )
}

function buildActualShapeForIndex(
  shapeId: string,
  nextType: ShapeType,
  nextColor: string,
  index: number,
): ActualShape {
  const slot = actualShapeLayoutSlots[index % actualShapeLayoutSlots.length]
  const size = 62 + (index % 3) * 2
  return {
    id: shapeId,
    type: nextType,
    color: nextColor,
    x: slot.x,
    y: slot.y,
    size,
  }
}

function syncActualWithDesired(state: AppState): ActualShape[] {
  const actualById = new Map(state.actualState.map((shape) => [shape.id, shape]))
  return state.desiredState.map((desiredShape, index) => {
    const matchingActual = actualById.get(desiredShape.id)
    if (!matchingActual) {
      return buildActualShapeForIndex(desiredShape.id, desiredShape.type, desiredShape.color, index)
    }
    return {
      ...matchingActual,
      type: desiredShape.type,
      color: desiredShape.color,
    }
  })
}

function reconcileActualWithDesiredStep(state: AppState): AppState {
  const desiredById = new Map(state.desiredState.map((shape) => [shape.id, shape]))
  const actualById = new Map(state.actualState.map((shape) => [shape.id, shape]))

  const createId = state.desiredState
    .map((shape) => shape.id)
    .sort((left, right) => left.localeCompare(right))
    .find((shapeId) => !actualById.has(shapeId))

  if (createId) {
    const desiredShape = desiredById.get(createId)
    if (!desiredShape) {
      return state
    }
    const desiredIndex = state.desiredState.findIndex((shape) => shape.id === createId)
    if (desiredIndex < 0) {
      return state
    }
    return {
      ...state,
      actualState: [...state.actualState, buildActualShapeForIndex(createId, desiredShape.type, desiredShape.color, desiredIndex)],
    }
  }

  const updateId = state.desiredState
    .map((shape) => shape.id)
    .sort((left, right) => left.localeCompare(right))
    .find((shapeId) => {
      const desiredShape = desiredById.get(shapeId)
      const actualShape = actualById.get(shapeId)
      if (!desiredShape || !actualShape) {
        return false
      }
      return desiredShape.type !== actualShape.type || desiredShape.color !== actualShape.color
    })

  if (updateId) {
    const desiredShape = desiredById.get(updateId)
    if (!desiredShape) {
      return state
    }
    return {
      ...state,
      actualState: state.actualState.map((shape) =>
        shape.id === updateId
          ? {
              ...shape,
              type: desiredShape.type,
              color: desiredShape.color,
            }
          : shape,
      ),
    }
  }

  const deleteId = state.actualState
    .map((shape) => shape.id)
    .sort((left, right) => left.localeCompare(right))
    .find((shapeId) => !desiredById.has(shapeId))

  if (deleteId) {
    return {
      ...state,
      actualState: state.actualState.filter((shape) => shape.id !== deleteId),
      selectedActualShapeId: state.selectedActualShapeId === deleteId ? undefined : state.selectedActualShapeId,
    }
  }

  return state
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'actual/sync-with-desired':
      return {
        ...state,
        actualState: syncActualWithDesired(state),
        selectedActualShapeId: state.desiredState.some((shape) => shape.id === state.selectedActualShapeId)
          ? state.selectedActualShapeId
          : undefined,
      }
    case 'actual/reconcile-step':
      return reconcileActualWithDesiredStep(state)
    case 'actual/select-shape':
      return { ...state, selectedActualShapeId: action.shapeId }
    case 'actual/delete-selected':
      if (!state.selectedActualShapeId) {
        return state
      }
      return {
        ...state,
        actualState: state.actualState.filter((shape) => shape.id !== state.selectedActualShapeId),
        selectedActualShapeId: undefined,
      }
    case 'actual/set-selected-color':
      if (!state.selectedActualShapeId) {
        return state
      }
      return {
        ...state,
        actualState: state.actualState.map((shape) =>
          shape.id === state.selectedActualShapeId ? { ...shape, color: action.color } : shape,
        ),
      }
    case 'desired/add-shape': {
      const nextNumber = nextShapeNumber(state)
      return {
        ...state,
        desiredState: [
          ...state.desiredState,
          {
            id: `shape-${nextNumber}`,
            type: action.nextType,
            color: action.nextColor,
          },
        ],
      }
    }
    case 'desired/remove-shape':
      return {
        ...state,
        desiredState: state.desiredState.filter((shape) => shape.id !== action.shapeId),
      }
    case 'desired/set-shape-type':
      return {
        ...state,
        desiredState: state.desiredState.map((shape) =>
          shape.id === action.shapeId ? { ...shape, type: action.nextType } : shape,
        ),
      }
    case 'desired/set-shape-color':
      return {
        ...state,
        desiredState: state.desiredState.map((shape) =>
          shape.id === action.shapeId ? { ...shape, color: action.nextColor } : shape,
        ),
      }
    default:
      return state
  }
}

export const AppStateContext = createContext<AppState | null>(null)
export const AppDispatchContext = createContext<Dispatch<AppAction> | null>(null)
