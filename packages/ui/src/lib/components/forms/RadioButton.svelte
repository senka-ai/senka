<script lang="ts">
  import type {
    BaseProps,
    SizedComponent,
    ChangeHandler,
    ChildrenComponent,
    InteractiveHandlers,
  } from '@ui/type/component'
  import { createKeyboardHandler, createSafeClickHandler, KeySets } from '@ui/utils/events'
  import { createRadioStyles, composeClasses } from '@ui/utils/styles'
  import { getContext } from 'svelte'

  interface Props extends BaseProps, SizedComponent, ChangeHandler<boolean>, ChildrenComponent, InteractiveHandlers {
    checked?: boolean
    name?: string
    value?: string
    label?: string
  }

  let {
    checked = false,
    size = 'medium',
    disabled = false,
    class: className = '',
    id,
    name,
    value,
    onchange,
    children,
    label,
    onclick,
    onkeydown,
    onfocus,
    onblur,
    ...restProps
  }: Props = $props()

  // Get RadioGroup context if available
  const radioGroupContext = getContext<
    | {
        name: string
        selectedValue: () => string
        disabled: boolean
        onRadioChange: (value: string) => void
      }
    | undefined
  >('radioGroup')

  // Determine effective values based on context or props
  const effectiveName = $derived(radioGroupContext?.name || name)
  const effectiveDisabled = $derived(radioGroupContext?.disabled || disabled)
  const effectiveChecked = $derived(radioGroupContext ? radioGroupContext.selectedValue() === value : checked)

  function handleSelect() {
    if (!effectiveDisabled) {
      if (radioGroupContext && value) {
        // If in a group, notify the group with the value
        radioGroupContext.onRadioChange(value)
      } else {
        // If standalone, use the original boolean callback
        onchange?.(true)
      }
      onclick?.()
    }
  }

  // Use standardized safe click handler that protects against interactive elements
  const handleContainerClick = $derived(createSafeClickHandler(handleSelect, effectiveDisabled))

  // Use standardized keyboard handler for activation keys
  const handleKeyboard = $derived(
    createKeyboardHandler(handleSelect, {
      keys: [...KeySets.ACTIVATION],
      preventDefault: true,
      disabled: effectiveDisabled,
    })
  )

  // Combined keyboard handler that includes user's custom handler
  const handleKeyDown = (event: KeyboardEvent) => {
    handleKeyboard(event)
    onkeydown?.(event)
  }

  let radioClasses = $derived(
    createRadioStyles({
      variant: effectiveChecked ? 'checked' : 'unchecked',
      size,
      disabled: effectiveDisabled,
      modifiers: {
        'opacity-50 cursor-not-allowed hover:border-neutral-300': effectiveDisabled,
      },
    })
  )

  let containerClasses = $derived(
    composeClasses('flex items-center gap-2', effectiveDisabled ? 'cursor-not-allowed' : 'cursor-pointer', className)
  )

  let dotSizes = $derived.by(() => {
    const sizes = {
      small: 'h-1.5 w-1.5',
      medium: 'h-2.5 w-2.5',
      large: 'h-3.5 w-3.5',
    }
    return sizes[size]
  })

  let textClasses = $derived.by(() => {
    const textSizes = {
      small: 'text-body-s',
      medium: 'text-body-m',
      large: 'text-body-l',
    }
    return textSizes[size]
  })
</script>

<div
  role="radio"
  aria-checked={effectiveChecked}
  aria-disabled={effectiveDisabled}
  tabindex={effectiveDisabled ? -1 : 0}
  class={containerClasses}
  {id}
  onkeydown={handleKeyDown}
  onclick={handleContainerClick}
  {onfocus}
  {onblur}
  {...restProps}
>
  <div class={radioClasses}>
    <input
      type="radio"
      checked={effectiveChecked}
      disabled={effectiveDisabled}
      name={effectiveName}
      {value}
      class="sr-only"
      tabindex="-1"
      onchange={handleSelect}
    />
    {#if effectiveChecked}
      <div class="rounded-full bg-white {dotSizes}"></div>
    {/if}
  </div>
  {#if children}
    <div class="select-none {textClasses}">
      {@render children?.()}
    </div>
  {:else if label}
    <span class="select-none {textClasses}">{label}</span>
  {/if}
</div>
