<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import List from '../lib/components/layout/List.svelte'
  import ListItem from '../lib/components/layout/ListItem.svelte'
  import Avatar from '../lib/components/media/Avatar.svelte'
  import Toggle from '../lib/components/forms/Toggle.svelte'
  import Checkbox from '../lib/components/forms/Checkbox.svelte'
  import { HeartFilledIcon, StarFilledIcon, SearchIcon, FilterIcon } from '../lib/icons'

  const { Story } = defineMeta({
    title: 'Layout/List',
    component: List,
    args: {
      title: 'List Title',
      showDividers: true,
      dividerVariant: 'solid',
      compact: false,
    },
    argTypes: {
      title: {
        control: { type: 'text' },
        description: 'Optional list title',
      },
      rightText: {
        control: { type: 'text' },
        description: 'Optional right text for title',
      },
      showDividers: {
        control: { type: 'boolean' },
        description: 'Show dividers between items',
      },
      dividerVariant: {
        control: { type: 'select' },
        options: ['solid', 'dashed', 'dotted'],
        description: 'Divider style variant',
      },
      compact: {
        control: { type: 'boolean' },
        description: 'Compact spacing',
      },
    },
  })

  // Sample data for stories
  const basicItems = [
    {
      id: '1',
      title: 'First Item',
      description: 'Description for first item',
      onclick: () => alert('First item clicked!'),
    },
    {
      id: '2',
      title: 'Second Item',
      description: 'Description for second item',
      onclick: () => alert('Second item clicked!'),
    },
    {
      id: '3',
      title: 'Third Item',
      description: 'Description for third item',
      onclick: () => alert('Third item clicked!'),
    },
  ]

  const contactItems = [
    {
      id: '1',
      title: 'Sarah Johnson',
      description: 'sarah@example.com',
      clickable: true,
      showChevron: true,
      onclick: () => alert('Sarah clicked!'),
    },
    {
      id: '2',
      title: 'Mike Chen',
      description: 'mike@example.com',
      clickable: true,
      showChevron: true,
      onclick: () => alert('Mike clicked!'),
    },
    {
      id: '3',
      title: 'Alex Thompson',
      description: 'alex@example.com',
      clickable: true,
      showChevron: true,
      onclick: () => alert('Alex clicked!'),
    },
  ]

  const settingsItems = [
    {
      id: '1',
      title: 'Push Notifications',
      description: 'Receive alerts and updates',
      clickable: false,
      showChevron: false,
    },
    {
      id: '2',
      title: 'Dark Mode',
      description: 'Use dark theme',
      clickable: false,
      showChevron: false,
    },
    {
      id: '3',
      title: 'Privacy Settings',
      description: 'Manage your privacy preferences',
      onclick: () => alert('Privacy settings clicked!'),
    },
  ]

  const taskItems = [
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Due today at 5 PM',
      clickable: false,
      showChevron: false,
    },
    {
      id: '2',
      title: 'Review code changes',
      description: 'Check pull request #123',
      clickable: false,
      showChevron: false,
    },
    {
      id: '3',
      title: 'Update documentation',
      description: 'Add new API endpoints',
      clickable: false,
      showChevron: false,
    },
  ]

  const nonClickableItems = [
    {
      id: '1',
      title: 'Static Item 1',
      description: 'This item is not clickable',
      clickable: false,
      showChevron: false,
    },
    {
      id: '2',
      title: 'Static Item 2',
      description: 'This item is also not clickable',
      clickable: false,
      showChevron: false,
    },
    { id: '3', title: 'Static Item 3', description: 'Neither is this one', clickable: false, showChevron: false },
  ]

  const simpleItems = [
    { id: '1', title: 'Home', onclick: () => alert('Home clicked!') },
    { id: '2', title: 'Profile', onclick: () => alert('Profile clicked!') },
    { id: '3', title: 'Settings', onclick: () => alert('Settings clicked!') },
    { id: '4', title: 'Help & Support', onclick: () => alert('Help clicked!') },
    { id: '5', title: 'Sign Out', onclick: () => alert('Sign out clicked!') },
  ]
</script>

<Story name="Overview" args={{}} parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <List title="Basic List (Clickable by Default)" items={basicItems} />

      <List title="Simple Items (No Description)" items={simpleItems} />

      <List title="Non-Clickable Items" items={nonClickableItems} />

      <List title="Without Dividers" items={basicItems} showDividers={false} />

      <List title="Dashed Dividers" items={basicItems} dividerVariant="dashed" />

      <List title="Dotted Dividers" items={basicItems} dividerVariant="dotted" />

      <List title="Compact Mode" items={basicItems} compact={true} />

      <List title="With Right Action" rightText="See All" items={basicItems} />
    </div>
  {/snippet}
</Story>

