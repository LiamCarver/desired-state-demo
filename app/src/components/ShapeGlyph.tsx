import type { ShapeType } from '../design/shapeTypes'

type ShapeGlyphProps = {
  type: ShapeType
  className?: string
  strokeWidth?: number
}

function ShapeGlyph({ type, className, strokeWidth = 2.2 }: ShapeGlyphProps) {
  if (type === 'circle') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth={strokeWidth} />
      </svg>
    )
  }

  if (type === 'triangle') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <polygon
          points="12,4 20,18 4,18"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (type === 'square') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="4.5"
          y="4.5"
          width="15"
          height="15"
          rx="2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
      </svg>
    )
  }

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <line
        x1="6"
        y1="6"
        x2="18"
        y2="18"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="6"
        x2="6"
        y2="18"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}

export default ShapeGlyph
