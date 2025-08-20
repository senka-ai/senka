/**
 * Style composition utilities for consistent CSS class management
 *
 * These utilities help components compose CSS classes in a standardized way,
 * reducing repetition and ensuring consistent patterns across all components.
 */

export type ClassValue = string | undefined | null | false | 0 | ''
export type VariantMap<T extends string> = Record<T, string>
export type SizeMap<T extends string> = Record<T, string>

/**
 * Compose CSS classes with base, variants, and conditional modifiers
 * Filters out falsy values and joins with spaces
 */
export function composeClasses(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Create a style composition function for a component with variants and sizes
 * This is the main utility for component class composition
 */
export function createStyleComposer<TVariant extends string = string, TSize extends string = string>(config: {
  base: string
  variants?: VariantMap<TVariant>
  sizes?: SizeMap<TSize>
}) {
  return function composeStyles(options: {
    variant?: TVariant
    size?: TSize
    disabled?: boolean
    fullWidth?: boolean
    className?: string
    modifiers?: Record<string, boolean>
  }): string {
    const { variant, size, disabled, fullWidth, className = '', modifiers = {} } = options

    const parts: ClassValue[] = [
      config.base,
      variant && config.variants?.[variant],
      size && config.sizes?.[size],
      disabled && 'disabled:opacity-50 disabled:cursor-not-allowed',
      fullWidth && 'w-full',
      className,
    ]

    // Add conditional modifiers
    Object.entries(modifiers).forEach(([modifier, condition]) => {
      if (condition) parts.push(modifier)
    })

    return composeClasses(...parts)
  }
}

/**
 * Standard button style composer
 * Updated to match Button component's original design
 */
export const createButtonStyles = createStyleComposer({
  base: 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none cursor-pointer',
  variants: {
    primary:
      'border-2 border-transparent hover:bg-highlight-hover bg-highlight text-white disabled:bg-neutral-disabled disabled:text-neutral-disabled',
    secondary:
      'bg-transparent border-2 hover:bg-highlight-light text-highlight border-highlight disabled:border-neutral-disabled disabled:text-neutral-light',
    tertiary:
      'bg-transparent border-2 border-transparent hover:bg-highlight-light text-highlight disabled:text-neutral-light',
  },
  sizes: {
    xs: 'px-2 py-1 text-action-s rounded-lg',
    small: 'px-3 py-1.5 text-action-s rounded-lg',
    medium: 'px-4 py-2.75 text-action-m rounded-xl',
    large: 'px-6 py-4 text-action-l rounded-2xl',
  },
})

/**
 * Standard input/form field style composer
 * Updated to match TextField component's original design
 */
export const createInputStyles = createStyleComposer({
  base: 'w-full px-3.25 py-3.25 text-body-m text-neutral-900 bg-neutral-50 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-offset-0 placeholder:text-neutral-500',
  variants: {
    default: 'border-neutral-400',
    focused: 'border-highlight ring-1 ring-highlight-400',
    error: 'border-error-400 focus:ring-1 ring-error-400',
    disabled: 'border-neutral-300 bg-neutral-100 text-neutral-500 cursor-not-allowed',
  },
  sizes: {
    small: 'px-2.5 py-2 text-body-s rounded-lg',
    medium: 'px-3.25 py-3.25 text-body-m rounded-xl',
    large: 'px-4 py-4 text-body-l rounded-2xl',
  },
})

/**
 * Filter style composer - combines button appearance with form input border styling
 * Default variant uses thin border like form inputs, other variants use button styling
 */
export const createFilterStyles = createStyleComposer({
  base: 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none cursor-pointer',
  variants: {
    primary:
      'border-2 border-transparent hover:bg-highlight-hover bg-highlight text-white disabled:bg-neutral-disabled disabled:text-neutral-disabled',
    secondary:
      'bg-transparent border border-neutral-400 hover:bg-highlight-light hover:border-highlight text-highlight disabled:border-neutral-disabled disabled:text-neutral-light',
    tertiary:
      'bg-transparent border-2 border-transparent hover:bg-highlight-light text-highlight disabled:text-neutral-light',
  },
  sizes: {
    xs: 'px-2 py-1 text-action-s rounded-lg',
    small: 'px-3 py-1.5 text-action-s rounded-lg',
    medium: 'px-4 py-2.75 text-action-m rounded-xl',
    large: 'px-6 py-4 text-action-l rounded-2xl',
  },
})

/**
 * Card style composer that matches the original Card component design exactly
 */
export function createCardStyles(options: {
  variant: 'default' | 'compact'
  interactive?: boolean
  disabled?: boolean
  className?: string
}): string {
  const { variant, interactive = false, disabled = false, className = '' } = options

  const base = 'overflow-hidden transition-all duration-200'
  const interactiveStyle = interactive && !disabled ? 'cursor-pointer hover:shadow-md' : ''
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const variants = {
    default: 'rounded-2xl',
    compact: 'rounded-xl',
  }

  return composeClasses(base, variants[variant], interactiveStyle, disabledStyles, className)
}

/**
 * Card content style composer for consistent content area styling
 */
export function createCardContentStyles(options: { variant: 'default' | 'compact' }): string {
  const { variant } = options

  const base = 'bg-neutral-100 flex-1'
  const padding = variant === 'default' ? 'p-6' : 'p-4'
  const rounding = variant === 'default' ? 'rounded-b-2xl' : 'rounded-b-xl'

  return composeClasses(base, padding, rounding)
}

/**
 * Standard avatar style composer
 */
export const createAvatarStyles = createStyleComposer({
  base: 'relative inline-flex items-center justify-center bg-highlight-50 text-neutral-600 font-medium',
  variants: {
    default: '',
    bordered: 'ring-2 ring-white shadow-sm',
  },
  sizes: {
    xs: 'h-8 w-8 text-body-s rounded-xl',
    small: 'h-10 w-10 text-body-s rounded-2xl',
    medium: 'h-14 w-14 text-body-m rounded-2xl',
    large: 'h-20 w-20 text-body-l rounded-3xl',
  },
})

/**
 * Badge style composer that handles different badge types
 * Updated to match Badge component's original design exactly
 */
export function createBadgeStyles(options: {
  variant: 'default' | 'success' | 'warning' | 'error'
  size: 'xs' | 'small' | 'medium' | 'large'
  type: 'dot' | 'number' | 'icon'
  isText?: boolean
  className?: string
}): string {
  const { variant, size, type, isText = false, className = '' } = options

  const base = 'inline-flex items-center justify-center font-medium'

  const variants = {
    default: 'bg-highlight text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    error: 'bg-error text-white',
  }

  // Different sizing strategy for text vs numeric/icon badges
  const sizes = {
    xs:
      type === 'dot' ? 'h-1.5 w-1.5' : isText ? 'h-3 px-1.5 min-w-3 text-caption-m' : 'h-3 w-3 min-w-3 text-caption-m',
    small: type === 'dot' ? 'h-2 w-2' : isText ? 'h-4 px-2 min-w-4 text-caption-m' : 'h-4 w-4 min-w-4 text-caption-m',
    medium:
      type === 'dot' ? 'h-3 w-3' : isText ? 'h-5 px-2.5 min-w-5 text-caption-m' : 'h-5 w-5 min-w-5 text-caption-m',
    large: type === 'dot' ? 'h-4 w-4' : isText ? 'h-6 px-3 min-w-6 text-caption-m' : 'h-6 w-6 min-w-6 text-caption-m',
  }

  // Use rounded corners for text, full circle for numbers/icons
  const shape = type === 'dot' || !isText ? 'rounded-full' : 'rounded-lg'

  return composeClasses(base, variants[variant], sizes[size], shape, className)
}

/**
 * List item style composer that matches the original ListItem component design exactly
 */
export function createListItemStyles(options: {
  compact?: boolean
  interactive?: boolean
  disabled?: boolean
  className?: string
}): string {
  const { compact = false, interactive = false, disabled = false, className = '' } = options

  const base = 'flex items-center gap-3 px-4 bg-background transition-colors duration-200'
  const padding = compact ? 'py-2' : 'py-3'
  const width = 'w-full text-left'
  const interactiveStyle = interactive && !disabled ? 'cursor-pointer hover:bg-surface' : ''
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

  return composeClasses(base, padding, width, interactiveStyle, disabledStyles, className)
}

/**
 * Tag style composer that matches the original Tag component design exactly
 */
export function createTagStyles(options: {
  variant: 'primary' | 'secondary' | 'tertiary'
  interactive?: boolean
  disabled?: boolean
  className?: string
}): string {
  const { variant, interactive = false, disabled = false, className = '' } = options

  const base = 'inline-flex items-center gap-1.5 font-medium transition-all duration-200 rounded-full uppercase'

  const variants = {
    primary: 'bg-highlight text-white',
    secondary: 'bg-transparent border border-highlight text-highlight',
    tertiary: 'bg-highlight-light text-highlight',
  }

  const sizes = 'h-6 px-3 text-caption-m tracking-wider'

  const interactiveStyles = interactive && !disabled ? 'cursor-pointer hover:opacity-80' : ''
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

  return composeClasses(base, variants[variant], sizes, interactiveStyles, disabledStyles, className)
}

/**
 * Divider style composer that matches the original Divider component design exactly
 */
export function createDividerStyles(options: {
  orientation: 'horizontal' | 'vertical'
  variant: 'solid' | 'dashed' | 'dotted'
  spacing: 'none' | 'small' | 'medium' | 'large'
  className?: string
}): string {
  const { orientation, variant, spacing, className = '' } = options

  const base = 'border-neutral-300'

  const orientations = {
    horizontal: 'w-full border-t',
    vertical: 'h-full border-l',
  }

  const variants = {
    solid: '',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  }

  const spacings = {
    none: '',
    small: orientation === 'horizontal' ? 'my-2' : 'mx-2',
    medium: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    large: orientation === 'horizontal' ? 'my-6' : 'mx-6',
  }

  return composeClasses(base, orientations[orientation], variants[variant], spacings[spacing], className)
}

/**
 * Standard navigation item style composer
 */
export const createNavItemStyles = createStyleComposer({
  base: 'flex items-center gap-3 font-medium transition-all duration-200 cursor-pointer',
  variants: {
    default: 'text-neutral-600 hover:text-highlight hover:bg-highlight-50',
    active: 'text-highlight bg-highlight-100',
    disabled: 'text-neutral-400 cursor-not-allowed',
  },
  sizes: {
    small: 'px-3 py-2 text-body-s rounded-lg',
    medium: 'px-4 py-3 text-body-m rounded-xl',
    large: 'px-5 py-4 text-body-l rounded-xl',
  },
})

/**
 * Utility for conditional classes
 * Useful for inline conditional styling
 */
export function conditionalClass(condition: boolean, trueClass: string, falseClass: string = ''): string {
  return condition ? trueClass : falseClass
}

/**
 * Utility for focus ring classes
 * Standardizes focus styling across components
 */
export function focusRing(color: 'highlight' | 'error' | 'success' | 'warning' = 'highlight'): string {
  const colors = {
    highlight: 'focus:ring-2 focus:ring-highlight-100 focus:border-highlight',
    error: 'focus:ring-2 focus:ring-error-400/20 focus:border-error-400',
    success: 'focus:ring-2 focus:ring-success-100 focus:border-success-400',
    warning: 'focus:ring-2 focus:ring-warning-100 focus:border-warning-400',
  }
  return colors[color]
}

/**
 * Utility for transition classes
 * Standardizes transitions across components
 */
export function transition(type: 'colors' | 'transform' | 'all' | 'opacity' = 'all'): string {
  const transitions = {
    colors: 'transition-colors duration-200 ease-in-out',
    transform: 'transition-transform duration-200 ease-in-out',
    all: 'transition-all duration-200 ease-in-out',
    opacity: 'transition-opacity duration-200 ease-in-out',
  }
  return transitions[type]
}

/**
 * Utility for disabled states
 * Standardizes disabled styling across components
 */
export function disabledState(): string {
  return 'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400'
}

/**
 * Utility for interactive states
 * Standardizes hover/active states across components
 */
export function interactiveState(): string {
  return 'cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all duration-150'
}

/**
 * Media container style composer for Image and Video components
 * Updated to match original Image/Video component designs exactly
 */
export function createMediaContainerStyles(options: {
  aspectRatio: 'square' | '16:9' | '4:3' | '3:2' | 'auto'
  rounded: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  className?: string
}): string {
  const { aspectRatio, rounded, className = '' } = options

  const base = 'relative overflow-hidden bg-highlight-50'

  const aspectRatios = {
    square: 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '3:2': 'aspect-[3/2]',
    auto: '',
  }

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  }

  return composeClasses(base, aspectRatios[aspectRatio], roundedClasses[rounded], className)
}

