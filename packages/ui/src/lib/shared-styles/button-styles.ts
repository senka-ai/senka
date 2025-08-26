// packages/ui/src/lib/shared-styles/button-styles.ts
// Unified button styling system - single source of truth for all button variants
// Provides consistent sizing, colors, variants, and spacing across Button, IconButton, and Filter
// RELEVANT FILES: Button.svelte, IconButton.svelte, Filter.svelte, component.ts

/**
 * Unified button configuration - single source of truth
 */
const BUTTON_CONFIG = {
  // Shared size system (heights, paddings, text sizes, icon sizes)
  sizes: {
    xs: {
      height: 'h-6',
      padding: 'px-2 py-1',
      textSize: 'text-action-s',
      borderRadius: 'rounded-lg',
      iconSize: 10,
      iconContainer: 'w-3 h-3 max-h-3',
    },
    small: {
      height: 'h-8',
      padding: 'px-3 py-1.5',
      textSize: 'text-action-s',
      borderRadius: 'rounded-lg',
      iconSize: 12,
      iconContainer: 'w-3 h-3 max-h-3',
    },
    medium: {
      height: 'h-10',
      padding: 'px-4 py-2.75',
      textSize: 'text-action-m',
      borderRadius: 'rounded-xl',
      iconSize: 14,
      iconContainer: 'w-3.5 h-3.5 max-h-3.5',
    },
    large: {
      height: 'h-12',
      padding: 'px-6 py-4',
      textSize: 'text-action-l',
      borderRadius: 'rounded-2xl',
      iconSize: 16,
      iconContainer: 'w-4 h-4 max-h-4',
    },
  },

  // Shared color system
  colors: {
    default: {
      text: 'text-highlight',
      hover: 'hover:bg-highlight-50',
      border: 'border-highlight',
      filled: 'bg-highlight',
      filledText: 'text-white',
      filledHover: 'hover:bg-highlight-600',
    },
    neutral: {
      text: 'text-neutral-600',
      hover: 'hover:bg-neutral-100',
      border: 'border-neutral-300',
      filled: 'bg-neutral-600',
      filledText: 'text-white',
      filledHover: 'hover:bg-neutral-700',
    },
    success: {
      text: 'text-success',
      hover: 'hover:bg-success-50',
      border: 'border-success',
      filled: 'bg-success',
      filledText: 'text-white',
      filledHover: 'hover:bg-success-600',
    },
    warning: {
      text: 'text-warning',
      hover: 'hover:bg-warning-50',
      border: 'border-warning',
      filled: 'bg-warning',
      filledText: 'text-white',
      filledHover: 'hover:bg-warning-600',
    },
    error: {
      text: 'text-error',
      hover: 'hover:bg-error-50',
      border: 'border-error',
      filled: 'bg-error',
      filledText: 'text-white',
      filledHover: 'hover:bg-error-600',
    },
  },

  // Base classes shared by all button types
  base: 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none cursor-pointer',
} as const

/**
 * Unified button style composer for all button types
 * Single source of truth for Button, IconButton, and Filter components
 */
export function createButtonStyles(options: {
  // Button type determines structure but shares same styling system
  buttonType: 'button' | 'icon'

  // Unified variant system supporting all button types
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'outlined' | 'filled'

  // Unified size system
  size?: 'xs' | 'small' | 'medium' | 'large'

  // Unified color system
  color?: 'default' | 'neutral' | 'success' | 'warning' | 'error'

  // Common options
  fullWidth?: boolean
  disabled?: boolean
  className?: string
  modifiers?: Record<string, boolean>

  /** Use thin border styling (for secondary/outlined variants) @default false */
  thinBorder?: boolean
}): string {
  const {
    buttonType,
    variant = 'primary',
    size = 'medium',
    color = 'default',
    fullWidth = false,
    disabled = false,
    className = '',
    modifiers = {},
    thinBorder = false,
  } = options

  const sizeConfig = BUTTON_CONFIG.sizes[size]
  const colorConfig = BUTTON_CONFIG.colors[color]

  // Base classes with gap for text buttons only
  const base = buttonType === 'icon' ? BUTTON_CONFIG.base : `${BUTTON_CONFIG.base} gap-2`

  // Unified variant styles that work for both button types
  const getVariantStyles = () => {
    const borderStyle = thinBorder ? 'border' : 'border-2'

    switch (variant) {
      case 'primary':
        return `${borderStyle} border-transparent ${colorConfig.filled} ${colorConfig.filledText} ${colorConfig.filledHover} disabled:bg-neutral-disabled disabled:text-neutral-disabled`

      case 'secondary':
        if (thinBorder) {
          return `bg-transparent ${borderStyle} border-neutral-400 ${colorConfig.hover} hover:border-highlight ${colorConfig.text} disabled:border-neutral-disabled disabled:text-neutral-light`
        }
        return `bg-transparent ${borderStyle} ${colorConfig.border} ${colorConfig.hover} ${colorConfig.text} disabled:border-neutral-disabled disabled:text-neutral-light`

      case 'tertiary':
        return `bg-transparent ${borderStyle} border-transparent ${colorConfig.hover} ${colorConfig.text} disabled:text-neutral-light`

      case 'ghost':
        return `${colorConfig.text} ${colorConfig.hover}`

      case 'outlined':
        return `${borderStyle} ${colorConfig.border} hover:border-opacity-80 ${colorConfig.hover} ${colorConfig.text}`

      case 'filled':
        return `${colorConfig.filled} ${colorConfig.filledText} ${colorConfig.filledHover}`

      default:
        return ''
    }
  }

  // Size styles based on button type
  const getSizeStyles = () => {
    if (buttonType === 'icon') {
      // Square icon buttons
      return `${sizeConfig.height} ${sizeConfig.height.replace('h-', 'w-')} ${sizeConfig.borderRadius}`
    } else {
      // Regular buttons with padding
      return `${sizeConfig.padding} ${sizeConfig.textSize} ${sizeConfig.borderRadius}`
    }
  }

  const parts: string[] = [
    base,
    getVariantStyles(),
    getSizeStyles(),
    disabled ? 'disabled:opacity-50 disabled:cursor-not-allowed' : '',
    fullWidth ? 'w-full' : '',
    className,
  ]

  // Add conditional modifiers
  Object.entries(modifiers).forEach(([modifier, condition]) => {
    if (condition) parts.push(modifier)
  })

  return parts.filter(Boolean).join(' ')
}

/**
 * Get unified icon size for a given button size
 * Single source of truth for icon sizing across all button types
 */
export function getButtonIconSize(size: 'xs' | 'small' | 'medium' | 'large' = 'medium'): number {
  return BUTTON_CONFIG.sizes[size].iconSize
}

/**
 * Get unified icon container classes for consistent icon sizing
 * Single source of truth for icon containers across all button types
 */
export function getButtonIconContainerClasses(size: 'xs' | 'small' | 'medium' | 'large' = 'medium'): string {
  const sizeConfig = BUTTON_CONFIG.sizes[size]
  return `inline-flex items-center justify-center flex-shrink-0 ${sizeConfig.iconContainer}`
}
