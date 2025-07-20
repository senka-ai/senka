// Base interface that all components should extend
export interface BaseProps {
	class?: string
	id?: string
	disabled?: boolean
}

// For components that have size variants
export interface SizedComponent {
	size?: 'small' | 'medium' | 'large'
}

// For components with size variants that include extra small
export interface ExtendedSizedComponent {
	size?: 'xs' | 'small' | 'medium' | 'large'
}

// For components that have variant styles
export interface VariantComponent<T extends string> {
	variant?: T
}

// For form field components
export interface FormField {
	name?: string
	value?: string
	label?: string
	helperText?: string
	error?: string
	placeholder?: string
	showLabel?: boolean
	showHelperText?: boolean
}

// For components that support full width
export interface FullWidthComponent {
	fullWidth?: boolean
}

// For components with children content
export interface ChildrenComponent {
	children?: any
}

// Standard event handlers
export interface ClickHandler {
	onclick?: () => void
}

export interface ChangeHandler<T = any> {
	onchange?: (value: T) => void
}

export interface KeyboardHandler {
	onkeydown?: (event: KeyboardEvent) => void
}

export interface FocusHandlers {
	onfocus?: (event: FocusEvent) => void
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
