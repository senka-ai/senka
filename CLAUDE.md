# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CRITICAL: REQUIRED READING BEFORE ANY CHANGES

**ALWAYS read these files before making any changes:**

1. **`~/Downloads/claude/Svelte_5.md`** - Essential Svelte 5 syntax and patterns
2. **`plan.md`** - Project MVP plan and long-term roadmap
3. **`mvp_plan_romanian.md`** - Detailed Romanian MVP specifications
4. **`HYBRID_SETUP.md`** - Hybrid repository setup for UI library
5. **`packages/ui/UI_ARCHITECTURE.md`** - Detailed component patterns and implementation (read this!)

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

### Core Development (Monorepo)

- `yarn ui:dev` - Start UI library Storybook development server
- `yarn app:dev` - Start main app development server
- `yarn ui:build` - Build UI library for production
- `yarn app:build` - Build main app for production
- `yarn build` - Build both UI library and app
- `yarn app:preview` - Preview production build of app

### Code Quality

- `yarn lint` - Check code formatting with Prettier
- `yarn format` - Format code with Prettier

### MANDATORY Type Checking (ALWAYS RUN AFTER EDITING)

- `yarn typecheck` - Run TypeScript checking for all packages
- `yarn ui:typecheck` - Run TypeScript checking for UI library only
- `yarn app:typecheck` - Run TypeScript checking for app only
- `yarn check` - Run Svelte checking for all packages
- `yarn ui:check` - Run Svelte checking for UI library only
- `yarn app:check` - Run Svelte checking for app only

### Testing

- `yarn test` - Run all tests for all packages
- `yarn ui:test` - Run UI library tests
- `yarn app:test` - Run app tests
- `yarn ui:test:visual` - Run UI library visual tests with Playwright
- `yarn ui:test:visual:update` - Update visual test snapshots

### Storybook

- `yarn ui:story` - Start UI library Storybook development server on port 6006
- `yarn ui:build-storybook` - Build UI library Storybook for production
- `yarn app:story` - Start app Storybook development server (if available)

## CRITICAL DEVELOPMENT WORKFLOW

### After Editing Files (MANDATORY):

1. **`yarn typecheck`** - MUST pass without errors (runs for all packages)
2. **`yarn check`** - MUST pass without errors (runs for all packages)
3. For specific packages: `yarn ui:typecheck` / `yarn ui:check` or `yarn app:typecheck` / `yarn app:check`
4. Fix any errors before proceeding

### After Completing Tasks:

**ALWAYS prompt user to run Prettier over changed files**

## Component Architecture Principles

- Components use **Svelte 5 runes syntax** (`$state`, `$props`, `$derived.by`)
- TypeScript interfaces defined explicitly (never use `ComponentProps<>`)
- Event handling uses direct props (`onclick`) not `on:click`
- Children pattern: `{@render children?.()}` with `children?: any` in interface
- Icons are modular Svelte components in `src/lib/icons/`
- CSS uses semantic utility classes over verbose variable syntax

## Key Svelte 5 Patterns

```typescript
// Props interface (ALWAYS explicit)
interface Props {
  variant: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  class?: string
  onclick?: () => void
  children?: any
}

// Component structure
let { variant, size = 'medium', ...props }: Props = $props()

// State management
let isActive = $state(false)

// Computed values
let classes = $derived.by(() => {
  return `base ${variants[variant]} ${sizes[size]}`
})
```

## Architecture Files

- **Components**: `src/lib/components/` (29 components)
- **Icons**: `src/lib/icons/` (48 SVG components)
- **Types**: `src/lib/types/component.ts`
- **Utilities**: `src/lib/utils/`
- **Routes**: `src/routes/`
- **Stories**: `src/stories/`
- **Styles**: `src/styles/`

## Development Notes

### NEVER Use:

- `ComponentProps<'button'>` or similar - define explicit interfaces
- `on:click` syntax - use direct `onclick` props
- `let` for reactive state - use `$state()`
- `$:` for computed values - use `$derived.by()`

### ALWAYS Include:

- `children?: any` when using `{@render children?.()}`
- Common HTML attributes (`class?`, `id?`, `disabled?`) in interfaces
- Type checking after edits
- Prettier formatting prompt after task completion

## Educational App Domain

This app serves the Romanian educational system with three user types:

- **Students**: Access timetables, assignments, educational content
- **Teachers**: Create classes, assign tasks, manage timetables
- **Parents**: Monitor child progress, receive updates

The MVP focuses on classroom management, with plans for AI-powered personalized learning.

## IMPORTANT: Current Status

- Current pages contain **demo/dummy data** and will change in future
- Next project phase: **solid component structure** then new components
- All components must follow architecture patterns in `ARCHITECTURE.md`

## Security & Best Practices

- Never commit secrets or keys
- Follow accessibility standards
- Use type-safe patterns
- Maintain consistent component interfaces
- Test components in Storybook before integration
