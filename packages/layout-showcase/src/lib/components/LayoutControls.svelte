<!-- 
packages/layout-showcase/src/lib/components/LayoutControls.svelte
Interactive controls for modifying layout properties in real-time
Provides dropdowns and toggles for all layout engine configuration options
RELEVANT FILES: packages/layout-engine/src/lib/types/index.ts, packages/ui/src/lib/components/forms/Dropdown.svelte, packages/ui/src/lib/components/forms/Toggle.svelte, packages/layout-showcase/src/routes/interactive/+page.svelte
-->

<script lang="ts">
  import type { LayoutContainer, ArrangementType } from '@senka-ai/layout-engine'
  import { Dropdown, Toggle } from '@senka-ai/ui'
  import type { BaseProps } from '@senka-ai/ui'

  interface Props extends BaseProps {
    layout: LayoutContainer
    onLayoutChange: (layout: LayoutContainer) => void
  }

  let { layout, onLayoutChange }: Props = $props()

  // Arrangement options
  const arrangementOptions = [
    { value: 'stack', label: 'Stack (Vertical/Horizontal)' },
    { value: 'row', label: 'Row (Horizontal with wrap)' },
    { value: 'grid', label: 'Grid (Auto-responsive)' },
    { value: 'flow', label: 'Flow (Natural wrapping)' },
    { value: 'overlay', label: 'Overlay (Absolute positioning)' },
    { value: 'frame', label: 'Frame (Fixed dimensions)' },
  ]

  // Spacing options
  const spacingOptions = [
    { value: 'none', label: 'None (0px)' },
    { value: 'tight', label: 'Tight (4px)' },
    { value: 'cozy', label: 'Cozy (8px)' },
    { value: 'normal', label: 'Normal (16px)' },
    { value: 'comfortable', label: 'Comfortable (24px)' },
    { value: 'spacious', label: 'Spacious (32px)' },
  ]

  // Auto-layout mode options
  const autoLayoutModes = [
    { value: 'hug-contents', label: 'Hug Contents' },
    { value: 'fill-container', label: 'Fill Container' },
    { value: 'fixed', label: 'Fixed Size' },
  ]

  // Primary axis options
  const primaryAxisOptions = [
    { value: 'packed', label: 'Packed' },
    { value: 'space-between', label: 'Space Between' },
    { value: 'space-around', label: 'Space Around' },
    { value: 'space-evenly', label: 'Space Evenly' },
    { value: 'center', label: 'Center' },
  ]

  // Counter axis options
  const counterAxisOptions = [
    { value: 'start', label: 'Start' },
    { value: 'center', label: 'Center' },
    { value: 'end', label: 'End' },
    { value: 'stretch', label: 'Stretch' },
  ]

  // Update functions
  const updateArrangement = (type: ArrangementType) => {
    const updatedLayout: LayoutContainer = {
      ...layout,
      arrangement: {
        ...layout.arrangement,
        type,
      },
    }
    onLayoutChange(updatedLayout)
  }

  const updateSpacing = (property: 'gap' | 'padding', scale: string) => {
    const updatedLayout: LayoutContainer = {
      ...layout,
      autoLayout: {
        ...layout.autoLayout!,
        [property]: { scale },
      },
    }
    onLayoutChange(updatedLayout)
  }

  const updateAutoLayoutMode = (mode: string) => {
    const updatedLayout: LayoutContainer = {
      ...layout,
      autoLayout: {
        ...layout.autoLayout!,
        mode: mode as 'fixed' | 'hug-contents' | 'fill-container',
      },
    }
    onLayoutChange(updatedLayout)
  }

  const updateAxis = (axis: 'primaryAxis' | 'counterAxis', value: string) => {
    const updatedLayout: LayoutContainer = {
      ...layout,
      autoLayout: {
        ...layout.autoLayout!,
        [axis]: value,
      },
    }
    onLayoutChange(updatedLayout)
  }

  const updateDirection = (direction: 'horizontal' | 'vertical') => {
    const updatedLayout: LayoutContainer = {
      ...layout,
      arrangement: {
        ...layout.arrangement,
        direction,
      },
    }
    onLayoutChange(updatedLayout)
  }

  const updateWrap = (wrap: boolean) => {
    const updatedLayout: LayoutContainer = {
      ...layout,
      arrangement: {
        ...layout.arrangement,
        wrap,
      },
    }
    onLayoutChange(updatedLayout)
  }

  // Current values for display
  let currentGap = $derived(layout.autoLayout?.gap?.scale || 'normal')
  let currentPadding = $derived(layout.autoLayout?.padding?.all?.scale || 'normal')
  let currentMode = $derived(layout.autoLayout?.mode || 'hug-contents')
  let currentPrimaryAxis = $derived(layout.autoLayout?.primaryAxis || 'packed')
  let currentCounterAxis = $derived(layout.autoLayout?.counterAxis || 'stretch')
  let currentDirection = $derived(layout.arrangement.direction || 'vertical')
  let currentWrap = $derived(layout.arrangement.wrap || false)
