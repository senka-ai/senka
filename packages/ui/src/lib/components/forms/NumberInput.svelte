<script lang="ts">
  import type { FormInputComponent, IconSizeComponent } from '@type/component'
  import { useFocusState } from '@utils/state.svelte'
  import { validateValue, type ValidationRule } from '@utils/validation.svelte'
  import { createInputStyles, createNumberInputButtonStyles } from '@utils/styles'
  import { FormRenderer } from '@utils/rendering'
  import FormField from '@components/forms/FormField.svelte'
  import { AddIcon, MinusIcon } from '@icons'

  interface Props extends Omit<FormInputComponent, 'value'>, IconSizeComponent {
    /** Minimum allowed value */
    min?: number
    /** Maximum allowed value */
    max?: number
    /** Step size for increment/decrement */
    step?: number
    /** Current numeric value */
    value?: number
    /** Whether to show the increment/decrement buttons */
    showButtons?: boolean
    /** Layout of the increment/decrement buttons */
    buttonLayout?: 'stacked' | 'horizontal' | 'split'
    /** Placeholder text */
    placeholder?: string
    /** Input state override */
    inputState?: 'default' | 'focused' | 'error' | 'disabled'
    /** Whether the field is required */
    required?: boolean
    /** Array of validation rules to apply to this field */
    validationRules?: ValidationRule<number>[]
    /** Whether to show validation errors immediately or only after blur */
    validateOnChange?: boolean
    /** Callback fired when value changes */
    onchange?: (value: number) => void
  }

  let {
    label,
    helperText,
    error,
    value = $bindable(),
    min,
    max,
    step = 1,
    showButtons = true,
    buttonLayout = 'stacked',
    placeholder = '0',
    inputState = 'default',
    fullWidth = false,
    showLabel = true,
    showHelperText = true,
    disabled = false,
    required = false,
    validationRules = [],
    validateOnChange = false,
    class: className = '',
    id,
    name,
    iconSize = 16,
    onchange,
    ...restProps
  }: Props = $props()

  const focusState = useFocusState()

  // Initialize validation state
  let validationState = $state({ error: '', isValid: true })

  // Determine effective error state
  let effectiveError = $derived(validationState.error || error)

  // Use rendering utility for consistent state logic
  let currentState = $derived(FormRenderer.getInputState(focusState.focused(), effectiveError, disabled))

  // Calculate button disabled states
  let isMinusDisabled = $derived(disabled || (min !== undefined && (value ?? 0) <= min))
  let isPlusDisabled = $derived(disabled || (max !== undefined && (value ?? 0) >= max))

  // Convert value to string for input display
  let inputValue = $derived.by(() => {
    return value !== undefined && value !== null ? String(value) : ''
  })

  // Validate the current value
  const validateCurrentValue = (val: number) => {
    if (validationRules && validationRules.length > 0) {
      const result = validateValue(val, validationRules)
      validationState.error = result.errors[0] || ''
      validationState.isValid = result.isValid
    }
  }

  // Increment value
  const increment = () => {
    if (isPlusDisabled) return
    const currentValue = value ?? 0
    const newValue = currentValue + step
    const clampedValue = max !== undefined ? Math.min(newValue, max) : newValue
    value = clampedValue
    onchange?.(clampedValue)
    if (validateOnChange) validateCurrentValue(clampedValue)
  }

  // Decrement value
  const decrement = () => {
    if (isMinusDisabled) return
    const currentValue = value ?? 0
    const newValue = currentValue - step
    const clampedValue = min !== undefined ? Math.max(newValue, min) : newValue
    value = clampedValue
    onchange?.(clampedValue)
    if (validateOnChange) validateCurrentValue(clampedValue)
  }

  // Handle direct input changes
  const handleInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const inputVal = target.value

    // Allow empty string
    if (inputVal === '') {
      value = undefined
      onchange?.(0)
      if (validateOnChange) validateCurrentValue(0)
      return
    }

    // Parse the numeric value
    const numericValue = parseFloat(inputVal)
    if (!isNaN(numericValue)) {
      // Apply min/max constraints
      let clampedValue = numericValue
      if (min !== undefined) clampedValue = Math.max(clampedValue, min)
      if (max !== undefined) clampedValue = Math.min(clampedValue, max)

      value = clampedValue
      onchange?.(clampedValue)
      if (validateOnChange) validateCurrentValue(clampedValue)
    }
  }

  // Keyboard handlers for increment/decrement buttons
  const handleMinusKeydown = (event: KeyboardEvent) => {
    if (isMinusDisabled) return
    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault()
      decrement()
    }
  }

  const handlePlusKeydown = (event: KeyboardEvent) => {
    if (isPlusDisabled) return
    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault()
      increment()
    }
  }

  // Style the input with proper padding for buttons and hide native spinners
  let inputClasses = $derived(
    createInputStyles({
      variant: currentState,
      size: 'medium',
      fullWidth: true,
      className: (() => {
        const hiddenSpinners =
          '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]'
        if (!showButtons) return hiddenSpinners

        // Different padding and alignment for different layouts
        const padding =
          buttonLayout === 'horizontal'
            ? 'pr-20'
            : buttonLayout === 'split'
              ? 'px-12 text-center' // Padding on both sides + center text for split layout
              : 'pr-12' // Stacked layout
        return `${padding} ${hiddenSpinners}`
      })(),
    })
  )

  // Button styles using style composition utilities
  let minusButtonClasses = $derived(
    createNumberInputButtonStyles({
      layout: buttonLayout,
      position: buttonLayout === 'split' ? 'decrement' : buttonLayout === 'horizontal' ? 'decrement' : 'decrement',
      disabled: isMinusDisabled,
    })
  )

  let plusButtonClasses = $derived(
    createNumberInputButtonStyles({
      layout: buttonLayout,
      position: buttonLayout === 'split' ? 'increment' : buttonLayout === 'horizontal' ? 'increment' : 'increment',
      disabled: isPlusDisabled,
    })
  )
