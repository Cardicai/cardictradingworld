'use client'
import { create } from 'zustand'

type UIStore = {
  focusActive: boolean
  toggleFocus: () => void
  setFocus: (value: boolean) => void
}

export const useUI = create<UIStore>((set) => ({
  focusActive: false,
  toggleFocus: () =>
    set((state) => ({
      focusActive: !state.focusActive,
    })),
  setFocus: (value) => set({ focusActive: value }),
}))
