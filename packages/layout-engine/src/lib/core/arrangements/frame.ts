import { BaseArrangement } from './base'
import type { LayoutContainer, CSSProperties } from '$lib/types'

/**
 * Frame arrangement - Container that can hold any other arrangement
 * Provides structure and boundaries for nested layouts
 */
export class FrameArrangement extends BaseArrangement {
  protected readonly type = 'frame'

  toCSS(container: LayoutContainer): CSSProperties {
    let css: CSSProperties = {
      position: 'relative',
      display: 'block',
      width: '100%',
      'box-sizing': 'border-box',
    }

    // If direction is specified, frame behaves like a flex container
    if (container.direction || container.align || container.justify) {
      css['display'] = 'flex'
      css['flex-direction'] = container.direction === 'horizontal' ? 'row' : 'column'
      
      // Apply alignment, spacing, and size behavior
      css = { 
        ...css, 
        ...this.getAlignmentCSS(container),
        ...this.getSpacingCSS(container),
        ...this.getSizeBehaviorCSS(container)
      }
    } else {
      // Basic frame with spacing and size behavior only
      css = { 
        ...css, 
        ...this.getSpacingCSS(container),
        ...this.getSizeBehaviorCSS(container)
      }
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

  validate(container: LayoutContainer): boolean {
    if (container.type !== 'frame') return false

    // Frame can use direction for internal layout
    if (container.direction && !['horizontal', 'vertical'].includes(container.direction)) {
      return false
    }

    // Other properties are not typically used
    if (container.wrap || container.reverse) {
      console.warn('Frame arrangement does not typically use wrap or reverse properties')
    }

    return true
  }
}
