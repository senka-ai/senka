/**
 * Example usage of the Layout Engine
 */
import { LayoutEngine } from './engine'
import type { LayoutContainer } from './types'

// Create a layout engine instance
const engine = new LayoutEngine({
  cssOptimization: true,
  vendorPrefixes: true,
})

// Example 1: Simple stack layout
const stackLayout: LayoutContainer = {
  id: 'main-stack',
  arrangement: {
    type: 'stack',
    direction: 'vertical',
  },
  autoLayout: {
    mode: 'hug-contents',
    primaryAxis: 'packed',
    counterAxis: 'stretch',
    gap: { scale: 'normal' },
    padding: { all: { scale: 'comfortable' } },
  },
}

console.log('Stack Layout CSS:')
console.log(engine.generateCSS(stackLayout))

// Example 2: Responsive row that stacks on mobile
const responsiveRow: LayoutContainer = {
  id: 'nav-row',
  arrangement: {
    type: 'row',
    wrap: true,
  },
  autoLayout: {
    mode: 'fill-container',
    primaryAxis: 'space-between',
    counterAxis: 'center',
    gap: { scale: 'normal' },
    padding: { all: { scale: 'normal' } },
  },
  responsive: {
    automatic: {
      enabled: true,
      mobileOptimization: 'balanced',
      breakpoints: 'auto',
      rules: {
        stackRowsOnMobile: true,
        increaseSpacingForTouch: true,
        simplifyGridsOnMobile: false,
        hideNonEssentials: false,
      },
    },
    breakpointRules: {
      mobile: {
        arrangement: { type: 'stack', direction: 'vertical' },
        spacing: { scale: 'comfortable' },
      },
    },
  },
}

console.log('\nResponsive Row CSS:')
console.log(engine.generateCSS(responsiveRow))

// Example 3: Grid layout with auto columns
const gridLayout: LayoutContainer = {
  id: 'product-grid',
  arrangement: {
    type: 'grid',
  },
  grid: {
    columns: 'auto',
    columnMinWidth: 250,
    gap: { scale: 'normal' },
  },
  constraints: {
    horizontal: {
      width: 'fill',
      height: 'hug',
    },
    vertical: {
      width: 'fill',
      height: 'hug',
    },
    maxSize: { width: 1200 },
  },
}

console.log('\nGrid Layout CSS:')
console.log(engine.generateCSS(gridLayout))

// Example 4: Validate a layout
const validation = engine.validate(stackLayout)
console.log('\nValidation Result:', validation)
