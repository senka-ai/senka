<!--
packages/layout-showcase/src/lib/components/ColumnsPicker.svelte
Grid columns selector component for grid arrangement demos
Allows users to control the number of columns in grid layouts
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/grid.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { Dropdown, Container } from '@senka-ai/ui'
  import { RowArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  interface Props {
    value: number | 'auto'
    onchange?: (newColumns: number | 'auto') => void
    disabled?: boolean
  }

  let { value, onchange, disabled = false }: Props = $props()

  // Layout configuration
  const row = new RowArrangement()
  const controlConfig = {
    id: 'columns-control',
    type: 'row',
    gap: 'normal',
    align: 'center',
    fillContainer: true,
  }

  // Column options
  const columnOptions = [
    { value: 'auto', label: 'Auto', description: 'Automatic column sizing' },
    { value: 2, label: '2 Columns', description: 'Two equal columns' },
    { value: 3, label: '3 Columns', description: 'Three equal columns' },
    { value: 4, label: '4 Columns', description: 'Four equal columns' },
    { value: 5, label: '5 Columns', description: 'Five equal columns' },
    { value: 6, label: '6 Columns', description: 'Six equal columns' },
  ]

  function handleColumnsChange(selectedValue: string | number) {
    if (disabled) return
    const newColumns = selectedValue === 'auto' ? 'auto' : Number(selectedValue)
    onchange?.(newColumns)
  }

  const selectedOption = $derived(columnOptions.find((opt) => opt.value === value))
</script>

<Container padding="none" background={false}>
  {#snippet children()}
    <div style={cssPropertiesToString(row.toCSS(controlConfig))}>
      <span class="text-body-s text-secondary font-medium">Columns:</span>

      <Container padding="none" background={false} minWidth="large">
        {#snippet children()}
          <Dropdown
            options={columnOptions.map((opt) => ({
              value: opt.value.toString(),
              label: opt.label,
            }))}
            value={value.toString()}
            onchange={handleColumnsChange}
            {disabled}
          />
        {/snippet}
      </Container>

      {#if selectedOption}
        <span class="text-body-xs text-muted">
          {selectedOption.description}
        </span>
      {/if}
    </div>
  {/snippet}
</Container>