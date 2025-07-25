<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Dropdown from '../lib/components/forms/Dropdown.svelte'

  const sampleOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
  ]

  const optionsWithDisabled = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2', disabled: true },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4', disabled: true },
    { value: 'option5', label: 'Option 5' },
  ]

  const { Story } = defineMeta({
    title: 'Forms/Dropdown',
    component: Dropdown,
    args: {
      options: sampleOptions,
      label: 'Title',
      placeholder: 'Placeholder',
      showLabel: true,
      showHelperText: true,
      fullWidth: false,
      disabled: false,
    },
    argTypes: {
      options: {
        control: { type: 'object' },
        description: 'Array of option objects with value, label, and optional disabled',
      },
      value: {
        control: { type: 'text' },
        description: 'Selected value',
      },
      placeholder: {
        control: { type: 'text' },
        description: 'Placeholder text when no option is selected',
      },
      onchange: {
        action: 'changed',
        description: 'Change event handler',
      },
    },
  })
</script>

<Story name="Default" args={{}}>
  {#snippet template(args)}
    <Dropdown
      options={args.options || []}
      value={args.value}
      label={args.label}
      placeholder={args.placeholder}
      helperText={args.helperText}
      error={args.error}
      showLabel={args.showLabel ?? true}
      showHelperText={args.showHelperText ?? true}
      fullWidth={args.fullWidth ?? false}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onchange={args.onchange}
    />
  {/snippet}
</Story>

<Story name="With Selected Value" args={{ value: 'option2' }}>
  {#snippet template(args)}
    <Dropdown
      options={args.options || []}
      value={args.value}
      label={args.label}
      placeholder={args.placeholder}
      helperText={args.helperText}
      error={args.error}
      showLabel={args.showLabel ?? true}
      showHelperText={args.showHelperText ?? true}
      fullWidth={args.fullWidth ?? false}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onchange={args.onchange}
    />
  {/snippet}
</Story>

<Story name="With Error" args={{ error: 'This field is required' }}>
  {#snippet template(args)}
    <Dropdown
      options={args.options || []}
      value={args.value}
      label={args.label}
      placeholder={args.placeholder}
      helperText={args.helperText}
      error={args.error}
      showLabel={args.showLabel ?? true}
      showHelperText={args.showHelperText ?? true}
      fullWidth={args.fullWidth ?? false}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onchange={args.onchange}
    />
  {/snippet}
</Story>

<Story name="With Helper Text" args={{ helperText: 'Choose your preferred option' }}>
  {#snippet template(args)}
    <Dropdown
      options={args.options || []}
      value={args.value}
      label={args.label}
      placeholder={args.placeholder}
      helperText={args.helperText}
      error={args.error}
      showLabel={args.showLabel ?? true}
      showHelperText={args.showHelperText ?? true}
      fullWidth={args.fullWidth ?? false}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onchange={args.onchange}
    />
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true, value: 'option1' }}>
  {#snippet template(args)}
    <Dropdown
      options={args.options || []}
      value={args.value}
      label={args.label}
      placeholder={args.placeholder}
      helperText={args.helperText}
      error={args.error}
      showLabel={args.showLabel ?? true}
      showHelperText={args.showHelperText ?? true}
      fullWidth={args.fullWidth ?? false}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onchange={args.onchange}
    />
  {/snippet}
</Story>

<Story name="Full Width" args={{ fullWidth: true }}>
  {#snippet template(args)}
    <Dropdown
      options={args.options || []}
      value={args.value}
      label={args.label}
      placeholder={args.placeholder}
      helperText={args.helperText}
      error={args.error}
      showLabel={args.showLabel ?? true}
      showHelperText={args.showHelperText ?? true}
      fullWidth={args.fullWidth ?? false}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onchange={args.onchange}
    />
  {/snippet}
</Story>

<Story name="With Disabled Options" args={{ options: optionsWithDisabled }}>
  {#snippet template(args)}
    <Dropdown
      options={args.options || []}
      value={args.value}
      label={args.label}
      placeholder={args.placeholder}
      helperText={args.helperText}
      error={args.error}
      showLabel={args.showLabel ?? true}
      showHelperText={args.showHelperText ?? true}
      fullWidth={args.fullWidth ?? false}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onchange={args.onchange}
    />
  {/snippet}
</Story>

<Story name="Long Options List">
  {#snippet template(args)}
    <Dropdown
      {...args}
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        { value: 'option4', label: 'Option 4' },
        { value: 'option5', label: 'Option 5' },
        { value: 'option6', label: 'Option 6' },
        { value: 'option7', label: 'Option 7' },
        { value: 'option8', label: 'Option 8' },
        { value: 'option9', label: 'Option 9' },
        { value: 'option10', label: 'Option 10' },
        { value: 'option11', label: 'Option 11' },
        { value: 'option12', label: 'Option 12' },
      ]}
    />
  {/snippet}
</Story>

<Story name="All States">
  {#snippet template()}
    <div class="space-y-6">
      <Dropdown options={sampleOptions} label="Default" placeholder="Select an option" />
      <Dropdown options={sampleOptions} label="With Selected Value" value="option2" />
      <Dropdown options={sampleOptions} label="With Error" error="This field is required" />
      <Dropdown options={sampleOptions} label="Disabled" disabled value="option1" />
      <Dropdown options={optionsWithDisabled} label="With Disabled Options" placeholder="Some options are disabled" />
    </div>
  {/snippet}
</Story>

<Story name="Interactive Example">
  {#snippet template()}
    <div class="space-y-6">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Dropdown
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
          ]}
          label="Size"
          placeholder="Select size"
          helperText="Choose your preferred size"
        />
        <Dropdown
          options={[
            { value: 'red', label: 'Red' },
            { value: 'blue', label: 'Blue' },
            { value: 'green', label: 'Green' },
            { value: 'yellow', label: 'Yellow' },
          ]}
          label="Color"
          placeholder="Select color"
        />
      </div>
      <Dropdown
        options={[
          { value: 'priority-low', label: 'Low Priority' },
          { value: 'priority-medium', label: 'Medium Priority' },
          { value: 'priority-high', label: 'High Priority' },
          { value: 'priority-urgent', label: 'Urgent' },
        ]}
        label="Priority Level"
        placeholder="Select priority"
        fullWidth
        helperText="This will affect notification settings"
      />
    </div>
  {/snippet}
</Story>
