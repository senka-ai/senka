<!--
packages/layout-showcase/src/routes/+page.svelte
Layout Engine Architecture Demo - Comprehensive showcase of the complete layout system
Demonstrates all arrangement types, data-driven configuration, composition, and real-world patterns
RELEVANT FILES: packages/layout-engine/LAYOUT_SYSTEM_FINAL.md, packages/ui/UI_ARCHITECTURE.md, packages/layout-engine/README.md, AI_UI_BUILDING_INSTRUCTIONS.md
-->

<script lang="ts">
  // Import UI components
  import {
    Button,
    Container,
    LayoutDiv,
    ContentSwitcher,
    Tag,
    Divider,
    RowLayout,
    StackLayout,
    GridLayout,
    FlowLayout,
    OverlayLayout,
    FrameLayout,
  } from '@senka-ai/ui'
  // Import layout engine types
  import type { LayoutContainer } from '@senka-ai/layout-engine'
  // Import icons from available libraries
  import {
    PlayIcon,
    SettingsIcon,
    CategoriesIcon,
    AlignItemHorizontalCenterLineDesign,
    ExpandHorizontalLineArrows,
    SwitchHorizontal,
    ViewGrid,
    Menu,
  } from '@senka-ai/ui/icons'
  import DemoNavigation from '$lib/components/DemoNavigation.svelte'
  import PropertyPanel from '$lib/components/PropertyPanel.svelte'
  import CSSDisplay from '$lib/components/CSSDisplay.svelte'

  // Current demo section state
  let currentSection = $state<'overview' | 'arrangements' | 'composition' | 'patterns'>('overview')

  // Keep only the dynamic configurations that are part of the arrangement demo data
  const stackDemoConfig: LayoutContainer = {
    id: 'stack-demo',
    type: 'stack',
    direction: 'vertical',
    gap: 'normal',
    align: 'stretch',
    fillContainer: true,
  }

  const rowDemoConfig: LayoutContainer = {
    id: 'row-demo',
    type: 'row',
    gap: 'normal',
    align: 'center',
    justify: 'space-between',
    fillContainer: true,
  }

  const gridDemoConfig: LayoutContainer = {
    id: 'grid-demo',
    type: 'grid',
    columns: 4,
    gap: 'cozy',
    fillContainer: true,
  }

  const flowDemoConfig: LayoutContainer = {
    id: 'flow-demo',
    type: 'flow',
    gap: 'cozy',
    align: 'start',
    fillContainer: true,
  }

  const overlayDemoConfig: LayoutContainer = {
    id: 'overlay-demo',
    type: 'overlay',
    position: 'center',
    fillContainer: true,
  }

  const frameDemoConfig: LayoutContainer = {
    id: 'frame-demo',
    type: 'frame',
    gap: 'normal',
    fillContainer: true,
  }

  // Content switch handler
  function handleSectionChange(newSection: typeof currentSection) {
    currentSection = newSection
  }

  // Demo data
  const arrangementTypes = [
    {
      name: 'Stack',
      description: 'Elements arranged vertically or horizontally in sequence',
      icon: CategoriesIcon,
      config: stackDemoConfig,
      elements: ['Header', 'Content', 'Footer'],
    },
    {
      name: 'Row',
      description: 'Elements arranged side-by-side horizontally',
      icon: SwitchHorizontal,
      config: rowDemoConfig,
      elements: ['Start', 'Center', 'End'],
    },
    {
      name: 'Grid',
      description: 'Elements arranged in a structured grid pattern',
      icon: ViewGrid,
      config: gridDemoConfig,
      elements: ['1', '2', '3', '4', '5', '6', '7', '8'],
    },
    {
      name: 'Flow',
      description: 'Elements flow naturally like text, wrapping when needed',
      icon: Menu,
      config: flowDemoConfig,
      elements: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6'],
    },
    {
      name: 'Overlay',
      description: 'Elements layered on top of each other',
      icon: PlayIcon,
      config: overlayDemoConfig,
      elements: ['Background', 'Content', 'Tag'],
    },
    {
      name: 'Frame',
      description: 'Container with auto-layout enabled for precise positioning',
      icon: AlignItemHorizontalCenterLineDesign,
      config: frameDemoConfig,
      elements: ['Positioned Element'],
    },
  ]

  const architectureFeatures = [
    {
      title: 'Data-Driven',
      description: 'Layouts are JSON objects that can be stored, transmitted, and modified',
      icon: ViewGrid,
    },
    {
      title: 'Platform Agnostic',
      description: 'Same configuration generates CSS, React Native, or Flutter styles',
      icon: SwitchHorizontal,
    },
    {
      title: 'Responsive by Default',
      description: 'Automatic mobile optimization with override capability',
      icon: ExpandHorizontalLineArrows,
    },
  ]

  const contentSwitcherOptions = [
    { id: 'overview', label: 'Overview' },
    { id: 'arrangements', label: 'Arrangements' },
    { id: 'composition', label: 'Composition' },
    { id: 'patterns', label: 'Patterns' },
  ]
