/**
 * Component composition and rendering utilities
 * 
 * These utilities simplify common rendering patterns and conditional logic
 * used throughout components, making templates cleaner and more readable.
 */

/**
 * Conditionally render content based on a boolean condition
 * Useful for complex conditional rendering logic
 */
export function renderIf<T>(condition: boolean, content: T): T | null {
  return condition ? content : null
}

/**
 * Render content with a fallback if the primary content is falsy
 * Useful for optional content with defaults
 */
export function renderWithFallback<T>(primary: T | null | undefined, fallback: T): T {
  return primary || fallback
}

/**
 * Render content only if all conditions are true
 * Useful for complex conditional rendering
 */
export function renderIfAll(conditions: boolean[], content: any): any {
  return conditions.every(Boolean) ? content : null
}

/**
 * Render content if any condition is true
 * Useful for OR-based conditional rendering
 */
export function renderIfAny(conditions: boolean[], content: any): any {
  return conditions.some(Boolean) ? content : null
}

/**
 * Choose between multiple rendering options based on a value
 * Useful for switch-like rendering logic
 */
export function renderSwitch<T extends string | number, R>(
  value: T,
  options: Record<T, R>,
  fallback?: R
): R | null {
  return options[value] || fallback || null
}

/**
 * Utilities for icon rendering patterns
 */
export const IconRenderer = {
  /**
   * Check if an icon should be rendered
   */
  shouldRender(icon: any, showIcon: boolean = true): boolean {
    return showIcon && icon !== undefined && icon !== null && icon !== ''
  },

  /**
   * Determine if icon is a string (emoji) or component
   */
  isStringIcon(icon: any): icon is string {
    return typeof icon === 'string'
  },

  /**
   * Render an icon with fallback logic
   */
  render(icon: any, fallback?: any): any {
    if (!icon) return fallback || null
    return icon
  },

  /**
   * Get appropriate CSS classes for icon positioning
   */
  getPositionClasses(position: 'left' | 'right', hasIcon: boolean): string {
    if (!hasIcon) return ''
    
    const classes = {
      left: 'pl-10',
      right: 'pr-10'
    }
    
    return classes[position] || ''
  }
}

/**
 * Utilities for form field rendering patterns
 */
export const FormRenderer = {
  /**
   * Determine if a label should be shown
   */
  shouldShowLabel(label?: string, showLabel: boolean = true): boolean {
    return showLabel && Boolean(label)
  },

  /**
   * Determine if helper text should be shown
   */
  shouldShowHelperText(helperText?: string, showHelperText: boolean = true): boolean {
    return showHelperText && Boolean(helperText)
  },

  /**
   * Determine if error should be shown
   */
  shouldShowError(error?: string): boolean {
    return Boolean(error)
  },

  /**
   * Get the appropriate input state for styling
   */
  getInputState(focused: boolean, error?: string, disabled: boolean = false): 'default' | 'focused' | 'error' | 'disabled' {
    if (disabled) return 'disabled'
    if (error) return 'error'
    if (focused) return 'focused'
    return 'default'
  }
}

/**
 * Utilities for avatar rendering patterns
 */
export const AvatarRenderer = {
  /**
   * Generate initials from a name
   * Updated to handle edge cases properly
   */
  getInitials(name?: string): string {
    if (!name || name.trim() === '') return ''
    
    return name
      .trim()
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  },

  /**
   * Determine what to render based on available props
   */
  getRenderType(src?: string, name?: string): 'image' | 'initials' | 'placeholder' {
    if (src) return 'image'
    if (name) return 'initials'
    return 'placeholder'
  },

  /**
   * Get status indicator classes
   * Updated to match Avatar component's original design
   */
  getStatusClasses(status?: 'online' | 'offline' | 'away' | 'busy', size: 'xs' | 'small' | 'medium' | 'large' = 'medium'): string {
    if (!status) return ''
    
    const baseClasses = 'absolute rounded-full border-2 border-white'
    const statusColors = {
      online: 'bg-success',
      offline: 'bg-neutral',
      away: 'bg-warning',
      busy: 'bg-error'
    }
    
    const sizeClasses = {
      xs: 'h-2.5 w-2.5 -bottom-0.5 -right-0.5',
      small: 'h-3 w-3 -bottom-0.5 -right-0.5',
      medium: 'h-3.5 w-3.5 -bottom-1 -right-1',
      large: 'h-4 w-4 -bottom-0.5 -right-0.5'
    }
    
    return `${baseClasses} ${statusColors[status]} ${sizeClasses[size]}`
  }
}

/**
 * Utilities for list rendering patterns
 */
export const ListRenderer = {
  /**
   * Determine if a divider should be shown
   */
  shouldShowDivider(index: number, total: number, showDividers: boolean = true): boolean {
    return showDividers && index < total - 1
  },

  /**
   * Get list item classes based on position
   */
  getItemClasses(index: number, total: number, variant: 'default' | 'compact' = 'default'): string {
    const baseClasses = variant === 'compact' ? 'py-2 px-3' : 'py-3 px-4'
    const positionClasses: string[] = []
    
    if (index === 0) positionClasses.push('rounded-t-xl')
    if (index === total - 1) positionClasses.push('rounded-b-xl')
    
    return `${baseClasses} ${positionClasses.join(' ')}`
  }
}

