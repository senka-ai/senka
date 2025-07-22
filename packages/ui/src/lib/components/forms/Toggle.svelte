<script lang="ts">
  import type { BaseProps, ExtendedSizedComponent, ChangeHandler, InteractiveHandlers } from '../../types/component'
  import { useToggleState } from '../../utils/state.svelte'
  import { useFocusVisible } from '../../utils/focus.svelte'
  import { createKeyboardHandler, createClickHandler, KeySets } from '../../utils/events'
  import { createToggleStyles } from '../../utils/styles'

  interface Props extends BaseProps, ExtendedSizedComponent, ChangeHandler<boolean>, InteractiveHandlers {
    checked?: boolean
    name?: string
  }

  let {
    checked = false,
    size = 'medium',
    disabled = false,
    class: className = '',
    id,
    name,
    onchange,
    onclick,
    onkeydown,
    onfocus,
    onblur,
    ...restProps
  }: Props = $props()

  // Always start uncontrolled for simpler behavior in Storybook
  const toggleState = useToggleState(checked ?? false, undefined, onchange)
  const focusVisible = useFocusVisible()

  function handleToggle() {
    toggleState.toggle()
    onclick?.()
  }

  // Create standardized event handlers
  const handleClick = createClickHandler(handleToggle, disabled)

  const handleKeyboard = createKeyboardHandler(handleToggle, {
    keys: [...KeySets.ACTIVATION],
    preventDefault: true,
    disabled,
  })

  const handleKeyDown = (event: KeyboardEvent) => {
    handleKeyboard(event)
    onkeydown?.(event)
  }

  let toggleClasses = $derived.by(() => {
    const baseClasses = createToggleStyles({
      variant: toggleState.value() ? 'checked' : 'unchecked',
      size,
      disabled,
      className,
    })

    const focusRing = focusVisible.focusVisible() && !disabled ? 'ring-2 ring-highlight-200 ring-offset-2' : ''

    return `${baseClasses} ${focusRing}`
  })

  let knobClasses = $derived.by(() => {
    const base = 'absolute bg-white rounded-full transition-all duration-200 ease-in-out shadow-sm'

    const sizes = {
      xs: 'h-2.5 w-2.5 top-0.75',
      small: 'h-3.5 w-3.5 top-0.75',
      medium: 'h-5 w-5 top-1',
      large: 'h-6 w-6 top-1',
    }

    const positions = {
      xs: toggleState.value() ? 'translate-x-3.5' : 'translate-x-0.75',
      small: toggleState.value() ? 'translate-x-4.5' : 'translate-x-0.75',
      medium: toggleState.value() ? 'translate-x-6' : 'translate-x-1',
      large: toggleState.value() ? 'translate-x-7' : 'translate-x-1',
    }

    return `${base} ${sizes[size]} ${positions[size]}`
  })
</script>

<button
  role="switch"
  aria-checked={toggleState.value()}
  aria-disabled={disabled}
  aria-label="Toggle switch"
  type="button"
  {disabled}
  {id}
  class={toggleClasses}
  onclick={handleClick}
  onkeydown={handleKeyDown}
  onfocus={(e) => {
    focusVisible.handleFocus()
    onfocus?.(e)
  }}
  onblur={(e) => {
    focusVisible.handleBlur()
    onblur?.(e)
  }}
  {...restProps}
>
  <span class={knobClasses}></span>
  <input type="checkbox" checked={toggleState.value()} {disabled} {name} class="sr-only" tabindex="-1" />
</button>
