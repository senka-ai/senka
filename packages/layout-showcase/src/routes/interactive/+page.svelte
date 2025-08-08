<!-- 
packages/layout-showcase/src/routes/interactive/+page.svelte
Interactive layout builder with live controls and preview
Allows real-time experimentation with layout engine properties
RELEVANT FILES: packages/layout-showcase/src/lib/components/LayoutControls.svelte, packages/layout-engine/src/lib/engine.ts, packages/ui/src/lib/components/layout/Card.svelte, packages/layout-engine/src/lib/types/index.ts
-->

<script lang="ts">
  import { LayoutEngine } from '@senka-ai/layout-engine'
  import type { LayoutContainer } from '@senka-ai/layout-engine'
  import LayoutControls from '$lib/components/LayoutControls.svelte'
  import { Button, Card, Tag, TextField, Badge, Banner, CardHorizontal } from '@senka-ai/ui'

  // Create layout engine instance
  const engine = new LayoutEngine({
    cssOptimization: true,
    vendorPrefixes: true,
  })

  // Initial layout configuration
  let currentLayout = $state<LayoutContainer>({
    id: 'interactive-demo',
    arrangement: {
      type: 'stack',
      direction: 'vertical',
    },
    autoLayout: {
      mode: 'hug-contents',
      primaryAxis: 'packed',
      counterAxis: 'stretch',
      gap: { scale: 'normal' },
      padding: { all: { scale: 'normal' } },
    },
  })

  // Generate CSS reactively
  let generatedCSS = $derived(engine.generateCSS(currentLayout))
  let formattedCSS = $derived(formatCSS(generatedCSS))

  // State for display options
  let showCSS = $state(false)
  let componentSet = $state('mixed')

  // Update layout handler
  const handleLayoutChange = (newLayout: LayoutContainer) => {
    currentLayout = newLayout
  }

  // Format CSS for better display
  function formatCSS(css: string): string {
    return css.replace(/;/g, ';\n  ').replace(/{/g, ' {\n  ').replace(/}/g, '\n}').replace(/^\s+/gm, '  ')
  }

  // Component sets for demo
  const componentSets = {
    cards: [
      { component: Card, props: { title: 'Dashboard', description: 'View analytics and metrics' } },
      { component: Card, props: { title: 'Projects', description: 'Manage your active projects' } },
      { component: Card, props: { title: 'Team', description: 'Collaborate with team members' } },
      { component: Card, props: { title: 'Settings', description: 'Configure your preferences' } },
    ],
    buttons: [
      { component: Button, props: { variant: 'primary' as const }, content: 'Save Changes' },
      { component: Button, props: { variant: 'secondary' as const }, content: 'Cancel' },
      { component: Button, props: { variant: 'tertiary' as const }, content: 'Preview' },
      { component: Button, props: { variant: 'tertiary' as const }, content: 'Export' },
    ],
    tags: [
      { component: Tag, content: 'React' },
      { component: Tag, content: 'Svelte' },
      { component: Tag, content: 'TypeScript' },
      { component: Tag, content: 'Tailwind' },
      { component: Tag, content: 'Vite' },
      { component: Tag, content: 'SvelteKit' },
      { component: Tag, content: 'Storybook' },
      { component: Tag, content: 'Playwright' },
    ],
    mixed: [
      {
        component: Banner,
        props: { title: 'Welcome!', description: 'Get started with your new project', variant: 'info' },
      },
      { component: Card, props: { title: 'Quick Start', description: 'Follow these steps to begin' } },
      {
        component: 'div',
        props: { class: 'flex gap-2' },
        content: [
          { component: Button, props: { variant: 'primary', size: 'small' }, content: 'Continue' },
          { component: Button, props: { variant: 'secondary', size: 'small' }, content: 'Learn More' },
        ],
      },
      {
        component: 'div',
        props: { class: 'flex gap-2 flex-wrap' },
        content: [
          { component: Tag, content: 'Getting Started' },
          { component: Tag, content: 'Tutorial' },
          { component: Badge, props: { variant: 'success' }, content: 'New' },
        ],
      },
    ],
  }
</script>

<svelte:head>
  <title>Interactive Layout Builder - Senka Layout Engine</title>
</svelte:head>

