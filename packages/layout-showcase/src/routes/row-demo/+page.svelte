<!--
packages/layout-showcase/src/routes/row-demo/+page.svelte
Row Arrangement Demo - Horizontal layout showcase
Tests the RowArrangement implementation with UI library components
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/row.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  // Import UI components
  import { Button, Divider, Container } from '@senka-ai/ui'
  // Import layout engine - clean static import
  import { RowArrangement, StackArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'
  // Import reusable control components
  import WrapToggle from '$lib/components/WrapToggle.svelte'
  import SpacingSlider from '$lib/components/SpacingSlider.svelte'
  import AlignmentPicker from '$lib/components/AlignmentPicker.svelte'
  import JustifyPicker from '$lib/components/JustifyPicker.svelte'
  import PropertyPanel from '$lib/components/PropertyPanel.svelte'
  import CSSDisplay from '$lib/components/CSSDisplay.svelte'

  // Create layout engine instance
  const rowArrangement = new RowArrangement()

  // Reactive configuration state
  let wrap = $state<boolean>(false)
  let spacing = $state<'none' | 'tight' | 'cozy' | 'normal' | 'comfortable' | 'spacious'>('normal')
  let alignment = $state<'start' | 'center' | 'end' | 'stretch'>('center')
  let justify = $state<'packed' | 'space-between' | 'center' | 'space-around'>('packed')

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
    id: 'demo-row',
    type: 'row',
    wrap,
    fillContainer: true,
    gap: spacing,
    align: alignment,
    justify: justify,
  })

  // Generate CSS reactively when configuration changes
  const generatedCSS = $derived(rowArrangement.toCSS(testContainer))

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
  {#snippet children()}
    <div style={cssPropertiesToString(pageStack.toCSS(pageConfig))}>
      <!-- Page Header -->
      <div style={cssPropertiesToString(pageStack.toCSS(headerConfig))}>
        <h1 class="text-h1 text-primary">Row Arrangement Demo</h1>
        <p class="text-body-l text-secondary">
          Testing the Row arrangement from the layout engine for horizontal layouts.
        </p>
      </div>

      <Divider />

      <!-- Interactive Demo Section -->
      <div style={cssPropertiesToString(pageStack.toCSS(sectionConfig))}>
        <h2 class="text-h3 text-primary">Interactive Row Arrangement</h2>
        <p class="text-body-m text-secondary">
          Use the controls below to modify the row arrangement and see real-time CSS generation and layout updates.
        </p>

        <!-- Row Properties Panel -->
        <PropertyPanel title="Row Properties" description="Adjust these settings to see live layout changes">
          <WrapToggle value={wrap} onchange={handleWrapChange} />

          <SpacingSlider value={spacing} onchange={handleSpacingChange} />

          <AlignmentPicker value={alignment} onchange={handleAlignmentChange} />

          <JustifyPicker value={justify} onchange={handleJustifyChange} />
        </PropertyPanel>

        <!-- Live Preview -->
        <div style={cssPropertiesToString(pageStack.toCSS(previewConfig))}>
          <h3 class="text-h4 text-primary">Live Preview</h3>

          <Container variant="bordered" padding="comfortable" radius="large" minHeight="preview">
            {#snippet children()}
              <!-- Using layout engine generated CSS directly -->
              <div style={cssPropertiesToString(generatedCSS)} class="h-full">
                {#each demoElements as element}
                  <Container
                    variant="elevated"
                    padding="normal"
                    radius="normal"
                    height={element.height}
                    minWidth={element.minWidth}
                    minHeight={alignment === 'stretch' ? 'large' : undefined}
                  >
                    {#snippet children()}
                      <div
                        style={cssPropertiesToString(
                          pageStack.toCSS({
                            id: 'element-content',
                            type: 'stack',
                            direction: 'vertical',
                            gap: 'tight',
                            fillContainer: true,
                          })
                        )}
                      >
                        <span class="text-body-m text-primary font-medium">{element.content}</span>
                        <Button variant={element.type} size="small">
                          {#snippet children()}
                            Action
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
            Wrap: {wrap ? 'enabled' : 'disabled'} • Spacing: {spacing} • Alignment: {alignment} • Justify: {justify}
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
