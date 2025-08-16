import { BaseArrangement } from './base'
import type { LayoutContainer, CSSProperties } from '$lib/types'

/**
 * Flow arrangement - elements flow naturally like text, wrapping when needed
 * Maps to CSS flexbox with wrap enabled
 */
export class FlowArrangement extends BaseArrangement {
  protected readonly type = 'flow'

  toCSS(container: LayoutContainer): CSSProperties {
    // Flow always wraps
    let css: CSSProperties = {
      ...this.getFlexCSS('row', true, !!container.reverse),
    }

    // Apply alignment, spacing, and size behavior
    css = {
      ...css,
      ...this.getAlignmentCSS(container),
      ...this.getSpacingCSS(container),
      ...this.getSizeBehaviorCSS(container),
    }

    // Set defaults for flow behavior if not specified
    if (!container.align) {
      css['align-items'] = 'flex-start'
      css['align-content'] = 'flex-start'
    }
    if (!container.justify) {
      css['justify-content'] = 'flex-start'
    }

    // Set default gap if not specified (cozy spacing for flow)
    if (container.gap === undefined) {
      css['gap'] = '8px' // Cozy spacing for flow
    }

    // Apply constraints
    css = this.applyConstraints(css, container)

    return css
  }

  getResponsiveCSS(container: LayoutContainer, breakpoint: string): CSSProperties {
    const css = this.toCSS(container)

    // Mobile optimizations
    if (breakpoint === 'mobile') {
      // Increase gap for touch
      if (css['gap']) {
        const currentGap = parseInt(css['gap'] as string)
        css['gap'] = `${Math.max(currentGap * 1.5, 12)}px`
      }

      // Center align on mobile for better appearance
      css['justify-content'] = 'center'
    }

    return css
  }

  validate(container: LayoutContainer): boolean {
    if (container.type !== 'flow') return false

    // Flow doesn't use direction (always flows like text)
    if (container.direction) {
      console.warn('Flow arrangement does not use direction property')
    }

    // Wrap is always true for flow
    if (container.wrap !== undefined && container.wrap !== true) {
      console.warn('Flow arrangement always wraps - wrap property will be ignored')
    }

    // Reverse is optional boolean
    if (container.reverse !== undefined && typeof container.reverse !== 'boolean') {
      return false
    }

    return true
  }
}
