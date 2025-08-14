<!--
packages/layout-showcase/src/lib/components/SpacingSlider.svelte
Reusable spacing selector component using layout engine spacing scales
Used across all arrangement types to control gap spacing
RELEVANT FILES: packages/layout-engine/src/lib/utils/spacing.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { Dropdown } from '@senka-ai/ui'

  type SpacingScale = 'none' | 'tight' | 'cozy' | 'normal' | 'comfortable' | 'spacious'

  interface Props {
    value: SpacingScale
    onchange?: (newSpacing: SpacingScale) => void
    disabled?: boolean
  }

  let { value, onchange, disabled = false }: Props = $props()

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

<div class="flex items-center gap-3">
  <span class="text-body-s text-secondary font-medium">Spacing:</span>

  <div class="min-w-48">
    <Dropdown
      options={spacingOptions.map((opt) => ({
        value: opt.value,
        label: `${opt.label}`,
      }))}
      {value}
      onchange={handleSpacingChange}
      {disabled}
    />
  </div>

  {#if selectedOption}
    <span class="text-body-xs text-tertiary">
      {selectedOption.description}
    </span>
  {/if}
</div>
