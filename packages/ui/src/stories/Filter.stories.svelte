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
          <Filter variant="primary">
            {#snippet children()}Filter{/snippet}
          </Filter>
          <Filter variant="secondary">
            {#snippet children()}Filter{/snippet}
          </Filter>
          <Filter variant="tertiary">
            {#snippet children()}Filter{/snippet}
          </Filter>
        </div>
      </div>

      <!-- Sizes Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Sizes</h3>
        <div class="flex items-start gap-4">
          <Filter size="small">
            {#snippet children()}Small{/snippet}
          </Filter>
          <Filter size="medium">
            {#snippet children()}Medium{/snippet}
          </Filter>
          <Filter size="large">
            {#snippet children()}Large{/snippet}
          </Filter>
        </div>
      </div>

      <!-- With Active Filters Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">With Active Filters</h3>
        <div class="flex items-start gap-4">
          <Filter activeFilters={2}>
            {#snippet children()}Filter{/snippet}
          </Filter>
          <Filter activeFilters={5} variant="primary">
            {#snippet children()}Filter{/snippet}
          </Filter>
          <Filter activeFilters={12}>
            {#snippet children()}Filter{/snippet}
          </Filter>
        </div>
      </div>

      <!-- States Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States</h3>
        <div class="flex items-start gap-4">
          <Filter active>
            {#snippet children()}Active{/snippet}
          </Filter>
          <Filter disabled>
            {#snippet children()}Disabled{/snippet}
          </Filter>
          <Filter disabled activeFilters={3}>
            {#snippet children()}Disabled with Badge{/snippet}
          </Filter>
        </div>
      </div>

      <!-- Without Icon Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Without Icon</h3>
        <div class="flex items-start gap-4">
          <Filter showIcon={false}>
            {#snippet children()}Filter{/snippet}
          </Filter>
          <Filter showIcon={false} activeFilters={4}>
            {#snippet children()}Filter{/snippet}
          </Filter>
        </div>
      </div>

      <!-- Custom Icons Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Custom Icons</h3>
        <div class="flex items-start gap-4">
          <Filter icon={SearchIcon}>
            {#snippet children()}Search Filter{/snippet}
          </Filter>
          <Filter icon={CategoriesIcon} activeFilters={7}>
            {#snippet children()}Category Filter{/snippet}
          </Filter>
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
    <Filter {...args}>
      {#snippet children()}Filter{/snippet}
    </Filter>
  {/snippet}
</Story>

<Story name="Secondary" args={{ variant: 'secondary' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Filter {...args}>
      {#snippet children()}Filter{/snippet}
    </Filter>
  {/snippet}
</Story>

<Story name="Tertiary" args={{ variant: 'tertiary' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Filter {...args}>
      {#snippet children()}Filter{/snippet}
    </Filter>
  {/snippet}
</Story>

<Story name="With Active Filters" args={{ activeFilters: 3 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Filter {...args}>
      {#snippet children()}Filter{/snippet}
    </Filter>
  {/snippet}
</Story>

<Story name="Active State" args={{ active: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Filter {...args}>
      {#snippet children()}Active Filter{/snippet}
    </Filter>
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Filter {...args}>
      {#snippet children()}Disabled Filter{/snippet}
    </Filter>
  {/snippet}
</Story>

<Story name="Custom Icon" args={{ icon: SearchIcon }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Filter {...args}>
      {#snippet children()}Search Filter{/snippet}
    </Filter>
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
            <Filter activeFilters={2} onclick={() => console.log('Category filter clicked')}>
              {#snippet children()}Category{/snippet}
            </Filter>
            <Filter activeFilters={1} onclick={() => console.log('Price filter clicked')}>
              {#snippet children()}Price{/snippet}
            </Filter>
            <Filter onclick={() => console.log('Availability filter clicked')}>
              {#snippet children()}Availability{/snippet}
            </Filter>
          </div>
        </div>

        <div>
          <p class="mb-2 text-sm text-neutral-600">Search Filters</p>
          <div class="flex gap-3">
            <Filter icon={SearchIcon} activeFilters={5} onclick={() => console.log('Search filter clicked')}>
              {#snippet children()}Search Results{/snippet}
            </Filter>
            <Filter icon={CategoriesIcon} onclick={() => console.log('Category filter clicked')}>
              {#snippet children()}Categories{/snippet}
            </Filter>
          </div>
        </div>

        <div>
          <p class="mb-2 text-sm text-neutral-600">Filter States</p>
          <div class="flex gap-3">
            <Filter active onclick={() => console.log('Active filter clicked')}>
              {#snippet children()}Active Filter{/snippet}
            </Filter>
            <Filter disabled>
              {#snippet children()}Disabled Filter{/snippet}
            </Filter>
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
          <Filter size="small" activeFilters={2}>
            {#snippet children()}Small{/snippet}
          </Filter>
          <span class="text-sm text-neutral-600">Small size filter</span>
        </div>

        <div class="flex items-center gap-4">
          <Filter size="medium" activeFilters={5}>
            {#snippet children()}Medium{/snippet}
          </Filter>
          <span class="text-sm text-neutral-600">Medium size filter (default)</span>
        </div>

        <div class="flex items-center gap-4">
          <Filter size="large" activeFilters={10}>
            {#snippet children()}Large{/snippet}
          </Filter>
          <span class="text-sm text-neutral-600">Large size filter</span>
        </div>
      </div>
    </div>
  {/snippet}
</Story>
