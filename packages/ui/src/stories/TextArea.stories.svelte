<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import TextArea from '@components/forms/TextArea.svelte'

  const { Story } = defineMeta({
    title: 'Forms/TextArea',
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

<Story name="Overview" args={{}} parameters={{ layout: 'wide' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Basic States -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Basic States</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p class="text-body-s text-secondary mb-2">Default (Empty)</p>
            <TextArea label="Default" placeholder="Enter your message here..." />
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">With Text</p>
            <TextArea
              label="With Content"
              value="This is some sample text content that shows how the textarea displays existing text."
            />
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">Error State</p>
            <TextArea
              label="Error Example"
              inputState="error"
              value="Invalid content"
              error="This field contains invalid content"
            />
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">Disabled</p>
            <TextArea label="Disabled" disabled value="This textarea is disabled and cannot be edited." />
          </div>
        </div>
      </div>

      <!-- Width Variants -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Width Variants</h3>
        <div class="space-y-4">
          <div>
            <p class="text-body-s text-secondary mb-2">Default Width (in narrow container)</p>
            <div class="max-w-sm">
              <TextArea label="Narrow Container" placeholder="This textarea is constrained to a narrow container..." />
            </div>
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">Full Width (spans entire container)</p>
            <TextArea
              label="Full Width"
              placeholder="This full-width textarea spans the entire available container width and is perfect for longer content..."
              fullWidth={true}
            />
          </div>
        </div>
      </div>

      <!-- Different Use Cases -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Common Use Cases</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <TextArea label="Comment" placeholder="Write your comment..." helperText="Share your thoughts" rows={3} />
          <TextArea label="Feedback" placeholder="Your feedback..." maxlength={200} />
          <TextArea label="Description" placeholder="Describe the item..." rows={5} />
          <TextArea label="Notes" placeholder="Add notes..." resize="none" rows={4} />
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{ value: '' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="With Text" args={{ value: 'Text' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="Focused" args={{ inputState: 'focused', value: 'Text' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story
  name="Error"
  args={{ inputState: 'error', value: 'Text', error: 'Error message' }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true, value: 'Text' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="With Helper Text" args={{ helperText: 'Support text' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story
  name="With Character Count"
  args={{ maxlength: 200, value: 'Some text content' }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="Full Width" args={{ fullWidth: true }} parameters={{ layout: 'full' }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="Different Rows" args={{ rows: 6 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="No Resize" args={{ resize: 'none' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <TextArea {...args} />
  {/snippet}
</Story>

<Story name="Interactive Example" args={{}} parameters={{ layout: 'default' }}>
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
