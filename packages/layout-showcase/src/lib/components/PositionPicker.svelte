<!--
packages/layout-showcase/src/lib/components/PositionPicker.svelte
Position picker control for overlay arrangement
Visual grid-based selector for overlay position values
RELEVANT FILES: packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { RadioGroup, RadioButton, StackLayout } from '@senka-ai/ui'

  interface Props {
    value: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    onchange: (value: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => void
  }

  let { value, onchange }: Props = $props()

  function handleChange(newValue: string) {
    onchange(newValue as typeof value)
  }
</script>

<StackLayout gap="normal">
  <span class="text-body-s text-secondary font-medium">Overlay Position:</span>
  {#key value}
    <RadioGroup
      name="position"
      value={value}
      onchange={handleChange}
    >
    <RadioButton value="top-left" label="Top Left" />
    <RadioButton value="top-right" label="Top Right" />
    <RadioButton value="center" label="Center" />
    <RadioButton value="bottom-left" label="Bottom Left" />
    <RadioButton value="bottom-right" label="Bottom Right" />
    </RadioGroup>
  {/key}
</StackLayout>