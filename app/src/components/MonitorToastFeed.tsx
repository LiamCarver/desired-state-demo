type MonitorStatus = 'in-sync' | 'out-of-sync'

export type MonitorToastItem = {
  id: number
  status: MonitorStatus
  message: string
  isClosing: boolean
}

type MonitorToastFeedProps = {
  toasts: MonitorToastItem[]
}

function MonitorToastFeed({ toasts }: MonitorToastFeedProps) {
  return (
    <section className="monitor-toast-feed" aria-live="polite" aria-label="Monitoring event toasts">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`monitor-toast ${toast.status === 'in-sync' ? 'is-success' : 'is-warning'} ${toast.isClosing ? 'is-closing' : ''}`}
        >
          {toast.message}
        </div>
      ))}
    </section>
  )
}

export default MonitorToastFeed
