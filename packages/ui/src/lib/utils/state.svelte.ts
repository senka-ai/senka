/**
 * Unified state management utilities for Svelte 5 components
 * Provides consistent patterns for controlled/uncontrolled components
 */

/**
 * Creates a controlled state pattern for components that can be either controlled or uncontrolled
 * @param initialValue - The initial value for uncontrolled mode
 * @param controlledValue - The controlled value (undefined for uncontrolled)
 * @param onChange - Callback for value changes
 * @returns Object with current value and change handler
 */
export function useControlledState<T>(initialValue: T, controlledValue: T | undefined, onChange?: (value: T) => void) {
  let localValue = $state(initialValue)

  // Reactively determine if controlled based on current controlledValue
  const isControlled = $derived(controlledValue !== undefined)
  const currentValue = $derived(isControlled ? controlledValue : localValue)

  const setValue = (newValue: T) => {
    if (!isControlled) {
      localValue = newValue
    }
    onChange?.(newValue)
  }

  return {
    value: () => currentValue,
    setValue,
    isControlled: () => isControlled,
  }
}

/**
 * Creates a focus state manager with consistent focus/blur handling
 * @param onFocus - Optional callback when element gains focus
 * @param onBlur - Optional callback when element loses focus
 * @param disabled - Whether focus handling is disabled
 * @returns Object with focus state and handlers
 */
export function useFocusState(
  onFocus?: (event: FocusEvent) => void,
  onBlur?: (event: FocusEvent) => void,
  disabled?: boolean
) {
  let focused = $state(false)

  const handleFocus = (event: FocusEvent) => {
    if (disabled) return
    focused = true
    onFocus?.(event)
  }

  const handleBlur = (event: FocusEvent) => {
    if (disabled) return
    focused = false
    onBlur?.(event)
  }

  return {
    focused: () => focused,
    handleFocus,
    handleBlur,
  }
}

/**
 * Creates a toggle state manager for boolean values
 * @param initialValue - Initial boolean value
 * @param controlled - Controlled value (undefined for uncontrolled)
 * @param onChange - Callback for changes
 * @returns Object with toggle state and handlers
 */
export function useToggleState(
  initialValue: boolean,
  controlled: boolean | undefined,
  onChange?: (value: boolean) => void
) {
  const { value, setValue, isControlled } = useControlledState(initialValue, controlled, onChange)

  const toggle = () => {
    setValue(!value())
  }

  return {
    value,
    setValue,
    toggle,
    isControlled,
  }
}

/**
 * Creates a dropdown/select state manager
 * @param initialValue - Initial selected value
 * @param controlled - Controlled value (undefined for uncontrolled)
 * @param onChange - Callback for selection changes
 * @returns Object with selection state and handlers
 */
export function useSelectState<T>(initialValue: T, controlled: T | undefined, onChange?: (value: T) => void) {
  const { value, setValue, isControlled } = useControlledState(initialValue, controlled, onChange)
  let isOpen = $state(false)

  const select = (newValue: T) => {
    setValue(newValue)
    isOpen = false
  }

  const open = () => {
    isOpen = true
  }

  const close = () => {
    isOpen = false
  }

  const toggle = () => {
    isOpen = !isOpen
  }

  return {
    value,
    setValue,
    select,
    isOpen: () => isOpen,
    open,
    close,
    toggle,
    isControlled,
  }
}

/**
 * Creates a text input state manager with validation support
 * @param initialValue - Initial text value
 * @param controlled - Controlled value (undefined for uncontrolled)
 * @param onChange - Callback for text changes
 * @param validator - Optional validation function
 * @returns Object with text state and handlers
 */
export function useTextState(
  initialValue: string,
  controlled: string | undefined,
  onChange?: (value: string) => void,
  validator?: (value: string) => string | null
) {
  const { value, setValue, isControlled } = useControlledState(initialValue, controlled, onChange)
  let validationError = $state<string | null>(null)

  const updateValue = (newValue: string) => {
    if (validator) {
      validationError = validator(newValue)
    }
    setValue(newValue)
  }

  const clearError = () => {
    validationError = null
  }

  return {
    value,
    setValue: updateValue,
    validationError: () => validationError,
    clearError,
    isControlled,
    hasError: () => validationError !== null,
  }
}

/**
 * Creates a loading state manager for async operations
 * @param initialLoading - Initial loading state
 * @returns Object with loading state and handlers
 */
export function useLoadingState(initialLoading: boolean = false) {
  let loading = $state(initialLoading)
  let error = $state<string | null>(null)

  const setLoading = (isLoading: boolean) => {
    loading = isLoading
    if (isLoading) {
      error = null
    }
  }

  const setError = (errorMessage: string | null) => {
    error = errorMessage
    loading = false
  }

  const reset = () => {
    loading = false
    error = null
  }

  return {
    loading: () => loading,
    error: () => error,
    setLoading,
    setError,
    reset,
    hasError: () => error !== null,
  }
}

/**
 * Creates a counter state manager with bounds
 * @param initialValue - Initial counter value
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @param onChange - Callback for value changes
 * @returns Object with counter state and handlers
 */
export function useCounterState(initialValue: number, min?: number, max?: number, onChange?: (value: number) => void) {
  let value = $state(initialValue)

  const setValue = (newValue: number) => {
    let clampedValue = newValue
    if (min !== undefined && clampedValue < min) {
      clampedValue = min
    }
    if (max !== undefined && clampedValue > max) {
      clampedValue = max
    }
    value = clampedValue
    onChange?.(clampedValue)
  }

  const increment = () => {
    setValue(value + 1)
  }

  const decrement = () => {
    setValue(value - 1)
  }

  const reset = () => {
    setValue(initialValue)
  }

  return {
    value: () => value,
    setValue,
    increment,
    decrement,
    reset,
    canIncrement: () => max === undefined || value < max,
    canDecrement: () => min === undefined || value > min,
  }
}
