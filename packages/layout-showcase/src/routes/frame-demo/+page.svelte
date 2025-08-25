<!--
packages/layout-showcase/src/routes/frame-demo/+page.svelte
Frame Arrangement Demo - Showcases constraint-based container system
Tests FrameLayout component with design-tool-style constraints and behaviors
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/frame.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  // Import UI components
  import {
    Button,
    Container,
    LayoutDiv,
    StackLayout,
    RowLayout,
    Badge,
    Divider,
    Toggle,
    RadioGroup,
    RadioButton,
  } from '@senka-ai/ui'
  // Import layout engine types
  import type { LayoutContainer } from '@senka-ai/layout-engine'
  import DemoNavigation from '$lib/components/DemoNavigation.svelte'
  // Import reusable control components
  import SpacingSlider from '$lib/components/SpacingSlider.svelte'
  import PropertyPanel from '$lib/components/PropertyPanel.svelte'
  import CSSDisplay from '$lib/components/CSSDisplay.svelte'

  // Reactive configuration state
  let direction = $state<'horizontal' | 'vertical' | 'none'>('none')
  let spacing = $state<'none' | 'tight' | 'cozy' | 'normal' | 'comfortable' | 'spacious'>('normal')
  let fillContainer = $state(true)
  let useConstraints = $state(false)

  // Constraint settings
  let widthBehavior = $state<'fixed' | 'fill' | 'hug'>('hug')
  let heightBehavior = $state<'fixed' | 'fill' | 'hug'>('hug')
  let centerH = $state(false)
  let centerV = $state(false)

  // Demo frame configuration that changes based on controls
  const demoFrameConfig = $derived<LayoutContainer>({
    id: 'demo-frame',
    type: 'frame',
    direction: direction === 'none' ? undefined : direction,
    fillContainer,
    gap: spacing,
  })

  // Direction options
  const directionOptions = [
    { value: 'none', label: 'Container Mode' },
    { value: 'horizontal', label: 'Flex Horizontal' },
    { value: 'vertical', label: 'Flex Vertical' },
  ]

  const widthOptions = [
    { value: 'hug', label: 'Hug Contents' },
    { value: 'fill', label: 'Fill Container' },
    { value: 'fixed', label: 'Fixed Width' },
  ]

  const heightOptions = [
    { value: 'hug', label: 'Hug Contents' },
    { value: 'fill', label: 'Fill Container' },
    { value: 'fixed', label: 'Fixed Height' },
  ]

  // Handle control changes
  function handleDirectionChange(newDirection: string) {
    direction = newDirection as 'horizontal' | 'vertical' | 'none'
  }

  function handleSpacingChange(newSpacing: typeof spacing) {
    spacing = newSpacing
  }

  function handleWidthChange(newWidth: string) {
    widthBehavior = newWidth as typeof widthBehavior
  }

  function handleHeightChange(newHeight: string) {
    heightBehavior = newHeight as typeof heightBehavior
  }

  // Demo elements for testing different content types
  let demoElements = [
    { id: 'header', content: 'Header Section', type: 'primary' as const, size: 'medium' as const },
    { id: 'content', content: 'Main Content', type: 'secondary' as const, size: 'large' as const },
    { id: 'sidebar', content: 'Sidebar', type: 'tertiary' as const, size: 'small' as const },
  ]

  // Show different numbers of elements
  let elementCount = $state(2)
  const visibleElements = $derived(demoElements.slice(0, elementCount))
</script>

<svelte:head>
  <title>Frame Demo - Layout Showcase</title>
  <meta name="description" content="Testing Frame arrangement with constraint-based layout system" />
</svelte:head>

