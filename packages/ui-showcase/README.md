# @senka-ai/ui-showcase

A showcase application demonstrating the UI components from the `@senka-ai/ui` library within the Senka monorepo.

## Overview

This package provides an interactive showcase of UI components, starting with the Button component. It demonstrates how to use the UI library components within the monorepo context, importing directly from the local `packages/ui` source code rather than the published npm package.

## Features

- **Local Import Setup**: Imports components directly from `packages/ui/src/lib` using Vite path aliases
- **Theme Support**: Includes full light/dark theme support from the UI library
- **Interactive Examples**: Live examples of component variants, sizes, and states
- **Code Examples**: Displays usage code for each component pattern

## Development

### Prerequisites

Make sure you're in the monorepo root and have installed dependencies:

```bash
yarn install
```

### Running the Showcase

```bash
cd packages/ui-showcase
yarn dev
```

This will start the development server on `http://localhost:5174`.

### Building

```bash
yarn build
```

### Type Checking

```bash
yarn typecheck
```

## Architecture

### Import Strategy

The showcase uses Vite path aliases to import from the local UI package:

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@senka-ai/ui': path.resolve(__dirname, '../ui/src/lib'),
    '@senka-ai/ui/icons': path.resolve(__dirname, '../ui/src/lib/icons'),
  },
}
```

This allows imports like:

```svelte
import {Button} from '@senka-ai/ui' import {AddIcon} from '@senka-ai/ui/icons'
```

### CSS Integration

The showcase imports CSS styles directly from the UI library source:

- Color system variables and semantic colors
- Typography system (with fallbacks to standard Tailwind classes)
- Spacing, transitions, and other design tokens
- Full light/dark theme support

### Components Demonstrated

Currently showcasing:

- **Button Component**: All variants (primary, secondary, tertiary), sizes, states, and icon combinations

## Usage Examples

The showcase demonstrates various usage patterns:

1. **Basic Button Variants**
2. **Different Sizes** (small, medium, large)
3. **Icon Integration** (left, right, or both icons)
4. **State Management** (disabled, loading states)
5. **Full Width Options**
6. **Interactive Click Handling**

## Future Expansion

This showcase can be easily extended to include additional components from the UI library:

1. Form components (TextField, Dropdown, etc.)
2. Layout components (Card, List, etc.)
3. Feedback components (Toast, Dialog, etc.)
4. Navigation components (NavBar, Tabs, etc.)

## Technical Notes

- Uses SvelteKit with TypeScript for modern development experience
- Tailwind CSS v4 for styling system
- Path aliases resolve imports to local monorepo packages
- Full theme system integration with CSS custom properties
- Responsive design with mobile-first approach
