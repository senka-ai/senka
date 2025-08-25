# @senka-ai/ui Component Library Architecture

## Overview

The `@senka-ai/ui` library is a modern, type-safe Svelte 5 component library built with TypeScript, Tailwind CSS v4, and modern development practices. It provides a comprehensive set of reusable UI components, featuring full theme support, accessibility standards, and robust state management patterns.

**Framework**: Svelte 5 with TypeScript
**Styling**: Tailwind CSS v4 + CSS Custom Properties
**Package Type**: ESM with TypeScript definitions

## Core Technologies

### Svelte 5 Runes Architecture

The library fully embraces Svelte 5's modern runes system:

- **`$state()`** - Reactive local state management
- **`$props()`** - Component props destructuring with defaults
- **`$derived()` / `$derived.by()`** - Computed values and complex derivations
- **`$effect()`** - Side effects and cleanup
- **Direct event handlers** - `onclick` instead of `on:click` directives
- **Snippet rendering** - `{@render children?.()}` for component composition

### TypeScript Integration

- **Zero runtime dependencies** - Pure peer dependency on Svelte 5
- **Explicit interface definitions** - No generic `ComponentProps<>` usage
- **Composition-based type system** - Modular interfaces that extend base types
- **Strict type checking** - Full TypeScript strict mode compliance
- **Generated type definitions** - Complete `.d.ts` exports for library consumers

## Package Structure

```
@senka-ai/ui/
├── src/
│   ├── lib/
│   │   ├── components/          # UI components organized by category
│   │   │   ├── core/                   # core components
│   │   │   ├── examples/               # Example components for documentation
│   │   │   ├── forms/                  # form components
│   │   │   ├── feedback/               # feedback components
│   │   │   ├── layout/                 # layout components
│   │   │   ├── navigation/             # navigation components
│   │   │   └── media/                  # media components
│   │   ├── icons/               # SVG icon components
│   │   ├── types/
│   │   │   └── component.ts     # Shared TypeScript interfaces
│   │   ├── utils/               # Utility functions and state management
│   │   │   ├── events.ts        # Event handling utilities
│   │   │   ├── focus.svelte.ts  # Focus state management
│   │   │   ├── icons.ts         # Icon rendering utilities
│   │   │   ├── rendering.ts     # Component rendering helpers
│   │   │   ├── state.svelte.ts  # State management utilities
│   │   │   ├── styles.ts        # Style composition utilities
│   │   │   ├── validation.svelte.ts # Form validation system
│   │   │   └── tests/           # Unit tests for utilities
│   │   ├── theme.svelte.ts      # Global theme management
│   │   └── index.ts             # Main library exports
│   ├── stories/                 # Storybook documentation
│   └── styles/                  # CSS architecture
│       ├── index.css            # Main CSS entry point
│       ├── colors.css           # Color utility classes
│       ├── typography.css       # Typography system
│       ├── hover-states.css     # Interactive state utilities
│       ├── focus-states.css     # Accessibility and focus styles
│       ├── spacing.css          # Spacing utilities
│       └── transitions.css      # Animation and transition utilities
├── package.json
├── vite.config.ts              # Build configuration
├── vitest.setup.ts             # Vitest setup configuration
├── tsconfig.json               # TypeScript configuration
├── svelte.config.js            # Svelte configuration
├── playwright.config.ts        # Playwright testing configuration
├── vercel.json                 # Vercel deployment configuration
├── BUILD_COMPONENTS.md         # Component build documentation
├── README.md                   # Package documentation
├── design/                     # Design reference images
├── dist/                       # Build output directory
├── storybook-static/           # Built Storybook output
├── test-results/               # Test execution results
└── tests/                      # Visual testing with Playwright
```

## TypeScript Interface Architecture

### Base Interface System

The library uses a **composition-based interface pattern** where components extend multiple small, focused interfaces rather than large monolithic ones:

