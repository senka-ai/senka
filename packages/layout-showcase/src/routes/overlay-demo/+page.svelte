<!--
packages/layout-showcase/src/routes/overlay-demo/+page.svelte
Overlay Arrangement Demo - Layered positioning showcase
Tests the OverlayArrangement implementation with UI library components
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/overlay.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  // Import UI components
  import {
    Button,
    Container,
    Tag,
    Badge,
    StackLayout,
    RowLayout,
    OverlayLayout,
    Slider,
    VideoPlaceholder,
    Toast,
    Dialog,
    Avatar,
  } from '@senka-ai/ui'
  // Import icons for realistic overlays
  import { CloseIcon, PlayIcon, ExploreIcon } from '@senka-ai/ui/icons'
  // Import layout engine types
  import type { LayoutContainer } from '@senka-ai/layout-engine'
  import DemoNavigation from '$lib/components/DemoNavigation.svelte'
  // Import reusable control components
  import SpacingSlider from '$lib/components/SpacingSlider.svelte'
  import PropertyPanel from '$lib/components/PropertyPanel.svelte'
  import CSSDisplay from '$lib/components/CSSDisplay.svelte'
  import PositionPicker from '$lib/components/PositionPicker.svelte'

  // Reactive configuration state
  let position = $state<'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('center')
  let zIndex = $state<number>(10)
  let spacing = $state<'none' | 'tight' | 'cozy' | 'normal' | 'comfortable' | 'spacious'>('normal')

  // Demo overlay configuration that changes based on controls
  const testContainer = $derived<LayoutContainer>({
    id: 'demo-overlay',
    type: 'overlay',
    fillContainer: true,
    position: position,
    zIndex: zIndex,
    // Note: spacing is handled in the demo implementation, not part of the core layout engine
  })

  // Handle control changes
  function handlePositionChange(newPosition: typeof position) {
    position = newPosition
  }

  function handleZIndexChange(newZIndex: number) {
    zIndex = newZIndex
  }

  function handleSpacingChange(newSpacing: typeof spacing) {
    spacing = newSpacing
  }

  // Convert spacing to CSS values for overlay positioning
  const spacingToCSSOffset = $derived.by(() => {
    switch (spacing) {
      case 'none':
        return '0'
      case 'tight':
        return '0.25rem' // 4px
      case 'cozy':
        return '0.5rem' // 8px
      case 'normal':
        return '0.75rem' // 12px
      case 'comfortable':
        return '1rem' // 16px
      case 'spacious':
        return '1.5rem' // 24px
      default:
        return '0.75rem'
    }
  })

  // Demo overlay scenarios with real components
  let overlayScenarios = [
    {
      id: 'media-overlay',
      title: 'Media Player Controls',
      description: 'Play button and controls over video thumbnail',
    },
    {
      id: 'profile-overlay',
      title: 'Profile Status Indicator',
      description: 'Status badge overlaid on avatar',
    },
    {
      id: 'notification-toast',
      title: 'Toast Notification',
      description: 'Success notification in corner',
    },
    {
      id: 'modal-dialog',
      title: 'Modal Dialog',
      description: 'Centered dialog over backdrop',
    },
  ]
</script>

<svelte:head>
  <title>Overlay Demo - Layout Showcase</title>
  <meta name="description" content="Testing Overlay arrangement from layout engine for layered positioning" />
</svelte:head>

