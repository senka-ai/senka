<!--
packages/layout-showcase/src/lib/components/AlignmentPicker.svelte
Visual alignment picker component for counter-axis alignment
Used across arrangement types to control how items align perpendicular to main axis
RELEVANT FILES: packages/layout-engine/src/lib/types/index.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { Button } from '@senka-ai/ui'
  
  type Alignment = 'start' | 'center' | 'end' | 'stretch'
  
  interface Props {
    value: Alignment
    onchange?: (newAlignment: Alignment) => void
    disabled?: boolean
  }
  
  let { value, onchange, disabled = false }: Props = $props()
  
  const alignmentOptions = [
    { 
      value: 'start' as const, 
      label: 'Start', 
      description: 'Align to start of container',
      icon: '⬆' 
    },
    { 
      value: 'center' as const, 
      label: 'Center', 
      description: 'Center in container',
      icon: '↔' 
    },
    { 
      value: 'end' as const, 
      label: 'End', 
      description: 'Align to end of container',
      icon: '⬇' 
    },
    { 
      value: 'stretch' as const, 
      label: 'Stretch', 
      description: 'Stretch to fill container',
      icon: '↕' 
    }
  ]
  
  function handleAlignmentChange(newAlignment: Alignment) {
    if (disabled) return
    onchange?.(newAlignment)
  }
</script>

<div class="space-y-3">
  <span class="text-body-s text-secondary font-medium">Counter-axis Alignment:</span>
  
  <div class="flex gap-2">
    {#each alignmentOptions as option}
      <Button
        variant={value === option.value ? 'primary' : 'secondary'}
        size="small"
        {disabled}
        onclick={() => handleAlignmentChange(option.value)}
      >
        {#snippet children()}
          <span class="flex items-center gap-2">
            <span class="text-lg">{option.icon}</span>
            <span>{option.label}</span>
          </span>
        {/snippet}
      </Button>
    {/each}
  </div>
  
  <span class="text-body-xs text-tertiary">
    {alignmentOptions.find(opt => opt.value === value)?.description}
  </span>
</div>