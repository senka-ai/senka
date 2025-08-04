import type { ResponsiveBreakpoint } from '$lib/types'

/**
 * Default breakpoint values
 */
export const DEFAULT_BREAKPOINTS: Record<ResponsiveBreakpoint, number> = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
}

/**
 * Generate media query string
 */
export function generateMediaQuery(breakpoint: ResponsiveBreakpoint | number): string {
  const maxWidth = typeof breakpoint === 'number' ? breakpoint : DEFAULT_BREAKPOINTS[breakpoint]

  return `@media (max-width: ${maxWidth}px)`
}

/**
 * Get current breakpoint based on viewport width
 */
export function getCurrentBreakpoint(width: number): ResponsiveBreakpoint {
  if (width <= DEFAULT_BREAKPOINTS.mobile) return 'mobile'
  if (width <= DEFAULT_BREAKPOINTS.tablet) return 'tablet'
  return 'desktop'
}

/**
 * Sort breakpoints from smallest to largest
 */
export function sortBreakpoints(breakpoints: Record<string, any>): Array<[string, any]> {
  const entries = Object.entries(breakpoints)

  return entries.sort((a, b) => {
    const aValue = typeof a[0] === 'number' ? a[0] : DEFAULT_BREAKPOINTS[a[0] as ResponsiveBreakpoint] || Infinity
    const bValue = typeof b[0] === 'number' ? b[0] : DEFAULT_BREAKPOINTS[b[0] as ResponsiveBreakpoint] || Infinity
    return aValue - bValue
  })
}

/**
 * Check if layout should stack on mobile
 */
export function shouldStackOnMobile(arrangementType: string): boolean {
  return ['row', 'grid'].includes(arrangementType)
}

/**
 * Get touch-friendly spacing multiplier
 */
export function getTouchSpacingMultiplier(breakpoint: ResponsiveBreakpoint): number {
  return breakpoint === 'mobile' ? 1.5 : 1
}

/**
 * Calculate responsive font size
 */
export function getResponsiveFontSize(baseSize: number, breakpoint: ResponsiveBreakpoint): number {
  const multipliers: Record<ResponsiveBreakpoint, number> = {
    mobile: 0.875, // 87.5% of base
    tablet: 0.9375, // 93.75% of base
    desktop: 1, // 100% of base
  }

  return Math.round(baseSize * multipliers[breakpoint])
}
