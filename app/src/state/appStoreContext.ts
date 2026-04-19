import { createContext, type Dispatch } from 'react'
import type { ShapeType } from '../design/shapeTypes'
import type { ActualShape, DesiredShape } from './types'

export type AppState = {
  desiredState: DesiredShape[]
  actualState: ActualShape[]
  selectedActualShapeId?: string
}

export type AppAction =
  | { type: 'actual/select-shape'; shapeId?: string }
  | { type: 'actual/delete-selected' }
  | { type: 'actual/set-selected-color'; color: string }
  | { type: 'desired/add-shape'; nextType: ShapeType; nextColor: string }
  | { type: 'desired/remove-shape'; shapeId: string }
  | { type: 'desired/set-shape-type'; shapeId: string; nextType: ShapeType }
  | { type: 'desired/set-shape-color'; shapeId: string; nextColor: string }

export const initialState: AppState = {
  desiredState: [
    { id: 'shape-1', type: 'circle', color: '#E8695C' },
    { id: 'shape-2', type: 'triangle', color: '#1CBFAA' },
    { id: 'shape-3', type: 'square', color: '#C77DFF' },
  ],
  actualState: [
    { id: 'shape-1', type: 'circle', color: '#FF6B6B', x: 18, y: 30, size: 64 },
    { id: 'shape-2', type: 'triangle', color: '#52D39B', x: 42, y: 58, size: 66 },
    { id: 'shape-3', type: 'square', color: '#C77DFF', x: 66, y: 34, size: 62 },
    { id: 'shape-4', type: 'x', color: '#4FA7FF', x: 84, y: 56, size: 62 },
  ],
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
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
      const nextShapeNumber =
        state.desiredState.reduce((max, shape) => {
          const numericId = Number(shape.id.replace('shape-', ''))
          return Number.isNaN(numericId) ? max : Math.max(max, numericId)
        }, 0) + 1
      return {
        ...state,
        desiredState: [
          ...state.desiredState,
          {
            id: `shape-${nextShapeNumber}`,
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
