<!-- 
packages/layout-showcase/src/routes/+layout.svelte
Main layout template for the layout showcase application
Provides navigation, header, and footer structure for all pages
RELEVANT FILES: packages/layout-showcase/src/app.css, packages/ui/src/lib/components/core/ThemeToggle.svelte, packages/layout-showcase/src/routes/+page.svelte, packages/layout-showcase/src/routes/interactive/+page.svelte
-->

<script lang="ts">
  import '../app.css'
  import { ThemeToggle } from '@senka-ai/ui'

  let { children } = $props()
</script>

<div class="min-h-screen" style="background-color: var(--color-background);">
  <!-- Navigation -->
  <nav
    style="border-bottom: 1px solid var(--color-border-default); background-color: var(--color-surface-elevated);"
    class="px-6 py-3"
  >
    <div class="mx-auto flex max-w-7xl gap-6">
      <a
        href="/"
        style="color: var(--color-text-primary); font-size: 14px; font-weight: 500;"
        class="hover:color-[var(--color-highlight)] transition-colors"
      >
        Overview
      </a>
      <a
        href="/interactive"
        style="color: var(--color-text-primary); font-size: 14px; font-weight: 500;"
        class="hover:color-[var(--color-highlight)] transition-colors"
      >
        Interactive Builder
      </a>
    </div>
  </nav>

  <!-- Header -->
  <header
    style="border-bottom: 1px solid var(--color-border-default); background-color: var(--color-surface);"
    class="px-6 py-4"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between">
      <div>
        <h1 class="text-h1 font-bold" style="color: var(--color-text-primary);">Layout Engine Showcase</h1>
        <p class="text-body-m" style="color: var(--color-text-secondary);">
          Interactive demonstration of layout capabilities using Senka UI components
        </p>
      </div>
      <ThemeToggle />
    </div>
  </header>

  <!-- Main Content -->
  <main class="mx-auto max-w-7xl px-6 py-8">
    {#if children}
      {@render children()}
    {/if}
  </main>

  <!-- Footer -->
  <footer
    style="border-top: 1px solid var(--color-border-default); background-color: var(--color-surface);"
    class="mt-16 px-6 py-8"
  >
    <div class="mx-auto max-w-7xl text-center">
      <p class="text-body-s" style="color: var(--color-text-secondary);">
        Layout engine powered by <span class="font-semibold">@senka-ai/layout-engine</span>
        using components from <span class="font-semibold">@senka-ai/ui</span>
      </p>
    </div>
  </footer>
</div>
