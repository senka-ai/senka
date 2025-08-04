import { BaseArrangement } from './base'
import type { LayoutContainer, CSSProperties, ArrangementConfig } from '$lib/types'

/**
 * Row arrangement - elements arranged side-by-side horizontally
 * Maps to CSS flexbox with row direction and optional wrapping
 */
export class RowArrangement extends BaseArrangement {
  protected readonly type = 'row'

  toCSS(container: LayoutContainer): CSSProperties {
    const { arrangement, autoLayout } = container

    let css: CSSProperties = {
      ...this.getFlexCSS('row', arrangement.wrap, arrangement.reverse),
    }

    // Apply auto-layout if configured
    if (autoLayout) {
      css = { ...css, ...this.getAutoLayoutCSS(autoLayout) }
    } else {
      // Default row behavior
      css['align-items'] = 'center'
      css['justify-content'] = 'flex-start'
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
      if (!container.arrangement.wrap) {
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

  validate(config: ArrangementConfig): boolean {
    if (config.type !== 'row') return false

    // Direction is not used in row (always horizontal)
    if (config.direction) {
      console.warn('Row arrangement does not use direction property - it is always horizontal')
    }

    // Wrap is optional boolean
    if (config.wrap !== undefined && typeof config.wrap !== 'boolean') {
      return false
    }

    // Reverse is optional boolean
    if (config.reverse !== undefined && typeof config.reverse !== 'boolean') {
      return false
    }

    return true
  }
}
