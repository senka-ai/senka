<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Tooltip from '@components/feedback/Tooltip.svelte'
  import Button from '@components/core/Button.svelte'
  import IconButton from '@components/core/IconButton.svelte'
  import { SettingsIcon } from '@icons'

  const { Story } = defineMeta({
    title: 'Feedback/Tooltip',
    component: Tooltip,
    args: {
      title: 'Tooltip Title',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do',
      position: 'top',
      size: 'medium',
      showTitle: true,
      showDescription: true,
      delay: 500,
      disabled: false,
    },
    argTypes: {
      title: {
        control: { type: 'text' },
        description: 'Tooltip title text',
      },
      description: {
        control: { type: 'text' },
        description: 'Tooltip description text',
      },
      position: {
        control: { type: 'select' },
        options: ['top', 'bottom', 'left', 'right'],
        description: 'Tooltip position relative to trigger',
      },
      size: {
        control: { type: 'select' },
        options: ['auto', 'small', 'medium', 'large'],
        description: 'Tooltip size variant',
      },
      showTitle: {
        control: { type: 'boolean' },
        description: 'Whether to show the title',
      },
      showDescription: {
        control: { type: 'boolean' },
        description: 'Whether to show the description',
      },
      open: {
        control: false,
        description: 'Whether tooltip is visible (controlled mode) - set explicitly in story for demos',
      },
      delay: {
        control: { type: 'number', min: 0, max: 2000, step: 100 },
        description: 'Delay in milliseconds before showing tooltip',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Whether tooltip is disabled',
      },
    },
  })
</script>

<Story name="Overview" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Positions Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Positions</h3>
        <div class="grid grid-cols-2 gap-24 p-16">
          <div class="flex justify-center">
            <Tooltip
              title="Top Tooltip"
              description="This tooltip appears above the trigger"
              position="top"
              open={true}
            >
              <Button variant="secondary">Top</Button>
            </Tooltip>
          </div>

          <div class="flex justify-center">
            <Tooltip title="Bottom Tooltip" description="This tooltip appears below the trigger" position="bottom">
              <Button variant="secondary">Bottom</Button>
            </Tooltip>
          </div>

          <div class="flex justify-center">
            <Tooltip title="Left Tooltip" description="This tooltip appears to the left of the trigger" position="left">
              <Button variant="secondary">Left</Button>
            </Tooltip>
          </div>

          <div class="flex justify-center">
            <Tooltip
              title="Right Tooltip"
              description="This tooltip appears to the right of the trigger"
              position="right"
            >
              <Button variant="secondary">Right</Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <!-- Sizes Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Sizes</h3>
        <div class="flex items-center justify-center gap-8 py-12">
          <Tooltip title="Auto" size="auto">
            <Button variant="secondary" size="small">Auto</Button>
          </Tooltip>

          <Tooltip
            title="Small Tooltip"
            description="This is a small tooltip with less padding and smaller max width"
            size="small"
          >
            <Button variant="secondary">Small</Button>
          </Tooltip>

          <Tooltip
            title="Medium Tooltip"
            description="This is a medium tooltip with balanced padding and width"
            size="medium"
          >
            <Button variant="secondary">Medium</Button>
          </Tooltip>

          <Tooltip
            title="Large Tooltip"
            description="This is a large tooltip with generous padding and wider max width for longer content"
            size="large"
          >
            <Button variant="secondary">Large</Button>
          </Tooltip>
        </div>
      </div>

      <!-- Content Variants Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Content Variants</h3>
        <div class="flex items-center justify-center gap-12 py-12">
          <Tooltip title="Title Only" showDescription={false} size="auto">
            <Button variant="tertiary">Title Only</Button>
          </Tooltip>

          <Tooltip description="Description only tooltip without a title" showTitle={false}>
            <Button variant="tertiary">Description Only</Button>
          </Tooltip>

          <Tooltip title="Complete Tooltip" description="This tooltip has both title and description text">
            <Button variant="tertiary">Complete</Button>
          </Tooltip>
        </div>
      </div>

      <!-- Auto vs Fixed Width Comparison -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Auto vs Fixed Width</h3>
        <div class="flex items-center justify-center gap-8 py-8">
          <Tooltip title="Save" size="auto">
            <Button variant="secondary" size="small">Auto Width</Button>
          </Tooltip>

          <Tooltip title="Save" size="small">
            <Button variant="secondary" size="small">Fixed Width</Button>
          </Tooltip>
        </div>
        <p class="mt-2 text-center text-sm text-neutral-600">
          Compare how short text looks with auto width vs fixed minimum width
        </p>
      </div>

      <!-- Interactive Examples Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Interactive Examples</h3>
        <div class="flex items-center justify-center gap-8 py-8">
          <Tooltip title="Button Tooltip" description="Hover over this button to see the tooltip" delay={300}>
            <Button variant="primary">Hover Me</Button>
          </Tooltip>

          <Tooltip title="Icon Button" description="This is an icon button with a helpful tooltip" position="bottom">
            <IconButton variant="ghost" icon={SettingsIcon} aria-label="Settings" />
          </Tooltip>

          <Tooltip
            title="Text Link"
            description="Even text elements can have tooltips for additional context"
            position="top"
          >
            <span class="text-highlight cursor-help underline"> Helpful Text </span>
          </Tooltip>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="pt-32">
      <Tooltip
        title={args.title}
        description={args.description}
        position={args.position}
        showTitle={args.showTitle}
        showDescription={args.showDescription}
        open={args.open}
        delay={args.delay}
        disabled={args.disabled}
      >
        <Button variant="primary">Hover me</Button>
      </Tooltip>
    </div>
  {/snippet}
