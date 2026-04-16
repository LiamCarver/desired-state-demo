import type { ShapeType } from './shapeTypes'

export type ShapeSpec = {
  id: ShapeType
  label: string
}

export type PaletteSwatch = {
  name: string
  value: string
}

export const shapeSpecs: ShapeSpec[] = [
  { id: 'circle', label: 'Circle' },
  { id: 'triangle', label: 'Triangle' },
  { id: 'square', label: 'Square' },
  { id: 'x', label: 'X' },
]

export const palette: PaletteSwatch[] = [
  { name: 'Ocean', value: '#1992D4' },
  { name: 'Mint', value: '#1CBFAA' },
  { name: 'Amber', value: '#E9A322' },
  { name: 'Coral', value: '#E8695C' },
]
