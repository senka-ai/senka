<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import RadioGroup from '../lib/components/forms/RadioGroup.svelte'
  import RadioButton from '../lib/components/forms/RadioButton.svelte'

  const { Story } = defineMeta({
    title: 'Forms/RadioGroup',
    component: RadioGroup,
    args: {
      name: 'example',
      value: '',
      disabled: false,
    },
    argTypes: {
      name: {
        control: { type: 'text' },
        description: 'Name attribute for the radio group',
      },
      value: {
        control: { type: 'text' },
        description: 'Currently selected value',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state for the entire group',
      },
      onchange: {
        action: 'changed',
        description: 'Change event handler',
      },
    },
  })
</script>

<Story name="Default" args={{}}>
  {#snippet template()}
    <RadioGroup name="colors">
      {#snippet children()}
        <RadioButton value="red" label="Red" />
        <RadioButton value="blue" label="Blue" />
        <RadioButton value="green" label="Green" />
      {/snippet}
    </RadioGroup>
  {/snippet}
</Story>

<Story name="Different Sizes" args={{}}>
  {#snippet template()}
    <RadioGroup name="mixed-sizes">
      {#snippet children()}
        <RadioButton value="xs" size="xs" label="Extra Small" />
        <RadioButton value="small" size="small" label="Small" />
        <RadioButton value="medium" size="medium" label="Medium" />
        <RadioButton value="large" size="large" label="Large" />
      {/snippet}
    </RadioGroup>
  {/snippet}
</Story>

<Story name="Rich Content Options" args={{}}>
  {#snippet template()}
    <RadioGroup name="plans">
      {#snippet children()}
        <RadioButton value="free">
          {#snippet children()}
            <div class="flex flex-col">
              <strong>Free Plan</strong>
              <span class="text-sm text-neutral-600">Basic features, limited usage</span>
            </div>
          {/snippet}
        </RadioButton>
        <RadioButton value="pro">
          {#snippet children()}
            <div class="flex flex-col">
              <strong>Pro Plan - $9.99/month</strong>
              <span class="text-sm text-neutral-600">Advanced features, unlimited usage</span>
            </div>
          {/snippet}
        </RadioButton>
        <RadioButton value="enterprise">
          {#snippet children()}
            <div class="flex flex-col">
              <strong>Enterprise Plan</strong>
              <span class="text-sm text-neutral-600">Custom pricing for large teams</span>
            </div>
          {/snippet}
        </RadioButton>
      {/snippet}
    </RadioGroup>
  {/snippet}
</Story>

<Story name="Disabled Group" args={{}}>
  {#snippet template()}
    <RadioGroup name="disabled-options" disabled={true}>
      {#snippet children()}
        <RadioButton value="option1" label="Option 1" />
        <RadioButton value="option2" label="Option 2" />
        <RadioButton value="option3" label="Option 3" />
      {/snippet}
    </RadioGroup>
  {/snippet}
</Story>

<Story name="Horizontal Layout" args={{}}>
  {#snippet template()}
    <RadioGroup name="horizontal" class="flex-row gap-6">
      {#snippet children()}
        <RadioButton value="yes" label="Yes" />
        <RadioButton value="no" label="No" />
        <RadioButton value="maybe" label="Maybe" />
      {/snippet}
    </RadioGroup>
  {/snippet}
</Story>
