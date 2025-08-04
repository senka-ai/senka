import type {
  LayoutContainer,
  CSSProperties,
  ResponsiveCSS,
  ValidationResult,
  LayoutEngineOptions,
  Platform,
  ResponsiveConfig,
} from './types'
import { ArrangementEngine } from './core/arrangements'
import { validateLayout } from './utils/validation'
import { cssPropertiesToString, generateCSSClass, addVendorPrefixes, optimizeCSS } from './utils/css'
import { generateMediaQuery, sortBreakpoints } from './utils/responsive'

/**
 * Main Layout Engine for generating CSS from layout definitions
 */
export class LayoutEngine {
  private arrangementEngine: ArrangementEngine
  private options: LayoutEngineOptions
  private cache: Map<string, string>

  constructor(options: LayoutEngineOptions = {}) {
    this.options = {
      cssOptimization: true,
      vendorPrefixes: true,
      minify: false,
      cache: true,
      ...options,
    }

    this.arrangementEngine = new ArrangementEngine()
    this.cache = new Map()
  }

  /**
   * Generate CSS string from a layout container
   */
  generateCSS(container: LayoutContainer): string {
    // Check cache first
    const cacheKey = this.getCacheKey(container)
    if (this.options.cache && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    // Validate layout
    const validation = this.validate(container)
    if (!validation.valid) {
      throw new Error(`Invalid layout: ${validation.errors[0]?.message}`)
    }

    // Generate base CSS
    let cssProperties = this.arrangementEngine.generateCSS(container)

    // Apply optimizations
    if (this.options.cssOptimization) {
      cssProperties = optimizeCSS(cssProperties)
    }

    // Add vendor prefixes
    if (this.options.vendorPrefixes) {
      cssProperties = addVendorPrefixes(cssProperties)
    }

    // Convert to CSS string
    let css = cssPropertiesToString(cssProperties)

    // Generate responsive CSS if configured
    if (container.responsive) {
      const responsiveCSS = this.generateResponsiveCSS(container, container.responsive)
      css += '\n' + responsiveCSS
    }

    // Minify if requested
    if (this.options.minify) {
      css = this.minifyCSS(css)
    }

    // Cache the result
    if (this.options.cache) {
      this.cache.set(cacheKey, css)
    }

    return css
  }

  /**
   * Generate CSS class with a specific class name
   */
  generateCSSClass(className: string, container: LayoutContainer): string {
    const cssProperties = this.arrangementEngine.generateCSS(container)
    return generateCSSClass(className, cssProperties)
  }

  /**
   * Generate responsive CSS with media queries
   */
  generateResponsiveCSS(container: LayoutContainer, config: ResponsiveConfig): string {
    const parts: string[] = []

    // Handle breakpoint rules
    if (config.breakpointRules) {
      const sorted = sortBreakpoints(config.breakpointRules)

      sorted.forEach(([breakpoint, override]) => {
        if (!override) return

        // Apply override to container
        const overriddenContainer = this.applyOverride(container, override)
        const cssProperties = this.arrangementEngine.generateResponsiveCSS(overriddenContainer, breakpoint)

        // Apply optimizations
        let optimized = cssProperties
        if (this.options.cssOptimization) {
          optimized = optimizeCSS(cssProperties)
        }
        if (this.options.vendorPrefixes) {
          optimized = addVendorPrefixes(optimized)
        }

        const cssString = cssPropertiesToString(optimized)
        const mediaQuery = generateMediaQuery(breakpoint as any)

        parts.push(`${mediaQuery} {\n  ${cssString}\n}`)
      })
    }

    // Handle container queries
    if (config.containerQueries?.enabled && config.containerQueries.rules) {
      config.containerQueries.rules.forEach((rule) => {
        const containerQuery = this.generateContainerQuery(rule)
        parts.push(containerQuery)
      })
    }

    return parts.join('\n\n')
  }

  /**
   * Optimize layout for a specific platform
   */
  optimizeForPlatform(container: LayoutContainer, platform: Platform): LayoutContainer {
    return this.arrangementEngine.optimizeForPlatform(container, platform)
  }

  /**
   * Validate a layout container
   */
  validate(container: LayoutContainer): ValidationResult {
    return validateLayout(container)
  }

  /**
   * Clear the CSS cache
   */
  clearCache(): void {
    this.cache.clear()
  }

  /**
   * Apply layout override
   */
  private applyOverride(container: LayoutContainer, override: any): LayoutContainer {
    const result = { ...container }

    if (override.arrangement) {
      result.arrangement = { ...container.arrangement, ...override.arrangement }
    }

    if (override.constraints) {
      result.constraints = { ...container.constraints, ...override.constraints } as any
    }

    if (override.spacing) {
      if (result.autoLayout) {
        result.autoLayout = {
          ...result.autoLayout,
          gap: override.spacing.gap || result.autoLayout.gap,
          padding: override.spacing.padding || result.autoLayout.padding,
        }
      }
    }

    return result
  }

  /**
   * Generate container query
   */
  private generateContainerQuery(rule: any): string {
    const conditions: string[] = []

    if (rule.minWidth) {
      conditions.push(`(min-width: ${rule.minWidth}px)`)
    }
    if (rule.maxWidth) {
      conditions.push(`(max-width: ${rule.maxWidth}px)`)
    }

    const query = `@container ${conditions.join(' and ')}`
    const overriddenContainer = this.applyOverride({ id: 'temp' } as any, rule.layout)
    const cssProperties = this.arrangementEngine.generateCSS(overriddenContainer)
    const cssString = cssPropertiesToString(cssProperties)

    return `${query} {\n  ${cssString}\n}`
  }

  /**
   * Generate cache key for a layout
   */
  private getCacheKey(container: LayoutContainer): string {
    return JSON.stringify({
      id: container.id,
      arrangement: container.arrangement,
      constraints: container.constraints,
      responsive: container.responsive,
    })
  }

  /**
   * Simple CSS minification
   */
  private minifyCSS(css: string): string {
    return css
      .replace(/\s+/g, ' ')
      .replace(/:\s+/g, ':')
      .replace(/;\s+/g, ';')
      .replace(/\{\s+/g, '{')
      .replace(/\}\s+/g, '}')
      .replace(/\n/g, '')
      .trim()
  }
}
