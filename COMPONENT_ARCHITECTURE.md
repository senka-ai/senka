# Senka Component Architecture & Design Patterns

## Overview

This document provides a comprehensive analysis of the component architecture, design patterns, and development practices used in the Senka educational app. The app is built with **Svelte 5** using modern runes syntax, TypeScript for type safety, and follows consistent patterns across all components to create a scalable, maintainable, and user-friendly educational platform.

## Core Technologies & Patterns

### Svelte 5 Runes System

The entire codebase uses **Svelte 5 runes** instead of legacy Svelte 4 patterns:

- **`$state()`** - Reactive state management instead of reactive `let`
- **`$props()`** - Component props destructuring instead of `export let`
- **`$derived.by()`** - Complex computed values instead of `$:` labels
- **Direct event handlers** - `onclick` instead of `on:click` directive
- **Snippets** - `{@render children?.()}` instead of slots

### TypeScript Integration

- **Explicit prop interfaces** - Every component defines a clear TypeScript interface
- **Composition via interfaces** - Components extend base interfaces for consistency
- **Type-safe event handling** - Standardized event handler interfaces
- **Strict type checking workflow** - `yarn typecheck` + `yarn check` before deployment

## Shared Interface System

### Location: `/src/lib/types/component.ts`

This file contains all the shared TypeScript interfaces that components extend to maintain consistency. The interface system follows a composition pattern where specialized interfaces extend base functionality.

### Base Interfaces

#### `BaseProps`

The fundamental interface that all components should extend:

```typescript
export interface BaseProps {
  class?: string
  id?: string
  disabled?: boolean
}
```

#### `SizedComponent`

For components with standard size variants:

```typescript
export interface SizedComponent {
  size?: 'small' | 'medium' | 'large'
}
```

#### `ExtendedSizedComponent`

For components that need an extra-small size:

```typescript
export interface ExtendedSizedComponent {
  size?: 'xs' | 'small' | 'medium' | 'large'
}
```

#### `VariantComponent<T>`

Generic interface for components with style variants:

```typescript
export interface VariantComponent<T extends string> {
  variant?: T
}
```

### Form-Related Interfaces

#### `FormField`

Standard form field props:

```typescript
export interface FormField {
  name?: string
  value?: string
  label?: string
  helperText?: string
  error?: string
  placeholder?: string
  showLabel?: boolean
  showHelperText?: boolean
}
```

#### `FormInputComponent`

Combines base props with form field functionality:

```typescript
export interface FormInputComponent extends BaseProps, FormField, FullWidthComponent, FocusHandlers {
  type?: string
}
```

### Event Handler Interfaces

#### `ClickHandler`

```typescript
export interface ClickHandler {
  onclick?: () => void
}
```

#### `ChangeHandler<T>`

```typescript
export interface ChangeHandler<T = any> {
  onchange?: (value: T) => void
}
```

#### `KeyboardHandler`

```typescript
export interface KeyboardHandler {
  onkeydown?: (event: KeyboardEvent) => void
}
```

#### `FocusHandlers`

```typescript
export interface FocusHandlers {
  onfocus?: () => void
  onblur?: () => void
}
```

### Component-Specific Interfaces

#### `ButtonLikeComponent`

Comprehensive interface for button-like components:

```typescript
export interface ButtonLikeComponent
  extends BaseProps,
    SizedComponent,
    VariantComponent<'primary' | 'secondary' | 'tertiary'>,
    FullWidthComponent,
    LoadingComponent,
    ClickHandler,
    ChildrenComponent {
  type?: 'button' | 'submit' | 'reset'
}
```

#### `CardComponent`

```typescript
export interface CardComponent extends BaseProps, ClickHandler, ChildrenComponent {
  title: string
  subtitle?: string
  description?: string
  variant?: 'default' | 'compact'
}
```

#### `ListItemComponent`

```typescript
export interface ListItemComponent extends BaseProps, ClickHandler, InteractiveComponent, ChildrenComponent {
  title: string
  description?: string
}
```

## Advanced Component Patterns & Implementation

### 1. Button Component Architecture

