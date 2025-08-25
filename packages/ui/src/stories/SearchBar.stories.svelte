<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import SearchBar from '@ui/components/forms/SearchBar.svelte'

  const { Story } = defineMeta({
    title: 'Forms/SearchBar',
    component: SearchBar,
    args: {
      placeholder: 'Search',
      disabled: false,
      fullWidth: false,
    },
    argTypes: {
      placeholder: {
        control: { type: 'text' },
        description: 'Placeholder text',
      },
      value: {
        control: { type: 'text' },
        description: 'Input value',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      fullWidth: {
        control: { type: 'boolean' },
        description: 'Full width search bar',
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
            <SearchBar placeholder="Search products..." />
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">With Value</p>
            <SearchBar placeholder="Search products..." value="laptop" />
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">Disabled</p>
            <SearchBar placeholder="Search disabled..." disabled={true} />
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
              <SearchBar placeholder="Default width search" />
            </div>
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">Full Width (spans entire container)</p>
            <SearchBar placeholder="Full width search bar spans the entire available width" fullWidth={true} />
          </div>
        </div>
      </div>

      <!-- Different Use Cases -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Different Use Cases</h3>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SearchBar placeholder="Search files..." />
          <SearchBar placeholder="Find contacts..." />
          <SearchBar placeholder="Search documentation..." />
          <SearchBar placeholder="Filter results..." />
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story
  name="Default"
  args={{
    placeholder: 'Search',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <SearchBar {...args} />
  {/snippet}
</Story>

<Story
  name="With Value"
  args={{
    placeholder: 'Search',
    value: 'Text',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <SearchBar {...args} />
  {/snippet}
</Story>

<Story
  name="Disabled"
  args={{
    placeholder: 'Search',
    disabled: true,
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <SearchBar {...args} />
  {/snippet}
</Story>

<Story
  name="Full Width"
  args={{
    placeholder: 'Search',
    fullWidth: true,
  }}
  parameters={{ layout: 'wide' }}
>
  {#snippet template(args)}
    <SearchBar {...args} />
  {/snippet}
</Story>

<Story name="All States" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template()}
    <div class="space-y-4">
      <SearchBar placeholder="Search" />
      <SearchBar placeholder="Search" value="Text" />
      <SearchBar placeholder="Search" disabled />
      <div class="w-full">
        <SearchBar placeholder="Search" fullWidth />
      </div>
    </div>
  {/snippet}
</Story>
