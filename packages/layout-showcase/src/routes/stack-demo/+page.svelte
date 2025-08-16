<!--
packages/layout-showcase/src/routes/stack-demo/+page.svelte
Stack Arrangement Demo - First layout engine showcase example
Tests the current StackArrangement implementation with UI library components
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/stack.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  // Import UI components
  import { Button, Divider, Container } from '@senka-ai/ui'
  // Import layout engine - clean static import
  import { StackArrangement, RowArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'
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

  // Reactive container configuration - no more 'as const' needed!
  const testContainer = $derived({
    id: 'demo-stack',
    type: 'stack',
    direction,
    fillContainer: true,
    gap: spacing,
    align: alignment,
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

<Container padding="comfortable" fullWidth background>
  {#snippet children()}
    <div style={cssPropertiesToString(pageStack.toCSS(pageConfig))}>
      <!-- Page Header -->
      <div style={cssPropertiesToString(pageStack.toCSS(headerConfig))}>
        <h1 class="text-h1 text-primary">Stack Arrangement Demo</h1>
        <p class="text-body-l text-secondary">Testing the basic Stack arrangement from the layout engine.</p>
      </div>

      <Divider />

      <!-- Interactive Demo Section -->
      <div style={cssPropertiesToString(pageStack.toCSS(sectionConfig))}>
        <h2 class="text-h3 text-primary">Interactive Stack Arrangement</h2>
        <p class="text-body-m text-secondary">
          Use the controls below to modify the stack arrangement and see real-time CSS generation and layout updates.
        </p>

      <!-- Stack Properties Panel -->
      <PropertyPanel title="Stack Properties" description="Adjust these settings to see live layout changes">
        <DirectionToggle value={direction} onchange={handleDirectionChange} />

        <SpacingSlider value={spacing} onchange={handleSpacingChange} />

        <AlignmentPicker value={alignment} onchange={handleAlignmentChange} />
      </PropertyPanel>

        <!-- Live Preview -->
        <div style={cssPropertiesToString(pageStack.toCSS(previewConfig))}>
          <h3 class="text-h4 text-primary">Live Preview</h3>

          <Container variant="bordered" padding="comfortable" radius="large" style="min-height: 20rem;">
            {#snippet children()}
              <!-- Using layout engine generated CSS directly -->
              <div style={cssPropertiesToString(generatedCSS)} class="h-full">
                {#each demoElements as element, i}
                  <Container variant="elevated" padding="normal" radius="normal" style="min-height: {60 + i * 40}px;">
                    {#snippet children()}
                      <div style={cssPropertiesToString(pageStack.toCSS({
                        id: 'element-content',
                        type: 'stack',
                        direction: 'vertical',
                        gap: 'tight',
                        fillContainer: true,
                      }))}>
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
            Direction: {direction} • Spacing: {spacing} • Alignment: {alignment}
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
