<!--
packages/layout-showcase/src/lib/components/DirectionToggle.svelte
Reusable toggle component for switching layout direction (vertical/horizontal)
Used across Stack, Row, and other directional arrangements
RELEVANT FILES: packages/layout-engine/src/lib/types/index.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { Button, Container } from '@senka-ai/ui'
  import { SwitchVertical, SwitchHorizontal } from 'svelte-heros'
  import { RowArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  interface Props {
    value: 'vertical' | 'horizontal'
    onchange?: (newDirection: 'vertical' | 'horizontal') => void
    disabled?: boolean
  }

  let { value, onchange, disabled = false }: Props = $props()

  // Layout configuration
  const row = new RowArrangement()
  const directionConfig = {
    id: 'direction-control',
    type: 'row',
    gap: 'normal',
    align: 'center',
    fillContainer: true,
  }

  function toggleDirection() {
    if (disabled) return
    const newDirection = value === 'vertical' ? 'horizontal' : 'vertical'
    onchange?.(newDirection)
  }
</script>

<Container padding="none" background={false}>
  {#snippet children()}
    <div style={cssPropertiesToString(row.toCSS(directionConfig))}>
      <span class="text-body-s text-secondary font-medium">Direction:</span>

      <Button variant="secondary" {disabled} onclick={toggleDirection}>
        {#snippet leftIcon(size)}
          {#if value === 'vertical'}
            <SwitchVertical {size} />
          {:else}
            <SwitchHorizontal {size} />
          {/if}
        {/snippet}
        {#snippet children()}
          {value === 'vertical' ? 'Vertical' : 'Horizontal'}
        {/snippet}
      </Button>

      <span class="text-body-xs text-muted">
        {value === 'vertical' ? 'Stack items top to bottom' : 'Stack items left to right'}
      </span>
    </div>
  {/snippet}
</Container>
