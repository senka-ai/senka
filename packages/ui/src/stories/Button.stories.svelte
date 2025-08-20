<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Button from '@components/core/Button.svelte'
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
  } from '@icons'

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
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </div>
      <div class="flex items-start gap-4">
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </div>
      <div class="flex items-start gap-4">
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Primary" args={{ variant: 'primary' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Button {...args}>Button</Button>
  {/snippet}
</Story>

<Story name="Secondary" args={{ variant: 'secondary' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Button {...args}>Button</Button>
  {/snippet}
</Story>

<Story name="Tertiary" args={{ variant: 'tertiary' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Button {...args}>Button</Button>
  {/snippet}
</Story>

<Story name="Small" args={{ size: 'small' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Button {...args}>Button</Button>
  {/snippet}
</Story>

<Story name="Medium" args={{ size: 'medium' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Button {...args}>Button</Button>
  {/snippet}
</Story>

<Story name="Large" args={{ size: 'large' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Button {...args}>Button</Button>
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Button {...args}>Button</Button>
  {/snippet}
</Story>

<Story name="Loading" args={{ loading: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Button {...args}>Button</Button>
  {/snippet}
</Story>

<Story name="Full Width" args={{ fullWidth: true }} parameters={{ layout: 'default' }}>
  {#snippet template(args)}
    <Button {...args}>Button</Button>
  {/snippet}
</Story>

<Story name="With Icon" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Left Icons Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Left Icons</h3>
        <div class="flex flex-wrap items-start gap-4">
          <Button variant="primary" leftIcon={AddIcon}>Add Item</Button>
          <Button variant="secondary" leftIcon={EditIcon}>Edit</Button>
          <Button variant="tertiary" leftIcon={SearchIcon}>Search</Button>
          <Button variant="primary" leftIcon={CameraIcon}>Take Photo</Button>
        </div>
      </div>

      <!-- Right Icons Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Right Icons</h3>
        <div class="flex flex-wrap items-start gap-4">
          <Button variant="primary" rightIcon={ArrowRightIcon}>Continue</Button>
          <Button variant="secondary" rightIcon={SendIcon}>Send Message</Button>
          <Button variant="tertiary" rightIcon={SettingsIcon}>Settings</Button>
        </div>
      </div>

      <!-- Icon Only (Text + Icon combinations) -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Both Icons</h3>
        <div class="flex flex-wrap items-start gap-4">
          <Button variant="primary" leftIcon={ArrowLeftIcon} rightIcon={ArrowRightIcon}>Navigate</Button>
          <Button variant="secondary" leftIcon={CheckIcon} rightIcon={SendIcon}>Approve & Send</Button>
        </div>
      </div>

      <!-- Different Sizes with Icons -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Sizes with Icons</h3>
        <div class="flex flex-wrap items-center gap-4">
          <Button size="small" leftIcon={AddIcon}>Small</Button>
          <Button size="medium" leftIcon={EditIcon}>Medium</Button>
          <Button size="large" leftIcon={SettingsIcon}>Large</Button>
        </div>
      </div>

      <!-- States with Icons -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States with Icons</h3>
        <div class="flex flex-wrap items-start gap-4">
          <Button variant="primary" leftIcon={CheckIcon}>Normal</Button>
          <Button variant="primary" leftIcon={CheckIcon} disabled>Disabled</Button>
          <Button variant="primary" leftIcon={SendIcon} loading>Loading</Button>
        </div>
      </div>

      <!-- Full Width with Icons -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Full Width with Icons</h3>
        <div class="space-y-3">
          <Button variant="primary" leftIcon={AddIcon} fullWidth>Create New Account</Button>
          <Button variant="secondary" leftIcon={CameraIcon} rightIcon={ArrowRightIcon} fullWidth>
            Upload Photo and Continue
          </Button>
        </div>
      </div>
    </div>
  {/snippet}
</Story>
