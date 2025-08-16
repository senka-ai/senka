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

<main class="bg-background min-h-screen">
  <div class="mx-auto max-w-4xl px-6 py-12">
    <header class="mb-12 text-center">
      <h1 class="text-h1 text-primary mb-4">{showcaseTitle}</h1>
      <p class="text-body-l text-secondary mx-auto max-w-2xl">
        {description}. This is a barebones package ready for layout engine integration.
      </p>
      <div class="mt-6">
        <Badge value="Under Development" />
      </div>
    </header>

    <section class="space-y-8">
      <div class="bg-surface border-default space-y-4 rounded-xl border-2 p-6">
        <h2 class="text-h3 text-primary">Ready for Layout Engine</h2>
        <p class="text-body-m text-secondary">
          This package is configured and ready to showcase layout engine components. The project structure follows Senka
          standards with proper UI library integration.
        </p>

        <div class="mt-6 flex gap-3">
          <Button variant="primary" onclick={() => (window.location.href = '/stack-demo')}>
            {#snippet children()}
              Try Stack Demo
            {/snippet}
          </Button>
          <Button variant="primary" onclick={() => (window.location.href = '/row-demo')}>
            {#snippet children()}
              Try Row Demo
            {/snippet}
          </Button>
          <Button variant="secondary">
            {#snippet children()}
              View Documentation
            {/snippet}
          </Button>
        </div>
      </div>

      <div class="bg-surface border-default space-y-4 rounded-xl border-2 p-6">
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
