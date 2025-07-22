<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import ListTitle from '../lib/components/layout/ListTitle.svelte'
  import { SearchIcon, EditIcon, FilterIcon } from '../lib/icons'

  const { Story } = defineMeta({
    title: 'Components/ListTitle',
    component: ListTitle,
    args: {
      title: 'List Title',
    },
    argTypes: {
      title: {
        control: { type: 'text' },
        description: 'The title text to display',
      },
      rightText: {
        control: { type: 'text' },
        description: 'Optional text to display on the right',
      },
    },
  })
</script>

<Story name="Basic" args={{ title: 'My List' }}>
  {#snippet template(args)}
    <ListTitle {...args} />
  {/snippet}
</Story>

<Story name="With Right Text" args={{ title: 'Tasks', rightText: 'Edit' }}>
  {#snippet template(args)}
    <ListTitle {...args} />
  {/snippet}
</Story>

<Story name="With Right Icon" args={{ title: 'Search Results' }}>
  {#snippet template(args)}
    <ListTitle {...args}>
      {#snippet rightIcon()}
        <SearchIcon size={20} />
      {/snippet}
    </ListTitle>
  {/snippet}
</Story>

<Story name="Clickable Right Text" args={{ title: 'Photos', rightText: 'Edit' }}>
  {#snippet template(args)}
    <ListTitle {...args} onRightClick={() => alert('Edit clicked!')} />
  {/snippet}
</Story>

<Story name="Clickable Right Icon" args={{ title: 'Items' }}>
  {#snippet template(args)}
    <ListTitle {...args} onRightClick={() => alert('Filter clicked!')}>
      {#snippet rightIcon()}
        <FilterIcon size={20} />
      {/snippet}
    </ListTitle>
  {/snippet}
</Story>

<Story name="All Variants">
  {#snippet template()}
    <div class="space-y-6 p-4">
      <ListTitle title="Basic List Title" />

      <ListTitle title="With Edit Text" rightText="Edit" />

      <ListTitle title="With Search Icon">
        {#snippet rightIcon()}
          <SearchIcon size={20} />
        {/snippet}
      </ListTitle>

      <ListTitle title="Clickable Edit" rightText="Edit" onRightClick={() => alert('Edit clicked!')} />

      <ListTitle title="Clickable Filter" onRightClick={() => alert('Filter clicked!')}>
        {#snippet rightIcon()}
          <FilterIcon size={20} />
        {/snippet}
      </ListTitle>
    </div>
  {/snippet}
</Story>

<Story name="Real World Examples">
  {#snippet template()}
    <div class="space-y-8 p-4">
      <div>
        <ListTitle title="Recent Photos" rightText="See All" />
        <div class="text-body-s text-secondary mt-2">Photos from this week</div>
      </div>

      <div>
        <ListTitle title="Shopping List" rightText="Edit" />
        <div class="text-body-s text-secondary mt-2">5 items remaining</div>
      </div>

      <div>
        <ListTitle title="Search Results">
          {#snippet rightIcon()}
            <SearchIcon size={20} />
          {/snippet}
        </ListTitle>
        <div class="text-body-s text-secondary mt-2">Found 24 matches</div>
      </div>
    </div>
  {/snippet}
</Story>