```typescript
// Core base interfaces
interface BaseProps {
  class?: string
  id?: string
  disabled?: boolean
}

interface SizedComponent {
  size?: 'small' | 'medium' | 'large'
}

interface ExtendedSizedComponent {
  size?: 'xs' | 'small' | 'medium' | 'large'
}

interface VariantComponent<T extends string> {
  variant?: T
}

interface ChildrenComponent {
  children?: any
}

interface FullWidthComponent {
  fullWidth?: boolean
}

interface LoadingComponent {
  loading?: boolean
}

interface InteractiveComponent {
  hover?: boolean
  active?: boolean
}
```

### Event Handler Interfaces

Standardized event handling across all components:

```typescript
interface ClickHandler {
  onclick?: () => void
}

interface ChangeHandler<T = any> {
  onchange?: (value: T) => void
}

interface KeyboardHandler {
  onkeydown?: (event: KeyboardEvent) => void
}

interface FocusHandlers {
  onfocus?: () => void
  onblur?: () => void
}

interface InteractiveHandlers extends ClickHandler, KeyboardHandler, FocusHandlers {}
```

### Form-Specific Interfaces

Comprehensive form field support:

```typescript
interface FormField {
  name?: string
  value?: string
  label?: string
  helperText?: string
  error?: string
  placeholder?: string
  showLabel?: boolean
  showHelperText?: boolean
}

interface FormInputComponent extends BaseProps, FormField, FullWidthComponent, FocusHandlers {
  type?: string
}

interface ValidationComponent {
  validationRules?: ValidationRule<any>[]
  validateOnBlur?: boolean
  validateOnChange?: boolean
}
```

### Composite Component Interfaces

Pre-configured interfaces for common component patterns:

```typescript
interface ButtonLikeComponent
  extends BaseProps,
    SizedComponent,
    VariantComponent<'primary' | 'secondary' | 'tertiary'>,
    FullWidthComponent,
    LoadingComponent,
    ClickHandler,
    ChildrenComponent {
  type?: 'button' | 'submit' | 'reset'
}

interface CardComponent extends BaseProps, ClickHandler, ChildrenComponent {
  title: string
  subtitle?: string
  description?: string
  variant?: 'default' | 'compact'
}

interface ListItemComponent extends BaseProps, ClickHandler, InteractiveComponent, ChildrenComponent {
  title: string
  description?: string
}
```

## Component Implementation Patterns

### Standard Component Structure

All components follow this consistent pattern:

```typescript
<script lang="ts">
  import type { ButtonLikeComponent, IconComponent } from '@ui/type/component'
  import { createButtonStyles } from '@ui/utils/styles'

  // 1. Interface definition (always explicit)
  interface Props extends ButtonLikeComponent, IconComponent {
    iconSize?: number
    customProp?: string
  }

  // 2. Props destructuring with $props()
  let {
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    fullWidth = false,
    class: className = '',
    onclick,
    children,
    leftIcon,
    rightIcon,
    iconSize = 16,
    ...restProps
  }: Props = $props()

  // 3. Reactive state with $state()
  let isPressed = $state(false)

  // 4. Computed values with $derived()
  let isDisabled = $derived(disabled || loading)
  let buttonClasses = $derived(createButtonStyles({
    variant,
    size,
    fullWidth,
    className
  }))

  // 5. Event handlers (direct, not on:event)
  const handleClick = () => {
    if (isDisabled) return
    onclick?.()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (['Enter', ' '].includes(event.key)) {
      if (isDisabled) return
      event.preventDefault()
      onclick?.()
    }
  }
</script>

<button
  class={buttonClasses}
  {disabled}
  onclick={handleClick}
  onkeydown={handleKeyDown}
  {...restProps}
>
  {#if leftIcon}
    {@render leftIcon(iconSize)}
  {/if}

  {#if children}
    {@render children()}
  {/if}

  {#if rightIcon}
    {@render rightIcon(iconSize)}
  {/if}
</button>
```

### Children Rendering Pattern

Components consistently use the snippet pattern for flexible content:

```svelte
<!-- Component usage -->
<Button variant="primary">Click me!</Button>

<!-- Component implementation -->
{#if children}
  {@render children()}
{/if}
```

### Icon Integration Pattern

Flexible icon support for both string emojis and Svelte components:

