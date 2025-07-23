<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import NavBar from '../lib/components/navigation/NavBar.svelte'
  import Button from '../lib/components/Button.svelte'
  import Avatar from '../lib/components/media/Avatar.svelte'
  import EditIcon from '../lib/icons/EditIcon.svelte'
  import HeartOutlinedIcon from '../lib/icons/HeartOutlinedIcon.svelte'

  const { Story } = defineMeta({
    title: 'Components/NavBar',
    component: NavBar,
    args: {
      title: 'Page Title',
      showBackButton: false,
    },
    argTypes: {
      title: {
        control: { type: 'text' },
        description: 'Navigation bar title',
      },
      showBackButton: {
        control: { type: 'boolean' },
        description: 'Show back button',
      },
    },
  })
</script>

<Story
  name="Default"
  args={{
    title: 'Page Title',
  }}
>
  {#snippet template(args)}
    <NavBar
      title={args.title || 'NavBar Title'}
      showBackButton={args.showBackButton ?? false}
      leftAction={args.leftAction}
      rightAction={args.rightAction}
      onBackClick={args.onBackClick}
      class={args.class}
      id={args.id}
    />
  {/snippet}
</Story>

<Story
  name="With Back Button"
  args={{
    title: 'Page Title',
    showBackButton: true,
  }}
>
  {#snippet template(args)}
    <NavBar
      title={args.title || 'NavBar Title'}
      showBackButton={args.showBackButton ?? false}
      leftAction={args.leftAction}
      rightAction={args.rightAction}
      onBackClick={args.onBackClick}
      class={args.class}
      id={args.id}
    />
  {/snippet}
</Story>

<Story
  name="With Edit Action"
  args={{
    title: 'Page Title',
    showBackButton: true,
  }}
>
  {#snippet template(args)}
    {#snippet editAction()}
      <Button variant="tertiary" size="small">
        <EditIcon size={16} />
        Edit
      </Button>
    {/snippet}
    <NavBar
      title={args.title || 'NavBar Title'}
      showBackButton={args.showBackButton ?? false}
      leftAction={args.leftAction}
      onBackClick={args.onBackClick}
      class={args.class}
      id={args.id}
      rightAction={editAction}
    />
  {/snippet}
</Story>

<Story
  name="With Heart Action"
  args={{
    title: 'Page Title',
    showBackButton: true,
  }}
>
  {#snippet template(args)}
    {#snippet heartAction()}
      <button
        type="button"
        class="text-highlight hover:bg-highlight-50 flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200"
        aria-label="Add to favorites"
      >
        <HeartOutlinedIcon size={20} />
      </button>
    {/snippet}
    <NavBar
      title={args.title || 'NavBar Title'}
      showBackButton={args.showBackButton ?? false}
      leftAction={args.leftAction}
      onBackClick={args.onBackClick}
      class={args.class}
      id={args.id}
      rightAction={heartAction}
    />
  {/snippet}
</Story>

<Story
  name="With Avatar Action"
  args={{
    title: 'Page Title',
    showBackButton: true,
  }}
>
  {#snippet template(args)}
    {#snippet avatarAction()}
      <Avatar size="small" alt="John Doe" />
    {/snippet}
    <NavBar
      title={args.title || 'NavBar Title'}
      showBackButton={args.showBackButton ?? false}
      onBackClick={args.onBackClick}
      class={args.class}
      id={args.id}
      rightAction={avatarAction}
    />
  {/snippet}
</Story>

<Story
  name="With Cancel Action"
  args={{
    title: 'Page Title',
  }}
>
  {#snippet template(args)}
    {#snippet cancelAction()}
      <Button variant="tertiary" size="small">Cancel</Button>
    {/snippet}
    {#snippet editAction()}
      <Button variant="tertiary" size="small">Edit</Button>
    {/snippet}
    <NavBar
      title={args.title || 'NavBar Title'}
      showBackButton={args.showBackButton ?? false}
      onBackClick={args.onBackClick}
      class={args.class}
      id={args.id}
      leftAction={cancelAction}
      rightAction={editAction}
    />
  {/snippet}
</Story>

<Story
  name="Simple Title Only"
  args={{
    title: 'Page Title',
  }}
>
  {#snippet template(args)}
    <NavBar
      title={args.title || 'NavBar Title'}
      showBackButton={args.showBackButton ?? false}
      leftAction={args.leftAction}
      rightAction={args.rightAction}
      onBackClick={args.onBackClick}
      class={args.class}
      id={args.id}
    />
  {/snippet}
</Story>

<Story name="All Variants" args={{}}>
  {#snippet template()}
    <div class="space-y-4">
      <NavBar title="Simple Title" />

      <NavBar title="With Back Button" showBackButton />

      {#snippet editAction()}
        <Button variant="tertiary" size="small">
          <EditIcon size={16} />
          Edit
        </Button>
      {/snippet}
      <NavBar title="With Edit Action" showBackButton rightAction={editAction} />

      {#snippet heartAction()}
        <button
          type="button"
          class="text-highlight hover:bg-highlight-50 flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200"
          aria-label="Add to favorites"
        >
          <HeartOutlinedIcon size={20} />
        </button>
      {/snippet}
      <NavBar title="With Heart Action" showBackButton rightAction={heartAction} />

      {#snippet avatarAction()}
        <Avatar size="small" alt="John Doe" />
      {/snippet}
      <NavBar title="With Avatar Action" showBackButton rightAction={avatarAction} />

      {#snippet cancelAction()}
        <Button variant="tertiary" size="small">Cancel</Button>
      {/snippet}
      {#snippet editAction2()}
        <Button variant="tertiary" size="small">Edit</Button>
      {/snippet}
      <NavBar title="With Cancel & Edit" leftAction={cancelAction} rightAction={editAction2} />
    </div>
  {/snippet}
</Story>