/**
 * Utilities for badge rendering patterns
 */
export const BadgeRenderer = {
  /**
   * Format badge number with max value
   */
  formatNumber(value: number, max: number = 99): string {
    return value > max ? `${max}+` : value.toString()
  },

  /**
   * Determine badge type from props
   */
  getBadgeType(number?: number, icon?: any, dot: boolean = false): 'number' | 'icon' | 'dot' {
    if (dot) return 'dot'
    if (number !== undefined) return 'number'
    if (icon) return 'icon'
    return 'dot'
  },

  /**
   * Get appropriate size classes for badge content
   * Supports xs, small, medium, and large sizes
   */
  getContentSize(size: 'xs' | 'small' | 'medium' | 'large', type: 'number' | 'icon' | 'dot'): string {
    if (type === 'dot') return ''
    
    const iconSizes = {
      xs: 'h-2 w-2',
      small: 'h-2.5 w-2.5',
      medium: 'h-3 w-3',
      large: 'h-3.5 w-3.5'
    }
    
    return type === 'icon' ? iconSizes[size] : ''
  }
}

/**
 * Utilities for dropdown/select rendering patterns  
 */
export const DropdownRenderer = {
  /**
   * Find selected option from options array
   */
  findSelectedOption<T extends { value: string; label: string }>(
    options: T[],
    selectedValue?: string
  ): T | undefined {
    return options.find(option => option.value === selectedValue)
  },

  /**
   * Get display text for selected option
   */
  getDisplayText<T extends { value: string; label: string }>(
    options: T[],
    selectedValue?: string,
    placeholder: string = 'Select option'
  ): string {
    const selected = this.findSelectedOption(options, selectedValue)
    return selected?.label || placeholder
  },

  /**
   * Determine if dropdown should show as open
   */
  shouldShowOpen(isOpen: boolean, disabled: boolean = false): boolean {
    return isOpen && !disabled
  }
}

/**
 * Utilities for button rendering patterns
 */
export const ButtonRenderer = {
  /**
   * Determine if button should show loading state
   */
  shouldShowLoading(loading: boolean = false, disabled: boolean = false): boolean {
    return loading && !disabled
  },

  /**
   * Get content to render based on loading state
   */
  getContent(loading: boolean, children: any, loadingText?: string): any {
    return loading ? (loadingText || 'Loading...') : children
  },

  /**
   * Determine if button is effectively disabled
   */
  isEffectivelyDisabled(disabled: boolean = false, loading: boolean = false): boolean {
    return disabled || loading
  }
}

/**
 * Utilities for media rendering patterns
 */
export const MediaRenderer = {
  /**
   * Determine aspect ratio classes
   */
  getAspectRatioClasses(aspectRatio?: '1:1' | '16:9' | '4:3' | '3:2'): string {
    const ratios = {
      '1:1': 'aspect-square',
      '16:9': 'aspect-video',
      '4:3': 'aspect-[4/3]',
      '3:2': 'aspect-[3/2]'
    }
    
    return aspectRatio ? ratios[aspectRatio] : ''
  },

  /**
   * Get rounded corner classes
   */
  getRoundedClasses(rounded: boolean | 'small' | 'medium' | 'large' = false): string {
    if (!rounded) return ''
    if (rounded === true) return 'rounded-xl'
    
    const sizes = {
      small: 'rounded-lg',
      medium: 'rounded-xl', 
      large: 'rounded-2xl'
    }
    
    return sizes[rounded] || ''
  }
}

/**
 * Generic utilities for common patterns
 */
export const GenericRenderer = {
  /**
   * Safely render children with null check
   */
  renderChildren(children?: any): any {
    return children || null
  },

  /**
   * Get HTML attributes for spreading
   */
  getRestProps(allProps: Record<string, any>, excludeKeys: string[]): Record<string, any> {
    const restProps: Record<string, any> = {}
    
    Object.keys(allProps).forEach(key => {
      if (!excludeKeys.includes(key)) {
        restProps[key] = allProps[key]
      }
    })
    
    return restProps
  },

  /**
   * Create accessibility attributes
   */
  getA11yProps(options: {
    role?: string
    ariaLabel?: string
    ariaDescribedBy?: string
    ariaPressed?: boolean
    ariaExpanded?: boolean
  }): Record<string, any> {
    const props: Record<string, any> = {}
    
    if (options.role) props.role = options.role
    if (options.ariaLabel) props['aria-label'] = options.ariaLabel
    if (options.ariaDescribedBy) props['aria-describedby'] = options.ariaDescribedBy
    if (options.ariaPressed !== undefined) props['aria-pressed'] = options.ariaPressed
    if (options.ariaExpanded !== undefined) props['aria-expanded'] = options.ariaExpanded
    
    return props
  }
}