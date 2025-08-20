<!--
packages/layout-showcase/src/routes/row-demo/+page.svelte
Row Arrangement Demo - Horizontal layout showcase
Tests the RowArrangement implementation with UI library components
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/row.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  // Import UI components
  import { Button, Divider, Container, LayoutDiv, StackLayout, RowLayout } from '@senka-ai/ui'
  // Import layout engine types
  import type { LayoutContainer } from '@senka-ai/layout-engine'
  import DemoNavigation from '$lib/components/DemoNavigation.svelte'
  // Import reusable control components
  import WrapToggle from '$lib/components/WrapToggle.svelte'
  import SpacingSlider from '$lib/components/SpacingSlider.svelte'
  import AlignmentPicker from '$lib/components/AlignmentPicker.svelte'
  import JustifyPicker from '$lib/components/JustifyPicker.svelte'
  import PropertyPanel from '$lib/components/PropertyPanel.svelte'
  import CSSDisplay from '$lib/components/CSSDisplay.svelte'

  // Reactive configuration state
  let wrap = $state<boolean>(false)
  let spacing = $state<'none' | 'tight' | 'cozy' | 'normal' | 'comfortable' | 'spacious'>('normal')
  let alignment = $state<'start' | 'center' | 'end' | 'stretch'>('center')
  let justify = $state<'packed' | 'space-between' | 'center' | 'space-around'>('packed')

  // Keep testContainer for demo purposes - shows the config object approach

  const testContainer = $derived<LayoutContainer>({
    id: 'demo-row',
    type: 'row',
    wrap,
    fillContainer: true,
    gap: spacing,
    align: alignment,
    justify: justify,
  })

  // Handle control changes
  function handleWrapChange(newWrap: boolean) {
    wrap = newWrap
  }

  function handleSpacingChange(newSpacing: typeof spacing) {
    spacing = newSpacing
  }

  function handleAlignmentChange(newAlignment: typeof alignment) {
    alignment = newAlignment
  }

  function handleJustifyChange(newJustify: typeof justify) {
    justify = newJustify
  }

  // Demo elements with different heights to show cross-axis alignment
  let demoElements = [
    { id: 'item1', content: 'Short Item', height: 'small' as const, minWidth: 'medium' as const },
    {
      id: 'item2',
      content: 'Medium Height Item',
      type: 'primary' as const,
      height: 'medium' as const,
      minWidth: 'medium' as const,
    },
    {
      id: 'item3',
      content: 'Tall Item with More Content',
      type: 'secondary' as const,
      height: 'large' as const,
      minWidth: 'large' as const,
    },
    {
      id: 'item4',
      content: 'Another Short',
      type: 'primary' as const,
      height: 'small' as const,
      minWidth: 'large' as const,
    },
  ]
</script>

<svelte:head>
  <title>Row Demo - Layout Showcase</title>
  <meta name="description" content="Testing Row arrangement from layout engine with horizontal layout" />
</svelte:head>

<Container padding="comfortable" fullWidth background>
  <StackLayout direction="vertical" gap="spacious">
    <!-- Demo Navigation -->
    <DemoNavigation currentPage="row" />

    <!-- Page Header -->
    <StackLayout gap="normal">
      <h1 class="text-h1 text-primary">Row Arrangement Demo</h1>
      <p class="text-body-l text-secondary">
        Testing the Row arrangement from the layout engine for horizontal layouts.
      </p>
    </StackLayout>

    <!-- Interactive Demo Section -->
    <StackLayout gap="comfortable">
      <!-- Row Properties Panel -->
      <PropertyPanel title="Row Properties" description="Adjust these settings to see live layout changes">
        <WrapToggle value={wrap} onchange={handleWrapChange} />

        <SpacingSlider value={spacing} onchange={handleSpacingChange} />

        <AlignmentPicker value={alignment} onchange={handleAlignmentChange} />

        <JustifyPicker value={justify} onchange={handleJustifyChange} />
      </PropertyPanel>

      <!-- Live Preview -->
      <StackLayout gap="normal">
        <h3 class="text-h4 text-primary">Live Preview</h3>

        <Container variant="bordered" padding="comfortable" radius="large" minHeight="preview">
          <!-- Demonstrating RowLayout component usage -->
          <RowLayout {wrap} gap={spacing} align={alignment} {justify} class="h-full">
            {#each demoElements as element}
              <Container
                variant="elevated"
                padding="normal"
                radius="normal"
                height={element.height}
                minWidth={element.minWidth}
                minHeight={alignment === 'stretch' ? 'large' : undefined}
              >
                <StackLayout gap="tight">
                  <span class="text-body-m text-primary font-medium">{element.content}</span>
                  <Button variant={element.type} size="small">Action</Button>
                </StackLayout>
              </Container>
            {/each}
          </RowLayout>
        </Container>

        <p class="text-body-xs text-secondary">
          <strong>Current Configuration:</strong>
          Wrap: {wrap ? 'enabled' : 'disabled'} • Spacing: {spacing} • Alignment: {alignment} • Justify: {justify}
        </p>
      </StackLayout>

      <!-- Show config object approach for comparison -->
      <h4 class="text-h4 text-primary">Configuration Object Approach</h4>
      <p class="text-body-m text-secondary">
        This same layout can also be created using LayoutDiv with configuration objects:
      </p>
      <CSSDisplay
        css={JSON.stringify(testContainer, null, 2)}
        title="Equivalent Configuration Object"
        variant="success"
      />
    </StackLayout>

    <!-- Action Buttons using RowLayout -->
    <RowLayout gap="normal" align="center" fillContainer={false}>
      <Button variant="primary" onclick={() => window.location.reload()}>Reset Demo</Button>
      <Button variant="secondary" onclick={() => (window.location.href = '/')}>Back to Home</Button>
    </RowLayout>
  </StackLayout>
</Container>
