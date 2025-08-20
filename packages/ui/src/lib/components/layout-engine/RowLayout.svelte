<!--
  packages/ui/src/lib/components/layout-engine/RowLayout.svelte
  Quick row layout component with sensible defaults
  Wrapper around LayoutDiv specifically optimized for row layouts
  RELEVANT FILES: LayoutDiv.svelte, @senka-ai/layout-engine
-->

<script lang="ts">
  import LayoutDiv from './LayoutDiv.svelte'

  interface Props {
    /** Gap between items @default 'normal' */
    gap?: 'none' | 'tight' | 'cozy' | 'normal' | 'comfortable' | 'spacious'
    /** Cross-axis alignment @default 'center' */
    align?: 'start' | 'center' | 'end' | 'stretch'
    /** Main-axis justification @default 'packed' */
    justify?: 'packed' | 'space-between' | 'center' | 'space-around'
    /** Whether to wrap items @default false */
    wrap?: boolean
    /** Whether to fill container @default true for justification to work */
    fillContainer?: boolean
    /** Make all children expand to fill main-axis space @default false */
    expandChildren?: boolean
    /** Make this component expand within its parent container @default false */
    expand?: boolean
    /** Additional CSS classes to apply */
    class?: string
    /** Child content */
    children: any
    /** Allow other HTML attributes to pass through */
    [key: string]: any
  }

  let {
    gap = 'normal',
    align = 'center',
    justify = 'packed',
    wrap = false,
    fillContainer = true,
    expandChildren = false,
    expand = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props()

  // Generate layout config for row arrangement
  const rowConfig = $derived({
    id: `row-${gap}-${align}-${justify}-${expandChildren}`,
    type: 'row' as const,
    gap,
    align,
    justify,
    wrap,
    fillContainer,
    expandChildren,
  })

  // Add CSS classes based on expansion props
  const combinedClassName = $derived(
    (
      (expandChildren ? ' row-expand-children' : '') +
      (expand ? ' expand' : '') +
      (className ? ` ${className}` : '')
    ).trim()
  )
</script>

<LayoutDiv config={rowConfig} class={combinedClassName} {...restProps}>
  {@render children()}
</LayoutDiv>
