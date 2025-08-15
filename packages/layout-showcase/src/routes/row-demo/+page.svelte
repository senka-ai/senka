<!--
packages/layout-showcase/src/routes/row-demo/+page.svelte
Row Arrangement Demo - Horizontal layout showcase
Tests the RowArrangement implementation with UI library components
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/row.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  // Import UI components
  import { Button, Divider } from '@senka-ai/ui'
  // Import layout engine - clean static import
  import { RowArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'
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

  // Reactive container configuration - no more 'as const' needed!
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
    { id: 'item1', content: 'Short Item', height: 60 },
    { id: 'item2', content: 'Medium Height Item', type: 'primary' as const, height: 100 },
    { id: 'item3', content: 'Tall Item with More Content', type: 'secondary' as const, height: 140 },
    { id: 'item4', content: 'Another Short', type: 'primary' as const, height: 80 },
  ]
</script>

<svelte:head>
  <title>Row Demo - Layout Showcase</title>
  <meta name="description" content="Testing Row arrangement from layout engine with horizontal layout" />
</svelte:head>

<main class="bg-background min-h-screen p-6">
  <div class="mx-auto max-w-4xl">
    <!-- Page Header -->
    <header class="mb-8">
      <div class="mb-4 flex items-center gap-4">
        <h1 class="text-h1 text-primary">Row Arrangement Demo</h1>
      </div>
      <p class="text-body-l text-secondary">
        Testing the Row arrangement from the layout engine for horizontal layouts.
      </p>
    </header>

    <Divider />

    <!-- Interactive Demo Section -->
    <section class="mt-8">
      <h2 class="text-h3 text-primary mb-4">Interactive Row Arrangement</h2>
      <p class="text-body-m text-secondary mb-6">
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
      <div class="mt-6 space-y-4">
        <h3 class="text-h4 text-primary">Live Preview</h3>

        <div class="bg-surface border-default min-h-80 rounded-xl border-2 p-6">
          <!-- Using layout engine generated CSS directly -->
          <div style={cssPropertiesToString(generatedCSS)} class="h-full">
            {#each demoElements as element, i}
              <div
                class="bg-surface-elevated border-default rounded-lg border p-4"
                style="min-width: {120 + i * 20}px; height: {element.height}px;"
              >
                <div class="space-y-2">
                  <span class="text-body-m text-primary block font-medium">{element.content}</span>
                  <Button variant={element.type} size="small">
                    {#snippet children()}
                      Action
                    {/snippet}
                  </Button>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <div class="text-body-xs text-secondary">
          <strong>Current Configuration:</strong>
          Wrap: {wrap ? 'enabled' : 'disabled'} • Spacing: {spacing} • Alignment: {alignment} • Justify: {justify}
        </div>
      </div>

      <!-- Generated CSS Display -->
      <div class="mt-6">
        <CSSDisplay css={cssPropertiesToString(generatedCSS)} title="Live Generated CSS" variant="success" />
      </div>
    </section>

    <!-- Action Buttons -->
    <section class="mt-8 flex gap-3">
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
    </section>
  </div>
</main>
