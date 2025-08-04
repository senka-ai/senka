# Layout Engine Examples

## Basic Usage

### 1. Stack Layout (Vertical)

```typescript
import { LayoutEngine } from '@senka-ai/layout-engine'

const engine = new LayoutEngine()

const stackLayout = {
  id: 'main-content',
  arrangement: {
    type: 'stack',
    direction: 'vertical',
  },
  autoLayout: {
    mode: 'hug-contents',
    primaryAxis: 'packed',
    counterAxis: 'stretch',
    gap: { scale: 'normal' }, // 16px
    padding: { all: { scale: 'comfortable' } }, // 24px
  },
}

const css = engine.generateCSS(stackLayout)
// Output: display: flex; flex-direction: column; align-items: stretch; gap: 16px; padding: 24px;
```

### 2. Row Layout with Wrapping

```typescript
const rowLayout = {
  id: 'button-group',
  arrangement: {
    type: 'row',
    wrap: true,
  },
  autoLayout: {
    mode: 'fill-container',
    primaryAxis: 'space-between',
    counterAxis: 'center',
    gap: { scale: 'cozy' }, // 8px
    padding: { all: { scale: 'normal' } },
  },
}

const css = engine.generateCSS(rowLayout)
// Output: display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px;
```

### 3. Grid Layout

```typescript
const gridLayout = {
  id: 'product-grid',
  arrangement: {
    type: 'grid',
  },
  grid: {
    columns: 3,
    gap: { scale: 'normal' },
  },
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
  arrangement: {
    type: 'row',
  },
  autoLayout: {
    mode: 'fill-container',
    primaryAxis: 'center',
    counterAxis: 'center',
    gap: { scale: 'spacious' }, // 32px
    padding: { all: { scale: 'spacious' } },
  },
  responsive: {
    breakpointRules: {
      mobile: {
        arrangement: { type: 'stack', direction: 'vertical' },
        spacing: {
          gap: { scale: 'comfortable' }, // 24px on mobile
          padding: { all: { scale: 'normal' } }, // 16px on mobile
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

## Auto-Layout Modes

- `fixed`: Container maintains its set size
- `hug-contents`: Container shrinks to fit its content
- `fill-container`: Container expands to fill available space

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
  arrangement: {
    type: 'frame',
  },
  autoLayout: {
    mode: 'fill-container',
    primaryAxis: 'packed',
    counterAxis: 'stretch',
    gap: { scale: 'none' },
    padding: { all: { scale: 'none' } },
  },
  children: [
    // Header
    {
      id: 'header',
      arrangement: { type: 'row' },
      autoLayout: {
        mode: 'fill-container',
        primaryAxis: 'space-between',
        counterAxis: 'center',
        gap: { scale: 'normal' },
        padding: { all: { scale: 'normal' } },
      },
    },
    // Main content area
    {
      id: 'main',
      arrangement: { type: 'row' },
      autoLayout: {
        mode: 'fill-container',
        primaryAxis: 'packed',
        counterAxis: 'stretch',
        gap: { scale: 'comfortable' },
        padding: { all: { scale: 'comfortable' } },
      },
      children: [
        // Sidebar
        {
          id: 'sidebar',
          arrangement: { type: 'stack' },
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
