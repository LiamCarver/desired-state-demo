import type { ShapeType } from '../design/shapeTypes'
import ShapeGlyph from './ShapeGlyph'

type ShapeButtonShellProps = {
  type: ShapeType
  color: string
  size: number | string
  className?: string
  glyphStrokeWidth?: number
}

function ShapeButtonShell({
  type,
  color,
  size,
  className,
  glyphStrokeWidth = 2.6,
}: ShapeButtonShellProps) {
  const resolvedSize = typeof size === 'number' ? `${size}px` : size

  return (
    <span
      className={`ps-shape-shell${className ? ` ${className}` : ''}`}
      style={{ width: resolvedSize, height: resolvedSize, color }}
      aria-hidden="true"
    >
      <ShapeGlyph type={type} className="ps-shape-glyph" strokeWidth={glyphStrokeWidth} />
    </span>
  )
}

export default ShapeButtonShell
