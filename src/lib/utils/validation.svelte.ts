/**
 * Unified form validation architecture for Senka components
 * Provides reusable validation logic and state management
 */

export type ValidationRule<T = any> = {
	message: string
	validator: (value: T) => boolean
}

export type ValidationResult = {
	isValid: boolean
	errors: string[]
}

export type FormFieldState<T = any> = {
	value: T
	isDirty: boolean
	isTouched: boolean
	errors: string[]
	isValid: boolean
}

export type FormState<T extends Record<string, any> = Record<string, any>> = {
	fields: { [K in keyof T]: FormFieldState<T[K]> }
	isValid: boolean
	isDirty: boolean
	isSubmitting: boolean
}

/**
 * Validates a single value against an array of validation rules
 */
export function validateValue<T>(value: T, rules: ValidationRule<T>[] = []): ValidationResult {
	const errors: string[] = []
	
	for (const rule of rules) {
		if (!rule.validator(value)) {
			errors.push(rule.message)
		}
	}
	
	return {
		isValid: errors.length === 0,
		errors
	}
}

/**
 * Common validation rules for educational app forms
 */
export const validationRules = {
	/**
	 * Validates required fields
	 */
	required: (message = 'This field is required'): ValidationRule<any> => ({
		message,
		validator: (value) => {
			if (typeof value === 'string') return value.trim().length > 0
			if (Array.isArray(value)) return value.length > 0
			return value != null && value !== undefined
		}
	}),

	/**
	 * Validates minimum length for strings
	 */
	minLength: (min: number, message?: string): ValidationRule<string> => ({
		message: message || `Must be at least ${min} characters`,
		validator: (value) => typeof value === 'string' && value.length >= min
	}),

	/**
	 * Validates maximum length for strings
	 */
	maxLength: (max: number, message?: string): ValidationRule<string> => ({
		message: message || `Must be no more than ${max} characters`,
		validator: (value) => typeof value === 'string' && value.length <= max
	}),

	/**
	 * Validates email format
	 */
	email: (message = 'Please enter a valid email address'): ValidationRule<string> => ({
		message,
		validator: (value) => {
			if (typeof value !== 'string') return false
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			return emailRegex.test(value)
		}
	}),

	/**
	 * Validates numeric values
	 */
	numeric: (message = 'Please enter a valid number'): ValidationRule<string | number> => ({
		message,
		validator: (value) => {
			if (typeof value === 'number') return !isNaN(value)
			if (typeof value === 'string') return !isNaN(Number(value))
			return false
		}
	}),

	/**
	 * Validates minimum value for numbers
	 */
	min: (minValue: number, message?: string): ValidationRule<string | number> => ({
		message: message || `Must be at least ${minValue}`,
		validator: (value) => {
			const num = typeof value === 'string' ? Number(value) : value
			return !isNaN(num) && num >= minValue
		}
	}),

	/**
	 * Validates maximum value for numbers
	 */
	max: (maxValue: number, message?: string): ValidationRule<string | number> => ({
		message: message || `Must be no more than ${maxValue}`,
		validator: (value) => {
			const num = typeof value === 'string' ? Number(value) : value
			return !isNaN(num) && num <= maxValue
		}
	}),

	/**
	 * Validates patterns using regex
	 */
	pattern: (regex: RegExp, message = 'Invalid format'): ValidationRule<string> => ({
		message,
		validator: (value) => typeof value === 'string' && regex.test(value)
	}),

	/**
	 * Validates Romanian educational ID format (CNP)
	 */
	romanianCNP: (message = 'Please enter a valid CNP'): ValidationRule<string> => ({
		message,
		validator: (value) => {
			if (typeof value !== 'string') return false
			// Basic CNP validation: 13 digits starting with valid month/gender code
			const cnpRegex = /^[1-8]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{6}$/
			return cnpRegex.test(value)
		}
	})
}

/**
 * Creates a reactive form validation state manager
 */
