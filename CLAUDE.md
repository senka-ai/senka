# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Senka** is an educational app built with SvelteKit 5, designed to support students, teachers, and parents in the Romanian educational system. The app provides features for class management, timetable creation, task assignment, and educational content delivery.

## Key Technologies

- **Frontend Framework**: Svelte 5 with SvelteKit
- **Styling**: Tailwind CSS v4
- **Component Development**: Storybook
- **Testing**: Vitest with Playwright for browser testing
- **Backend**: Supabase (planned)
- **Deployment**: Vercel
- **Package Manager**: Yarn

## Development Commands

### Core Development
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build

### Code Quality
- `yarn lint` - Check code formatting with Prettier
- `yarn format` - Format code with Prettier
- `yarn check` - Run Svelte type checking
- `yarn check:watch` - Run Svelte type checking in watch mode
- `yarn typecheck` - Run strict TypeScript type checking

### Testing
- `yarn test` - Run all tests once
- `yarn test:unit` - Run unit tests in watch mode

### Storybook
- `yarn storybook` - Start Storybook development server on port 6006
- `yarn build-storybook` - Build Storybook for production

## Architecture

### Project Structure
```
src/
├── lib/
│   ├── components/     # Reusable Svelte components
│   └── index.ts       # Library exports
├── routes/            # SvelteKit routes
├── stories/           # Storybook stories and demo components
├── app.css           # Global styles
├── app.d.ts          # TypeScript declarations
└── app.html          # HTML template
```

### Component Architecture
- Components are built using **Svelte 5 runes syntax** (`$state`, `$props`, `$derived`)
- TypeScript is used for type safety with `strict: false` configuration
- Components follow a props-based pattern for data flow
- Event handling uses modern Svelte 5 syntax (no `on:` directive)

### Key Svelte 5 Patterns Used
- `$state()` for reactive state instead of `let`
- `$props()` for component props instead of `export let`
- `$derived.by()` for complex computed values instead of `$:`
- Direct event handler props (e.g., `onclick`) instead of `on:click`
- Snippets and `{@render}` instead of slots
- `{#snippet children()}...{/snippet}` for component content

### Component Interface Best Practices
Always define explicit TypeScript interfaces for component props:

```typescript
interface Props {
  // Required props
  variant: 'primary' | 'secondary' | 'tertiary';
  
  // Optional props with defaults
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  
  // Common HTML attributes
  class?: string;
  id?: string;
  
  // Event handlers
  onclick?: () => void;
  
  // Children/content
  children?: any;
}
```

**Never use:**
- `ComponentProps<'button'>` or `ComponentProps<'input'>` - causes type errors
- `extends ComponentProps<...>` - define explicit interfaces instead

### Svelte 5 Children Pattern
For components that accept content, use the proper Svelte 5 children pattern:

**Component Definition:**
```svelte
<script lang="ts">
  interface Props {
    // ... other props
    children?: any;
  }
  
  let { children, ...otherProps }: Props = $props();
</script>

<!-- In template -->
{@render children?.()}
```

**Component Usage:**
```svelte
<Button variant="primary">
  {#snippet children()}Button Text{/snippet}
</Button>
```

**Important:** Always include `children?: any` in component Props interface when using `{@render children?.()}`

### Testing Configuration
- **Client-side tests**: Browser environment using Playwright with Chromium
- **Server-side tests**: Node environment
- Test files: `*.svelte.{test,spec}.{js,ts}` for component tests, `*.{test,spec}.{js,ts}` for utility tests
- Setup file: `vitest-setup-client.ts` for client-side test configuration

### Storybook Configuration
- Stories located in `src/stories/` and throughout `src/` with pattern `*.stories.@(js|ts|svelte)`
- Uses `@storybook/addon-svelte-csf` with modern Svelte 5 syntax
- Includes Chromatic and docs addons

### Storybook Story Syntax (Svelte 5)
Always use the latest Svelte CSF syntax when creating stories:

```svelte
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Component from '../lib/components/Component.svelte';

  const { Story } = defineMeta({
    title: 'Components/ComponentName',
    component: Component,
    args: {
      // Default args
    },
    argTypes: {
      // Arg type definitions
    }
  });
</script>

<Story name="Default" args={{ prop: 'value' }}>
  {#snippet template(args)}
    <Component {...args} />
  {/snippet}
</Story>
```

**Key Requirements:**
- Use `<script module>` not `<script>`
- Use `defineMeta()` instead of `<Meta>`
- Use `{#snippet template(args)}` instead of `let:args`
- Define default args and argTypes in the meta object

## Development Notes

### Svelte 5 Migration
The project uses Svelte 5 syntax throughout. Key differences from Svelte 4:
- Use `$state()` instead of reactive `let` declarations
- Use `$derived()` instead of `$:` for computed values
- Use `$props()` destructuring instead of `export let`
- Event handlers are props without the `on:` prefix
- Component events use callback props instead of `createEventDispatcher`

### Component Development
- Components are developed with Storybook for isolated testing
- Each component should have corresponding stories
- Components use TypeScript interfaces for prop definitions
- Styling uses Tailwind classes with component-scoped styles when needed

### Code Quality
- Prettier is configured for consistent formatting
- TypeScript checking is available but not strict
- Components should be type-safe using TypeScript interfaces
- **IMPORTANT**: Always run type checking after editing files to ensure type safety

### Required Type Checking Workflow
When editing components, stories, or any TypeScript files, you **MUST** run these commands in order:

1. **`yarn typecheck`** - Run strict TypeScript type checking
2. **`yarn check`** - Run Svelte-specific type checking  
3. **Fix any errors** before proceeding

