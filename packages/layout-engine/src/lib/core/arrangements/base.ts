import type { LayoutContainer, CSSProperties, SpacingValue, AutoLayoutConfig, ArrangementConfig } from '$lib/types'
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
   * Validate the arrangement configuration
   */
  abstract validate(config: ArrangementConfig): boolean

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
   * Get CSS for auto-layout configuration
   */
  protected getAutoLayoutCSS(config: AutoLayoutConfig): CSSProperties {
    const css: CSSProperties = {}

    // Primary axis alignment
    switch (config.primaryAxis) {
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

    // Counter axis alignment
    switch (config.counterAxis) {
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

    // Gap
    if (config.gap) {
      css['gap'] = `${getSpacingValue(config.gap)}px`
    }

    // Padding
    if (config.padding) {
      const padding = []
      const { top, right, bottom, left, all } = config.padding

      if (all) {
        css['padding'] = `${getSpacingValue(all)}px`
      } else {
        if (top) padding.push(`${getSpacingValue(top)}px`)
        else padding.push('0')

        if (right) padding.push(`${getSpacingValue(right)}px`)
        else padding.push('0')

        if (bottom) padding.push(`${getSpacingValue(bottom)}px`)
        else padding.push('0')

        if (left) padding.push(`${getSpacingValue(left)}px`)
        else padding.push('0')

        css['padding'] = padding.join(' ')
      }
    }

    // Auto-layout mode
    switch (config.mode) {
      case 'fixed':
        // Fixed size, no additional CSS needed
        break
      case 'hug-contents':
        css['width'] = 'fit-content'
        css['height'] = 'fit-content'
        break
      case 'fill-container':
        css['width'] = '100%'
        css['height'] = '100%'
        break
    }

    return css
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
