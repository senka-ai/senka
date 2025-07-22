<script lang="ts">
  import { CheckIcon } from '../../icons'
  import type {
    BaseProps,
    ExtendedSizedComponent,
    ChangeHandler,
    ChildrenComponent,
    InteractiveHandlers,
  } from '../../types/component'
  import { useControlledState } from '../../utils/state.svelte'
  import { createKeyboardHandler, createSafeClickHandler, KeySets } from '../../utils/events'
  import { createCheckboxStyles, composeClasses } from '../../utils/styles'

  interface Props
    extends BaseProps,
      ExtendedSizedComponent,
      ChangeHandler<boolean>,
      ChildrenComponent,
      InteractiveHandlers {
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

  const checkedState = useControlledState(checked, undefined, onchange)

  function handleToggle() {
    checkedState.setValue(!checkedState.value())
    onclick?.()
  }

  // Use standardized safe click handler that protects against interactive elements
  const handleContainerClick = createSafeClickHandler(handleToggle, disabled)

  // Use standardized keyboard handler for activation keys
  const handleKeyboard = createKeyboardHandler(handleToggle, {
    keys: [...KeySets.ACTIVATION],
    preventDefault: true,
    disabled,
  })

  // Combined keyboard handler that includes user's custom handler
  const handleKeyDown = (event: KeyboardEvent) => {
    handleKeyboard(event)
    onkeydown?.(event)
  }

  let checkboxClasses = $derived(
    createCheckboxStyles({
      variant: checkedState.value() ? 'checked' : 'unchecked',
      size,
      disabled,
      modifiers: {
        'opacity-50 cursor-not-allowed hover:border-neutral-300': disabled,
      },
    })
  )

  let containerClasses = $derived(
    composeClasses('flex items-center gap-2', disabled ? 'cursor-not-allowed' : 'cursor-pointer', className)
  )

  let iconSizes = $derived.by(() => {
    const sizes = {
      xs: 8,
      small: 10,
      medium: 14,
      large: 18,
    }
    return sizes[size]
  })
</script>

<div
  role="checkbox"
  aria-checked={checkedState.value()}
  aria-disabled={disabled}
  tabindex={disabled ? -1 : 0}
  class={containerClasses}
  {id}
  onkeydown={handleKeyDown}
  onclick={handleContainerClick}
  {onfocus}
  {onblur}
  {...restProps}
>
  <div class={checkboxClasses}>
    <input type="checkbox" checked={checkedState.value()} {disabled} {name} {value} class="sr-only" tabindex="-1" />
    {#if checkedState.value()}
      <CheckIcon size={iconSizes} class="text-white" />
    {/if}
  </div>
  {#if children}
    <div class="select-none">
      {@render children?.()}
    </div>
  {:else if label}
    <span class="select-none">{label}</span>
  {/if}
</div>
