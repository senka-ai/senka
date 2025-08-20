<!--
packages/layout-showcase/src/routes/grid-demo/+page.svelte
Grid Arrangement Demo - Multi-column grid layout showcase
Tests the GridArrangement implementation with UI library components
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/grid.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  // Import UI components - including new layout components
  import { Button, Divider, Container, LayoutDiv, StackLayout, RowLayout, GridLayout } from '@senka-ai/ui'
  // Import layout engine types
  import type { LayoutContainer } from '@senka-ai/layout-engine'
  import DemoNavigation from '$lib/components/DemoNavigation.svelte'
  // Import reusable control components
  import ColumnsPicker from '$lib/components/ColumnsPicker.svelte'
  import SpacingSlider from '$lib/components/SpacingSlider.svelte'
  import AlignmentPicker from '$lib/components/AlignmentPicker.svelte'
  import GridJustifyPicker from '$lib/components/GridJustifyPicker.svelte'
  import PropertyPanel from '$lib/components/PropertyPanel.svelte'
  import CSSDisplay from '$lib/components/CSSDisplay.svelte'

  // Reactive configuration state
  let columns = $state<number | 'auto'>(3)
  let spacing = $state<'none' | 'tight' | 'cozy' | 'normal' | 'comfortable' | 'spacious'>('normal')
  let alignment = $state<'start' | 'center' | 'end' | 'stretch'>('stretch')
  let justify = $state<'packed' | 'center' | 'space-between' | 'space-around'>('space-around')

  // Keep testContainer for demo purposes - shows the config object approach

  const testContainer = $derived<LayoutContainer>({
    id: 'demo-grid',
    type: 'grid',
    columns,
    fillContainer: true,
    gap: spacing,
    align: alignment,
    justify: justify,
  })

  // Handle control changes
  function handleColumnsChange(newColumns: number | 'auto') {
    columns = newColumns
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

  // Demo elements with VERY different content sizes to show clear alignment differences
  let demoElements = [
    {
      id: 'card1',
      title: 'Small',
      type: 'primary' as const,
      height: 'small' as const,
    },
    {
      id: 'card2',
      title: 'Large',
      type: 'secondary' as const,
      height: 'large' as const,
    },
    {
      id: 'card3',
      title: 'Medium',
      type: 'tertiary' as const,
      height: 'medium' as const,
    },
    {
      id: 'card4',
      title: 'Small',
      type: 'primary' as const,
      height: 'small' as const,
    },
    {
      id: 'card5',
      title: 'Another Small One',
      type: 'secondary' as const,
      height: 'small' as const,
    },
    {
      id: 'card6',
      title: 'Medium',
      type: 'tertiary' as const,
      height: 'medium' as const,
    },
  ]
</script>

<svelte:head>
  <title>Grid Demo - Layout Showcase</title>
  <meta name="description" content="Testing Grid arrangement from layout engine with multi-column layouts" />
</svelte:head>

<Container padding="comfortable" fullWidth background>
  <StackLayout direction="vertical" gap="spacious">
    <!-- Demo Navigation -->
    <DemoNavigation currentPage="grid" />

    <!-- Page Header -->
    <StackLayout gap="normal">
      <h1 class="text-h1 text-primary">Grid Arrangement Demo</h1>
      <p class="text-body-l text-secondary">
        Testing the Grid arrangement from the layout engine for multi-column layouts.
      </p>
    </StackLayout>

    <!-- Interactive Demo Section -->
    <StackLayout gap="comfortable">
      <!-- Grid Properties Panel -->
      <PropertyPanel title="Grid Properties" description="Adjust these settings to see live layout changes">
        <ColumnsPicker value={columns} onchange={handleColumnsChange} />

        <SpacingSlider value={spacing} onchange={handleSpacingChange} />

        <AlignmentPicker value={alignment} onchange={handleAlignmentChange} />

        <GridJustifyPicker value={justify} onchange={handleJustifyChange} />
      </PropertyPanel>

      <!-- Live Preview -->
      <StackLayout gap="normal">
        <h3 class="text-h4 text-primary">Live Preview</h3>

        <Container variant="bordered" padding="comfortable" radius="large" minHeight="preview">
          <!-- Demonstrating GridLayout component usage -->
          <GridLayout {columns} gap={spacing} align={alignment} {justify} class="h-full">
            {#each demoElements as element}
              <Container
                variant="elevated"
                padding="normal"
                radius="normal"
                height={alignment === 'stretch' ? 'auto' : element.height}
                minHeight={alignment === 'stretch' ? 'large' : undefined}
              >
                <StackLayout gap="tight">
                  <span class="text-body-m text-primary font-medium">{element.title}</span>
                  <Button variant={element.type} size="small">Open</Button>
                </StackLayout>
              </Container>
            {/each}
          </GridLayout>
        </Container>

        <p class="text-body-xs text-secondary">
          <strong>Current Configuration:</strong>
          Columns: {columns} • Spacing: {spacing} • Alignment: {alignment} • Justify: {justify}
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
