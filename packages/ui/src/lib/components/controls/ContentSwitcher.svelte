<script lang="ts">
  import type { BaseProps, ChangeHandler, InteractiveHandlers } from '../../types/component'
  import { createKeyboardHandler, KeySets } from '../../utils/events'
  import { useFocusVisible } from '../../utils/focus.svelte'
  import { createStyleComposer } from '../../utils/styles'

  interface ContentSwitcherItem {
    id: string
    label: string
    disabled?: boolean
  }

  interface Props extends BaseProps, ChangeHandler<string>, InteractiveHandlers {
    items: ContentSwitcherItem[]
    selectedId?: string
    size?: 'small' | 'medium' | 'large'
    fullWidth?: boolean
    name?: string
  }

  let {
    items = [],
    selectedId = $bindable(),
    size = 'small',
    fullWidth = false,
    class: className = '',
    id,
    name,
    disabled = false,
    onchange,
    onclick,
    onkeydown,
    onfocus,
    onblur,
    ...restProps
  }: Props = $props()

  const focusVisible = useFocusVisible()

  // Set default selected item if none provided
  $effect(() => {
    if (!selectedId && items.length > 0) {
      const firstEnabledItem = items.find((item) => !item.disabled)
      if (firstEnabledItem) {
        selectedId = firstEnabledItem.id
      }
    }
  })

  function handleItemClick(item: ContentSwitcherItem) {
    if (disabled || item.disabled) return

    selectedId = item.id
    onchange?.(item.id)
    onclick?.()
  }

  const handleKeyboard = createKeyboardHandler(
    () => {
      // Handle keyboard navigation
    },
    {
      keys: [...KeySets.ACTIVATION, ...KeySets.HORIZONTAL_NAVIGATION],
      preventDefault: true,
      disabled,
    }
  )

  function handleKeyDown(event: KeyboardEvent, item: ContentSwitcherItem) {
    if (disabled || item.disabled) return

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        handleItemClick(item)
        break
      case 'ArrowRight':
        event.preventDefault()
        focusNextItem(item.id)
        break
      case 'ArrowLeft':
        event.preventDefault()
        focusPreviousItem(item.id)
        break
    }
    onkeydown?.(event)
  }

  function focusNextItem(currentId: string) {
    const currentIndex = items.findIndex((item) => item.id === currentId)
    if (currentIndex === -1) return

    // Find next enabled item
    const enabledItems = items.filter((item) => !item.disabled)
    const currentEnabledIndex = enabledItems.findIndex((item) => item.id === currentId)
    const nextEnabledIndex = (currentEnabledIndex + 1) % enabledItems.length
    const nextItem = enabledItems[nextEnabledIndex]

    if (nextItem) {
      handleItemClick(nextItem)
    }
  }

  function focusPreviousItem(currentId: string) {
    const currentIndex = items.findIndex((item) => item.id === currentId)
    if (currentIndex === -1) return

    // Find previous enabled item
    const enabledItems = items.filter((item) => !item.disabled)
    const currentEnabledIndex = enabledItems.findIndex((item) => item.id === currentId)
    const prevEnabledIndex = currentEnabledIndex === 0 ? enabledItems.length - 1 : currentEnabledIndex - 1
    const prevItem = enabledItems[prevEnabledIndex]

    if (prevItem) {
      handleItemClick(prevItem)
    }
  }

  // Style composer for the content switcher
  const createContentSwitcherStyles = createStyleComposer({
    base: 'items-center bg-surface rounded-xl',
    variants: {
      default: '',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    sizes: {
      small: 'p-1',
      medium: 'p-1',
      large: 'p-1',
    },
  })

  const createItemStyles = createStyleComposer({
    base: 'relative text-action-m font-medium rounded-lg cursor-pointer transition-all duration-200 text-center whitespace-nowrap',
    variants: {
      default: 'text-secondary hover:text-primary hover:bg-surface-hover',
      selected: 'text-primary bg-background shadow-sm',
      disabled: 'text-muted cursor-not-allowed opacity-50',
    },
    sizes: {
      small: 'px-4 py-2',
      medium: 'px-8 py-2 rounded-lg',
      large: 'px-16 py-2.5 rounded-xl',
    },
  })

  let containerClasses = $derived.by(() => {
    const baseClasses = createContentSwitcherStyles({
      variant: disabled ? 'disabled' : 'default',
      size,
      className,
    })
    const widthClasses = fullWidth ? 'flex w-full' : 'inline-flex'
    return `${baseClasses} ${widthClasses}`
  })

  function getItemClasses(item: ContentSwitcherItem) {
    const isSelected = item.id === selectedId
    const isDisabled = disabled || item.disabled

    let variant: 'default' | 'selected' | 'disabled' = 'default'
    if (isDisabled) variant = 'disabled'
    else if (isSelected) variant = 'selected'

    const baseClasses = createItemStyles({ variant, size })
    const widthClasses = fullWidth ? 'flex-1' : ''
    return `${baseClasses} ${widthClasses}`.trim()
  }

  // Get divider height based on size
  let dividerHeight = $derived(
    {
      small: 'h-4',
      medium: 'h-4',
      large: 'h-4',
    }[size]
  )
</script>

<div class={containerClasses} role="tablist" aria-label="Content switcher" {id} {...restProps}>
  {#each items as item, index}
    {#if index > 0}
      <div class="{dividerHeight} bg-border-subtle w-px"></div>
    {/if}
    <button
      type="button"
      role="tab"
      aria-selected={item.id === selectedId}
      aria-disabled={disabled || item.disabled}
      tabindex={disabled || item.disabled ? -1 : 0}
      class={getItemClasses(item)}
      disabled={disabled || item.disabled}
      onclick={() => handleItemClick(item)}
      onkeydown={(e) => handleKeyDown(e, item)}
      onfocus={(e) => {
        focusVisible.handleFocus()
        onfocus?.(e)
      }}
      onblur={(e) => {
        focusVisible.handleBlur()
        onblur?.(e)
      }}
    >
      {item.label}
    </button>
    {#if name}
      <input
        type="radio"
        {name}
        value={item.id}
        checked={item.id === selectedId}
        disabled={disabled || item.disabled}
        class="sr-only"
        tabindex="-1"
      />
    {/if}
  {/each}
</div>
