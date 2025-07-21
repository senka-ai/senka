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
export function createStyleComposer<
  TVariant extends string = string,
  TSize extends string = string
>(config: {
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
      className
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
    primary: 'border-2 border-transparent hover:bg-highlight-hover bg-highlight text-white disabled:bg-neutral-disabled disabled:text-neutral-disabled',
    secondary: 'bg-transparent border-2 hover:bg-highlight-light text-highlight border-highlight disabled:border-neutral-disabled disabled:text-neutral-light',
    tertiary: 'bg-transparent border-2 border-transparent hover:bg-highlight-light text-highlight disabled:text-neutral-light'
  },
  sizes: {
    xs: 'px-2 py-1 text-action-s rounded-lg',
    small: 'px-3 py-1.5 text-action-s rounded-lg', 
    medium: 'px-4 py-2.75 text-action-m rounded-xl',
    large: 'px-6 py-4 text-action-l rounded-2xl'
  }
})

/**
 * Standard input/form field style composer
 * Updated to match TextField component's original design
 */
export const createInputStyles = createStyleComposer({
  base: 'w-full px-3.25 py-3.25 text-slim-m text-neutral-900 bg-neutral-50 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-offset-0 placeholder:text-neutral-500',
  variants: {
    default: 'border-neutral-400 focus:border-highlight focus:ring-1 focus:ring-highlight-200',
    focused: 'border-highlight ring-1 ring-highlight-400',
    error: 'border-error focus:border-error focus:ring-1 focus:ring-error-100',
    disabled: 'border-neutral-300 bg-neutral-100 text-neutral-500 cursor-not-allowed'
  },
  sizes: {
    small: 'px-2.5 py-2 text-slim-s rounded-lg',
    medium: 'px-3.25 py-3.25 text-slim-m rounded-xl',
    large: 'px-4 py-4 text-slim-l rounded-2xl'
  }
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
    compact: 'rounded-xl'
  }
  
  return composeClasses(base, variants[variant], interactiveStyle, disabledStyles, className)
}

/**
 * Card content style composer for consistent content area styling
 */
export function createCardContentStyles(options: {
  variant: 'default' | 'compact'
}): string {
  const { variant } = options
  
  const base = 'bg-neutral-100 flex-1'
  const padding = variant === 'default' ? 'p-6' : 'p-4'
  
  return composeClasses(base, padding)
}

/**
 * Standard avatar style composer
 */
export const createAvatarStyles = createStyleComposer({
  base: 'relative inline-flex items-center justify-center bg-highlight-50 text-neutral-600 font-medium',
  variants: {
    default: '',
    bordered: 'ring-2 ring-white shadow-sm'
  },
  sizes: {
    xs: 'h-8 w-8 text-body-s rounded-xl',
    small: 'h-10 w-10 text-body-s rounded-2xl',
    medium: 'h-14 w-14 text-body-m rounded-2xl', 
    large: 'h-20 w-20 text-body-l rounded-3xl'
  }
})

/**
 * Badge style composer that handles different badge types
 * Updated to match Badge component's original design exactly
 */
export function createBadgeStyles(options: {
  variant: 'default' | 'success' | 'warning' | 'error'
  size: 'xs' | 'small' | 'medium' | 'large'
  type: 'dot' | 'number' | 'icon'
  className?: string
}): string {
  const { variant, size, type, className = '' } = options
  
  const base = 'inline-flex items-center justify-center font-medium'
  
  const variants = {
    default: 'bg-highlight text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    error: 'bg-error text-white'
  }
  
  const sizes = {
    xs: type === 'dot' ? 'h-1.5 w-1.5' : 'h-3 w-3 min-w-3 text-caption-s',
    small: type === 'dot' ? 'h-2 w-2' : 'h-4 w-4 min-w-4 text-caption-m',
    medium: type === 'dot' ? 'h-3 w-3' : 'h-5 w-5 min-w-5 text-caption-m',
    large: type === 'dot' ? 'h-4 w-4' : 'h-6 w-6 min-w-6 text-caption-m'
  }
  
  const shape = 'rounded-full'
  
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
    tertiary: 'bg-highlight-light text-highlight'
  }
  
  const sizes = 'h-6 px-3 text-medium-xs tracking-wider'
  
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
    vertical: 'h-full border-l'
  }
  
  const variants = {
    solid: '',
    dashed: 'border-dashed',
    dotted: 'border-dotted'
  }
  
  const spacings = {
    none: '',
    small: orientation === 'horizontal' ? 'my-2' : 'mx-2',
    medium: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    large: orientation === 'horizontal' ? 'my-6' : 'mx-6'
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
    disabled: 'text-neutral-400 cursor-not-allowed'
  },
  sizes: {
    small: 'px-3 py-2 text-body-s rounded-lg',
    medium: 'px-4 py-3 text-body-m rounded-xl',
    large: 'px-5 py-4 text-body-l rounded-xl'
  }
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
    error: 'focus:ring-2 focus:ring-error-100 focus:border-error-400',
    success: 'focus:ring-2 focus:ring-success-100 focus:border-success-400',
    warning: 'focus:ring-2 focus:ring-warning-100 focus:border-warning-400'
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
    opacity: 'transition-opacity duration-200 ease-in-out'
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
    auto: ''
  }
  
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full'
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
    none: 'object-none'
  }
  
  const sizeClasses = hasSize ? '' : 'w-full h-full'
  const opacityClass = !loading ? 'opacity-100' : 'opacity-0'
  
  return composeClasses(base, fitClasses[fit], sizeClasses, opacityClass)
}

/**
 * Video style composer that matches the original Video component design exactly
 */
export function createVideoStyles(options: {
  loading: boolean
}): string {
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
    checked: 'bg-highlight border-2 border-highlight'
  },
  sizes: {
    xs: 'h-3 w-3 rounded-sm',
    small: 'h-4 w-4 rounded',
    medium: 'h-6 w-6 rounded-md',
    large: 'h-8 w-8 rounded-lg'
  }
})

/**
 * Standard toggle/switch style composer
 * Updated to match Toggle component's original design
 */
export const createToggleStyles = createStyleComposer({
  base: 'relative inline-flex items-center cursor-pointer transition-all duration-200 rounded-full',
  variants: {
    unchecked: 'bg-neutral-300',
    checked: 'bg-highlight'
  },
  sizes: {
    xs: 'h-4 w-7',
    small: 'h-5 w-9',
    medium: 'h-7 w-12',
    large: 'h-8 w-14'
  }
})

/**
 * Standard radio button style composer
 * Updated to match RadioButton component's original design
 */
export const createRadioStyles = createStyleComposer({
  base: 'relative inline-flex items-center justify-center cursor-pointer transition-all duration-200 rounded-full',
  variants: {
    unchecked: 'bg-surface border-2 border-neutral-300 hover:border-neutral-400',
    checked: 'bg-highlight border-2 border-highlight'
  },
  sizes: {
    xs: 'h-3 w-3',
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8'
  }
})