<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Slider from '../lib/components/forms/Slider.svelte'
  import { validationRules } from '../lib/utils/validation.svelte'

  const { Story } = defineMeta({
    title: 'Forms/Slider',
    component: Slider,
    args: {
      label: 'Slider',
      min: 0,
      max: 100,
      step: 1,
      value: 50,
      showValue: false,
      showTitle: true,
      valueFormat: 'number',
      disabled: false,
      fullWidth: false,
      showLabel: true,
      showHelperText: true,
      required: false,
      validateOnChange: false,
    },
    argTypes: {
      value: {
        control: { type: 'number' },
        description: 'Current numeric value',
      },
      min: {
        control: { type: 'number' },
        description: 'Minimum allowed value',
      },
      max: {
        control: { type: 'number' },
        description: 'Maximum allowed value',
      },
      step: {
        control: { type: 'number', min: 0.1, step: 0.1 },
        description: 'Step size for slider increments',
      },
      label: {
        control: { type: 'text' },
        description: 'Field label',
      },
      helperText: {
        control: { type: 'text' },
        description: 'Helper text shown below the slider',
      },
      error: {
        control: { type: 'text' },
        description: 'Error message to display',
      },
      showValue: {
        control: { type: 'boolean' },
        description: 'Whether to show the current value',
      },
      showTitle: {
        control: { type: 'boolean' },
        description: 'Whether to show the label/title',
      },
      valueFormat: {
        control: { type: 'select' },
        options: ['number', 'percentage'],
        description: 'Format for the displayed value',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      required: {
        control: { type: 'boolean' },
        description: 'Whether the field is required',
      },
      fullWidth: {
        control: { type: 'boolean' },
        description: 'Whether to take full width',
      },
      showLabel: {
        control: { type: 'boolean' },
        description: 'Whether to show the label',
      },
      showHelperText: {
        control: { type: 'boolean' },
        description: 'Whether to show helper text',
      },
      validateOnChange: {
        control: { type: 'boolean' },
        description: 'Whether to validate on every change',
      },
      onchange: {
        control: false,
        description: 'Callback fired when value changes - receives new number value',
      },
    },
  })
</script>

<Story name="Overview" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Basic Usage -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Basic Usage</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Slider label="Volume" value={75} />
          <Slider label="Brightness" value={40} />
        </div>
      </div>

      <!-- Value Display Options -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Value Display</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Slider label="Without Value" value={60} showValue={false} />
          <Slider label="With Value" value={60} showValue={true} />
        </div>
      </div>

      <!-- Value Formats -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Value Formats</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Slider label="Progress (%)" value={75} showValue={true} valueFormat="percentage" />
          <Slider label="Count" value={125} min={0} max={200} showValue={true} valueFormat="number" />
        </div>
      </div>

      <!-- Different Ranges -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Different Ranges</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Slider label="Rating (1-5)" min={1} max={5} value={4} step={1} showValue={true} />
          <Slider label="Price ($0-$1000)" min={0} max={1000} value={250} step={10} showValue={true} />
          <Slider label="Decimal (0-1)" min={0} max={1} value={0.75} step={0.01} showValue={true} />
        </div>
      </div>

      <!-- States -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Slider label="Normal" value={50} showValue={true} />
          <Slider label="Disabled" value={50} disabled={true} showValue={true} />
          <Slider label="Error" value={50} error="Value out of range" showValue={true} />
        </div>
      </div>

      <!-- Helper Text -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">With Helper Text</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Slider
            label="Opacity"
            value={80}
            min={0}
            max={100}
            showValue={true}
            valueFormat="percentage"
            helperText="Adjust the transparency level"
          />
          <Slider
            label="Temperature"
            value={72}
            min={60}
            max={85}
            showValue={true}
            helperText="Set your preferred temperature (°F)"
          />
        </div>
      </div>

      <!-- Full Width -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Full Width</h3>
        <Slider
          label="Full Width Slider"
          value={65}
          fullWidth={true}
          showValue={true}
          helperText="This slider takes the full width of its container"
        />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Slider {...args} />
  {/snippet}
</Story>

<Story name="With Value" args={{ showValue: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Slider {...args} />
  {/snippet}
</Story>

<Story
  name="Percentage Format"
  args={{ showValue: true, valueFormat: 'percentage' }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Slider {...args} />
  {/snippet}
</Story>

<Story name="Custom Range" args={{ min: 10, max: 90, value: 30, showValue: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Slider {...args} />
  {/snippet}
</Story>

<Story
  name="Small Steps"
  args={{ min: 0, max: 10, step: 0.5, value: 7.5, showValue: true }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Slider {...args} />
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true, value: 50, showValue: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Slider {...args} />
  {/snippet}
</Story>

<Story
  name="Required"
  args={{ required: true, label: 'Required Field', showValue: true }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Slider {...args} />
  {/snippet}
</Story>

<Story
  name="With Error"
  args={{ error: 'Value must be at least 25', value: 15, showValue: true }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Slider {...args} />
  {/snippet}
</Story>

<Story name="Full Width" args={{ fullWidth: true, value: 75, showValue: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Slider {...args} />
  {/snippet}
</Story>

<Story name="Volume Control" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-4">
      <h3 class="text-lg font-medium">Audio Settings</h3>
      <Slider
        label="Master Volume"
        value={85}
        min={0}
        max={100}
        showValue={true}
        valueFormat="percentage"
        helperText="Adjust the overall audio level"
      />
    </div>
  {/snippet}
</Story>

<Story name="Price Range" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-4">
      <h3 class="text-lg font-medium">Filter by Price</h3>
      <Slider
        label="Maximum Price"
        value={450}
        min={0}
        max={1000}
        step={25}
        showValue={true}
        helperText="Set your budget limit"
      />
    </div>
  {/snippet}
</Story>

<Story name="Rating Selector" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-4">
      <h3 class="text-lg font-medium">Minimum Rating</h3>
      <Slider
        label="Star Rating"
        value={4}
        min={1}
        max={5}
        step={1}
        showValue={true}
        helperText="Filter items with this rating or higher"
      />
    </div>
  {/snippet}
</Story>

<Story name="Opacity Control" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-4">
      <h3 class="text-lg font-medium">Layer Opacity</h3>
      <Slider
        label="Transparency"
        value={75}
        min={0}
        max={100}
        showValue={true}
        valueFormat="percentage"
        helperText="Adjust layer transparency"
      />
    </div>
  {/snippet}
</Story>

<Story name="With Validation" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Configuration with Validation</h3>
      <Slider
        label="CPU Usage Limit"
        value={90}
        min={10}
        max={100}
        showValue={true}
        valueFormat="percentage"
        helperText="Set maximum CPU usage (recommended: 80% or less)"
        validationRules={[
          validationRules.required('CPU limit is required'),
          {
            message: 'CPU usage should not exceed 85% for optimal performance',
            validator: (value) => value <= 85,
          },
        ]}
        validateOnChange={true}
        required
      />
    </div>
  {/snippet}
</Story>

<Story name="Interactive Example" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Media Player Controls</h3>

      <Slider
        label="Volume"
        value={75}
        min={0}
        max={100}
        showValue={true}
        valueFormat="percentage"
        helperText="Audio volume level"
      />

      <Slider
        label="Playback Speed"
        value={1}
        min={0.5}
        max={2}
        step={0.25}
        showValue={true}
        helperText="Playback speed multiplier"
      />

      <Slider
        label="Bass"
        value={0}
        min={-10}
        max={10}
        step={1}
        showValue={true}
        helperText="Bass level (-10 to +10)"
      />
    </div>
  {/snippet}
</Story>
