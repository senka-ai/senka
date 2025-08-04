# @senka-ai/layout-engine

Intuitive layout system for Senka's no-code platform that enables non-technical users to create professional, responsive layouts through visual tools.

## Features

- 🎯 **Intuitive Arrangements**: Think in spatial terms (Stack, Row, Grid) not CSS
- 📐 **Smart Constraints**: Flexible positioning with automatic conflict resolution
- 📱 **Responsive by Default**: Automatic mobile optimization with override capability
- 🎨 **Visual Controls**: Drag-and-drop with real-time preview
- 🔒 **Modification Safety**: Preview changes before applying with rollback
- ⚡ **Performance Optimized**: Minimal CSS output with intelligent caching

## Installation

```bash
npm install @senka-ai/layout-engine
```

## Basic Usage

```typescript
import { LayoutEngine, ArrangementType } from '@senka-ai/layout-engine'

const engine = new LayoutEngine()

// Create a simple stack layout
const layout = {
  arrangement: {
    type: 'stack' as ArrangementType,
    direction: 'vertical',
  },
  spacing: {
    scale: 'normal',
  },
  responsive: {
    automatic: {
      enabled: true,
      mobileOptimization: 'balanced',
    },
  },
}

// Generate CSS
const css = engine.generateCSS(layout)
```

## Arrangement Types

### Stack

Elements arranged vertically (or horizontally), one after another.

```typescript
{
  arrangement: {
    type: 'stack',
    direction: 'vertical', // or 'horizontal'
    reverse: false
  }
}
```

### Row

Elements arranged side-by-side horizontally.

```typescript
{
  arrangement: {
    type: 'row',
    wrap: true,
    reverse: false
  }
}
```

### Grid

Elements arranged in a structured grid pattern.

```typescript
{
  arrangement: {
    type: 'grid'
  },
  grid: {
    columns: 3,
    gap: 'normal'
  }
}
```

### Flow

Elements flow naturally like text, wrapping when needed.

```typescript
{
  arrangement: {
    type: 'flow',
    wrap: true
  }
}
```

### Overlay

Elements layered on top of each other.

```typescript
{
  arrangement: {
    type: 'overlay'
  },
  overlay: {
    position: 'center'
  }
}
```

## Spacing System

Use semantic spacing values instead of pixels:

```typescript
{
  spacing: {
    scale: 'tight',    // 4px
    scale: 'cozy',     // 8px
    scale: 'normal',   // 16px
    scale: 'comfortable', // 24px
    scale: 'spacious'  // 32px
  }
}
```

## Responsive Features

### Automatic Optimization

```typescript
{
  responsive: {
    automatic: {
      enabled: true,
      mobileOptimization: 'aggressive',
      rules: {
        stackRowsOnMobile: true,
        increaseSpacingForTouch: true,
        simplifyGridsOnMobile: true
      }
    }
  }
}
```

### Custom Breakpoints

```typescript
{
  responsive: {
    breakpointRules: {
      mobile: {
        arrangement: { type: 'stack' },
        spacing: { scale: 'comfortable' }
      },
      desktop: {
        arrangement: { type: 'row' },
        spacing: { scale: 'normal' }
      }
    }
  }
}
```

## Constraints

Pin elements to edges or center them:

```typescript
{
  constraints: {
    horizontal: {
      left: { enabled: true, offset: 20 },
      right: { enabled: true, offset: 20 }
    },
    vertical: {
      centerV: true
    }
  }
}
```

## Visual Controls (Svelte Components)

```svelte
<script>
  import { ArrangementPicker, SpacingSlider } from '@senka-ai/layout-engine'

  let arrangement = 'stack'
  let spacing = 'normal'
</script>

<ArrangementPicker bind:value={arrangement} />
<SpacingSlider bind:value={spacing} />
```

## API Reference

### LayoutEngine

Main class for generating CSS from layout definitions.

```typescript
const engine = new LayoutEngine(options?: LayoutEngineOptions)

// Generate CSS
engine.generateCSS(layout: LayoutContainer): string

// Optimize for platform
engine.optimizeForPlatform(layout: LayoutContainer, platform: Platform): LayoutContainer

// Validate layout
engine.validate(layout: LayoutContainer): ValidationResult
```

### Types

See [TypeScript definitions](./dist/index.d.ts) for complete type information.

## License

MIT
