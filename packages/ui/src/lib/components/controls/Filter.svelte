<!-- packages/ui/src/lib/components/controls/Filter.svelte -->
<!-- Interactive control component that provides filtering functionality with optional badge display -->
<!-- Used for filtering data sets, search results, or list views with visual indication of active filters -->
<!-- RELEVANT FILES: Button.svelte, Badge.svelte, FilterIcon.svelte, component.ts -->

<script lang="ts">
  import { FilterIcon } from '../../icons'
  import Badge from '../feedback/Badge.svelte'
  import type {
    BaseProps,
    SizedComponent,
    VariantComponent,
    ClickHandler,
    ChildrenComponent,
  } from '../../types/component'
  import { createKeyboardHandler, KeySets } from '../../utils/events'
  import { createFilterStyles } from '../../utils/styles'
  import { IconRenderer } from '../../utils/rendering'

  interface Props
    extends BaseProps,
      SizedComponent,
      VariantComponent<'primary' | 'secondary' | 'tertiary'>,
      ClickHandler,
      ChildrenComponent {
    /** Title text displayed on the filter button @default 'Filter' */
    title?: string
    /** Number of active filters to display in badge */
    activeFilters?: number
    /** Whether to show the filter icon @default true */
    showIcon?: boolean
    /** Custom icon to display instead of default filter icon */
    icon?: any
    /** Size of the icon in pixels @default 16 */
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

  // Apply active state to variant if needed
  let effectiveVariant = $derived(active ? 'primary' : variant)

  let filterClasses = $derived(
    createFilterStyles({
      variant: effectiveVariant,
      size,
      disabled,
      className: `relative ${className}`,
    })
  )

  // Determine which icon to use
  let displayIcon = $derived(icon || FilterIcon)

  const handleClick = () => {
    if (disabled) return
    onclick?.()
  }

  const handleKeyDown = createKeyboardHandler(
    () => {
      if (!disabled) onclick?.()
    },
    {
      keys: [...KeySets.ACTIVATION],
      preventDefault: true,
      disabled,
    }
  )
</script>

<button class={filterClasses} {id} {disabled} onclick={handleClick} onkeydown={handleKeyDown} {...restProps}>
  {#if showIcon && IconRenderer.shouldRender(displayIcon)}
    <span class="flex h-3.5 w-3.5 items-center">
      {#if IconRenderer.isStringIcon(displayIcon)}
        {displayIcon}
      {:else}
        {@render displayIcon(iconSize)}
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