<Container padding="comfortable" fullWidth background>
  <StackLayout direction="vertical" gap="spacious">
    <!-- Demo Navigation -->
    <DemoNavigation currentPage="frame" />

    <!-- Page Header -->
    <StackLayout gap="normal">
      <h1 class="text-h1 text-primary">Frame Arrangement Demo</h1>
      <p class="text-body-l text-secondary">
        Frame provides a constraint-based container that adapts between simple containers and flex layouts.
      </p>
      <RowLayout gap="tight">
        <Badge variant="default" value="Constraint-based"></Badge>
        <Badge variant="success" value="Adaptive"></Badge>
        <Badge variant="warning" value="Design-tool-style"></Badge>
      </RowLayout>
    </StackLayout>

    <!-- Interactive Demo Section -->
    <StackLayout gap="comfortable">
      <!-- Frame Properties Panel -->
      <PropertyPanel title="Frame Properties" description="Adjust settings to see how Frame adapts its behavior">
        <StackLayout gap="normal">
          <!-- Direction Control -->
          <StackLayout gap="tight">
            <span class="text-body-s text-secondary font-medium">Frame Mode:</span>
            <RadioGroup name="direction" value={direction} onchange={handleDirectionChange}>
              {#each directionOptions as option}
                <RadioButton value={option.value} label={option.label} />
              {/each}
            </RadioGroup>
            <p class="text-body-xs text-muted">Container mode for simple content, flex modes for multiple elements</p>
          </StackLayout>

          <Divider />

          <!-- Element Count Control -->
          <StackLayout gap="tight">
            <span class="text-body-s text-secondary font-medium">Elements: {elementCount}</span>
            <RowLayout gap="tight">
              <Button
                variant="secondary"
                size="small"
                onclick={() => (elementCount = Math.max(1, elementCount - 1))}
                disabled={elementCount <= 1}
              >
                Remove
              </Button>
              <Button
                variant="secondary"
                size="small"
                onclick={() => (elementCount = Math.min(3, elementCount + 1))}
                disabled={elementCount >= 3}
              >
                Add
              </Button>
            </RowLayout>
          </StackLayout>

          <Divider />

          <!-- Spacing Control -->
          <SpacingSlider value={spacing} onchange={handleSpacingChange} />

          <Divider />

          <!-- Fill Container Toggle -->
          <RowLayout gap="normal" align="center">
            <Toggle checked={fillContainer} onchange={(v) => (fillContainer = v)} />
            <span class="text-body-s text-primary">Fill Container</span>
          </RowLayout>

          <Divider />

          <!-- Constraints Section -->
          <StackLayout gap="tight">
            <RowLayout gap="normal" align="center">
              <Toggle checked={useConstraints} onchange={(v) => (useConstraints = v)} />
              <span class="text-body-s text-primary">Enable Constraints (Demo)</span>
            </RowLayout>

            {#if useConstraints}
              <StackLayout gap="normal">
                <StackLayout gap="tight">
                  <span class="text-body-s text-secondary font-medium">Width Behavior:</span>
                  <RadioGroup name="width" value={widthBehavior} onchange={handleWidthChange}>
                    {#each widthOptions as option}
                      <RadioButton value={option.value} label={option.label} />
                    {/each}
                  </RadioGroup>
                </StackLayout>

                <StackLayout gap="tight">
                  <span class="text-body-s text-secondary font-medium">Height Behavior:</span>
                  <RadioGroup name="height" value={heightBehavior} onchange={handleHeightChange}>
                    {#each heightOptions as option}
                      <RadioButton value={option.value} label={option.label} />
                    {/each}
                  </RadioGroup>
                </StackLayout>

                <StackLayout gap="tight">
                  <span class="text-body-s text-secondary font-medium">Positioning:</span>
                  <RowLayout gap="normal">
                    <RowLayout gap="tight" align="center">
                      <Toggle checked={centerH} onchange={(v) => (centerH = v)} />
                      <span class="text-body-xs text-primary">Center H</span>
                    </RowLayout>
                    <RowLayout gap="tight" align="center">
                      <Toggle checked={centerV} onchange={(v) => (centerV = v)} />
                      <span class="text-body-xs text-primary">Center V</span>
                    </RowLayout>
                  </RowLayout>
                </StackLayout>
              </StackLayout>
            {/if}
          </StackLayout>
        </StackLayout>
      </PropertyPanel>

      <!-- Live Preview -->
      <StackLayout gap="normal">
        <h3 class="text-h4 text-primary">Live Preview</h3>

        <Container variant="bordered" padding="comfortable" radius="large" minHeight="preview">
          <!-- Demonstrating FrameLayout component usage -->
          <LayoutDiv config={demoFrameConfig} class="h-full w-full">
            {#each visibleElements as element}
              <Container variant="elevated" padding="normal" radius="normal" minHeight={element.size}>
                <StackLayout gap="tight">
                  <span class="text-body-m text-primary font-medium">{element.content}</span>
                  <Button variant={element.type} size="small">Action Button</Button>
                </StackLayout>
              </Container>
            {/each}
          </LayoutDiv>
        </Container>

        <p class="text-body-xs text-secondary">
          <strong>Current Configuration:</strong>
          Mode: {direction === 'none' ? 'container' : direction} • Elements: {elementCount} • Spacing: {spacing} • Fill:
          {fillContainer ? 'yes' : 'no'}
          {#if useConstraints}• Constraints: {widthBehavior}/{heightBehavior}{/if}
        </p>
      </StackLayout>

      <!-- Frame Behavior Explanation -->
      <StackLayout gap="normal">
        <h4 class="text-h4 text-primary">Frame Behavior Modes</h4>
        <StackLayout gap="comfortable">
          <Container variant="bordered" padding="normal" radius="normal">
            <StackLayout gap="tight">
              <h5 class="text-h5 text-primary">Container Mode (Default)</h5>
              <p class="text-body-s text-secondary">
                When no direction is specified, Frame acts as a simple block container. Perfect for wrapping single
                components or basic content.
              </p>
              <code class="text-body-xs text-muted">display: block; position: relative;</code>
            </StackLayout>
          </Container>

          <Container variant="bordered" padding="normal" radius="normal">
            <StackLayout gap="tight">
              <h5 class="text-h5 text-primary">Flex Mode (Progressive)</h5>
              <p class="text-body-s text-secondary">
                When direction is specified, Frame becomes a flex container. This allows Frame to grow from simple
                container to complex layout without changing component types.
              </p>
              <code class="text-body-xs text-muted"
                >display: flex; flex-direction: {direction === 'horizontal' ? 'row' : 'column'};</code
              >
            </StackLayout>
          </Container>

          <Container variant="bordered" padding="normal" radius="normal">
            <StackLayout gap="tight">
              <h5 class="text-h5 text-primary">Constraint Mode (Future)</h5>
              <p class="text-body-s text-secondary">
                Frame will support design-tool-style constraints like width/height behaviors, centering, and aspect
                ratio maintenance. This demo shows the API concept.
              </p>
              <code class="text-body-xs text-muted"
                >constraints: {JSON.stringify({ width: widthBehavior, height: heightBehavior }, null, 0)}</code
              >
            </StackLayout>
          </Container>
        </StackLayout>
      </StackLayout>

      <!-- Configuration Object Display -->
      <CSSDisplay
        css={JSON.stringify(demoFrameConfig, null, 2)}
        title="Current Frame Configuration Object"
        variant="success"
      />
    </StackLayout>

    <!-- Action Buttons -->
    <RowLayout gap="normal" align="center" fillContainer={false}>
      <Button variant="primary" onclick={() => window.location.reload()}>Reset Demo</Button>
      <Button variant="secondary" onclick={() => (window.location.href = '/')}>Back to Home</Button>
    </RowLayout>
  </StackLayout>
</Container>
