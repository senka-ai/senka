import { BaseArrangement } from './base'
import type { LayoutContainer, CSSProperties, ArrangementConfig } from '$lib/types'

/**
 * Frame arrangement - Container that can hold any other arrangement
 * Provides structure and boundaries for nested layouts
 */
export class FrameArrangement extends BaseArrangement {
  protected readonly type = 'frame'

  toCSS(container: LayoutContainer): CSSProperties {
    const { autoLayout } = container

    let css: CSSProperties = {
      position: 'relative',
      display: 'block',
    }

    // Apply auto-layout if configured
    if (autoLayout) {
      // Frame with auto-layout behaves like a flex container
      css['display'] = 'flex'
      css['flex-direction'] = 'column'
      css = { ...css, ...this.getAutoLayoutCSS(autoLayout) }
    } else {
      // Default frame behavior
      css['width'] = '100%'
      css['box-sizing'] = 'border-box'
    }

    // Frames often have borders or backgrounds
    css['overflow'] = 'hidden'

    // Apply constraints
    css = this.applyConstraints(css, container)

    return css
  }

  getResponsiveCSS(container: LayoutContainer, breakpoint: string): CSSProperties {
    const css = this.toCSS(container)

    // Mobile optimizations
    if (breakpoint === 'mobile') {
      // Ensure frames don't overflow on mobile
      css['max-width'] = '100%'

      // Remove horizontal margins on mobile
      if (!css['margin']) {
        css['margin-left'] = '0'
        css['margin-right'] = '0'
      }
    }

    return css
  }

  validate(config: ArrangementConfig): boolean {
    if (config.type !== 'frame') return false

    // Frame can use direction for internal layout
    if (config.direction && !['horizontal', 'vertical'].includes(config.direction)) {
      return false
    }

    // Other properties are not typically used
    if (config.wrap || config.reverse) {
      console.warn('Frame arrangement does not typically use wrap or reverse properties')
    }

    return true
  }
}
