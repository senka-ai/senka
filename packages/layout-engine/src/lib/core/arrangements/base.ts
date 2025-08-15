import type { LayoutContainer, CSSProperties, SpacingValue, SpacingScale, PaddingValue } from '$lib/types'
import { getSpacingValue } from '$lib/utils/spacing'

/**
 * Base class for all arrangement implementations
 */
export abstract class BaseArrangement {
  protected abstract readonly type: string

  /**
   * Convert the arrangement to CSS properties
   */
  abstract toCSS(container: LayoutContainer): CSSProperties

  /**
   * Get responsive CSS for the arrangement
   */
  abstract getResponsiveCSS(container: LayoutContainer, breakpoint: string): CSSProperties

  /**
   * Validate the layout container configuration
   */
  abstract validate(container: LayoutContainer): boolean

  /**
   * Common CSS properties for flex-based layouts
   */
  protected getFlexCSS(direction: 'row' | 'column', wrap: boolean = false, reverse: boolean = false): CSSProperties {
    const flexDirection = reverse ? (direction === 'row' ? 'row-reverse' : 'column-reverse') : direction

    return {
      display: 'flex',
      'flex-direction': flexDirection,
      'flex-wrap': wrap ? 'wrap' : 'nowrap',
    }
  }

  /**
   * Get CSS for alignment properties
   */
  protected getAlignmentCSS(container: LayoutContainer): CSSProperties {
    const css: CSSProperties = {}

    // Justify content (main axis)
    if (container.justify) {
      switch (container.justify) {
        case 'packed':
          css['justify-content'] = 'flex-start'
          break
        case 'space-between':
          css['justify-content'] = 'space-between'
          break
        case 'space-around':
          css['justify-content'] = 'space-around'
          break
        case 'space-evenly':
          css['justify-content'] = 'space-evenly'
          break
        case 'center':
          css['justify-content'] = 'center'
          break
      }
    }

    // Align items (cross axis)
    if (container.align) {
      switch (container.align) {
        case 'start':
          css['align-items'] = 'flex-start'
          break
        case 'center':
          css['align-items'] = 'center'
          break
        case 'end':
          css['align-items'] = 'flex-end'
          break
        case 'stretch':
          css['align-items'] = 'stretch'
          break
      }
    }

    return css
  }

  /**
   * Get CSS for spacing properties
   */
  protected getSpacingCSS(container: LayoutContainer): CSSProperties {
    const css: CSSProperties = {}

    // Gap
    if (container.gap !== undefined) {
      css['gap'] = this.resolveSpacing(container.gap)
    }

    // Padding
    if (container.padding !== undefined) {
      css['padding'] = this.resolvePadding(container.padding)
    }

    return css
  }

  /**
   * Get CSS for size behavior
   */
  protected getSizeBehaviorCSS(container: LayoutContainer): CSSProperties {
    const css: CSSProperties = {}

    if (container.fillContainer) {
      css['width'] = '100%'
      css['height'] = '100%'
    } else if (!container.fixed) {
      // Default is hug-contents
      css['width'] = 'fit-content'
      css['height'] = 'fit-content'
    }
    // Fixed mode doesn't add any CSS (uses natural sizing)

    return css
  }

  /**
   * Resolve spacing value to CSS string
   */
  protected resolveSpacing(value: SpacingValue | SpacingScale | number): string {
    if (typeof value === 'number') {
      return `${value}px`
    }
    if (typeof value === 'string') {
      return `${this.getSpacingScaleValue(value)}px`
    }
    // SpacingValue object
    return `${getSpacingValue(value)}px`
  }

  /**
   * Resolve padding value to CSS string
   */
  protected resolvePadding(value: PaddingValue | SpacingScale | number): string {
    if (typeof value === 'number') {
      return `${value}px`
    }
    if (typeof value === 'string') {
      return `${this.getSpacingScaleValue(value)}px`
    }
    
    // PaddingValue object
    const { top, right, bottom, left, all } = value
    
    if (all) {
      return `${getSpacingValue(all)}px`
    }
    
    const padding = []
    if (top) padding.push(`${getSpacingValue(top)}px`)
    else padding.push('0')
    
    if (right) padding.push(`${getSpacingValue(right)}px`)
    else padding.push('0')
    
    if (bottom) padding.push(`${getSpacingValue(bottom)}px`)
    else padding.push('0')
    
    if (left) padding.push(`${getSpacingValue(left)}px`)
    else padding.push('0')
    
    return padding.join(' ')
  }

  /**
   * Get spacing scale value in pixels
   */
  private getSpacingScaleValue(scale: SpacingScale): number {
    const SPACING_SCALE = {
      none: 0,
      tight: 4,
      cozy: 8,
      normal: 16,
      comfortable: 24,
      spacious: 32,
      custom: 0, // Will be overridden
    }
    return SPACING_SCALE[scale]
  }

  /**
   * Get grid CSS properties
   */
  protected getGridCSS(columns: number | 'auto', gap?: SpacingValue): CSSProperties {
    const css: CSSProperties = {
      display: 'grid',
    }

    if (columns === 'auto') {
      css['grid-template-columns'] = 'repeat(auto-fit, minmax(200px, 1fr))'
    } else {
      css['grid-template-columns'] = `repeat(${columns}, 1fr)`
    }

    if (gap) {
      css['gap'] = `${getSpacingValue(gap)}px`
    }

    return css
  }

  /**
   * Apply constraints to CSS
   */
  protected applyConstraints(css: CSSProperties, container: LayoutContainer): CSSProperties {
    if (!container.constraints) return css

    const { minSize, maxSize } = container.constraints

    if (minSize) {
      if (minSize.width) css['min-width'] = `${minSize.width}px`
      if (minSize.height) css['min-height'] = `${minSize.height}px`
    }

    if (maxSize) {
      if (maxSize.width) css['max-width'] = `${maxSize.width}px`
      if (maxSize.height) css['max-height'] = `${maxSize.height}px`
    }

    return css
  }
}
