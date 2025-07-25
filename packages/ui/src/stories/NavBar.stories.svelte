<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import NavBar from '../lib/components/navigation/NavBar.svelte'
  import Button from '../lib/components/Button.svelte'
  import Avatar from '../lib/components/media/Avatar.svelte'
  import EditIcon from '../lib/icons/EditIcon.svelte'
  import HeartOutlinedIcon from '../lib/icons/HeartOutlinedIcon.svelte'

  const { Story } = defineMeta({
    title: 'Navigation/NavBar',
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

<Story name="Overview" args={{}} parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-6">
      <!-- Basic Variants -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Basic Variants</h3>
        <div class="space-y-4">
          <div>
            <NavBar title="Page Title" />
          </div>
          <div>
            <NavBar title="Page Title" showBackButton />
          </div>
        </div>
      </div>

      <!-- With Right Actions -->
      <div>
        <h3 class="text-h4 text-primary mb-4">With Right Actions</h3>
        <div class="space-y-4">
          <div>
            {#snippet editAction()}
              <Button variant="tertiary" size="small">
                <EditIcon size={16} />
                Edit
              </Button>
            {/snippet}
            <NavBar title="Edit Mode" showBackButton rightAction={editAction} />
          </div>
          <div>
            {#snippet heartAction()}
              <button
                type="button"
                class="text-highlight hover:bg-highlight-50 flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200"
                aria-label="Add to favorites"
              >
                <HeartOutlinedIcon size={20} />
              </button>
            {/snippet}
            <NavBar title="Favorite Item" showBackButton rightAction={heartAction} />
          </div>
          <div>
            {#snippet avatarAction()}
              <Avatar size="small" alt="John Doe" initials="JD" />
            {/snippet}
            <NavBar title="Profile" showBackButton rightAction={avatarAction} />
          </div>
        </div>
      </div>

      <!-- With Left and Right Actions -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Dual Actions</h3>
        <div>
          {#snippet cancelAction()}
            <Button variant="tertiary" size="small">Cancel</Button>
          {/snippet}
          {#snippet saveAction()}
            <Button variant="primary" size="small">Save</Button>
          {/snippet}
          <NavBar title="Edit Profile" leftAction={cancelAction} rightAction={saveAction} />
        </div>
      </div>

      <!-- Real World Examples -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Real World Examples</h3>
        <div class="space-y-4">
          <div>
            <NavBar title="Settings" showBackButton />
          </div>
          <div>
            {#snippet profileEditAction()}
              <Button variant="tertiary" size="small">
                <EditIcon size={16} />
                Edit
              </Button>
            {/snippet}
            <NavBar title="John Doe" showBackButton rightAction={profileEditAction} />
          </div>
          <div>
            {#snippet shareAction()}
              <button
                type="button"
                class="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 transition-colors duration-200 hover:bg-neutral-100"
                aria-label="Share article"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </button>
            {/snippet}
            <NavBar title="How to Build Components" showBackButton rightAction={shareAction} />
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story
  name="Default"
  args={{
    title: 'Page Title',
  }}
  parameters={{ layout: 'default' }}
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
  parameters={{ layout: 'default' }}
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
  parameters={{ layout: 'default' }}
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
  parameters={{ layout: 'default' }}
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
  parameters={{ layout: 'default' }}
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
  parameters={{ layout: 'default' }}
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
  parameters={{ layout: 'default' }}
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

<Story name="All Examples" args={{}} parameters={{ layout: 'default' }}>
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
