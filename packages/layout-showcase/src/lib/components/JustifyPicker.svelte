<!--
packages/layout-showcase/src/lib/components/JustifyPicker.svelte
Visual justify picker component for main-axis justification
Used across row arrangements to control how items are distributed along the main axis
RELEVANT FILES: packages/layout-engine/src/lib/types/index.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { Button } from '@senka-ai/ui'

  type Justify = 'packed' | 'space-between' | 'center' | 'space-around'

  interface Props {
    value: Justify
    onchange?: (newJustify: Justify) => void
    disabled?: boolean
  }

  let { value, onchange, disabled = false }: Props = $props()

  const justifyOptions = [
    {
      value: 'packed' as const,
      label: 'Packed',
      description: 'Items grouped at start',
      icon: '⟨|||⟩',
    },
    {
      value: 'center' as const,
      label: 'Center',
      description: 'Items centered in container',
      icon: '⟨ ||| ⟩',
    },
    {
      value: 'space-between' as const,
      label: 'Space Between',
      description: 'Items spread with space between',
      icon: '⟨| | |⟩',
    },
    {
      value: 'space-around' as const,
      label: 'Space Around',
      description: 'Items with equal space around',
      icon: '⟨ | | | ⟩',
    },
  ]

  function handleJustifyChange(newJustify: Justify) {
    if (disabled) return
    onchange?.(newJustify)
  }
</script>

<div class="space-y-3">
  <span class="text-body-s text-secondary font-medium">Main-axis Justification:</span>

  <div class="flex flex-wrap gap-2">
    {#each justifyOptions as option}
      <Button
        variant={value === option.value ? 'primary' : 'secondary'}
        size="small"
        {disabled}
        onclick={() => handleJustifyChange(option.value)}
      >
        {#snippet children()}
          <span class="flex items-center gap-2">
            <span class="font-mono text-sm">{option.icon}</span>
            <span>{option.label}</span>
          </span>
        {/snippet}
      </Button>
    {/each}
  </div>

  <span class="text-body-xs text-tertiary">
    {justifyOptions.find((opt) => opt.value === value)?.description}
  </span>
</div>
