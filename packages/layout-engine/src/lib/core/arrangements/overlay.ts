import { BaseArrangement } from './base'
import type { LayoutContainer, CSSProperties } from '$lib/types'

/**
 * Overlay arrangement - elements layered on top of each other
 * Maps to CSS position relative/absolute
 */
export class OverlayArrangement extends BaseArrangement {
  protected readonly type = 'overlay'

  toCSS(container: LayoutContainer): CSSProperties {
    let css: CSSProperties = {
      position: 'relative',
      width: '100%',
      height: '100%',
    }

    // Apply spacing and size behavior
    css = {
      ...css,
      ...this.getSpacingCSS(container),
      ...this.getSizeBehaviorCSS(container),
    }

    // Set z-index if specified
    if (container.zIndex !== undefined) {
      css['z-index'] = container.zIndex.toString()
    }

    // Apply constraints
    css = this.applyConstraints(css, container)

    return css
  }

  /**
   * Get CSS for overlay child elements based on position
   */
  getChildCSS(position: string, customPosition?: { x: number; y: number }): CSSProperties {
    const css: CSSProperties = {
      position: 'absolute',
    }

    switch (position) {
      case 'center':
        css['top'] = '50%'
        css['left'] = '50%'
        css['transform'] = 'translate(-50%, -50%)'
        break

      case 'top-left':
        css['top'] = '0'
        css['left'] = '0'
        break

      case 'top-right':
        css['top'] = '0'
        css['right'] = '0'
        break

      case 'bottom-left':
        css['bottom'] = '0'
        css['left'] = '0'
        break

      case 'bottom-right':
        css['bottom'] = '0'
        css['right'] = '0'
        break

      case 'custom':
        if (customPosition) {
          css['top'] = `${customPosition.y}px`
          css['left'] = `${customPosition.x}px`
        }
        break
    }

    return css
  }

  getResponsiveCSS(container: LayoutContainer, breakpoint: string): CSSProperties {
    const css = this.toCSS(container)

    // Mobile optimizations
    if (breakpoint === 'mobile') {
      // Ensure full viewport on mobile
      css['min-height'] = '100vh'

      // Add safe area insets for mobile devices
      if (css['padding']) {
        const currentPadding = css['padding'] as string
        css['padding'] = `env(safe-area-inset-top, ${currentPadding})`
      }
    }

    return css
  }

  validate(container: LayoutContainer): boolean {
    if (container.type !== 'overlay') return false

    // Overlay doesn't use direction, wrap, or reverse
    if (container.direction || container.wrap || container.reverse) {
      console.warn('Overlay arrangement does not use direction, wrap, or reverse properties')
    }

    // Validate position
    if (
      container.position &&
      !['center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(container.position)
    ) {
      return false
    }

    // Validate zIndex
    if (container.zIndex !== undefined && typeof container.zIndex !== 'number') {
      return false
    }

    return true
  }
}