</script>

<FormField
  {label}
  {helperText}
  error={effectiveError}
  {showLabel}
  {showHelperText}
  {fullWidth}
  {disabled}
  for={id}
  class={className}
  {...restProps}
>
  {#snippet children()}
    <input
      bind:value={inputValue}
      class={inputClasses}
      {disabled}
      {id}
      {placeholder}
      {name}
      {required}
      type="number"
      {min}
      {max}
      {step}
      onfocus={focusState.handleFocus}
      onblur={(e) => {
        focusState.handleBlur(e)
        // Always validate on blur
        if (validationRules && validationRules.length > 0 && value !== undefined) {
          validateCurrentValue(value)
        }
      }}
      oninput={handleInputChange}
    />

    {#if showButtons}
      {#if buttonLayout === 'horizontal'}
        <!-- Horizontal layout: both buttons on right side -->
        <div class="absolute top-1/2 right-1 flex -translate-y-1/2">
          <!-- Decrement button (left) -->
          <button
            type="button"
            class={minusButtonClasses}
            disabled={isMinusDisabled}
            onclick={decrement}
            onkeydown={handleMinusKeydown}
            aria-label="Decrease value"
          >
            <MinusIcon class="h-3 w-3" size={12} />
          </button>

          <!-- Increment button (right) -->
          <button
            type="button"
            class={plusButtonClasses}
            disabled={isPlusDisabled}
            onclick={increment}
            onkeydown={handlePlusKeydown}
            aria-label="Increase value"
          >
            <AddIcon class="h-3 w-3" size={12} />
          </button>
        </div>
      {:else if buttonLayout === 'split'}
        <!-- Split layout: - button on far left, + button on far right -->
        <!-- Decrement button (far left) -->
        <button
          type="button"
          class={minusButtonClasses}
          disabled={isMinusDisabled}
          onclick={decrement}
          onkeydown={handleMinusKeydown}
          aria-label="Decrease value"
        >
          <MinusIcon class="h-3 w-3" size={12} />
        </button>

        <!-- Increment button (far right) -->
        <button
          type="button"
          class={plusButtonClasses}
          disabled={isPlusDisabled}
          onclick={increment}
          onkeydown={handlePlusKeydown}
          aria-label="Increase value"
        >
          <AddIcon class="h-3 w-3" size={12} />
        </button>
      {:else}
        <!-- Stacked layout: buttons stacked vertically on right -->
        <div class="absolute top-1/2 right-1 flex -translate-y-1/2 flex-col">
          <!-- Increment button (top) -->
          <button
            type="button"
            class={plusButtonClasses}
            disabled={isPlusDisabled}
            onclick={increment}
            onkeydown={handlePlusKeydown}
            aria-label="Increase value"
          >
            <AddIcon class="h-2.5 w-2.5" size={10} />
          </button>

          <!-- Decrement button (bottom) -->
          <button
            type="button"
            class={minusButtonClasses}
            disabled={isMinusDisabled}
            onclick={decrement}
            onkeydown={handleMinusKeydown}
            aria-label="Decrease value"
          >
            <MinusIcon class="h-2.5 w-2.5" size={10} />
          </button>
        </div>
      {/if}
    {/if}
  {/snippet}
</FormField>
