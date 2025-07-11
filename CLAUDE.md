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

## Educational App Domain

This app serves the Romanian educational system with three user types:
- **Students**: Access timetables, assignments, and educational content
- **Teachers**: Create classes, assign tasks, manage timetables
- **Parents**: Monitor child's progress and receive updates

The MVP focuses on core classroom management features, with plans for AI-powered personalized learning in the future.