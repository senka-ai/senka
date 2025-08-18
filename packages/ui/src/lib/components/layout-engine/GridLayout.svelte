<!--
  packages/ui/src/lib/components/layout-engine/GridLayout.svelte
  Quick grid layout component with sensible defaults
  Wrapper around LayoutDiv specifically optimized for grid layouts
  RELEVANT FILES: LayoutDiv.svelte, @senka-ai/layout-engine
-->

<script lang="ts">
  import LayoutDiv from './LayoutDiv.svelte'
  
  interface Props {
    /** Number of columns @default 'auto' */
    columns?: number | 'auto'
    /** Gap between items @default 'normal' */
    gap?: 'none' | 'tight' | 'cozy' | 'normal' | 'comfortable' | 'spacious'
    /** Cross-axis alignment @default 'stretch' */
    align?: 'start' | 'center' | 'end' | 'stretch'
    /** Main-axis justification @default 'space-around' (stretch) */
    justify?: 'packed' | 'space-between' | 'center' | 'space-around'
    /** Whether to fill container @default true */
    fillContainer?: boolean
    /** Additional CSS classes to apply */
    class?: string
    /** Child content */
    children: any
    /** Allow other HTML attributes to pass through */
    [key: string]: any
  }
  
  let { 
    columns = 'auto',
    gap = 'normal', 
    align = 'stretch',
    justify = 'space-around',
    fillContainer = true,
    class: className = '', 
    children, 
    ...restProps 
  }: Props = $props()
  
  // Generate layout config for grid arrangement
  const gridConfig = $derived({
    id: `grid-${columns}-${gap}-${align}-${justify}`,
    type: 'grid' as const,
    columns,
    gap,
    align,
    justify,
    fillContainer,
  })
</script>

<LayoutDiv config={gridConfig} class={className} {...restProps}>
  {@render children()}
</LayoutDiv>