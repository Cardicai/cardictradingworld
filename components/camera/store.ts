
'use client'
import { create } from 'zustand'

type Store = {
  target: [number, number, number]
  focusTo: (pos:[number,number,number]) => void
}

export const useCameraFocus = create<Store>((set)=> ({
  target: [0,0,0],
  focusTo: (pos) => set({ target: pos })
}))