```svelte
{#if shouldRenderIcon(leftIcon)}
  {#if isStringIcon(leftIcon)}
    <span class="icon-emoji">{leftIcon}</span>
  {:else}
    {@render leftIcon?.(iconSize)}
  {/if}
{/if}
```

Usually, it's not advised to use string emojis.

## CSS Architecture

### Design System Foundation

The styling system is built on CSS custom properties combined with Tailwind CSS v4:

```css
:root {
  /* Color scales (50-400) */
  --color-highlight-50: #eaf2ff;
  --color-highlight-100: #b4dbff;
  --color-highlight-200: #6fbaff;
  --color-highlight-300: #2897ff;
  --color-highlight-400: #006ffd;

  /* Neutral scale */
  --color-neutral-50: #ffffff;
  --color-neutral-900: #1f2024;

  /* Semantic mappings */
  --color-background: var(--color-neutral-50);
  --color-surface: var(--color-neutral-100);
  --color-text-primary: var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-600);
}
```

### Color Categories

1. **Highlight Colors** - Primary brand colors (blue scale)
2. **Neutral Colors** - UI structure colors (gray scale)
3. **Success Colors** - Positive states (green scale)
4. **Warning Colors** - Caution states (orange scale)
5. **Error Colors** - Error states (red scale)

### Semantic Color System

**CRITICAL: Components must ONLY use semantic colors defined in the design system.**

All colors are defined in `src/styles/index.css` and `src/styles/colors.css`. Components should exclusively use these predefined semantic colors to ensure consistency, theme compatibility, and maintainability.

#### Required Color Usage Patterns

**✅ Use semantic color classes:**

```svelte
<!-- Correct: Using semantic color classes -->
<div class="bg-surface text-primary border-default">Content with proper semantic colors</div>

<!-- Correct: Using design system color utilities -->
<button class="bg-highlight hover:bg-highlight-300 text-white"> Primary Button </button>

<!-- Correct: Using state-specific colors -->
<div class="text-error border-error bg-error-50">Error message with consistent error styling</div>
```

**❌ Never use arbitrary colors:**

```svelte
<!-- Wrong: Arbitrary color values -->
<div style="background-color: #ff0000; color: #333333;">Don't use arbitrary colors</div>

<!-- Wrong: Non-semantic Tailwind colors -->
<div class="border-blue-300 bg-red-500 text-gray-800">Don't use arbitrary Tailwind colors</div>

<!-- Wrong: Inline CSS custom properties -->
<div style="background-color: var(--some-custom-color);">Don't define custom color variables</div>
```

#### Available Semantic Colors

**Background Colors:**

- `bg-background` - Main background color
- `bg-surface` - Component surface color
- `bg-surface-elevated` - Elevated surface color
- `bg-surface-hover` - Hover state background

**Text Colors:**

- `text-primary` - Primary text color
- `text-secondary` - Secondary text color
- `text-muted` - Muted/disabled text color

**Border Colors:**

- `border-default` - Default border color
- `border-strong` - Strong emphasis border

**State Colors (by category):**

- Highlight: `bg-highlight`, `text-highlight`, `border-highlight`
- Success: `bg-success`, `text-success`, `border-success`
- Warning: `bg-warning`, `text-warning`, `border-warning`
- Error: `bg-error`, `text-error`, `border-error`

**Scale Colors (50-400 for each category):**

- `bg-highlight-50` through `bg-highlight-400`
- `bg-neutral-50` through `bg-neutral-900`
- `bg-success-50` through `bg-success-400`
- `bg-warning-50` through `bg-warning-400`
- `bg-error-50` through `bg-error-400`

#### Theme Compatibility

All semantic colors automatically adapt to light and dark themes through CSS custom properties. When using semantic colors:

- Colors automatically adjust based on `[data-theme='dark']` attribute
- No additional code needed for theme switching
- Consistent contrast ratios maintained across themes
- Accessibility standards preserved in all themes

#### Component Implementation Requirements

**When building components:**

