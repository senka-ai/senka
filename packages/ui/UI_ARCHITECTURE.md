# senka-ui Component Library Architecture

## Overview

The `senka-ui` library is a modern, type-safe Svelte 5 component library built with TypeScript, Tailwind CSS v4, and modern development practices. It provides a comprehensive set of reusable UI components, featuring full theme support, accessibility standards, and robust state management patterns.

**Version**: 0.1.0  
**License**: MIT  
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
senka-ui/
├── src/
│   ├── lib/
│   │   ├── components/          # 29 UI components organized by category
│   │   │   ├── Button.svelte           # Core button component
│   │   │   ├── ThemeToggle.svelte      # Theme switching component
│   │   │   ├── forms/                  # 9 form components
│   │   │   ├── feedback/               # 2 feedback components
│   │   │   ├── layout/                 # 7 layout components
│   │   │   ├── navigation/             # 3 navigation components
│   │   │   └── media/                  # 6 media components
│   │   ├── icons/               # 48 SVG icon components
│   │   ├── types/
│   │   │   └── component.ts     # Shared TypeScript interfaces
│   │   ├── utils/               # Utility functions and state management
│   │   │   ├── events.ts        # Event handling utilities
│   │   │   ├── focus.svelte.ts  # Focus state management
│   │   │   ├── icons.ts         # Icon rendering utilities
│   │   │   ├── rendering.ts     # Component rendering helpers
│   │   │   ├── state.svelte.ts  # State management utilities
│   │   │   ├── styles.ts        # Style composition utilities
│   │   │   └── validation.svelte.ts # Form validation system
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
├── tsconfig.json               # TypeScript configuration
└── tailwind.config.ts          # Tailwind CSS configuration
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
  import type { ButtonLikeComponent, IconComponent } from '$lib/types/component.ts'
  import { createButtonStyles } from '$lib/utils/styles.ts'

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
<Button variant="primary">
  {#snippet children()}
    Click me!
  {/snippet}
</Button>

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

The library uses sophisticated style composition utilities:

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

// Pre-configured style composers
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

  romanianCNP: (message = 'Invalid CNP format') => ({
    message,
    validator: (value: string) => /^\d{13}$/.test(value) // Simplified
  })
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

## Component Categories

### Form Components (9 components)

**TextField** - Text input with validation

- Icons (left/right), validation, focus states, unit display
- Extends: `FormInputComponent`, `IconComponent`, `ValidationComponent`

**TextArea** - Multi-line text input

- Resize control, row configuration, character counting
- Extends: `FormInputComponent`, `ValidationComponent`

**Dropdown** - Select dropdown with options

- Keyboard navigation, search filtering, custom options
- Extends: `FormInputComponent`, `ChangeHandler<string>`

**SearchBar** - Search input with integrated icon

- Built-in search icon, focus management, clear functionality
- Extends: `BaseProps`, `FullWidthComponent`, `KeyboardHandler`

**Checkbox** - Checkbox with label support

- Container click handling, custom labels, indeterminate state
- Extends: `BaseProps`, `SizedComponent`, `ChangeHandler<boolean>`, `ChildrenComponent`

**RadioButton** - Radio button for single selection

- Visual dot indicator, label support, group coordination
- Extends: `BaseProps`, `SizedComponent`, `ChangeHandler<boolean>`, `ChildrenComponent`

**RadioGroup** - Container for radio button groups

- Context-based state management, keyboard navigation
- Extends: `BaseProps`, `ChangeHandler<string>`

**Toggle** - Switch/toggle component

- Smooth animations, keyboard accessibility, size variants
- Extends: `BaseProps`, `SizedComponent`, `ChangeHandler<boolean>`

**FormField** - Wrapper for form field layout

- Label, helper text, error display, consistent spacing
- Extends: `BaseProps`, `ChildrenComponent`

### Interactive Components (2 components)

**Button** - Primary action button

- Three variants, loading states, icons (left/right), full width support
- Extends: `ButtonLikeComponent`, `IconComponent`

**ThemeToggle** - Light/dark theme switcher

- System preference detection, smooth transitions, icon switching
- Extends: `BaseProps`, `ClickHandler`

### Feedback Components (2 components)

**Badge** - Status and count indicators

- Number, icon, and dot types; success/warning/error variants
- Extends: `BaseProps`, `SizedComponent`, `VariantComponent`

**Tag** - Labeled chips/tags

- Clickable functionality, left/right icons, style variants
- Extends: `BaseProps`, `VariantComponent`, `IconComponent`, `ClickHandler`

### Layout Components (7 components)

**Card** - Content cards with actions

- Image/icon support, action buttons, favorite functionality, compact mode
- Extends: `CardComponent`

**CardHorizontal** - Horizontal card layout

- Side-by-side content and media layout
- Extends: `BaseProps`, `ClickHandler`, `ChildrenComponent`

**List** - Container for list items

- Automatic ListItem rendering, dividers, title with actions
- Extends: `BaseProps`, `ChildrenComponent`

**ListItem** - Individual list item

- Icons (left/right), right controls, chevron support, compact mode
- Extends: `ListItemComponent`, `IconComponent`

**ListTitle** - List section headers

- Right action support, consistent styling
- Extends: `BaseProps`, `ChildrenComponent`

**Divider** - Section dividers

- Horizontal/vertical orientation, spacing control, style variants
- Extends: `BaseProps`, `VariantComponent<'solid' | 'dashed' | 'dotted'>`

**Accordion** - Collapsible content sections

- Smooth animations, keyboard navigation, multiple items
- Extends: `BaseProps`, `ChildrenComponent`

### Navigation Components (3 components)

**TabBar** - Tab navigation

- Active tab management, keyboard navigation, scroll support
- Extends: `BaseProps`, `ChangeHandler<string>`

**NavBar** - Navigation bar with items

- Icon and text support, active states, responsive behavior
- Extends: `BaseProps`, `ChildrenComponent`

**Navigation** - App navigation component

- Context for navigation state, route awareness
- Extends: `BaseProps`, `ChildrenComponent`

### Media Components (6 components)

**Avatar** - User profile images

- Multi-fallback system (image → initials → placeholder), status indicators
- Extends: `BaseProps`, `ExtendedSizedComponent`, `StatusComponent`

**AvatarPlaceholder** - Default avatar fallback

- Consistent styling with Avatar component
- Extends: `BaseProps`, `ExtendedSizedComponent`

**Image** - Responsive image component

- Aspect ratio control, placeholder/fallback system, loading states
- Extends: `BaseProps`

**ImagePlaceholder** - Image loading placeholder

- Consistent styling with Image component
- Extends: `BaseProps`

**Video** - Video player component

- Placeholder support, loading/error states, responsive sizing
- Extends: `BaseProps`

**VideoPlaceholder** - Video loading placeholder

- Consistent styling with Video component
- Extends: `BaseProps`

## Icon System (48 icons)

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

Icons can be used as both strings (emoji) and Svelte components:

```svelte
<!-- String icon -->
<Button leftIcon="🚀">Launch</Button>

<!-- Component icon -->
<Button leftIcon={ArrowRightIcon}>Continue</Button>
```

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
  "dev": "storybook dev -p 6006",
  "build": "vite build && tsc",
  "story": "storybook dev -p 6006",
  "build-storybook": "storybook build",
  "typecheck": "tsc --noEmit",
  "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
  "test": "vitest run",
  "test:unit": "vitest",
  "test:visual": "playwright test"
}
```

### Quality Assurance

- **Prettier**: Code formatting with Svelte and Tailwind support
- **TypeScript**: Strict type checking (`yarn typecheck`)
- **Svelte Check**: Svelte-specific validation (`yarn check`)
- **Visual Testing**: Automated screenshot comparison
- **Storybook**: Component isolation and documentation

## Library Usage

### Installation

```bash
npm install senka-ui
# Peer dependencies
npm install svelte @tailwindcss/vite
```

### Basic Setup

```typescript
// app.css
import 'senka-ui/styles'

