<!--
  packages/ui/src/lib/components/layout-engine/LayoutDiv.svelte
  Layout-aware div component that integrates @senka-ai/layout-engine with the UI library
  Provides clean API for layout configurations with automatic CSS generation and caching
  RELEVANT FILES: Container.svelte, @senka-ai/layout-engine
-->

<script lang="ts">
  import type { LayoutContainer } from '@senka-ai/layout-engine'
  import {
    StackArrangement,
    RowArrangement,
    GridArrangement,
    FlowArrangement,
    OverlayArrangement,
    FrameArrangement,
  } from '@senka-ai/layout-engine'

  interface Props {
    /** Layout configuration object for the layout engine */
    config: LayoutContainer
    /** Additional CSS classes to apply */
    class?: string
    /** Child content */
    children: any
    /** Allow other HTML attributes to pass through */
    [key: string]: any
  }

  let { config, class: className = '', children, ...restProps }: Props = $props()

  // Get the appropriate arrangement instance based on config type
  function getArrangementInstance(type: string) {
    switch (type) {
      case 'stack':
        return new StackArrangement()
      case 'row':
        return new RowArrangement()
      case 'grid':
        return new GridArrangement()
      case 'flow':
        return new FlowArrangement()
      case 'overlay':
        return new OverlayArrangement()
      case 'frame':
        return new FrameArrangement()
      default:
        return new StackArrangement()
    }
  }

  // Generate inline styles from layout engine
  const layoutStyles = $derived.by(() => {
    try {
      const arrangement = getArrangementInstance(config.type)
      const cssProperties = arrangement.toCSS(config)

      // Convert CSS properties object to inline style string
      return Object.entries(cssProperties)
        .map(([key, value]) => `${key}: ${value}`)
        .join('; ')
    } catch (error) {
      console.warn('LayoutDiv: Failed to generate CSS properties:', error)
      return ''
    }
  })
</script>

<div class={className} style={layoutStyles} {...restProps}>
  {@render children()}
</div>
