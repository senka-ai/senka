<script lang="ts">
  import { SpinnerIcon } from '@ui/icons'
  import type { ButtonLikeComponent, IconComponent, InteractiveHandlers } from '@ui/type/component'
  import { createKeyboardHandler, KeySets } from '@ui/utils/events'
  import { createButtonStyles } from '@ui/utils/styles'
  import { ButtonRenderer, IconRenderer } from '@ui/utils/rendering'

  /**
   * Button component props interface
   * Extends core button functionality with icon support and interaction handlers
   */
  interface Props extends ButtonLikeComponent, IconComponent, InteractiveHandlers {
    /** Size of the icons in pixels @default 16 */
    iconSize?: number
    /** HTML button type attribute @default 'button' */
    type?: 'button' | 'submit' | 'reset'
  }

  let {
    variant = 'primary',
    size = 'medium',
    leftIcon,
    rightIcon,
    iconSize = 16,
    loading = false,
    fullWidth = false,
    disabled = false,
    class: className = '',
    id,
    type = 'button',
    onclick,
    onkeydown,
    onfocus,
    onblur,
    children,
    ...restProps
  }: Props = $props()

  // Use rendering utilities for consistent logic
  const isDisabled = $derived(ButtonRenderer.isEffectivelyDisabled(disabled, loading))

  // Use style composition utility with corrected values
  let buttonClasses = $derived(
    createButtonStyles({
      variant,
      size,
      fullWidth,
      disabled: isDisabled,
      className,
    })
  )

  // Enhanced click handler with disabled state support
  const handleClick = () => {
    if (isDisabled) return
    onclick?.()
  }

  // Use standardized keyboard handler
  const handleKeyDown = createKeyboardHandler(
    () => {
      if (!isDisabled) onclick?.()
    },
    {
      keys: [...KeySets.ACTIVATION],
      preventDefault: true,
      disabled: false, // Handle disabled state in the handler itself
    }
  )
</script>

<button
  class={buttonClasses}
  disabled={isDisabled}
  {id}
  {type}
  onclick={handleClick}
  onkeydown={(event) => {
    if (!isDisabled) handleKeyDown(event)
    onkeydown?.(event)
  }}
  {onfocus}
  {onblur}
  {...restProps}
>
  {#if ButtonRenderer.shouldShowLoading(loading)}
    <SpinnerIcon class="h-3.5 w-3.5" />
  {:else if IconRenderer.shouldRender(leftIcon)}
    <span class="flex h-3.5 w-3.5 items-center">
      {#if IconRenderer.isStringIcon(leftIcon)}
        {leftIcon}
      {:else}
        {@render leftIcon?.(iconSize)}
      {/if}
    </span>
  {/if}

  {#if children}
    {@render children()}
  {/if}

  {#if IconRenderer.shouldRender(rightIcon) && !ButtonRenderer.shouldShowLoading(loading)}
    <span class="flex h-3.5 w-3.5 items-center">
      {#if IconRenderer.isStringIcon(rightIcon)}
        {rightIcon}
      {:else}
        {@render rightIcon?.(iconSize)}
      {/if}
    </span>
  {/if}
</button>
