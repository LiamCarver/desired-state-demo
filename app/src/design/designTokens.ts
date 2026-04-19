import type { ShapeType } from './shapeTypes'

export type ShapeSpec = {
  id: ShapeType
  label: string
}

export type PaletteSwatch = {
  name: string
  value: string
}

export const paletteValues = {
  coral: '#E8695C',
  mint: '#1CBFAA',
  purple: '#C77DFF',
  ocean: '#1992D4',
} as const

export const shapeSpecs: ShapeSpec[] = [
  { id: 'circle', label: 'Circle' },
  { id: 'triangle', label: 'Triangle' },
  { id: 'square', label: 'Square' },
  { id: 'x', label: 'X' },
]

export const palette: PaletteSwatch[] = [
  { name: 'Coral', value: paletteValues.coral },
  { name: 'Mint', value: paletteValues.mint },
  { name: 'Purple', value: paletteValues.purple },
  { name: 'Ocean', value: paletteValues.ocean },
]