**Common Type Issues to Avoid:**
- Never use `ComponentProps<'button'>` or `ComponentProps<'input'>` - define explicit interfaces instead
- Always include `disabled?`, `class?`, `id?` props in component interfaces when needed
- Use `$derived.by(() => {...})` for complex computed values, not `$derived(() => {...})`
- Avoid naming conflicts with `$state` (e.g., don't use `state` as a prop name)
- Define all props that are used in the component, including HTML attributes
- Use proper Svelte 5 patterns: `$state()`, `$props()`, `$derived.by()`

## Design System & Component Architecture Principles

### Color System Architecture
**Problem**: Using verbose CSS variable syntax like `bg-[var(--color-success-200)]` throughout components is hard to maintain and read.

**Solution**: Create semantic CSS utility classes in `app.css`:
```css
/* Semantic Color Classes */
.bg-success { background-color: var(--color-success-200); }
.bg-warning { background-color: var(--color-warning-200); }
.bg-error { background-color: var(--color-error-200); }
.text-highlight { color: var(--color-highlight-400); }
.border-highlight { border-color: var(--color-highlight-400); }
```

**Benefits**:
- Much cleaner component code: `bg-success` vs `bg-[var(--color-success-200)]`
- Centralized color management
- Better IDE support and autocomplete
- Easier theme switching
- Self-documenting semantic names

### SVG Icon Architecture
**Principle**: Always organize SVG icons as reusable Svelte components in a dedicated folder.

**Structure**:
```
src/lib/icons/
├── PersonIcon.svelte
├── ChevronIcon.svelte
└── index.ts  # Barrel exports
```

**Icon Component Pattern**:
```svelte
<script lang="ts">
  interface Props {
    class?: string;
    size?: number | string;
  }
  
  let { class: className = '', size = 24 }: Props = $props();
</script>

<svg class={className} width={size} height={size} viewBox="0 0 24 24">
  <!-- SVG content -->
</svg>
```

**Benefits**:
- Reusable across the app
- Customizable with props
- Type-safe
- Easy to maintain and update
- Clean imports: `import { PersonIcon } from '../icons'`

### Avatar Component Design Patterns
**Multi-fallback Pattern**: Components should gracefully handle missing data with multiple fallbacks:
1. Primary content (image)
2. Generated content (initials from name)
3. Generic fallback (SVG icon)

**Consistent Masking**: All avatar content types (image, initials, SVG) must use the same border radius masking:
```svelte
<!-- Image -->
<img class="h-full w-full object-cover {imageBorderRadius}" />

<!-- SVG -->
<PersonIcon class="h-full w-full {imageBorderRadius}" />
```

**Size-Proportional Styling**: Different avatar sizes need proportional styling:
```svelte
const sizes = {
  xs: 'h-8 w-8 text-body-s rounded-lg',
  small: 'h-10 w-10 text-body-s rounded-xl',
  medium: 'h-14 w-14 text-body-m rounded-xl',
  large: 'h-20 w-20 text-body-l rounded-2xl'
};
```

### Storybook Best Practices
**Multi-example Stories**: When creating "All Sizes" or "All Variants" stories, use proper template structure:
```svelte
<Story name="All Sizes">
  {#snippet template()}
    <div class="space-y-4">
      <div class="flex gap-4 items-center">
        <Component size="small" />
        <Component size="medium" />
        <Component size="large" />
      </div>
    </div>
  {/snippet}
</Story>
```

**Always use `{#snippet template()}` for multi-component stories** - direct component usage can cause rendering issues.

**Fallback Testing**: Create specific stories to test fallback states:
```svelte
<Story name="With SVG" args={{ alt: '' }}>
  {#snippet template(args)}
    <Avatar {...args} />
  {/snippet}
</Story>
```

### Component State Management
**Derived Values**: Use `$derived.by()` for complex computations:
```svelte
let avatarClasses = $derived.by(() => {
  const base = 'relative inline-flex items-center justify-center';
  const variants = { /* ... */ };
  return `${base} ${variants[variant]} ${className}`;
});
```

**Conditional Rendering Logic**: Structure component logic with clear fallback hierarchy:
```svelte
{#if primaryContent}
  <!-- Primary content -->
{:else if secondaryContent}
  <!-- Secondary content -->
{:else}
  <!-- Fallback content -->
{/if}
```

### CSS Integration Best Practices
**Tailwind + CSS Variables**: When using Tailwind CSS v4 with CSS variables, create semantic utility classes rather than using arbitrary values throughout components.

**Component-Specific Styling**: Use CSS custom properties for component-specific styling that needs to be theme-aware:
```css
/* In app.css */
.bg-neutral-200 { background-color: var(--color-neutral-200); }
.text-neutral-600 { color: var(--color-neutral-600); }
```

**SVG Color Integration**: Use CSS variables in SVG components to maintain theme consistency:
```svelte
<rect fill="var(--color-highlight-50)" />
<path fill="var(--color-highlight-100)" />
```

### Development Workflow Principles
**Incremental Development**: Build components incrementally:
1. Create basic component structure
2. Add TypeScript interfaces
3. Implement core functionality
4. Add Storybook stories
5. Test all variants and edge cases
6. Refactor for maintainability

**Type Safety First**: Always run type checking after component changes:
```bash
yarn typecheck  # Catch type errors early
yarn check      # Svelte-specific checking
```

**Component Testing Strategy**: Test components in isolation via Storybook before integrating into the main app.

## Educational App Domain

This app serves the Romanian educational system with three user types:
- **Students**: Access timetables, assignments, and educational content
- **Teachers**: Create classes, assign tasks, manage timetables
- **Parents**: Monitor child's progress and receive updates

The MVP focuses on core classroom management features, with plans for AI-powered personalized learning in the future.