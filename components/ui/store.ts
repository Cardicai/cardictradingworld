'use client'
import { create } from 'zustand'

type UIStore = {
  focusMenuOpen: boolean
  openFocusMenu: () => void
  closeFocusMenu: () => void
  toggleFocusMenu: () => void
}

function syncFocusState(active: boolean) {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.classList.toggle('focus-active', active)

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (active) {
    root.style.setProperty('--orbit-speed', '0')
    return
  }

  if (reduceMotion) {
    root.style.setProperty('--orbit-speed', '0')
    return
  }

  let current = NaN
  if (typeof window !== 'undefined') {
    const raw = getComputedStyle(root).getPropertyValue('--orbit-speed')
    current = parseFloat(raw)
  }

  if (!Number.isFinite(current) || current <= 0) {
    root.style.setProperty('--orbit-speed', '1')
  } else {
    root.style.setProperty('--orbit-speed', '1')
  }
}

export const useUI = create<UIStore>((set, get) => ({
  focusMenuOpen: false,
  openFocusMenu: () => {
    syncFocusState(true)
    set({ focusMenuOpen: true })
  },
  closeFocusMenu: () => {
    syncFocusState(false)
    set({ focusMenuOpen: false })
  },
  toggleFocusMenu: () => {
    const next = !get().focusMenuOpen
    syncFocusState(next)
    set({ focusMenuOpen: next })
  },
}))
