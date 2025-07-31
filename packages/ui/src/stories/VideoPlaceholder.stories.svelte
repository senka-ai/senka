<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import VideoPlaceholder from '../lib/components/media/VideoPlaceholder.svelte'

  const { Story } = defineMeta({
    title: 'Media/VideoPlaceholder',
    component: VideoPlaceholder,
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
          component: 'A video placeholder component used to represent video content before loading.',
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
          <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
            <VideoPlaceholder variant="default" />
            <div class="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-xs">Default</div>
          </div>
          <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
            <VideoPlaceholder variant="loading" />
            <div class="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-xs">Loading</div>
          </div>
          <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
            <VideoPlaceholder variant="error" />
            <div class="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-xs">Error</div>
          </div>
        </div>
      </div>

      <!-- With Messages Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">With Messages</h3>
        <div class="grid grid-cols-2 gap-6">
          <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
            <VideoPlaceholder variant="default" message="Loading video..." />
          </div>
          <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
            <VideoPlaceholder variant="error" message="Failed to load video" />
          </div>
        </div>
      </div>

      <!-- Different Sizes Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Different Container Sizes</h3>
        <div class="space-y-4">
          <div class="relative h-32 w-full overflow-hidden rounded-xl bg-neutral-100">
            <VideoPlaceholder variant="default" message="Small container" />
          </div>
          <div class="relative h-64 w-full overflow-hidden rounded-xl bg-neutral-100">
            <VideoPlaceholder variant="default" message="Large container" />
          </div>
        </div>
      </div>

      <!-- Video Aspect Ratios Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Common Video Aspect Ratios</h3>
        <div class="space-y-4">
          <div class="relative w-full overflow-hidden rounded-xl bg-neutral-100" style="aspect-ratio: 16/9;">
            <VideoPlaceholder variant="default" message="16:9 (Widescreen)" />
          </div>
          <div class="relative w-full overflow-hidden rounded-xl bg-neutral-100" style="aspect-ratio: 4/3;">
            <VideoPlaceholder variant="default" message="4:3 (Standard)" />
          </div>
          <div class="relative w-full overflow-hidden rounded-xl bg-neutral-100" style="aspect-ratio: 9/16;">
            <VideoPlaceholder variant="default" message="9:16 (Vertical)" />
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'fullscreen' }}>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
      <VideoPlaceholder {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Loading Variant" args={{ variant: 'loading' }} parameters={{ layout: 'fullscreen' }}>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
      <VideoPlaceholder {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Error Variant" args={{ variant: 'error' }} parameters={{ layout: 'fullscreen' }}>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
      <VideoPlaceholder {...args} variant="error" />
    </div>
  {/snippet}
</Story>

<Story name="With Message" args={{ message: 'Loading video data...' }} parameters={{ layout: 'fullscreen' }}>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
      <VideoPlaceholder {...args} />
    </div>
  {/snippet}
</Story>

<Story
  name="Loading With Message"
  args={{ variant: 'loading', message: 'Buffering video...' }}
  parameters={{ layout: 'fullscreen' }}
>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
      <VideoPlaceholder {...args} />
    </div>
  {/snippet}
</Story>

<Story
  name="Error With Message"
  args={{ variant: 'error', message: 'Unable to load video.' }}
  parameters={{ layout: 'fullscreen' }}
>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
      <VideoPlaceholder {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Real World Example" args={{}}>
  {#snippet template()}
    <div class="max-w-4xl space-y-6">
      <h3 class="text-lg font-medium">Video Player Interface</h3>
      <div class="space-y-4 rounded-lg border border-neutral-300 p-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium">Course Introduction Video</span>
          <span class="text-xs text-neutral-500">Duration: 5:24</span>
        </div>
        <div class="relative w-full overflow-hidden rounded-lg border border-neutral-400" style="aspect-ratio: 16/9;">
          <VideoPlaceholder variant="loading" message="Loading video player..." />
        </div>
        <div class="flex items-center justify-between">
          <div class="flex space-x-2">
            <button class="rounded bg-blue-500 px-3 py-1 text-xs text-white">Play</button>
            <button class="rounded bg-neutral-200 px-3 py-1 text-xs">Settings</button>
          </div>
          <div class="text-xs text-neutral-600">Video quality: HD</div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>
