'use client'
import { create } from 'zustand'

type UIStore = {
  sidebar: boolean
  animationSpeed: number
  toggleSidebar: () => void
  setSidebar: (v: boolean) => void
  setAnimationSpeed: (speed: number) => void
}

export const useUI = create<UIStore>((set) => ({
  sidebar: false,
  animationSpeed: 1,
  toggleSidebar: () =>
    set((state) => {
      const sidebar = !state.sidebar
      return {
        sidebar,
        animationSpeed: sidebar ? 0 : 1,
      }
    }),
  setSidebar: (v) =>
    set({
      sidebar: v,
      animationSpeed: v ? 0 : 1,
    }),
  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
}))
