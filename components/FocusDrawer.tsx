'use client'

import { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NAV_ITEMS } from '@/components/data/nav'
import { useUI } from '@/components/ui/store'

function getFocusable(container: HTMLElement | null) {
  if (!container) return [] as HTMLElement[]
  const nodes = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex="0"], [data-focusable="true"]'
  )
  return Array.from(nodes).filter((node) => !node.hasAttribute('aria-hidden'))
}

export default function FocusDrawer() {
  const { focusActive, setFocus } = useUI()
  const pathname = usePathname()
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const savedFocus = useRef<HTMLElement | null>(null)
  const prevPath = useRef(pathname)

  useEffect(() => {
    const root = document.documentElement
    if (focusActive) {
      root.classList.add('focus-active')
      savedFocus.current = document.activeElement as HTMLElement
    } else {
      root.classList.remove('focus-active')
      root.style.removeProperty('--orbit-speed')
      if (savedFocus.current) {
        savedFocus.current.focus({ preventScroll: true })
      }
    }
  }, [focusActive])

  useEffect(() => {
    if (!focusActive) return

    const drawer = drawerRef.current
    if (!drawer) return

    const focusables = getFocusable(drawer)
    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    const focusTimer = requestAnimationFrame(() => {
      first?.focus({ preventScroll: true })
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!focusActive) return
      if (event.key === 'Escape') {
        event.stopPropagation()
        setFocus(false)
        return
      }
      if (event.key !== 'Tab') return
      if (focusables.length === 0) {
        event.preventDefault()
        return
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      cancelAnimationFrame(focusTimer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [focusActive, setFocus])

  useEffect(() => {
    const previous = prevPath.current
    if (previous !== pathname && focusActive) {
      setFocus(false)
    }
    prevPath.current = pathname
  }, [pathname, focusActive, setFocus])

  const buttons = useMemo(() => NAV_ITEMS.slice(0, 5), [])

  const close = () => setFocus(false)

  return (
    <>
      <div
        aria-hidden={!focusActive}
        onClick={focusActive ? close : undefined}
        className={cx(
          'fixed inset-0 z-30 bg-black/55 transition-opacity duration-300 sm:bg-black/65',
          focusActive ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      />
      <aside
        ref={drawerRef}
        aria-hidden={!focusActive}
        className={cx(
          'focus-drawer pointer-events-auto fixed inset-y-0 right-0 z-40 flex w-full max-w-[360px] translate-x-full flex-col',
          'bg-[#07070d]/95 shadow-2xl ring-1 ring-cyan-300/20 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]',
          focusActive ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-6 pb-3 pt-5">
          <h2 className="text-lg font-semibold uppercase tracking-[0.2em]">Focus</h2>
          <button
            onClick={close}
            className="rounded-full px-3 py-1 text-sm font-medium uppercase tracking-wide text-cyan-200/80 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Close
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 pb-10">
          {buttons.map((item) => {
            const isExternal = item.href.startsWith('http')
            const content = (
              <span className="flex w-full items-center justify-between gap-4 text-left">
                <span className="text-balance text-lg font-semibold uppercase tracking-[0.18em] text-white">
                  {item.label}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/60">
                  {isExternal ? 'Launch' : 'Enter'}
                </span>
              </span>
            )

            const classes = 'focus-drawer__button w-full rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/15 via-transparent to-violet-500/15 px-4 py-5 text-left transition hover:border-cyan-300/60 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70'

            if (isExternal) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={classes}
                >
                  {content}
                </a>
              )
            }

            return (
              <Link key={item.label} href={item.href} className={classes}>
                {content}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
