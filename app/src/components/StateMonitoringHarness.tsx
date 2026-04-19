import { useEffect, useMemo, useRef, useState } from 'react'
import ActualStateCanvas from './ActualStateCanvas'
import DesiredStateEditor from './DesiredStateEditor'
import MonitorToastFeed, { type MonitorToastItem } from './MonitorToastFeed'
import { useCanvasController } from '../features/canvas/hooks/useCanvasController'
import { useDesiredStateEditorController } from '../features/desired-state/hooks/useDesiredStateEditorController'
import { useAppDispatch, useAppState } from '../state/useAppStore'
import type { ActualShape, DesiredShape } from '../state/types'

const RECONCILE_INTERVAL_MS = 2000
const TOAST_DURATION_MS = 2600
const TOAST_EXIT_DURATION_MS = 240
const MAX_TOASTS = 4

type MonitorStatus = 'in-sync' | 'out-of-sync'

type DriftInfo = {
  status: MonitorStatus
  issue: string
  fix: string
}

function summarizeDrift(desiredState: DesiredShape[], actualState: ActualShape[]): DriftInfo {
  const desiredById = new Map(desiredState.map((shape) => [shape.id, shape]))
  const actualById = new Map(actualState.map((shape) => [shape.id, shape]))
  const desiredIds = desiredState.map((shape) => shape.id).sort((left, right) => left.localeCompare(right))
  const actualIds = actualState.map((shape) => shape.id).sort((left, right) => left.localeCompare(right))

  const missingInActual = desiredIds.find((shapeId) => !actualById.has(shapeId))
  if (missingInActual) {
    return {
      status: 'out-of-sync',
      issue: `${missingInActual} is missing in actual state.`,
      fix: `Reconciler will create ${missingInActual} in actual state.`,
    }
  }

  const mismatchId = desiredIds.find((shapeId) => {
    const desiredShape = desiredById.get(shapeId)
    const actualShape = actualById.get(shapeId)
    if (!desiredShape || !actualShape) {
      return false
    }
    return desiredShape.type !== actualShape.type || desiredShape.color !== actualShape.color
  })

  if (mismatchId) {
    const desiredShape = desiredById.get(mismatchId)
    const actualShape = actualById.get(mismatchId)
    if (!desiredShape || !actualShape) {
      return {
        status: 'out-of-sync',
        issue: `${mismatchId} has drift.`,
        fix: `Reconciler will update ${mismatchId}.`,
      }
    }

    const mismatchParts: string[] = []
    if (desiredShape.type !== actualShape.type) {
      mismatchParts.push(`type ${actualShape.type} -> ${desiredShape.type}`)
    }
    if (desiredShape.color !== actualShape.color) {
      mismatchParts.push(`color ${actualShape.color} -> ${desiredShape.color}`)
    }

    return {
      status: 'out-of-sync',
      issue: `${mismatchId} differs (${mismatchParts.join(', ')}).`,
      fix: `Reconciler will update ${mismatchId} to match desired state.`,
    }
  }

  const extraInActual = actualIds.find((shapeId) => !desiredById.has(shapeId))
  if (extraInActual) {
    return {
      status: 'out-of-sync',
      issue: `${extraInActual} exists only in actual state.`,
      fix: `Reconciler will remove ${extraInActual} from actual state.`,
    }
  }

  return {
    status: 'in-sync',
    issue: 'Desired and actual states are in sync.',
    fix: 'No reconciliation action required.',
  }
}

