import { BaseArrangement } from './base'
import type { LayoutContainer, CSSProperties, ArrangementConfig } from '$lib/types'

/**
 * Overlay arrangement - elements layered on top of each other
 * Maps to CSS position relative/absolute
 */
export class OverlayArrangement extends BaseArrangement {
  protected readonly type = 'overlay'

  toCSS(container: LayoutContainer): CSSProperties {
    const { overlay, autoLayout } = container

    let css: CSSProperties = {
      position: 'relative',
      width: '100%',
      height: '100%',
    }

    // Apply auto-layout padding if configured
    if (autoLayout?.padding) {
      const padding = []
      const { top, right, bottom, left, all } = autoLayout.padding

      if (all) {
        css['padding'] = `${this.getSpacingPixels(all)}px`
      } else {
        if (top) padding.push(`${this.getSpacingPixels(top)}px`)
        else padding.push('0')

        if (right) padding.push(`${this.getSpacingPixels(right)}px`)
        else padding.push('0')

        if (bottom) padding.push(`${this.getSpacingPixels(bottom)}px`)
        else padding.push('0')

        if (left) padding.push(`${this.getSpacingPixels(left)}px`)
        else padding.push('0')

        css['padding'] = padding.join(' ')
      }
    }

    // Backdrop for overlay
    if (overlay?.backdrop) {
      // This would typically be handled by a pseudo-element or separate backdrop element
      css['isolation'] = 'isolate'
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

  validate(config: ArrangementConfig): boolean {
    if (config.type !== 'overlay') return false

    // Overlay doesn't use direction, wrap, or reverse
    if (config.direction || config.wrap || config.reverse) {
      console.warn('Overlay arrangement does not use direction, wrap, or reverse properties')
    }

    return true
  }

  private getSpacingPixels(value: any): number {
    // Helper to convert spacing value to pixels
    // This would use the spacing utility in real implementation
    const spacingMap: Record<string, number> = {
      none: 0,
      tight: 4,
      cozy: 8,
      normal: 16,
      comfortable: 24,
      spacious: 32,
    }

    if (typeof value === 'object' && value.scale) {
      return value.custom || spacingMap[value.scale] || 0
    }

    return 0
  }
}
