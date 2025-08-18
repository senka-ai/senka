<!--
packages/layout-showcase/src/routes/grid-demo/+page.svelte
Grid Arrangement Demo - Multi-column grid layout showcase
Tests the GridArrangement implementation with UI library components
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/grid.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  // Import UI components - including new layout components
  import { Button, Divider, Container, LayoutDiv } from '@senka-ai/ui'
  // Import layout engine types
  import type { LayoutContainer } from '@senka-ai/layout-engine'
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

  // Page layout configurations
  const pageConfig: LayoutContainer = {
    id: 'page-layout',
    type: 'stack',
    direction: 'vertical',
    gap: 'spacious',
    fillContainer: true,
  }

  const headerConfig: LayoutContainer = {
    id: 'header-layout',
    type: 'stack',
    direction: 'vertical',
    gap: 'normal',
    fillContainer: true,
  }

  const sectionConfig: LayoutContainer = {
    id: 'section-layout',
    type: 'stack',
    direction: 'vertical',
    gap: 'comfortable',
    fillContainer: true,
  }

  const previewConfig: LayoutContainer = {
    id: 'preview-layout',
    type: 'stack',
    direction: 'vertical',
    gap: 'normal',
    fillContainer: true,
  }

  const actionsConfig: LayoutContainer = {
    id: 'actions-layout',
    type: 'row',
    gap: 'normal',
    align: 'center',
    fillContainer: false,
  }

  const elementContentConfig: LayoutContainer = {
    id: 'element-content',
    type: 'stack',
    direction: 'vertical',
    gap: 'tight',
    fillContainer: true,
  }

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
  {#snippet children()}
    <LayoutDiv config={pageConfig}>
      {#snippet children()}
        <!-- Page Header -->
        <LayoutDiv config={headerConfig}>
          {#snippet children()}
            <h1 class="text-h1 text-primary">Grid Arrangement Demo</h1>
            <p class="text-body-l text-secondary">
              Testing the Grid arrangement from the layout engine for multi-column layouts.
            </p>
          {/snippet}
        </LayoutDiv>

        <Divider />

        <!-- Interactive Demo Section -->
        <LayoutDiv config={sectionConfig}>
          {#snippet children()}
            <h2 class="text-h3 text-primary">Interactive Grid Arrangement</h2>
            <p class="text-body-m text-secondary">
              Use the controls below to modify the grid arrangement and see real-time CSS generation and layout updates.
            </p>

            <!-- Grid Properties Panel -->
            <PropertyPanel title="Grid Properties" description="Adjust these settings to see live layout changes">
              <ColumnsPicker value={columns} onchange={handleColumnsChange} />

              <SpacingSlider value={spacing} onchange={handleSpacingChange} />

              <AlignmentPicker value={alignment} onchange={handleAlignmentChange} />

              <GridJustifyPicker value={justify} onchange={handleJustifyChange} />
            </PropertyPanel>

            <!-- Live Preview -->
            <LayoutDiv config={previewConfig}>
              {#snippet children()}
                <h3 class="text-h4 text-primary">Live Preview</h3>

                <Container variant="bordered" padding="comfortable" radius="large" minHeight="preview">
                  {#snippet children()}
                    <LayoutDiv config={testContainer} class="h-full">
                      {#snippet children()}
                        {#each demoElements as element}
                          <Container
                            variant="elevated"
                            padding="normal"
                            radius="normal"
                            height={alignment === 'stretch' ? 'auto' : element.height}
                            minHeight={alignment === 'stretch' ? 'large' : undefined}
                          >
                            {#snippet children()}
                              <LayoutDiv config={elementContentConfig}>
                                {#snippet children()}
                                  <span class="text-body-m text-primary font-medium">{element.title}</span>
                                  <Button variant={element.type} size="small">
                                    {#snippet children()}
                                      Open
                                    {/snippet}
                                  </Button>
                                {/snippet}
                              </LayoutDiv>
                            {/snippet}
                          </Container>
                        {/each}
                      {/snippet}
                    </LayoutDiv>
                  {/snippet}
                </Container>

                <p class="text-body-xs text-secondary">
                  <strong>Current Configuration:</strong>
                  Columns: {columns} • Spacing: {spacing} • Alignment: {alignment} • Justify: {justify}
                </p>
              {/snippet}
            </LayoutDiv>

            <!-- Generated CSS Display -->
            <CSSDisplay css={JSON.stringify(testContainer, null, 2)} title="Live Configuration Object" variant="success" />
          {/snippet}
        </LayoutDiv>

        <!-- Action Buttons -->
        <LayoutDiv config={actionsConfig}>
          {#snippet children()}
            <Button variant="primary" onclick={() => window.location.reload()}>
              {#snippet children()}
                Reset Demo
              {/snippet}
            </Button>
            <Button variant="secondary" onclick={() => (window.location.href = '/')}>
              {#snippet children()}
                Back to Home
              {/snippet}
            </Button>
          {/snippet}
        </LayoutDiv>
      {/snippet}
    </LayoutDiv>
  {/snippet}
</Container>
