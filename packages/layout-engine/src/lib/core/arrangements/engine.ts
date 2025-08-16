import type { LayoutContainer, CSSProperties, Platform, ArrangementType } from '$lib/types'
import { BaseArrangement } from './base'
import { StackArrangement } from './stack'
import { RowArrangement } from './row'
import { GridArrangement } from './grid'
import { FlowArrangement } from './flow'
import { OverlayArrangement } from './overlay'
import { FrameArrangement } from './frame'

/**
 * Main engine for converting arrangements to CSS
 */
export class ArrangementEngine {
  private arrangements: Map<ArrangementType, BaseArrangement>
  private platformOptimizer: PlatformOptimizer

  constructor() {
    // Register all arrangement types
    this.arrangements = new Map<ArrangementType, BaseArrangement>()
    this.arrangements.set('stack', new StackArrangement())
    this.arrangements.set('row', new RowArrangement())
    this.arrangements.set('grid', new GridArrangement())
    this.arrangements.set('flow', new FlowArrangement())
    this.arrangements.set('overlay', new OverlayArrangement())
    this.arrangements.set('frame', new FrameArrangement())

    this.platformOptimizer = new PlatformOptimizer()
  }

  /**
   * Generate CSS for a layout container
   */
  generateCSS(container: LayoutContainer): CSSProperties {
    const arrangement = this.getArrangement(container.type)

    if (!arrangement) {
      throw new Error(`Unknown arrangement type: ${container.type}`)
    }

    // Validate arrangement configuration
    if (!arrangement.validate(container)) {
      throw new Error(`Invalid configuration for ${container.type} arrangement`)
    }

    // Generate base CSS
    const css = arrangement.toCSS(container)

    // Add container ID as a data attribute for debugging
    if (container.id) {
      css['data-layout-id'] = container.id
    }

    return css
  }

  /**
   * Generate responsive CSS for different breakpoints
   */
  generateResponsiveCSS(container: LayoutContainer, breakpoint: string): CSSProperties {
    const arrangement = this.getArrangement(container.type)

    if (!arrangement) {
      throw new Error(`Unknown arrangement type: ${container.type}`)
    }

    return arrangement.getResponsiveCSS(container, breakpoint)
  }

  /**
   * Optimize layout for specific platform
   */
  optimizeForPlatform(container: LayoutContainer, platform: Platform): LayoutContainer {
    return this.platformOptimizer.optimize(container, platform)
  }

  /**
   * Get arrangement instance by type
   */
  private getArrangement(type: ArrangementType): BaseArrangement | undefined {
    return this.arrangements.get(type)
  }

  /**
   * Register a custom arrangement type
   */
  registerArrangement(type: ArrangementType, arrangement: BaseArrangement): void {
    this.arrangements.set(type, arrangement)
  }
}

/**
 * Platform-specific optimizations
 */
class PlatformOptimizer {
  optimize(container: LayoutContainer, platform: Platform): LayoutContainer {
    switch (platform) {
      case 'mobile':
        return this.optimizeForMobile(container)

      case 'native':
        return this.optimizeForNative(container)

      case 'web':
      default:
        return container
    }
  }

  private optimizeForMobile(container: LayoutContainer): LayoutContainer {
    const optimized = { ...container }

    // Stack rows on mobile
    if (container.type === 'row') {
      optimized.type = 'stack'
      optimized.direction = 'vertical'
    }

    // Simplify grids on mobile
    if (container.type === 'grid' && container.columns) {
      if (typeof container.columns === 'number' && container.columns > 2) {
        optimized.columns = 2
      }
    }

    // Increase spacing for touch
    if (container.gap) {
      let currentValue: number
      if (typeof container.gap === 'number') {
        currentValue = container.gap
      } else if (typeof container.gap === 'string') {
        currentValue = this.getSpacingValue(container.gap)
      } else {
        // SpacingValue object
        currentValue =
          container.gap.scale === 'custom' ? container.gap.custom || 16 : this.getSpacingValue(container.gap.scale)
      }

      optimized.gap = Math.max(currentValue * 1.5, 16)
    }

    return optimized
  }

  private optimizeForNative(container: LayoutContainer): LayoutContainer {
    // Native optimizations would include platform-specific adjustments
    // For now, similar to mobile optimizations
    return this.optimizeForMobile(container)
  }

  private getSpacingValue(scale: string): number {
    const spacingMap: Record<string, number> = {
      none: 0,
      tight: 4,
      cozy: 8,
      normal: 16,
      comfortable: 24,
      spacious: 32,
    }
    return spacingMap[scale] || 16
  }
}
