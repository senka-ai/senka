<!-- 
packages/layout-showcase/src/routes/+page.svelte
Main showcase page demonstrating layout engine capabilities with UI components
Provides overview of different arrangement types and real-world examples
RELEVANT FILES: packages/layout-engine/src/lib/engine.ts, packages/ui/src/lib/components/core/Button.svelte, packages/layout-showcase/src/routes/interactive/+page.svelte, packages/layout-engine/src/lib/types/index.ts
-->

<script lang="ts">
  import { LayoutEngine } from '@senka-ai/layout-engine'
  import type { LayoutContainer } from '@senka-ai/layout-engine'
  import { Button, Card, Tag, TextField, Dropdown, Banner } from '@senka-ai/ui'

  // Create layout engine instance
  const engine = new LayoutEngine({
    cssOptimization: true,
    vendorPrefixes: true,
  })

  // Example layouts
  const stackExample: LayoutContainer = {
    id: 'stack-demo',
    arrangement: {
      type: 'stack',
      direction: 'vertical',
    },
    autoLayout: {
      mode: 'hug-contents',
      primaryAxis: 'packed',
      counterAxis: 'stretch',
      gap: { scale: 'normal' },
      padding: { all: { scale: 'comfortable' } },
    },
  }

  const rowExample: LayoutContainer = {
    id: 'row-demo',
    arrangement: {
      type: 'row',
      wrap: true,
    },
    autoLayout: {
      mode: 'hug-contents',
      primaryAxis: 'packed',
      counterAxis: 'center',
      gap: { scale: 'normal' },
      padding: { all: { scale: 'normal' } },
    },
  }

  const gridExample: LayoutContainer = {
    id: 'grid-demo',
    arrangement: {
      type: 'grid',
    },
    grid: {
      columns: 'auto',
      columnMinWidth: 200,
      gap: { scale: 'normal' },
    },
    autoLayout: {
      mode: 'fill-container',
      primaryAxis: 'packed',
      counterAxis: 'start',
      gap: { scale: 'normal' },
      padding: { all: { scale: 'normal' } },
    },
  }

  const flowExample: LayoutContainer = {
    id: 'flow-demo',
    arrangement: {
      type: 'flow',
      wrap: true,
    },
    autoLayout: {
      mode: 'hug-contents',
      primaryAxis: 'packed',
      counterAxis: 'center',
      gap: { scale: 'cozy' },
      padding: { all: { scale: 'normal' } },
    },
  }

  // Generate CSS for examples
  let stackCSS = $derived(engine.generateCSS(stackExample))
  let rowCSS = $derived(engine.generateCSS(rowExample))
  let gridCSS = $derived(engine.generateCSS(gridExample))
  let flowCSS = $derived(engine.generateCSS(flowExample))

  // State for interactive controls
  let selectedDemo = $state('stack')
  let showCSS = $state(false)
</script>

