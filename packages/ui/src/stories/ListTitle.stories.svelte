<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import ListTitle from '../lib/components/layout/ListTitle.svelte'
  import { SearchIcon, EditIcon, FilterIcon } from '../lib/icons'

  const { Story } = defineMeta({
    title: 'Layout/ListTitle',
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

<Story name="Overview" args={{}}>
  {#snippet template()}
    <div class="space-y-12">
      <!-- Basic Variants -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Basic Variants</h3>
        <div class="space-y-8">
          <div>
            <p class="text-body-s text-secondary mb-2">Basic Title</p>
            <ListTitle title="My List" />
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">With Right Text</p>
            <ListTitle title="Photos" rightText="See All" />
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">Clickable Right Text</p>
            <ListTitle title="Tasks" rightText="Edit" onRightClick={() => console.log('Edit clicked')} />
          </div>
        </div>
      </div>

      <!-- With Icons -->
      <div>
        <h3 class="text-h4 text-primary mb-4">With Icons</h3>
        <div class="space-y-8">
          <div>
            <p class="text-body-s text-secondary mb-2">Search Icon</p>
            <ListTitle title="Search Results">
              {#snippet rightIcon()}
                <SearchIcon size={20} />
              {/snippet}
            </ListTitle>
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">Filter Icon (Clickable)</p>
            <ListTitle title="Items" onRightClick={() => console.log('Filter clicked')}>
              {#snippet rightIcon()}
                <FilterIcon size={20} />
              {/snippet}
            </ListTitle>
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">Edit Icon</p>
            <ListTitle title="Documents">
              {#snippet rightIcon()}
                <EditIcon size={20} />
              {/snippet}
            </ListTitle>
          </div>
        </div>
      </div>

      <!-- Real World Examples -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Real World Examples</h3>
        <div class="space-y-8">
          <div>
            <ListTitle title="Recent Photos" rightText="See All" />
            <p class="text-body-s text-secondary mt-2">Photos from this week</p>
          </div>
          <div>
            <ListTitle title="Shopping List" rightText="Edit" />
            <p class="text-body-s text-secondary mt-2">5 items remaining</p>
          </div>
          <div>
            <ListTitle title="Contacts">
              {#snippet rightIcon()}
                <SearchIcon size={20} />
              {/snippet}
            </ListTitle>
            <p class="text-body-s text-secondary mt-2">24 contacts</p>
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Basic" args={{ title: 'My List' }}>
  {#snippet template(args)}
    <ListTitle title={args.title} class={args.class} id={args.id} />
  {/snippet}
</Story>

<Story name="With Right Icon" args={{ title: 'Search Results' }}>
  {#snippet template(args)}
    <ListTitle
      title={args.title || 'List Title'}
      rightText={args.rightText}
      onRightClick={args.onRightClick}
      iconSize={args.iconSize}
      class={args.class}
      id={args.id}
      disabled={args.disabled ?? false}
    >
      {#snippet rightIcon()}
        <SearchIcon size={20} />
      {/snippet}
    </ListTitle>
  {/snippet}
</Story>

<Story name="Clickable Right Text" args={{ title: 'Photos', rightText: 'Edit' }}>
  {#snippet template(args)}
    <ListTitle
      title={args.title || 'List Title'}
      rightText={args.rightText}
      rightIcon={args.rightIcon}
      iconSize={args.iconSize}
      class={args.class}
      id={args.id}
      disabled={args.disabled ?? false}
      onRightClick={() => alert('Edit clicked!')}
    />
  {/snippet}
</Story>

<Story name="Clickable Right Icon" args={{ title: 'Items' }}>
  {#snippet template(args)}
    <ListTitle
      title={args.title || 'List Title'}
      rightText={args.rightText}
      iconSize={args.iconSize}
      class={args.class}
      id={args.id}
      disabled={args.disabled ?? false}
      onRightClick={() => alert('Filter clicked!')}
    >
      {#snippet rightIcon()}
        <FilterIcon size={20} />
      {/snippet}
    </ListTitle>
  {/snippet}
</Story>

<Story name="Real World Examples" args={{}}>
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
