<!--
packages/layout-showcase/src/lib/components/DirectionToggle.svelte
Reusable toggle component for switching layout direction (vertical/horizontal)
Used across Stack, Row, and other directional arrangements
RELEVANT FILES: packages/layout-engine/src/lib/types/index.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { Button } from '@senka-ai/ui'
  import { ArrowDownIcon, ArrowRightIcon } from '@senka-ai/ui/icons'

  interface Props {
    value: 'vertical' | 'horizontal'
    onchange?: (newDirection: 'vertical' | 'horizontal') => void
    disabled?: boolean
  }

  let { value, onchange, disabled = false }: Props = $props()

  function toggleDirection() {
    if (disabled) return
    const newDirection = value === 'vertical' ? 'horizontal' : 'vertical'
    onchange?.(newDirection)
  }
</script>

<div class="flex items-center gap-3">
  <span class="text-body-s text-secondary font-medium">Direction:</span>

  <Button variant="secondary" {disabled} onclick={toggleDirection}>
    {#snippet leftIcon(size)}
      {#if value === 'vertical'}
        <ArrowDownIcon {size} />
      {:else}
        <ArrowRightIcon {size} />
      {/if}
    {/snippet}
    {#snippet children()}
      {value === 'vertical' ? 'Vertical' : 'Horizontal'}
    {/snippet}
  </Button>

  <span class="text-body-xs text-tertiary">
    {value === 'vertical' ? 'Stack items top to bottom' : 'Stack items left to right'}
  </span>
</div>
