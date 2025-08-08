<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import ImagePlaceholder from '@components/media/ImagePlaceholder.svelte'

  const { Story } = defineMeta({
    title: 'Media/ImagePlaceholder',
    component: ImagePlaceholder,
    args: {
      variant: 'default',
      message: '',
      class: '',
    },
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['default', 'error', 'loading'],
        description: 'Visual variant of the placeholder',
      },
      message: {
        control: { type: 'text' },
        description: 'Optional message to display below the icon',
      },
      class: {
        control: { type: 'text' },
        description: 'Additional CSS classes',
      },
    },
    parameters: {
      docs: {
        description: {
          component: 'An image placeholder component used to represent image content before loading.',
        },
      },
    },
  })
</script>

<Story name="Overview" parameters={{ layout: 'wide' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Variants Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Variants</h3>
        <div class="grid grid-cols-3 gap-6">
          <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl">
            <ImagePlaceholder variant="default" />
            <div class="bg-surface-elevated text-secondary text-body-s absolute bottom-2 left-2 rounded px-2 py-1">
              Default
            </div>
          </div>
          <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl">
            <ImagePlaceholder variant="loading" />
            <div class="bg-surface-elevated text-secondary text-body-s absolute bottom-2 left-2 rounded px-2 py-1">
              Loading
            </div>
          </div>
          <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl">
            <ImagePlaceholder variant="error" />
            <div class="bg-surface-elevated text-secondary text-body-s absolute bottom-2 left-2 rounded px-2 py-1">
              Error
            </div>
          </div>
        </div>
      </div>

      <!-- With Messages Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">With Messages</h3>
        <div class="grid grid-cols-2 gap-6">
          <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl">
            <ImagePlaceholder variant="default" message="Loading image..." />
          </div>
          <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl">
            <ImagePlaceholder variant="error" message="Failed to load image" />
          </div>
        </div>
      </div>

      <!-- Different Sizes Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Different Container Sizes</h3>
        <div class="space-y-4">
          <div class="relative h-32 w-full overflow-hidden rounded-xl">
            <ImagePlaceholder variant="default" message="Small container" />
          </div>
          <div class="relative h-64 w-full overflow-hidden rounded-xl">
            <ImagePlaceholder variant="default" message="Large container" />
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'fullscreen' }}>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl">
      <ImagePlaceholder {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Loading Variant" args={{ variant: 'loading' }} parameters={{ layout: 'fullscreen' }}>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl">
      <ImagePlaceholder {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Error Variant" args={{ variant: 'error' }} parameters={{ layout: 'fullscreen' }}>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl">
      <ImagePlaceholder {...args} variant="error" />
    </div>
  {/snippet}
</Story>

<Story name="With Message" args={{ message: 'Loading image data...' }} parameters={{ layout: 'fullscreen' }}>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl">
      <ImagePlaceholder {...args} />
    </div>
  {/snippet}
</Story>

<Story
  name="Loading With Message"
  args={{ variant: 'loading', message: 'Fetching image...' }}
  parameters={{ layout: 'fullscreen' }}
>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl">
      <ImagePlaceholder {...args} />
    </div>
  {/snippet}
</Story>

<Story
  name="Error With Message"
  args={{ variant: 'error', message: 'Unable to load image. Please try again.' }}
  parameters={{ layout: 'fullscreen' }}
>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl">
      <ImagePlaceholder {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Real World Example" args={{}}>
  {#snippet template()}
    <div class="max-w-2xl space-y-6">
      <h3 class="text-lg font-medium">Image Gallery</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <div class="relative h-48 w-full overflow-hidden rounded-lg border border-neutral-300">
            <ImagePlaceholder variant="loading" message="Loading image..." />
          </div>
          <p class="text-sm text-neutral-600">Profile Photo</p>
        </div>
        <div class="space-y-2">
          <div class="relative h-48 w-full overflow-hidden rounded-lg border border-neutral-300">
            <ImagePlaceholder variant="error" message="Failed to load" />
          </div>
          <p class="text-sm text-neutral-600">Cover Image</p>
        </div>
      </div>
      <div class="text-xs text-neutral-500">Click to upload or drag and drop images</div>
    </div>
  {/snippet}
</Story>
