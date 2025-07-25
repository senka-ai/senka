<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import ListItem from '../lib/components/layout/ListItem.svelte'
  import Avatar from '../lib/components/media/Avatar.svelte'
  import Toggle from '../lib/components/forms/Toggle.svelte'
  import Checkbox from '../lib/components/forms/Checkbox.svelte'
  import { HeartFilledIcon, ProfileIcon, StarFilledIcon } from '../lib/icons'

  const { Story } = defineMeta({
    title: 'Layout/ListItem',
    component: ListItem,
    args: {
      title: 'List Item Title',
      description: 'This is a description for the list item',
    },
    argTypes: {
      title: {
        control: { type: 'text' },
        description: 'The main title text',
      },
      description: {
        control: { type: 'text' },
        description: 'Optional description text',
      },
      showChevron: {
        control: { type: 'boolean' },
        description: 'Show chevron arrow on the right',
      },
      clickable: {
        control: { type: 'boolean' },
        description: 'Make the item clickable',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
    },
  })
</script>

<Story name="Basic" args={{ title: 'Basic List Item' }}>
  {#snippet template(args)}
    <ListItem
      title={args.title || 'List Item'}
      description={args.description}
      showChevron={args.showChevron ?? false}
      compact={args.compact ?? false}
      iconSize={args.iconSize}
      class={args.class}
      id={args.id}
      disabled={args.disabled ?? false}
      onclick={args.onclick}
      onkeydown={args.onkeydown}
      onfocus={args.onfocus}
      onblur={args.onblur}
    />
  {/snippet}
</Story>

<Story
  name="With Description"
  args={{ title: 'Item with Description', description: 'This item has additional descriptive text below the title' }}
>
  {#snippet template(args)}
    <ListItem
      title={args.title || 'List Item'}
      description={args.description}
      showChevron={args.showChevron ?? false}
      compact={args.compact ?? false}
      iconSize={args.iconSize}
      class={args.class}
      id={args.id}
      disabled={args.disabled ?? false}
      onclick={args.onclick}
      onkeydown={args.onkeydown}
      onfocus={args.onfocus}
      onblur={args.onblur}
    />
  {/snippet}
</Story>

<Story name="With Left Icon" args={{ title: 'Favorite Item', description: 'This item has a heart icon' }}>
  {#snippet template(args)}
    <ListItem
      title={args.title || 'List Item'}
      description={args.description}
      showChevron={args.showChevron ?? false}
      compact={args.compact ?? false}
      iconSize={args.iconSize}
      class={args.class}
      id={args.id}
      disabled={args.disabled ?? false}
      onclick={args.onclick}
      onkeydown={args.onkeydown}
      onfocus={args.onfocus}
      onblur={args.onblur}
    >
      {#snippet leftIcon()}
        <HeartFilledIcon size={24} class="text-highlight" />
      {/snippet}
    </ListItem>
  {/snippet}
</Story>

<Story name="With Avatar" args={{ title: 'John Doe', description: 'Software Developer' }}>
  {#snippet template(args)}
    <ListItem
      title={args.title || 'List Item'}
      description={args.description}
      showChevron={args.showChevron ?? false}
      compact={args.compact ?? false}
      iconSize={args.iconSize}
      class={args.class}
      id={args.id}
      disabled={args.disabled ?? false}
      onclick={args.onclick}
      onkeydown={args.onkeydown}
      onfocus={args.onfocus}
      onblur={args.onblur}
    >
      {#snippet leftIcon()}
        <Avatar size="small" alt="John Doe" initials="JD" />
      {/snippet}
    </ListItem>
  {/snippet}
</Story>

<Story
  name="With Chevron"
  args={{ title: 'Clickable Item', description: 'Click to navigate', showChevron: true, clickable: true }}
>
  {#snippet template(args)}
    <ListItem
      title={args.title || 'List Item'}
      description={args.description}
      showChevron={args.showChevron ?? false}
      compact={args.compact ?? false}
      iconSize={args.iconSize}
      class={args.class}
      id={args.id}
      disabled={args.disabled ?? false}
      onkeydown={args.onkeydown}
      onfocus={args.onfocus}
      onblur={args.onblur}
      onclick={() => alert('Item clicked!')}
    />
  {/snippet}
</Story>

<Story name="With Toggle" args={{ title: 'Settings Option', description: 'Enable or disable this feature' }}>
  {#snippet template(args)}
    <ListItem
      title={args.title || 'List Item'}
      description={args.description}
      showChevron={args.showChevron ?? false}
      compact={args.compact ?? false}
      iconSize={args.iconSize}
      class={args.class}
      id={args.id}
      disabled={args.disabled ?? false}
      onclick={args.onclick}
      onkeydown={args.onkeydown}
      onfocus={args.onfocus}
      onblur={args.onblur}
    >
      {#snippet leftIcon()}
        <StarFilledIcon size={24} class="text-highlight" />
      {/snippet}
      {#snippet rightControl()}
        <Toggle />
      {/snippet}
    </ListItem>
  {/snippet}
</Story>

<Story name="With Checkbox" args={{ title: 'Task Item', description: 'Complete this task' }}>
  {#snippet template(args)}
    <ListItem
      title={args.title || 'List Item'}
      description={args.description}
      showChevron={args.showChevron ?? false}
      compact={args.compact ?? false}
      iconSize={args.iconSize}
      class={args.class}
      id={args.id}
      disabled={args.disabled ?? false}
      onclick={args.onclick}
      onkeydown={args.onkeydown}
      onfocus={args.onfocus}
      onblur={args.onblur}
    >
      {#snippet leftIcon()}
        <div class="bg-highlight flex h-6 w-6 items-center justify-center rounded-full">
          <svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      {/snippet}
      {#snippet rightControl()}
        <Checkbox />
      {/snippet}
    </ListItem>
  {/snippet}
</Story>

<Story name="With Status Indicator" args={{ title: 'Online User', description: 'Currently active' }}>
  {#snippet template(args)}
    <ListItem
      title={args.title || 'List Item'}
      description={args.description}
      showChevron={args.showChevron ?? false}
      compact={args.compact ?? false}
      iconSize={args.iconSize}
      class={args.class}
      id={args.id}
      disabled={args.disabled ?? false}
      onclick={args.onclick}
      onkeydown={args.onkeydown}
      onfocus={args.onfocus}
      onblur={args.onblur}
    >
      {#snippet leftIcon()}
        <Avatar size="small" alt="User" initials="U" />
      {/snippet}
      {#snippet rightIcon()}
        <div class="bg-success h-3 w-3 rounded-full"></div>
      {/snippet}
    </ListItem>
  {/snippet}
</Story>

<Story name="Disabled" args={{ title: 'Disabled Item', description: 'This item is not available', disabled: true }}>
  {#snippet template(args)}
    <ListItem
      title={args.title || 'List Item'}
      description={args.description}
      showChevron={args.showChevron ?? false}
      compact={args.compact ?? false}
      iconSize={args.iconSize}
      class={args.class}
      id={args.id}
      disabled={args.disabled ?? false}
      onclick={args.onclick}
      onkeydown={args.onkeydown}
      onfocus={args.onfocus}
      onblur={args.onblur}
    >
      {#snippet leftIcon()}
        <ProfileIcon size={24} class="text-neutral-400" />
      {/snippet}
    </ListItem>
  {/snippet}
</Story>

<Story name="All Variants" args={{}}>
  {#snippet template()}
    <div class="space-y-2">
      <ListItem title="Basic Item" />

      <ListItem title="With Description" description="Additional information goes here" />

      <ListItem title="With Heart Icon" description="Shows favorite status">
        {#snippet leftIcon()}
          <HeartFilledIcon size={24} class="text-highlight" />
        {/snippet}
      </ListItem>

      <ListItem title="With Avatar" description="User profile item">
        {#snippet leftIcon()}
          <Avatar size="small" alt="Alex" initials="A" />
        {/snippet}
      </ListItem>

      <ListItem title="Clickable with Chevron" description="Navigate to details" showChevron={true} clickable={true} />

      <ListItem title="With Toggle Control" description="Enable/disable feature">
        {#snippet leftIcon()}
          <StarFilledIcon size={24} class="text-highlight" />
        {/snippet}
        {#snippet rightControl()}
          <Toggle />
        {/snippet}
      </ListItem>

      <ListItem title="With Status Indicator" description="Shows online status">
        {#snippet leftIcon()}
          <Avatar size="small" alt="John" initials="J" />
        {/snippet}
        {#snippet rightIcon()}
          <div class="bg-success h-3 w-3 rounded-full"></div>
        {/snippet}
      </ListItem>
    </div>
  {/snippet}
</Story>

<Story name="Real World Examples" args={{}}>
  {#snippet template()}
    <div class="space-y-6">
      <!-- Contact List -->
      <div>
        <h3 class="text-h4 text-primary mb-2">Contacts</h3>
        <div class="space-y-2">
          <ListItem title="Sarah Johnson" description="sarah@example.com" clickable={true} showChevron={true}>
            {#snippet leftIcon()}
              <Avatar size="small" alt="Sarah Johnson" initials="SJ" />
            {/snippet}
          </ListItem>

          <ListItem title="Mike Chen" description="mike@example.com" clickable={true} showChevron={true}>
            {#snippet leftIcon()}
              <Avatar size="small" alt="Mike Chen" initials="MC" />
            {/snippet}
          </ListItem>
        </div>
      </div>

      <!-- Settings List -->
      <div>
        <h3 class="text-h4 text-primary mb-2">Settings</h3>
        <div class="space-y-2">
          <ListItem title="Push Notifications" description="Receive alerts and updates">
            {#snippet rightControl()}
              <Toggle />
            {/snippet}
          </ListItem>

          <ListItem title="Dark Mode" description="Use dark theme">
            {#snippet rightControl()}
              <Toggle />
            {/snippet}
          </ListItem>

          <ListItem
            title="Privacy Settings"
            description="Manage your privacy preferences"
            clickable={true}
            showChevron={true}
          />
        </div>
      </div>

      <!-- Tasks List -->
      <div>
        <h3 class="text-h4 text-primary mb-2">Tasks</h3>
        <div class="space-y-2">
          <ListItem title="Complete project proposal" description="Due today at 5 PM">
            {#snippet rightControl()}
              <Checkbox />
            {/snippet}
          </ListItem>

          <ListItem title="Review code changes" description="Check pull request #123">
            {#snippet rightControl()}
              <Checkbox checked />
            {/snippet}
          </ListItem>
        </div>
      </div>
    </div>
  {/snippet}
</Story>