export function useFormValidation<T extends Record<string, any>>(
	initialValues: T,
	validationSchema: { [K in keyof T]?: ValidationRule<T[K]>[] } = {}
) {
	// Initialize form state
	let formState = $state<FormState<T>>({
		fields: {} as { [K in keyof T]: FormFieldState<T[K]> },
		isValid: true,
		isDirty: false,
		isSubmitting: false
	})

	// Initialize field states
	for (const key in initialValues) {
		formState.fields[key] = {
			value: initialValues[key],
			isDirty: false,
			isTouched: false,
			errors: [],
			isValid: true
		}
	}

	/**
	 * Updates a field value and validates it
	 */
	function updateField<K extends keyof T>(fieldName: K, value: T[K], touch = true) {
		const field = formState.fields[fieldName]
		if (!field) return

		field.value = value
		field.isDirty = true
		if (touch) field.isTouched = true

		// Validate the field
		const rules = validationSchema[fieldName] || []
		const validation = validateValue(value, rules)
		
		field.errors = validation.errors
		field.isValid = validation.isValid

		// Update form-level state
		updateFormState()
	}

	/**
	 * Marks a field as touched (for blur events)
	 */
	function touchField<K extends keyof T>(fieldName: K) {
		const field = formState.fields[fieldName]
		if (field) {
			field.isTouched = true
		}
	}

	/**
	 * Validates all fields and updates form state
	 */
	function validateForm(): boolean {
		for (const fieldName in formState.fields) {
			const field = formState.fields[fieldName]
			const rules = validationSchema[fieldName] || []
			const validation = validateValue(field.value, rules)
			
			field.errors = validation.errors
			field.isValid = validation.isValid
			field.isTouched = true
		}

		updateFormState()
		return formState.isValid
	}

	/**
	 * Updates form-level validation state
	 */
	function updateFormState() {
		const fields = Object.values(formState.fields)
		formState.isValid = fields.every(field => field.isValid)
		formState.isDirty = fields.some(field => field.isDirty)
	}

	/**
	 * Resets the form to initial values
	 */
	function resetForm() {
		for (const key in initialValues) {
			const field = formState.fields[key]
			if (field) {
				field.value = initialValues[key]
				field.isDirty = false
				field.isTouched = false
				field.errors = []
				field.isValid = true
			}
		}
		formState.isSubmitting = false
		updateFormState()
	}

	/**
	 * Sets form submission state
	 */
	function setSubmitting(isSubmitting: boolean) {
		formState.isSubmitting = isSubmitting
	}

	/**
	 * Gets the current form values
	 */
	function getFormValues(): T {
		const values = {} as T
		for (const key in formState.fields) {
			values[key] = formState.fields[key].value
		}
		return values
	}

	/**
	 * Gets field helper props for form components
	 */
	function getFieldProps<K extends keyof T>(fieldName: K) {
		const field = formState.fields[fieldName]
		if (!field) return {}

		return {
			value: field.value,
			error: field.isTouched && field.errors.length > 0 ? field.errors[0] : undefined,
			onchange: (value: T[K]) => updateField(fieldName, value),
			onblur: () => touchField(fieldName)
		}
	}

	return {
		// State access
		get formState() { return formState },
		get isValid() { return formState.isValid },
		get isDirty() { return formState.isDirty },
		get isSubmitting() { return formState.isSubmitting },
		
		// Actions
		updateField,
		touchField,
		validateForm,
		resetForm,
		setSubmitting,
		getFormValues,
		getFieldProps
	}
}

/**
 * Simplified validation hook for individual form fields
 */
export function useFieldValidation<T>(
	initialValue: T,
	rules: ValidationRule<T>[] = []
) {
	let fieldState = $state<FormFieldState<T>>({
		value: initialValue,
		isDirty: false,
		isTouched: false,
		errors: [],
		isValid: true
	})

	function updateValue(value: T, touch = true) {
		fieldState.value = value
		fieldState.isDirty = true
		if (touch) fieldState.isTouched = true

		const validation = validateValue(value, rules)
		fieldState.errors = validation.errors
		fieldState.isValid = validation.isValid
	}

	function touch() {
		fieldState.isTouched = true
	}

	function reset() {
		fieldState.value = initialValue
		fieldState.isDirty = false
		fieldState.isTouched = false
		fieldState.errors = []
		fieldState.isValid = true
	}

	return {
		get state() { return fieldState },
		get value() { return fieldState.value },
		get error() { return fieldState.isTouched && fieldState.errors.length > 0 ? fieldState.errors[0] : undefined },
		get isValid() { return fieldState.isValid },
		get isDirty() { return fieldState.isDirty },
		get isTouched() { return fieldState.isTouched },
		
		updateValue,
		touch,
		reset
	}
}