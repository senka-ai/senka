<!--
packages/layout-showcase/src/lib/components/DemoNavigation.svelte
Demo Navigation - Shared navigation component for all demo pages
Provides consistent demo menu across all pages in the layout showcase
RELEVANT FILES: packages/ui/src/lib/index.ts, packages/layout-engine/src/lib/index.ts
-->

<script lang="ts">
  import { Button, Container, LayoutDiv } from '@senka-ai/ui'
  import type { LayoutContainer } from '@senka-ai/layout-engine'

  interface Props {
    currentPage?: 'home' | 'stack' | 'row' | 'grid' | 'flow'
  }

  let { currentPage = 'home' }: Props = $props()

  const navConfig: LayoutContainer = {
    id: 'demo-navigation',
    type: 'row',
    gap: 'normal',
    align: 'center',
    wrap: true,
    fillContainer: false,
  }
</script>

<Container variant="elevated" padding="normal" radius="normal" fullWidth>
  {#snippet children()}
    <LayoutDiv config={navConfig}>
      {#snippet children()}
        <Button variant={currentPage === 'home' ? 'primary' : 'secondary'} onclick={() => (window.location.href = '/')}>
          {#snippet children()}
            Home
          {/snippet}
        </Button>
        <Button
          variant={currentPage === 'stack' ? 'primary' : 'secondary'}
          onclick={() => (window.location.href = '/stack-demo')}
        >
          {#snippet children()}
            Stack Demo
          {/snippet}
        </Button>
        <Button
          variant={currentPage === 'row' ? 'primary' : 'secondary'}
          onclick={() => (window.location.href = '/row-demo')}
        >
          {#snippet children()}
            Row Demo
          {/snippet}
        </Button>
        <Button
          variant={currentPage === 'grid' ? 'primary' : 'secondary'}
          onclick={() => (window.location.href = '/grid-demo')}
        >
          {#snippet children()}
            Grid Demo
          {/snippet}
        </Button>
        <Button
          variant={currentPage === 'flow' ? 'primary' : 'secondary'}
          onclick={() => (window.location.href = '/flow-demo')}
        >
          {#snippet children()}
            Flow Demo
          {/snippet}
        </Button>
      {/snippet}
    </LayoutDiv>
  {/snippet}
</Container>
