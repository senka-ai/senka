import { BaseArrangement } from './base'
import type { LayoutContainer, CSSProperties, ArrangementConfig } from '$lib/types'

/**
 * Stack arrangement - elements stacked vertically or horizontally
 * Maps to CSS flexbox with column/row direction
 */
export class StackArrangement extends BaseArrangement {
  protected readonly type = 'stack'

  toCSS(container: LayoutContainer): CSSProperties {
    const { arrangement, autoLayout } = container
    const direction = arrangement.direction || 'vertical'
    const flexDirection = direction === 'vertical' ? 'column' : 'row'

    let css: CSSProperties = {
      ...this.getFlexCSS(flexDirection, false, arrangement.reverse),
    }

    // Apply auto-layout if configured
    if (autoLayout) {
      css = { ...css, ...this.getAutoLayoutCSS(autoLayout) }
    } else {
      // Default stack behavior
      css['align-items'] = 'stretch'
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
      const { arrangement } = container

      // Always stack vertically on mobile if currently horizontal
      if (arrangement.direction === 'horizontal') {
        css['flex-direction'] = arrangement.reverse ? 'column-reverse' : 'column'
      }

      // Increase gap for touch
      if (css['gap']) {
        const currentGap = parseInt(css['gap'] as string)
        css['gap'] = `${Math.max(currentGap * 1.5, 16)}px`
      }
    }

    return css
  }

  validate(config: ArrangementConfig): boolean {
    if (config.type !== 'stack') return false

    // Direction is optional but must be valid if provided
    if (config.direction && !['horizontal', 'vertical'].includes(config.direction)) {
      return false
    }

    // Reverse is optional boolean
    if (config.reverse !== undefined && typeof config.reverse !== 'boolean') {
      return false
    }

    // Wrap is not used in stack
    if (config.wrap !== undefined) {
      console.warn('Stack arrangement does not support wrap property')
    }

    return true
  }
}
