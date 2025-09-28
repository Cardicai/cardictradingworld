'use client'
import { create } from 'zustand'

type UIStore = {
  sidebar: boolean
  toggleSidebar: () => void
  setSidebar: (v:boolean)=>void
}
export const useUI = create<UIStore>((set)=>({
  sidebar: false,
  toggleSidebar: ()=>set(s=>({ sidebar: !s.sidebar })),
  setSidebar: (v)=>set({ sidebar: v })
}))