1. **Only reference design system colors** - Never use arbitrary hex codes or RGB values
2. **Use semantic names** - Prefer `text-primary` over `text-neutral-900`
3. **Leverage state colors** - Use `text-error` for error states, `bg-success-50` for success backgrounds
4. **Test in both themes** - Ensure components work in light and dark modes
5. **Follow the scale** - Use appropriate intensity levels (50 for subtle, 400 for prominent)

#### Style Composition Integration

The style composition system uses only semantic colors:

```typescript
// Correct: Using semantic colors in style composers
export const createAlertStyles = createStyleComposer({
  base: 'border-2 rounded-lg p-4',
  variants: {
    success: 'bg-success-50 border-success text-success',
    warning: 'bg-warning-50 border-warning text-warning',
    error: 'bg-error-50 border-error text-error',
  },
})
```

This approach ensures that all components maintain visual consistency, support theme switching, and follow accessibility guidelines without requiring manual color management.

### Theme System

**Light/Dark Theme Support:**

- Automatic system preference detection
- Manual theme switching via `ThemeToggle` component
- CSS variables automatically adapt based on `[data-theme='dark']` attribute
- Persistent theme selection in localStorage
- SSR-safe theme initialization

### Typography System

Semantic typography classes with consistent sizing:

```css
/* Heading scale */
.text-h1 {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
}
.text-h2 {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
}
.text-h3 {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}
.text-h4 {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
}
.text-h5 {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
}

/* Body text scale */
.text-body-xl {
  font-size: 18px;
  font-weight: 400;
  line-height: 1.4;
}
.text-body-l {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
}
.text-body-m {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
}
.text-body-s {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
}
.text-body-xs {
  font-size: 10px;
  font-weight: 400;
  line-height: 1.4;
}

/* Action text for buttons */
.text-action-l {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2;
}
.text-action-m {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
}
.text-action-s {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
}

/* Caption text */
.text-caption-m {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
}
```

### Style Composition System

The library uses sophisticated style composition utilities that enforce semantic color usage:

```typescript
// Main style composer
export function createStyleComposer<TVariant, TSize>(config: {
  base: string
  variants?: Record<string, string>
  sizes?: Record<string, string>
}) {
  return ({ variant, size, className }: StyleOptions) => {
    const parts = [config.base]
    if (variant && config.variants?.[variant]) parts.push(config.variants[variant])
    if (size && config.sizes?.[size]) parts.push(config.sizes[size])
    if (className) parts.push(className)
    return parts.join(' ')
  }
}

// Pre-configured style composers (using ONLY semantic colors)
export const createButtonStyles = createStyleComposer({
  base: 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none',
  variants: {
    primary: 'bg-highlight text-white border-2 border-transparent hover:bg-highlight-300 disabled:bg-neutral-400',
    secondary:
      'bg-transparent border-2 border-highlight text-highlight hover:bg-highlight-50 disabled:border-neutral-400',
    tertiary:
      'bg-transparent border-2 border-transparent text-highlight hover:bg-highlight-50 disabled:text-neutral-400',
  },
  sizes: {
    xs: 'px-2 py-1 text-action-s rounded-lg',
    small: 'px-3 py-1.5 text-action-s rounded-lg',
    medium: 'px-4 py-2.75 text-action-m rounded-xl',
    large: 'px-6 py-4 text-action-l rounded-2xl',
  },
})
```

**Key Requirements for Style Composers:**

1. **Semantic Colors Only** - All color classes must use predefined semantic colors from the design system
2. **Theme Compatibility** - Colors automatically adapt to light/dark themes without additional logic
3. **Accessibility Compliance** - Semantic colors ensure proper contrast ratios are maintained
4. **Consistency** - Using the same semantic color names across components ensures visual harmony

**Example: Creating a new style composer with proper semantic colors:**

```typescript
// ✅ Correct: Using semantic colors
export const createCardStyles = createStyleComposer({
  base: 'border-2 rounded-xl p-4 transition-colors duration-200',
  variants: {
    default: 'bg-surface border-default text-primary',
    elevated: 'bg-surface-elevated border-default text-primary shadow-sm',
    success: 'bg-success-50 border-success text-success',
    warning: 'bg-warning-50 border-warning text-warning',
    error: 'bg-error-50 border-error text-error',
  },
})

// ❌ Wrong: Using arbitrary Tailwind colors
export const createBadCardStyles = createStyleComposer({
  base: 'border-2 rounded-xl p-4',
  variants: {
    default: 'bg-gray-100 border-gray-300 text-gray-900', // Don't use arbitrary colors
    error: 'bg-red-50 border-red-500 text-red-700', // Don't use non-semantic colors
  },
})
```