</script>

<svelte:head>
  <title>Layout Engine Demo - Layout Showcase</title>
  <meta
    name="description"
    content="Comprehensive demonstration of the Senka Layout Engine architecture and capabilities"
  />
</svelte:head>

<Container padding="comfortable" fullWidth background>
  <StackLayout direction="vertical" gap="spacious">
    <!-- Demo Navigation -->
    <DemoNavigation currentPage="home" />

    <!-- Page Header -->
    <StackLayout gap="normal">
      <h1 class="text-h1 text-primary">Layout Engine Architecture</h1>
      <p class="text-body-l text-secondary">
        A comprehensive demonstration of the data-driven layout transformation system that powers the Senka platform.
      </p>
    </StackLayout>

    <!-- Content Switcher -->
    <Container variant="default" padding="normal">
      <RowLayout justify="center" fillContainer>
        <ContentSwitcher
          items={contentSwitcherOptions}
          selectedId={currentSection}
          onchange={(value) => handleSectionChange(value as typeof currentSection)}
        />
      </RowLayout>
    </Container>

    <!-- Dynamic Content Based on Selection -->
    <StackLayout gap="comfortable">
      {#if currentSection === 'overview'}
        <!-- Architecture Overview -->
        <RowLayout gap="spacious" align="center">
          <Container variant="elevated" padding="spacious" radius="large" fullWidth>
            <StackLayout align="start">
              <h2 class="text-h2 text-primary">Data-Driven Layout System</h2>
              <p class="text-body-l text-secondary">
                Every layout is a serializable configuration object that transforms into optimized CSS. One schema
                serves visual builders, AI generators, and templates.
              </p>
              <Tag variant="primary" text="Zero Custom CSS Required" />
            </StackLayout>
          </Container>
        </RowLayout>

        <!-- Key Features Grid -->
        <GridLayout columns={3} gap="comfortable">
          {#each architectureFeatures as feature}
            <Container variant="elevated" padding="comfortable" radius="normal" minHeight="medium">
              <StackLayout gap="normal" align="stretch">
                <div class="text-highlight">
                  <feature.icon size="24" />
                </div>
                <h3 class="text-h4 text-primary">{feature.title}</h3>
                <p class="text-body-m text-secondary">{feature.description}</p>
              </StackLayout>
            </Container>
          {/each}
        </GridLayout>

        <!-- Configuration Example -->
        <PropertyPanel
          title="Configuration Example"
          description="This is how a layout is defined - pure JSON data that drives the entire system"
        >
          <CSSDisplay
            css={JSON.stringify(
              {
                id: 'example-grid',
                type: 'grid',
                columns: 3,
                gap: 'comfortable',
                fillContainer: true,
              },
              null,
              2
            )}
            title="Grid Configuration Object"
            variant="highlight"
          />
        </PropertyPanel>
      {:else if currentSection === 'arrangements'}
        <!-- Arrangement Types Showcase -->
        <h2 class="text-h2 text-primary">Six Arrangement Types</h2>
        <p class="text-body-l text-secondary">
          Each arrangement type provides a different spatial organization pattern for your content.
        </p>

        <GridLayout columns={3} gap="comfortable">
          {#each arrangementTypes as arrangement}
            <Container variant="bordered" padding="comfortable" radius="normal" minHeight="large">
              <StackLayout gap="normal" align="stretch">
                <!-- Arrangement Header -->
                <RowLayout gap="normal" align="center" justify="space-between">
                  <div class="text-highlight">
                    <arrangement.icon size="24" />
                  </div>
                  <Tag variant="secondary" text={arrangement.name} />
                </RowLayout>

                <h3 class="text-h4 text-primary">{arrangement.name}</h3>
                <p class="text-body-s text-secondary">{arrangement.description}</p>

                <!-- Mini Preview -->
                <Container variant="default" padding="normal" radius="normal" minHeight="small">
                  <LayoutDiv config={arrangement.config} class="h-16">
                    {#each arrangement.elements as element, i}
                      {#if arrangement.name === 'Flow'}
                        <Tag variant="primary" text={element}>
                          {#snippet leftIcon()}
                            <SettingsIcon size={12} />
                          {/snippet}
                        </Tag>
                      {:else if arrangement.name === 'Overlay'}
                        <Container
                          variant={i === 0 ? 'default' : 'elevated'}
                          padding="tight"
                          radius="normal"
                          class={i > 0 ? 'absolute' : ''}
                        >
                          <span class="text-body-xs text-primary">{element}</span>
                        </Container>
                      {:else}
                        <Container variant="elevated" padding="tight" radius="normal">
                          <span class="text-body-xs text-primary">{element}</span>
                        </Container>
                      {/if}
                    {/each}
                  </LayoutDiv>
                </Container>
              </StackLayout>
            </Container>
          {/each}
        </GridLayout>
      {:else if currentSection === 'composition'}
        <!-- Layout Composition -->
        <h2 class="text-h2 text-primary">Layout Composition</h2>
        <p class="text-body-l text-secondary">
          Complex layouts are built by nesting different arrangement types. Each container manages its children
          independently.
        </p>

        <Container variant="bordered" padding="spacious" radius="large" minHeight="large">
          <StackLayout gap="comfortable">
            <!-- Composed Layout Header -->
            <RowLayout gap="normal" align="center" justify="space-between">
              <h3 class="text-h3 text-primary">Dashboard Layout</h3>
              <RowLayout gap="cozy" align="center" fillContainer={false}>
                <Button variant="secondary" size="small">Settings</Button>
                <Button variant="primary" size="small">Save</Button>
              </RowLayout>
            </RowLayout>

            <Divider />

            <!-- Composed Layout Content -->
            <RowLayout gap="comfortable" align="start">
              <!-- Sidebar (Stack) -->
              <Container variant="elevated" padding="normal" radius="normal" minWidth="medium" minHeight="large">
                <StackLayout gap="normal" fillContainer={false}>
                  <h4 class="text-h5 text-primary">Navigation</h4>
                  <Button variant="tertiary" size="small" fullWidth>Dashboard</Button>
                  <Button variant="tertiary" size="small" fullWidth>Analytics</Button>
                  <Button variant="tertiary" size="small" fullWidth>Settings</Button>
                </StackLayout>
              </Container>

              <!-- Main Content (Grid) -->
              <Container variant="default" padding="normal" radius="normal" minHeight="large">
                <GridLayout columns={2} gap="normal">
                  <Container variant="elevated" padding="normal" radius="normal" minHeight="medium">
                    <StackLayout gap="normal">
                      <h4 class="text-h5 text-primary">Metric Card</h4>
                      <p class="text-body-l text-highlight font-medium">1,234</p>
                      <p class="text-body-s text-secondary">+12% from last month</p>
                    </StackLayout>
                  </Container>

                  <Container variant="elevated" padding="normal" radius="normal" minHeight="medium">
                    <StackLayout gap="normal">
                      <h4 class="text-h5 text-primary">Chart Area</h4>
                      <div class="bg-surface border-default h-16 rounded border-2"></div>
                      <p class="text-body-s text-secondary">Data visualization</p>
                    </StackLayout>
                  </Container>

                  <Container variant="elevated" padding="normal" radius="normal" minHeight="medium">
                    <StackLayout gap="normal">
                      <h4 class="text-h5 text-primary">Activity</h4>
                      <p class="text-body-s text-secondary">Recent activity list</p>
                      <Tag variant="primary" text="3 new items" />
                    </StackLayout>
                  </Container>

                  <Container variant="elevated" padding="normal" radius="normal" minHeight="medium">
                    <StackLayout gap="normal">
                      <h4 class="text-h5 text-primary">Quick Actions</h4>
                      <RowLayout gap="cozy" align="center" fillContainer={false}>
                        <Button variant="primary" size="small">Create</Button>
                        <Button variant="secondary" size="small">Export</Button>
                      </RowLayout>
                    </StackLayout>
                  </Container>
                </GridLayout>
              </Container>
            </RowLayout>
          </StackLayout>
        </Container>
      {:else if currentSection === 'patterns'}
        <!-- Real-World Patterns -->
        <h2 class="text-h2 text-primary">Real-World Patterns</h2>
        <p class="text-body-l text-secondary">
          Common UI patterns built with the layout engine, showing practical applications.
        </p>

        <GridLayout columns={3} gap="comfortable">
          <!-- Product Card Pattern -->
          <Container variant="elevated" padding="comfortable" radius="normal" minHeight="large">
            <StackLayout gap="normal">
              <RowLayout gap="normal" align="center" justify="space-between">
                <h3 class="text-h4 text-primary">Product Card</h3>
                <Tag variant="primary" text="In Stock" />
              </RowLayout>

              <div class="bg-surface border-default h-20 rounded border-2"></div>

              <StackLayout gap="normal" align="stretch">
                <h4 class="text-h5 text-primary">Premium Widget</h4>
                <p class="text-body-s text-secondary">High-quality widget with advanced features</p>
                <p class="text-body-l text-highlight font-medium">$99.99</p>
              </StackLayout>

              <RowLayout gap="cozy" align="center" fillContainer={false}>
                <Button variant="primary" size="small" fullWidth>Add to Cart</Button>
                <Button variant="secondary" size="small">♥</Button>
              </RowLayout>
            </StackLayout>
          </Container>

          <!-- Form Pattern -->
          <Container variant="elevated" padding="comfortable" radius="normal" minHeight="large">
            <StackLayout gap="normal">
              <h3 class="text-h4 text-primary">Contact Form</h3>

              <StackLayout gap="normal" align="stretch">
                <Container variant="default" padding="normal" radius="normal">
                  <span class="text-body-s text-secondary">Name</span>
                </Container>
                <Container variant="default" padding="normal" radius="normal">
                  <span class="text-body-s text-secondary">Email</span>
                </Container>
                <Container variant="default" padding="normal" radius="normal" minHeight="medium">
                  <span class="text-body-s text-secondary">Message</span>
                </Container>
              </StackLayout>

              <RowLayout gap="cozy" align="center" fillContainer={false}>
                <Button variant="primary" size="small" fullWidth>Send Message</Button>
              </RowLayout>
            </StackLayout>
          </Container>

          <!-- Navigation Pattern -->
          <Container variant="elevated" padding="comfortable" radius="normal" minHeight="large">
            <StackLayout gap="normal" fillContainer>
              <h3 class="text-h4 text-primary">Navigation Bar</h3>

              <RowLayout gap="normal" align="center" justify="space-between" expand>
                <h4 class="text-h5 text-primary">Logo</h4>
                <RowLayout gap="cozy" align="center" fillContainer={false}>
                  <Button variant="tertiary" size="small">Home</Button>
                  <Button variant="tertiary" size="small">About</Button>
                  <Button variant="tertiary" size="small">Contact</Button>
                  <Button variant="primary" size="small">Sign Up</Button>
                </RowLayout>
              </RowLayout>

              <p class="text-body-s text-secondary">
                Responsive navigation with logo and actions using Row arrangement
              </p>
            </StackLayout>
          </Container>

          <!-- Content Grid Pattern -->
          <Container variant="elevated" padding="comfortable" radius="normal" minHeight="large">
            <GridLayout gap="normal">
              <h3 class="text-h4 text-primary">Content Grid</h3>

              <GridLayout columns={4} gap="cozy">
                {#each Array(8) as _, i}
                  <Container variant="default" padding="tight" radius="normal" minHeight="xs">
                    <span class="text-body-xs text-primary">Item {i + 1}</span>
                  </Container>
                {/each}
              </GridLayout>

              <p class="text-body-s text-secondary">Auto-sizing grid with consistent spacing</p>
            </GridLayout>
          </Container>

          <!-- Tag Cloud Pattern -->
          <Container variant="elevated" padding="comfortable" radius="normal" minHeight="large">
            <StackLayout gap="normal">
              <h3 class="text-h4 text-primary">Tag Cloud</h3>

              <StackLayout>
                <FlowLayout gap="cozy" align="start" fillContainer={false}>
                  <Tag variant="primary" text="React" />
                  <Tag variant="secondary" text="Vue" />
                  <Tag variant="primary" text="Svelte" />
                  <Tag variant="tertiary" text="Angular" />
                  <Tag variant="secondary" text="TypeScript" />
                  <Tag variant="primary" text="JavaScript" />
                  <Tag variant="tertiary" text="CSS" />
                  <Tag variant="secondary" text="HTML" />
                </FlowLayout>
              </StackLayout>

              <p class="text-body-s text-secondary">Flowing layout that wraps naturally like text</p>
            </StackLayout>
          </Container>

          <!-- Overlay Pattern -->
          <Container variant="elevated" padding="comfortable" radius="normal" minHeight="large">
            <StackLayout gap="normal">
              <h3 class="text-h4 text-primary">Image Overlay</h3>

              <Container variant="default" padding="comfortable" radius="normal" minHeight="medium" class="relative">
                <OverlayLayout position="center" class="h-24">
                  <!-- Background -->
                  <div class="bg-surface border-default absolute inset-0 rounded border-2"></div>
                  <!-- Content overlay -->
                  <Container
                    variant="elevated"
                    padding="normal"
                    radius="normal"
                    class="absolute right-2 bottom-2 left-2"
                  >
                    <h4 class="text-h5 text-primary">Image Title</h4>
                    <p class="text-body-s text-secondary">Overlay content</p>
                  </Container>
                  <!-- Tag overlay -->
                  <div class="absolute top-2 right-2">
                    <Tag variant="primary" text="NEW" />
                  </div>
                </OverlayLayout>
              </Container>

              <p class="text-body-s text-secondary">Layered content with positioned overlays</p>
            </StackLayout>
          </Container>
        </GridLayout>
      {/if}
    </StackLayout>

    <!-- Action Buttons -->
    <RowLayout gap="normal" align="center" justify="space-between">
      <Button variant="primary" onclick={() => window.location.reload()}>Reset Demo</Button>
    </RowLayout>
  </StackLayout>
</Container>
