<script lang="ts">
  import '../app.css'
  import { browser } from '$app/environment'
  import { setTheme } from '@senka-ai/ui'
  import Navigation from '$lib/components/navigation/Navigation.svelte'

  let { children } = $props()

  // Force light theme to match design system specifications
  if (browser) {
    setTheme('light')
  }

  // No auth routes anymore - all routes use main layout
  let isAuthRoute = $derived(false)

  // Responsive breakpoint detection
  let isMobile = $state(false)

  function updateIsMobile() {
    if (browser) {
      isMobile = window.innerWidth < 768
    }
  }

  if (browser) {
    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)
  }
</script>

{#if isAuthRoute}
  <!-- Full-screen layout for auth pages -->
  <div class="auth-layout">
    {@render children()}
  </div>
{:else}
  <!-- Main app layout with responsive navigation -->
  <div class="app-layout" class:mobile={isMobile}>
    {#if isMobile}
      <!-- Mobile layout: content with fixed bottom tabs -->
      <main class="mobile-content">
        {@render children()}
      </main>
      <Navigation {isMobile} />
    {:else}
      <!-- Desktop layout: sidebar + content -->
      <Navigation {isMobile} />
      <main class="desktop-content">
        {@render children()}
      </main>
    {/if}
  </div>
{/if}

<style>
  .auth-layout {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-background);
  }

  .app-layout {
    height: 100vh;
    display: grid;
    background: var(--color-background);
    overflow: hidden;
  }

  .app-layout:not(.mobile) {
    /* Desktop layout: sidebar + content */
    grid-template-columns: 280px 1fr;
    grid-template-areas: 'nav content';
  }

  .app-layout.mobile {
    /* Mobile layout: content only (nav is fixed) */
    grid-template-rows: 1fr;
    grid-template-areas: 'content';
  }

  .desktop-content {
    grid-area: content;
    padding: 2rem;
    overflow-y: auto;
    background: var(--color-background);
  }

  .mobile-content {
    grid-area: content;
    padding: 1rem;
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100vh - 80px); /* Full height minus navigation height */
    box-sizing: border-box;
    background: var(--color-background);
  }

  /* Responsive adjustments */
  @media (max-width: 767px) {
    .app-layout:not(.mobile) {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr auto;
      grid-template-areas:
        'content'
        'nav';
    }
  }
</style>
