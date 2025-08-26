<script lang="ts">
  import { SpinnerIcon } from '@ui/icons'
  import type { BaseProps, IconComponent, InteractiveHandlers } from '@ui/type/component'
  import { createKeyboardHandler, KeySets } from '@ui/utils/events'
  import { createButtonStyles, getButtonIconSize, getButtonIconContainerClasses } from '@ui/shared-styles/button-styles'
  import { IconRenderer, ButtonRenderer } from '@ui/utils/rendering'

  /**
   * IconButton component props interface
   * A button that displays only an icon, optimized for accessibility and common UI patterns
   */
  interface Props extends BaseProps, IconComponent, InteractiveHandlers {
    /** Accessibility label (required for icon-only buttons) */
    'aria-label': string
    /** Button variant (now supports all unified variants) @default 'ghost' */
    variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'outlined' | 'filled'
    /** Semantic color @default 'default' */
    color?: 'default' | 'neutral' | 'success' | 'warning' | 'error'
    /** Button size @default 'medium' */
    size?: 'xs' | 'small' | 'medium' | 'large'
    /** Whether the button is in a loading state @default false */
    loading?: boolean
    /** HTML button type attribute @default 'button' */
    type?: 'button' | 'submit' | 'reset'
    /** Icon to display (required) */
    icon: NonNullable<IconComponent['leftIcon']>
    /** Size of the icon in pixels (auto-sized based on button size if not provided) */
    iconSize?: number
    /** Use thin border styling (for secondary/outlined variants) @default true */
    thinBorder?: boolean
  }

  let {
    'aria-label': ariaLabel,
    variant = 'ghost',
    color = 'default',
    size = 'medium',
    icon,
    iconSize,
    loading = false,
    disabled = false,
    thinBorder = true,
    class: className = '',
    id,
    type = 'button',
    onclick,
    onkeydown,
    onfocus,
    onblur,
    ...restProps
  }: Props = $props()

  // Use unified icon sizing system
  const effectiveIconSize = $derived(iconSize || getButtonIconSize(size))

  // Get unified icon container classes and apply unified color system
  const baseIconClasses = $derived(getButtonIconContainerClasses(size))

  // Icon color is handled by the unified button styles
  // The button itself handles the color theming, icon just inherits currentColor
  const iconClasses = $derived(`${baseIconClasses} text-current`)

  // Use rendering utilities for consistent logic
  const isDisabled = $derived(ButtonRenderer.isEffectivelyDisabled(disabled, loading))

  // Use unified button styling system
  let buttonClasses = $derived(
    createButtonStyles({
      buttonType: 'icon',
      variant,
      size,
      color,
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
  aria-label={ariaLabel}
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
    <span class="{iconClasses} overflow-hidden">
      <SpinnerIcon class="!h-full !w-full" />
    </span>
  {:else if IconRenderer.shouldRender(icon)}
    <span class={iconClasses}>
      {#if IconRenderer.isStringIcon(icon)}
        {icon}
      {:else if typeof icon === 'function'}
        {@render icon(effectiveIconSize)}
      {:else}
        {@const IconComponent = icon}
        <IconComponent />
      {/if}
    </span>
  {/if}
</button>
