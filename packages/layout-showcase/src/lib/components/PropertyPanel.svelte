<!--
packages/layout-showcase/src/lib/components/PropertyPanel.svelte
Reusable property panel container for layout controls
Provides consistent styling and layout for demo control interfaces
RELEVANT FILES: packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { Container, Divider } from '@senka-ai/ui'
  import { StackArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  interface Props {
    title?: string
    description?: string
    children: any
  }

  let { title = 'Properties', description, children }: Props = $props()

  // Save the children prop before we use it in the snippet context
  const panelChildren = children

  // Use StackArrangement for vertical layout of panel sections
  const stack = new StackArrangement()
  const headerConfig = {
    id: 'panel-header',
    type: 'stack',
    direction: 'vertical',
    gap: 'tight',
    fillContainer: true,
  }
  const contentConfig = {
    id: 'panel-content',
    type: 'stack',
    direction: 'vertical',
    gap: 'comfortable',
    fillContainer: true,
  }
</script>

<Container variant="bordered" padding="comfortable" radius="large">
  {#snippet children()}
    <!-- Panel Header -->
    <div style={cssPropertiesToString(stack.toCSS(headerConfig))}>
      <h3 class="text-h4 text-primary font-medium">{title}</h3>
      {#if description}
        <p class="text-body-s text-secondary">{description}</p>
      {/if}
    </div>

    <Divider />

    <!-- Controls Content -->
    <div style={cssPropertiesToString(stack.toCSS(contentConfig))}>
      {@render panelChildren()}
    </div>
  {/snippet}
</Container>
