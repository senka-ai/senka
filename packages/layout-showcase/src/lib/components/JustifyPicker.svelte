<!--
packages/layout-showcase/src/lib/components/JustifyPicker.svelte
Visual justify picker component for main-axis justification
Used across row arrangements to control how items are distributed along the main axis
RELEVANT FILES: packages/layout-engine/src/lib/types/index.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { Button, Container } from '@senka-ai/ui'
  import { ArrowLeftIcon, ArrowRightIcon, SettingsIcon, CategoriesIcon } from '@senka-ai/ui/icons'
  import { StackArrangement, RowArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  type Justify = 'packed' | 'space-between' | 'center' | 'space-around'

  interface Props {
    value: Justify
    onchange?: (newJustify: Justify) => void
    disabled?: boolean
  }

  let { value, onchange, disabled = false }: Props = $props()

  // Layout configurations
  const stack = new StackArrangement()
  const row = new RowArrangement()

  const labelConfig = {
    id: 'justify-label',
    type: 'stack',
    direction: 'vertical',
    gap: 'tight',
    fillContainer: true,
  }

  const buttonsConfig = {
    id: 'justify-buttons',
    type: 'row',
    gap: 'tight',
    align: 'center',
    wrap: true,
    fillContainer: false,
  }

  const descriptionConfig = {
    id: 'justify-description',
    type: 'stack',
    direction: 'vertical',
    gap: 'none',
    fillContainer: true,
  }

  const justifyOptions = [
    {
      value: 'packed' as const,
      label: 'Packed',
      description: 'Items grouped at start',
      icon: ArrowLeftIcon,
    },
    {
      value: 'center' as const,
      label: 'Center',
      description: 'Items centered in container',
      icon: CategoriesIcon,
    },
    {
      value: 'space-between' as const,
      label: 'Space Between',
      description: 'Items spread with space between',
      icon: ArrowRightIcon,
    },
    {
      value: 'space-around' as const,
      label: 'Space Around',
      description: 'Items with equal space around',
      icon: SettingsIcon,
    },
  ]

  function handleJustifyChange(newJustify: Justify) {
    if (disabled) return
    onchange?.(newJustify)
  }
</script>

<Container padding="none" background={false}>
  {#snippet children()}
    <div style={cssPropertiesToString(stack.toCSS(labelConfig))}>
      <span class="text-body-s text-secondary font-medium">Main-axis Justification:</span>

      <div style={cssPropertiesToString(row.toCSS(buttonsConfig))}>
        {#each justifyOptions as option}
          <Button
            variant={value === option.value ? 'primary' : 'secondary'}
            size="small"
            {disabled}
            onclick={() => handleJustifyChange(option.value)}
          >
            {#snippet leftIcon(size)}
              {#if option.icon === ArrowLeftIcon}
                <ArrowLeftIcon {size} />
              {:else if option.icon === CategoriesIcon}
                <CategoriesIcon {size} />
              {:else if option.icon === ArrowRightIcon}
                <ArrowRightIcon {size} />
              {:else if option.icon === SettingsIcon}
                <SettingsIcon {size} />
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
          {justifyOptions.find((opt) => opt.value === value)?.description}
        </span>
      </div>
    </div>
  {/snippet}
</Container>
