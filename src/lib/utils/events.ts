/**
 * Event handler utilities for consistent event handling across components
 */

export interface KeyboardEventConfig {
	keys: string[]
	preventDefault?: boolean
	stopPropagation?: boolean
	disabled?: boolean
}

/**
 * Creates a standardized keyboard event handler
 */
export function createKeyboardHandler(
	handler: () => void,
	config: KeyboardEventConfig = { keys: ['Enter', ' '], preventDefault: true }
) {
	return (event: KeyboardEvent) => {
		if (config.disabled) return

		if (config.keys.includes(event.key)) {
			if (config.preventDefault) event.preventDefault()
			if (config.stopPropagation) event.stopPropagation()
			handler()
		}
	}
}

/**
 * Creates a click handler with disabled state support
 */
export function createClickHandler(
	handler: () => void,
	disabled?: boolean,
	stopPropagation?: boolean
) {
	return (event?: Event) => {
		if (disabled) return
		if (stopPropagation) event?.stopPropagation()
		handler()
	}
}

/**
 * Creates a safe click handler that prevents action on interactive elements
 * Useful for Card components and other containers with clickable children
 */
export function createSafeClickHandler(handler: () => void, disabled?: boolean) {
	return (event: MouseEvent) => {
		if (disabled) return

		// Prevent action if clicked on interactive elements
		const target = event.target as HTMLElement
		if (isInteractiveElement(target)) {
			return
		}

		handler()
	}
}

/**
 * Common keyboard key sets for different component types
 */
export const KeySets = {
	ACTIVATION: ['Enter', ' '], // Enter and Space for buttons, toggles, etc.
	NAVIGATION: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
	HORIZONTAL_NAVIGATION: ['ArrowLeft', 'ArrowRight'],
	VERTICAL_NAVIGATION: ['ArrowUp', 'ArrowDown'],
	ESCAPE: ['Escape'],
	TAB: ['Tab'],
	FORM_SUBMISSION: ['Enter'],
	SPACE_ONLY: [' '], // For checkboxes, radio buttons
	ENTER_ONLY: ['Enter'] // For form submission
} as const

/**
 * Navigation direction enum for better type safety
 */
export enum NavigationDirection {
	UP = 'up',
	DOWN = 'down',
	LEFT = 'left',
	RIGHT = 'right'
}

/**
 * Interface for navigation handler configuration
 */
export interface NavigationConfig {
	direction: 'horizontal' | 'vertical' | 'both'
	wrap?: boolean
	disabled?: boolean
	preventDefault?: boolean
}

/**
 * Creates a navigation handler for arrow key navigation
 * Useful for TabBar, dropdown menus, and other navigable components
 */
export function createNavigationHandler(
	onNavigate: (direction: NavigationDirection) => void,
	config: NavigationConfig = { direction: 'horizontal', wrap: true, preventDefault: true }
) {
	return (event: KeyboardEvent) => {
		if (config.disabled) return

		const { direction, preventDefault = true } = config
		let handled = false

		// Handle navigation keys based on direction
		if (direction === 'horizontal' || direction === 'both') {
			if (event.key === 'ArrowLeft') {
				onNavigate(NavigationDirection.LEFT)
				handled = true
			} else if (event.key === 'ArrowRight') {
				onNavigate(NavigationDirection.RIGHT)
				handled = true
			}
		}

		if (direction === 'vertical' || direction === 'both') {
			if (event.key === 'ArrowUp') {
				onNavigate(NavigationDirection.UP)
				handled = true
			} else if (event.key === 'ArrowDown') {
				onNavigate(NavigationDirection.DOWN)
				handled = true
			}
		}

		if (handled && preventDefault) {
			event.preventDefault()
		}
	}
}

/**
 * Creates a combined activation and navigation handler
 * Perfect for components like TabBar that need both activation and navigation
 */
export function createActivationNavigationHandler(
	onActivate: () => void,
	onNavigate: (direction: NavigationDirection) => void,
	config: {
		navigationConfig?: NavigationConfig
		activationConfig?: { keys?: string[]; preventDefault?: boolean }
		disabled?: boolean
	} = {}
) {
	const {
		navigationConfig = { direction: 'horizontal', wrap: true, preventDefault: true },
		activationConfig = { keys: [...KeySets.ACTIVATION], preventDefault: true },
		disabled = false
	} = config

	const navigationHandler = createNavigationHandler(onNavigate, { ...navigationConfig, disabled })
	const activationHandler = createKeyboardHandler(onActivate, {
		keys: activationConfig.keys || [...KeySets.ACTIVATION],
		preventDefault: activationConfig.preventDefault,
		disabled
	})

	return (event: KeyboardEvent) => {
		// Try navigation first
		navigationHandler(event)
		// Then try activation
		activationHandler(event)
	}
}

/**
 * Check if an event target is an interactive element
 */
export function isInteractiveElement(element: EventTarget | null): boolean {
	if (!element || !(element instanceof HTMLElement)) return false

	const tagName = element.tagName.toLowerCase()
	const interactiveTags = ['button', 'a', 'input', 'select', 'textarea']

	return (
		interactiveTags.includes(tagName) ||
		element.hasAttribute('onclick') ||
		element.hasAttribute('onkeydown') ||
		element.getAttribute('role') === 'button' ||
		element.closest('button, a, [role="button"]') !== null
	)
}