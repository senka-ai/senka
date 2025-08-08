<script lang="ts">
  import type { FormInputComponent, IconComponent, IconSizeComponent, InputHandlers } from '@type/component'
  import { useFocusState } from '@utils/state.svelte'
  import { getInputPadding, getInputIconClasses } from '@utils/icons'
  import { validateValue, type ValidationRule } from '@utils/validation.svelte'
  import { createInputStyles } from '@utils/styles'
  import { FormRenderer, IconRenderer } from '@utils/rendering'
  import FormField from '@components/forms/FormField.svelte'

  interface Props extends FormInputComponent, IconComponent, IconSizeComponent, InputHandlers {
    unit?: string
    inputState?: 'default' | 'focused' | 'error' | 'disabled'
    showPlaceholder?: boolean
    showIcon?: boolean
    showUnit?: boolean
    value?: string
    required?: boolean
    /** Array of validation rules to apply to this field */
    validationRules?: ValidationRule<string>[]
    /** Whether to show validation errors immediately or only after blur */
    validateOnChange?: boolean
  }

  let {
    label,
    helperText,
    error,
    leftIcon,
    rightIcon,
    unit,
    inputState = 'default',
    fullWidth = false,
    showLabel = true,
    showPlaceholder = true,
    showHelperText = true,
    showIcon = true,
    showUnit = true,
    disabled = false,
    class: className = '',
    id,
    placeholder,
    type = 'text',
    name,
    value = $bindable(),
    iconSize = 16,
    required = false,
    validationRules = [],
    validateOnChange = false,
    ...restProps
  }: Props = $props()

  const focusState = useFocusState()

  // Initialize validation state
  let validationState = $state({ error: '', isValid: true })

  // Determine effective error state (validation error or external error)
  let effectiveError = $derived(validationState.error || error)

  // Use rendering utility for consistent state logic
  let currentState = $derived(FormRenderer.getInputState(focusState.focused(), effectiveError, disabled))

  // Use updated style composition utility that matches original TextField design
  let inputClasses = $derived(
    createInputStyles({
      variant: currentState,
      size: 'medium',
      fullWidth: true,
      className: (() => {
        const hasLeftIcon = IconRenderer.shouldRender(leftIcon, showIcon ?? true)
        const hasRightIcon =
          IconRenderer.shouldRender(rightIcon, showIcon ?? true) || Boolean(unit && (showUnit ?? true))
        return getInputPadding(hasLeftIcon, hasRightIcon)
      })(),
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
    {#if IconRenderer.shouldRender(leftIcon, showIcon)}
      <div class={getInputIconClasses('left')}>
        {#if IconRenderer.isStringIcon(leftIcon)}
          {leftIcon}
        {:else}
          {@render leftIcon?.(iconSize)}
        {/if}
      </div>
    {/if}

    <input
      bind:value
      class={inputClasses}
      {disabled}
      {id}
      {placeholder}
      {type}
      {name}
      {required}
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
        const target = e.target as HTMLInputElement
        if (validateOnChange && validationRules && validationRules.length > 0) {
          const result = validateValue(target.value, validationRules)
          validationState.error = result.errors[0] || ''
          validationState.isValid = result.isValid
        }
        ;(restProps as any).oninput?.(e)
      }}
      {...restProps}
    />

    {#if IconRenderer.shouldRender(rightIcon, showIcon)}
      <div class={getInputIconClasses('right')}>
        {#if IconRenderer.isStringIcon(rightIcon)}
          {rightIcon}
        {:else}
          {@render rightIcon?.(iconSize)}
        {/if}
      </div>
    {:else if unit && (showUnit ?? true)}
      <div class="text-body-m absolute top-1/2 right-3.25 -translate-y-1/2 transform text-neutral-600">
        {unit}
      </div>
    {/if}
  {/snippet}
</FormField>
