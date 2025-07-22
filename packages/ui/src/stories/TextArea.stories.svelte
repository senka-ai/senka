<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import TextArea from '../lib/components/forms/TextArea.svelte'

  const { Story } = defineMeta({
    title: 'Components/TextArea',
    component: TextArea,
    args: {
      label: 'Title',
      placeholder: 'Placeholder',
      showLabel: true,
      showPlaceholder: true,
      showHelperText: true,
      fullWidth: false,
      disabled: false,
      rows: 4,
      resize: 'vertical',
    },
    argTypes: {
      inputState: {
        control: { type: 'select' },
        options: ['default', 'focused', 'error', 'disabled'],
        description: 'Input state',
      },
      resize: {
        control: { type: 'select' },
        options: ['none', 'vertical', 'horizontal', 'both'],
        description: 'Resize behavior',
      },
      rows: {
        control: { type: 'number' },
        description: 'Number of visible text rows',
      },
      maxlength: {
        control: { type: 'number' },
        description: 'Maximum character length',
      },
    },
  })
</script>

<Story name="Default" args={{ value: '' }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="With Text" args={{ value: 'Text' }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="Focused" args={{ inputState: 'focused', value: 'Text' }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="Error" args={{ inputState: 'error', value: 'Text', error: 'Error message' }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true, value: 'Text' }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="With Helper Text" args={{ helperText: 'Support text' }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="With Character Count" args={{ maxlength: 200, value: 'Some text content' }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="Full Width" args={{ fullWidth: true }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="Different Rows" args={{ rows: 6 }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="No Resize" args={{ resize: 'none' }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="All States">
  {#snippet template()}
    <div class="space-y-6">
      <TextArea label="Default" placeholder="Placeholder" />
      <TextArea label="With Text" value="Text" />
      <TextArea label="Focused" inputState="focused" value="Text" />
      <TextArea label="Error" inputState="error" value="Text" error="Error message" />
      <TextArea label="Disabled" disabled value="Text" />
    </div>
  {/snippet}
</Story>

<Story name="Interactive Example">
  {#snippet template()}
    <div class="space-y-6">
      <TextArea
        label="Comment"
        placeholder="Write your comment here..."
        helperText="Maximum 500 characters"
        maxlength={500}
        rows={4}
      />
      <TextArea label="Description" placeholder="Enter a detailed description..." rows={6} fullWidth />
      <TextArea label="Notes" placeholder="Add your notes..." resize="none" rows={3} />
    </div>
  {/snippet}
</Story>
