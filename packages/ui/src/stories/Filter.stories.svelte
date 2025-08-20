<!-- packages/ui/src/stories/Filter.stories.svelte -->
<!-- Storybook stories for the Filter component showcasing all variants, states, and use cases -->
<!-- Demonstrates filtering functionality with badge display and interactive controls -->
<!-- RELEVANT FILES: Filter.svelte, STORYBOOK_PATTERNS.md, Button.stories.svelte, Badge.stories.svelte -->

<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Filter from '@components/controls/Filter.svelte'
  import { SearchIcon, CategoriesIcon } from '@icons'

  const { Story } = defineMeta({
    title: 'Controls/Filter',
    component: Filter,
    args: {
      title: 'Filter',
      variant: 'secondary',
      size: 'medium',
      activeFilters: undefined,
      showIcon: true,
      disabled: false,
      active: false,
    },
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['primary', 'secondary', 'tertiary'],
        description: 'Visual style variant of the filter button',
      },
      size: {
        control: { type: 'select' },
        options: ['small', 'medium', 'large'],
        description: 'Size variant of the filter button',
      },
      title: {
        control: { type: 'text' },
        description: 'Title text displayed on the filter button',
      },
      activeFilters: {
        control: { type: 'number', min: 0, max: 99 },
        description: 'Number of active filters to display in badge',
      },
      showIcon: {
        control: { type: 'boolean' },
        description: 'Whether to show the filter icon',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Whether the filter button is disabled',
      },
      active: {
        control: { type: 'boolean' },
        description: 'Whether the filter is in active state',
      },
      iconSize: {
        control: { type: 'number', min: 12, max: 32, step: 2 },
        description: 'Size of the icon in pixels',
      },
      onclick: {
        control: false,
        description: 'Click handler function',
      },
      icon: {
        control: false,
        description: 'Custom icon component to display',
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
        <div class="flex items-start gap-4">
          <Filter variant="primary">Filter</Filter>
          <Filter variant="secondary">Filter</Filter>
          <Filter variant="tertiary">Filter</Filter>
        </div>
      </div>

      <!-- Sizes Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Sizes</h3>
        <div class="flex items-start gap-4">
          <Filter size="small">Small</Filter>
          <Filter size="medium">Medium</Filter>
          <Filter size="large">Large</Filter>
        </div>
      </div>

      <!-- With Active Filters Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">With Active Filters</h3>
        <div class="flex items-start gap-4">
          <Filter activeFilters={2}>Filter</Filter>
          <Filter activeFilters={5} variant="primary">Filter</Filter>
          <Filter activeFilters={12}>Filter</Filter>
        </div>
      </div>

      <!-- States Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States</h3>
        <div class="flex items-start gap-4">
          <Filter active>Active</Filter>
          <Filter disabled>Disabled</Filter>
          <Filter disabled activeFilters={3}>Disabled with Badge</Filter>
        </div>
      </div>

      <!-- Without Icon Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Without Icon</h3>
        <div class="flex items-start gap-4">
          <Filter showIcon={false}>Filter</Filter>
          <Filter showIcon={false} activeFilters={4}>Filter</Filter>
        </div>
      </div>

      <!-- Custom Icons Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Custom Icons</h3>
        <div class="flex items-start gap-4">
          <Filter icon={SearchIcon}>Search Filter</Filter>
          <Filter icon={CategoriesIcon} activeFilters={7}>Category Filter</Filter>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Filter
      title={args.title || 'Filter'}
      variant={args.variant}
      size={args.size}
      activeFilters={args.activeFilters}
      showIcon={args.showIcon}
      disabled={args.disabled}
      active={args.active}
      iconSize={args.iconSize}
      icon={args.icon}
      onclick={args.onclick}
    />
  {/snippet}
</Story>

<Story name="Primary" args={{ variant: 'primary' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Filter {...args}>Filter</Filter>
  {/snippet}
</Story>

<Story name="Secondary" args={{ variant: 'secondary' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Filter {...args}>Filter</Filter>
  {/snippet}
</Story>

<Story name="Tertiary" args={{ variant: 'tertiary' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Filter {...args}>Filter</Filter>
  {/snippet}
</Story>

<Story name="With Active Filters" args={{ activeFilters: 3 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Filter {...args}>Filter</Filter>
  {/snippet}
</Story>

<Story name="Active State" args={{ active: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Filter {...args}>Active Filter</Filter>
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Filter {...args}>Disabled Filter</Filter>
  {/snippet}
</Story>

<Story name="Custom Icon" args={{ icon: SearchIcon }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Filter {...args}>Search Filter</Filter>
  {/snippet}
</Story>

<Story name="Interactive Example" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Filter Controls</h3>

      <div class="space-y-4">
        <div>
          <p class="mb-2 text-sm text-neutral-600">Product Filters</p>
          <div class="flex gap-3">
            <Filter activeFilters={2} onclick={() => console.log('Category filter clicked')}>Category</Filter>
            <Filter activeFilters={1} onclick={() => console.log('Price filter clicked')}>Price</Filter>
            <Filter onclick={() => console.log('Availability filter clicked')}>Availability</Filter>
          </div>
        </div>

        <div>
          <p class="mb-2 text-sm text-neutral-600">Search Filters</p>
          <div class="flex gap-3">
            <Filter icon={SearchIcon} activeFilters={5} onclick={() => console.log('Search filter clicked')}>
              Search Results
            </Filter>
            <Filter icon={CategoriesIcon} onclick={() => console.log('Category filter clicked')}>Categories</Filter>
          </div>
        </div>

        <div>
          <p class="mb-2 text-sm text-neutral-600">Filter States</p>
          <div class="flex gap-3">
            <Filter active onclick={() => console.log('Active filter clicked')}>Active Filter</Filter>
            <Filter disabled>Disabled Filter</Filter>
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Size Variants" args={{}}>
  {#snippet template()}
    <div class="space-y-4">
      <h3 class="text-lg font-medium">Filter Sizes</h3>

      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <Filter size="small" activeFilters={2}>Small</Filter>
          <span class="text-sm text-neutral-600">Small size filter</span>
        </div>

        <div class="flex items-center gap-4">
          <Filter size="medium" activeFilters={5}>Medium</Filter>
          <span class="text-sm text-neutral-600">Medium size filter (default)</span>
        </div>

        <div class="flex items-center gap-4">
          <Filter size="large" activeFilters={10}>Large</Filter>
          <span class="text-sm text-neutral-600">Large size filter</span>
        </div>
      </div>
    </div>
  {/snippet}
</Story>
