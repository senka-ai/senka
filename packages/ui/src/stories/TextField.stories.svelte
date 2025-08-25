<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import TextField from '@ui/components/forms/TextField.svelte'
  import EyeInvisibleIcon from '@ui/icons/EyeInvisibleIcon.svelte'

  const { Story } = defineMeta({
    title: 'Forms/TextField',
    component: TextField,
    args: {
      label: 'Label',
      placeholder: 'Placeholder text',
      disabled: false,
      fullWidth: false,
    },
    argTypes: {
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
        description: 'Helper text',
      },
      error: {
        control: { type: 'text' },
        description: 'Error message',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      fullWidth: {
        control: { type: 'boolean' },
        description: 'Full width field',
      },
      unit: {
        control: { type: 'text' },
        description: 'Unit suffix',
      },
    },
  })
</script>

<Story name="Overview" args={{}} parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="max-w-md space-y-4">
      <TextField label="Default" placeholder="Enter text" />
      <TextField label="With Helper Text" placeholder="Enter text" helperText="This is helper text" />
      <TextField label="With Error" placeholder="Enter text" error="This field is required" />
      <TextField label="Disabled" placeholder="Enter text" disabled />
      <TextField label="With Unit" placeholder="0.00" unit="€" />
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <TextField {...args} />
  {/snippet}
</Story>

<Story name="With Helper Text" args={{ helperText: 'This is helper text' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <TextField {...args} />
  {/snippet}
</Story>

<Story name="With Error" args={{ error: 'Please enter a valid email address' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <TextField {...args} />
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <TextField {...args} />
  {/snippet}
</Story>

<Story name="With Password Icon" args={{ type: 'password', label: 'Password' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <TextField {...args} />
  {/snippet}
</Story>
