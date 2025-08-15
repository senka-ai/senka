import { BaseArrangement } from './base'
import type { LayoutContainer, CSSProperties } from '$lib/types'

/**
 * Row arrangement - elements arranged side-by-side horizontally
 * Maps to CSS flexbox with row direction and optional wrapping
 */
export class RowArrangement extends BaseArrangement {
  protected readonly type = 'row'

  toCSS(container: LayoutContainer): CSSProperties {
    let css: CSSProperties = {
      ...this.getFlexCSS('row', !!container.wrap, !!container.reverse),
    }

    // Apply alignment, spacing, and size behavior
    css = { 
      ...css, 
      ...this.getAlignmentCSS(container),
      ...this.getSpacingCSS(container),
      ...this.getSizeBehaviorCSS(container)
    }

    // Set default alignment if not specified
    if (!container.align) {
      css['align-items'] = 'center'
    }
    if (!container.justify) {
      css['justify-content'] = 'flex-start'
    }

    // Set default gap if not specified
    if (container.gap === undefined) {
      css['gap'] = '16px' // Default normal spacing
    }

    // Apply constraints
    css = this.applyConstraints(css, container)

    return css
  }

  getResponsiveCSS(container: LayoutContainer, breakpoint: string): CSSProperties {
    const css = this.toCSS(container)

    // Mobile optimizations
    if (breakpoint === 'mobile') {
      // Enable wrapping on mobile if not already set
      if (!container.wrap) {
        css['flex-wrap'] = 'wrap'
      }

      // Increase gap for touch
      if (css['gap']) {
        const currentGap = parseInt(css['gap'] as string)
        css['gap'] = `${Math.max(currentGap * 1.5, 16)}px`
      }

      // Adjust alignment for better mobile layout
      css['justify-content'] = 'center'
    }

    return css
  }

  validate(container: LayoutContainer): boolean {
    if (container.type !== 'row') return false

    // Direction is not used in row (always horizontal)
    if (container.direction) {
      console.warn('Row arrangement does not use direction property - it is always horizontal')
    }

    // Wrap is optional boolean
    if (container.wrap !== undefined && typeof container.wrap !== 'boolean') {
      return false
    }

    // Reverse is optional boolean
    if (container.reverse !== undefined && typeof container.reverse !== 'boolean') {
      return false
    }

    return true
  }
}
