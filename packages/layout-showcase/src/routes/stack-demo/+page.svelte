<!--
packages/layout-showcase/src/routes/stack-demo/+page.svelte
Stack Arrangement Demo - First layout engine showcase example
Tests the current StackArrangement implementation with UI library components
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/stack.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  // Import UI components
  import { Button, Divider } from '@senka-ai/ui'
  // Import layout engine - clean static import
  import { StackArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'
  // Import reusable control components
  import DirectionToggle from '$lib/components/DirectionToggle.svelte'
  import SpacingSlider from '$lib/components/SpacingSlider.svelte'
  import AlignmentPicker from '$lib/components/AlignmentPicker.svelte'
  import PropertyPanel from '$lib/components/PropertyPanel.svelte'
  import CSSDisplay from '$lib/components/CSSDisplay.svelte'

  // Create layout engine instance
  const stackArrangement = new StackArrangement()

  // Reactive configuration state
  let direction = $state<'vertical' | 'horizontal'>('vertical')
  let spacing = $state<'none' | 'tight' | 'cozy' | 'normal' | 'comfortable' | 'spacious'>('normal')
  let alignment = $state<'start' | 'center' | 'end' | 'stretch'>('stretch')

  // Reactive container configuration
  const testContainer = $derived({
    id: 'demo-stack',
    arrangement: {
      type: 'stack' as const,
      direction,
    },
    autoLayout: {
      mode: 'fill-container' as const,
      gap: { scale: spacing },
      primaryAxis: 'packed' as const,
      counterAxis: alignment,
    },
    constraints: {},
    relationships: {},
  })

  // Generate CSS reactively when configuration changes
  const generatedCSS = $derived(stackArrangement.toCSS(testContainer))

  // Handle control changes
  function handleDirectionChange(newDirection: 'vertical' | 'horizontal') {
    direction = newDirection
  }

  function handleSpacingChange(newSpacing: typeof spacing) {
    spacing = newSpacing
  }

  function handleAlignmentChange(newAlignment: typeof alignment) {
    alignment = newAlignment
  }

  // Simple demo elements for testing
  let demoElements = [
    { id: 'header', content: 'Header Element', type: 'primary' as const },
    { id: 'content', content: 'Content Area', type: 'secondary' as const },
    { id: 'footer', content: 'Footer Element', type: 'tertiary' as const },
  ]
</script>

<svelte:head>
  <title>Stack Demo - Layout Showcase</title>
  <meta name="description" content="Testing basic Stack arrangement from layout engine" />
</svelte:head>

<main class="bg-background min-h-screen p-6">
  <div class="mx-auto max-w-4xl">
    <!-- Page Header -->
    <header class="mb-8">
      <div class="mb-4 flex items-center gap-4">
        <h1 class="text-h1 text-primary">Stack Arrangement Demo</h1>
      </div>
      <p class="text-body-l text-secondary">Testing the basic Stack arrangement from the layout engine.</p>
    </header>

    <Divider />

    <!-- Interactive Demo Section -->
    <section class="mt-8">
      <h2 class="text-h3 text-primary mb-4">Interactive Stack Arrangement</h2>
      <p class="text-body-m text-secondary mb-6">
        Use the controls below to modify the stack arrangement and see real-time CSS generation and layout updates.
      </p>

      <!-- Stack Properties Panel -->
      <PropertyPanel title="Stack Properties" description="Adjust these settings to see live layout changes">
        <DirectionToggle value={direction} onchange={handleDirectionChange} />

        <SpacingSlider value={spacing} onchange={handleSpacingChange} />

        <AlignmentPicker value={alignment} onchange={handleAlignmentChange} />
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
                style="min-height: {60 + i * 40}px;"
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
          Direction: {direction} • Spacing: {spacing} • Alignment: {alignment}
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
      <Button variant="secondary" onclick={() => window.location.href = '/'}>
        {#snippet children()}
          Back to Home
        {/snippet}
      </Button>
    </section>
  </div>
</main>