/**
 * Image style composer that matches the original Image component design exactly
 */
export function createImageStyles(options: {
  fit: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
  loading: boolean
  hasSize?: boolean
}): string {
  const { fit, loading, hasSize = false } = options

  const base = 'transition-opacity duration-300'

  const fitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    'scale-down': 'object-scale-down',
    none: 'object-none',
  }

  const sizeClasses = hasSize ? '' : 'w-full h-full'
  const opacityClass = !loading ? 'opacity-100' : 'opacity-0'

  return composeClasses(base, fitClasses[fit], sizeClasses, opacityClass)
}

/**
 * Video style composer that matches the original Video component design exactly
 */
export function createVideoStyles(options: { loading: boolean }): string {
  const { loading } = options

  const base = 'w-full h-full object-cover transition-opacity duration-300'
  const opacityClass = !loading ? 'opacity-100' : 'opacity-0'

  return composeClasses(base, opacityClass)
}

/**
 * Standard checkbox style composer
 */
export const createCheckboxStyles = createStyleComposer({
  base: 'relative inline-flex items-center justify-center cursor-pointer transition-all duration-200',
  variants: {
    unchecked: 'bg-surface border-2 border-neutral-300 hover:border-neutral-400',
    checked: 'bg-highlight border-2 border-highlight',
  },
  sizes: {
    small: 'h-4 w-4 rounded',
    medium: 'h-6 w-6 rounded-md',
    large: 'h-8 w-8 rounded-lg',
  },
})

