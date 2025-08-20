<!--
packages/layout-showcase/src/routes/stack-demo/+page.svelte
Stack Arrangement Demo - First layout engine showcase example
Tests the current StackArrangement implementation with UI library components
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/stack.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  // Import UI components
  import { Button, Divider, Container, LayoutDiv, StackLayout, RowLayout } from '@senka-ai/ui'
  // Import layout engine types
  import type { LayoutContainer } from '@senka-ai/layout-engine'
  import DemoNavigation from '$lib/components/DemoNavigation.svelte'
  // Import reusable control components
  import DirectionToggle from '$lib/components/DirectionToggle.svelte'
  import SpacingSlider from '$lib/components/SpacingSlider.svelte'
  import AlignmentPicker from '$lib/components/AlignmentPicker.svelte'
  import PropertyPanel from '$lib/components/PropertyPanel.svelte'
  import CSSDisplay from '$lib/components/CSSDisplay.svelte'

  // Reactive configuration state
  let direction = $state<'vertical' | 'horizontal'>('vertical')
  let spacing = $state<'none' | 'tight' | 'cozy' | 'normal' | 'comfortable' | 'spacious'>('normal')
  let alignment = $state<'start' | 'center' | 'end' | 'stretch'>('stretch')

  // Keep one config example for demonstration
  const elementContentConfig: LayoutContainer = {
    id: 'element-content',
    type: 'stack',
    direction: 'vertical',
    gap: 'tight',
    fillContainer: true,
  }

  // Demo stack configuration that changes based on controls
  const testContainer = $derived<LayoutContainer>({
    id: 'demo-stack',
    type: 'stack',
    direction,
    fillContainer: true,
    gap: spacing,
    align: alignment,
  })

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
    { id: 'header', content: 'Header Element', type: 'primary' as const, minHeight: 'xs' as const },
    { id: 'content', content: 'Content Area', type: 'secondary' as const, minHeight: 'small' as const },
    { id: 'footer', content: 'Footer Element', type: 'tertiary' as const, minHeight: 'medium' as const },
  ]
</script>

<svelte:head>
  <title>Stack Demo - Layout Showcase</title>
  <meta name="description" content="Testing basic Stack arrangement from layout engine" />
</svelte:head>

<Container padding="comfortable" fullWidth background>
  {#snippet children()}
    <StackLayout direction="vertical" gap="spacious">
      {#snippet children()}
        <!-- Demo Navigation -->
        <DemoNavigation currentPage="stack" />

        <!-- Page Header -->
        <StackLayout gap="normal">
          {#snippet children()}
            <h1 class="text-h1 text-primary">Stack Arrangement Demo</h1>
            <p class="text-body-l text-secondary">Testing the basic Stack arrangement from the layout engine.</p>
          {/snippet}
        </StackLayout>

        <!-- Interactive Demo Section -->
        <StackLayout gap="comfortable">
          {#snippet children()}
            <!-- Stack Properties Panel -->
            <PropertyPanel title="Stack Properties" description="Adjust these settings to see live layout changes">
              <DirectionToggle value={direction} onchange={handleDirectionChange} />

              <SpacingSlider value={spacing} onchange={handleSpacingChange} />

              <AlignmentPicker value={alignment} onchange={handleAlignmentChange} />
            </PropertyPanel>

            <!-- Live Preview -->
            <StackLayout gap="normal">
              {#snippet children()}
                <h3 class="text-h4 text-primary">Live Preview</h3>

                <Container variant="bordered" padding="comfortable" radius="large" minHeight="preview">
                  {#snippet children()}
                    <!-- Demonstrating StackLayout component usage -->
                    <StackLayout {direction} gap={spacing} align={alignment} class="h-full">
                      {#snippet children()}
                        {#each demoElements as element, i}
                          <Container variant="elevated" padding="normal" radius="normal" minHeight={element.minHeight}>
                            {#snippet children()}
                              <StackLayout gap="tight">
                                {#snippet children()}
                                  <span class="text-body-m text-primary font-medium">{element.content}</span>
                                  <Button variant={element.type} size="small">
                                    {#snippet children()}
                                      Action
                                    {/snippet}
                                  </Button>
                                {/snippet}
                              </StackLayout>
                            {/snippet}
                          </Container>
                        {/each}
                      {/snippet}
                    </StackLayout>
                  {/snippet}
                </Container>

                <p class="text-body-xs text-secondary">
                  <strong>Current Configuration:</strong>
                  Direction: {direction} • Spacing: {spacing} • Alignment: {alignment}
                </p>
              {/snippet}
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
          {/snippet}
        </StackLayout>

        <!-- Action Buttons using RowLayout -->
        <RowLayout gap="normal" align="center" fillContainer={false}>
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
        </RowLayout>
      {/snippet}
    </StackLayout>
  {/snippet}
</Container>
