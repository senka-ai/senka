import { BaseArrangement } from './base'
import type { LayoutContainer, CSSProperties } from '$lib/types'

/**
 * Stack arrangement - elements stacked vertically or horizontally
 * Maps to CSS flexbox with column/row direction
 */
export class StackArrangement extends BaseArrangement {
  protected readonly type = 'stack'

  toCSS(container: LayoutContainer): CSSProperties {
    const direction = container.direction || 'vertical'
    const flexDirection = direction === 'vertical' ? 'column' : 'row'

    let css: CSSProperties = {
      ...this.getFlexCSS(flexDirection, !!container.wrap, !!container.reverse),
    }

    // Apply alignment, spacing, and size behavior
    css = {
      ...css,
      ...this.getAlignmentCSS(container),
      ...this.getSpacingCSS(container),
      ...this.getSizeBehaviorCSS(container),
    }

    // Set default alignment if not specified
    if (!container.align) {
      css['align-items'] = 'stretch'
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
      // Always stack vertically on mobile if currently horizontal
      if (container.direction === 'horizontal') {
        css['flex-direction'] = container.reverse ? 'column-reverse' : 'column'
      }

      // Increase gap for touch
      if (css['gap']) {
        const currentGap = parseInt(css['gap'] as string)
        css['gap'] = `${Math.max(currentGap * 1.5, 16)}px`
      }
    }

    return css
  }

  validate(container: LayoutContainer): boolean {
    if (container.type !== 'stack') return false

    // Direction is optional but must be valid if provided
    if (container.direction && !['horizontal', 'vertical'].includes(container.direction)) {
      return false
    }

    // Reverse is optional boolean
    if (container.reverse !== undefined && typeof container.reverse !== 'boolean') {
      return false
    }

    // Wrap is not commonly used in stack but is valid
    if (container.wrap !== undefined && typeof container.wrap !== 'boolean') {
      return false
    }

    return true
  }
}
