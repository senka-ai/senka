<!--
packages/layout-showcase/src/routes/+layout.svelte
Layout Showcase - Root layout for the application
Provides the base structure and imports required styles for the layout showcase
RELEVANT FILES: packages/layout-showcase/src/app.css, packages/ui/src/styles/index.css, SENKA_SYSTEM_ARCHITECTURE.md
-->

<script lang="ts">
  import '../app.css'
</script>

<div>
  <main>
    <slot />
  </main>
</div>