</Story>

<Story name="Top Position" args={{ position: 'top' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="pt-32 pb-4">
      <Tooltip {...args}>
        <Button variant="secondary">Top Tooltip</Button>
      </Tooltip>
    </div>
  {/snippet}
</Story>

<Story name="Bottom Position" args={{ position: 'bottom' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="pt-4 pb-16">
      <Tooltip {...args}>
        <Button variant="secondary">Bottom Tooltip</Button>
      </Tooltip>
    </div>
  {/snippet}
</Story>

<Story name="Left Position" args={{ position: 'left' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="py-4 pr-4 pl-32">
      <Tooltip {...args}>
        <Button variant="secondary">Left Tooltip</Button>
      </Tooltip>
    </div>
  {/snippet}
</Story>

<Story name="Right Position" args={{ position: 'right' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="py-4 pr-32 pl-4">
      <Tooltip {...args}>
        <Button variant="secondary">Right Tooltip</Button>
      </Tooltip>
    </div>
  {/snippet}
</Story>

<Story name="Auto Size" args={{ size: 'auto', title: 'Save' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="pt-16 pb-4 pl-32">
      <Tooltip {...args}>
        <Button variant="secondary">Auto Size</Button>
      </Tooltip>
    </div>
  {/snippet}
</Story>

<Story name="Small Size" args={{ size: 'small' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="pt-32 pb-4">
      <Tooltip {...args}>
        <Button variant="secondary">Small Tooltip</Button>
      </Tooltip>
    </div>
  {/snippet}
</Story>

<Story name="Medium Size" args={{ size: 'medium' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="pt-32 pb-4">
      <Tooltip {...args}>
        <Button variant="secondary">Medium Tooltip</Button>
      </Tooltip>
    </div>
  {/snippet}
</Story>

<Story name="Large Size" args={{ size: 'large' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="pt-32 pb-4 pl-8">
      <Tooltip {...args}>
        <Button variant="secondary">Large Tooltip</Button>
      </Tooltip>
    </div>
  {/snippet}
</Story>

<Story name="Title Only" args={{ showDescription: false }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="pt-12 pb-4">
      <Tooltip {...args} size="auto">
        <Button variant="tertiary">Title Only</Button>
      </Tooltip>
    </div>
  {/snippet}
</Story>

<Story
  name="Description Only"
  args={{ showTitle: false, description: 'This tooltip only shows description text' }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <div class="pt-12 pb-4">
      <Tooltip {...args}>
        <Button variant="tertiary">Description Only</Button>
      </Tooltip>
    </div>
  {/snippet}
</Story>

<Story
  name="With Icon Button"
  args={{ title: 'Settings', description: 'Open settings panel', position: 'bottom' }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <div class="p-16">
      <Tooltip {...args}>
        <IconButton variant="ghost" icon={SettingsIcon} aria-label="Settings" />
      </Tooltip>
    </div>
  {/snippet}
</Story>

<Story
  name="Long Description"
  args={{
    title: 'Long Content Example',
    size: 'large',
    description:
      'This is a longer tooltip description that demonstrates how the component handles extended text content with proper line breaks and text wrapping.',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <div class="p-20 pt-40">
      <Tooltip {...args}>
        <Button variant="secondary">Long Content</Button>
      </Tooltip>
    </div>
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="pt-12 pb-4">
      <Tooltip {...args}>
        <Button variant="secondary" disabled>Disabled Tooltip</Button>
      </Tooltip>
    </div>
  {/snippet}
</Story>