<div class="space-y-12">
  <!-- Introduction -->
  <section class="text-center">
    <h2 class="text-h1 mb-4 font-bold" style="color: var(--color-text-primary);">Powerful Layout System</h2>
    <p class="text-body-xl mx-auto max-w-3xl" style="color: var(--color-text-secondary);">
      The Senka Layout Engine provides semantic, Figma-inspired arrangements that work seamlessly with our UI component
      library. Create responsive, accessible layouts with minimal code.
    </p>
  </section>

  <!-- Quick Demo Selector -->
  <section class="showcase-section">
    <div class="mb-8 flex flex-wrap justify-center gap-4">
      <Button variant={selectedDemo === 'stack' ? 'primary' : 'secondary'} onclick={() => (selectedDemo = 'stack')}>
        {#snippet children()}Stack Layout{/snippet}
      </Button>
      <Button variant={selectedDemo === 'row' ? 'primary' : 'secondary'} onclick={() => (selectedDemo = 'row')}>
        {#snippet children()}Row Layout{/snippet}
      </Button>
      <Button variant={selectedDemo === 'grid' ? 'primary' : 'secondary'} onclick={() => (selectedDemo = 'grid')}>
        {#snippet children()}Grid Layout{/snippet}
      </Button>
      <Button variant={selectedDemo === 'flow' ? 'primary' : 'secondary'} onclick={() => (selectedDemo = 'flow')}>
        {#snippet children()}Flow Layout{/snippet}
      </Button>
    </div>

    <div class="mb-6 flex items-center justify-center gap-4">
      <Button variant="tertiary" size="small" onclick={() => (showCSS = !showCSS)}>
        {#snippet children()}
          {showCSS ? 'Hide' : 'Show'} Generated CSS
        {/snippet}
      </Button>
    </div>
  </section>

  <!-- Stack Layout Demo -->
  {#if selectedDemo === 'stack'}
    <section class="showcase-section">
      <div class="layout-demo">
        <h3 class="layout-demo-title">Stack Layout - Vertical Card List</h3>
        <p class="layout-demo-description">
          Perfect for forms, content lists, and vertical navigation. Maintains consistent spacing and full-width
          alignment.
        </p>

        <div class="generated-layout" style={stackCSS}>
          <Card title="Welcome to Senka" description="Build powerful applications with our no-code platform" />
          <Card title="Getting Started" description="Learn the basics with our step-by-step tutorials" />
          <Card title="Advanced Features" description="Explore powerful tools for complex workflows" />
        </div>

        {#if showCSS}
          <div class="code-output mt-4">
            <pre>{stackCSS}</pre>
          </div>
        {/if}
      </div>
    </section>
  {/if}

  <!-- Row Layout Demo -->
  {#if selectedDemo === 'row'}
    <section class="showcase-section">
      <div class="layout-demo">
        <h3 class="layout-demo-title">Row Layout - Horizontal Button Group</h3>
        <p class="layout-demo-description">
          Ideal for action bars, navigation, and control groups. Automatically wraps on smaller screens with responsive
          spacing.
        </p>

        <div class="generated-layout" style={rowCSS}>
          <Button variant="primary">
            {#snippet children()}Save Changes{/snippet}
          </Button>
          <Button variant="secondary">
            {#snippet children()}Cancel{/snippet}
          </Button>
          <Button variant="tertiary">
            {#snippet children()}Preview{/snippet}
          </Button>
          <Button variant="tertiary">
            {#snippet children()}Export{/snippet}
          </Button>
        </div>

        {#if showCSS}
          <div class="code-output mt-4">
            <pre>{rowCSS}</pre>
          </div>
        {/if}
      </div>
    </section>
  {/if}

  <!-- Grid Layout Demo -->
  {#if selectedDemo === 'grid'}
    <section class="showcase-section">
      <div class="layout-demo">
        <h3 class="layout-demo-title">Grid Layout - Responsive Card Grid</h3>
        <p class="layout-demo-description">
          Auto-responsive grid with minimum column width. Perfect for dashboards, galleries, and product catalogs.
        </p>

        <div class="generated-layout" style={gridCSS}>
          <Card title="Analytics" description="View detailed metrics and insights" />
          <Card title="Users" description="Manage user accounts and permissions" />
          <Card title="Settings" description="Configure application preferences" />
          <Card title="Reports" description="Generate and download reports" />
          <Card title="Integrations" description="Connect with external services" />
          <Card title="Support" description="Get help and documentation" />
        </div>

        {#if showCSS}
          <div class="code-output mt-4">
            <pre>{gridCSS}</pre>
          </div>
        {/if}
      </div>
    </section>
  {/if}

  <!-- Flow Layout Demo -->
  {#if selectedDemo === 'flow'}
    <section class="showcase-section">
      <div class="layout-demo">
        <h3 class="layout-demo-title">Flow Layout - Tag Cloud</h3>
        <p class="layout-demo-description">
          Natural text flow with wrapping. Great for tags, filters, and dynamic content collections.
        </p>

        <div class="generated-layout" style={flowCSS}>
          <Tag text="React" />
          <Tag text="Svelte" />
          <Tag text="TypeScript" />
          <Tag text="Tailwind CSS" />
          <Tag text="Vite" />
          <Tag text="SvelteKit" />
          <Tag text="Storybook" />
          <Tag text="Playwright" />
          <Tag text="Vitest" />
          <Tag text="ESLint" />
          <Tag text="Prettier" />
          <Tag text="Node.js" />
        </div>

        {#if showCSS}
          <div class="code-output mt-4">
            <pre>{flowCSS}</pre>
          </div>
        {/if}
      </div>
    </section>
  {/if}

  <!-- Real-World Example -->
  <section class="showcase-section">
    <h2 class="showcase-header">Real-World Application Layout</h2>
    <p class="showcase-description">
      See how multiple layout arrangements work together to create a complete user interface. This example combines
      stack, row, and grid layouts with responsive behavior.
    </p>

    <div class="layout-demo">
      <h3 class="layout-demo-title">Dashboard Interface</h3>

      <!-- Header with row layout -->
      <div style={rowCSS} class="mb-6">
        <h1 class="text-h2 font-semibold" style="color: var(--color-text-primary);">Project Dashboard</h1>
        <div style={rowCSS}>
          <Button variant="secondary" size="small">
            {#snippet children()}Export Data{/snippet}
          </Button>
          <Button variant="primary" size="small">
            {#snippet children()}New Project{/snippet}
          </Button>
        </div>
      </div>

      <!-- Banner notification -->
      <div class="mb-6">
        <Banner
          title="System Update"
          description="New features have been added to improve your workflow"
          variant="info"
        />
      </div>

      <!-- Stats cards in grid -->
      <div style={gridCSS} class="mb-8">
        <Card title="Active Projects" description="12 projects in progress" />
        <Card title="Team Members" description="8 collaborators online" />
        <Card title="Tasks Completed" description="47 tasks this month" />
      </div>

      <!-- Form section with stack layout -->
      <Card title="Quick Actions" class="p-6">
        <div style={stackCSS}>
          <TextField label="Project Name" placeholder="Enter project name" showLabel={true} />
          <Dropdown
            label="Team"
            placeholder="Select team"
            showLabel={true}
            options={[
              { value: 'dev', label: 'Development Team' },
              { value: 'design', label: 'Design Team' },
              { value: 'marketing', label: 'Marketing Team' },
            ]}
          />
          <div style={rowCSS}>
            <Button variant="primary">
              {#snippet children()}Create Project{/snippet}
            </Button>
            <Button variant="secondary">
              {#snippet children()}Save as Template{/snippet}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </section>

  <!-- Features Overview -->
  <section class="showcase-section">
    <h2 class="showcase-header">Layout Engine Features</h2>

    <div style={gridCSS}>
      <Card
        title="Semantic Arrangements"
        description="Stack, Row, Grid, Flow, Overlay, and Frame layouts with intuitive naming"
      />

      <Card
        title="Auto-Layout System"
        description="Automatic sizing, distribution, and spacing based on content and constraints"
      />

      <Card title="Responsive Design" description="Mobile-first approach with automatic breakpoint optimization" />

      <Card title="CSS Generation" description="Optimized CSS output with vendor prefixes and modern features" />

      <Card title="Type Safety" description="Full TypeScript support with comprehensive interface definitions" />

      <Card title="Theme Integration" description="Seamless integration with design system colors and spacing" />
    </div>
  </section>
</div>
