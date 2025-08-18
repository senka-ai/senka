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
    /** Whether to fill container @default false for rows */
    fillContainer?: boolean
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
    fillContainer = false,
    class: className = '', 
    children, 
    ...restProps 
  }: Props = $props()
  
  // Generate layout config for row arrangement
  const rowConfig = $derived({
    id: `row-${gap}-${align}-${justify}`,
    type: 'row' as const,
    gap,
    align,
    justify,
    wrap,
    fillContainer,
  })
</script>

<LayoutDiv config={rowConfig} class={className} {...restProps}>
  {@render children()}
</LayoutDiv>