<!--
  packages/ui/src/lib/components/layout-engine/FrameLayout.svelte
  Quick frame layout component with sensible defaults
  Wrapper around LayoutDiv specifically optimized for frame layouts with auto-layout
  RELEVANT FILES: LayoutDiv.svelte, @senka-ai/layout-engine
-->

<script lang="ts">
  import LayoutDiv from './LayoutDiv.svelte'

  interface Props {
    /** Gap between items @default 'normal' */
    gap?: 'none' | 'tight' | 'cozy' | 'normal' | 'comfortable' | 'spacious'
    /** Whether to fill container @default true */
    fillContainer?: boolean
    /** Additional CSS classes to apply */
    class?: string
    /** Child content */
    children: any
    /** Allow other HTML attributes to pass through */
    [key: string]: any
  }

  let { gap = 'normal', fillContainer = true, class: className = '', children, ...restProps }: Props = $props()

  // Generate layout config for frame arrangement
  const frameConfig = $derived({
    id: `frame-${gap}`,
    type: 'frame' as const,
    gap,
    fillContainer,
  })
</script>

<LayoutDiv config={frameConfig} class={className} {...restProps}>
  {@render children()}
</LayoutDiv>
