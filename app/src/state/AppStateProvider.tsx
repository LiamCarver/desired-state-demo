import { useMemo, useReducer, type ReactNode } from 'react'
import {
  AppDispatchContext,
  AppStateContext,
  appReducer,
  initialState,
} from './appStoreContext'

type AppStateProviderProps = {
  children: ReactNode
}

export function AppStateProvider({ children }: AppStateProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const stateValue = useMemo(() => state, [state])
  return (
    <AppStateContext.Provider value={stateValue}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}
