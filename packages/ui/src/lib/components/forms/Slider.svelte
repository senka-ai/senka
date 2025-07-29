<script lang="ts">
  import type { FormInputComponent } from '../../types/component'
  import { useFocusState } from '../../utils/state.svelte'
  import { validateValue, type ValidationRule } from '../../utils/validation.svelte'
  import { createSliderStyles } from '../../utils/styles'
  import FormField from './FormField.svelte'

  interface Props extends Omit<FormInputComponent, 'value'> {
    /** Current numeric value */
    value?: number
    /** Minimum allowed value */
    min?: number
    /** Maximum allowed value */
    max?: number
    /** Step size for slider increments */
    step?: number
    /** Whether to show the current value */
    showValue?: boolean
    /** Whether to show the label */
    showTitle?: boolean
    /** Format for the displayed value (e.g., percentage) */
    valueFormat?: 'number' | 'percentage'
    /** Input state override */
    inputState?: 'default' | 'focused' | 'error' | 'disabled'
    /** Whether the field is required */
    required?: boolean
    /** Array of validation rules to apply to this field */
    validationRules?: ValidationRule<number>[]
    /** Whether to show validation errors immediately or only after change */
    validateOnChange?: boolean
    /** Callback fired when value changes */
    onchange?: (value: number) => void
  }

  let {
    label,
    helperText,
    error,
    value = $bindable(),
    min = 0,
    max = 100,
    step = 1,
    showValue = false,
    showTitle = true,
    valueFormat = 'number',
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
    onchange,
    ...restProps
  }: Props = $props()

  const focusState = useFocusState()

  // Initialize validation state
  let validationState = $state({ error: '', isValid: true })

  // Determine effective error state
  let effectiveError = $derived(validationState.error || error)

  // Calculate percentage for styling
  let percentage = $derived.by(() => {
    const currentValue = value ?? min
    return ((currentValue - min) / (max - min)) * 100
  })

  // Format the displayed value
  let displayValue = $derived.by(() => {
    const currentValue = value ?? min
    return valueFormat === 'percentage' ? `${Math.round(currentValue)}%` : String(currentValue)
  })

  // Validate the current value
  const validateCurrentValue = (val: number) => {
    if (validationRules && validationRules.length > 0) {
      const result = validateValue(val, validationRules)
      validationState.error = result.errors[0] || ''
      validationState.isValid = result.isValid
    }
  }

  // Handle slider input changes
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    const numericValue = parseFloat(target.value)

    if (!isNaN(numericValue)) {
      value = numericValue
      onchange?.(numericValue)
      if (validateOnChange) validateCurrentValue(numericValue)
    }
  }

  // Handle focus/blur events
  const handleFocus = (event: FocusEvent) => {
    focusState.handleFocus(event)
  }

  const handleBlur = (event: FocusEvent) => {
    focusState.handleBlur(event)
    // Always validate on blur
    if (validationRules && validationRules.length > 0 && value !== undefined) {
      validateCurrentValue(value)
    }
  }

  // Container classes
  let containerClasses = $derived.by(() => {
    const base = fullWidth ? 'w-full' : ''
    return `${base} ${className}`
  })

  // Slider styles using style composition utilities
  let sliderStyles = $derived(
    createSliderStyles({
      focused: focusState.focused(),
      disabled,
    })
  )
</script>

<FormField
  {label}
  {helperText}
  error={effectiveError}
  showLabel={showLabel && showTitle}
  {showHelperText}
  {fullWidth}
  {disabled}
  for={id}
  class={containerClasses}
  {...restProps}
>
  {#snippet children()}
    <div class="relative">
      <!-- Value display -->
      {#if showValue}
        <div class="mb-2 flex items-center justify-between">
          <span class="text-body-s text-secondary">
            {valueFormat === 'percentage' ? '0%' : String(min)}
          </span>
          <span class="text-body-s text-primary font-medium">{displayValue}</span>
          <span class="text-body-s text-secondary">
            {valueFormat === 'percentage' ? '100%' : String(max)}
          </span>
        </div>
      {/if}

      <!-- Slider track and visual elements -->
      <div class="relative py-2">
        <!-- Track background -->
        <div class={sliderStyles.track}>
          <!-- Fill/progress bar -->
          <div class={sliderStyles.fill} style="width: {percentage}%"></div>
        </div>

        <!-- Thumb/handle -->
        <div class={sliderStyles.thumb} style="left: calc({percentage}% - 10px)"></div>
      </div>

      <!-- Hidden native range input for functionality -->
      <input
        bind:value
        type="range"
        {min}
        {max}
        {step}
        {disabled}
        {id}
        {name}
        {required}
        class="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={displayValue}
        oninput={handleInput}
        onfocus={handleFocus}
        onblur={handleBlur}
      />
    </div>
  {/snippet}
</FormField>
