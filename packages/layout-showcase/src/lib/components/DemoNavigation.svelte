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
    currentPage?: 'home' | 'stack' | 'row' | 'grid' | 'flow' | 'overlay' | 'frame'
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
  <LayoutDiv config={navConfig}>
    <Button variant={currentPage === 'home' ? 'primary' : 'secondary'} onclick={() => (window.location.href = '/')}>
      Home
    </Button>
    <Button
      variant={currentPage === 'stack' ? 'primary' : 'secondary'}
      onclick={() => (window.location.href = '/stack-demo')}
    >
      Stack Demo
    </Button>
    <Button
      variant={currentPage === 'row' ? 'primary' : 'secondary'}
      onclick={() => (window.location.href = '/row-demo')}
    >
      Row Demo
    </Button>
    <Button
      variant={currentPage === 'grid' ? 'primary' : 'secondary'}
      onclick={() => (window.location.href = '/grid-demo')}
    >
      Grid Demo
    </Button>
    <Button
      variant={currentPage === 'flow' ? 'primary' : 'secondary'}
      onclick={() => (window.location.href = '/flow-demo')}
    >
      Flow Demo
    </Button>
    <Button
      variant={currentPage === 'overlay' ? 'primary' : 'secondary'}
      onclick={() => (window.location.href = '/overlay-demo')}
    >
      Overlay Demo
    </Button>
    <Button
      variant={currentPage === 'frame' ? 'primary' : 'secondary'}
      onclick={() => (window.location.href = '/frame-demo')}
    >
      Frame Demo
    </Button>
  </LayoutDiv>
</Container>
