<!-- packages/ui/src/lib/components/media/LocationPin.svelte -->
<!-- Location pin component for indicating map locations and current position -->
<!-- Used in maps, address displays, and location-based user interfaces -->
<!-- RELEVANT FILES: LocationPinIcon.svelte, component.ts, styles.ts, rendering.ts -->

<script lang="ts">
  import { LocationPinIcon } from '@icons'
  import type { BaseProps, SizedComponent, VariantComponent, ClickHandler, InteractiveHandlers } from '@type/component'
  import { createKeyboardHandler, KeySets } from '@utils/events'
  import { createLocationPinStyles, createLocationPinInnerDotStyles } from '@utils/styles'

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