// Component usage
import { Button, TextField, Card } from 'senka-ui'

<Button variant="primary" onclick={() => console.log('clicked')}>
  {#snippet children()}
    Click me!
  {/snippet}
</Button>
```

### Theme Integration

```typescript
import { useTheme, ThemeToggle } from 'senka-ui'

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

## No-Code Builder Component Requirements

### Visual Builder Integration Components

**Critical for Phase 1 No-Code Platform Development:**

#### 1. **Visual Component Wrappers** (`@senka/visual-components`)
```typescript
interface BuiltComponentWrapper {
  // Visual editing handles
  dragHandle: boolean
  resizeHandles: ResizeHandle[]
  
  // Visual state indicators  
  isSelected: boolean
  isHovered: boolean
  isDragging: boolean
  
  // Layout constraints
  constraints: LayoutConstraints
  snapToGrid: boolean
  
  // Component metadata for builder
  componentType: string
  builderProps: BuilderComponentProps
}
```

#### 2. **Drag-and-Drop System Components**
- **DragHandle**: Visual handle for moving components
- **ResizeHandle**: Corner/edge handles for resizing 
- **SelectionOverlay**: Visual selection indicator
- **SnapGrid**: Visual grid system for alignment
- **GuideLines**: Alignment guides during dragging

#### 3. **Real-Time Preview Components**
- **PreviewFrame**: Isolated preview of built application
- **ResponsiveViewport**: Multi-device preview switching
- **LivePreview**: Real-time updates during editing
- **InteractionPreview**: Preview of component interactions

#### 4. **Layout Constraint System**
```typescript
interface LayoutConstraints {
  position: 'absolute' | 'relative' | 'flex' | 'grid'
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
  aspectRatio?: number
  alignSelf?: FlexAlign
  gridArea?: string
}
```

#### 5. **Builder-Specific Component Variants**
Each existing component needs builder-optimized variants:
- **Button** → **BuilderButton** (with drag handles, property inspector)
- **TextField** → **BuilderTextField** (with validation setup UI)
- **Card** → **BuilderCard** (with content slot management)

### Component Property Inspector Integration

#### Visual Property Controls
```typescript
interface PropertyInspectorProps {
  // Visual styling controls (no CSS knowledge needed)
  colorPicker: boolean
  fontSelector: boolean
  spacingSliders: boolean
  shadowEditor: boolean
  
  // Layout controls
  positionEditor: boolean
  sizeControls: boolean
  alignmentTools: boolean
  
  // Component-specific properties
  componentProps: Record<string, PropertyControl>
  
  // Advanced settings (collapsed by default)
  advancedSettings: PropertyControl[]
}
```

#### Property Control Types
- **ColorPicker**: Visual color selection with palette
- **SizeSlider**: Numeric input with visual slider
- **ToggleSwitch**: Boolean property toggle
- **DropdownSelect**: Enumerated options
- **TextInput**: String/number input with validation

### Template Integration Components

#### Template Preview System
```typescript
interface TemplatePreviewComponent {
  // Template metadata
  templateId: string
  templateName: string
  templateCategory: string
  
  // Preview capabilities
  thumbnailImage: string
  livePreview: boolean
  responsivePreview: boolean
  
  // Customization hooks
  customizableAreas: CustomizableArea[]
  requiredData: DataRequirement[]
}
```

#### One-Click Customization
- **BrandKitApplicator**: Apply user's brand colors/fonts across template
- **ContentWizard**: Guide user through content replacement
- **ImageReplacer**: Smart image replacement suggestions
- **ColorSchemeApplicator**: One-click color scheme changes

## Future Roadmap

### Planned Enhancements

1. **Advanced Visual Builder** - Complete drag-and-drop system with constraint-based layouts
2. **Animation System** - Visual animation editor with timeline
3. **Advanced Validation** - Visual validation rule builder
4. **Responsive Utilities** - Visual breakpoint editor
5. **Component Variants** - Visual variant selector and customizer
6. **Accessibility Improvements** - Built-in accessibility checker and fixer
7. **Performance Monitoring** - Real-time performance feedback in builder

### API Stability

- **Semantic Versioning**: Following semver for breaking changes
- **Interface Stability**: Base interfaces maintained for compatibility
- **Migration Guides**: Documentation for major version updates
- **Deprecation Warnings**: Advance notice for API changes

This architecture provides a solid foundation for building modern, accessible, and maintainable user interfaces while leveraging the full power of Svelte 5's innovative features and maintaining excellent developer experience.
