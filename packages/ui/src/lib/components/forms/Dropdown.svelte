<script lang="ts">
  import ArrowDownIcon from '../../icons/ArrowDownIcon.svelte'
  import FormField from './FormField.svelte'
  import type { FormInputComponent, ChangeHandler, ChildrenComponent } from '../../types/component'
  import { useSelectState, useFocusState } from '../../utils/state.svelte'
  import { createInputStyles, composeClasses } from '../../utils/styles'
  import { FormRenderer, DropdownRenderer } from '../../utils/rendering'
  import { createKeyboardHandler, KeySets } from '../../utils/events'

  interface Option {
    value: string
    label: string
    disabled?: boolean
  }

  interface Props extends FormInputComponent, ChangeHandler<string>, ChildrenComponent {
    options: Option[]
    value?: string
  }

  let {
    options = [],
    value = $bindable(),
    label,
    helperText,
    error,
    placeholder = 'Select an option',
    disabled = false,
    fullWidth = false,
    showLabel = true,
    showHelperText = true,
    class: className = '',
    id,
    name,
    onchange,
    children,
    ...restProps
  }: Props = $props()

  let dropdownRef: HTMLDivElement
  let buttonRef: HTMLButtonElement

  const selectState = useSelectState(value || '', value, onchange)
  const focusState = useFocusState()

  let selectedOption = $derived(DropdownRenderer.findSelectedOption(options, selectState.value()))

  let currentState = $derived(FormRenderer.getInputState(focusState.focused() || selectState.isOpen(), error, disabled))

  let dropdownClasses = $derived('relative')

  let buttonClasses = $derived(
    createInputStyles({
      variant: currentState,
      size: 'medium',
      fullWidth: true,
      className: 'flex items-center justify-between',
    })
  )

  let menuClasses = $derived(
    composeClasses(
      'absolute z-50 w-full mt-1 bg-surface-elevated border border-default rounded-xl shadow-lg max-h-60 overflow-y-auto transition-all duration-200',
      selectState.isOpen() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
    )
  )

  function toggleDropdown() {
    if (!disabled) {
      selectState.toggle()
    }
  }

  function selectOption(option: Option) {
    if (!option.disabled) {
      value = option.value
      selectState.select(option.value)
      buttonRef?.focus()
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (disabled) return

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        toggleDropdown()
        break
      case 'Escape':
        selectState.close()
        buttonRef?.focus()
        break
      case 'ArrowDown':
        event.preventDefault()
        if (!selectState.isOpen()) {
          selectState.open()
        } else {
          // Focus next option
          focusNextOption()
        }
        break
      case 'ArrowUp':
        event.preventDefault()
        if (!selectState.isOpen()) {
          selectState.open()
        } else {
          // Focus previous option
          focusPreviousOption()
        }
        break
    }
  }

  function focusNextOption() {
    const currentIndex = selectedOption ? options.indexOf(selectedOption) : -1
    const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0
    const nextOption = options[nextIndex]
    if (nextOption && !nextOption.disabled) {
      selectOption(nextOption)
    }
  }

  function focusPreviousOption() {
    const currentIndex = selectedOption ? options.indexOf(selectedOption) : 0
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1
    const prevOption = options[prevIndex]
    if (prevOption && !prevOption.disabled) {
      selectOption(prevOption)
    }
  }

  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
      selectState.close()
    }
  }

  $effect(() => {
    if (selectState.isOpen()) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })
</script>

<FormField
  {label}
  {helperText}
  {error}
  {showLabel}
  {showHelperText}
  {fullWidth}
  {disabled}
  for={id}
  class={className}
  {id}
  {...restProps}
>
  {#snippet children()}
    <div class={dropdownClasses} bind:this={dropdownRef}>
      <button
        bind:this={buttonRef}
        type="button"
        class={buttonClasses}
        {disabled}
        {id}
        {name}
        aria-expanded={selectState.isOpen()}
        aria-haspopup="listbox"
        onclick={toggleDropdown}
        onkeydown={handleKeydown}
        onfocus={focusState.handleFocus}
        onblur={focusState.handleBlur}
      >
        <span class={selectedOption ? 'text-neutral-900' : 'text-neutral-500'}>
          {DropdownRenderer.getDisplayText(options, selectState.value(), placeholder)}
        </span>
        <ArrowDownIcon
          class={`transition-transform duration-200 ${selectState.isOpen() ? 'rotate-180' : ''} ${disabled ? 'text-neutral-400' : 'text-neutral-500'}`}
          size={12}
        />
      </button>

      <div class={menuClasses} role="listbox">
        {#each options as option}
          <button
            type="button"
            class={`text-body-m w-full px-3.25 py-2.5 text-left transition-colors duration-150 ${
              option.disabled ? 'text-muted cursor-not-allowed' : 'text-primary hover:bg-surface-hover'
            } ${option.value === selectState.value() ? 'bg-highlight-50 text-highlight-700' : ''}`}
            disabled={option.disabled}
            role="option"
            aria-selected={option.value === selectState.value()}
            onclick={() => selectOption(option)}
          >
            {option.label}
          </button>
        {/each}
      </div>
    </div>
  {/snippet}
</FormField>
