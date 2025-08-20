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
      ...this.getStackSizeBehaviorCSS(container),
    }

    // Set default alignment if not specified
    if (!container.align) {
      css['align-items'] = 'stretch'
    }

    // Set default gap if not specified
    if (container.gap === undefined) {
      css['gap'] = '16px' // Default normal spacing
    }

    // Handle expandChildren property
    if (container.expandChildren) {
      css['&>*'] = 'flex-grow: 1;'
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

  /**
   * Stack-specific size behavior - fill based on direction when fillContainer is true
   */
  private getStackSizeBehaviorCSS(container: LayoutContainer): CSSProperties {
    const css: CSSProperties = {}
    const direction = container.direction || 'vertical'

    if (container.fillContainer) {
      if (direction === 'vertical') {
        // Vertical stack: fill height, width remains content-based
        css['height'] = '100%'
      } else {
        // Horizontal stack: fill width, height remains content-based
        css['width'] = '100%'
      }
    } else if (!container.fixed) {
      // Default is hug-contents
      css['width'] = 'fit-content'
      css['height'] = 'fit-content'
    }
    // Fixed mode doesn't add any CSS (uses natural sizing)

    return css
  }
}
