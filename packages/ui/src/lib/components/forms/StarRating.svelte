<script lang="ts">
  import { StarFilledIcon, StarOutlinedIcon } from '@ui/icons'
  import type { BaseProps, ExtendedSizedComponent, ChangeHandler, InteractiveHandlers } from '@ui/type/component'
  import { useControlledState } from '@ui/utils/state.svelte'
  import { useFocusVisible } from '@ui/utils/focus.svelte'
  import { createStarRatingStyles } from '@ui/utils/styles'

  interface Props extends BaseProps, ExtendedSizedComponent, ChangeHandler<number>, InteractiveHandlers {
    /** Current rating value (0-5) */
    rating?: number
    /** Maximum number of stars @default 5 */
    maxRating?: number
    /** Color theme for filled stars @default 'primary' */
    color?: 'primary' | 'success' | 'warning' | 'error'
    /** Whether the rating is read-only */
    readonly?: boolean
    /** Allow half-star ratings (not implemented yet, for future enhancement) */
    allowHalf?: boolean
    /** Name for form input */
    name?: string
  }

  let {
    rating = 0,
    maxRating = 5,
    size = 'medium',
    color = 'primary',
    readonly = false,
    allowHalf = false,
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

  // Use controlled state utility
  const ratingState = useControlledState(rating ?? 0, rating, onchange)
  const focusVisible = useFocusVisible()

  // Track hover state for preview
  let hoveredIndex = $state(-1)
  let focusedIndex = $state(-1)

  // Calculate displayed rating (hover overrides actual rating)
  const displayRating = $derived(hoveredIndex >= 0 ? hoveredIndex + 1 : (ratingState.value() ?? 0))

  // Create stars array for rendering
  const stars = $derived(Array.from({ length: maxRating }, (_, index) => index))

  function handleStarClick(starIndex: number) {
    if (readonly || disabled) return

    const newRating = starIndex + 1
    // If clicking the same star that's already selected, reset to 0
    const finalRating = ratingState.value() === newRating ? 0 : newRating
    ratingState.setValue(finalRating)
    onclick?.()
  }

  function handleStarHover(starIndex: number) {
    if (readonly || disabled) return
    hoveredIndex = starIndex
  }

  function handleMouseLeave() {
    if (readonly || disabled) return
    hoveredIndex = -1
  }

  function handleKeyDown(event: KeyboardEvent, starIndex: number) {
    if (readonly || disabled) return

    let newFocusIndex = focusedIndex

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault()
        newFocusIndex = Math.min(starIndex + 1, maxRating - 1)
        break
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault()
        newFocusIndex = Math.max(starIndex - 1, 0)
        break
      case 'Home':
        event.preventDefault()
        newFocusIndex = 0
        break
      case 'End':
        event.preventDefault()
        newFocusIndex = maxRating - 1
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        handleStarClick(starIndex)
        return
    }

    focusedIndex = newFocusIndex
    // Focus the appropriate star
    const starElement = document.querySelector(`[data-star-index="${newFocusIndex}"]`) as HTMLElement
    starElement?.focus()

    onkeydown?.(event)
  }

  // Style composition for container
  let containerClasses = $derived(
    createStarRatingStyles({
      size,
      disabled,
      className,
    })
  )

  // Get icon size based on component size
  const iconSize = $derived(
    {
      xs: 16,
      small: 20,
      medium: 24,
      large: 28,
    }[size]
  )

  // Individual star styling
  function getStarClasses(starIndex: number) {
    const isFilled = starIndex < displayRating
    const isFocused = starIndex === focusedIndex
    const isInteractive = !readonly && !disabled

    let classes = 'inline-flex cursor-default transition-colors duration-150'

    if (isInteractive) {
      classes += ' cursor-pointer hover:scale-105'
    }

    if (isFilled) {
      const colorClasses = {
        primary: 'text-highlight',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error',
      }
      classes += ` ${colorClasses[color]}`
    } else {
      classes += ' text-neutral-300'
    }

    if (isFocused && focusVisible.focusVisible()) {
      classes += ' ring-2 ring-highlight-200 ring-offset-1 rounded-sm'
    }

    if (disabled) {
      classes += ' opacity-50 cursor-not-allowed'
    }

    return classes
  }
</script>

<div class={containerClasses} role="radiogroup" aria-label="Star rating" onmouseleave={handleMouseLeave} {...restProps}>
  {#each stars as starIndex}
    <button
      type="button"
      role="radio"
      aria-checked={starIndex + 1 <= (ratingState.value() ?? 0)}
      aria-setsize={maxRating}
      aria-posinset={starIndex + 1}
      aria-label={`${starIndex + 1} star${starIndex + 1 === 1 ? '' : 's'}`}
      class={getStarClasses(starIndex)}
      data-star-index={starIndex}
      tabindex={starIndex === 0 || starIndex === focusedIndex ? 0 : -1}
      {disabled}
      {id}
      onclick={() => handleStarClick(starIndex)}
      onmouseenter={() => handleStarHover(starIndex)}
      onkeydown={(event) => handleKeyDown(event, starIndex)}
      onfocus={(e) => {
        focusedIndex = starIndex
        focusVisible.handleFocus()
        onfocus?.(e)
      }}
      onblur={(e) => {
        focusVisible.handleBlur()
        onblur?.(e)
      }}
    >
      {#if starIndex < displayRating}
        <StarFilledIcon class="h-full w-full" size={iconSize} />
      {:else}
        <StarOutlinedIcon class="h-full w-full" size={iconSize} />
      {/if}
    </button>
  {/each}

  <!-- Hidden input for form submission -->
  {#if name}
    <input type="hidden" {name} value={ratingState.value() ?? 0} />
  {/if}
</div>