</script>

<section class="property-controls bg-surface border-2 border-default rounded-xl p-6">
  <h3 class="text-h3 font-semibold mb-6" style="color: var(--color-text-primary);">Layout Controls</h3>
  <div class="space-y-6">
    <!-- Arrangement Type -->
    <div>
      <Dropdown
        label="Arrangement Type"
        value={layout.arrangement.type}
        onchange={(value) => updateArrangement(value as ArrangementType)}
        placeholder="Select arrangement"
        options={arrangementOptions}
        showLabel={true}
      />
    </div>

    <!-- Direction (for stack and row) -->
    {#if layout.arrangement.type === 'stack'}
      <div>
        <span class="property-label mb-2 block">Direction</span>
        <div class="flex items-center gap-4">
          <Toggle
            checked={currentDirection === 'vertical'}
            onchange={(checked) => updateDirection(checked ? 'vertical' : 'horizontal')}
          />
          <span class="text-body-s text-secondary">Vertical</span>
        </div>
      </div>
    {/if}

    <!-- Wrap (for row and flow) -->
    {#if ['row', 'flow'].includes(layout.arrangement.type)}
      <div>
        <span class="property-label mb-2 block">Allow Wrapping</span>
        <div class="flex items-center gap-4">
          <Toggle checked={currentWrap} onchange={updateWrap} />
          <span class="text-body-s text-secondary">Wrap content to new lines</span>
        </div>
      </div>
    {/if}

    <!-- Auto Layout Mode -->
    <div>
      <Dropdown
        label="Auto Layout Mode"
        value={currentMode}
        onchange={updateAutoLayoutMode}
        placeholder="Select mode"
        options={autoLayoutModes}
        showLabel={true}
      />
    </div>

    <!-- Primary Axis -->
    <div>
      <Dropdown
        label="Primary Axis Distribution"
        value={currentPrimaryAxis}
        onchange={(value) => updateAxis('primaryAxis', value)}
        placeholder="Select distribution"
        options={primaryAxisOptions}
        showLabel={true}
      />
    </div>

    <!-- Counter Axis -->
    <div>
      <Dropdown
        label="Counter Axis Alignment"
        value={currentCounterAxis}
        onchange={(value) => updateAxis('counterAxis', value)}
        placeholder="Select alignment"
        options={counterAxisOptions}
        showLabel={true}
      />
    </div>

    <!-- Gap Spacing -->
    <div>
      <Dropdown
        label="Gap Spacing"
        value={currentGap}
        onchange={(value) => updateSpacing('gap', value)}
        placeholder="Select gap"
        options={spacingOptions}
        showLabel={true}
      />
    </div>

    <!-- Padding Spacing -->
    <div>
      <Dropdown
        label="Padding"
        value={currentPadding}
        onchange={(value) => updateSpacing('padding', value)}
        placeholder="Select padding"
        options={spacingOptions}
        showLabel={true}
      />
    </div>
  </div>
</section>
