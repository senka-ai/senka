<!-- packages/ui/src/lib/components/controls/Filter.svelte -->
<!-- Interactive control component that provides filtering functionality with optional badge display -->
<!-- Used for filtering data sets, search results, or list views with visual indication of active filters -->
<!-- RELEVANT FILES: Button.svelte, Badge.svelte, FilterIcon.svelte, component.ts -->

<script lang="ts">
  import { FilterIcon } from '@ui/icons'
  import Badge from '@ui/components/feedback/Badge.svelte'
  import type { BaseProps, SizedComponent, VariantComponent, ClickHandler, ChildrenComponent, IconComponent } from '@ui/type/component'
  import { createKeyboardHandler, KeySets } from '@ui/utils/events'
  import { createButtonStyles, getButtonIconSize, getButtonIconContainerClasses } from '@ui/shared-styles/button-styles'
  import { IconRenderer, ButtonRenderer } from '@ui/utils/rendering'

  interface Props
    extends BaseProps,
      SizedComponent,
      VariantComponent<'primary' | 'secondary' | 'tertiary'>,
      ClickHandler,
      ChildrenComponent {
    /** Title text displayed on the filter button @default 'Filter' */
    title?: string
    /** Number of active filters to display in badge (must be non-negative) */
    activeFilters?: number
    /** Whether to show the filter icon @default true */
    showIcon?: boolean
    /** Custom icon to display instead of default filter icon */
    icon?: IconComponent['leftIcon']
    /** Size of the icon in pixels (auto-sized based on button size if not provided) */
    iconSize?: number
    /** Whether the filter is in an active state @default false */
    active?: boolean
  }

  let {
    variant = 'secondary',
    size = 'medium',
    title = 'Filter',
    activeFilters,
    showIcon = true,
    icon,
    iconSize = 16,
    active = false,
    disabled = false,
    class: className = '',
    id,
    onclick,
    children,
    ...restProps
  }: Props = $props()

  // Determine if we should show a badge
  let shouldShowBadge = $derived(activeFilters !== undefined && activeFilters > 0)

  // Use rendering utilities for consistent logic
  const isDisabled = $derived(ButtonRenderer.isEffectivelyDisabled(disabled, false))

  // Apply active state to variant if needed
  let effectiveVariant = $derived(active ? 'primary' : variant)

  let filterClasses = $derived(
    createButtonStyles({
      buttonType: 'button',
      variant: effectiveVariant,
      size,
      disabled: isDisabled,
      className: `relative ${className}`,
      thinBorder: true,
    })
  )

  // Determine which icon to use
  let displayIcon = $derived(icon || FilterIcon)
  
  // Use unified icon sizing system
  const effectiveIconSize = $derived(iconSize || getButtonIconSize(size))
  
  // Get unified icon container classes
  const iconContainerClasses = $derived(getButtonIconContainerClasses(size))

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
</script>

<button 
  class={filterClasses} 
  {id} 
  disabled={isDisabled} 
  aria-pressed={active}
  onclick={handleClick} 
  onkeydown={(event) => {
    if (!isDisabled) handleKeyDown(event)
  }} 
  {...restProps}>
  {#if showIcon && IconRenderer.shouldRender(displayIcon)}
    <span class={iconContainerClasses}>
      {#if IconRenderer.isStringIcon(displayIcon)}
        {displayIcon}
      {:else if typeof displayIcon === 'function'}
        {@render displayIcon(effectiveIconSize)}
      {:else}
        {@const IconComponent = displayIcon}
        <IconComponent />
      {/if}
    </span>
  {/if}

  {#if children}
    {@render children()}
  {:else}
    {title}
  {/if}

  {#if shouldShowBadge}
    <Badge type="number" variant="default" size="small" value={activeFilters} class="ml-2" />
  {/if}
</button>
