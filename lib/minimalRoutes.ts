const MINIMAL_PREFIXES = ['/apps', '/docs', '/proxy'] as const

export function isMinimalRoute(pathname: string): boolean {
  if (!pathname) {
    return false
  }

  return MINIMAL_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}
