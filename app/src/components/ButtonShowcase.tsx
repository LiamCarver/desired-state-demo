type ActionIcon = 'reconcile' | 'pause' | 'step' | 'delete'

function IconGlyph({ icon }: { icon: ActionIcon }) {
  if (icon === 'reconcile') {
    return (
      <svg className="action-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 12a8 8 0 0 1-13.5 5.8" />
        <path d="M4 12a8 8 0 0 1 13.5-5.8" />
        <path d="M7 19H5v-2" />
        <path d="M17 5h2v2" />
      </svg>
    )
  }

  if (icon === 'pause') {
    return (
      <svg className="action-icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="7" y="6" width="3.5" height="12" rx="1" />
        <rect x="13.5" y="6" width="3.5" height="12" rx="1" />
      </svg>
    )
  }

  if (icon === 'step') {
    return (
      <svg className="action-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 6l8.5 6L7 18z" />
        <path d="M17 6v12" />
      </svg>
    )
  }

  return (
    <svg className="action-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  )
}

function ButtonShowcase() {
  const actionButtons = [
    { label: 'Reconcile', icon: 'reconcile', iconColor: '#4FA7FF' },
    { label: 'Pause', icon: 'pause', iconColor: '#52D39B' },
    { label: 'Step', icon: 'step', iconColor: '#C77DFF' },
    { label: 'Delete Shape', icon: 'delete', iconColor: '#FF6B6B' },
  ] as const

  return (
    <div className="button-row">
      {actionButtons.map((button) => (
        <button
          key={button.label}
          type="button"
          className="btn-shell-only"
          aria-label={button.label}
          title={button.label}
        >
          <span className="action-shell" style={{ color: button.iconColor }}>
            <IconGlyph icon={button.icon} />
          </span>
        </button>
      ))}
    </div>
  )
}

export default ButtonShowcase
