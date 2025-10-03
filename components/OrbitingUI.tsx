'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { useMemo } from 'react'
import { NAV_ITEMS } from '@/components/data/nav'

const ORBIT_COUNT = 6

export default function OrbitingUI() {
  const items = useMemo(() => NAV_ITEMS.slice(0, ORBIT_COUNT), [])

  return (
    <div className="orbiting-ui pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      <ul className="orbiting-ui__ring relative flex h-[min(70vw,38rem)] w-[min(70vw,38rem)] items-center justify-center">
        {items.map((item, index) => {
          const angle = (index / items.length) * Math.PI * 2
          const radius = index % 2 === 0 ? 'var(--orbit-radius-large)' : 'var(--orbit-radius-small)'
          const speed = index % 2 === 0 ? '1' : '0.8'
          const linkProps = item.href.startsWith('http')
            ? { href: item.href, target: '_blank', rel: 'noreferrer' }
            : { href: item.href }

          return (
            <li
              key={item.label}
              style={{
                '--item-phase': `${angle}rad`,
                '--item-speed': speed,
                '--item-radius': radius,
              } as CSSProperties}
              className="orbiting-ui__item"
            >
              <Link
                {...linkProps}
                className="orbit-chip"
                tabIndex={0}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
