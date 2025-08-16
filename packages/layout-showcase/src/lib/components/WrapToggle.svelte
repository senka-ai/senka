<!--
packages/layout-showcase/src/lib/components/WrapToggle.svelte
Reusable toggle component for enabling/disabling wrap behavior in row layouts
Used in Row arrangement to control whether items wrap to new lines
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/row.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { Button } from '@senka-ai/ui'

  interface Props {
    value: boolean
    onchange?: (newWrap: boolean) => void
    disabled?: boolean
  }

  let { value, onchange, disabled = false }: Props = $props()

  function toggleWrap() {
    if (disabled) return
    const newWrap = !value
    onchange?.(newWrap)
  }
</script>

<div class="flex items-center gap-3">
  <span class="text-body-s text-secondary font-medium">Wrap:</span>

  <Button variant="secondary" {disabled} onclick={toggleWrap}>
    {#snippet children()}
      {value ? 'Enabled' : 'Disabled'}
    {/snippet}
  </Button>

  <span class="text-body-xs text-tertiary">
    {value ? 'Items wrap to new lines when needed' : 'Items stay on single line'}
  </span>
</div>
