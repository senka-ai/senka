<!--
packages/layout-showcase/src/routes/+page.svelte
Layout Showcase - Main page for demonstrating layout engine capabilities
This page serves as a showcase for the layout engine package components and arrangements
RELEVANT FILES: packages/layout-engine/src/lib/index.ts, packages/ui/src/lib/index.ts, NEW_PACKAGE.md, PATH_ALIAS_STANDARDS.md
-->

<script lang="ts">
  // Import UI components
  import { Button, Badge } from '@senka-ai/ui'

  let showcaseTitle = 'Layout Showcase'
  let description = 'This package demonstrates the layout engine capabilities'
</script>

<svelte:head>
  <title>{showcaseTitle}</title>
  <meta name="description" content={description} />
</svelte:head>

<main class="min-h-screen bg-background">
  <div class="max-w-4xl mx-auto px-6 py-12">
    <header class="text-center mb-12">
      <h1 class="text-h1 text-primary mb-4">{showcaseTitle}</h1>
      <p class="text-body-l text-secondary max-w-2xl mx-auto">
        {description}. This is a barebones package ready for layout engine integration.
      </p>
      <div class="mt-6">
        <Badge value="Under Development" />
      </div>
    </header>

    <section class="space-y-8">
      <div class="space-y-4 p-6 bg-surface border-2 border-default rounded-xl">
        <h2 class="text-h3 text-primary">Ready for Layout Engine</h2>
        <p class="text-body-m text-secondary">
          This package is configured and ready to showcase layout engine components.
          The project structure follows Senka standards with proper UI library integration.
        </p>
        
        <div class="flex gap-3 mt-6">
          <Button variant="primary">
            {#snippet children()}
              Primary Action
            {/snippet}
          </Button>
          <Button variant="secondary">
            {#snippet children()}
              Secondary Action
            {/snippet}
          </Button>
        </div>
      </div>

      <div class="space-y-4 p-6 bg-surface border-2 border-default rounded-xl">
        <h2 class="text-h3 text-primary">Package Configuration</h2>
        <ul class="text-body-m text-secondary space-y-2">
          <li>✅ UI library integration configured</li>
          <li>✅ Tailwind CSS v4 setup</li>
          <li>✅ TypeScript strict mode enabled</li>
          <li>✅ Svelte 5 with runes</li>
          <li>✅ Path aliases configured</li>
          <li>⏳ Layout engine integration (coming next)</li>
        </ul>
      </div>
    </section>
  </div>
</main>