/**
 * Standard toggle/switch style composer
 * Updated to match Toggle component's original design
 */
export const createToggleStyles = createStyleComposer({
  base: 'relative inline-flex items-center cursor-pointer transition-all duration-200 rounded-full',
  variants: {
    unchecked: 'bg-neutral-300',
    checked: 'bg-highlight',
  },
  sizes: {
    xs: 'h-4 w-7',
    small: 'h-5 w-9',
    medium: 'h-7 w-12',
    large: 'h-8 w-14',
  },
})

/**
 * Standard radio button style composer
 * Updated to match RadioButton component's original design
 */
export const createRadioStyles = createStyleComposer({
  base: 'relative inline-flex items-center justify-center cursor-pointer transition-all duration-200 rounded-full',
  variants: {
    unchecked: 'bg-surface border-2 border-neutral-300 hover:border-neutral-400',
    checked: 'bg-highlight border-2 border-highlight',
  },
  sizes: {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8',
  },
})

/**
 * Banner style composer for informative banner components
 * Provides consistent styling for informational banners with different variants
 */
export function createBannerStyles(options: {
  variant: 'default' | 'info' | 'success' | 'warning' | 'error'
  disabled?: boolean
  clickable?: boolean
  className?: string
}): string {
  const { variant, disabled = false, clickable = false, className = '' } = options

  const base = 'flex items-start gap-4 p-5 rounded-2xl transition-all duration-200'

  const variants = {
    default: 'bg-neutral-50 border border-neutral-200',
    info: 'bg-highlight-50 border border-highlight-200',
    success: 'bg-success-50 border border-success-200',
    warning: 'bg-warning-50 border border-warning-200',
    error: 'bg-error-50 border border-error-200',
  }

  const clickableStyles = clickable && !disabled ? 'cursor-pointer hover:shadow-md active:scale-[0.99]' : ''
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

  return composeClasses(base, variants[variant], clickableStyles, disabledStyles, className)
}

