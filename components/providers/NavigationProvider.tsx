'use client'

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'

export type DrawerMode = 'navigation' | 'contact'

interface NavigationContextValue {
  isOpen: boolean
  mode: DrawerMode
  open: (mode?: DrawerMode) => void
  close: () => void
}

const NavigationContext = createContext<NavigationContextValue | null>(null)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<DrawerMode>('navigation')

  const close = useCallback(() => setIsOpen(false), [])
  const open = useCallback((m: DrawerMode = 'navigation') => {
    setMode(m)
    setIsOpen(true)
  }, [])

  const value = useMemo(() => ({ isOpen, mode, open, close }), [isOpen, mode, open, close])

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider')
  return ctx
}
