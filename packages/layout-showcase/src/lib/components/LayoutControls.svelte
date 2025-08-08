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
    { value: 'hug-contents', label: 'Hug Contents (shrink to fit)' },
    { value: 'fill-container', label: 'Fill Container (expand to fill)' },
    { value: 'fixed', label: 'Fixed Size (natural size)' },
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

  // Control visibility logic
  let showAutoLayout = $derived(!['overlay', 'frame'].includes(layout.arrangement.type))
  let showSpacing = $derived(!['overlay'].includes(layout.arrangement.type))
  let showAxisControls = $derived(['stack', 'row', 'flow', 'grid'].includes(layout.arrangement.type))
  let showDirection = $derived(layout.arrangement.type === 'stack')
  let showWrap = $derived(['row', 'flow'].includes(layout.arrangement.type))
  let isGridType = $derived(layout.arrangement.type === 'grid')
  let isOverlayType = $derived(layout.arrangement.type === 'overlay')
  let isFrameType = $derived(layout.arrangement.type === 'frame')
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

    <!-- Direction (for stack) -->
    {#if showDirection}
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
    {#if showWrap}
      <div>
        <span class="property-label mb-2 block">Allow Wrapping</span>
        <div class="flex items-center gap-4">
          <Toggle checked={currentWrap} onchange={updateWrap} />
          <span class="text-body-s text-secondary">Wrap content to new lines</span>
        </div>
      </div>
    {/if}

    <!-- Auto Layout Mode -->
    {#if showAutoLayout}
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
    {/if}

    <!-- Primary Axis -->
    {#if showAxisControls}
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
    {/if}

    <!-- Counter Axis -->
    {#if showAxisControls}
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
    {/if}

    <!-- Gap Spacing -->
    {#if showSpacing}
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
    {/if}

    <!-- Padding Spacing -->
    {#if showSpacing}
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
    {/if}

    <!-- Grid-specific controls -->
    {#if isGridType}
      <div class="bg-highlight-50 border-2 border-highlight-200 rounded-lg p-4 space-y-4">
        <h4 class="text-h5 font-semibold text-highlight">Grid Options</h4>
        <p class="text-body-s text-secondary">Grid arrangements automatically organize content in responsive columns with equal spacing.</p>
        <!-- Note: Grid controls would be implemented here when grid config is added to the layout type -->
        <div class="text-body-s text-muted">
          <span>Grid-specific controls coming soon...</span>
        </div>
      </div>
    {/if}

    <!-- Overlay-specific controls -->
    {#if isOverlayType}
      <div class="bg-warning-50 border-2 border-warning-200 rounded-lg p-4 space-y-4">
        <h4 class="text-h5 font-semibold text-warning">Overlay Options</h4>
        <p class="text-body-s text-secondary">Overlay arrangements position elements on top of each other using absolute positioning.</p>
        <!-- Note: Overlay controls would be implemented here when overlay config is added to the layout type -->
        <div class="text-body-s text-muted">
          <span>Overlay-specific controls coming soon...</span>
        </div>
      </div>
    {/if}

    <!-- Frame-specific controls -->
    {#if isFrameType}
      <div class="bg-success-50 border-2 border-success-200 rounded-lg p-4 space-y-4">
        <h4 class="text-h5 font-semibold text-success">Frame Options</h4>
        <p class="text-body-s text-secondary">Frame arrangements constrain content within fixed dimensions with precise positioning.</p>
        <!-- Note: Frame controls would be implemented here when frame config is added to the layout type -->
        <div class="text-body-s text-muted">
          <span>Frame-specific controls coming soon...</span>
        </div>
      </div>
    {/if}

    <!-- Info section about current arrangement -->
    <div class="bg-neutral-50 border-2 border-neutral-200 rounded-lg p-4 space-y-2">
      <h4 class="text-h5 font-semibold text-neutral-700">Current Arrangement: {layout.arrangement.type}</h4>
      {#if layout.arrangement.type === 'stack'}
        <p class="text-body-s text-secondary">Stack arranges elements in a single row or column with consistent spacing.</p>
      {:else if layout.arrangement.type === 'row'}
        <p class="text-body-s text-secondary">Row arranges elements horizontally and allows wrapping to new lines when needed.</p>
      {:else if layout.arrangement.type === 'flow'}
        <p class="text-body-s text-secondary">Flow allows elements to wrap naturally like text, ideal for tags and small components.</p>
      {:else if layout.arrangement.type === 'grid'}
        <p class="text-body-s text-secondary">Grid creates a responsive column layout with automatic sizing and consistent spacing.</p>
      {:else if layout.arrangement.type === 'overlay'}
        <p class="text-body-s text-secondary">Overlay positions elements on top of each other using absolute positioning.</p>
      {:else if layout.arrangement.type === 'frame'}
        <p class="text-body-s text-secondary">Frame constrains content within fixed dimensions with precise control.</p>
      {/if}
    </div>
  </div>
</section>
