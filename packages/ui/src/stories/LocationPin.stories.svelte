<!-- packages/ui/src/stories/LocationPin.stories.svelte -->
<!-- Storybook stories for the LocationPin component showcasing all variants, sizes, and use cases -->
<!-- Demonstrates location pin and current location indicators with interactive controls -->
<!-- RELEVANT FILES: LocationPin.svelte, STORYBOOK_PATTERNS.md, LocationPinIcon.svelte, styles.ts -->

<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import LocationPin from '../lib/components/media/LocationPin.svelte'
  import MapPlaceholder from '../lib/components/media/MapPlaceholder.svelte'

  const { Story } = defineMeta({
    title: 'Media/LocationPin',
    component: LocationPin,
    args: {
      variant: 'pin',
      size: 'medium',
      pulse: false,
      disabled: false,
      color: undefined,
    },
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['pin', 'current'],
        description: 'Type of location indicator',
      },
      size: {
        control: { type: 'select' },
        options: ['small', 'medium', 'large'],
        description: 'Size variant of the location pin',
      },
      pulse: {
        control: { type: 'boolean' },
        description: 'Whether the current location variant should pulse',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Whether the location pin is disabled',
      },
      color: {
        control: { type: 'color' },
        description: 'Custom color for the pin (overrides theme colors)',
      },
      onclick: {
        control: false,
        description: 'Click handler function',
      },
    },
  })
</script>

<Story name="Overview" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Variants Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Variants</h3>
        <div class="flex items-start gap-8">
          <div class="flex flex-col items-center gap-2">
            <LocationPin variant="pin" />
            <span class="text-xs text-neutral-600">Location Pin</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <LocationPin variant="current" />
            <span class="text-xs text-neutral-600">Current Location</span>
          </div>
        </div>
      </div>

      <!-- Sizes Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Sizes - Location Pin</h3>
        <div class="flex items-start gap-6">
          <div class="flex flex-col items-center gap-2">
            <LocationPin variant="pin" size="small" />
            <span class="text-xs text-neutral-600">Small</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <LocationPin variant="pin" size="medium" />
            <span class="text-xs text-neutral-600">Medium</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <LocationPin variant="pin" size="large" />
            <span class="text-xs text-neutral-600">Large</span>
          </div>
        </div>
      </div>

      <!-- Sizes Section - Current Location -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Sizes - Current Location</h3>
        <div class="flex items-start gap-6">
          <div class="flex flex-col items-center gap-2">
            <LocationPin variant="current" size="small" />
            <span class="text-xs text-neutral-600">Small</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <LocationPin variant="current" size="medium" />
            <span class="text-xs text-neutral-600">Medium</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <LocationPin variant="current" size="large" />
            <span class="text-xs text-neutral-600">Large</span>
          </div>
        </div>
      </div>

      <!-- Pulse Animation Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Pulse Animation</h3>
        <div class="flex items-start gap-6">
          <div class="flex flex-col items-center gap-2">
            <LocationPin variant="current" pulse={false} />
            <span class="text-xs text-neutral-600">Static</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <LocationPin variant="current" pulse={true} />
            <span class="text-xs text-neutral-600">Pulsing</span>
          </div>
        </div>
      </div>

      <!-- Interactive Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Interactive</h3>
        <div class="flex items-start gap-6">
          <div class="flex flex-col items-center gap-2">
            <LocationPin variant="pin" onclick={() => console.log('Pin clicked')} />
            <span class="text-xs text-neutral-600">Clickable Pin</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <LocationPin variant="current" onclick={() => console.log('Current location clicked')} />
            <span class="text-xs text-neutral-600">Clickable Current</span>
          </div>
        </div>
      </div>

      <!-- States Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States</h3>
        <div class="flex items-start gap-6">
          <div class="flex flex-col items-center gap-2">
            <LocationPin variant="pin" disabled />
            <span class="text-xs text-neutral-600">Disabled Pin</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <LocationPin variant="current" disabled />
            <span class="text-xs text-neutral-600">Disabled Current</span>
          </div>
        </div>
      </div>

      <!-- Custom Colors Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Custom Colors</h3>
        <div class="flex items-start gap-6">
          <div class="flex flex-col items-center gap-2">
            <LocationPin variant="pin" color="#FF6B6B" />
            <span class="text-xs text-neutral-600">Red Pin</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <LocationPin variant="current" color="#4ECDC4" />
            <span class="text-xs text-neutral-600">Teal Current</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <LocationPin variant="pin" color="#45B7D1" />
            <span class="text-xs text-neutral-600">Teal Pin</span>
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Location Pin" args={{ variant: 'pin' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <LocationPin {...args} />
  {/snippet}
