<!--
packages/layout-showcase/src/routes/row-demo/+page.svelte
Row Arrangement Demo - Horizontal layout showcase
Tests the RowArrangement implementation with UI library components
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/row.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  // Import UI components
  import { Button, Divider, Container, LayoutDiv } from '@senka-ai/ui'
  // Import layout engine types
  import type { LayoutContainer } from '@senka-ai/layout-engine'
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
  {#snippet children()}
    <LayoutDiv config={pageConfig}>
      {#snippet children()}
        <!-- Page Header -->
        <LayoutDiv config={headerConfig}>
          {#snippet children()}
            <h1 class="text-h1 text-primary">Row Arrangement Demo</h1>
            <p class="text-body-l text-secondary">
              Testing the Row arrangement from the layout engine for horizontal layouts.
            </p>
          {/snippet}
        </LayoutDiv>

        <Divider />

        <!-- Interactive Demo Section -->
        <LayoutDiv config={sectionConfig}>
          {#snippet children()}
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
            <LayoutDiv config={previewConfig}>
              {#snippet children()}
                <h3 class="text-h4 text-primary">Live Preview</h3>

                <Container variant="bordered" padding="comfortable" radius="large" minHeight="preview">
                  {#snippet children()}
                    <!-- Using layout engine generated CSS directly -->
                    <LayoutDiv config={testContainer} class="h-full">
                      {#snippet children()}
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
                              <LayoutDiv config={{
                                id: 'element-content',
                                type: 'stack',
                                direction: 'vertical',
                                gap: 'tight',
                                fillContainer: true,
                              }}>
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
                  Wrap: {wrap ? 'enabled' : 'disabled'} • Spacing: {spacing} • Alignment: {alignment} • Justify: {justify}
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
