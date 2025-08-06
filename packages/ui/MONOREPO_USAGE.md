# Using @senka-ai/ui in the Senka Monorepo

This guide explains how to properly import and use the `@senka-ai/ui` component library from other packages within the Senka monorepo.

## Overview

The `@senka-ai/ui` package is the core UI component library for the Senka platform. It provides a comprehensive set of reusable components, icons, utilities, and theming capabilities that can be used across all packages in the monorepo.

## Package Structure

```
packages/
├── ui/                    # Core UI library
│   ├── src/lib/          # Source components
│   └── dist/             # Built components (used by other packages)
├── ui-showcase/          # Component showcase and examples
├── app/                  # Main educational app
└── other-packages/       # Future packages
```

## Setup Requirements

### 1. Vite Configuration

For any package that wants to use the UI library, configure Vite with proper path aliases:

```typescript
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      '@senka-ai/ui': path.resolve(__dirname, '../ui/dist'),
      '@senka-ai/ui/icons': path.resolve(__dirname, '../ui/dist/icons'),
    },
  },
  optimizeDeps: {
    exclude: ['@senka-ai/ui'],
  },
})
```

### 2. TypeScript Configuration

Ensure your `tsconfig.json` includes the `verbatimModuleSyntax` option:

```json
{
  "compilerOptions": {
    "verbatimModuleSyntax": true,
    // ... other options
  }
}
```

### 3. Required Dependencies

Any package that wants to use the UI library MUST include these specific Tailwind CSS versions in their package.json:

```json
{
  "devDependencies": {
    "@tailwindcss/vite": "4.0.0-beta.10",
    "tailwindcss": "4.0.0-beta.10"
  }
}
```

### 4. CSS Integration

Import the UI library styles in your main CSS file:

```css
/* app.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import '@senka-ai/ui/styles';

/* Your component-specific styles */
```

## Component Imports

### Basic Components

```typescript
// Import individual components
import { Button, TextField, Card } from '@senka-ai/ui'

// Usage in Svelte component
<Button variant="primary" onclick={handleClick}>
  {#snippet children()}
    Click me
  {/snippet}
</Button>
```

### Icons

```typescript
// Import icons
import { AddIcon, HeartFilledIcon, ArrowRightIcon } from '@senka-ai/ui/icons'

// Usage with components
<Button variant="secondary">
  {#snippet leftIcon(size)}
    <AddIcon {size} />
  {/snippet}
  {#snippet children()}
    Add Item
  {/snippet}
</Button>
```

### Utilities and Helpers

```typescript
// Import utility functions
import { getTheme, setTheme, toggleTheme } from '@senka-ai/ui'
import { createKeyboardHandler, KeySets } from '@senka-ai/ui/utils/events'
import { createButtonStyles } from '@senka-ai/ui/utils/styles'

// Theme management
const currentTheme = getTheme()
setTheme('dark')
toggleTheme()
```

## Available Component Categories

### Core Components
- `Button` - Primary action component with multiple variants
- `IconButton` - Icon-only button variant  
- `ThemeToggle` - Dark/light mode switcher

### Form Components
- `TextField` - Text input with validation
- `TextArea` - Multi-line text input
- `NumberInput` - Numeric input with controls
- `Slider` - Range input component
- `Dropdown` - Select dropdown with options
- `Checkbox` - Boolean input component
- `RadioButton` & `RadioGroup` - Single selection
- `Toggle` - Boolean switch component
- `SearchBar` - Search input with icon
- `StarRating` - Interactive rating component

### Feedback Components
- `Badge` - Status indicators
- `Tag` - Categorization labels
- `Banner` - Alert/notification banners
- `Toast` - Temporary notifications
- `ProgressBar` - Progress indication
- `Dialog` - Modal dialogs
- `Loader` - Loading states
- `Tooltip` - Contextual information
- `PaginationDots` - Page indicators

