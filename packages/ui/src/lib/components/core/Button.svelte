<script lang="ts">
  import { SpinnerIcon } from '@ui/icons'
  import type { ButtonLikeComponent, IconComponent, InteractiveHandlers } from '@ui/type/component'
  import { createKeyboardHandler, KeySets } from '@ui/utils/events'
  import { createButtonStyles, getButtonIconSize, getButtonIconContainerClasses } from '@ui/shared-styles/button-styles'
  import { ButtonRenderer, IconRenderer } from '@ui/utils/rendering'

  /**
   * Button component props interface
   * Extends core button functionality with icon support and interaction handlers
   */
  interface Props extends ButtonLikeComponent, IconComponent, InteractiveHandlers {
    /** Size of the icons in pixels (auto-sized based on button size if not provided) */
    iconSize?: number
    /** HTML button type attribute @default 'button' */
    type?: 'button' | 'submit' | 'reset'
    /** Accessibility label (required when only icons are present without text) */
    'aria-label'?: string
    /** Semantic color (extends beyond primary/secondary/tertiary variants) */
    color?: 'default' | 'neutral' | 'success' | 'warning' | 'error'
    /** Use thin border styling (for secondary/outlined variants) @default false */
    thinBorder?: boolean
  }

  let {
    variant = 'primary',
    size = 'medium',
    color = 'default',
    leftIcon,
    rightIcon,
    iconSize,
    loading = false,
    fullWidth = false,
    disabled = false,
    thinBorder = false,
    class: className = '',
    id,
    type = 'button',
    'aria-label': ariaLabel,
    onclick,
    onkeydown,
    onfocus,
    onblur,
    children,
    ...restProps
  }: Props = $props()

  // Use unified icon sizing system
  const effectiveIconSize = $derived(iconSize || getButtonIconSize(size))

  // Get unified icon container classes
  const iconContainerClasses = $derived(getButtonIconContainerClasses(size))

  // Use rendering utilities for consistent logic
  const isDisabled = $derived(ButtonRenderer.isEffectivelyDisabled(disabled, loading))

  // Use unified button styling system
  let buttonClasses = $derived(
    createButtonStyles({
      buttonType: 'button',
      variant,
      size,
      color,
      fullWidth,
      thinBorder,
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
  aria-label={ariaLabel}
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
    <span class="{iconContainerClasses} overflow-hidden">
      <SpinnerIcon class="!h-full !w-full" />
    </span>
  {:else if IconRenderer.shouldRender(leftIcon)}
    <span class={iconContainerClasses}>
      {#if IconRenderer.isStringIcon(leftIcon)}
        {leftIcon}
      {:else}
        {@render leftIcon?.(effectiveIconSize)}
      {/if}
    </span>
  {/if}

  {#if children}
    {@render children()}
  {/if}

  {#if IconRenderer.shouldRender(rightIcon) && !ButtonRenderer.shouldShowLoading(loading)}
    <span class={iconContainerClasses}>
      {#if IconRenderer.isStringIcon(rightIcon)}
        {rightIcon}
      {:else}
        {@render rightIcon?.(effectiveIconSize)}
      {/if}
    </span>
  {/if}
</button>
