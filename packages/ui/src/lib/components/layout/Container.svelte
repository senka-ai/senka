<!--
  packages/ui/src/lib/components/layout/Container.svelte
  A simple, semantic container component for general content containment.
  Provides basic styling and structure without the complexity of Card component.
  RELEVANT FILES: Card.svelte, List.svelte, component.ts, styles.ts
-->
<script lang="ts">
  import type { BaseProps, VariantComponent, FullWidthComponent, ChildrenComponent, ClickHandler, InteractiveComponent } from '@ui/type/component'
  import { composeClasses } from '@ui/utils/styles'

  interface Props
    extends BaseProps,
      VariantComponent<'default' | 'elevated' | 'bordered'>,
      FullWidthComponent,
      ChildrenComponent,
      ClickHandler,
      InteractiveComponent {
    /** Padding variant for internal spacing @default 'normal' */
    padding?: 'none' | 'tight' | 'normal' | 'comfortable' | 'spacious'
    /** Border radius variant @default 'normal' */
    radius?: 'none' | 'small' | 'normal' | 'large'
    /** Whether to apply a subtle background @default true */
    background?: boolean
    /** Semantic color for background and borders @default 'neutral' */
    color?: 'neutral' | 'highlight' | 'success' | 'warning' | 'error'
    /** Minimum height variant for layout containers */
    minHeight?: 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl' | 'preview'
    /** Height variant for fixed height containers */
    height?: 'auto' | 'full' | 'screen' | 'xs' | 'small' | 'medium' | 'large' | 'xl'
    /** Minimum width variant for layout containers */
    minWidth?: 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl'
    /** Width variant for fixed width containers */
    width?: 'auto' | 'full'
    /** Whether to apply hover state styling */
    hover?: boolean
    /** Whether to apply active state styling */
    active?: boolean
  }

  let {
    variant = 'default',
    padding = 'normal',
    radius = 'normal',
    background = true,
    color = 'neutral',
    fullWidth = false,
    disabled = false,
    minHeight,
    height,
    minWidth,
    width,
    class: className = '',
    id,
    onclick,
    hover = false,
    active = false,
    children,
    ...restProps
  }: Props = $props()

  let containerClasses = $derived.by(() => {
    const base = 'block transition-all duration-200'

    // Color-based styles for backgrounds and borders
    const colorStyles = {
      neutral: {
        background: 'bg-surface',
        border: 'border-default',
        coloredBackground: 'bg-neutral-50',
        coloredBorder: 'border-neutral-300',
      },
      highlight: {
        background: 'bg-highlight-50',
        border: 'border-highlight',
        coloredBackground: 'bg-highlight-50',
        coloredBorder: 'border-highlight-200',
      },
      success: {
        background: 'bg-success-50',
        border: 'border-success',
        coloredBackground: 'bg-success-50',
        coloredBorder: 'border-success-200',
      },
      warning: {
        background: 'bg-warning-50',
        border: 'border-warning',
        coloredBackground: 'bg-warning-50',
        coloredBorder: 'border-warning-200',
      },
      error: {
        background: 'bg-error-50',
        border: 'border-error',
        coloredBackground: 'bg-error-50',
        coloredBorder: 'border-error-200',
      },
    }

    const variants = {
      default: (() => {
        if (color === 'neutral') {
          return background ? colorStyles.neutral.background : ''
        } else {
          return colorStyles[color].coloredBackground
        }
      })(),
      elevated: (() => {
        if (color === 'neutral') {
          return 'bg-surface-elevated shadow-[0_0_8px_rgba(0,0,0,0.1)]'
        } else {
          return `${colorStyles[color].coloredBackground} shadow-[0_0_8px_rgba(0,0,0,0.1)]`
        }
      })(),
      bordered: (() => {
        if (color === 'neutral') {
          const bgClass = background ? colorStyles.neutral.background : ''
          const borderClass = colorStyles.neutral.border
          return `${bgClass} border ${borderClass}`.trim()
        } else {
          const bgClass = colorStyles[color].coloredBackground
          const borderClass = colorStyles[color].coloredBorder
          return `${bgClass} border ${borderClass}`
        }
      })(),
    }

    const paddings = {
      none: '',
      tight: 'p-2',
      normal: 'p-4',
      comfortable: 'p-6',
      spacious: 'p-8',
    }

    const radiuses = {
      none: '',
      small: 'rounded-lg',
      normal: 'rounded-xl',
      large: 'rounded-2xl',
    }

    const minHeights = {
      xs: 'min-h-16', // 4rem = 64px
      small: 'min-h-24', // 6rem = 96px
      medium: 'min-h-32', // 8rem = 128px
      large: 'min-h-48', // 12rem = 192px
      xl: 'min-h-64', // 16rem = 256px
      xxl: 'min-h-80', // 20rem = 320px
      preview: 'min-h-[20rem]', // 20rem = 320px for preview containers
    }

    const heights = {
      auto: 'h-auto',
      full: 'h-full',
      screen: 'h-screen',
      xs: 'h-16', // 4rem = 64px
      small: 'h-24', // 6rem = 96px
      medium: 'h-32', // 8rem = 128px
      large: 'h-48', // 12rem = 192px
      xl: 'h-64', // 16rem = 256px
    }

    const minWidths = {
      xs: 'min-w-16', // 4rem = 64px
      small: 'min-w-24', // 6rem = 96px
      medium: 'min-w-32', // 8rem = 128px
      large: 'min-w-48', // 12rem = 192px
      xl: 'min-w-64', // 16rem = 256px
      xxl: 'min-w-80', // 20rem = 320px
    }

    const widths = {
      auto: 'w-auto',
      full: 'w-full',
    }

    const fullWidthClass = fullWidth ? 'w-full' : ''
    const minHeightClass = minHeight ? minHeights[minHeight] : ''
    const heightClass = height ? heights[height] : ''
    const minWidthClass = minWidth ? minWidths[minWidth] : ''
    const widthClass = width ? widths[width] : ''
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''
    const interactiveStyles = Boolean(onclick) && !disabled ? 'cursor-pointer hover:opacity-90' : ''
    const hoverStyles = hover && !disabled ? 'opacity-90' : ''
    const activeStyles = active && !disabled ? 'scale-[0.98]' : ''

    return composeClasses(
      base,
      variants[variant],
      paddings[padding],
      radiuses[radius],
      fullWidthClass,
      minHeightClass,
      heightClass,
      minWidthClass,
      widthClass,
      disabledStyles,
      interactiveStyles,
      hoverStyles,
      activeStyles,
      className
    )
  })

  function handleClick() {
    if (!disabled && onclick) {
      onclick()
    }
  }
</script>

{#if onclick}
  <button
    class="{containerClasses} border-none bg-transparent p-0 text-left"
    {id}
    onclick={handleClick}
    {disabled}
    {...restProps}
  >
    {#if children}
      {@render children()}
    {/if}
  </button>
{:else}
  <div class={containerClasses} {id} {...restProps}>
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
