import type { ShapeType } from '../design/shapeTypes'

export type DesiredShape = {
  id: string
  type: ShapeType
  color: string
}

export type ActualShape = {
  id: string
  type: ShapeType
  color: string
  x: number
  y: number
  size: number
}

export type ColorOption = {
  name: string
  value: string
}
