<!--
packages/layout-showcase/src/lib/components/ConstraintsPicker.svelte
Constraints picker control for frame arrangement
Visual controls for setting element constraints and positioning
RELEVANT FILES: packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { RadioGroup, RadioButton, Toggle, Container, StackLayout, Divider } from '@senka-ai/ui'
  import { StackArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  interface ConstraintConfig {
    width: 'fixed' | 'fill' | 'hug' | 'relative'
    height: 'fixed' | 'fill' | 'hug' | 'relative'
    centerH: boolean
    centerV: boolean
    maintainAspectRatio: boolean
  }

  interface Props {
    value: ConstraintConfig
    onchange: (value: ConstraintConfig) => void
  }

  let { value, onchange }: Props = $props()

  const widthOptions = [
    { value: 'fixed', label: 'Fixed Width' },
    { value: 'fill', label: 'Fill Container' },
    { value: 'hug', label: 'Hug Contents' },
    { value: 'relative', label: 'Relative (%)' },
  ]

  const heightOptions = [
    { value: 'fixed', label: 'Fixed Height' },
    { value: 'fill', label: 'Fill Container' },
    { value: 'hug', label: 'Hug Contents' },
    { value: 'relative', label: 'Relative (%)' },
  ]

  function handleWidthChange(newWidth: string) {
    onchange({ ...value, width: newWidth as typeof value.width })
  }

  function handleHeightChange(newHeight: string) {
    onchange({ ...value, height: newHeight as typeof value.height })
  }

  function handleCenterHChange(newCenterH: boolean) {
    onchange({ ...value, centerH: newCenterH })
  }

  function handleCenterVChange(newCenterV: boolean) {
    onchange({ ...value, centerV: newCenterV })
  }

  function handleAspectRatioChange(newAspectRatio: boolean) {
    onchange({ ...value, maintainAspectRatio: newAspectRatio })
  }

  const stack = new StackArrangement()
  const config = {
    id: 'constraints-controls',
    type: 'stack',
    direction: 'vertical',
    gap: 'normal',
    fillContainer: true,
  }
</script>

<Container variant="default" padding="normal" radius="normal">
  <div style={cssPropertiesToString(stack.toCSS(config))}>
    <h4 class="text-h5 text-primary">Size Constraints</h4>

    <StackLayout gap="tight">
      <span class="text-body-s text-secondary font-medium">Width Behavior:</span>
      {#key value.width}
        <RadioGroup name="width" value={value.width} onchange={handleWidthChange}>
          <RadioButton value="fixed" label="Fixed Width" />
          <RadioButton value="fill" label="Fill Container" />
          <RadioButton value="hug" label="Hug Contents" />
          <RadioButton value="relative" label="Relative (%)" />
        </RadioGroup>
      {/key}
    </StackLayout>

    <StackLayout gap="tight">
      <span class="text-body-s text-secondary font-medium">Height Behavior:</span>
      {#key value.height}
        <RadioGroup name="height" value={value.height} onchange={handleHeightChange}>
          <RadioButton value="fixed" label="Fixed Height" />
          <RadioButton value="fill" label="Fill Container" />
          <RadioButton value="hug" label="Hug Contents" />
          <RadioButton value="relative" label="Relative (%)" />
        </RadioGroup>
      {/key}
    </StackLayout>

    <Divider />

    <h4 class="text-h5 text-primary">Positioning</h4>

    <div class="flex items-center gap-2">
      <Toggle checked={value.centerH} onchange={handleCenterHChange} />
      <div class="text-body-s text-primary">Center Horizontally</div>
    </div>

    <div class="flex items-center gap-2">
      <Toggle checked={value.centerV} onchange={handleCenterVChange} />
      <div class="text-body-s text-primary">Center Vertically</div>
    </div>

    <Divider />

    <h4 class="text-h5 text-primary">Advanced</h4>

    <div class="flex items-center gap-2">
      <Toggle checked={value.maintainAspectRatio} onchange={handleAspectRatioChange} />
      <div class="text-body-s text-primary">Maintain Aspect Ratio</div>
    </div>
  </div>
</Container>