/**
 * Toast style composer for notification/feedback toasts
 * Provides consistent styling for informational toasts with different variants
 */
export function createToastStyles(options: {
  variant: 'info' | 'success' | 'warning' | 'error'
  dismissible?: boolean
  showBorder?: boolean
  singleLine?: boolean
  className?: string
}): string {
  const { variant, dismissible = true, showBorder = false, singleLine = false, className = '' } = options

  const alignment = singleLine ? 'items-center' : 'items-start'
  const base = `flex ${alignment} gap-3 p-4 rounded-xl transition-all duration-300`

  const variants = {
    info: showBorder ? 'bg-highlight-50 border border-highlight-200' : 'bg-highlight-50',
    success: showBorder ? 'bg-success-50 border border-success-200' : 'bg-success-50',
    warning: showBorder ? 'bg-warning-50 border border-warning-200' : 'bg-warning-50',
    error: showBorder ? 'bg-error-50 border border-error-200' : 'bg-error-50',
  }

  const dismissibleStyles = dismissible ? 'cursor-default' : ''

  return composeClasses(base, variants[variant], dismissibleStyles, className)
}

/**
 * Progress Bar style composer for progress indication components
 * Provides consistent styling for progress bars with different variants
 */
export function createProgressBarStyles(options: {
  size: 'small' | 'medium' | 'large'
  color: 'primary' | 'success' | 'warning' | 'error'
  animated?: boolean
  disabled?: boolean
  className?: string
}): {
  container: string
  label: string
  track: string
  fill: string
} {
  const { size, color, animated = true, disabled = false, className = '' } = options

  // Container styles
  const containerBase = 'flex flex-col gap-2 w-full'
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''
  const container = composeClasses(containerBase, disabledStyles, className)

  // Label styles
  const label = 'text-body-s text-neutral-700 font-medium'

  // Track styles
  const trackBase = 'relative bg-neutral-200 overflow-hidden'
  const trackSizes = {
    small: 'h-1.5 rounded-full',
    medium: 'h-2.5 rounded-full',
    large: 'h-4 rounded-lg',
  }
  const track = composeClasses(trackBase, trackSizes[size])

  // Fill styles
  const fillBase = 'h-full'
  const fillColors = {
    primary: 'bg-highlight',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  }
  const animatedClass = animated ? 'transition-all duration-300 ease-out' : ''
  const fill = composeClasses(fillBase, fillColors[color], animatedClass)

  return {
    container,
    label,
    track,
    fill,
  }
}

