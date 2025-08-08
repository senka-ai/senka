<script lang="ts">
  import type { BaseProps, ExtendedSizedComponent, ChangeHandler, InteractiveHandlers } from '@type/component'
  import { useControlledState } from '@utils/state.svelte'
  import { createKeyboardHandler, KeySets } from '@utils/events'
  import { createStyleComposer } from '@utils/styles'

  interface Props extends BaseProps, ExtendedSizedComponent, ChangeHandler<number>, InteractiveHandlers {
    /** Current active page index (0-based) */
    currentPage?: number
    /** Total number of pages */
    totalPages: number
    /** Whether clicking dots changes the page */
    interactive?: boolean
  }

  let {
    currentPage = 0,
    totalPages,
    size = 'medium',
    interactive = true,
    disabled = false,
    class: className = '',
    id,
    onchange,
    onclick,
    onkeydown,
    onfocus,
    onblur,
    ...restProps
  }: Props = $props()

  // Use controlled state utility
  const pageState = useControlledState(currentPage ?? 0, currentPage, onchange)

  // Focus management for keyboard navigation
  let focusedIndex = $state(-1)

  // Create dots array for rendering
  const dots = $derived(Array.from({ length: totalPages }, (_, index) => index))

  // Style composition for container
  const createPaginationDotsStyles = createStyleComposer({
    base: 'inline-flex items-center justify-center gap-2',
    variants: {
      default: '',
    },
    sizes: {
      xs: 'gap-1',
      small: 'gap-1.5',
      medium: 'gap-2',
      large: 'gap-3',
    },
  })

  let containerClasses = $derived(
    createPaginationDotsStyles({
      size,
      disabled,
      className,
    })
  )

  // Individual dot size based on component size
  const dotSize = $derived(
    {
      xs: 'h-1.5 w-1.5',
      small: 'h-2 w-2',
      medium: 'h-3 w-3',
      large: 'h-4 w-4',
    }[size]
  )

  function handleDotClick(pageIndex: number) {
    if (!interactive || disabled) return
    pageState.setValue(pageIndex)
    onclick?.()
  }

  function handleKeyDown(event: KeyboardEvent, pageIndex: number) {
    if (!interactive || disabled) return

    let newFocusIndex = focusedIndex

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        newFocusIndex = Math.min(pageIndex + 1, totalPages - 1)
        break
      case 'ArrowLeft':
        event.preventDefault()
        newFocusIndex = Math.max(pageIndex - 1, 0)
        break
      case 'Home':
        event.preventDefault()
        newFocusIndex = 0
        break
      case 'End':
        event.preventDefault()
        newFocusIndex = totalPages - 1
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        handleDotClick(pageIndex)
        return
    }

    focusedIndex = newFocusIndex
    // Focus the appropriate dot
    const dotElement = document.querySelector(`[data-dot-index="${newFocusIndex}"]`) as HTMLElement
    dotElement?.focus()

    onkeydown?.(event)
  }

  // Individual dot styling
  function getDotClasses(pageIndex: number) {
    const isActive = pageIndex === (pageState.value() ?? 0)
    const isFocused = pageIndex === focusedIndex
    const isInteractive = interactive && !disabled

    let classes = `inline-block rounded-full transition-all duration-200 ${dotSize}`

    if (isActive) {
      classes += ' bg-highlight'
    } else {
      classes += ' bg-neutral-300'
    }

    if (isInteractive) {
      classes += ' cursor-pointer hover:scale-110'
      if (!isActive) {
        classes += ' hover:bg-neutral-400'
      }
    } else {
      classes += ' cursor-default'
    }

    if (isFocused) {
      classes += ''
    }

    if (disabled) {
      classes += ' opacity-50 cursor-not-allowed'
    }

    return classes
  }
</script>

<div class={containerClasses} role="tablist" aria-label="Page navigation dots" {id} {...restProps}>
  {#each dots as pageIndex}
    <button
      type="button"
      role="tab"
      aria-selected={pageIndex === (pageState.value() ?? 0)}
      aria-label={`Go to page ${pageIndex + 1}`}
      class={getDotClasses(pageIndex)}
      data-dot-index={pageIndex}
      tabindex={pageIndex === 0 || pageIndex === focusedIndex ? 0 : -1}
      {disabled}
      onclick={() => handleDotClick(pageIndex)}
      onkeydown={(event) => handleKeyDown(event, pageIndex)}
      onfocus={(e) => {
        focusedIndex = pageIndex
        onfocus?.(e)
      }}
      onblur={(e) => {
        onblur?.(e)
      }}
    >
      <span class="sr-only">Page {pageIndex + 1}</span>
    </button>
  {/each}
</div>
