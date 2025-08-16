<!--
packages/layout-showcase/src/lib/components/SpacingSlider.svelte
Reusable spacing selector component using layout engine spacing scales
Used across all arrangement types to control gap spacing
RELEVANT FILES: packages/layout-engine/src/lib/utils/spacing.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { Dropdown, Container } from '@senka-ai/ui'
  import { RowArrangement, StackArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  type SpacingScale = 'none' | 'tight' | 'cozy' | 'normal' | 'comfortable' | 'spacious'

  interface Props {
    value: SpacingScale
    onchange?: (newSpacing: SpacingScale) => void
    disabled?: boolean
  }

  let { value, onchange, disabled = false }: Props = $props()

  // Layout configurations
  const row = new RowArrangement()
  const stack = new StackArrangement()
  
  const spacingConfig = {
    id: 'spacing-control',
    type: 'row',
    gap: 'normal',
    align: 'center',
    fillContainer: true,
  }

  // Spacing options with descriptions and pixel values
  const spacingOptions = [
    { value: 'none' as const, label: 'None', description: '0px - No spacing' },
    { value: 'tight' as const, label: 'Tight', description: '4px - Minimal spacing' },
    { value: 'cozy' as const, label: 'Cozy', description: '8px - Compact spacing' },
    { value: 'normal' as const, label: 'Normal', description: '16px - Standard spacing' },
    { value: 'comfortable' as const, label: 'Comfortable', description: '24px - Relaxed spacing' },
    { value: 'spacious' as const, label: 'Spacious', description: '32px - Generous spacing' },
  ]

  function handleSpacingChange(selectedValue: string) {
    if (disabled) return
    const newSpacing = selectedValue as SpacingScale
    onchange?.(newSpacing)
  }

  const selectedOption = $derived(spacingOptions.find((opt) => opt.value === value))
</script>

<Container padding="none" background={false}>
  {#snippet children()}
    <div style={cssPropertiesToString(row.toCSS(spacingConfig))}>
      <span class="text-body-s text-secondary font-medium">Spacing:</span>

      <Container padding="none" background={false} style="min-width: 12rem;">
        {#snippet children()}
          <Dropdown
            options={spacingOptions.map((opt) => ({
              value: opt.value,
              label: `${opt.label}`,
            }))}
            {value}
            onchange={handleSpacingChange}
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
