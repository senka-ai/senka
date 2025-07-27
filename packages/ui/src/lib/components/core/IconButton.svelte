<script lang="ts">
  import type { BaseProps, IconComponent, InteractiveHandlers } from '../../types/component'
  import { createKeyboardHandler, KeySets } from '../../utils/events'
  import { createIconButtonStyles } from '../../utils/styles'
  import { IconRenderer } from '../../utils/rendering'

  /**
   * IconButton component props interface
   * A button that displays only an icon, optimized for accessibility and common UI patterns
   */
  interface Props extends BaseProps, IconComponent, InteractiveHandlers {
    /** Accessibility label (required) */
    'aria-label': string
    /** Button variant @default 'ghost' */
    variant?: 'ghost' | 'outlined' | 'filled'
    /** Semantic color @default 'default' */
    color?: 'default' | 'neutral' | 'success' | 'warning' | 'error'
    /** Button size @default 'medium' */
    size?: 'small' | 'medium' | 'large'
    /** Whether the button is in a loading state @default false */
    loading?: boolean
    /** HTML button type attribute @default 'button' */
    type?: 'button' | 'submit' | 'reset'
    /** Icon to display (required) */
    icon: IconComponent['leftIcon']
    /** Size of the icon in pixels (auto-sized based on button size if not provided) */
    iconSize?: number
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
    class: className = '',
    id,
    type = 'button',
    onclick,
    onkeydown,
    onfocus,
    onblur,
    ...restProps
  }: Props = $props()

  // Generate icon CSS classes based on button size and color
  const iconSizeClasses = $derived(size === 'small' ? 'h-3.5 w-3.5' : size === 'medium' ? 'h-4 w-4' : 'h-5 w-5')

  const iconColorClasses = $derived(
    // For filled variants, icons are always white
    variant === 'filled'
      ? 'text-white'
      : // For ghost and outlined variants, apply semantic color
        color === 'default'
        ? 'text-highlight'
        : color === 'neutral'
          ? 'text-neutral-600'
          : color === 'success'
            ? 'text-success'
            : color === 'warning'
              ? 'text-warning'
              : color === 'error'
                ? 'text-error'
                : 'text-highlight'
  )

  const iconClasses = $derived(`${iconSizeClasses} ${iconColorClasses}`)

  const isDisabled = $derived(disabled || loading)

  // Use style composition utility
  let buttonClasses = $derived(
    createIconButtonStyles({
      variant,
      color,
      size,
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
  {#if IconRenderer.shouldRender(icon)}
    <span class="flex {iconClasses} items-center">
      {#if IconRenderer.isStringIcon(icon)}
        {icon}
      {:else if typeof icon === 'function'}
        {@render icon(iconSize)}
      {:else}
        {@const IconComponent = icon}
        <IconComponent />
      {/if}
    </span>
  {/if}
</button>
