export type ShapeSpec = {
  id: string
  label: string
  className: string
}

export type PaletteSwatch = {
  name: string
  value: string
}

export const shapeSpecs: ShapeSpec[] = [
  { id: 'circle', label: 'Circle', className: 'shape shape-circle' },
  { id: 'triangle', label: 'Triangle', className: 'shape shape-triangle' },
  { id: 'square', label: 'Square', className: 'shape shape-square' },
]

export const palette: PaletteSwatch[] = [
  { name: 'Ocean', value: '#1992D4' },
  { name: 'Mint', value: '#1CBFAA' },
  { name: 'Amber', value: '#E9A322' },
  { name: 'Coral', value: '#E8695C' },
]
