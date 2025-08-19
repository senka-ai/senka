<!--
packages/layout-showcase/src/routes/stack-demo/+page.svelte
Stack Arrangement Demo - First layout engine showcase example
Tests the current StackArrangement implementation with UI library components
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/stack.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  // Import UI components
  import { Button, Divider, Container, LayoutDiv } from '@senka-ai/ui'
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
    <LayoutDiv config={pageConfig}>
      {#snippet children()}
        <!-- Demo Navigation -->
        <DemoNavigation currentPage="stack" />

        <!-- Page Header -->
        <LayoutDiv config={headerConfig}>
          {#snippet children()}
            <h1 class="text-h1 text-primary">Stack Arrangement Demo</h1>
            <p class="text-body-l text-secondary">Testing the basic Stack arrangement from the layout engine.</p>
          {/snippet}
        </LayoutDiv>

        <!-- Interactive Demo Section -->
        <LayoutDiv config={sectionConfig}>
          {#snippet children()}
            <!-- Stack Properties Panel -->
            <PropertyPanel title="Stack Properties" description="Adjust these settings to see live layout changes">
              <DirectionToggle value={direction} onchange={handleDirectionChange} />

              <SpacingSlider value={spacing} onchange={handleSpacingChange} />

              <AlignmentPicker value={alignment} onchange={handleAlignmentChange} />
            </PropertyPanel>

            <!-- Live Preview -->
            <LayoutDiv config={previewConfig}>
              {#snippet children()}
                <h3 class="text-h4 text-primary">Live Preview</h3>

                <Container variant="bordered" padding="comfortable" radius="large" minHeight="preview">
                  {#snippet children()}
                    <!-- Using layout engine generated CSS directly -->
                    <LayoutDiv config={testContainer} class="h-full">
                      {#snippet children()}
                        {#each demoElements as element, i}
                          <Container variant="elevated" padding="normal" radius="normal" minHeight={element.minHeight}>
                            {#snippet children()}
                              <LayoutDiv config={elementContentConfig}>
                                {#snippet children()}
                                  <span class="text-body-m text-primary font-medium">{element.content}</span>
                                  <Button variant={element.type} size="small">
                                    {#snippet children()}
                                      Action
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
                  Direction: {direction} • Spacing: {spacing} • Alignment: {alignment}
                </p>
              {/snippet}
            </LayoutDiv>

            <!-- Generated CSS Display -->
            <CSSDisplay
              css={JSON.stringify(testContainer, null, 2)}
              title="Live Configuration Object"
              variant="success"
            />
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