<Story name="Basic List" args={{ title: 'Basic List', items: basicItems }} parameters={{ layout: 'default' }}>
  {#snippet template(args)}
    <List {...args} />
  {/snippet}
</Story>

<Story name="Without Title" args={{ items: basicItems }} parameters={{ layout: 'default' }}>
  {#snippet template(args)}
    <List {...args} />
  {/snippet}
</Story>

<Story
  name="With Right Text"
  args={{ title: 'My Tasks', rightText: 'Edit', items: basicItems }}
  parameters={{ layout: 'default' }}
>
  {#snippet template(args)}
    <List {...args} onRightClick={() => alert('Edit clicked!')} />
  {/snippet}
</Story>

<Story name="With Right Icon" args={{ title: 'Search Results', items: basicItems }} parameters={{ layout: 'default' }}>
  {#snippet template(args)}
    <List {...args}>
      {#snippet rightIcon()}
        <SearchIcon size={20} />
      {/snippet}
    </List>
  {/snippet}
</Story>

<Story
  name="No Dividers"
  args={{ title: 'Clean List', items: basicItems, showDividers: false }}
  parameters={{ layout: 'default' }}
>
  {#snippet template(args)}
    <List {...args} />
  {/snippet}
</Story>

<Story
  name="Dashed Dividers"
  args={{ title: 'Dashed List', items: basicItems, dividerVariant: 'dashed' }}
  parameters={{ layout: 'default' }}
>
  {#snippet template(args)}
    <List {...args} />
  {/snippet}
</Story>

<Story
  name="Compact Mode"
  args={{ title: 'Compact List', items: basicItems, compact: true }}
  parameters={{ layout: 'default' }}
>
  {#snippet template(args)}
    <List {...args} />
  {/snippet}
</Story>

<Story
  name="Non-Clickable Items"
  args={{ title: 'Static List', items: nonClickableItems }}
  parameters={{ layout: 'default' }}
>
  {#snippet template(args)}
    <List {...args} />
  {/snippet}
</Story>

<Story
  name="Simple Items (No Description)"
  args={{ title: 'Navigation Menu', items: simpleItems }}
  parameters={{ layout: 'default' }}
>
  {#snippet template(args)}
    <List {...args} />
  {/snippet}
</Story>

<Story name="Using Children" args={{}} parameters={{ layout: 'default' }}>
  {#snippet template()}
    <List title="Custom Content" rightText="Edit">
      {#snippet children()}
        <ListItem title="Custom Item 1" description="Custom description">
          {#snippet leftIcon()}
            <HeartFilledIcon size={24} class="text-highlight" />
          {/snippet}
        </ListItem>

        <ListItem title="Custom Item 2" description="Another custom description">
          {#snippet leftIcon()}
            <StarFilledIcon size={24} class="text-highlight" />
          {/snippet}
          {#snippet rightControl()}
            <Toggle />
          {/snippet}
        </ListItem>

        <ListItem title="Custom Item 3" description="Third custom item">
          {#snippet leftIcon()}
            <Avatar size="small" alt="User" initials="U" />
          {/snippet}
          {#snippet rightIcon()}
            <div class="bg-success h-3 w-3 rounded-full"></div>
          {/snippet}
        </ListItem>
      {/snippet}
    </List>
  {/snippet}
</Story>

<Story name="Real World Examples" args={{}} parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Contacts List -->
      <List title="Contacts" rightText="Add" onRightClick={() => alert('Add contact clicked!')}>
        {#snippet children()}
          {#each contactItems as contact}
            <ListItem
              title={contact.title}
              description={contact.description}
              clickable={contact.clickable}
              showChevron={contact.showChevron}
              onclick={contact.onclick}
            >
              {#snippet leftIcon()}
                <Avatar
                  size="small"
                  alt={contact.title}
                  initials={contact.title
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                />
              {/snippet}
            </ListItem>
          {/each}
        {/snippet}
      </List>

      <!-- Settings List -->
      <List title="Settings">
        {#snippet rightIcon()}
          <FilterIcon size={20} />
        {/snippet}
        {#snippet children()}
          {#each settingsItems as setting, index}
            <ListItem
              title={setting.title}
              description={setting.description}
              clickable={setting.clickable ?? true}
              showChevron={setting.showChevron ?? true}
              onclick={setting.onclick}
            >
              {#if index < 2}
                {#snippet rightControl()}
                  <Toggle />
                {/snippet}
              {/if}
            </ListItem>
          {/each}
        {/snippet}
      </List>

      <!-- Tasks List -->
      <List title="Tasks" rightText="Edit" compact={true}>
        {#snippet children()}
          {#each taskItems as task}
            <ListItem title={task.title} description={task.description}>
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
          {/each}
        {/snippet}
      </List>

      <!-- Mixed Content List -->
      <List title="Dashboard" showDividers={false}>
        {#snippet children()}
          <ListItem title="Recent Activity" description="5 new notifications" clickable={true} showChevron={true}>
            {#snippet leftIcon()}
              <div class="bg-highlight-50 flex h-10 w-10 items-center justify-center rounded-xl">
                <svg class="text-highlight h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L13 8l6 1-4.5 4.5L16 20l-6-3-6 3 1.5-6.5L1 9l6-1 3-6z" />
                </svg>
              </div>
            {/snippet}
          </ListItem>

          <ListItem title="Storage" description="2.5 GB of 15 GB used">
            {#snippet leftIcon()}
              <div class="bg-success-50 flex h-10 w-10 items-center justify-center rounded-xl">
                <svg class="text-success h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                  />
                </svg>
              </div>
            {/snippet}
            {#snippet rightIcon()}
              <span class="text-body-s text-success font-medium">17%</span>
            {/snippet}
          </ListItem>

          <ListItem
            title="Account Settings"
            description="Update your profile and preferences"
            clickable={true}
            showChevron={true}
          >
            {#snippet leftIcon()}
              <Avatar size="small" alt="Profile" initials="P" />
            {/snippet}
          </ListItem>
        {/snippet}
      </List>
    </div>
  {/snippet}
</Story>