<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
  <!-- Layout Controls Panel -->
  <div class="lg:col-span-1">
    <div class="sticky top-8 space-y-6">
      <LayoutControls layout={currentLayout} onLayoutChange={handleLayoutChange} />

      <!-- Component Set Selector -->
      <section class="bg-surface border-default rounded-xl border-2 p-6">
        <h3 class="text-h4 mb-4 font-semibold" style="color: var(--color-text-primary);">Demo Components</h3>
        <div class="space-y-2">
          <span class="property-label">Component Set</span>
          <div class="space-y-2">
            <button
              class="w-full rounded border px-3 py-2 text-left {componentSet === 'mixed'
                ? 'bg-highlight border-highlight text-white'
                : 'bg-surface border-default text-primary'}"
              onclick={() => (componentSet = 'mixed')}
            >
              Mixed Components
            </button>
            <button
              class="w-full rounded border px-3 py-2 text-left {componentSet === 'cards'
                ? 'bg-highlight border-highlight text-white'
                : 'bg-surface border-default text-primary'}"
              onclick={() => (componentSet = 'cards')}
            >
              Cards Only
            </button>
            <button
              class="w-full rounded border px-3 py-2 text-left {componentSet === 'buttons'
                ? 'bg-highlight border-highlight text-white'
                : 'bg-surface border-default text-primary'}"
              onclick={() => (componentSet = 'buttons')}
            >
              Buttons Only
            </button>
            <button
              class="w-full rounded border px-3 py-2 text-left {componentSet === 'tags'
                ? 'bg-highlight border-highlight text-white'
                : 'bg-surface border-default text-primary'}"
              onclick={() => (componentSet = 'tags')}
            >
              Tags Only
            </button>
          </div>
        </div>
      </section>

      <!-- Display Options -->
      <section class="bg-surface border-default rounded-xl border-2 p-6">
        <h3 class="text-h4 mb-4 font-semibold" style="color: var(--color-text-primary);">Display Options</h3>
        <div class="space-y-3">
          <button
            class="bg-surface border-default text-primary hover:bg-surface-hover w-full rounded border px-3 py-2 text-left"
            onclick={() => (showCSS = !showCSS)}
          >
            {showCSS ? 'Hide' : 'Show'} Generated CSS
          </button>
        </div>
      </section>
    </div>
  </div>

  <!-- Layout Preview -->
  <div class="space-y-6 lg:col-span-2">
    <!-- Header -->
    <div>
      <h1 class="text-h1 text-primary mb-2 font-bold">Interactive Layout Builder</h1>
      <p class="text-body-l text-secondary">
        Experiment with different layout arrangements and see the results in real-time. Adjust properties in the control
        panel to explore the layout engine's capabilities.
      </p>
    </div>

    <!-- Current Layout Info -->
    <section class="bg-surface-elevated border-default rounded-xl border-2 p-6">
      <h3 class="text-h3 mb-4 font-semibold" style="color: var(--color-text-primary);">Current Configuration</h3>
      <div class="text-body-s grid grid-cols-2 gap-4">
        <div>
          <span class="text-primary font-medium">Type:</span>
          <span class="text-secondary ml-2 capitalize">{currentLayout.arrangement.type}</span>
        </div>
        <div>
          <span class="text-primary font-medium">Mode:</span>
          <span class="text-secondary ml-2">{currentLayout.autoLayout?.mode || 'default'}</span>
        </div>
        <div>
          <span class="text-primary font-medium">Gap:</span>
          <span class="text-secondary ml-2 capitalize">{currentLayout.autoLayout?.gap?.scale || 'normal'}</span>
        </div>
        <div>
          <span class="text-primary font-medium">Padding:</span>
          <span class="text-secondary ml-2 capitalize">{currentLayout.autoLayout?.padding?.all?.scale || 'normal'}</span
          >
        </div>
      </div>
    </section>

    <!-- Live Preview -->
    <div class="layout-demo">
      <h2 class="layout-demo-title">Live Preview</h2>
      <p class="layout-demo-description">
        The layout below updates automatically as you change the controls. Components are arranged using the generated
        CSS from your configuration.
      </p>

      <!-- Container to show Auto Layout Mode effects -->
      <div class="bg-neutral-100 rounded-xl border-2 border-dashed border-neutral-300 p-6" style="width: 600px; height: 400px; overflow: auto;">
        <div class="bg-highlight-50 border-2 border-highlight-200 rounded-lg p-2 mb-4">
          <span class="text-body-s font-medium text-highlight">Container: 600×400px (shows Auto Layout Mode effects)</span>
        </div>
        <div class="generated-layout bg-surface border-2 border-surface-elevated rounded-lg" style={generatedCSS}>
        {#if componentSet === 'cards'}
          {#each componentSets.cards as item}
            <CardHorizontal {...item.props} />
          {/each}
        {:else if componentSet === 'buttons'}
          {#each componentSets.buttons as item}
            <Button {...item.props}>
              {#snippet children()}{item.content}{/snippet}
            </Button>
          {/each}
        {:else if componentSet === 'tags'}
          {#each componentSets.tags as item}
            <Tag text={item.content} />
          {/each}
        {:else if componentSet === 'mixed'}
          <Banner title="Welcome!" description="Get started with your new project" variant="info" />
          <Card title="Quick Start" description="Follow these steps to begin" />
          <div class="flex gap-2">
            <Button variant="primary" size="small">
              {#snippet children()}Continue{/snippet}
            </Button>
            <Button variant="secondary" size="small">
              {#snippet children()}Learn More{/snippet}
            </Button>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <Tag text="Getting Started" />
            <Tag text="Tutorial" />
            <Badge type="number" value={5} />
          </div>
        {/if}
        </div>
        <div class="mt-4 text-body-xs text-secondary">
          <p><strong>Auto Layout Mode Effects:</strong></p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li><strong>Hug Contents:</strong> Layout shrinks to fit content size</li>
            <li><strong>Fill Container:</strong> Layout expands to fill the 600×400px container</li>
            <li><strong>Fixed Size:</strong> Layout uses natural size without constraints</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Generated CSS -->
    {#if showCSS}
      <section class="bg-surface border-default rounded-xl border-2 p-6">
        <h3 class="text-h3 mb-4 font-semibold" style="color: var(--color-text-primary);">Generated CSS</h3>
        <div class="code-output">
          <pre class="text-body-xs font-mono whitespace-pre-wrap">{formattedCSS}</pre>
        </div>
        <div class="text-body-s text-secondary mt-4">
          <p>
            This CSS is automatically generated from your layout configuration. Copy and use it in your own projects, or
            use the Layout Engine programmatically.
          </p>
        </div>
      </section>
    {/if}

    <!-- Usage Example -->
    <section class="bg-surface-elevated border-default rounded-xl border-2 p-6">
      <h3 class="text-h3 mb-4 font-semibold" style="color: var(--color-text-primary);">Usage Example</h3>
      <div class="code-output">
        <pre class="text-body-xs font-mono">{`import { LayoutEngine } from '@senka-ai/layout-engine'

const engine = new LayoutEngine()
const layout = ${JSON.stringify(currentLayout, null, 2)}

const css = engine.generateCSS(layout)
// Apply the generated CSS to your container`}</pre>
      </div>
    </section>
  </div>
</div>