<Container padding="comfortable" fullWidth background>
  <StackLayout direction="vertical" gap="spacious">
    <!-- Demo Navigation -->
    <DemoNavigation currentPage="overlay" />

    <!-- Page Header -->
    <StackLayout gap="normal">
      <h1 class="text-h1 text-primary">Overlay Arrangement Demo</h1>
      <p class="text-body-l text-secondary">
        Testing the Overlay arrangement from the layout engine for layered positioning and z-index management.
      </p>
    </StackLayout>

    <!-- Interactive Demo Section -->
    <StackLayout gap="comfortable">
      <!-- Overlay Properties Panel -->
      <PropertyPanel
        title="Overlay Properties"
        description="Position controls where the overlay appears, Z-Index controls layering, and Spacing controls offset from container edges"
      >
        <PositionPicker value={position} onchange={handlePositionChange} />

        <Slider
          label="Z-Index"
          min={1}
          max={100}
          step={1}
          bind:value={zIndex}
          showValue={true}
          onchange={handleZIndexChange}
        />

        <SpacingSlider value={spacing} onchange={handleSpacingChange} />
      </PropertyPanel>

      <!-- Live Preview -->
      <StackLayout gap="normal">
        <h3 class="text-h4 text-primary">Live Preview</h3>

        <Container variant="bordered" padding="comfortable" radius="large" class="h-64">
          <!-- Demonstrating OverlayLayout component usage -->
          <OverlayLayout {position} class="relative">
            <!-- Background layer -->
            <div class="bg-surface border-default absolute inset-0 rounded border-2">
              <div class="p-4">
                <span class="text-body-l text-secondary">Background Layer</span>
              </div>
            </div>

            <!-- Content overlay based on position -->
            <div
              class="absolute {position === 'center' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}"
              style="z-index: {zIndex}; {position === 'center'
                ? `margin: ${spacingToCSSOffset}`
                : position === 'top-left'
                  ? `top: ${spacingToCSSOffset}; left: ${spacingToCSSOffset}`
                  : position === 'top-right'
                    ? `top: ${spacingToCSSOffset}; right: ${spacingToCSSOffset}`
                    : position === 'bottom-left'
                      ? `bottom: ${spacingToCSSOffset}; left: ${spacingToCSSOffset}`
                      : position === 'bottom-right'
                        ? `bottom: ${spacingToCSSOffset}; right: ${spacingToCSSOffset}`
                        : ''}"
            >
              <Container variant="elevated" padding="normal" radius="normal">
                <StackLayout gap="tight">
                  <span class="text-body-m text-primary font-medium">Overlay Content</span>
                  <Badge variant="default" value="Z-Index: {zIndex}" />
                </StackLayout>
              </Container>
            </div>

            <!-- Position indicator badge -->
            <div class="absolute top-1 right-1 z-10">
              <Tag variant="secondary" text="Position: {position}" />
            </div>
          </OverlayLayout>
        </Container>

        <p class="text-body-xs text-secondary">
          <strong>Current Configuration:</strong>
          Position: {position} • Z-Index: {zIndex} • Edge Offset: {spacing} ({spacingToCSSOffset})
        </p>
      </StackLayout>

      <!-- Real-world Overlay Scenarios -->
      <StackLayout gap="normal">
        <h3 class="text-h4 text-primary">Real-World Overlay Scenarios</h3>
        <p class="text-body-m text-secondary">Common overlay patterns used in applications.</p>

        <RowLayout gap="comfortable" align="start" wrap>
          {#each overlayScenarios as scenario}
            <Container variant="elevated" padding="comfortable" radius="normal" minWidth="medium" minHeight="large">
              <StackLayout gap="normal">
                <h4 class="text-h5 text-primary">{scenario.title}</h4>
                <p class="text-body-s text-secondary">{scenario.description}</p>

                <!-- Realistic overlay demonstrations -->
                {#if scenario.id === 'media-overlay'}
                  <!-- Video player with overlay controls -->
                  <Container variant="default" padding="none" radius="normal" class="relative h-32 overflow-hidden">
                    <VideoPlaceholder variant="default" message="" />

                    <!-- Play button overlay - center -->
                    <div class="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                      <Button variant="primary" size="large" class="!h-12 !w-12 !rounded-full !p-0">
                        {#snippet leftIcon(size)}
                          <PlayIcon class="h-6 w-6 text-white" />
                        {/snippet}
                      </Button>
                    </div>

                    <!-- Explore button overlay - top right -->
                    <div class="absolute top-2 right-2 z-20">
                      <Button variant="secondary" size="small" class="!h-8 !w-8 !rounded-full !p-0">
                        {#snippet leftIcon(size)}
                          <ExploreIcon class="h-4 w-4" />
                        {/snippet}
                      </Button>
                    </div>

                    <!-- Duration badge - bottom right -->
                    <div class="absolute right-2 bottom-2 z-20">
                      <Badge variant="default" value="3:42" />
                    </div>
                  </Container>
                {:else if scenario.id === 'profile-overlay'}
                  <!-- Avatar with status indicator -->
                  <Container
                    variant="default"
                    padding="comfortable"
                    radius="normal"
                    class="relative flex h-32 items-center justify-center"
                  >
                    <div class="relative">
                      <Avatar size="large" initials="JD" />
                      <!-- Online status indicator - top right of avatar -->
                      <div class="absolute top-0 -left-1 z-10">
                        <div class="bg-success h-4 w-4 rounded-full border-2 border-white"></div>
                      </div>
                      <!-- Notification badge - bottom right of avatar -->
                      <div class="absolute -right-1 -bottom-1 z-20">
                        <Badge variant="error" value="3" />
                      </div>
                    </div>
                  </Container>
                {:else if scenario.id === 'notification-toast'}
                  <!-- Page content with toast notification -->
                  <Container variant="default" padding="normal" radius="normal" class="relative h-32 min-w-64">
                    <div class="bg-surface flex h-full items-center justify-center rounded">
                      <span class="text-body-m text-secondary">App Interface</span>
                    </div>

                    <!-- Toast notification - top right corner -->
                    <div class="absolute top-2 right-2 z-10 w-68">
                      <Toast
                        variant="success"
                        title="Success!"
                        description="Profile updated"
                        showCloseButton={true}
                        dismissible={true}
                      />
                    </div>
                  </Container>
                {:else if scenario.id === 'modal-dialog'}
                  <!-- Page with modal dialog overlay -->
                  <Container variant="default" padding="normal" radius="normal" class="relative h-32 min-w-64">
                    <!-- Backdrop - dimmed page content -->
                    <div class="bg-surface flex h-full items-center justify-center rounded opacity-50">
                      <span class="text-body-m text-secondary">Page Content</span>
                    </div>

                    <!-- Modal dialog - centered -->
                    <div class="absolute top-1/2 left-1/2 z-10 w-48 -translate-x-1/2 -translate-y-1/2">
                      <Container variant="elevated" padding="normal" radius="normal" class="border-default border">
                        <StackLayout gap="tight">
                          <div class="flex items-center justify-between">
                            <span class="text-body-s text-primary font-medium">Confirm Action</span>
                            <Button variant="tertiary" size="small" class="!h-6 !w-6 !min-w-0 !rounded-full !p-0">
                              {#snippet leftIcon(size)}
                                <CloseIcon class="h-3 w-3" />
                              {/snippet}
                            </Button>
                          </div>
                          <RowLayout gap="tight" fillContainer={false}>
                            <Button variant="primary" size="small">OK</Button>
                            <Button variant="secondary" size="small">Cancel</Button>
                          </RowLayout>
                        </StackLayout>
                      </Container>
                    </div>
                  </Container>
                {/if}
              </StackLayout>
            </Container>
          {/each}
        </RowLayout>
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
    </StackLayout>

    <!-- Action Buttons using RowLayout -->
    <RowLayout gap="normal" align="center" fillContainer={false}>
      <Button variant="primary" onclick={() => window.location.reload()}>Reset Demo</Button>
      <Button variant="secondary" onclick={() => (window.location.href = '/')}>Back to Home</Button>
    </RowLayout>
  </StackLayout>
</Container>
