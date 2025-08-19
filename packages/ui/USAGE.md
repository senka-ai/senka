# @senka-ai/ui Usage Guide

This UI library supports two different consumption patterns to optimize for different use cases.

## 🚀 Approach 1: Pre-compiled CSS (Zero Dependencies)

**Best for:** Projects that don't use Tailwind CSS, or want zero configuration.

**Pros:** 
- No dependencies required
- Works with any framework/build system
- Plug-and-play setup

**Cons:**
- Larger bundle (includes CSS for all components)
- No tree-shaking of CSS

### Installation & Usage

```bash
npm install @senka-ai/ui
```

```javascript
// Import components (compiled/built versions)
import { Button, TextField, Card } from '@senka-ai/ui'

// Import pre-compiled CSS
import '@senka-ai/ui/styles'

// Usage
<Button variant="primary">Click me</Button>
```

## ⚡ Approach 2: Tailwind Dependency (Optimal Bundle Size)

**Best for:** Projects that already use Tailwind CSS, or want optimal bundle sizes.

**Pros:**
- Perfect tree-shaking (only CSS for used components)
- Optimal bundle size for each consumer
- No CSS duplication
- Better customization options

**Cons:**
- Requires Tailwind CSS as peer dependency
- More complex setup

### Installation & Setup

```bash
npm install @senka-ai/ui tailwindcss @tailwindcss/vite
```

### Tailwind Configuration

Extend your `tailwind.config.js`:

```javascript
import senkaConfig from '@senka-ai/ui/tailwind.config'

/** @type {import('tailwindcss').Config} */
export default {
  // Extend the Senka UI config
  ...senkaConfig,
  content: [
    // Your app content
    './src/**/*.{html,js,svelte,ts}',
    // Include Senka UI components for scanning
    './node_modules/@senka-ai/ui/src/**/*.{html,js,svelte,ts}',
    // Extend the original content array
    ...senkaConfig.content,
  ],
  theme: {
    extend: {
      // Extend Senka's theme
      ...senkaConfig.theme?.extend,
      // Your custom theme extensions
      colors: {
        // You can override or extend Senka colors
        brand: '#your-brand-color',
      },
    },
  },
}
```

### Component Usage

```javascript
// Import raw components (source versions)
import { Button, TextField, Card } from '@senka-ai/ui/tailwind'
import { AddIcon, EditIcon } from '@senka-ai/ui/tailwind/icons'

// No CSS import needed - Tailwind will generate only used styles
<Button variant="primary">
  <AddIcon class="h-4 w-4" />
  Click me
</Button>
```

### CSS Setup

Make sure your main CSS file includes Tailwind and Senka's design tokens:

```css
/* app.css */
@import 'tailwindcss';

/* Import Senka design tokens (CSS variables) */
@import '@senka-ai/ui/src/styles/colors.css';
@import '@senka-ai/ui/src/styles/typography.css';
```

## 🎯 Bundle Size Comparison

**Example: Using only Button and TextField**

| Approach | CSS Bundle Size | Components Used |
|----------|-----------------|-----------------|
| Pre-compiled | ~81KB | All 50+ components |  
| Tailwind | ~8KB | Only Button + TextField |

## 🔧 Theme Customization

### Pre-compiled Approach
Limited to CSS custom properties:

```css
:root {
  --color-highlight-400: #your-primary-color;
  --color-neutral-900: #your-text-color;
}
```

### Tailwind Approach
Full Tailwind theme customization:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      highlight: {
        400: '#your-primary-color', // Overrides default
        500: '#your-darker-primary', // Extends palette
      }
    }
  }
}
```

## 🚦 Migration Path

Start with **Pre-compiled** for quick setup, then migrate to **Tailwind approach** when you need optimization:

1. Replace imports: `@senka-ai/ui` → `@senka-ai/ui/tailwind`
2. Remove CSS import: `@senka-ai/ui/styles` 
3. Add Tailwind config extension
4. Enjoy smaller bundles! 📉