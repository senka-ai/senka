<!--
  packages/ui/src/lib/components/layout-engine/StackLayout.svelte
  Quick stack layout component with sensible defaults
  Wrapper around LayoutDiv specifically optimized for stack layouts
  RELEVANT FILES: LayoutDiv.svelte, @senka-ai/layout-engine
-->

<script lang="ts">
  import LayoutDiv from './LayoutDiv.svelte'
  
  interface Props {
    /** Stack direction @default 'vertical' */
    direction?: 'horizontal' | 'vertical'
    /** Gap between items @default 'normal' */
    gap?: 'none' | 'tight' | 'cozy' | 'normal' | 'comfortable' | 'spacious'
    /** Cross-axis alignment @default 'stretch' */
    align?: 'start' | 'center' | 'end' | 'stretch'
    /** Whether to fill container @default true */
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
    direction = 'vertical', 
    gap = 'normal', 
    align = 'stretch',
    fillContainer = true,
    expandChildren = false,
    expand = false,
    class: className = '', 
    children, 
    ...restProps 
  }: Props = $props()
  
  // Generate layout config for stack arrangement
  const stackConfig = $derived({
    id: `stack-${direction}-${gap}-${align}-${expandChildren}`,
    type: 'stack' as const,
    direction,
    gap,
    align,
    fillContainer,
    expandChildren,
  })
  
  // Add CSS classes based on expansion props
  const combinedClassName = $derived(
    (
      (expandChildren ? ' stack-expand-children' : '') +
      (expand ? ' expand' : '') +
      (className ? ` ${className}` : '')
    ).trim()
  )
</script>

<LayoutDiv config={stackConfig} class={combinedClassName} {...restProps}>
  {@render children()}
</LayoutDiv>