**File:** `/src/lib/components/Button.svelte`

The Button component exemplifies the comprehensive interface composition pattern:

```typescript
interface Props extends ButtonLikeComponent, IconComponent, InteractiveHandlers {
  iconSize?: number
  type?: 'button' | 'submit' | 'reset'
}
```

**Key Implementation Features:**

- **Semantic CSS Classes** - Uses `.bg-highlight`, `.bg-highlight-hover` instead of verbose CSS variable syntax
- **Standardized Event Handling** - Disabled state support with standardized keyboard accessibility
- **Flexible Icon System** - Supports both string emoji and Svelte component icons
- **Loading State Management** - Spinner replacement with proper disabled state coordination

**CSS Class Composition Pattern:**

```svelte
let buttonClasses = $derived.by(() => {
    const base = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none cursor-pointer'

    const variants = {
        primary: 'border-2 border-transparent hover:bg-highlight-hover bg-highlight text-white disabled:bg-neutral-disabled disabled:text-neutral-disabled',
        secondary: 'bg-transparent border-2 hover:bg-highlight-light text-highlight border-highlight disabled:border-neutral-disabled disabled:text-neutral-light',
        tertiary: 'bg-transparent border-2 border-transparent hover:bg-highlight-light text-highlight disabled:text-neutral-light'
    }

    return `${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`
})
```

**Event Handling Pattern:**

```svelte
const isDisabled = $derived(disabled || loading)

const handleClick = (event?: Event) => {
    if (isDisabled) return
    onclick?.()
}

const handleKeyDown = (event: KeyboardEvent) => {
    if (['Enter', ' '].includes(event.key)) {
        if (isDisabled) return
        event.preventDefault()
        onclick?.()
    }
    onkeydown?.(event)
}
```

### 2. TextField Component with Validation

**File:** `/src/lib/components/forms/TextField.svelte`

Demonstrates advanced form component patterns with integrated validation and focus management:

**State Management:**

```svelte
let inputRef: HTMLInputElement
const focusState = useFocusState()

// Validation state
let validationState = $state({ error: '', isValid: true })

// Effective error combining validation and external errors
let effectiveError = $derived(validationState.error || error)

// Dynamic state calculation
let currentState = $derived.by(() => {
    if (disabled) return 'disabled'
    if (effectiveError) return 'error'
    if (focusState.focused()) return 'focused'
    return inputState
})
```

**Validation Integration:**

```svelte
onblur={(e) => {
  focusState.handleBlur(e)
  // Always validate on blur
  if (validationRules?.length > 0) {
    const result = validateValue(value || '', validationRules)
    validationState.error = result.errors[0] || ''
    validationState.isValid = result.isValid
  }
}}
```

**Composition with FormField:**

```svelte
<FormField {label} {helperText} error={effectiveError} {showLabel} {showHelperText}>
  {#snippet children()}
    <!-- Icons, input, and unit display -->
  {/snippet}
</FormField>
```

### 3. Avatar Component Multi-Fallback System

**File:** `/src/lib/components/media/Avatar.svelte`

Demonstrates sophisticated fallback hierarchy and size-proportional styling:

**Fallback Logic:**

```svelte
<div class={avatarClasses}>
  {#if src}
    <img
      {src}
      {alt}
      class="h-full w-full object-cover {imageBorderRadius}"
      onerror={() => {
        src = undefined
      }}
      <!--
      Fallback
      to
      next
      option
      --
    />
    />
  {:else if displayInitials}
    <span class="select-none">{displayInitials}</span>
  {:else}
    <AvatarPlaceholder {size} />
  {/if}

  {#if status}
    <span class={statusClasses} aria-label={`Status: ${status}`}></span>
  {/if}
</div>
```

**Size-Proportional Styling:**

```svelte
let avatarClasses = $derived.by(() => {
    const base = 'relative inline-flex items-center justify-center bg-highlight-50 text-neutral-600 font-medium'

    const sizes = {
        xs: 'h-8 w-8 text-body-s rounded-xl',
        small: 'h-10 w-10 text-body-s rounded-2xl',
        medium: 'h-14 w-14 text-body-m rounded-2xl',
        large: 'h-20 w-20 text-body-l rounded-3xl'
    }

    return `${base} ${sizes[size]} ${className}`
})
```

### 4. RadioGroup Context Pattern

**File:** `/src/lib/components/forms/RadioGroup.svelte`

Demonstrates parent-child communication using Svelte context:

```svelte
// Controlled state management
const { value: getSelectedValue, setValue } = useControlledState(
    '', // default value
    controlledValue,
    onchange
)

// Context for child RadioButton components
setContext('radioGroup', {
    name,
    selectedValue: () => selectedValue,
    disabled,
    onRadioChange: handleRadioChange
})
```

## State Management Architecture

### Unified State Utilities

**File:** `/src/lib/utils/state.svelte.ts`

The app uses specialized state management utilities for consistent patterns across components:

#### Controlled/Uncontrolled Components

```typescript
export function useControlledState<T>(initialValue: T, controlledValue: T | undefined, onChange?: (value: T) => void) {
  let localValue = $state(initialValue)

  const isControlled = $derived(controlledValue !== undefined)
  const currentValue = $derived(isControlled ? controlledValue : localValue)

  const setValue = (newValue: T) => {
    if (!isControlled) localValue = newValue
    onChange?.(newValue)
  }

  return {
    value: () => currentValue,
    setValue,
    isControlled: () => isControlled,
  }
}
```

#### Focus State Management

```typescript
export function useFocusState(
  onFocus?: (event: FocusEvent) => void,
  onBlur?: (event: FocusEvent) => void,
  disabled?: boolean
) {
  let focused = $state(false)

  const handleFocus = (event: FocusEvent) => {
    if (disabled) return
    focused = true
    onFocus?.(event)
  }

  return {
    focused: () => focused,
    handleFocus,
    handleBlur: (event: FocusEvent) => {
      if (disabled) return
      focused = false
      onBlur?.(event)
    },
  }
}
```

## Event Handling Architecture

### Standardized Event System

**File:** `/src/lib/utils/events.ts`

Provides consistent, accessible event handling patterns:

```typescript
export const KeySets = {
  ACTIVATION: ['Enter', ' '], // Enter + Space for buttons
  NAVIGATION: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
  HORIZONTAL_NAVIGATION: ['ArrowLeft', 'ArrowRight'],
  VERTICAL_NAVIGATION: ['ArrowUp', 'ArrowDown'],
  ESCAPE: ['Escape'],
} as const

export function createKeyboardHandler(
  handler: () => void,
  config: KeyboardEventConfig = { keys: ['Enter', ' '], preventDefault: true }
) {
  return (event: KeyboardEvent) => {
    if (config.disabled) return
    if (config.keys.includes(event.key)) {
      if (config.preventDefault) event.preventDefault()
      handler()
    }
  }
}
```

## Icon System Architecture

### Icon Component Pattern

**File:** `/src/lib/icons/PersonIcon.svelte`

All icons follow a standardized pattern:

```svelte
<script lang="ts">
  interface Props {
    class?: string
    size?: number | string
  }

  let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 81 80">
  <rect fill="var(--color-highlight-50)" />
  <path fill="var(--color-highlight-100)" />
</svg>
```

### Icon Integration Utilities

**File:** `/src/lib/utils/icons.ts`

Provides type-safe icon rendering with flexible support:

```typescript
export function shouldRenderIcon(icon: IconType, showIcon: boolean = true): boolean {
  return showIcon && icon !== undefined && icon !== null && icon !== ''
}

export function isStringIcon(icon: IconType): icon is string {
  return typeof icon === 'string'
}

export function getInputPadding(hasLeftIcon: boolean, hasRightIcon: boolean): string {
  let padding = ''
  if (hasLeftIcon) padding += 'pl-10 '
  if (hasRightIcon) padding += 'pr-10 '
  return padding.trim()
}
```

## Theme Management System

**File:** `/src/lib/theme.svelte.ts`

Provides reactive theme state with automatic persistence:

```typescript
export function useTheme() {
  ensureInitialized()

  // Create reactive state inside component context
  const theme = $state({ current: currentTheme })

  // Subscribe to changes
  const unsubscribe = subscribe((newTheme) => {
    theme.current = newTheme
  })

  return {
    get current(): Theme {
      return theme.current
    },
    destroy: unsubscribe,
  }
}
```

## Component Categories

### Form Components

#### TextField

- **Extends**: `FormInputComponent`, `IconComponent`, `IconSizeComponent`
- **Key Features**:
  - Left/right icons with automatic padding
  - Input states (default, focused, error, disabled)
  - Unit display support
  - Integrated validation system
  - Focus state management using utilities
- **Pattern**: Uses `$bindable()` for two-way binding with validation integration

#### TextArea

- **Extends**: `FormInputComponent`
- **Key Features**:
  - Resize control
  - Row configuration
  - Max length support

#### Dropdown

- **Extends**: `FormInputComponent`, `ChangeHandler<string>`
- **Key Features**:
  - Option-based selection
  - Keyboard navigation
  - Click-outside handling

#### SearchBar

- **Extends**: `BaseProps`, `FullWidthComponent`, `KeyboardHandler`
- **Key Features**:
  - Built-in search icon
  - Focus state management

### Interactive Components

#### Button

- **Extends**: `ButtonLikeComponent`, `IconComponent`
- **Key Features**:
  - Left/right icons
  - Loading state with spinner
  - Three variants (primary, secondary, tertiary)
  - Full width support

#### Toggle

- **Extends**: `BaseProps`, `SizedComponent`, `ChangeHandler<boolean>`
- **Key Features**:
  - Switch-like behavior
  - Keyboard accessibility
  - Smooth animations

#### Checkbox

- **Extends**: `BaseProps`, `SizedComponent`, `ChangeHandler<boolean>`, `ChildrenComponent`
- **Key Features**:
  - Container click handling
  - Link-aware clicking
  - Custom label support

#### RadioButton

- **Extends**: `BaseProps`, `SizedComponent`, `ChangeHandler<boolean>`, `ChildrenComponent`
- **Key Features**:
  - Single selection behavior
  - Visual dot indicator
  - Label support

### Display Components

#### Badge

- **Extends**: `BaseProps`, `SizedComponent`
- **Key Features**:
  - Three types (number, icon, dot)
  - Four variants (default, success, warning, error)
  - Number truncation with max value

#### Avatar

- **Extends**: `BaseProps`, `ExtendedSizedComponent`, `StatusComponent`
- **Key Features**:
  - Multi-fallback system (image → initials → SVG)
  - Status indicators
  - Size-proportional styling

#### Card

- **Extends**: `CardComponent`
- **Key Features**:
  - Image/icon/placeholder support
  - Action buttons or arrows
  - Favorite functionality
  - Compact and default variants

#### Tag

- **Extends**: `BaseProps`, `VariantComponent<'primary' | 'secondary' | 'tertiary'>`, `IconComponent`, `ClickHandler`
- **Key Features**:
  - Text-based display
  - Left/right icons
  - Clickable functionality

### Layout Components

#### ListItem

- **Extends**: `ListItemComponent`, `IconComponent`
- **Key Features**:
  - Left/right icons
  - Right controls
  - Chevron support
  - Compact mode

#### List

- **Extends**: `BaseProps`
- **Key Features**:
  - Automatic ListItem rendering
  - Divider support
  - Title with right actions

#### Divider

- **Extends**: `BaseProps`, `VariantComponent<'solid' | 'dashed' | 'dotted'>`
- **Key Features**:
  - Horizontal/vertical orientation
  - Spacing control
  - Style variants

### Media Components

#### Image

- **Extends**: `BaseProps`
- **Key Features**:
  - Aspect ratio control
  - Placeholder/fallback system
  - Rounded corners
  - Loading states

#### Video

- **Extends**: `BaseProps`
- **Key Features**:
  - Placeholder support
  - Loading/error states
  - Event handlers
  - Responsive sizing

## Key Patterns

### State Management

- Use `$state()` for reactive local state
- Use `$bindable()` for two-way binding in form components
- Use `$derived.by()` for complex computed values
- Use `$effect()` for side effects and cleanup

### Event Handling

- Direct event handler props (e.g., `onclick`) instead of `on:` directive
- Event prevention and stopPropagation where needed
- Keyboard accessibility with proper key handling

### CSS Class Management

- Use `$derived.by()` for dynamic class composition
- Pattern: `const base = '...'` + variants + modifiers + `className`
- Consistent naming: `containerClasses`, `buttonClasses`, etc.

### Icon Integration

- Accept icons as `any` type for maximum flexibility
- Use `{@render icon?.()}` pattern for optional icons
- Support both left and right icon positions

### Children Pattern

- Use `children?: any` prop type
- Render with `{@render children?.()}`
- Always include `ChildrenComponent` interface when used

## Storybook Integration & Modern CSF Syntax

### Modern Svelte CSF Pattern

**File:** `/src/stories/Button.stories.svelte`

The app uses the latest Storybook patterns with Svelte 5:

```svelte
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Button from '../lib/components/Button.svelte'

  const { Story } = defineMeta({
    title: 'Components/Button',
    component: Button,
    args: { variant: 'primary', size: 'medium' },
    argTypes: {
      variant: { control: { type: 'select' }, options: ['primary', 'secondary', 'tertiary'] },
    },
  })
</script>

<Story name="Primary" args={{ variant: 'primary' }}>
  {#snippet template(args)}
    <Button {...args}>
      {#snippet children()}Button Text{/snippet}
    </Button>
  {/snippet}
</Story>
```

**Key Requirements:**

- Use `<script module>` not `<script>`
- Use `defineMeta()` instead of `<Meta>`
- Use `{#snippet template(args)}` for story content
- Always use `{#snippet children()}` for component content

**Multi-Example Story Pattern:**

```svelte
<Story name="All Variants">
  {#snippet template()}
    <div class="space-y-4">
      <div class="flex items-start gap-4">
        <Button variant="primary">
          {#snippet children()}Primary{/snippet}
        </Button>
        <Button variant="secondary">
          {#snippet children()}Secondary{/snippet}
        </Button>
      </div>
    </div>
  {/snippet}
</Story>
```

## Layout Architecture

### Responsive Layout System

**File:** `/src/routes/+layout.svelte`

Demonstrates advanced responsive layout patterns:

```svelte
<script lang="ts">
  // Route-based layout detection
  let isAuthRoute = $derived.by(() => {
    if (!browser) return false
    const pathname = $page.url.pathname
    return pathname.startsWith('/auth') || pathname === '/login'
  })

  // Responsive state management
  let isMobile = $state(false)

  function updateIsMobile() {
    if (browser) isMobile = window.innerWidth < 768
  }
</script>

{#if isAuthRoute}
  <div class="auth-layout">{@render children()}</div>
{:else}
  <div class="app-layout" class:mobile={isMobile}>
    {#if isMobile}
      <main class="mobile-content">{@render children()}</main>
      <Navigation {isMobile} />
    {:else}
      <Navigation {isMobile} />
      <main class="desktop-content">{@render children()}</main>
    {/if}
  </div>
{/if}
```

## Svelte 5 Specific Patterns

### Component Props Pattern

```typescript
interface Props extends BaseProps {
  // component-specific props
}

let {
  // destructure with defaults
  class: className = '',
  disabled = false,
  children,
  ...restProps
}: Props = $props()
```

### Children & Snippet Pattern

```svelte
<!-- Component Usage -->
<Component>
  {#snippet children()}Content{/snippet}
</Component>

<!-- Component Implementation -->
{#if children}
  {@render children()}
{/if}
```

### State & Derived Values

```svelte
// Reactive state
let focused = $state(false)

// Simple derived value
let isDisabled = $derived(disabled || loading)

// Complex derived computation
let buttonClasses = $derived.by(() => {
    const base = 'btn'
    const variants = { /* ... */ }
    return `${base} ${variants[variant]} ${className}`
})
```

### Event Handling

```svelte
// Direct event handlers (no on: prefix)
<button
    onclick={handleClick}
    onkeydown={handleKeyDown}
    onfocus={handleFocus}
>
```

## File Structure

```
src/lib/
├── components/           # All Svelte components
├── types/
│   └── component.ts     # Shared interfaces
├── icons/               # SVG icon components
│   └── index.ts         # Icon exports
└── index.ts            # Main library exports
```

## Type Safety

- All components use explicit TypeScript interfaces
- No use of `ComponentProps<'button'>` or similar generic types
- Proper typing for event handlers and state
- Consistent import patterns for shared types

## Testing & Documentation

- Each component has corresponding Storybook stories
- Stories use modern Svelte 5 CSF syntax
- Type checking with `yarn typecheck` and `yarn check`
- Component isolation for testing

## Development Workflow & Best Practices

### Component Development Process

1. **Interface Design** - Define TypeScript interfaces extending base types
2. **State Management** - Use appropriate state utilities (`useControlledState`, `useFocusState`)
3. **Event Handling** - Implement standardized event patterns from utilities
4. **Styling** - Use semantic CSS classes and derived style computations
5. **Icon Integration** - Follow consistent icon rendering patterns
6. **Story Creation** - Build comprehensive Storybook stories for all variants
7. **Type Checking** - Run `yarn typecheck && yarn check` before commit

### Type Safety Requirements

**CRITICAL:** Always run type checking after editing components:

```bash
yarn typecheck  # Strict TypeScript checking
yarn check      # Svelte-specific type checking
```

**Common Type Issues to Avoid:**

- Never use `ComponentProps<'button'>` or `ComponentProps<'input'>` - define explicit interfaces
- Always include `children?: any` when using `{@render children?.()}`
- Use `$derived.by()` for complex computations, not `$derived()`
- Define all used props including HTML attributes (`class`, `id`, `disabled`)
- Avoid naming conflicts with `$state` (e.g., don't use `state` as prop name)

### Component Composition Patterns

**Wrapper Components:**

```svelte
<!-- FormField wrapper pattern -->
<FormField {label} {helperText} error={effectiveError}>
  {#snippet children()}
    <input bind:value class={inputClasses} />
  {/snippet}
</FormField>
```

**Context-Based Communication:**

```svelte
<!-- Parent provides context -->
setContext('radioGroup', {(selectedValue, onRadioChange)})

<!-- Child consumes context -->
const radioGroup = getContext('radioGroup')
```

### Testing & Quality Assurance

#### Testing Configuration

- **Browser tests** - Playwright with Chromium for component testing
- **Server tests** - Node environment for utility function testing
- **Type checking** - Integrated TypeScript and Svelte checking
- **Story testing** - Storybook for component isolation and visual testing

#### Code Quality Standards

- **Prettier formatting** - Consistent code style
- **TypeScript strict mode** - Type safety enforcement
- **Interface composition** - Reusable, composable component interfaces
- **Semantic CSS** - Maintainable styling with theme awareness
- **Accessibility** - ARIA roles, keyboard navigation, focus management

### Performance Considerations

#### Component Optimization

- **Efficient derived values** - Use `$derived.by()` for expensive computations
- **Minimal re-rendering** - Proper state and prop management
- **Icon optimization** - SVG components with proper sizing
- **CSS efficiency** - Semantic classes reduce runtime calculations

#### Bundle Optimization

- **Tree shaking** - Clean barrel exports from `/src/lib/index.ts`
- **Icon splitting** - Individual icon imports prevent bundle bloat
- **Utility functions** - Shared utilities reduce code duplication

### Accessibility Standards

#### Keyboard Navigation

- **Activation keys** - Enter + Space for buttons and interactive elements
- **Arrow navigation** - Up/Down/Left/Right for navigable components
- **Focus management** - Proper focus ring and state management
- **Escape handling** - Close modals, dropdowns, and overlays

#### Screen Reader Support

- **Semantic HTML** - Proper element usage and ARIA roles
- **Label associations** - Proper form field labeling
- **Status indicators** - Accessible status communication
- **Error messaging** - Clear, accessible error reporting

### Future Architecture Evolution

#### Planned Improvements

1. **Enhanced State Management** - More specialized state utilities for complex components
2. **Advanced Icon System** - Dynamic icon loading and optimization
3. **Validation Framework** - More sophisticated form validation patterns
4. **Animation System** - Consistent animation utilities and patterns
5. **Responsive Utilities** - Enhanced responsive design helpers
6. **Performance Monitoring** - Component performance tracking and optimization

#### Scalability Considerations

- **Component library growth** - Interface composition supports easy extension
- **Theme expansion** - CSS variable system supports additional themes
- **Icon system scaling** - Organized structure supports large icon libraries
- **State management scaling** - Utility functions provide consistent patterns
- **Validation expansion** - Unified validation system supports complex rules

### Documentation Standards

#### Component Documentation Requirements

- **Interface documentation** - Clear TypeScript interface definitions
- **Usage examples** - Comprehensive Storybook stories
- **Props documentation** - JSDoc comments for all props
- **Event documentation** - Clear event handler descriptions
- **Accessibility notes** - Keyboard and screen reader usage

#### Architecture Documentation

- **Pattern documentation** - Clear explanation of architectural decisions
- **Example implementations** - Real-world usage examples
- **Best practices** - Guidelines for consistent development
- **Migration guides** - Updates for evolving patterns

This comprehensive architecture provides a solid foundation for the Senka educational app, ensuring maintainability, type safety, accessibility, and consistent user experience across all components while leveraging the full power of Svelte 5's modern features and establishing patterns that will scale with the application's growth.

---

## CSS Architecture

### Overview

The CSS architecture is built on a foundation of CSS custom properties (variables) combined with Tailwind CSS v4, providing a theme-aware design system that supports both light and dark modes.

### Main Style Files

#### `/src/app.css` - Main Entry Point

- **Purpose**: Main CSS entry point that imports all other styles
- **Key Features**:
  - Google Fonts import (Inter family)
  - Tailwind CSS v4 with plugins
  - Theme-aware CSS variables
  - Global font and body styles
  - Mobile-specific scrolling behavior
  - Temporary card utility classes

#### `/src/styles/typography.css` - Typography System

- **Purpose**: Comprehensive typography scale with semantic naming
- **Key Features**:
  - CSS variables for font sizes, weights, and line heights
  - Semantic text classes: `text-action-*`, `text-caption-*`, `text-h1-h5`, `text-body-*`, `text-slim-*`, `text-medium-*`, `text-thick-*`
  - Consistent size scale: xs (10px), s (12px), m (14px), l (16px), xl (18px), 2xl (24px)
  - Weight variants: light (300), regular (400), medium (500), semibold (600), bold (700), extrabold (800)
  - Line height variants: tight (1.2), normal (1.4)

#### `/src/styles/colors.css` - Color System

- **Purpose**: Complete color utility classes using CSS variables
- **Key Features**:
  - Background colors: `bg-highlight-*`, `bg-neutral-*`, `bg-success-*`, `bg-warning-*`, `bg-error-*`
  - Text colors: `text-highlight-*`, `text-neutral-*`, `text-success-*`, `text-warning-*`, `text-error-*`
  - Border colors: `border-highlight-*`, `border-neutral-*`, `border-success-*`, `border-warning-*`, `border-error-*`
  - Semantic colors: `bg-background`, `bg-surface`, `text-primary`, `text-secondary`, `border-default`

#### `/src/styles/hover-states.css` - Interactive States

- **Purpose**: Hover state utilities for all color variations
- **Key Features**:
  - Hover backgrounds: `hover:bg-*`
  - Hover text colors: `hover:text-*`
  - Hover border colors: `hover:border-*`
  - Consistent with base color system

#### `/src/styles/focus-states.css` - Accessibility & Focus

- **Purpose**: Focus states and ring utilities for accessibility
- **Key Features**:
  - Focus border colors: `focus:border-*`
  - Ring colors: `ring-*`
  - Focus ring colors: `focus:ring-*`
  - Disabled states: `disabled:bg-*`, `disabled:text-*`

### Color System Architecture

#### CSS Variables Structure

```css
:root {
  /* Base color scales */
  --color-highlight-50: #eaf2ff;
  --color-highlight-100: #b4dbff;
  --color-highlight-200: #6fbaff;
  --color-highlight-300: #2897ff;
  --color-highlight-400: #006ffd;

  /* Semantic mappings */
  --color-background: var(--color-neutral-50);
  --color-surface: var(--color-neutral-100);
  --color-text-primary: var(--color-neutral-900);
}
```

#### Theme System

- **Light Theme**: Default theme with standard color mappings
- **Dark Theme**: Inverted neutral scale with adjusted semantic colors
- **Theme-Aware Colors**: Semantic variables that adapt to theme context
- **Theme Switching**: Controlled via `[data-theme='dark']` attribute

#### Color Categories

1. **Highlight Colors** (Brand/Primary): Blue color scale for primary actions
2. **Neutral Colors** (UI/Structure): Gray scale for text, borders, backgrounds
3. **Success Colors** (Positive): Green scale for success states
4. **Warning Colors** (Caution): Orange scale for warning states
5. **Error Colors** (Negative): Red scale for error states

### Typography System

#### Semantic Typography Classes

- **Action Text**: `text-action-s/m/l` - For buttons and actionable elements
- **Caption Text**: `text-caption-m` - For labels and captions
- **Heading Text**: `text-h1` through `text-h5` - For hierarchical headings
- **Body Text**: `text-body-xs/s/m/l/xl` - For regular content
- **Slim Text**: `text-slim-*` - Lighter weight variant
- **Medium Text**: `text-medium-*` - Medium weight variant
- **Thick Text**: `text-thick-*` - Semibold weight variant

#### Font System

- **Primary Font**: Inter (Google Fonts)
- **Fallback Stack**: System fonts (`-apple-system`, `BlinkMacSystemFont`, `'Segoe UI'`, `Roboto`, `sans-serif`)
- **Weight Range**: 300-800 (light to extrabold)

### Component CSS Patterns

#### Class Composition Pattern

Components use `$derived.by()` to compose CSS classes:

```svelte
let buttonClasses = $derived.by(() => {
  const base = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200'
  const variants = {
    primary: 'bg-highlight text-white hover:bg-highlight-hover',
    secondary: 'bg-transparent border-2 border-highlight text-highlight hover:bg-highlight-light'
  }
  const sizes = {
    small: 'px-3 py-1.5 text-action-s rounded-lg',
    medium: 'px-4 py-2.75 text-action-m rounded-xl'
  }
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`
})
```

#### Tailwind CSS v4 Integration

- **Modern Tailwind**: Uses v4 with CSS-first approach
- **CSS Variables**: Tailwind classes work with CSS variables
- **Plugins**: Uses `@tailwindcss/forms` and `@tailwindcss/typography`
- **Custom Utilities**: Extended with custom color and typography utilities

### Design System Benefits

1. **Theme Consistency**: All colors are theme-aware and switch automatically
2. **Maintainability**: Single source of truth for colors and typography
3. **Performance**: CSS variables avoid runtime calculations
4. **Accessibility**: Focus states and semantic colors built-in
5. **Developer Experience**: Semantic class names improve readability
6. **Scalability**: Easy to add new color variants or typography scales

### Mobile Considerations

- **Responsive Design**: Built with mobile-first approach
- **Touch-Friendly**: Adequate spacing and sizing for touch interfaces
- **Scroll Behavior**: Custom scroll handling for mobile viewports
- **Performance**: Optimized for mobile rendering

### Future CSS Improvements (Planned)

1. **Semantic Utility Classes**: More semantic color classes (e.g., `.bg-success` instead of `.bg-success-200`)
2. **Component-Specific Variables**: Custom properties for component theming
3. **Animation Utilities**: Standardized transition and animation classes
4. **Spacing System**: Consistent spacing scale utilities
5. **Container Queries**: Modern responsive design patterns

This CSS architecture provides a solid foundation for consistent, maintainable, and theme-aware styling across the entire application.
