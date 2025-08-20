<!--
  packages/ui/src/lib/components/layout-engine/FlowLayout.svelte
  Quick flow layout component with sensible defaults
  Wrapper around LayoutDiv specifically optimized for flow layouts
  RELEVANT FILES: LayoutDiv.svelte, @senka-ai/layout-engine
-->

<script lang="ts">
  import LayoutDiv from './LayoutDiv.svelte'

  interface Props {
    /** Gap between items @default 'cozy' */
    gap?: 'none' | 'tight' | 'cozy' | 'normal' | 'comfortable' | 'spacious'
    /** Cross-axis alignment @default 'start' */
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
    gap = 'cozy',
    align = 'start',
    fillContainer = true,
    expandChildren = false,
    expand = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props()

  // Generate layout config for flow arrangement
  const flowConfig = $derived({
    id: `flow-${gap}-${align}-${expandChildren}`,
    type: 'flow' as const,
    gap,
    align,
    fillContainer,
    expandChildren,
  })

  // Add CSS classes based on expansion props
  const combinedClassName = $derived(
    (
      (expandChildren ? ' flow-expand-children' : '') +
      (expand ? ' expand' : '') +
      (className ? ` ${className}` : '')
    ).trim()
  )
</script>

<LayoutDiv config={flowConfig} class={combinedClassName} {...restProps}>
  {@render children()}
</LayoutDiv>
