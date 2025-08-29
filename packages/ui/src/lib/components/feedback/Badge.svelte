<script lang="ts">
  import type { BaseProps, ExtendedSizedComponent, BadgeType, BadgeVariant } from '@ui/type/component'
  import { composeClasses } from '@ui/utils/styles'
  import { BadgeRenderer, IconRenderer } from '@ui/utils/rendering'

  interface Props extends BaseProps, ExtendedSizedComponent {
    type?: BadgeType
    variant?: BadgeVariant
    value?: number | string
    icon?: any
    max?: number
  }

  let {
    type = 'number',
    variant = 'default',
    size = 'medium',
    value,
    icon,
    max = 99,
    class: className = '',
    ...restProps
  }: Props = $props()

  function createBadgeStyles(options: {
    variant: 'default' | 'success' | 'warning' | 'error'
    size: 'xs' | 'small' | 'medium' | 'large'
    type: 'dot' | 'number' | 'icon'
    isText?: boolean
    className?: string
  }): string {
    const { variant, size, type, isText = false, className = '' } = options

    const base = 'inline-flex items-center justify-center font-medium'

    const variants = {
      default: 'bg-highlight text-white',
      success: 'bg-success text-white',
      warning: 'bg-warning text-white',
      error: 'bg-error text-white',
    }

    // Different sizing strategy for text vs numeric/icon badges
    const sizes = {
      xs:
        type === 'dot'
          ? 'h-1.5 w-1.5'
          : isText
            ? 'h-3 px-1.5 min-w-3 text-caption-m'
            : 'h-3 w-3 min-w-3 text-caption-m',
      small: type === 'dot' ? 'h-2 w-2' : isText ? 'h-4 px-2 min-w-4 text-caption-m' : 'h-4 w-4 min-w-4 text-caption-m',
      medium:
        type === 'dot' ? 'h-3 w-3' : isText ? 'h-5 px-2.5 min-w-5 text-caption-m' : 'h-5 w-5 min-w-5 text-caption-m',
      large: type === 'dot' ? 'h-4 w-4' : isText ? 'h-6 px-3 min-w-6 text-caption-m' : 'h-6 w-6 min-w-6 text-caption-m',
    }

    // Use rounded corners for text, full circle for numbers/icons
    const shape = type === 'dot' || !isText ? 'rounded-full' : 'rounded-lg'

    return composeClasses(base, variants[variant], sizes[size], shape, className)
  }

  let effectiveType = $derived.by(() => {
    // If type is explicitly set, use it
    if (type !== 'number') return type
    // Otherwise, auto-detect based on props
    if (typeof value === 'number' || typeof value === 'string') return 'number'
    return BadgeRenderer.getBadgeType(undefined, icon, false)
  })

  let displayValue = $derived.by(() => {
    if (typeof value === 'number') {
      return BadgeRenderer.formatNumber(value, max)
    } else if (typeof value === 'string') {
      return value
    }
    return BadgeRenderer.formatNumber(0, max)
  })

  let isTextBadge = $derived(typeof value === 'string' && value.length > 2)

  let badgeClasses = $derived(
    createBadgeStyles({
      variant,
      size,
      type: effectiveType,
      isText: isTextBadge,
      className,
    })
  )

  let contentSizeClasses = $derived(
    BadgeRenderer.getContentSize(size as 'xs' | 'small' | 'medium' | 'large', effectiveType)
  )
</script>

<span class={badgeClasses} {...restProps}>
  {#if effectiveType === 'number'}
    {displayValue}
  {:else if effectiveType === 'icon' && IconRenderer.shouldRender(icon)}
    <span class="flex items-center justify-center {contentSizeClasses}">
      {#if IconRenderer.isStringIcon(icon)}
        {icon}
      {:else}
        {@render icon?.()}
      {/if}
    </span>
  {:else if effectiveType === 'icon'}
    <svg class={contentSizeClasses} fill="currentColor" viewBox="0 0 20 20">
      <path
        fill-rule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clip-rule="evenodd"
      />
    </svg>
  {/if}
</span>
