<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import MapPlaceholder from '../lib/components/media/MapPlaceholder.svelte'

  const { Story } = defineMeta({
    title: 'Media/MapPlaceholder',
    component: MapPlaceholder,
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
          component: 'A map placeholder component used to represent map content before loading.',
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
            <MapPlaceholder variant="default" />
            <div class="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-xs">Default</div>
          </div>
          <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
            <MapPlaceholder variant="loading" />
            <div class="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-xs">Loading</div>
          </div>
          <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
            <MapPlaceholder variant="error" />
            <div class="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-xs">Error</div>
          </div>
        </div>
      </div>

      <!-- With Messages Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">With Messages</h3>
        <div class="grid grid-cols-2 gap-6">
          <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
            <MapPlaceholder variant="default" message="Loading map data..." />
          </div>
          <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
            <MapPlaceholder variant="error" message="Failed to load map" />
          </div>
        </div>
      </div>

      <!-- Different Sizes Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Different Container Sizes</h3>
        <div class="space-y-4">
          <div class="relative h-32 w-full overflow-hidden rounded-xl bg-neutral-100">
            <MapPlaceholder variant="default" message="Small container" />
          </div>
          <div class="relative h-64 w-full overflow-hidden rounded-xl bg-neutral-100">
            <MapPlaceholder variant="default" message="Large container" />
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'fullscreen' }}>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
      <MapPlaceholder {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Loading Variant" args={{ variant: 'loading' }} parameters={{ layout: 'fullscreen' }}>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
      <MapPlaceholder {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Error Variant" args={{ variant: 'error' }} parameters={{ layout: 'fullscreen' }}>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
      <MapPlaceholder {...args} />
    </div>
  {/snippet}
</Story>

<Story name="With Message" args={{ message: 'Loading map data...' }} parameters={{ layout: 'fullscreen' }}>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
      <MapPlaceholder {...args} />
    </div>
  {/snippet}
</Story>

<Story
  name="Loading With Message"
  args={{ variant: 'loading', message: 'Fetching location data...' }}
  parameters={{ layout: 'fullscreen' }}
>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
      <MapPlaceholder {...args} />
    </div>
  {/snippet}
</Story>

<Story
  name="Error With Message"
  args={{ variant: 'error', message: 'Unable to load map. Please try again.' }}
  parameters={{ layout: 'fullscreen' }}
>
  {#snippet template(args)}
    <div class="relative h-48 w-full max-w-md overflow-hidden rounded-xl bg-neutral-100">
      <MapPlaceholder {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Real World Example" args={{}}>
  {#snippet template()}
    <div class="max-w-2xl space-y-6">
      <h3 class="text-lg font-medium">Location Picker</h3>
      <div class="space-y-4 rounded-lg border border-neutral-300 p-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium">Select Location</span>
          <span class="text-xs text-neutral-500">Click on map to select</span>
        </div>
        <div class="relative h-64 w-full overflow-hidden rounded-lg border border-neutral-400">
          <MapPlaceholder variant="loading" message="Loading interactive map..." />
        </div>
        <div class="text-xs text-neutral-600">Map data provided by OpenStreetMap</div>
      </div>
    </div>
  {/snippet}
</Story>