## State Management Architecture

### Svelte 5 Runes-Based Utilities

The library provides comprehensive state management utilities using Svelte 5 runes:

```typescript
// Controlled/uncontrolled component pattern
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

// Focus state management
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

  const handleBlur = (event: FocusEvent) => {
    if (disabled) return
    focused = false
    onBlur?.(event)
  }

  return {
    focused: () => focused,
    handleFocus,
    handleBlur,
  }
}

// Form validation state
export function useFieldValidation<T>(initialValue: T, rules: ValidationRule<T>[]) {
  let validationState = $state({
    error: '',
    isValid: true,
    hasValidated: false,
  })

  const validate = (value: T) => {
    const result = validateValue(value, rules)
    validationState.error = result.errors[0] || ''
    validationState.isValid = result.isValid
    validationState.hasValidated = true
    return result
  }

  return {
    validationState: () => validationState,
    validate,
    reset: () => {
      validationState.error = ''
      validationState.isValid = true
      validationState.hasValidated = false
    },
  }
}
```

### Global Theme Management

Reactive theme state with persistence:

```typescript
export function useTheme() {
  ensureInitialized()

  const theme = $state({ current: currentTheme })

  const unsubscribe = subscribe((newTheme) => {
    theme.current = newTheme
  })

  return {
    get current() {
      return theme.current
    },
    set: setTheme,
    toggle: toggleTheme,
    destroy: unsubscribe,
  }
}
```

## Form Validation System

### Comprehensive Validation Rules

Built-in validation rules with custom rule support:

```typescript
export const validationRules = {
  required: (message = 'This field is required') => ({
    message,
    validator: (value: any) => value != null && value !== ''
  }),

  minLength: (min: number, message = `Minimum ${min} characters`) => ({
    message,
    validator: (value: string) => value.length >= min
  }),

  maxLength: (max: number, message = `Maximum ${max} characters`) => ({
    message,
    validator: (value: string) => value.length <= max
  }),

  email: (message = 'Invalid email format') => ({
    message,
    validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }),

  numeric: (message = 'Must be a number') => ({
    message,
    validator: (value: string | number) => !isNaN(Number(value))
  }),
}

// Usage in components
<TextField
  label="Email"
  validationRules={[
    validationRules.required(),
    validationRules.email()
  ]}
  validateOnBlur={true}
/>
```

## Event Handling Architecture

### Standardized Event Utilities

Consistent, accessible event handling patterns:

```typescript
// Keyboard event handling
export const KeySets = {
  ACTIVATION: ['Enter', ' '],
  NAVIGATION: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
  HORIZONTAL_NAVIGATION: ['ArrowLeft', 'ArrowRight'],
  VERTICAL_NAVIGATION: ['ArrowUp', 'ArrowDown'],
  ESCAPE: ['Escape'],
} as const

export function createKeyboardHandler(
  handler: () => void,
  config: {
    keys: string[]
    preventDefault?: boolean
    disabled?: boolean
  } = { keys: ['Enter', ' '], preventDefault: true }
) {
  return (event: KeyboardEvent) => {
    if (config.disabled) return
    if (config.keys.includes(event.key)) {
      if (config.preventDefault) event.preventDefault()
      handler()
    }
  }
}

// Navigation handling for components like TabBar, Dropdown
export function createNavigationHandler(
  onNavigate: (direction: 'up' | 'down' | 'left' | 'right') => void,
  config: { orientation?: 'horizontal' | 'vertical'; disabled?: boolean }
) {
  return (event: KeyboardEvent) => {
    if (config.disabled) return

    const { orientation = 'horizontal' } = config
    const keys = orientation === 'horizontal' ? KeySets.HORIZONTAL_NAVIGATION : KeySets.VERTICAL_NAVIGATION

    if (keys.includes(event.key)) {
      event.preventDefault()
      // Handle navigation based on key
    }
  }
}
```

