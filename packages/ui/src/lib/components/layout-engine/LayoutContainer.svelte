<!--
  packages/ui/src/lib/components/layout-engine/LayoutContainer.svelte
  Enhanced layout container that supports both presets and custom configs
  Provides the most convenient API for common layout patterns
  RELEVANT FILES: LayoutDiv.svelte, layout-presets.ts
-->

<script lang="ts">
  import type { LayoutContainer } from '@senka-ai/layout-engine'
  import LayoutDiv from './LayoutDiv.svelte'
  import { getLayoutPreset, type LayoutPreset } from '../../layout-presets'

  interface Props {
    /** Layout preset name or custom configuration object */
    preset?: LayoutPreset
    /** Custom layout configuration (overrides preset) */
    config?: LayoutContainer
    /** Additional CSS classes to apply */
    class?: string
    /** Child content */
    children: any
    /** Allow other HTML attributes to pass through */
    [key: string]: any
  }

  let { preset, config, class: className = '', children, ...restProps }: Props = $props()

  // Resolve the layout configuration
  const layoutConfig = $derived(() => {
    // If custom config provided, use it directly
    if (config) {
      return config
    }

    // If preset provided, get preset config
    if (preset) {
      return getLayoutPreset(preset)
    }

    // Fallback to default stack layout
    return {
      id: 'default-stack',
      type: 'stack' as const,
      direction: 'vertical' as const,
      gap: 'normal' as const,
      fillContainer: true,
    }
  })
</script>

<LayoutDiv config={layoutConfig()} class={className} {...restProps}>
  {@render children()}
</LayoutDiv>
