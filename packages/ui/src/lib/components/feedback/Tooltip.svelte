<script lang="ts">
  import type { BaseProps, ChildrenComponent } from '@type/component'
  import { createTooltipStyles } from '@utils/styles'

  /**
   * Tooltip component props interface
   * Provides contextual information with title and description
   */
  interface Props extends BaseProps, ChildrenComponent {
    /** The title text displayed in the tooltip */
    title?: string
    /** The description text displayed below the title */
    description?: string
    /** Position of the tooltip relative to the trigger */
    position?: 'top' | 'bottom' | 'left' | 'right'
    /** Size of the tooltip @default 'medium' */
    size?: 'auto' | 'small' | 'medium' | 'large'
    /** Whether to show the title @default true */
    showTitle?: boolean
    /** Whether to show the description @default true */
    showDescription?: boolean
    /** Whether the tooltip is currently visible (controlled mode) */
    open?: boolean
    /** Delay in milliseconds before showing tooltip on hover @default 500 */
    delay?: number
    /** Custom content for the trigger element */
    trigger?: any
  }

  let {
    title = 'Title',
    description,
    position = 'top',
    size = 'medium',
    showTitle = true,
    showDescription = true,
    open,
    delay = 500,
    class: className = '',
    id,
    disabled = false,
    trigger,
    children,
    ...restProps
  }: Props = $props()

  // State for tooltip visibility
  let isVisible = $state(false)
  let timeoutId: number | null = null

  // Simple controlled mode: only when open is explicitly true
  $effect(() => {
    if (open === true) {
      isVisible = true
    } else if (open === false) {
      isVisible = false
    }
    // If open is undefined, isVisible is managed by hover handlers
  })

  // Style composer for tooltip container

  // Position-specific styles
  const getPositionStyles = (pos: string) => {
    const positions = {
      top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    }
    return positions[pos as keyof typeof positions] || positions.top
  }

  // Arrow positioning styles
  const getArrowStyles = (pos: string) => {
    const arrows = {
      top: 'top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-800',
      bottom:
        'bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-neutral-800',
      left: 'left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-neutral-800',
      right:
        'right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-neutral-800',
    }
    return arrows[pos as keyof typeof arrows] || arrows.top
  }

  // Computed tooltip classes
  let tooltipClasses = $derived(
    createTooltipStyles({
      variant: isVisible ? 'visible' : 'hidden',
      size: size,
      className: `${getPositionStyles(position)} ${className}`,
    })
  )

  // Event handlers for hover behavior
  const handleMouseEnter = () => {
    if (disabled || open === true) return // Don't interfere when forced visible
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      isVisible = true
    }, delay)
  }

  const handleMouseLeave = () => {
    if (disabled || open === true) return // Don't interfere when forced visible
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      isVisible = false
    }, 100) // Quick fade out
  }
</script>

<div class="relative inline-block" {id} onmouseenter={handleMouseEnter} onmouseleave={handleMouseLeave} {...restProps}>
  <!-- Trigger element -->
  {#if trigger}
    {@render trigger()}
  {:else if children}
    {@render children()}
  {:else}
    <div class="inline-block cursor-help">Hover me</div>
  {/if}

  <!-- Tooltip content -->
  <div class={tooltipClasses}>
    {#if showTitle && title}
      <div class="text-h5 text-neutral-50">
        {title}
      </div>
    {/if}

    {#if showDescription && description}
      <div class="text-body-xs text-neutral-300 {showTitle && title ? 'mt-2' : ''}">
        {description}
      </div>
    {/if}

    <!-- Arrow -->
    <div class={`absolute ${getArrowStyles(position)}`}></div>
  </div>
</div>
