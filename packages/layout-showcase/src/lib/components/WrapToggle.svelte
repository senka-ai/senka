<!--
packages/layout-showcase/src/lib/components/WrapToggle.svelte
Reusable toggle component for enabling/disabling wrap behavior in row layouts
Used in Row arrangement to control whether items wrap to new lines
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/row.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { Toggle, Container } from '@senka-ai/ui'
  import { RowArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  interface Props {
    value: boolean
    onchange?: (newWrap: boolean) => void
    disabled?: boolean
  }

  let { value, onchange, disabled = false }: Props = $props()

  // Layout configuration
  const row = new RowArrangement()
  const wrapConfig = {
    id: 'wrap-control',
    type: 'row',
    gap: 'normal',
    align: 'center',
    fillContainer: true,
  }

  function handleToggle(newValue: boolean) {
    onchange?.(newValue)
  }
</script>

<Container padding="none" background={false}>
  {#snippet children()}
    <div style={cssPropertiesToString(row.toCSS(wrapConfig))}>
      <span class="text-body-s text-secondary font-medium">Wrap:</span>

      <Toggle
        checked={value}
        {disabled}
        onchange={handleToggle}
        size="medium"
      />

      <span class="text-body-xs text-muted">
        {value ? 'Items wrap to new lines when needed' : 'Items stay on single line'}
      </span>
    </div>
  {/snippet}
</Container>
