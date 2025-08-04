import type { CSSProperties } from '$lib/types'

/**
 * Convert CSSProperties object to CSS string
 */
export function cssPropertiesToString(properties: CSSProperties): string {
  return Object.entries(properties)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n  ')
}

/**
 * Generate a CSS class with properties
 */
export function generateCSSClass(className: string, properties: CSSProperties): string {
  const cssString = cssPropertiesToString(properties)
  return `.${className} {\n  ${cssString}\n}`
}

/**
 * Merge multiple CSS property objects
 */
export function mergeCSSProperties(...propertyObjects: CSSProperties[]): CSSProperties {
  return Object.assign({}, ...propertyObjects)
}

/**
 * Add vendor prefixes to CSS properties
 */
export function addVendorPrefixes(properties: CSSProperties): CSSProperties {
  const prefixedProperties: CSSProperties = { ...properties }

  // Properties that need prefixes
  const prefixMap: Record<string, string[]> = {
    transform: ['-webkit-transform', '-ms-transform'],
    transition: ['-webkit-transition'],
    animation: ['-webkit-animation'],
    flex: ['-webkit-flex'],
    'flex-direction': ['-webkit-flex-direction'],
    'flex-wrap': ['-webkit-flex-wrap'],
    'justify-content': ['-webkit-justify-content'],
    'align-items': ['-webkit-align-items'],
    'align-content': ['-webkit-align-content'],
    'user-select': ['-webkit-user-select', '-moz-user-select', '-ms-user-select'],
  }

  Object.entries(properties).forEach(([key, value]) => {
    if (prefixMap[key]) {
      prefixMap[key].forEach((prefixedKey) => {
        prefixedProperties[prefixedKey] = value
      })
    }
  })

  return prefixedProperties
}

/**
 * Optimize CSS by removing redundant properties
 */
export function optimizeCSS(properties: CSSProperties): CSSProperties {
  const optimized: CSSProperties = {}

  // Skip default values
  const defaults: Record<string, string | number> = {
    margin: '0',
    padding: '0',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    opacity: '1',
  }

  Object.entries(properties).forEach(([key, value]) => {
    // Skip if it's a default value
    if (defaults[key] === value) return

    // Skip if value is empty
    if (value === '' || value === null || value === undefined) return

    optimized[key] = value
  })

  // Combine margin/padding shorthands where possible
  const finalOptimized = combineShorthands(optimized)

  return finalOptimized
}

/**
 * Combine individual properties into shorthands
 */
function combineShorthands(properties: CSSProperties): CSSProperties {
  const result = { ...properties }

  // Combine margin
  if ('margin-top' in result && 'margin-right' in result && 'margin-bottom' in result && 'margin-left' in result) {
    const top = result['margin-top']
    const right = result['margin-right']
    const bottom = result['margin-bottom']
    const left = result['margin-left']

    if (top === right && right === bottom && bottom === left) {
      result['margin'] = top
      delete result['margin-top']
      delete result['margin-right']
      delete result['margin-bottom']
      delete result['margin-left']
    }
  }

  // Combine padding
  if ('padding-top' in result && 'padding-right' in result && 'padding-bottom' in result && 'padding-left' in result) {
    const top = result['padding-top']
    const right = result['padding-right']
    const bottom = result['padding-bottom']
    const left = result['padding-left']

    if (top === right && right === bottom && bottom === left) {
      result['padding'] = top
      delete result['padding-top']
      delete result['padding-right']
      delete result['padding-bottom']
      delete result['padding-left']
    }
  }

  return result
}
