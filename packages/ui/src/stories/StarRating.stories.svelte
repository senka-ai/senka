<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import StarRating from '@components/forms/StarRating.svelte'
  import Button from '@components/core/Button.svelte'

  const { Story } = defineMeta({
    title: 'Forms/StarRating',
    component: StarRating,
    args: {
      rating: 0,
      maxRating: 5,
      size: 'medium',
      color: 'primary',
      readonly: false,
      allowHalf: false,
      disabled: false,
      class: '',
      id: '',
      name: '',
    },
    argTypes: {
      rating: {
        control: { type: 'number', min: 0, max: 5, step: 1 },
        description: 'Current rating value (0-5)',
      },
      maxRating: {
        control: { type: 'number', min: 1, max: 10, step: 1 },
        description: 'Maximum number of stars',
      },
      size: {
        control: { type: 'select' },
        options: ['xs', 'small', 'medium', 'large'],
        description: 'Size of the star rating component',
      },
      color: {
        control: { type: 'select' },
        options: ['primary', 'success', 'warning', 'error'],
        description: 'Color theme for filled stars',
      },
      readonly: {
        control: { type: 'boolean' },
        description: 'Whether the rating is read-only',
      },
      allowHalf: {
        control: { type: 'boolean' },
        description: 'Allow half-star ratings (not implemented yet)',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      class: {
        control: { type: 'text' },
        description: 'Additional CSS classes',
      },
      id: {
        control: { type: 'text' },
        description: 'HTML id attribute',
      },
      name: {
        control: { type: 'text' },
        description: 'Name for form input',
      },
      onchange: {
        control: false,
        description: 'Change handler function - receives new rating value',
      },
      onclick: {
        control: false,
        description: 'Click handler function',
      },
      onkeydown: {
        control: false,
        description: 'Keydown handler function',
      },
      onfocus: {
        control: false,
        description: 'Focus handler function',
      },
      onblur: {
        control: false,
        description: 'Blur handler function',
      },
    },
    parameters: {
      docs: {
        description: {
          component:
            'Star Rating is a component which allows users to give a rating of 0 to 5 on a certain topic. It is often used to measure the preference level of the user regarding some content.',
        },
      },
    },
  })
</script>

<Story name="Overview" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Sizes Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Sizes</h3>
        <div class="flex items-center gap-6">
          <div class="text-center">
            <StarRating size="xs" rating={3} />
            <p class="mt-2 text-sm text-neutral-600">XS</p>
          </div>
          <div class="text-center">
            <StarRating size="small" rating={3} />
            <p class="mt-2 text-sm text-neutral-600">Small</p>
          </div>
          <div class="text-center">
            <StarRating size="medium" rating={3} />
            <p class="mt-2 text-sm text-neutral-600">Medium</p>
          </div>
          <div class="text-center">
            <StarRating size="large" rating={3} />
            <p class="mt-2 text-sm text-neutral-600">Large</p>
          </div>
        </div>
      </div>

      <!-- Rating Values Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Rating Values</h3>
        <div class="flex items-center gap-6">
          <div class="text-center">
            <StarRating rating={0} />
            <p class="mt-2 text-sm text-neutral-600">No Rating</p>
          </div>
          <div class="text-center">
            <StarRating rating={1} />
            <p class="mt-2 text-sm text-neutral-600">1 Star</p>
          </div>
          <div class="text-center">
            <StarRating rating={2} />
            <p class="mt-2 text-sm text-neutral-600">2 Stars</p>
          </div>
          <div class="text-center">
            <StarRating rating={3} />
            <p class="mt-2 text-sm text-neutral-600">3 Stars</p>
          </div>
          <div class="text-center">
            <StarRating rating={4} />
            <p class="mt-2 text-sm text-neutral-600">4 Stars</p>
          </div>
          <div class="text-center">
            <StarRating rating={5} />
            <p class="mt-2 text-sm text-neutral-600">5 Stars</p>
          </div>
        </div>
      </div>

      <!-- States Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States</h3>
        <div class="flex items-center gap-6">
          <div class="text-center">
            <StarRating rating={3} />
            <p class="mt-2 text-sm text-neutral-600">Default</p>
          </div>
          <div class="text-center">
            <StarRating rating={3} readonly />
            <p class="mt-2 text-sm text-neutral-600">Read-only</p>
          </div>
          <div class="text-center">
            <StarRating rating={3} disabled />
            <p class="mt-2 text-sm text-neutral-600">Disabled</p>
          </div>
        </div>
      </div>

      <!-- Colors Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Colors</h3>
        <div class="flex items-center gap-6">
          <div class="text-center">
            <StarRating rating={4} color="primary" />
            <p class="mt-2 text-sm text-neutral-600">Primary</p>
          </div>
          <div class="text-center">
            <StarRating rating={4} color="success" />
            <p class="mt-2 text-sm text-neutral-600">Success</p>
          </div>
          <div class="text-center">
            <StarRating rating={4} color="warning" />
            <p class="mt-2 text-sm text-neutral-600">Warning</p>
          </div>
          <div class="text-center">
            <StarRating rating={4} color="error" />
            <p class="mt-2 text-sm text-neutral-600">Error</p>
          </div>
        </div>
      </div>

      <!-- Custom Max Rating Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Custom Max Rating</h3>
        <div class="flex items-center gap-6">
          <div class="text-center">
            <StarRating rating={2} maxRating={3} />
            <p class="mt-2 text-sm text-neutral-600">3 Stars Max</p>
          </div>
          <div class="text-center">
            <StarRating rating={4} maxRating={7} />
            <p class="mt-2 text-sm text-neutral-600">7 Stars Max</p>
          </div>
          <div class="text-center">
            <StarRating rating={8} maxRating={10} />
            <p class="mt-2 text-sm text-neutral-600">10 Stars Max</p>
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <StarRating {...args} />
  {/snippet}
</Story>

<Story name="Interactive" args={{ rating: 0 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <StarRating
      rating={args.rating}
      size={args.size}
      maxRating={args.maxRating}
      readonly={args.readonly}
      disabled={args.disabled}
      onchange={(newRating) => console.log('Rating changed to:', newRating)}
    />
  {/snippet}
</Story>

<Story name="XS Size" args={{ size: 'xs', rating: 3 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <StarRating {...args} />
  {/snippet}
</Story>

<Story name="Small Size" args={{ size: 'small', rating: 3 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <StarRating {...args} />
  {/snippet}
</Story>

<Story name="Medium Size" args={{ size: 'medium', rating: 3 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <StarRating {...args} />
  {/snippet}
</Story>

<Story name="Large Size" args={{ size: 'large', rating: 3 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <StarRating {...args} />
  {/snippet}
</Story>

<Story name="Read-only" args={{ rating: 4, readonly: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <StarRating {...args} />
  {/snippet}
</Story>

<Story name="Disabled" args={{ rating: 3, disabled: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <StarRating {...args} />
  {/snippet}
</Story>

<Story name="Custom Max Rating" args={{ rating: 3, maxRating: 7 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <StarRating {...args} />
  {/snippet}
</Story>

<Story name="No Rating" args={{ rating: 0 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <StarRating {...args} />
  {/snippet}
</Story>

<Story name="Full Rating" args={{ rating: 5 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <StarRating {...args} />
  {/snippet}
</Story>

<Story name="Primary Color" args={{ rating: 4, color: 'primary' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <StarRating {...args} />
  {/snippet}
</Story>

<Story name="Success Color" args={{ rating: 4, color: 'success' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <StarRating {...args} />
  {/snippet}
</Story>

<Story name="Warning Color" args={{ rating: 4, color: 'warning' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <StarRating {...args} />
  {/snippet}
</Story>

<Story name="Error Color" args={{ rating: 4, color: 'error' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <StarRating {...args} />
  {/snippet}
</Story>

<Story name="Product Review" args={{}} parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Product Review</h3>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-body-m text-neutral-700">Overall Rating</span>
          <StarRating rating={4} onchange={(rating) => console.log('Overall:', rating)} />
        </div>

        <div class="flex items-center justify-between">
          <span class="text-body-m text-neutral-700">Quality</span>
          <StarRating rating={5} onchange={(rating) => console.log('Quality:', rating)} />
        </div>

        <div class="flex items-center justify-between">
          <span class="text-body-m text-neutral-700">Value for Money</span>
          <StarRating rating={3} onchange={(rating) => console.log('Value:', rating)} />
        </div>

        <div class="flex items-center justify-between">
          <span class="text-body-m text-neutral-700">Shipping</span>
          <StarRating rating={4} onchange={(rating) => console.log('Shipping:', rating)} />
        </div>
      </div>

      <div class="border-t border-neutral-200 pt-4">
        <div class="flex items-center gap-3">
          <span class="text-body-m font-medium text-neutral-800">Average: 4.0</span>
          <StarRating rating={4} readonly size="small" />
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Form Integration" args={{}} parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Feedback Form</h3>

      <form class="space-y-4">
        <div class="space-y-2">
          <label for="experience-rating" class="text-body-m block font-medium text-neutral-700">
            How would you rate your experience?
          </label>
          <StarRating
            id="experience-rating"
            name="experience-rating"
            rating={0}
            onchange={(rating) => console.log('Experience rating:', rating)}
          />
        </div>

        <div class="space-y-2">
          <label for="recommendation-rating" class="text-body-m block font-medium text-neutral-700">
            Would you recommend us to others?
          </label>
          <StarRating
            id="recommendation-rating"
            name="recommendation-rating"
            rating={0}
            onchange={(rating) => console.log('Recommendation rating:', rating)}
          />
        </div>

        <div class="pt-4">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            onclick={() => {
              console.log('Form submitted')
            }}
          >
            {#snippet children()}
              Submit Feedback
            {/snippet}
          </Button>
        </div>
      </form>
    </div>
  {/snippet}
</Story>

<Story name="Compact Display" args={{}} parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="max-w-lg space-y-4">
      <h3 class="text-lg font-medium">Customer Reviews</h3>

      <div class="space-y-3">
        <div class="flex items-center justify-between rounded-lg bg-neutral-50 p-3">
          <div>
            <p class="text-body-m font-medium text-neutral-800">John D.</p>
            <p class="text-body-s text-neutral-600">Great product, fast shipping!</p>
          </div>
          <StarRating rating={5} readonly size="small" />
        </div>

        <div class="flex items-center justify-between rounded-lg bg-neutral-50 p-3">
          <div>
            <p class="text-body-m font-medium text-neutral-800">Sarah M.</p>
            <p class="text-body-s text-neutral-600">Good quality but expensive.</p>
          </div>
          <StarRating rating={3} readonly size="small" />
        </div>

        <div class="flex items-center justify-between rounded-lg bg-neutral-50 p-3">
          <div>
            <p class="text-body-m font-medium text-neutral-800">Mike K.</p>
            <p class="text-body-s text-neutral-600">Exceeded my expectations!</p>
          </div>
          <StarRating rating={4} readonly size="small" />
        </div>
      </div>
    </div>
  {/snippet}
</Story>
