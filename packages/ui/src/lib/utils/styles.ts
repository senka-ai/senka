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

