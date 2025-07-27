<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Button from '../lib/components/core/Button.svelte'
  import {
    AddIcon,
    EditIcon,
    SendIcon,
    CameraIcon,
    SearchIcon,
    SettingsIcon,
    CheckIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
  } from '../lib/icons'

  const { Story } = defineMeta({
    title: 'Core/Button',
    component: Button,
    args: {
      variant: 'primary',
      size: 'medium',
      disabled: false,
      loading: false,
      fullWidth: false,
    },
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['primary', 'secondary', 'tertiary'],
        description: 'Button variant',
      },
      size: {
        control: { type: 'select' },
        options: ['xs', 'small', 'medium', 'large'],
        description: 'Button size',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      loading: {
        control: { type: 'boolean' },
        description: 'Loading state',
      },
      fullWidth: {
        control: { type: 'boolean' },
        description: 'Full width button',
      },
    },
  })
</script>

<Story name="Overview" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-4">
      <div class="flex items-start gap-4">
        <Button variant="primary">
          {#snippet children()}Primary{/snippet}
        </Button>
        <Button variant="secondary">
          {#snippet children()}Secondary{/snippet}
        </Button>
        <Button variant="tertiary">
          {#snippet children()}Tertiary{/snippet}
        </Button>
      </div>
      <div class="flex items-start gap-4">
        <Button size="small">
          {#snippet children()}Small{/snippet}
        </Button>
        <Button size="medium">
          {#snippet children()}Medium{/snippet}
        </Button>
        <Button size="large">
          {#snippet children()}Large{/snippet}
        </Button>
      </div>
      <div class="flex items-start gap-4">
        <Button disabled>
          {#snippet children()}Disabled{/snippet}
        </Button>
        <Button loading>
          {#snippet children()}Loading{/snippet}
        </Button>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Primary" args={{ variant: 'primary' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Button {...args}>
      {#snippet children()}Button{/snippet}
    </Button>
  {/snippet}
</Story>

<Story name="Secondary" args={{ variant: 'secondary' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Button {...args}>
      {#snippet children()}Button{/snippet}
    </Button>
  {/snippet}
</Story>

<Story name="Tertiary" args={{ variant: 'tertiary' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Button {...args}>
      {#snippet children()}Button{/snippet}
    </Button>
  {/snippet}
</Story>

<Story name="Extra Small" args={{ size: 'xs' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Button {...args}>
      {#snippet children()}Button{/snippet}
    </Button>
  {/snippet}
</Story>

<Story name="Small" args={{ size: 'small' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Button {...args}>
      {#snippet children()}Button{/snippet}
    </Button>
  {/snippet}
</Story>

<Story name="Medium" args={{ size: 'medium' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Button {...args}>
      {#snippet children()}Button{/snippet}
    </Button>
  {/snippet}
</Story>

<Story name="Large" args={{ size: 'large' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Button {...args}>
      {#snippet children()}Button{/snippet}
    </Button>
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Button {...args}>
      {#snippet children()}Button{/snippet}
    </Button>
  {/snippet}
</Story>

<Story name="Loading" args={{ loading: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Button {...args}>
      {#snippet children()}Button{/snippet}
    </Button>
  {/snippet}
</Story>

<Story name="Full Width" args={{ fullWidth: true }} parameters={{ layout: 'default' }}>
  {#snippet template(args)}
    <Button {...args}>
      {#snippet children()}Button{/snippet}
    </Button>
  {/snippet}
</Story>

<Story name="With Icon" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Left Icons Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Left Icons</h3>
        <div class="flex flex-wrap items-start gap-4">
          <Button variant="primary" leftIcon={AddIcon}>
            {#snippet children()}Add Item{/snippet}
          </Button>
          <Button variant="secondary" leftIcon={EditIcon}>
            {#snippet children()}Edit{/snippet}
          </Button>
          <Button variant="tertiary" leftIcon={SearchIcon}>
            {#snippet children()}Search{/snippet}
          </Button>
          <Button variant="primary" leftIcon={CameraIcon}>
            {#snippet children()}Take Photo{/snippet}
          </Button>
        </div>
      </div>

      <!-- Right Icons Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Right Icons</h3>
        <div class="flex flex-wrap items-start gap-4">
          <Button variant="primary" rightIcon={ArrowRightIcon}>
            {#snippet children()}Continue{/snippet}
          </Button>
          <Button variant="secondary" rightIcon={SendIcon}>
            {#snippet children()}Send Message{/snippet}
          </Button>
          <Button variant="tertiary" rightIcon={SettingsIcon}>
            {#snippet children()}Settings{/snippet}
          </Button>
        </div>
      </div>

      <!-- Icon Only (Text + Icon combinations) -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Both Icons</h3>
        <div class="flex flex-wrap items-start gap-4">
          <Button variant="primary" leftIcon={ArrowLeftIcon} rightIcon={ArrowRightIcon}>
            {#snippet children()}Navigate{/snippet}
          </Button>
          <Button variant="secondary" leftIcon={CheckIcon} rightIcon={SendIcon}>
            {#snippet children()}Approve & Send{/snippet}
          </Button>
        </div>
      </div>

      <!-- Different Sizes with Icons -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Sizes with Icons</h3>
        <div class="flex flex-wrap items-center gap-4">
          <Button size="small" leftIcon={AddIcon}>
            {#snippet children()}Small{/snippet}
          </Button>
          <Button size="medium" leftIcon={EditIcon}>
            {#snippet children()}Medium{/snippet}
          </Button>
          <Button size="large" leftIcon={SettingsIcon}>
            {#snippet children()}Large{/snippet}
          </Button>
        </div>
      </div>

      <!-- States with Icons -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States with Icons</h3>
        <div class="flex flex-wrap items-start gap-4">
          <Button variant="primary" leftIcon={CheckIcon}>
            {#snippet children()}Normal{/snippet}
          </Button>
          <Button variant="primary" leftIcon={CheckIcon} disabled>
            {#snippet children()}Disabled{/snippet}
          </Button>
          <Button variant="primary" leftIcon={SendIcon} loading>
            {#snippet children()}Loading{/snippet}
          </Button>
        </div>
      </div>

      <!-- Full Width with Icons -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Full Width with Icons</h3>
        <div class="space-y-3">
          <Button variant="primary" leftIcon={AddIcon} fullWidth>
            {#snippet children()}Create New Account{/snippet}
          </Button>
          <Button variant="secondary" leftIcon={CameraIcon} rightIcon={ArrowRightIcon} fullWidth>
            {#snippet children()}Upload Photo and Continue{/snippet}
          </Button>
        </div>
      </div>
    </div>
  {/snippet}
</Story>
