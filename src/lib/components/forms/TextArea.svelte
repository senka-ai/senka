<script lang="ts">
  import type { FormInputComponent } from '../../types/component'
  import { useFocusState } from '../../utils/state.svelte'
  import { validateValue, type ValidationRule } from '../../utils/validation.svelte'
  import { createInputStyles } from '../../utils/styles'
  import { FormRenderer } from '../../utils/rendering'
  import FormField from './FormField.svelte'

  interface Props extends FormInputComponent {
    inputState?: 'default' | 'focused' | 'error' | 'disabled'
    showPlaceholder?: boolean
    value?: string
    rows?: number
    maxlength?: number
    resize?: 'none' | 'vertical' | 'horizontal' | 'both'
    /** Array of validation rules to apply to this field */
    validationRules?: ValidationRule<string>[]
    /** Whether to show validation errors immediately or only after blur */
    validateOnChange?: boolean
  }

  let {
    label,
    helperText,
    error,
    inputState = 'default',
    fullWidth = false,
    showLabel = true,
    showPlaceholder = true,
    showHelperText = true,
    disabled = false,
    class: className = '',
    id,
    placeholder,
    name,
    value = $bindable(),
    rows = 4,
    maxlength,
    resize = 'vertical',
    validationRules = [],
    validateOnChange = false,
    ...restProps
  }: Props = $props()

  const focusState = useFocusState()
  let textareaRef: HTMLTextAreaElement

  // Initialize validation state
  let validationState = $state({ error: '', isValid: true })

  // Determine effective error state (validation error or external error)
  let effectiveError = $derived(validationState.error || error)

  // Use rendering utility for consistent state logic
  let currentState = $derived(FormRenderer.getInputState(focusState.focused(), effectiveError, disabled))

  let textareaClasses = $derived.by(() => {
    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    }

    return createInputStyles({
      variant: currentState,
      size: 'medium',
      fullWidth: true,
      className: `min-h-[3rem] ${resizeClasses[resize]}`,
    })
  })

  let charCount = $derived(value?.length || 0)
  let showCharCount = $derived(maxlength !== undefined && maxlength > 0)

  // Determine if we need a custom helper area (when we have both text and char count)
  let showCustomHelperArea = $derived(showCharCount && showHelperText && (error || helperText))

  // Helper text to pass to FormField (only when not using custom helper area)
  let formFieldHelperText = $derived.by(() => {
    if (showCustomHelperArea) return ''
    return effectiveError || helperText || ''
  })
</script>

<FormField
  {label}
  helperText={formFieldHelperText}
  error={effectiveError}
  {showLabel}
  showHelperText={showHelperText && !showCustomHelperArea}
  {fullWidth}
  {disabled}
  for={id}
  class={className}
  {...restProps}
>
  {#snippet children()}
    <textarea
      bind:this={textareaRef}
      bind:value
      class={textareaClasses}
      {disabled}
      {id}
      {placeholder}
      {name}
      {rows}
      {maxlength}
      onfocus={focusState.handleFocus}
      onblur={(e) => {
        focusState.handleBlur(e)
        // Always validate on blur
        if (validationRules && validationRules.length > 0) {
          const result = validateValue(value || '', validationRules)
          validationState.error = result.errors[0] || ''
          validationState.isValid = result.isValid
        }
        ;(restProps as any).onblur?.(e)
      }}
      oninput={(e) => {
        const target = e.target as HTMLTextAreaElement
        if (validateOnChange && validationRules && validationRules.length > 0) {
          const result = validateValue(target.value, validationRules)
          validationState.error = result.errors[0] || ''
          validationState.isValid = result.isValid
        }
        ;(restProps as any).oninput?.(e)
      }}
      {...restProps}
    ></textarea>
  {/snippet}
</FormField>

{#if showCustomHelperArea}
  <div class="mt-1 flex items-start justify-between">
    {#if (effectiveError || helperText) && showHelperText}
      <div class="text-slim-s {effectiveError ? 'text-error' : 'text-neutral-600'}">
        {effectiveError || helperText}
      </div>
    {/if}
    {#if showCharCount}
      <div class="text-slim-s ml-auto text-neutral-600">
        {charCount}/{maxlength}
      </div>
    {/if}
  </div>
{/if}
