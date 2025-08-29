<!-- packages/ui/src/lib/components/media/LocationPin.svelte -->
<!-- Location pin component for indicating map locations and current position -->
<!-- Used in maps, address displays, and location-based user interfaces -->
<!-- RELEVANT FILES: LocationPinIcon.svelte, component.ts, styles.ts, rendering.ts -->

<script lang="ts">
  import { LocationPinIcon } from '@ui/icons'
  import type {
    BaseProps,
    SizedComponent,
    VariantComponent,
    ClickHandler,
    InteractiveHandlers,
  } from '@ui/type/component'
  import { createKeyboardHandler, KeySets } from '@ui/utils/events'
  import { composeClasses } from '@ui/utils/styles'

  interface Props
    extends BaseProps,
      SizedComponent,
      VariantComponent<'pin' | 'current'>,
      ClickHandler,
      InteractiveHandlers {
    /** Whether the current location variant should pulse @default false */
    pulse?: boolean
    /** Custom color for the pin @default undefined (uses theme colors) */
    color?: string
  }

  let {
    variant = 'pin',
    size = 'medium',
    pulse = false,
    color,
    disabled = false,
    class: className = '',
    id,
    onclick,
    onkeydown,
    onfocus,
    onblur,
    ...restProps
  }: Props = $props()

  // Determine if component is interactive
  const isInteractive = $derived(Boolean(onclick))
  const isDisabled = $derived(disabled)

  function createLocationPinStyles(options: {
    variant: 'pin' | 'current'
    size: 'small' | 'medium' | 'large'
    interactive?: boolean
    disabled?: boolean
    pulse?: boolean
    className?: string
  }): string {
    const { variant, size, interactive = false, disabled = false, pulse = false, className = '' } = options

    const base = 'relative inline-flex items-center justify-center text-highlight transition-all duration-200'

    const variants = {
      pin: 'cursor-default',
      current: 'cursor-default rounded-full',
    }

    const sizes = {
      small: variant === 'pin' ? 'h-6 w-6' : 'h-8 w-8',
      medium: variant === 'pin' ? 'h-8 w-8' : 'h-10 w-10',
      large: variant === 'pin' ? 'h-10 w-10' : 'h-13 w-13',
    }

    // Interactive styles
    const interactiveStyles = interactive && !disabled ? 'cursor-pointer hover:scale-110 active:scale-95' : ''

    // Disabled styles
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

    // Pulse animation for current location variant
    const pulseStyles = pulse && variant === 'current' ? 'animate-ping scale-70' : ''

    // Current location specific styling - use border instead of background for ring effect
    const borderWidths = {
      small: 'border-8',
      medium: 'border-10',
      large: 'border-14',
    }
    const currentStyles = variant === 'current' ? `${borderWidths[size]} border-highlight-50` : ''

    return composeClasses(
      base,
      variants[variant],
      sizes[size],
      interactiveStyles,
      disabledStyles,
      pulseStyles,
      currentStyles,
      className
    )
  }

  function createLocationPinInnerDotStyles(size: 'small' | 'medium' | 'large'): string {
    const base = 'rounded-full bg-current'

    const sizes = {
      small: 'h-2 w-2',
      medium: 'h-2.75 w-2.75',
      large: 'h-3 w-3',
    }

    return composeClasses(base, sizes[size])
  }

  // Create styles for the location pin
  let locationPinClasses = $derived(
    createLocationPinStyles({
      variant,
      size,
      interactive: isInteractive,
      disabled: isDisabled,
      pulse: pulse && variant === 'current',
      className,
    })
  )

  // Create styles for current location elements
  let innerDotClasses = $derived(createLocationPinInnerDotStyles(size))

  // Event handlers
  const handleClick = () => {
    if (isDisabled) return
    onclick?.()
  }

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

  // Combined keyboard handler
  const handleKeyDownEvent = (event: KeyboardEvent) => {
    if (isInteractive) handleKeyDown(event)
    onkeydown?.(event)
  }
</script>

{#if isInteractive}
  <button
    class={locationPinClasses}
    {id}
    {disabled}
    onclick={handleClick}
    onkeydown={handleKeyDownEvent}
    {onfocus}
    {onblur}
    style={color ? `color: ${color}` : undefined}
    {...restProps}
  >
    {#if variant === 'pin'}
      <LocationPinIcon size={size === 'small' ? 20 : size === 'medium' ? 28 : 36} />
    {:else if variant === 'current'}
      <div class="relative flex items-center justify-center">
        <!-- Inner solid dot -->
        <div class={innerDotClasses}></div>
      </div>
    {/if}
  </button>
{:else}
  <div class={locationPinClasses} {id} style={color ? `color: ${color}` : undefined} {...restProps}>
    {#if variant === 'pin'}
      <LocationPinIcon size={size === 'small' ? 20 : size === 'medium' ? 28 : 36} />
    {:else if variant === 'current'}
      <div class="relative flex items-center justify-center">
        <!-- Inner solid dot -->
        <div class={innerDotClasses}></div>
      </div>
    {/if}
  </div>
{/if}
