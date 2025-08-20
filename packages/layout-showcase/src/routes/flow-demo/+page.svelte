<!--
packages/layout-showcase/src/routes/flow-demo/+page.svelte
Flow Arrangement Demo - Natural flowing layout showcase
Tests the FlowArrangement implementation with UI library components that wrap naturally like text
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/flow.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  // Import UI components
  import { Button, Container, Tag, Badge, StackLayout, RowLayout, FlowLayout } from '@senka-ai/ui'
  // Import layout engine types
  import type { LayoutContainer } from '@senka-ai/layout-engine'
  import DemoNavigation from '$lib/components/DemoNavigation.svelte'
  // Import reusable control components
  import SpacingSlider from '$lib/components/SpacingSlider.svelte'
  import AlignmentPicker from '$lib/components/AlignmentPicker.svelte'
  import PropertyPanel from '$lib/components/PropertyPanel.svelte'
  import CSSDisplay from '$lib/components/CSSDisplay.svelte'

  // Reactive configuration state
  let spacing = $state<'none' | 'tight' | 'cozy' | 'normal' | 'comfortable' | 'spacious'>('cozy')
  let alignment = $state<'start' | 'center' | 'end' | 'stretch'>('start')

  // Keep testContainer for demo purposes - shows the config object approach

  // Demo flow configuration that changes based on controls
  const testContainer = $derived<LayoutContainer>({
    id: 'demo-flow',
    type: 'flow',
    fillContainer: true,
    gap: spacing,
    align: alignment,
  })

  // Handle control changes
  function handleSpacingChange(newSpacing: typeof spacing) {
    spacing = newSpacing
  }

  function handleAlignmentChange(newAlignment: typeof alignment) {
    alignment = newAlignment
  }

  // Demo elements with various sizes to show natural flowing behavior
  let demoTags = [
    'React',
    'Vue',
    'Svelte',
    'Angular',
    'TypeScript',
    'JavaScript',
    'HTML',
    'CSS',
    'Node.js',
    'Deno',
    'Bun',
    'Python',
    'Rust',
    'Go',
    'Docker',
    'Kubernetes',
    'AWS',
    'Vercel',
    'MongoDB',
    'PostgreSQL',
  ]

  let demoBadges = [
    { variant: 'success' as const, value: 'Stable' },
    { variant: 'warning' as const, value: 'Beta' },
    { variant: 'error' as const, value: 'Deprecated' },
    { variant: 'default' as const, value: 'Planning' },
    { variant: 'success' as const, value: 'Released' },
    { variant: 'warning' as const, value: 'Testing' },
  ]

  let demoButtons = [
    { variant: 'primary' as const, text: 'Save' },
    { variant: 'secondary' as const, text: 'Cancel' },
    { variant: 'tertiary' as const, text: 'Reset' },
    { variant: 'primary' as const, text: 'Export Data' },
    { variant: 'secondary' as const, text: 'Import' },
    { variant: 'tertiary' as const, text: 'Settings' },
    { variant: 'primary' as const, text: 'Download Report' },
    { variant: 'secondary' as const, text: 'Share' },
  ]
</script>

<svelte:head>
  <title>Flow Demo - Layout Showcase</title>
  <meta name="description" content="Testing Flow arrangement from layout engine for natural wrapping layouts" />
</svelte:head>

<Container padding="comfortable" fullWidth background>
  <StackLayout direction="vertical" gap="spacious">
    <!-- Demo Navigation -->
    <DemoNavigation currentPage="flow" />

    <!-- Page Header -->
    <StackLayout gap="normal">
      <h1 class="text-h1 text-primary">Flow Arrangement Demo</h1>
      <p class="text-body-l text-secondary">
        Testing the Flow arrangement from the layout engine for natural wrapping layouts like tags and buttons.
      </p>
    </StackLayout>

    <!-- Interactive Demo Section -->
    <StackLayout gap="comfortable">
      <!-- Flow Properties Panel -->
      <PropertyPanel title="Flow Properties" description="Adjust these settings to see live layout changes">
        <SpacingSlider value={spacing} onchange={handleSpacingChange} />

        <AlignmentPicker value={alignment} onchange={handleAlignmentChange} />
      </PropertyPanel>

      <!-- Live Preview - Tag Cloud -->
      <StackLayout gap="normal">
        <h3 class="text-h4 text-primary">Tag Cloud Example</h3>
        <p class="text-body-m text-secondary">Tags flowing naturally like text, wrapping to new lines when needed.</p>

        <Container variant="bordered" padding="comfortable" radius="large" minHeight="preview">
          <!-- Demonstrating FlowLayout component usage -->
          <FlowLayout gap={spacing} align={alignment} class="h-full">
            {#each demoTags as tag, i}
              <Tag variant={i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'secondary' : 'tertiary'} text={tag} />
            {/each}
          </FlowLayout>
        </Container>
      </StackLayout>

      <!-- Badge Flow Example -->
      <StackLayout gap="normal">
        <h3 class="text-h4 text-primary">Status Badges Flow</h3>
        <p class="text-body-m text-secondary">Status badges that flow and wrap naturally based on container width.</p>

        <Container variant="bordered" padding="comfortable" radius="large" minHeight="medium">
          <FlowLayout gap={spacing} align={alignment}>
            {#each demoBadges as badge}
              <Badge variant={badge.variant} value={badge.value} />
            {/each}
          </FlowLayout>
        </Container>
      </StackLayout>

      <!-- Button Flow Example -->
      <StackLayout gap="normal">
        <h3 class="text-h4 text-primary">Action Buttons Flow</h3>
        <p class="text-body-m text-secondary">
          Action buttons that wrap naturally when they don't fit in a single row.
        </p>

        <Container variant="bordered" padding="comfortable" radius="large" minHeight="medium">
          <FlowLayout gap={spacing} align={alignment}>
            {#each demoButtons as button}
              <Button variant={button.variant} size="small">
                {button.text}
              </Button>
            {/each}
          </FlowLayout>
        </Container>
      </StackLayout>

      <!-- Real-world Mixed Content Example -->
      <StackLayout gap="normal">
        <h3 class="text-h4 text-primary">Mixed Content Flow</h3>
        <p class="text-body-m text-secondary">
          Different types of content flowing together naturally in the same container.
        </p>

        <Container variant="bordered" padding="comfortable" radius="large" minHeight="large">
          <FlowLayout gap={spacing} align={alignment}>
            <Badge variant="success" value="Project Status: Active" />
            <Tag variant="primary" text="Frontend" />
            <Tag variant="secondary" text="React" />
            <Tag variant="tertiary" text="TypeScript" />
            <Button variant="primary" size="small">Deploy</Button>
            <Button variant="secondary" size="small">Preview</Button>
            <Badge variant="warning" value="2 Issues" />
            <Tag variant="primary" text="Priority: High" />
            <Button variant="tertiary" size="small">View Details</Button>
            <Badge variant="default" value="Last Updated: 2 hours ago" />
          </FlowLayout>
        </Container>

        <p class="text-body-xs text-secondary">
          <strong>Current Configuration:</strong>
          Spacing: {spacing} • Alignment: {alignment}
        </p>
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
