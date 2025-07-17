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
	onfocus?: () => void
	onblur?: () => void
}

// Icon-related interfaces
export interface IconComponent {
	leftIcon?: any
	rightIcon?: any
}

export interface IconSizeComponent {
	iconSize?: number
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