function StateMonitoringHarness() {
  const dispatch = useAppDispatch()
  const { desiredState, actualState } = useAppState()
  const desiredEditorController = useDesiredStateEditorController()
  const canvasController = useCanvasController()
  const [toasts, setToasts] = useState<MonitorToastItem[]>([])
  const timeoutIdsRef = useRef<number[]>([])
  const toastIdRef = useRef(0)
  const desiredRef = useRef(desiredState)
  const actualRef = useRef(actualState)
  const previousStatusRef = useRef<MonitorStatus | null>(null)

  const driftSummary = useMemo(() => summarizeDrift(desiredState, actualState), [desiredState, actualState])

  useEffect(() => {
    desiredRef.current = desiredState
    actualRef.current = actualState
  }, [desiredState, actualState])

  function markToastClosing(toastId: number) {
    setToasts((currentToasts) =>
      currentToasts.map((toast) => (toast.id === toastId ? { ...toast, isClosing: true } : toast)),
    )

    const timeoutId = window.setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== toastId))
    }, TOAST_EXIT_DURATION_MS)
    timeoutIdsRef.current.push(timeoutId)
  }

  function pushToast(status: MonitorStatus, message: string) {
    const nextId = toastIdRef.current + 1
    toastIdRef.current = nextId

    setToasts((currentToasts) => {
      const activeToasts = currentToasts.filter((toast) => !toast.isClosing)
      const nextToasts = [...activeToasts.slice(-(MAX_TOASTS - 1)), { id: nextId, status, message, isClosing: false }]
      return nextToasts
    })

    const timeoutId = window.setTimeout(() => {
      markToastClosing(nextId)
    }, TOAST_DURATION_MS)
    timeoutIdsRef.current.push(timeoutId)
  }

  useEffect(() => {
    if (driftSummary.status !== previousStatusRef.current) {
      pushToast(
        driftSummary.status,
        driftSummary.status === 'in-sync'
          ? `In sync: ${driftSummary.issue}`
          : `Out of sync: ${driftSummary.issue} ${driftSummary.fix}`,
      )
    }
    previousStatusRef.current = driftSummary.status
  }, [driftSummary])

  useEffect(() => {
    const timerId = window.setInterval(() => {
      const currentDrift = summarizeDrift(desiredRef.current, actualRef.current)
      if (currentDrift.status === 'out-of-sync') {
        pushToast('out-of-sync', `Reconciling: ${currentDrift.issue} ${currentDrift.fix}`)
      }
      dispatch({ type: 'actual/reconcile-step' })
    }, RECONCILE_INTERVAL_MS)

    return () => {
      window.clearInterval(timerId)
      timeoutIdsRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId)
      })
      timeoutIdsRef.current = []
    }
  }, [dispatch])

  const isInSync = driftSummary.status === 'in-sync'

  return (
    <section className="state-flow-grid" aria-label="State monitoring harness">
      <DesiredStateEditor
        title="Desired State"
        subtitle="Create, update, and remove shapes via store actions."
        shapes={desiredEditorController.shapes}
        colorOptions={desiredEditorController.colorOptions}
        fixedHeight={true}
        maxShapes={4}
        onCreateShape={desiredEditorController.onCreateShape}
        onRemoveShape={desiredEditorController.onRemoveShape}
        onUpdateShape={desiredEditorController.onUpdateShape}
      />

      <div className="flow-link flow-link-left" aria-hidden="true">
        <div className="flow-line flow-line-right" />
      </div>

      <div className="monitor-column">
        <section className="monitor-card" aria-label="State monitoring component">
          <header className="monitor-card-header">
            <h2>Monitoring</h2>
          </header>

          <div className={`monitor-indicator ${isInSync ? 'is-in-sync' : 'is-out-of-sync'}`}>
            <span className="monitor-indicator-dot" aria-hidden="true" />
            <span>{isInSync ? 'In Sync' : 'Out of Sync'}</span>
          </div>
        </section>

        <MonitorToastFeed toasts={toasts} />
      </div>

      <div className="flow-link flow-link-right" aria-hidden="true">
        <div className="flow-line flow-line-right" />
      </div>

      <ActualStateCanvas
        title="Actual State Canvas"
        subtitle="Reconciler applies desired deltas on a 2-second timer."
        shapes={canvasController.shapes}
        selectedShapeId={canvasController.selectedShapeId}
        colorChangingShapeId={canvasController.colorChangingShapeId}
        showShapeIds={true}
        useGridLayout={true}
        colorOptions={canvasController.colorOptions}
        onSelectShape={canvasController.onSelectShape}
        onClearSelection={canvasController.onClearSelection}
        onDeleteSelected={canvasController.onDeleteSelected}
        onSelectColor={canvasController.onSelectColor}
      />
    </section>
  )
}

export default StateMonitoringHarness
