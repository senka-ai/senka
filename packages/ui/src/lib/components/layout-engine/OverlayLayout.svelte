<!--
  packages/ui/src/lib/components/layout-engine/OverlayLayout.svelte
  Quick overlay layout component with sensible defaults
  Wrapper around LayoutDiv specifically optimized for overlay layouts
  RELEVANT FILES: LayoutDiv.svelte, @senka-ai/layout-engine
-->

<script lang="ts">
  import LayoutDiv from './LayoutDiv.svelte'
  
  interface Props {
    /** Overlay position @default 'center' */
    position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    /** Z-index for layering @default undefined */
    zIndex?: number
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
    position = 'center',
    zIndex,
    fillContainer = true,
    class: className = '', 
    children, 
    ...restProps 
  }: Props = $props()
  
  // Generate layout config for overlay arrangement
  const overlayConfig = $derived({
    id: `overlay-${position}-${zIndex || 'auto'}`,
    type: 'overlay' as const,
    position,
    zIndex,
    fillContainer,
  })
</script>

<LayoutDiv config={overlayConfig} class={className} {...restProps}>
  {@render children()}
</LayoutDiv>