/**
 * Dialog style composer for modal dialog components
 * Provides consistent styling for modal dialogs with backdrop and content areas
 */
export function createDialogStyles(options: { disabled?: boolean; className?: string }): {
  backdrop: string
  container: string
  closeButton: string
  content: string
  title: string
  description: string
  actions: string
} {
  const { disabled = false, className = '' } = options

  // Backdrop/overlay styles
  const backdrop = 'fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50 backdrop-blur-sm'

  // Dialog container styles
  const containerBase =
    'relative bg-background border border-neutral-200 rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-hidden'
  const disabledStyles = disabled ? 'opacity-50' : ''
  const container = composeClasses(containerBase, disabledStyles, className)

  // Close button styles
  const closeButton =
    'absolute top-2 right-2 p-1 text-neutral-500 hover:text-neutral-700 transition-colors duration-200'

  // Content area styles
  const content = 'p-6 pr-12'

  // Title styles
  const title = 'text-h3 font-semibold text-neutral-900 mb-3'

  // Description styles
  const description = 'text-body-m text-neutral-700 leading-relaxed'

  // Actions/buttons area styles
  const actions = 'flex gap-3 p-6 pt-0 border-neutral-100'

  return {
    backdrop,
    container,
    closeButton,
    content,
    title,
    description,
    actions,
  }
}

/**
 * Loader style composer for loading indicator components
 * Provides consistent styling for circular progress and spinner loaders
 */
export function createLoaderStyles(options: {
  variant: 'progress' | 'spinner'
  size: 'small' | 'medium' | 'large'
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  speed: 'slow' | 'normal' | 'fast'
  disabled?: boolean
  className?: string
}): {
  container: string
  svg: string
  background: string
  foreground: string
  progressText: string
  label: string
  spinAnimation: string
} {
  const { variant, size, color, speed, disabled = false, className = '' } = options

  // Container styles
  const containerBase = 'relative inline-flex flex-col items-center justify-center gap-2'
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''
  const container = composeClasses(containerBase, disabledStyles, className)

  // SVG size styles
  const svgSizes = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
  }
  const svg = svgSizes[size]

  // Background circle styles
  const background = 'stroke-neutral-200'

  // Foreground circle styles - colors and animations
  const colorStyles = {
    primary: 'stroke-highlight',
    secondary: 'stroke-neutral-600',
    success: 'stroke-success',
    warning: 'stroke-warning',
    error: 'stroke-error',
  }

  const progressStyles = variant === 'progress' ? 'transition-all duration-300 ease-out' : ''
  const foreground = composeClasses(colorStyles[color], progressStyles)

  // Progress text styles
  const progressTextSizes = {
    small: 'text-[8px]',
    medium: 'text-action-s',
    large: 'text-action-m',
  }
  const progressText = composeClasses(
    'absolute top-0 left-0 w-full h-full flex items-center justify-center font-medium text-neutral-700 pointer-events-none',
    progressTextSizes[size]
  )

  // Label styles
  const label = 'text-body-s text-neutral-600 font-medium'

  // Spinner animation speeds
  const animationSpeeds = {
    slow: 'spin 2s linear infinite',
    normal: 'spin 1.5s linear infinite',
    fast: 'spin 1s linear infinite',
  }
  const spinAnimation = variant === 'spinner' ? animationSpeeds[speed] : ''

  return {
    container,
    svg,
    background,
    foreground,
    progressText,
    label,
    spinAnimation,
  }
}

/**
 * IconButton style composer for icon-only button components
 * Provides consistent styling for different icon button variants, colors, and sizes
 */
export function createIconButtonStyles(options: {
  variant?: 'ghost' | 'outlined' | 'filled'
  color?: 'default' | 'neutral' | 'success' | 'warning' | 'error'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  className?: string
}): string {
  const { variant = 'ghost', color = 'default', size = 'medium', disabled = false, className = '' } = options

  const base =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none cursor-pointer'

  // Color-specific styles for different variants
  const colorVariants = {
    default: {
      ghost: 'hover:bg-highlight-50',
      outlined: 'border border-highlight hover:border-highlight-600 hover:bg-highlight-50',
      filled: 'text-white bg-highlight hover:bg-highlight-600',
    },
    neutral: {
      ghost: 'hover:bg-neutral-100',
      outlined: 'border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50',
      filled: 'text-white bg-neutral-600 hover:bg-neutral-700',
    },
    success: {
      ghost: 'hover:bg-success-50',
      outlined: 'border border-success hover:border-success-400 hover:bg-success-50',
      filled: 'text-white bg-success hover:bg-success-400',
    },
    warning: {
      ghost: 'hover:bg-warning-50',
      outlined: 'border border-warning hover:border-warning-400 hover:bg-warning-50',
      filled: 'text-white bg-warning hover:bg-warning-400',
    },
    error: {
      ghost: 'hover:bg-error-50',
      outlined: 'border border-error hover:border-error-400 hover:bg-error-50',
      filled: 'text-white bg-error hover:bg-error-400',
    },
  }

  const sizes = {
    small: 'h-8 w-8 rounded-lg',
    medium: 'h-10 w-10 rounded-xl',
    large: 'h-12 w-12 rounded-xl',
  }

  const disabledStyles = disabled ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''

  return composeClasses(base, colorVariants[color][variant], sizes[size], disabledStyles, className)
}

