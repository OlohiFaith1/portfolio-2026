'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

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

  function open(m: DrawerMode = 'navigation') {
    setMode(m)
    setIsOpen(true)
  }

  return (
    <NavigationContext.Provider value={{ isOpen, mode, open, close: () => setIsOpen(false) }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider')
  return ctx
}
