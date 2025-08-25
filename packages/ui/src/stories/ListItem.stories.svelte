<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import ListItem from '@ui/components/layout/ListItem.svelte'
  import Avatar from '@ui/components/media/Avatar.svelte'
  import Toggle from '@ui/components/forms/Toggle.svelte'
  import Checkbox from '@ui/components/forms/Checkbox.svelte'
  import { HeartFilledIcon, ProfileIcon, StarFilledIcon } from '@ui/icons'

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

<Story name="Overview" args={{}} parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Basic States -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Basic States</h3>
        <div class="space-y-3">
          <div>
            <p class="text-body-s text-secondary mb-2">Basic Item</p>
            <ListItem title="Simple List Item" />
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">With Description</p>
            <ListItem title="Item with Description" description="Additional information about this item" />
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">Clickable with Chevron</p>
            <ListItem title="Navigate to Details" description="Click to view more" showChevron={true} />
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">Disabled</p>
            <ListItem title="Disabled Item" description="This item is not available" disabled={true} />
          </div>
        </div>
      </div>

      <!-- With Icons -->
      <div>
        <h3 class="text-h4 text-primary mb-4">With Icons</h3>
        <div class="space-y-3">
          <ListItem title="Favorite Item" description="Marked as favorite">
            {#snippet leftIcon()}
              <HeartFilledIcon size={24} class="text-red-500" />
            {/snippet}
          </ListItem>
          <ListItem title="Star Rating" description="5-star reviewed">
            {#snippet leftIcon()}
              <StarFilledIcon size={24} class="text-yellow-500" />
            {/snippet}
          </ListItem>
          <ListItem title="User Profile" description="Account settings">
            {#snippet leftIcon()}
              <ProfileIcon size={24} class="text-blue-500" />
            {/snippet}
          </ListItem>
        </div>
      </div>

      <!-- With Avatars -->
      <div>
        <h3 class="text-h4 text-primary mb-4">With Avatars</h3>
        <div class="space-y-3">
          <ListItem title="John Doe" description="Software Developer">
            {#snippet leftIcon()}
              <Avatar size="small" alt="John Doe" initials="JD" />
            {/snippet}
          </ListItem>
          <ListItem title="Sarah Wilson" description="Product Manager">
            {#snippet leftIcon()}
              <Avatar size="small" alt="Sarah Wilson" initials="SW" />
            {/snippet}
          </ListItem>
        </div>
      </div>

      <!-- With Controls -->
      <div>
        <h3 class="text-h4 text-primary mb-4">With Controls</h3>
        <div class="space-y-3">
          <ListItem title="Enable Notifications" description="Receive push notifications">
            {#snippet leftIcon()}
              <div class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                  />
                </svg>
              </div>
            {/snippet}
            {#snippet rightControl()}
              <Toggle />
            {/snippet}
          </ListItem>
          <ListItem title="Dark Mode" description="Switch to dark theme">
            {#snippet leftIcon()}
              <div class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </div>
            {/snippet}
            {#snippet rightControl()}
              <Toggle checked={true} />
            {/snippet}
          </ListItem>
          <ListItem title="Complete Task" description="Mark as finished">
            {#snippet leftIcon()}
              <div class="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
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
        </div>
      </div>

      <!-- With Status Indicators -->
      <div>
        <h3 class="text-h4 text-primary mb-4">With Status Indicators</h3>
        <div class="space-y-3">
          <ListItem title="Alex Johnson" description="Online now">
            {#snippet leftIcon()}
              <Avatar size="small" alt="Alex Johnson" initials="AJ" />
            {/snippet}
            {#snippet rightIcon()}
              <div class="h-3 w-3 rounded-full bg-green-500"></div>
            {/snippet}
          </ListItem>
          <ListItem title="Maria Garcia" description="Away">
            {#snippet leftIcon()}
              <Avatar size="small" alt="Maria Garcia" initials="MG" />
            {/snippet}
            {#snippet rightIcon()}
              <div class="h-3 w-3 rounded-full bg-yellow-500"></div>
            {/snippet}
          </ListItem>
          <ListItem title="David Kim" description="Offline">
            {#snippet leftIcon()}
              <Avatar size="small" alt="David Kim" initials="DK" />
            {/snippet}
            {#snippet rightIcon()}
              <div class="h-3 w-3 rounded-full bg-gray-400"></div>
            {/snippet}
          </ListItem>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Basic" args={{ title: 'Basic List Item' }} parameters={{ layout: 'compact' }}>
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
  parameters={{ layout: 'compact' }}
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

<Story
  name="With Left Icon"
  args={{ title: 'Favorite Item', description: 'This item has a heart icon' }}
  parameters={{ layout: 'compact' }}
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
    >
      {#snippet leftIcon()}
        <HeartFilledIcon size={24} class="text-highlight" />
      {/snippet}
    </ListItem>
  {/snippet}
</Story>

<Story
  name="With Avatar"
  args={{ title: 'John Doe', description: 'Software Developer' }}
  parameters={{ layout: 'compact' }}
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
  parameters={{ layout: 'compact' }}
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

<Story
  name="With Toggle"
  args={{ title: 'Settings Option', description: 'Enable or disable this feature' }}
  parameters={{ layout: 'compact' }}
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

<Story
  name="With Checkbox"
  args={{ title: 'Task Item', description: 'Complete this task' }}
  parameters={{ layout: 'compact' }}
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

<Story
  name="With Status Indicator"
  args={{ title: 'Online User', description: 'Currently active' }}
  parameters={{ layout: 'compact' }}
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

<Story
  name="Disabled"
  args={{ title: 'Disabled Item', description: 'This item is not available', disabled: true }}
  parameters={{ layout: 'compact' }}
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
    >
      {#snippet leftIcon()}
        <ProfileIcon size={24} class="text-neutral-400" />
      {/snippet}
    </ListItem>
  {/snippet}
</Story>

<Story name="All Examples" args={{}} parameters={{ layout: 'compact' }}>
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

<Story name="Real World Examples" args={{}} parameters={{ layout: 'default' }}>
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