## Icon System

### Standardized Icon Pattern

All icons follow this consistent interface:

```typescript
interface IconProps {
  class?: string
  size?: number | string
}

// Icon component structure
<script lang="ts">
  let { class: className = '', size = 24 }: IconProps = $props()
</script>

<svg
  class={className}
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <!-- SVG paths -->
</svg>
```

### Icon Categories

- **UI Icons**: Add, Close, Edit, Delete, Settings, Filter, Sort
- **Navigation**: Arrow (Up/Down/Left/Right), Chevron
- **Content**: Image, Video, Camera, Play
- **Communication**: Chat, Send, Inbox
- **Social**: Google, Apple, Facebook, LinkedIn
- **Status**: Check, Warning, Success, Info
- **Theme**: Sun, Moon (for theme switching)
- **Commerce**: Shopping bag (filled/outlined), Store
- **Interactive**: Heart (filled/outlined), Star (filled/outlined)

### Icon Integration

Icons can be used as Svelte components:

```svelte
<!-- Component icon -->
<Button leftIcon={ArrowRightIcon}>Continue</Button>
```

Icons can also be used as strings (emoji), though not usually recommended:

```svelte
<!-- String icon -->
<Button leftIcon="🚀">Launch</Button>
```

### Icon Development Guidelines

**CRITICAL: Always use existing icon components instead of inline SVG markup**

When building components that need icons or placeholders:

- ✅ **Use existing icons**: Import from `'../../icons'` and use icon components
- ❌ **No inline SVG**: Never embed SVG markup directly in component templates
- ✅ **Consistent sizing**: Use the `size` prop for responsive icon sizing
- ✅ **Semantic naming**: Choose icons that clearly represent their function

**Example - Correct icon usage with semantic colors:**

```svelte
<script lang="ts">
  import { ImageIcon, CheckIcon } from '@ui/icons'
</script>

<!-- Placeholder with icon component using semantic colors -->
<div class="placeholder">
  <ImageIcon class="text-muted h-8 w-8" size={32} />
</div>

<!-- Success state with icon component using semantic colors -->
<div class="success-message">
  <CheckIcon class="text-success h-5 w-5" size={20} />
  <span class="text-success">Success!</span>
</div>

<!-- Interactive icon using highlight colors -->
<button class="text-highlight hover:text-highlight-300">
  <ArrowIcon class="h-4 w-4" size={16} />
</button>
```

**Example - Incorrect approach:**

```svelte
<!-- ❌ Don't do this - inline SVG with arbitrary colors -->
<div class="placeholder">
  <svg class="h-8 w-8 text-gray-400" viewBox="0 0 24 24">
    <path d="M4 3a2 2 0 00-2 2v10..." />
  </svg>
</div>

<!-- ❌ Don't use arbitrary Tailwind colors -->
<div class="success-message">
  <CheckIcon class="h-5 w-5 text-green-500" size={20} />
  <span class="text-green-700">Success!</span>
</div>

<!-- ❌ Don't use inline styles with custom colors -->
<button style="color: #2897ff;">
  <ArrowIcon class="h-4 w-4" size={16} />
</button>
```

**Benefits of using icon components with semantic colors:**

- **Consistency**: All icons follow the same interface and sizing system
- **Maintainability**: Icon updates apply everywhere automatically
- **Performance**: Icons are optimized and tree-shakeable
- **Accessibility**: Icons include proper ARIA attributes and semantic markup
- **Theme Support**: Icons automatically adapt to theme changes via semantic colors
- **Color Consistency**: Semantic color classes ensure icons match the design system
- **Automatic Theme Switching**: Dark/light theme colors applied automatically without code changes

## Testing Architecture

### Multi-Layer Testing Strategy

**Unit Tests** (Vitest)

- All utility functions have comprehensive test coverage
- Validation rules testing
- State management utilities testing
- Event handling utilities testing

**Visual Regression Tests** (Playwright)

- All components tested in light and dark themes
- Critical component variants and states
- Screenshot comparison for consistency
- Cross-browser testing

