<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import PaginationDots from '@ui/components/feedback/PaginationDots.svelte'

  const { Story } = defineMeta({
    title: 'Feedback/PaginationDots',
    component: PaginationDots,
    args: {
      totalPages: 5,
      currentPage: 0,
      size: 'medium',
      interactive: true,
      disabled: false,
    },
    argTypes: {
      totalPages: {
        control: { type: 'number', min: 2, max: 10, step: 1 },
        description: 'Total number of pages',
      },
      currentPage: {
        control: { type: 'number', min: 0, max: 9, step: 1 },
        description: 'Current active page (0-based)',
      },
      size: {
        control: { type: 'select' },
        options: ['xs', 'small', 'medium', 'large'],
        description: 'Size of pagination dots',
      },
      interactive: {
        control: { type: 'boolean' },
        description: 'Whether dots are clickable',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      onchange: {
        control: false,
        description: 'Called when page changes - receives new page index',
      },
      onclick: {
        control: false,
        description: 'Called when a dot is clicked',
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
        <div class="flex flex-col items-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <PaginationDots totalPages={5} currentPage={2} size="xs" />
            <span class="text-sm text-neutral-600">Extra Small</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <PaginationDots totalPages={5} currentPage={2} size="small" />
            <span class="text-sm text-neutral-600">Small</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <PaginationDots totalPages={5} currentPage={2} size="medium" />
            <span class="text-sm text-neutral-600">Medium</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <PaginationDots totalPages={5} currentPage={2} size="large" />
            <span class="text-sm text-neutral-600">Large</span>
          </div>
        </div>
      </div>

      <!-- Different Page Counts Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Different Page Counts</h3>
        <div class="flex flex-col items-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <PaginationDots totalPages={3} currentPage={1} />
            <span class="text-sm text-neutral-600">3 Pages</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <PaginationDots totalPages={5} currentPage={2} />
            <span class="text-sm text-neutral-600">5 Pages</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <PaginationDots totalPages={7} currentPage={3} />
            <span class="text-sm text-neutral-600">7 Pages</span>
          </div>
        </div>
      </div>

      <!-- States Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States</h3>
        <div class="flex flex-col items-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <PaginationDots totalPages={5} currentPage={0} />
            <span class="text-sm text-neutral-600">First Page</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <PaginationDots totalPages={5} currentPage={4} />
            <span class="text-sm text-neutral-600">Last Page</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <PaginationDots totalPages={5} currentPage={2} interactive={false} />
            <span class="text-sm text-neutral-600">Non-interactive</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <PaginationDots totalPages={5} currentPage={2} disabled />
            <span class="text-sm text-neutral-600">Disabled</span>
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <PaginationDots {...args} />
  {/snippet}
</Story>

<Story name="Extra Small" args={{ size: 'xs' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <PaginationDots {...args} />
  {/snippet}
</Story>

<Story name="Small" args={{ size: 'small' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <PaginationDots {...args} />
  {/snippet}
</Story>

<Story name="Medium" args={{ size: 'medium' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <PaginationDots {...args} />
  {/snippet}
</Story>

<Story name="Large" args={{ size: 'large' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <PaginationDots {...args} />
  {/snippet}
</Story>

<Story name="Non-interactive" args={{ interactive: false }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <PaginationDots {...args} />
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <PaginationDots {...args} />
  {/snippet}
</Story>

<Story name="Many Pages" args={{ totalPages: 8, currentPage: 3 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <PaginationDots {...args} />
  {/snippet}
</Story>

<Story name="Interactive Example" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Image Gallery Navigation</h3>
      <div class="space-y-4">
        <!-- Mock image display -->
        <div
          class="from-highlight-100 to-highlight-300 flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br"
        >
          <span class="text-2xl font-semibold text-white">Image 3 of 6</span>
        </div>

        <!-- Pagination dots -->
        <div class="flex justify-center">
          <PaginationDots
            totalPages={6}
            currentPage={2}
            onchange={(page) => console.log('Changed to page:', page + 1)}
            onclick={() => console.log('Dot clicked')}
          />
        </div>

        <p class="text-center text-sm text-neutral-600">
          Click on any dot to navigate to that image. Use keyboard arrows to navigate.
        </p>
      </div>
    </div>
  {/snippet}
</Story>
