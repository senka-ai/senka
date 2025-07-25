<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Toggle from '../lib/components/forms/Toggle.svelte'

  const { Story } = defineMeta({
    title: 'Forms/Toggle',
    component: Toggle,
    args: {
      checked: false,
      size: 'medium',
      disabled: false,
    },
    argTypes: {
      checked: {
        control: { type: 'boolean' },
        description: 'Toggle state',
      },
      size: {
        control: { type: 'select' },
        options: ['xs', 'small', 'medium', 'large'],
        description: 'Toggle size',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      onchange: {
        action: 'changed',
        description: 'Change event handler',
      },
    },
  })
</script>

<Story name="Default" args={{ checked: false }}>
  {#snippet template(args)}
    <Toggle {...args} />
  {/snippet}
</Story>

<Story name="Checked" args={{ checked: true }}>
  {#snippet template(args)}
    <Toggle {...args} />
  {/snippet}
</Story>

<Story name="Small" args={{ size: 'small' }}>
  {#snippet template(args)}
    <Toggle {...args} />
  {/snippet}
</Story>

<Story name="Medium" args={{ size: 'medium' }}>
  {#snippet template(args)}
    <Toggle {...args} />
  {/snippet}
</Story>

<Story name="Large" args={{ size: 'large' }}>
  {#snippet template(args)}
    <Toggle {...args} />
  {/snippet}
</Story>

<Story name="Disabled Off" args={{ disabled: true, checked: false }}>
  {#snippet template(args)}
    <Toggle {...args} />
  {/snippet}
</Story>

<Story name="Disabled On" args={{ disabled: true, checked: true }}>
  {#snippet template(args)}
    <Toggle {...args} />
  {/snippet}
</Story>

<Story name="All Sizes" args={{}}>
  {#snippet template()}
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <Toggle size="small" />
        <Toggle size="small" checked={true} />
      </div>
      <div class="flex items-center gap-4">
        <Toggle size="medium" />
        <Toggle size="medium" checked={true} />
      </div>
      <div class="flex items-center gap-4">
        <Toggle size="large" />
        <Toggle size="large" checked={true} />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Interactive Example" args={{}}>
  {#snippet template()}
    <div class="space-y-4">
      <p class="text-neutral-600">Toggle settings:</p>
      <div class="flex flex-col gap-3">
        <label class="bg-surface flex items-center justify-between gap-4 rounded-lg p-3">
          <span>Enable notifications</span>
          <Toggle />
        </label>
        <label class="bg-surface flex items-center justify-between gap-4 rounded-lg p-3">
          <span>Dark mode</span>
          <Toggle checked={true} />
        </label>
        <label class="bg-surface flex items-center justify-between gap-4 rounded-lg p-3">
          <span>Auto-save</span>
          <Toggle />
        </label>
        <label class="bg-surface flex items-center justify-between gap-4 rounded-lg p-3">
          <span class="text-neutral-500">Maintenance mode (disabled)</span>
          <Toggle disabled />
        </label>
      </div>
    </div>
  {/snippet}
</Story>
