<!--
packages/layout-showcase/src/lib/components/GridJustifyPicker.svelte
Grid justify-items picker component for horizontal alignment within grid cells
Used in grid arrangements to control how items align horizontally within their cells
RELEVANT FILES: packages/layout-engine/src/lib/core/arrangements/grid.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { Button, Container } from '@senka-ai/ui'
  import {
    AlignItemLeftLineDesign,
    AlignItemHorizontalCenterLineDesign,
    AlignItemRightLineDesign,
    ExpandHorizontalLineArrows,
  } from 'svelte-remix'
  import { StackArrangement, RowArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  // For grids, we map the flex justify values to grid justify-items semantically
  type GridJustify = 'packed' | 'center' | 'space-between' | 'space-around'

  interface Props {
    value: GridJustify
    onchange?: (newJustify: GridJustify) => void
    disabled?: boolean
  }

  let { value, onchange, disabled = false }: Props = $props()

  // Layout configurations
  const stack = new StackArrangement()
  const row = new RowArrangement()

  const labelConfig = {
    id: 'grid-justify-label',
    type: 'stack',
    direction: 'vertical',
    gap: 'tight',
    fillContainer: true,
  }

  const buttonsConfig = {
    id: 'grid-justify-buttons',
    type: 'row',
    gap: 'tight',
    align: 'center',
    wrap: true,
    fillContainer: false,
  }

  const descriptionConfig = {
    id: 'grid-justify-description',
    type: 'stack',
    direction: 'vertical',
    gap: 'none',
    fillContainer: true,
  }

  // Grid-specific justify options (mapped to justify-items values)
  const gridJustifyOptions = [
    {
      value: 'packed' as const,
      label: 'Start',
      description: 'Align items to left of cells',
      icon: AlignItemLeftLineDesign,
      gridValue: 'start',
    },
    {
      value: 'center' as const,
      label: 'Center',
      description: 'Center items in cells',
      icon: AlignItemHorizontalCenterLineDesign,
      gridValue: 'center',
    },
    {
      value: 'space-between' as const,
      label: 'End',
      description: 'Align items to right of cells',
      icon: AlignItemRightLineDesign,
      gridValue: 'end',
    },
    {
      value: 'space-around' as const,
      label: 'Stretch',
      description: 'Items fill cell width',
      icon: ExpandHorizontalLineArrows,
      gridValue: 'stretch',
    },
  ]

  function handleJustifyChange(newJustify: GridJustify) {
    if (disabled) return
    onchange?.(newJustify)
  }

  const selectedOption = $derived(gridJustifyOptions.find((opt) => opt.value === value))
</script>

<Container padding="none" background={false}>
  {#snippet children()}
    <div style={cssPropertiesToString(stack.toCSS(labelConfig))}>
      <span class="text-body-s text-secondary font-medium">Horizontal Alignment:</span>

      <div style={cssPropertiesToString(row.toCSS(buttonsConfig))}>
        {#each gridJustifyOptions as option}
          <Button
            variant={value === option.value ? 'primary' : 'secondary'}
            size="small"
            {disabled}
            onclick={() => handleJustifyChange(option.value)}
          >
            {#snippet leftIcon(size)}
              {#if option.icon === AlignItemLeftLineDesign}
                <AlignItemLeftLineDesign {size} />
              {:else if option.icon === AlignItemHorizontalCenterLineDesign}
                <AlignItemHorizontalCenterLineDesign {size} />
              {:else if option.icon === AlignItemRightLineDesign}
                <AlignItemRightLineDesign {size} />
              {:else if option.icon === ExpandHorizontalLineArrows}
                <ExpandHorizontalLineArrows {size} />
              {/if}
            {/snippet}
            {#snippet children()}
              {option.label}
            {/snippet}
          </Button>
        {/each}
      </div>

      <div style={cssPropertiesToString(stack.toCSS(descriptionConfig))}>
        <span class="text-body-xs text-muted">
          {selectedOption?.description} (justify-items: {selectedOption?.gridValue})
        </span>
      </div>
    </div>
  {/snippet}
</Container>
