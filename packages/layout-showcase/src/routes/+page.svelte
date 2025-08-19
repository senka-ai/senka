<!--
packages/layout-showcase/src/routes/+page.svelte
Layout Showcase - Main page for demonstrating layout engine capabilities
This page serves as a showcase for the layout engine package components and arrangements
RELEVANT FILES: packages/layout-engine/src/lib/index.ts, packages/ui/src/lib/index.ts, NEW_PACKAGE.md, PATH_ALIAS_STANDARDS.md
-->

<script lang="ts">
  // Import UI components - including new layout components
  import { Badge, Container, LayoutDiv } from '@senka-ai/ui'
  import type { LayoutContainer } from '@senka-ai/layout-engine'
  import DemoNavigation from '$lib/components/DemoNavigation.svelte'

  let showcaseTitle = 'Layout Showcase'
  let description = 'This package demonstrates the layout engine capabilities'

  // Layout configurations using the layout engine
  const pageConfig: LayoutContainer = {
    id: 'page-layout',
    type: 'stack',
    direction: 'vertical',
    gap: 'normal',
    fillContainer: true,
  }

  const headerConfig: LayoutContainer = {
    id: 'header-layout',
    type: 'stack',
    direction: 'vertical',
    gap: 'normal',
    fillContainer: true,
  }

  const sectionsConfig: LayoutContainer = {
    id: 'sections-layout',
    type: 'stack',
    direction: 'vertical',
    gap: 'normal',
    fillContainer: true,
  }

  const listConfig: LayoutContainer = {
    id: 'list-layout',
    type: 'stack',
    direction: 'vertical',
    gap: 'normal',
    fillContainer: true,
  }
</script>

<svelte:head>
  <title>{showcaseTitle}</title>
  <meta name="description" content={description} />
</svelte:head>

<Container padding="comfortable" fullWidth background>
  {#snippet children()}
    <LayoutDiv config={pageConfig}>
      {#snippet children()}
        <!-- Demo Navigation -->
        <DemoNavigation currentPage="home" />

        <Container variant="default" padding="spacious" background={false}>
          {#snippet children()}
            <LayoutDiv config={headerConfig}>
              {#snippet children()}
                <h1 class="text-h1 text-primary">{showcaseTitle}</h1>
                <p class="text-body-l text-secondary">
                  {description}. This is a barebones package ready for layout engine integration.
                </p>
              {/snippet}
            </LayoutDiv>
          {/snippet}
        </Container>

        <LayoutDiv config={sectionsConfig}>
          {#snippet children()}
            <Container variant="elevated" padding="comfortable" radius="large">
              {#snippet children()}
                <LayoutDiv config={listConfig}>
                  {#snippet children()}
                    <h2 class="text-h3 text-primary">Package Configuration</h2>
                    <LayoutDiv config={listConfig}>
                      {#snippet children()}
                        <p class="text-body-m text-secondary">✅ UI library integration configured</p>
                        <p class="text-body-m text-secondary">✅ Tailwind CSS v4 setup</p>
                        <p class="text-body-m text-secondary">✅ TypeScript strict mode enabled</p>
                        <p class="text-body-m text-secondary">✅ Svelte 5 with runes</p>
                        <p class="text-body-m text-secondary">✅ Path aliases configured</p>
                        <p class="text-body-m text-secondary">✅ Layout engine integration (now active!)</p>
                      {/snippet}
                    </LayoutDiv>
                  {/snippet}
                </LayoutDiv>
              {/snippet}
            </Container>
          {/snippet}
        </LayoutDiv>
      {/snippet}
    </LayoutDiv>
  {/snippet}
</Container>