### Layout Components
- `Card` - Content containers
- `CardHorizontal` - Horizontal card layout
- `Divider` - Visual separators
- `List`, `ListItem`, `ListTitle` - List structures
- `Accordion` - Collapsible content

### Navigation Components
- `TabBar` - Bottom navigation
- `NavBar` - Top navigation

### Media Components
- `Avatar` - User profile images
- `Image` - Enhanced image component
- `Video` - Video player component
- Various placeholder components

## Theme Integration

The UI library uses CSS custom properties for theming. Key variables include:

```css
:root {
  /* Primary colors */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  
  /* Text colors */
  --color-text-primary: #1f2937;
  --color-text-secondary: #6b7280;
  
  /* Background colors */
  --color-background: #ffffff;
  --color-surface: #f9fafb;
}

[data-theme="dark"] {
  --color-background: #111827;
  --color-text-primary: #f9fafb;
  /* ... dark theme overrides */
}
```

## Best Practices

### 1. Component Usage
- Always use the built components from `@senka-ai/ui`
- Follow the established patterns shown in ui-showcase
- Use Svelte 5 snippets for flexible content rendering

### 2. Styling
- Rely on the built-in component variants and sizes
- Use CSS custom properties for theme consistency
- Avoid overriding internal component styles directly

### 3. Icons
- Import icons individually to optimize bundle size
- Use the icon size parameter provided by components
- Prefer component icons over custom implementations

### 4. Development Workflow
- Always run `yarn ui:build` after making changes to the UI library
- Use `yarn typecheck` to verify TypeScript compatibility
- Test components in ui-showcase before using in other packages

## Example Package Integration

Here's a complete example of setting up a new package to use the UI library:

```typescript
// src/routes/+page.svelte
<script lang="ts">
  import { Button, TextField, Card } from '@senka-ai/ui'
  import { SearchIcon, AddIcon } from '@senka-ai/ui/icons'
  
  let searchValue = ''
  
  function handleSearch() {
    console.log('Searching for:', searchValue)
  }
  
  function handleAdd() {
    console.log('Adding new item')
  }
</script>

<div class="p-6 space-y-6">
  <Card>
    {#snippet children()}
      <h1 class="text-2xl font-semibold mb-4">My Application</h1>
      
      <div class="space-y-4">
        <TextField
          bind:value={searchValue}
          placeholder="Search items..."
        >
          {#snippet leftIcon(size)}
            <SearchIcon {size} />
          {/snippet}
        </TextField>
        
        <div class="flex gap-3">
          <Button variant="primary" onclick={handleSearch}>
            {#snippet children()}
              Search
            {/snippet}
          </Button>
          
          <Button variant="secondary" onclick={handleAdd}>
            {#snippet leftIcon(size)}
              <AddIcon {size} />
            {/snippet}
            {#snippet children()}
              Add Item
            {/snippet}
          </Button>
        </div>
      </div>
    {/snippet}
  </Card>
</div>
```

## Troubleshooting

### Common Issues

1. **Component not found**: Ensure you've built the UI library with `yarn ui:build`
2. **CSS not loading**: Check that styles are imported in your main CSS file
3. **TypeScript errors**: Verify `verbatimModuleSyntax: true` in tsconfig.json
4. **Icons not rendering**: Make sure to import icons from `@senka-ai/ui/icons`

### Development Commands

```bash
# Build UI library
yarn ui:build

# Type checking
yarn typecheck
yarn ui:typecheck

# Development servers
yarn ui:dev        # Storybook for UI library
yarn ui:story      # Alternative Storybook command
```

## External Usage (Outside Monorepo)

For external projects consuming the published npm package:

```bash
npm install @senka-ai/ui
```

```typescript
// External usage - no special Vite configuration needed
import { Button } from '@senka-ai/ui'
import { AddIcon } from '@senka-ai/ui/icons'
import '@senka-ai/ui/styles'
```

---

This documentation demonstrates the proper way to integrate the `@senka-ai/ui` library within the Senka monorepo, ensuring consistent usage patterns and optimal development experience across all packages.