/**
 * NumberInput button style composer for increment/decrement buttons
 * Provides consistent styling for button variants and layouts
 */
export function createNumberInputButtonStyles(options: {
  layout: 'stacked' | 'horizontal' | 'split'
  position?: 'increment' | 'decrement' | 'left' | 'right'
  disabled?: boolean
  className?: string
}): string {
  const { layout, position, disabled = false, className = '' } = options

  const base =
    'flex items-center justify-center border-2 border-transparent text-neutral-600 transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-800 disabled:cursor-not-allowed disabled:text-neutral-400 disabled:hover:bg-transparent disabled:hover:text-neutral-400'

  const sizes = {
    stacked: 'h-4 w-8',
    horizontal: 'h-8 w-8',
    split: 'h-8 w-8',
  }

  const roundings = {
    stacked: position === 'increment' ? 'rounded-t-lg' : 'rounded-b-lg',
    horizontal: 'rounded-lg',
    split: 'rounded-lg',
  }

  const positioning = {
    stacked: '',
    horizontal: position === 'decrement' ? '' : 'ml-1',
    split:
      position === 'decrement'
        ? 'absolute top-1/2 left-1 -translate-y-1/2'
        : 'absolute top-1/2 right-1 -translate-y-1/2',
  }

  const disabledStyles = disabled ? 'cursor-not-allowed opacity-50' : ''

  return composeClasses(base, sizes[layout], roundings[layout], positioning[layout], disabledStyles, className)
}

/**
 * Slider style composer for custom slider components
 * Provides consistent styling for track, fill, and thumb elements
 */
export function createSliderStyles(options: { focused?: boolean; disabled?: boolean; className?: string }): {
  track: string
  fill: string
  thumb: string
} {
  const { focused = false, disabled = false, className = '' } = options

  // Track styles
  const trackBase = 'relative h-2 bg-neutral-200 rounded-full'
  const trackState = disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
  const track = composeClasses(trackBase, trackState, className)

  // Fill styles (progress bar)
  const fillBase = 'absolute top-0 left-0 h-full bg-highlight rounded-full'
  const fill = fillBase

  // Thumb styles (draggable handle)
  const thumbBase =
    'absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-6 border-white shadow-[0_0_8px_rgba(0,0,0,0.15)]'
  const thumbColor = disabled ? 'bg-neutral-300' : 'bg-highlight'
  const thumbFocus = focused ? '' : ''
  const thumbHover = !disabled ? 'hover:scale-110' : ''
  const thumbState = disabled ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'
  const thumb = composeClasses(thumbBase, thumbColor, thumbFocus, thumbHover, thumbState)

  return {
    track,
    fill,
    thumb,
  }
}

/**
 * ActionSheet style composer for modal action sheet components
 * Provides consistent styling for overlay, positioning, and animations
 */
export function createActionSheetStyles(options: {
  open: boolean
  position: 'bottom' | 'top'
  animationSpeed: 'slow' | 'normal' | 'fast'
  disabled?: boolean
  className?: string
}): {
  backdrop: string
  container: string
  header: string
  title: string
  content: string
} {
  const { open, position, animationSpeed, disabled = false, className = '' } = options

  // Animation duration mapping
  const animationDurations = {
    slow: 'duration-500',
    normal: 'duration-300',
    fast: 'duration-200',
  }

  // Backdrop styles
  const backdrop = composeClasses(
    'fixed inset-0 z-50 flex items-end justify-center bg-black/50 transition-opacity',
    animationDurations[animationSpeed],
    open ? 'opacity-100' : 'opacity-0 pointer-events-none',
    position === 'top' ? 'items-start' : 'items-end',
    disabled && 'pointer-events-none'
  )

  // Container styles with position-based transforms
  const positionStyles = {
    bottom: open ? 'translate-y-0' : 'translate-y-full',
    top: open ? 'translate-y-0' : '-translate-y-full',
  }

  const container = composeClasses(
    'w-full max-w-md transform rounded-t-2xl bg-background shadow-xl transition-transform',
    position === 'top' ? 'rounded-t-none rounded-b-2xl' : '',
    animationDurations[animationSpeed],
    positionStyles[position],
    disabled && 'opacity-50',
    className
  )

  // Header styles
  const header = 'flex items-center justify-between border-b border-default px-6 py-4'

  // Title styles
  const title = 'text-heading-s font-semibold text-primary'

  // Content styles
  const content = 'p-4'

  return {
    backdrop,
    container,
    header,
    title,
    content,
  }
}

