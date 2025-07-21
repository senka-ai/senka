<!--
  Example component demonstrating how to use the new utility functions
  This shows the proper patterns for using utilities with Svelte 5 runes
-->
<script lang="ts">
  import { createButtonStyles, createInputStyles } from '$lib/utils/styles'
  import { FormRenderer, IconRenderer, ButtonRenderer } from '$lib/utils/rendering'
  import { useFocusManagement } from '$lib/utils/focus.svelte'
  import { createKeyboardHandler } from '$lib/utils/events'
  import type { ButtonLikeComponent } from '$lib/types/component'

  interface Props extends ButtonLikeComponent {
    label?: string
    helperText?: string
    error?: string
  }

  let {
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    fullWidth = false,
    class: className = '',
    onclick,
    children,
    label,
    helperText,
    error,
  }: Props = $props()

  // Use focus management utility - it manages the focused state internally

  // Use style composition utility (pre-configured)
  let classes = $derived(
    createButtonStyles({
      variant,
      size,
      disabled: ButtonRenderer.isEffectivelyDisabled(disabled, loading),
      fullWidth,
      className,
      modifiers: {
        'animate-pulse': loading,
      },
    })
  )

  // Use focus management utility
  const focusManager = useFocusManagement({
    onFocus: () => console.log('Button focused'),
    onBlur: () => console.log('Button blurred'),
    disabled,
  })

  // Use keyboard handler utility
  const handleKeyDown = createKeyboardHandler(
    () => {
      if (!ButtonRenderer.isEffectivelyDisabled(disabled, loading)) {
        onclick?.()
      }
    },
    { keys: ['Enter', ' '] }
  )

  // Form field example
  let inputValue = $state('')
  let inputFocused = $state(false)
  let inputElement = $state<HTMLInputElement | null>(null)

  // Use input style composition utility (pre-configured)
  let inputClasses = $derived(
    createInputStyles({
      variant: FormRenderer.getInputState(inputFocused, error, disabled),
      size,
      fullWidth: true,
      className: IconRenderer.getPositionClasses('left', true),
    })
  )

  function handleInputFocus() {
    inputFocused = true
  }

  function handleInputBlur() {
    inputFocused = false
  }
</script>

<div class="space-y-4 p-6">
  <h3 class="text-h3">Utility Usage Examples</h3>

  <!-- Button Example -->
  <div class="space-y-2">
    <h4 class="text-h4">Button with Style & Focus Utilities</h4>
    <button
      {disabled}
      class={classes}
      onclick={() => {
        if (!ButtonRenderer.isEffectivelyDisabled(disabled, loading)) {
          onclick?.()
        }
      }}
      onfocus={focusManager.handleFocus}
      onblur={focusManager.handleBlur}
      onkeydown={handleKeyDown}
    >
      {#if loading}
        <span class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
        Loading...
      {:else if children}
        {@render children()}
      {:else}
        Click me
      {/if}
    </button>
  </div>

  <!-- Form Field Example -->
  <div class="space-y-2">
    <h4 class="text-h4">Input with Rendering Utilities</h4>

    {#if FormRenderer.shouldShowLabel(label)}
      <label for="example-input" class="text-body-m font-medium text-neutral-700">
        {label}
      </label>
    {/if}

    <div class="relative">
      <!-- Left icon example -->
      <div class="absolute top-1/2 left-3 -translate-y-1/2 transform text-neutral-500">📧</div>

      <input
        id="example-input"
        bind:this={inputElement}
        bind:value={inputValue}
        {disabled}
        class={inputClasses}
        placeholder="Enter your email"
        onfocus={handleInputFocus}
        onblur={handleInputBlur}
      />
    </div>

    {#if FormRenderer.shouldShowHelperText(helperText)}
      <p class="text-body-s text-neutral-600">{helperText}</p>
    {/if}

    {#if FormRenderer.shouldShowError(error)}
      <p class="text-body-s text-error-600">{error}</p>
    {/if}
  </div>

  <!-- State Display -->
  <div class="space-y-2 rounded-xl bg-neutral-100 p-4">
    <h4 class="text-h4">Current State</h4>
    <ul class="text-body-s space-y-1">
      <li>Button focused: {focusManager.focused()}</li>
      <li>Input focused: {inputFocused}</li>
      <li>Input value: "{inputValue}"</li>
      <li>Button disabled: {disabled}</li>
      <li>Button loading: {loading}</li>
    </ul>
  </div>
</div>