**Storybook Integration**

- Comprehensive stories for all components
- Interactive controls for all props
- Documentation and usage examples
- Visual testing integration

### Testing Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'node', // Utility functions only
    include: ['src/**/*.test.ts'],
    exclude: ['src/**/*.svelte'], // Svelte components tested visually
  },
})

// playwright.config.ts
export default defineConfig({
  testDir: './tests/visual',
  use: { screenshot: 'only-on-failure' },
  projects: [
    { name: 'chromium-light', use: { ...devices['Desktop Chrome'] } },
    { name: 'chromium-dark', use: { colorScheme: 'dark' } },
  ],
})
```

## Development Workflow

### Build Process

- **Vite**: Library mode with SvelteKit integration
- **TypeScript**: Strict mode with declaration generation
- **Tailwind CSS v4**: JIT compilation with CSS variables
- **Tree Shaking**: Optimized bundle with individual component imports

### Commands

```json
{
  "dev": "storybook dev -p 6006 --no-open",
  "build": "svelte-package -o dist && cp -r src/styles/* dist/ && cp src/styles/index.css dist/styles.css",
  "story": "storybook dev -p 6006 --no-open",
  "build-storybook": "storybook build",
  "typecheck": "tsc --noEmit --strict --skipLibCheck",
  "svelte-check": "svelte-check --tsconfig ./tsconfig.json",
  "test": "vitest",
  "test:visual": "playwright test",
  "preview": "vite preview"
}
```

### Quality Assurance

- **TypeScript**: Strict type checking (`yarn ui:typecheck`)
- **Svelte Check**: Svelte-specific validation (`yarn ui:check`)
- **Prettier**: Code formatting with Svelte and Tailwind support (`yarn format`)
- **Visual Testing**: Automated screenshot comparison
- **Storybook**: Component isolation and documentation

## Library Usage

### Installation

```bash
npm install @senka-ai/ui
# Peer dependencies
npm install svelte @tailwindcss/vite
```

### Basic Setup

```typescript
// app.css
import '@senka-ai/ui/styles'

// Component usage
import { Button, TextField, Card } from '@senka-ai/ui'

<Button variant="primary" onclick={() => console.log('clicked')}>
  Click me!
</Button>
```

### Theme Integration

```typescript
import { useTheme, ThemeToggle } from '@senka-ai/ui'

// In your app
<ThemeToggle />

// Programmatic theme control
const theme = useTheme()
theme.set('dark')
```

## Accessibility Standards

### Keyboard Navigation

- **Activation**: Enter + Space for buttons and interactive elements
- **Navigation**: Arrow keys for navigable components (tabs, dropdowns)
- **Focus Management**: Proper focus ring and state management
- **Escape Handling**: Close modals, dropdowns, and overlays

### Screen Reader Support

- **Semantic HTML**: Proper element usage and ARIA roles
- **Label Associations**: Form fields properly labeled
- **Status Communication**: Accessible status and error messaging
- **State Announcements**: Changes announced to screen readers

### Color and Contrast

- **WCAG Compliance**: Color combinations meet accessibility standards
- **High Contrast**: Dark theme provides sufficient contrast
- **Color Independence**: Information not conveyed by color alone
- **Focus Indicators**: Clear focus states for all interactive elements

## Performance Considerations

### Bundle Optimization

- **Tree Shaking**: Individual component imports prevent bundle bloat
- **CSS Variables**: Runtime theming without JavaScript calculations
- **Icon Optimization**: SVG components with minimal overhead
- **Lazy Loading**: Stories and utilities loaded on demand

### Runtime Performance

- **Svelte 5 Runes**: Optimal reactivity with minimal overhead
- **CSS-in-CSS**: Static styles avoid runtime style calculations
- **Event Delegation**: Efficient event handling patterns
- **Memory Management**: Proper cleanup in state utilities

### Modular Architecture for Easy Modifications

**Every component designed for modification-first development:**

This architecture provides a solid foundation for building modern, accessible, and maintainable user interfaces while leveraging the full power of Svelte 5's innovative features and maintaining excellent developer experience.
