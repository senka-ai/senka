# Layout Engine Examples

## Basic Usage

### 1. Stack Layout (Vertical)

```typescript
import { LayoutEngine } from '@senka-ai/layout-engine'

const engine = new LayoutEngine()

const stackLayout = {
  id: 'main-content',
  type: 'stack',
  direction: 'vertical',
  gap: 'normal', // 16px
  padding: 'comfortable', // 24px
  align: 'stretch',
  justify: 'packed',
}

const css = engine.generateCSS(stackLayout)
// Output: display: flex; flex-direction: column; align-items: stretch; gap: 16px; padding: 24px;
```

### 2. Row Layout with Wrapping

```typescript
const rowLayout = {
  id: 'button-group',
  type: 'row',
  wrap: true,
  fillContainer: true,
  gap: 'cozy', // 8px
  padding: 'normal', // 16px
  justify: 'space-between',
  align: 'center',
}

const css = engine.generateCSS(rowLayout)
// Output: display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px;
```

### 3. Grid Layout

```typescript
const gridLayout = {
  id: 'product-grid',
  type: 'grid',
  columns: 3,
  gap: 'normal', // 16px
  fillContainer: true,
  constraints: {
    horizontal: { width: 'fill', height: 'hug' },
    vertical: { width: 'fill', height: 'hug' },
  },
}

const css = engine.generateCSS(gridLayout)
// Output: display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
```

### 4. Responsive Layout

```typescript
const responsiveLayout = {
  id: 'hero-section',
  type: 'row',
  fillContainer: true,
  gap: 'spacious', // 32px
  padding: 'spacious', // 32px
  justify: 'center',
  align: 'center',
  responsive: {
    breakpointRules: {
      mobile: {
        arrangement: { type: 'stack', direction: 'vertical' },
        spacing: {
          gap: 'comfortable', // 24px on mobile
          padding: 'normal', // 16px on mobile
        },
      },
    },
  },
}

const css = engine.generateCSS(responsiveLayout)
// Includes base CSS + media query for mobile
```

## Spacing Scale

The layout engine uses semantic spacing values:

- `none`: 0px
- `tight`: 4px
- `cozy`: 8px
- `normal`: 16px
- `comfortable`: 24px
- `spacious`: 32px
- `custom`: Any custom pixel value

## Arrangement Types

### Stack

Elements arranged vertically (default) or horizontally in a single column/row.

- Best for: Forms, lists, content sections
- Direction: `vertical` | `horizontal`

### Row

Elements arranged side-by-side horizontally with optional wrapping.

- Best for: Navigation bars, button groups, toolbars
- Supports: `wrap`, `reverse`

### Grid

Elements arranged in a structured grid pattern.

- Best for: Galleries, product listings, dashboards
- Columns: Fixed number or `'auto'` for responsive

### Flow

Elements flow naturally like text, always wrapping.

- Best for: Tags, chips, inline elements
- Always wraps like inline content

### Overlay

Elements layered on top of each other.

- Best for: Modals, tooltips, floating elements
- Position: `center`, `top-left`, `top-right`, etc.

### Frame

Container that can hold any other arrangement.

- Best for: Sections, cards, layout boundaries
- Can contain nested layouts

## Size Behavior

- `fixed: true`: Container maintains its set size (default)
- `fillContainer: false`: Container shrinks to fit its content (default)
- `fillContainer: true`: Container expands to fill available space

## Responsive Features

### Automatic Mobile Optimization

```typescript
const autoResponsive = {
  responsive: {
    automatic: {
      enabled: true,
      mobileOptimization: 'balanced',
      rules: {
        stackRowsOnMobile: true,
        increaseSpacingForTouch: true,
        simplifyGridsOnMobile: true,
      },
    },
  },
}
```

### Custom Breakpoint Rules

```typescript
const customResponsive = {
  responsive: {
    breakpointRules: {
      mobile: {
        /* mobile overrides */
      },
      tablet: {
        /* tablet overrides */
      },
      desktop: {
        /* desktop overrides */
      },
    },
  },
}
```

## Platform Optimization

```typescript
// Optimize layout for mobile platform
const mobileOptimized = engine.optimizeForPlatform(layout, 'mobile')

// This will:
// - Convert rows to stacks
// - Increase touch-friendly spacing
// - Simplify grids to max 2 columns
// - Apply mobile-specific constraints
```

## Validation

```typescript
const validation = engine.validate(layout)

if (!validation.valid) {
  console.error('Layout errors:', validation.errors)
  console.warn('Layout warnings:', validation.warnings)
}
```

## Complete Example: Dashboard Layout

```typescript
const dashboardLayout = {
  id: 'dashboard',
  type: 'frame',
  fillContainer: true,
  gap: 'none',
  padding: 'none',
  justify: 'packed',
  align: 'stretch',
  children: [
    // Header
    {
      id: 'header',
      type: 'row',
      fillContainer: true,
      gap: 'normal',
      padding: 'normal',
      justify: 'space-between',
      align: 'center',
    },
    // Main content area
    {
      id: 'main',
      type: 'row',
      fillContainer: true,
      gap: 'comfortable',
      padding: 'comfortable',
      justify: 'packed',
      align: 'stretch',
      children: [
        // Sidebar
        {
          id: 'sidebar',
          type: 'stack',
          fixed: true,
          constraints: {
            horizontal: { width: 'fixed' },
            vertical: { width: 'fill', height: 'fill' },
            maxSize: { width: 280 },
          },
        },
        // Content
        {
          id: 'content',
          arrangement: { type: 'grid' },
          grid: {
            columns: 'auto',
            columnMinWidth: 300,
            gap: { scale: 'normal' },
          },
          autoLayout: {
            mode: 'fill-container',
            primaryAxis: 'packed',
            counterAxis: 'packed',
            gap: { scale: 'normal' },
            padding: { all: { scale: 'none' } },
          },
        },
      ],
    },
  ],
}
```
