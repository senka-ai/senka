<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Checkbox from '../lib/components/forms/Checkbox.svelte'

  const { Story } = defineMeta({
    title: 'Components/Checkbox',
    component: Checkbox,
    args: {
      checked: false,
      size: 'medium',
      disabled: false,
    },
    argTypes: {
      checked: {
        control: { type: 'boolean' },
        description: 'Checked state',
      },
      size: {
        control: { type: 'select' },
        options: ['xs', 'small', 'medium', 'large'],
        description: 'Checkbox size',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      label: {
        control: { type: 'text' },
        description: 'Simple text label',
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
    <Checkbox {...args} />
  {/snippet}
</Story>

<Story name="Checked" args={{ checked: true }}>
  {#snippet template(args)}
    <Checkbox {...args} />
  {/snippet}
</Story>

<Story name="Extra Small" args={{ size: 'xs' }}>
  {#snippet template(args)}
    <Checkbox {...args} />
  {/snippet}
</Story>

<Story name="Small" args={{ size: 'small' }}>
  {#snippet template(args)}
    <Checkbox {...args} />
  {/snippet}
</Story>

<Story name="Medium" args={{ size: 'medium' }}>
  {#snippet template(args)}
    <Checkbox {...args} />
  {/snippet}
</Story>

<Story name="Large" args={{ size: 'large' }}>
  {#snippet template(args)}
    <Checkbox {...args} />
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true, checked: false }}>
  {#snippet template(args)}
    <Checkbox {...args} />
  {/snippet}
</Story>

<Story name="Disabled Checked" args={{ disabled: true, checked: true }}>
  {#snippet template(args)}
    <Checkbox {...args} />
  {/snippet}
</Story>

<Story name="All Sizes" args={{}}>
  {#snippet template()}
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <Checkbox size="xs" />
        <Checkbox size="xs" checked={true} />
      </div>
      <div class="flex items-center gap-4">
        <Checkbox size="small" />
        <Checkbox size="small" checked={true} />
      </div>
      <div class="flex items-center gap-4">
        <Checkbox size="medium" />
        <Checkbox size="medium" checked={true} />
      </div>
      <div class="flex items-center gap-4">
        <Checkbox size="large" />
        <Checkbox size="large" checked={true} />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="With Label" args={{ label: 'Accept terms and conditions' }}>
  {#snippet template(args)}
    <Checkbox {...args} />
  {/snippet}
</Story>

<Story name="Rich Content" args={{}}>
  {#snippet template()}
    <div class="space-y-4">
      <p class="text-neutral-600">Examples of rich content in checkboxes:</p>
      <div class="flex flex-col gap-3">
        <Checkbox>
          {#snippet children()}
            I agree to the <strong>terms and conditions</strong> and
            <a href="/terms" class="text-highlight underline">privacy policy</a>
          {/snippet}
        </Checkbox>
        <Checkbox>
          {#snippet children()}
            <strong>Important:</strong> Enable notifications for updates
          {/snippet}
        </Checkbox>
        <Checkbox>
          {#snippet children()}
            Subscribe to our <em>newsletter</em> for <strong>exclusive</strong> offers
          {/snippet}
        </Checkbox>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Interactive Example" args={{}}>
  {#snippet template()}
    <div class="space-y-4">
      <p class="text-neutral-600">Click anywhere on the checkbox or text to toggle:</p>
      <div class="flex flex-col gap-3">
        <Checkbox label="Simple text option" />
        <Checkbox label="Another simple option" />
        <Checkbox>
          {#snippet children()}
            Rich content with <strong>bold text</strong> and
            <a href="https://example.com" class="text-highlight underline">links</a>
          {/snippet}
        </Checkbox>
        <Checkbox label="Disabled option" disabled />
      </div>
    </div>
  {/snippet}
</Story>
