import { BaseArrangement } from './base'
import type { LayoutContainer, CSSProperties, ArrangementConfig } from '$lib/types'
import { getSpacingValue } from '$lib/utils/spacing'

/**
 * Grid arrangement - elements arranged in a structured grid
 * Maps to CSS Grid with configurable columns and rows
 */
export class GridArrangement extends BaseArrangement {
  protected readonly type = 'grid'

  toCSS(container: LayoutContainer): CSSProperties {
    const { grid, autoLayout } = container

    let css: CSSProperties = {
      display: 'grid',
    }

    // Configure grid columns
    if (grid) {
      if (grid.columns === 'auto') {
        // Auto-fit with minimum column width
        const minWidth = grid.columnMinWidth || 200
        css['grid-template-columns'] = `repeat(auto-fit, minmax(${minWidth}px, 1fr))`
      } else {
        // Fixed number of columns
        css['grid-template-columns'] = `repeat(${grid.columns}, 1fr)`
      }

      // Configure grid rows if specified
      if (grid.rows) {
        if (grid.rows === 'auto') {
          css['grid-auto-rows'] = 'minmax(min-content, max-content)'
        } else {
          css['grid-template-rows'] = `repeat(${grid.rows}, 1fr)`
        }
      }

      // Grid gap
      if (grid.gap) {
        css['gap'] = `${getSpacingValue(grid.gap)}px`
      } else {
        css['gap'] = '16px' // Default normal spacing
      }

      // Aspect ratio for grid items
      if (grid.aspectRatio) {
        css['grid-auto-rows'] = `minmax(0, 1fr)`
        // Note: aspect-ratio would be applied to grid items, not the container
      }
    } else {
      // Default grid configuration
      css['grid-template-columns'] = 'repeat(auto-fit, minmax(200px, 1fr))'
      css['gap'] = '16px'
    }

    // Apply auto-layout padding if configured
    if (autoLayout?.padding) {
      const padding = []
      const { top, right, bottom, left, all } = autoLayout.padding

      if (all) {
        css['padding'] = `${getSpacingValue(all)}px`
      } else {
        if (top) padding.push(`${getSpacingValue(top)}px`)
        else padding.push('0')

        if (right) padding.push(`${getSpacingValue(right)}px`)
        else padding.push('0')

        if (bottom) padding.push(`${getSpacingValue(bottom)}px`)
        else padding.push('0')

        if (left) padding.push(`${getSpacingValue(left)}px`)
        else padding.push('0')

        css['padding'] = padding.join(' ')
      }
    }

    // Grid alignment
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
      const { grid } = container

      // Simplify grid on mobile - max 2 columns
      if (grid && typeof grid.columns === 'number' && grid.columns > 2) {
        css['grid-template-columns'] = 'repeat(2, 1fr)'
      } else if (!grid || grid.columns === 'auto') {
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
      const { grid } = container

      // Adjust columns for tablet
      if (grid && typeof grid.columns === 'number' && grid.columns > 3) {
        css['grid-template-columns'] = 'repeat(3, 1fr)'
      }
    }

    return css
  }

  validate(config: ArrangementConfig): boolean {
    if (config.type !== 'grid') return false

    // Grid doesn't use direction, wrap, or reverse
    if (config.direction || config.wrap || config.reverse) {
      console.warn('Grid arrangement does not use direction, wrap, or reverse properties')
    }

    return true
  }
}