</Story>

<Story name="Current Location" args={{ variant: 'current' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <LocationPin {...args} />
  {/snippet}
</Story>

<Story name="Small Size" args={{ size: 'small' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <LocationPin {...args} />
  {/snippet}
</Story>

<Story name="Large Size" args={{ size: 'large' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <LocationPin {...args} />
  {/snippet}
</Story>

<Story name="Pulsing Current Location" args={{ variant: 'current', pulse: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <LocationPin {...args} />
  {/snippet}
</Story>

<Story
  name="Interactive"
  args={{ onclick: () => console.log('LocationPin clicked!') }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <LocationPin {...args} />
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <LocationPin {...args} />
  {/snippet}
</Story>

<Story name="Custom Color" args={{ color: '#FF6B6B' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <LocationPin {...args} />
  {/snippet}
</Story>

<Story name="Map Example" args={{}}>
  {#snippet template()}
    <div class="relative h-64 w-full rounded-xl bg-gradient-to-br from-blue-100 to-green-100 p-4">
      <h3 class="mb-4 text-lg font-medium">Interactive Map with MapPlaceholder</h3>

      <!-- Map container with MapPlaceholder background -->
      <div class="relative h-full w-full overflow-hidden rounded-lg">
        <!-- MapPlaceholder as background -->
        <MapPlaceholder variant="default" />

        <!-- Location pins at different positions -->
        <div class="absolute top-12 left-8 z-10">
          <LocationPin variant="pin" size="small" onclick={() => console.log('Restaurant clicked')} />
        </div>

        <div class="absolute top-8 right-16 z-10">
          <LocationPin variant="pin" size="medium" onclick={() => console.log('Hotel clicked')} />
        </div>

        <div class="absolute top-1/3 left-1/2 z-10 -translate-x-1/2">
          <LocationPin
            variant="pin"
            size="large"
            color="#FF6B6B"
            onclick={() => console.log('Important location clicked')}
          />
        </div>

        <!-- Current location indicator -->
        <div class="absolute bottom-8 left-64 z-10">
          <LocationPin
            variant="current"
            size="medium"
            pulse={true}
            onclick={() => console.log('Current location clicked')}
          />
        </div>

        <!-- Legend -->
        <div class="absolute bottom-4 left-4 z-10 space-y-2 rounded-lg bg-white/90 p-3 shadow-sm backdrop-blur-sm">
          <div class="flex items-center gap-2">
            <LocationPin variant="pin" size="small" />
            <span class="text-xs text-neutral-600">Places of Interest</span>
          </div>
          <div class="flex items-center gap-2">
            <LocationPin variant="current" size="small" />
            <span class="text-xs text-neutral-600">Your Location</span>
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Size Comparison" args={{}}>
  {#snippet template()}
    <div class="space-y-6">
      <h3 class="text-lg font-medium">Size Comparison</h3>

      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm font-medium">Small:</span>
          <LocationPin variant="pin" size="small" />
          <LocationPin variant="current" size="small" />
          <LocationPin variant="current" size="small" pulse={true} />
        </div>

        <div class="flex items-center gap-4">
          <span class="w-20 text-sm font-medium">Medium:</span>
          <LocationPin variant="pin" size="medium" />
          <LocationPin variant="current" size="medium" />
          <LocationPin variant="current" size="medium" pulse={true} />
        </div>

        <div class="flex items-center gap-4">
          <span class="w-20 text-sm font-medium">Large:</span>
          <LocationPin variant="pin" size="large" />
          <LocationPin variant="current" size="large" />
          <LocationPin variant="current" size="large" pulse={true} />
        </div>
      </div>
    </div>
  {/snippet}
</Story>
