<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Badge from '@components/feedback/Badge.svelte'

  const { Story } = defineMeta({
    title: 'Feedback/Badge',
    component: Badge,
    args: {
      type: 'number',
      variant: 'default',
      size: 'medium',
      value: 5,
      max: 99,
    },
    argTypes: {
      type: {
        control: { type: 'select' },
        options: ['number', 'icon', 'dot'],
        description: 'Badge type',
      },
      variant: {
        control: { type: 'select' },
        options: ['default', 'success', 'warning', 'error'],
        description: 'Badge variant',
      },
      size: {
        control: { type: 'select' },
        options: ['xs', 'small', 'medium', 'large'],
        description: 'Badge size',
      },
      value: {
        control: { type: 'text' },
        description: 'Badge value (number or string)',
      },
      max: {
        control: { type: 'number' },
        description: 'Maximum value before showing plus sign',
      },
    },
  })
</script>

<Story name="Overview" args={{}} parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <Badge type="number" value={5} />
        <Badge type="icon" />
        <Badge type="dot" />
      </div>
      <div class="flex items-center gap-4">
        <Badge type="number" value={5} variant="default" />
        <Badge type="number" value={5} variant="success" />
        <Badge type="number" value={5} variant="warning" />
        <Badge type="number" value={5} variant="error" />
      </div>
      <div class="flex items-center gap-4">
        <Badge type="number" value={5} size="small" />
        <Badge type="number" value={5} size="medium" />
        <Badge type="number" value={5} size="large" />
      </div>
      <div class="flex items-center gap-4">
        <Badge type="number" value="NEW" size="small" />
        <Badge type="number" value="UPDATED" size="medium" />
        <Badge type="number" value="PREMIUM" size="large" variant="success" />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Number" args={{ type: 'number', value: 5 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Badge {...args} />
  {/snippet}
</Story>

<Story name="Icon" args={{ type: 'icon' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Badge {...args} />
  {/snippet}
</Story>

<Story name="Dot" args={{ type: 'dot' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Badge {...args} />
  {/snippet}
</Story>

<Story name="Large Number" args={{ type: 'number', value: 99, max: 99 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Badge {...args} />
  {/snippet}
</Story>

<Story name="Text Badge" args={{ type: 'number', value: 'NEW' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Badge {...args} />
  {/snippet}
</Story>

<Story name="Long Text Badge" args={{ type: 'number', value: 'UPDATED' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Badge {...args} />
  {/snippet}
</Story>

<Story name="Status Text Badge" args={{ type: 'number', value: 'PREMIUM', variant: 'success' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Badge {...args} />
  {/snippet}
</Story>
