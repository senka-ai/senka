/**
 * Unified icon rendering utilities
 * Provides consistent patterns for icon handling across components
 */

export type IconType = any // Can be string, component, or snippet

export interface IconRenderOptions {
	icon?: IconType
	size?: number
	className?: string
	defaultSize?: number
}

/**
 * Determines if an icon should be rendered
 */
export function shouldRenderIcon(icon: IconType, showIcon: boolean = true): boolean {
	return showIcon && icon !== undefined && icon !== null && icon !== ''
}

/**
 * Gets the appropriate icon size
 */
export function getIconSize(size?: number, defaultSize: number = 16): number {
	return size ?? defaultSize
}

/**
 * Gets standard icon container classes
 */
export function getIconContainerClasses(position: 'left' | 'right' | 'center' = 'center'): string {
	const base = 'flex items-center justify-center'
	
	const positions = {
		left: 'text-neutral-500',
		right: 'text-neutral-500',
		center: 'text-neutral-500'
	}
	
	return `${base} ${positions[position]}`
}

/**
 * Gets positioning classes for icons within inputs
 */
export function getInputIconClasses(position: 'left' | 'right'): string {
	const base = 'absolute top-1/2 -translate-y-1/2 transform text-neutral-500'
	
	const positions = {
		left: 'left-3.25',
		right: 'right-3.25'
	}
	
	return `${base} ${positions[position]}`
}

/**
 * Gets padding classes for inputs with icons
 */
export function getInputPadding(hasLeftIcon: boolean, hasRightIcon: boolean): string {
	let padding = ''
	
	if (hasLeftIcon) {
		padding += 'pl-10 '
	}
	
	if (hasRightIcon) {
		padding += 'pr-10 '
	}
	
	return padding.trim()
}

/**
 * Standard icon sizes used across the application
 */
export const ICON_SIZES = {
	xs: 12,
	small: 14,
	medium: 16,
	large: 18,
	xl: 20,
	'2xl': 24,
	'3xl': 32
} as const

export type IconSize = keyof typeof ICON_SIZES

/**
 * Gets icon size from size key
 */
export function getIconSizeValue(size: IconSize): number {
	return ICON_SIZES[size]
}

/**
 * Type guard to check if an icon is a string (emoji or text)
 */
export function isStringIcon(icon: IconType): icon is string {
	return typeof icon === 'string'
}

/**
 * Type guard to check if an icon is a component/snippet
 */
export function isComponentIcon(icon: IconType): boolean {
	return typeof icon === 'function' || (typeof icon === 'object' && icon !== null)
}

/**
 * Creates consistent icon rendering logic
 */
export function createIconRenderer(
	icon: IconType,
	options: IconRenderOptions = {}
) {
	const { size = 16, className = '', defaultSize = 16 } = options
	const iconSize = getIconSize(size, defaultSize)
	
	return {
		shouldRender: shouldRenderIcon(icon, true),
		isString: isStringIcon(icon),
		isComponent: isComponentIcon(icon),
		size: iconSize,
		className,
		icon
	}
}