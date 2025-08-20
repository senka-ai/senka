<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import RadioGroup from '@components/forms/RadioGroup.svelte'
  import RadioButton from '@components/forms/RadioButton.svelte'

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

<Story name="Overview" args={{}}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Basic Vertical Layout -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Basic Vertical Layout</h3>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <p class="text-body-s text-secondary mb-3">Default</p>
            <RadioGroup name="colors-default">
              <RadioButton value="red" label="Red" />
              <RadioButton value="blue" label="Blue" />
              <RadioButton value="green" label="Green" />
            </RadioGroup>
          </div>
          <div>
            <p class="text-body-s text-secondary mb-3">Disabled</p>
            <RadioGroup name="colors-disabled" disabled={true}>
              <RadioButton value="red" label="Red" />
              <RadioButton value="blue" label="Blue" />
              <RadioButton value="green" label="Green" />
            </RadioGroup>
          </div>
        </div>
      </div>

      <!-- Horizontal Layout -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Horizontal Layout</h3>
        <RadioGroup name="yes-no" class="flex-row gap-6">
          <RadioButton value="yes" label="Yes" />
          <RadioButton value="no" label="No" />
          <RadioButton value="maybe" label="Maybe" />
        </RadioGroup>
      </div>

      <!-- Different Sizes -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Different Sizes</h3>
        <RadioGroup name="sizes">
          <RadioButton value="small" size="small" label="Small" />
          <RadioButton value="medium" size="medium" label="Medium" />
          <RadioButton value="large" size="large" label="Large" />
        </RadioGroup>
      </div>

      <!-- Rich Content Options -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Rich Content Options</h3>
        <RadioGroup name="plans-overview" class="space-y-4">
          <RadioButton value="free">
            <div class="flex flex-col">
              <strong>Free Plan</strong>
              <span class="text-sm text-neutral-600">Basic features, limited usage</span>
            </div>
          </RadioButton>
          <RadioButton value="pro">
            <div class="flex flex-col">
              <strong>Pro Plan - $9.99/month</strong>
              <span class="text-sm text-neutral-600">Advanced features, unlimited usage</span>
            </div>
          </RadioButton>
          <RadioButton value="enterprise">
            <div class="flex flex-col">
              <strong>Enterprise Plan</strong>
              <span class="text-sm text-neutral-600">Custom pricing for large teams</span>
            </div>
          </RadioButton>
        </RadioGroup>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}}>
  {#snippet template()}
    <RadioGroup name="colors">
      <RadioButton value="red" label="Red" />
      <RadioButton value="blue" label="Blue" />
      <RadioButton value="green" label="Green" />
    </RadioGroup>
  {/snippet}
</Story>

<Story name="Different Sizes" args={{}}>
  {#snippet template()}
    <RadioGroup name="mixed-sizes">
      <RadioButton value="small" size="small" label="Small" />
      <RadioButton value="medium" size="medium" label="Medium" />
      <RadioButton value="large" size="large" label="Large" />
    </RadioGroup>
  {/snippet}
</Story>

<Story name="Rich Content Options" args={{}}>
  {#snippet template()}
    <RadioGroup name="plans">
      <RadioButton value="free">
        <div class="flex flex-col">
          <strong>Free Plan</strong>
          <span class="text-sm text-neutral-600">Basic features, limited usage</span>
        </div>
      </RadioButton>
      <RadioButton value="pro">
        <div class="flex flex-col">
          <strong>Pro Plan - $9.99/month</strong>
          <span class="text-sm text-neutral-600">Advanced features, unlimited usage</span>
        </div>
      </RadioButton>
      <RadioButton value="enterprise">
        <div class="flex flex-col">
          <strong>Enterprise Plan</strong>
          <span class="text-sm text-neutral-600">Custom pricing for large teams</span>
        </div>
      </RadioButton>
    </RadioGroup>
  {/snippet}
</Story>

<Story name="Disabled Group" args={{}}>
  {#snippet template()}
    <RadioGroup name="disabled-options" disabled={true}>
      <RadioButton value="option1" label="Option 1" />
      <RadioButton value="option2" label="Option 2" />
      <RadioButton value="option3" label="Option 3" />
    </RadioGroup>
  {/snippet}
</Story>

<Story name="Horizontal Layout" args={{}}>
  {#snippet template()}
    <RadioGroup name="horizontal" class="flex-row gap-6">
      <RadioButton value="yes" label="Yes" />
      <RadioButton value="no" label="No" />
      <RadioButton value="maybe" label="Maybe" />
    </RadioGroup>
  {/snippet}
</Story>
