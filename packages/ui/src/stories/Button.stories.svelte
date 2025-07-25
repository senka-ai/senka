<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Button from '../lib/components/Button.svelte'

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

<Story name="Full Width" args={{ fullWidth: true }} parameters={{ layout: 'full' }}>
  {#snippet template(args)}
    <Button {...args}>
      {#snippet children()}Button{/snippet}
    </Button>
  {/snippet}
</Story>