/**
 * Star Rating style composer for rating input components
 * Provides consistent styling for star rating container with different sizes and states
 */
export const createStarRatingStyles = createStyleComposer({
  base: 'inline-flex items-center',
  variants: {
    default: '',
    focused: 'ring-2 ring-highlight-200 ring-offset-2 rounded-lg',
  },
  sizes: {
    xs: 'gap-0.5',
    small: 'gap-0.5',
    medium: 'gap-1',
    large: 'gap-1.5',
  },
})

/**
 * Tooltip style composer
 */
export const createTooltipStyles = createStyleComposer({
  base: 'absolute z-50 bg-neutral-800 text-neutral-50 shadow-lg pointer-events-none transition-opacity duration-200',
  variants: {
    visible: 'opacity-100',
    hidden: 'opacity-0',
  },
  sizes: {
    auto: 'p-3 whitespace-nowrap rounded-lg',
    small: 'p-3.5 max-w-xs min-w-28 rounded-xl',
    medium: 'p-4 max-w-sm min-w-36 rounded-xl',
    large: 'p-4.5 max-w-md min-w-48 rounded-2xl',
  },
})

/**
 * LocationPin style composer for location pin and current location indicators
 * Provides consistent styling for different variants and sizes with optional pulse animations
 */
export function createLocationPinStyles(options: {
  variant: 'pin' | 'current'
  size: 'small' | 'medium' | 'large'
  interactive?: boolean
  disabled?: boolean
  pulse?: boolean
  className?: string
}): string {
  const { variant, size, interactive = false, disabled = false, pulse = false, className = '' } = options

  const base = 'relative inline-flex items-center justify-center text-highlight transition-all duration-200'

  const variants = {
    pin: 'cursor-default',
    current: 'cursor-default rounded-full',
  }

  const sizes = {
    small: variant === 'pin' ? 'h-6 w-6' : 'h-8 w-8',
    medium: variant === 'pin' ? 'h-8 w-8' : 'h-10 w-10',
    large: variant === 'pin' ? 'h-10 w-10' : 'h-13 w-13',
  }

  // Interactive styles
  const interactiveStyles = interactive && !disabled ? 'cursor-pointer hover:scale-110 active:scale-95' : ''

  // Disabled styles
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

  // Pulse animation for current location variant
  const pulseStyles = pulse && variant === 'current' ? 'animate-ping scale-70' : ''

  // Current location specific styling - use border instead of background for ring effect
  const borderWidths = {
    small: 'border-8',
    medium: 'border-10',
    large: 'border-14',
  }
  const currentStyles = variant === 'current' ? `${borderWidths[size]} border-highlight-50` : ''

  return composeClasses(
    base,
    variants[variant],
    sizes[size],
    interactiveStyles,
    disabledStyles,
    pulseStyles,
    currentStyles,
    className
  )
}

/**
 * LocationPin current location inner dot styles
 * Provides consistent styling for the inner solid dot of current location indicators
 */
export function createLocationPinInnerDotStyles(size: 'small' | 'medium' | 'large'): string {
  const base = 'rounded-full bg-current'

  const sizes = {
    small: 'h-2 w-2',
    medium: 'h-2.75 w-2.75',
    large: 'h-3 w-3',
  }

  return composeClasses(base, sizes[size])
}

/**
 * LocationPin current location outer ring styles for pulse animation
 * Provides consistent styling for the outer pulsing ring of current location indicators
 */
export function createLocationPinOuterRingStyles(size: 'small' | 'medium' | 'large'): string {
  const base = 'absolute rounded-full animate-ping'

  const sizes = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8',
  }

  return composeClasses(base, sizes[size])
}

/**
 * LocationPin current location outer circle styles (static border)
 * Provides consistent styling for the outer circle border of current location indicators
 */
export function createLocationPinOuterCircleStyles(size: 'small' | 'medium' | 'large'): string {
  const base = 'absolute rounded-full border-2'

  const sizes = {
    small: 'h-5 w-5',
    medium: 'h-6 w-6',
    large: 'h-8 w-8',
  }

  return composeClasses(base, sizes[size])
}

/**
 * Container style composer for generic container components
 * Provides consistent styling for simple containers without the complexity of Card
 */
