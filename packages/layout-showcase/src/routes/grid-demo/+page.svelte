<!--
packages/layout-showcase/src/routes/grid-demo/+page.svelte
Grid Arrangement Demo - Multi-column grid layout showcase
Tests the GridArrangement implementation with UI library components
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/grid.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  // Import UI components
  import { Button, Divider, Container } from '@senka-ai/ui'
  // Import layout engine - clean static import
  import { GridArrangement, StackArrangement, RowArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'
  // Import reusable control components
  import ColumnsPicker from '$lib/components/ColumnsPicker.svelte'
  import SpacingSlider from '$lib/components/SpacingSlider.svelte'
  import AlignmentPicker from '$lib/components/AlignmentPicker.svelte'
  import GridJustifyPicker from '$lib/components/GridJustifyPicker.svelte'
  import PropertyPanel from '$lib/components/PropertyPanel.svelte'
  import CSSDisplay from '$lib/components/CSSDisplay.svelte'

  // Create layout engine instance
  const gridArrangement = new GridArrangement()

  // Reactive configuration state
  let columns = $state<number | 'auto'>(3)
  let spacing = $state<'none' | 'tight' | 'cozy' | 'normal' | 'comfortable' | 'spacious'>('normal')
  let alignment = $state<'start' | 'center' | 'end' | 'stretch'>('stretch')
  let justify = $state<'packed' | 'center' | 'space-between' | 'space-around'>('space-around')

  // Page layout configurations
  const pageStack = new StackArrangement()
  const pageRow = new RowArrangement()
  const pageConfig = {
    id: 'page-layout',
    type: 'stack',
    direction: 'vertical',
    gap: 'spacious',
    fillContainer: true,
  }

  const headerConfig = {
    id: 'header-layout',
    type: 'stack',
    direction: 'vertical',
    gap: 'normal',
    fillContainer: true,
  }

  const sectionConfig = {
    id: 'section-layout',
    type: 'stack',
    direction: 'vertical',
    gap: 'comfortable',
    fillContainer: true,
  }

  const previewConfig = {
    id: 'preview-layout',
    type: 'stack',
    direction: 'vertical',
    gap: 'normal',
    fillContainer: true,
  }

  const actionsConfig = {
    id: 'actions-layout',
    type: 'row',
    gap: 'normal',
    align: 'center',
    fillContainer: false,
  }

  const testContainer = $derived({
    id: 'demo-grid',
    type: 'grid',
    columns,
    fillContainer: true,
    gap: spacing,
    align: alignment,
    justify: justify,
  })

  // Generate CSS reactively when configuration changes
  const generatedCSS = $derived(gridArrangement.toCSS(testContainer))

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
      content: 'Content',
      type: 'secondary' as const,
      height: 'large' as const,
    },
    {
      id: 'card3',
      title: 'Medium',
      content: 'Medium content',
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
      content: 'Short',
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
    <div style={cssPropertiesToString(pageStack.toCSS(pageConfig))}>
      <!-- Page Header -->
      <div style={cssPropertiesToString(pageStack.toCSS(headerConfig))}>
        <h1 class="text-h1 text-primary">Grid Arrangement Demo</h1>
        <p class="text-body-l text-secondary">
          Testing the Grid arrangement from the layout engine for multi-column layouts.
        </p>
      </div>

      <Divider />

      <!-- Interactive Demo Section -->
      <div style={cssPropertiesToString(pageStack.toCSS(sectionConfig))}>
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
        <div style={cssPropertiesToString(pageStack.toCSS(previewConfig))}>
          <h3 class="text-h4 text-primary">Live Preview</h3>

          <Container variant="bordered" padding="comfortable" radius="large" minHeight="preview">
            {#snippet children()}
              <div style={cssPropertiesToString(generatedCSS)} class="h-full">
                {#each demoElements as element}
                  <Container
                    variant="elevated"
                    padding="normal"
                    radius="normal"
                    height={alignment === 'stretch' ? 'auto' : element.height}
                    minHeight={alignment === 'stretch' ? 'large' : undefined}
                  >
                    {#snippet children()}
                      <div
                        style={cssPropertiesToString(
                          pageStack.toCSS({
                            id: 'grid-element-content',
                            type: 'stack',
                            direction: 'vertical',
                            gap: 'tight',
                            fillContainer: true,
                          })
                        )}
                      >
                        <span class="text-body-m text-primary font-medium">{element.title}</span>
                        <p class="text-body-s text-secondary">{element.content}</p>
                        <Button variant={element.type} size="small">
                          {#snippet children()}
                            Open
                          {/snippet}
                        </Button>
                      </div>
                    {/snippet}
                  </Container>
                {/each}
              </div>
            {/snippet}
          </Container>

          <p class="text-body-xs text-secondary">
            <strong>Current Configuration:</strong>
            Columns: {columns} • Spacing: {spacing} • Alignment: {alignment} • Justify: {justify}
          </p>
        </div>

        <!-- Generated CSS Display -->
        <CSSDisplay css={cssPropertiesToString(generatedCSS)} title="Live Generated CSS" variant="success" />
      </div>

      <!-- Action Buttons -->
      <div style={cssPropertiesToString(pageRow.toCSS(actionsConfig))}>
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
      </div>
    </div>
  {/snippet}
</Container>
