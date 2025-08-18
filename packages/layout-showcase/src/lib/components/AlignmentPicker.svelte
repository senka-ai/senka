<!--
packages/layout-showcase/src/lib/components/AlignmentPicker.svelte
Visual alignment picker component for counter-axis alignment
Used across arrangement types to control how items align perpendicular to main axis
RELEVANT FILES: packages/layout-engine/src/lib/types/index.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { Button, Container } from '@senka-ai/ui'
  import {
    AlignItemTopLineDesign,
    AlignItemVerticalCenterLineDesign,
    AlignItemBottomLineDesign,
    ExpandVerticalLineArrows,
  } from 'svelte-remix'
  import { StackArrangement, RowArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  type Alignment = 'start' | 'center' | 'end' | 'stretch'

  interface Props {
    value: Alignment
    onchange?: (newAlignment: Alignment) => void
    disabled?: boolean
  }

  let { value, onchange, disabled = false }: Props = $props()

  // Layout configurations
  const stack = new StackArrangement()
  const row = new RowArrangement()

  const labelConfig = {
    id: 'alignment-label',
    type: 'stack',
    direction: 'vertical',
    gap: 'tight',
    fillContainer: true,
  }

  const buttonsConfig = {
    id: 'alignment-buttons',
    type: 'row',
    gap: 'tight',
    align: 'center',
    fillContainer: false,
  }

  const descriptionConfig = {
    id: 'alignment-description',
    type: 'stack',
    direction: 'vertical',
    gap: 'none',
    fillContainer: true,
  }

  const alignmentOptions = [
    {
      value: 'start' as const,
      label: 'Start',
      description: 'Align to top (for rows) / left (for stacks)',
      icon: AlignItemTopLineDesign,
    },
    {
      value: 'center' as const,
      label: 'Center',
      description: 'Center vertically (for rows) / horizontally (for stacks)',
      icon: AlignItemVerticalCenterLineDesign,
    },
    {
      value: 'end' as const,
      label: 'End',
      description: 'Align to bottom (for rows) / right (for stacks)',
      icon: AlignItemBottomLineDesign,
    },
    {
      value: 'stretch' as const,
      label: 'Stretch',
      description: 'Stretch to fill height (for rows) / width (for stacks)',
      icon: ExpandVerticalLineArrows,
    },
  ]

  function handleAlignmentChange(newAlignment: Alignment) {
    if (disabled) return
    onchange?.(newAlignment)
  }
</script>

<Container padding="none" background={false}>
  {#snippet children()}
    <div style={cssPropertiesToString(stack.toCSS(labelConfig))}>
      <span class="text-body-s text-secondary font-medium">Counter-axis Alignment:</span>

      <div style={cssPropertiesToString(row.toCSS(buttonsConfig))}>
        {#each alignmentOptions as option}
          <Button
            variant={value === option.value ? 'primary' : 'secondary'}
            size="small"
            {disabled}
            onclick={() => handleAlignmentChange(option.value)}
          >
            {#snippet leftIcon(size)}
              {#if option.icon === AlignItemTopLineDesign}
                <AlignItemTopLineDesign {size} />
              {:else if option.icon === AlignItemVerticalCenterLineDesign}
                <AlignItemVerticalCenterLineDesign {size} />
              {:else if option.icon === AlignItemBottomLineDesign}
                <AlignItemBottomLineDesign {size} />
              {:else if option.icon === ExpandVerticalLineArrows}
                <ExpandVerticalLineArrows {size} />
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
          {alignmentOptions.find((opt) => opt.value === value)?.description}
        </span>
      </div>
    </div>
  {/snippet}
</Container>
