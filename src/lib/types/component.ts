/**
 * Base interface that all components should extend
 * Provides fundamental props for styling, identification, and state
 */
export interface BaseProps {
	/** Additional CSS classes to apply to the component */
	class?: string
	/** Unique identifier for the component */
	id?: string
	/** Whether the component is disabled and non-interactive */
	disabled?: boolean
}

/**
 * For components that have size variants (small, medium, large)
 * Used by most components for consistent sizing
 */
export interface SizedComponent {
	/** Visual size variant of the component @default 'medium' */
	size?: 'small' | 'medium' | 'large'
}

/**
 * For components with size variants that include extra small
 * Used by components that need more granular sizing options
 */
export interface ExtendedSizedComponent {
	/** Visual size variant of the component including extra small @default 'medium' */
	size?: 'xs' | 'small' | 'medium' | 'large'
}

/**
 * For components that have visual style variants
 * Generic interface for type-safe variant definitions
 */
export interface VariantComponent<T extends string> {
	/** Visual style variant of the component */
	variant?: T
}

/**
 * For form field components
 * Provides standard form field props for consistent form handling
 */
export interface FormField {
	/** HTML name attribute for form submission */
	name?: string
	/** Current value of the form field */
	value?: string
	/** Label text displayed above the field */
	label?: string
	/** Helper text displayed below the field */
	helperText?: string
	/** Error message displayed when validation fails */
	error?: string
	/** Placeholder text shown when field is empty */
	placeholder?: string
	/** Whether to show the label @default true */
	showLabel?: boolean
	/** Whether to show helper/error text @default true */
	showHelperText?: boolean
}

/**
 * For components that support full width layout
 * Allows components to span the full width of their container
 */
export interface FullWidthComponent {
	/** Whether the component should take full width @default false */
	fullWidth?: boolean
}

/**
 * For components with children content
 * Enables composition patterns with nested content
 */
export interface ChildrenComponent {
	/** Child content to render inside the component */
	children?: any
}

/**
 * Standard event handlers
 */

/** Click event handler interface */
export interface ClickHandler {
	/** Called when the component is clicked */
	onclick?: () => void
}

/** Change event handler interface for form components */
export interface ChangeHandler<T = any> {
	/** Called when the component value changes */
	onchange?: (value: T) => void
}

/** Keyboard event handler interface */
export interface KeyboardHandler {
	/** Called when a key is pressed while component is focused */
	onkeydown?: (event: KeyboardEvent) => void
}

/** Focus event handlers interface */
export interface FocusHandlers {
	/** Called when the component receives focus */
	onfocus?: (event: FocusEvent) => void
	/** Called when the component loses focus */
	onblur?: (event: FocusEvent) => void
}

// Enhanced event handler interfaces
export interface InputHandlers {
	oninput?: (event: Event) => void
	onchange?: (event: Event) => void
}

export interface SpecializedClickHandlers {
	onclick?: () => void
	onSecondaryClick?: () => void
}

export interface FormEventHandlers extends FocusHandlers, InputHandlers {
	onsubmit?: (event: SubmitEvent) => void
}

// Keyboard navigation interfaces
export interface KeyboardNavigationHandler {
	onkeydown?: (event: KeyboardEvent) => void
	onkeyup?: (event: KeyboardEvent) => void
}

// Combined interface for interactive components
export interface InteractiveHandlers extends ClickHandler, KeyboardHandler, FocusHandlers {
	disabled?: boolean
}

// Navigation-specific handlers for components like TabBar
export interface NavigationHandlers {
	onNavigate?: (direction: 'up' | 'down' | 'left' | 'right') => void
}

// Combined interface for navigable interactive components
export interface NavigableHandlers extends InteractiveHandlers, NavigationHandlers {}

// Icon-related interfaces
export interface IconComponent {
	leftIcon?: any
	rightIcon?: any
}

export interface IconSizeComponent {
	iconSize?: number
}

// Unified icon interfaces for consistency
export interface UnifiedIconComponent {
	leftIcon?: any
	rightIcon?: any
	iconSize?: number
	showIcon?: boolean
}

export interface SingleIconComponent {
	icon?: any
	iconSize?: number
	showIcon?: boolean
}

export interface LeftIconComponent {
	leftIcon?: any
	iconSize?: number
	showIcon?: boolean
}

export interface RightIconComponent {
	rightIcon?: any
	iconSize?: number
	showIcon?: boolean
}

// Loading state interface
export interface LoadingComponent {
	loading?: boolean
}

// For components that can be interactive/clickable
export interface InteractiveComponent {
	clickable?: boolean
}

// Common button-like component props
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

// Common form input props
export interface FormInputComponent extends BaseProps, FormField, FullWidthComponent, FocusHandlers {
	type?: string
}

// Common list item props
export interface ListItemComponent extends BaseProps, ClickHandler, InteractiveComponent, ChildrenComponent {
	title: string
	description?: string
}

// Card component base props
export interface CardComponent extends BaseProps, ClickHandler, ChildrenComponent {
	title: string
	subtitle?: string
	description?: string
	variant?: 'default' | 'compact'
}

// For components with status indicators
export interface StatusComponent {
	status?: 'online' | 'offline' | 'away' | 'busy'
}

// Badge-specific types
export type BadgeType = 'number' | 'icon' | 'dot'
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error'

// Button-specific types
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
export type ButtonSize = 'small' | 'medium' | 'large'

// Common size types
export type ComponentSize = 'small' | 'medium' | 'large'
export type ExtendedComponentSize = 'xs' | 'small' | 'medium' | 'large'
