<script module lang="ts">
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

<Story name="Overview" args={{}} parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Basic States -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Basic States</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p class="text-body-s text-secondary mb-2">Default</p>
            <Dropdown options={sampleOptions} label="Choose Option" placeholder="Select an option" />
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">With Selection</p>
            <Dropdown options={sampleOptions} label="Choose Option" value="option2" />
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">With Error</p>
            <Dropdown
              options={sampleOptions}
              label="Choose Option"
              placeholder="Select an option"
              error="This field is required"
            />
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">Disabled</p>
            <Dropdown options={sampleOptions} label="Choose Option" value="option1" disabled={true} />
          </div>
        </div>
      </div>

      <!-- Full Width -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Full Width</h3>
        <Dropdown
          options={sampleOptions}
          label="Full Width Dropdown"
          placeholder="This dropdown spans the full width"
          fullWidth={true}
        />
      </div>

      <!-- With Helper Text -->
      <div>
        <h3 class="text-h4 text-primary mb-4">With Helper Text</h3>
        <div class="max-w-sm">
          <Dropdown
            options={sampleOptions}
            label="Priority Level"
            placeholder="Select priority"
            helperText="Choose the urgency level for this task"
          />
        </div>
      </div>

      <!-- With Disabled Options -->
      <div>
        <h3 class="text-h4 text-primary mb-4">With Disabled Options</h3>
        <div class="max-w-sm">
          <Dropdown options={optionsWithDisabled} label="Mixed Options" placeholder="Some options are disabled" />
        </div>
      </div>

      <!-- Long Options List -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Scrollable List</h3>
        <div class="max-w-sm">
          <Dropdown
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
            ]}
            label="Long List"
            placeholder="Scroll to see more options"
          />
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
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

<Story name="With Selected Value" args={{ value: 'option2' }} parameters={{ layout: 'compact' }}>
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

<Story name="With Error" args={{ error: 'This field is required' }} parameters={{ layout: 'compact' }}>
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

<Story name="With Helper Text" args={{ helperText: 'Choose your preferred option' }} parameters={{ layout: 'compact' }}>
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

<Story name="Disabled" args={{ disabled: true, value: 'option1' }} parameters={{ layout: 'compact' }}>
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

<Story name="Full Width" args={{ fullWidth: true }} parameters={{ layout: 'wide' }}>
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

<Story name="With Disabled Options" args={{ options: optionsWithDisabled }} parameters={{ layout: 'compact' }}>
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

<Story name="Long Options List" parameters={{ layout: 'compact' }}>
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

<Story name="All States" parameters={{ layout: 'compact' }}>
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

<Story name="Interactive Example" parameters={{ layout: 'default' }}>
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
