import { BaseArrangement } from './base'
import type { LayoutContainer, CSSProperties } from '$lib/types'

/**
 * Grid arrangement - elements arranged in a structured grid
 * Maps to CSS Grid with configurable columns and rows
 */
export class GridArrangement extends BaseArrangement {
  protected readonly type = 'grid'

  toCSS(container: LayoutContainer): CSSProperties {
    let css: CSSProperties = {
      display: 'grid',
    }

    // Configure grid columns using flat properties
    if (container.columns !== undefined) {
      if (container.columns === 'auto') {
        // Auto-fit with minimum column width (200px default)
        css['grid-template-columns'] = 'repeat(auto-fit, minmax(200px, 1fr))'
      } else {
        // Fixed number of columns
        css['grid-template-columns'] = `repeat(${container.columns}, 1fr)`
      }
    } else {
      // Default grid configuration
      css['grid-template-columns'] = 'repeat(auto-fit, minmax(200px, 1fr))'
    }

    // Configure grid rows if specified
    if (container.rows !== undefined) {
      if (container.rows === 'auto') {
        css['grid-auto-rows'] = 'minmax(min-content, max-content)'
      } else {
        css['grid-template-rows'] = `repeat(${container.rows}, 1fr)`
      }
    }

    // Apply spacing and size behavior
    css = {
      ...css,
      ...this.getSpacingCSS(container),
      ...this.getSizeBehaviorCSS(container),
    }

    // Set default gap if not specified
    if (container.gap === undefined) {
      css['gap'] = '16px' // Default normal spacing
    }

    // Grid alignment defaults
    css['align-items'] = 'stretch'
    css['justify-items'] = 'stretch'

    // Apply constraints
    css = this.applyConstraints(css, container)

    return css
  }

  getResponsiveCSS(container: LayoutContainer, breakpoint: string): CSSProperties {
    const css = this.toCSS(container)

    // Mobile optimizations
    if (breakpoint === 'mobile') {
      // Simplify grid on mobile - max 2 columns
      if (typeof container.columns === 'number' && container.columns > 2) {
        css['grid-template-columns'] = 'repeat(2, 1fr)'
      } else if (container.columns === 'auto' || container.columns === undefined) {
        // Ensure minimum width is touch-friendly
        css['grid-template-columns'] = 'repeat(auto-fit, minmax(150px, 1fr))'
      }

      // Increase gap for touch
      if (css['gap']) {
        const currentGap = parseInt(css['gap'] as string)
        css['gap'] = `${Math.max(currentGap * 1.5, 16)}px`
      }
    }

    // Tablet optimizations
    if (breakpoint === 'tablet') {
      // Adjust columns for tablet
      if (typeof container.columns === 'number' && container.columns > 3) {
        css['grid-template-columns'] = 'repeat(3, 1fr)'
      }
    }

    return css
  }

  validate(container: LayoutContainer): boolean {
    if (container.type !== 'grid') return false

    // Grid doesn't use direction, wrap, or reverse
    if (container.direction || container.wrap || container.reverse) {
      console.warn('Grid arrangement does not use direction, wrap, or reverse properties')
    }

    // Validate columns
    if (container.columns !== undefined) {
      if (typeof container.columns !== 'number' && container.columns !== 'auto') {
        return false
      }
      if (typeof container.columns === 'number' && container.columns < 1) {
        return false
      }
    }

    // Validate rows
    if (container.rows !== undefined) {
      if (typeof container.rows !== 'number' && container.rows !== 'auto') {
        return false
      }
      if (typeof container.rows === 'number' && container.rows < 1) {
        return false
      }
    }

    return true
  }
}
