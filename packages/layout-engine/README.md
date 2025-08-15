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
import { LayoutEngine } from '@senka-ai/layout-engine'

const engine = new LayoutEngine()

// Create a simple stack layout - no 'as const' needed!
const layout = {
  id: 'main-layout',
  type: 'stack',
  direction: 'vertical',
  gap: 'normal',
  fillContainer: true,
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
  id: 'my-stack',
  type: 'stack',
  direction: 'vertical', // or 'horizontal'
  reverse: false,
  gap: 'normal'
}
```

### Row

Elements arranged side-by-side horizontally.

```typescript
{
  id: 'my-row',
  type: 'row',
  wrap: true,
  reverse: false,
  gap: 'normal',
  align: 'center'
}
```

### Grid

Elements arranged in a structured grid pattern.

```typescript
{
  id: 'my-grid',
  type: 'grid',
  columns: 3,
  gap: 'normal',
  fillContainer: true
}
```

### Flow

Elements flow naturally like text, wrapping when needed.

```typescript
{
  id: 'my-flow',
  type: 'flow',
  gap: 'cozy',
  align: 'start'
}
```

### Overlay

Elements layered on top of each other.

```typescript
{
  id: 'my-overlay',
  type: 'overlay',
  position: 'center',
  zIndex: 10
}
```

## Spacing System

Use semantic spacing values, direct numbers, or spacing objects:

```typescript
// Semantic spacing (recommended)
{
  gap: 'tight',        // 4px
  padding: 'cozy',     // 8px
}

// Direct numbers
{
  gap: 16,             // 16px
  padding: 24,         // 24px
}

// Spacing objects for custom values
{
  gap: { scale: 'custom', custom: 20 },
  padding: {
    top: { scale: 'normal' },    // 16px
    horizontal: { scale: 'cozy' } // 8px
  }
}
```

**Available scales**: `'tight'` (4px), `'cozy'` (8px), `'normal'` (16px), `'comfortable'` (24px), `'spacious'` (32px)

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
        spacing: { gap: 'comfortable' }
      },
      desktop: {
        arrangement: { type: 'row' },
        spacing: { gap: 'normal' }
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
