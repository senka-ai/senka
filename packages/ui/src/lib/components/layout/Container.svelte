<!--
  packages/ui/src/lib/components/layout/Container.svelte
  A simple, semantic container component for general content containment.
  Provides basic styling and structure without the complexity of Card component.
  RELEVANT FILES: Card.svelte, List.svelte, component.ts, styles.ts
-->
<script lang="ts">
  import type { BaseProps, VariantComponent, FullWidthComponent, ChildrenComponent } from '@type/component'
  import { createContainerStyles } from '@utils/styles'

  interface Props
    extends BaseProps,
      VariantComponent<'default' | 'elevated' | 'bordered'>,
      FullWidthComponent,
      ChildrenComponent {
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
    children,
    ...restProps
  }: Props = $props()

  let containerClasses = $derived(
    createContainerStyles({
      variant,
      padding,
      radius,
      background,
      color,
      fullWidth,
      disabled,
      minHeight,
      height,
      minWidth,
      width,
      className,
    })
  )
</script>

<div class={containerClasses} {id} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>
