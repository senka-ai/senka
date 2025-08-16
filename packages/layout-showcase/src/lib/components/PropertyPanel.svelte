<!--
packages/layout-showcase/src/lib/components/PropertyPanel.svelte
Reusable property panel container for layout controls
Provides consistent styling and layout for demo control interfaces
RELEVANT FILES: packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { Divider } from '@senka-ai/ui'

  interface Props {
    title?: string
    description?: string
    children: any
  }

  let { title = 'Properties', description, children }: Props = $props()
</script>

<div class="bg-surface border-default space-y-6 rounded-xl border-2 p-6">
  <!-- Panel Header -->
  <header class="space-y-2">
    <h3 class="text-h4 text-primary font-medium">{title}</h3>
    {#if description}
      <p class="text-body-s text-secondary">{description}</p>
    {/if}
  </header>

  <Divider />

  <!-- Controls Content -->
  <div class="space-y-6">
    {@render children()}
  </div>
</div>
