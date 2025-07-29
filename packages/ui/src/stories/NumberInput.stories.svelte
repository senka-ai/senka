<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import NumberInput from '../lib/components/forms/NumberInput.svelte'
  import { validationRules } from '../lib/utils/validation.svelte'

  const { Story } = defineMeta({
    title: 'Forms/NumberInput',
    component: NumberInput,
    args: {
      label: 'Number Input',
      placeholder: '0',
      showButtons: true,
      buttonLayout: 'stacked',
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
        description: 'Step size for increment/decrement',
      },
      label: {
        control: { type: 'text' },
        description: 'Field label',
      },
      placeholder: {
        control: { type: 'text' },
        description: 'Placeholder text',
      },
      helperText: {
        control: { type: 'text' },
        description: 'Helper text shown below the input',
      },
      error: {
        control: { type: 'text' },
        description: 'Error message to display',
      },
      showButtons: {
        control: { type: 'boolean' },
        description: 'Whether to show increment/decrement buttons',
      },
      buttonLayout: {
        control: { type: 'select' },
        options: ['stacked', 'horizontal', 'split'],
        description: 'Layout of the increment/decrement buttons',
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
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <NumberInput label="Quantity" placeholder="Enter quantity..." />
          <NumberInput label="Price" placeholder="0.00" step={0.01} />
        </div>
      </div>

      <!-- Button Layouts -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Button Layouts</h3>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <NumberInput label="Stacked Layout" buttonLayout="stacked" value={5} />
          <NumberInput label="Horizontal Layout" buttonLayout="horizontal" value={10} />
          <NumberInput label="Split Layout" buttonLayout="split" value={15} />
          <NumberInput label="Without Buttons" showButtons={false} value={20} />
        </div>
      </div>

      <!-- Min/Max Constraints -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Min/Max Constraints</h3>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <NumberInput label="Min: 0" min={0} value={5} helperText="Minimum value is 0" />
          <NumberInput label="Max: 100" max={100} value={95} helperText="Maximum value is 100" />
          <NumberInput label="Range: 10-50" min={10} max={50} value={25} helperText="Between 10 and 50" />
        </div>
      </div>

      <!-- Step Sizes -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Step Sizes</h3>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <NumberInput label="Step: 1" step={1} value={10} helperText="Increment by 1" />
          <NumberInput label="Step: 5" step={5} value={25} helperText="Increment by 5" />
          <NumberInput label="Step: 0.1" step={0.1} value={2.5} helperText="Increment by 0.1" />
        </div>
      </div>

      <!-- States -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States</h3>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <NumberInput label="Normal" value={42} />
          <NumberInput label="Disabled" value={42} disabled={true} />
          <NumberInput label="Error" value={42} error="Value is too high" />
        </div>
      </div>

      <!-- Helper Text -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">With Helper Text</h3>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <NumberInput label="Age" value={25} min={0} max={120} helperText="Enter your age in years" />
          <NumberInput
            label="Temperature"
            value={72}
            min={-100}
            max={100}
            step={0.5}
            helperText="Temperature in Fahrenheit"
          />
        </div>
      </div>

      <!-- Full Width -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Full Width</h3>
        <NumberInput
          label="Full Width Number Input"
          value={1000}
          fullWidth={true}
          helperText="This input takes the full width of its container"
        />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <NumberInput {...args} />
  {/snippet}
</Story>

<Story name="With Value" args={{ value: 42 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <NumberInput {...args} />
  {/snippet}
</Story>

<Story name="With Min Max" args={{ min: 0, max: 100, value: 50 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <NumberInput {...args} />
  {/snippet}
</Story>

<Story name="Custom Step" args={{ step: 0.5, value: 2.5 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <NumberInput {...args} />
  {/snippet}
</Story>

<Story name="Without Buttons" args={{ showButtons: false, value: 123 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <NumberInput {...args} />
  {/snippet}
</Story>

<Story name="Horizontal Layout" args={{ buttonLayout: 'horizontal', value: 42 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <NumberInput {...args} />
  {/snippet}
</Story>

<Story name="Stacked Layout" args={{ buttonLayout: 'stacked', value: 42 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <NumberInput {...args} />
  {/snippet}
</Story>

<Story name="Split Layout" args={{ buttonLayout: 'split', value: 42 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <NumberInput {...args} />
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true, value: 42 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <NumberInput {...args} />
  {/snippet}
</Story>

<Story name="Required" args={{ required: true, label: 'Required Field' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <NumberInput {...args} />
  {/snippet}
</Story>

<Story name="With Error" args={{ error: 'Value must be greater than 0', value: -5 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <NumberInput {...args} />
  {/snippet}
</Story>

<Story name="Full Width" args={{ fullWidth: true, value: 1000 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <NumberInput {...args} />
  {/snippet}
</Story>

<Story name="Price Input" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-4">
      <h3 class="text-lg font-medium">Price Configuration</h3>
      <NumberInput label="Product Price" placeholder="0.00" min={0} step={0.01} helperText="Enter the price in USD" />
    </div>
  {/snippet}
</Story>

<Story name="Quantity Selector" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-4">
      <h3 class="text-lg font-medium">Item Quantity</h3>
      <NumberInput
        label="Quantity"
        value={1}
        min={1}
        max={99}
        step={1}
        helperText="Select the number of items (1-99)"
      />
    </div>
  {/snippet}
</Story>

<Story name="Temperature Control" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-4">
      <h3 class="text-lg font-medium">Thermostat</h3>
      <NumberInput
        label="Target Temperature"
        value={72}
        min={50}
        max={90}
        step={0.5}
        helperText="Set your desired temperature (°F)"
      />
    </div>
  {/snippet}
</Story>

<Story name="With Validation" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Form with Validation</h3>
      <NumberInput
        label="Age"
        placeholder="Enter your age"
        min={0}
        max={120}
        helperText="Age must be between 0 and 120"
        validationRules={[
          validationRules.required('Age is required'),
          {
            message: 'Age must be at least 18',
            validator: (value) => value >= 18,
          },
          {
            message: 'Age must be less than 120',
            validator: (value) => value <= 120,
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
      <h3 class="text-lg font-medium">Order Configuration</h3>

      <NumberInput
        label="Quantity"
        value={1}
        min={1}
        max={10}
        buttonLayout="split"
        helperText="How many items would you like?"
      />

      <NumberInput
        label="Unit Price"
        value={29.99}
        min={0}
        step={0.01}
        helperText="Price per item"
        showButtons={false}
      />

      <NumberInput
        label="Discount %"
        value={0}
        min={0}
        max={50}
        step={5}
        buttonLayout="horizontal"
        helperText="Apply discount (0-50%)"
      />
    </div>
  {/snippet}
</Story>
