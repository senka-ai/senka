import { BaseArrangement } from './base'
import type { LayoutContainer, CSSProperties, ArrangementConfig } from '$lib/types'

/**
 * Flow arrangement - elements flow naturally like text, wrapping when needed
 * Maps to CSS flexbox with wrap enabled
 */
export class FlowArrangement extends BaseArrangement {
  protected readonly type = 'flow'

  toCSS(container: LayoutContainer): CSSProperties {
    const { arrangement, autoLayout } = container

    // Flow always wraps
    let css: CSSProperties = {
      ...this.getFlexCSS('row', true, arrangement.reverse),
    }

    // Apply auto-layout if configured
    if (autoLayout) {
      css = { ...css, ...this.getAutoLayoutCSS(autoLayout) }
    } else {
      // Default flow behavior - like inline elements
      css['align-items'] = 'flex-start'
      css['align-content'] = 'flex-start'
      css['justify-content'] = 'flex-start'
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

  validate(config: ArrangementConfig): boolean {
    if (config.type !== 'flow') return false

    // Flow doesn't use direction (always flows like text)
    if (config.direction) {
      console.warn('Flow arrangement does not use direction property')
    }

    // Wrap is always true for flow
    if (config.wrap !== undefined && config.wrap !== true) {
      console.warn('Flow arrangement always wraps - wrap property will be ignored')
    }

    // Reverse is optional boolean
    if (config.reverse !== undefined && typeof config.reverse !== 'boolean') {
      return false
    }

    return true
  }
}
