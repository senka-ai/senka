# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CRITICAL: REQUIRED READING BEFORE ANY CHANGES

**ALWAYS read these files before making any changes:**

1. **`~/Downloads/claude/Svelte_5.md`** - Essential Svelte 5 syntax and patterns
2. **`plan.md`** - Project MVP plan and long-term roadmap
3. **`mvp_plan_romanian.md`** - Detailed Romanian MVP specifications
4. **`ARCHITECTURE.md`** - Project structure, workflow, and high-level architecture
5. **`COMPONENT_ARCHITECTURE.md`** - Detailed component patterns and implementation (read this!)

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

### MANDATORY Type Checking (ALWAYS RUN AFTER EDITING)

- `yarn typecheck` - Run strict TypeScript type checking
- `yarn check` - Run Svelte type checking

### Testing

- `yarn test` - Run all tests once
- `yarn test:unit` - Run unit tests in watch mode

### Storybook

- `yarn story` - Start Storybook development server on port 6006
- `yarn build-storybook` - Build Storybook for production

## CRITICAL DEVELOPMENT WORKFLOW

### After Editing Files (MANDATORY):

1. **`yarn typecheck`** - MUST pass without errors
2. **`yarn check`** - MUST pass without errors
3. Fix any errors before proceeding

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