export function createContainerStyles(options: {
  variant: 'default' | 'elevated' | 'bordered'
  padding: 'none' | 'tight' | 'normal' | 'comfortable' | 'spacious'
  radius: 'none' | 'small' | 'normal' | 'large'
  background?: boolean
  color?: 'neutral' | 'highlight' | 'success' | 'warning' | 'error'
  fullWidth?: boolean
  disabled?: boolean
  minHeight?: 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl' | 'preview'
  height?: 'auto' | 'full' | 'screen' | 'xs' | 'small' | 'medium' | 'large' | 'xl'
  minWidth?: 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl'
  width?: 'auto' | 'full'
  className?: string
}): string {
  const {
    variant,
    padding,
    radius,
    background = false,
    color = 'neutral',
    fullWidth = false,
    disabled = false,
    minHeight,
    height,
    minWidth,
    width,
    className = '',
  } = options

  const base = 'block transition-all duration-200'

  // Color-based styles for backgrounds and borders
  const colorStyles = {
    neutral: {
      background: 'bg-surface',
      border: 'border-default',
      coloredBackground: 'bg-neutral-50',
      coloredBorder: 'border-neutral-300',
    },
    highlight: {
      background: 'bg-highlight-50',
      border: 'border-highlight',
      coloredBackground: 'bg-highlight-50',
      coloredBorder: 'border-highlight-200',
    },
    success: {
      background: 'bg-success-50',
      border: 'border-success',
      coloredBackground: 'bg-success-50',
      coloredBorder: 'border-success-200',
    },
    warning: {
      background: 'bg-warning-50',
      border: 'border-warning',
      coloredBackground: 'bg-warning-50',
      coloredBorder: 'border-warning-200',
    },
    error: {
      background: 'bg-error-50',
      border: 'border-error',
      coloredBackground: 'bg-error-50',
      coloredBorder: 'border-error-200',
    },
  }

  const variants = {
    default: (() => {
      if (color === 'neutral') {
        return background ? colorStyles.neutral.background : ''
      } else {
        return colorStyles[color].coloredBackground
      }
    })(),
    elevated: (() => {
      if (color === 'neutral') {
        return 'bg-surface-elevated shadow-[0_0_8px_rgba(0,0,0,0.1)]'
      } else {
        return `${colorStyles[color].coloredBackground} shadow-[0_0_8px_rgba(0,0,0,0.1)]`
      }
    })(),
    bordered: (() => {
      if (color === 'neutral') {
        const bgClass = background ? colorStyles.neutral.background : ''
        const borderClass = colorStyles.neutral.border
        return `${bgClass} border ${borderClass}`.trim()
      } else {
        const bgClass = colorStyles[color].coloredBackground
        const borderClass = colorStyles[color].coloredBorder
        return `${bgClass} border ${borderClass}`
      }
    })(),
  }

  const paddings = {
    none: '',
    tight: 'p-2',
    normal: 'p-4',
    comfortable: 'p-6',
    spacious: 'p-8',
  }

  const radiuses = {
    none: '',
    small: 'rounded-lg',
    normal: 'rounded-xl',
    large: 'rounded-2xl',
  }

  const minHeights = {
    xs: 'min-h-16', // 4rem = 64px
    small: 'min-h-24', // 6rem = 96px
    medium: 'min-h-32', // 8rem = 128px
    large: 'min-h-48', // 12rem = 192px
    xl: 'min-h-64', // 16rem = 256px
    xxl: 'min-h-80', // 20rem = 320px
    preview: 'min-h-[20rem]', // 20rem = 320px for preview containers
  }

  const heights = {
    auto: 'h-auto',
    full: 'h-full',
    screen: 'h-screen',
    xs: 'h-16', // 4rem = 64px
    small: 'h-24', // 6rem = 96px
    medium: 'h-32', // 8rem = 128px
    large: 'h-48', // 12rem = 192px
    xl: 'h-64', // 16rem = 256px
  }

  const minWidths = {
    xs: 'min-w-16', // 4rem = 64px
    small: 'min-w-24', // 6rem = 96px
    medium: 'min-w-32', // 8rem = 128px
    large: 'min-w-48', // 12rem = 192px
    xl: 'min-w-64', // 16rem = 256px
    xxl: 'min-w-80', // 20rem = 320px
  }

  const widths = {
    auto: 'w-auto',
    full: 'w-full',
  }

  const fullWidthClass = fullWidth ? 'w-full' : ''
  const minHeightClass = minHeight ? minHeights[minHeight] : ''
  const heightClass = height ? heights[height] : ''
  const minWidthClass = minWidth ? minWidths[minWidth] : ''
  const widthClass = width ? widths[width] : ''
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

  return composeClasses(
    base,
    variants[variant],
    paddings[padding],
    radiuses[radius],
    fullWidthClass,
    minHeightClass,
    heightClass,
    minWidthClass,
    widthClass,
    disabledStyles,
    className
  )
}
