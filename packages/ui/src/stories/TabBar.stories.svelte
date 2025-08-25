<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import TabBar from '@ui/components/navigation/TabBar.svelte'
  import {
    ExploreIcon,
    CreateIcon,
    ProfileIcon,
    SettingsIcon,
    InboxIcon,
    StarFilledIcon,
    CategoriesIcon,
    SearchIcon,
  } from '@ui/icons'

  const basicTabs = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' },
  ]

  const iconTabs = [
    { id: 'home', label: 'Home', icon: InboxIcon },
    { id: 'explore', label: 'Explore', icon: ExploreIcon },
    { id: 'create', label: 'Create', icon: CreateIcon },
    { id: 'profile', label: 'Profile', icon: ProfileIcon },
  ]

  const manyTabs = [
    { id: 'tab1', label: 'Tab 1', icon: InboxIcon },
    { id: 'tab2', label: 'Tab 2', icon: ExploreIcon },
    { id: 'tab3', label: 'Tab 3', icon: CreateIcon },
    { id: 'tab4', label: 'Tab 4', icon: ProfileIcon },
    { id: 'tab5', label: 'Tab 5', icon: SettingsIcon },
  ]

  const tabsWithDisabled = [
    { id: 'tab1', label: 'Tab 1', icon: InboxIcon },
    { id: 'tab2', label: 'Tab 2', icon: ExploreIcon, disabled: true },
    { id: 'tab3', label: 'Tab 3', icon: CreateIcon },
    { id: 'tab4', label: 'Tab 4', icon: ProfileIcon, disabled: true },
    { id: 'tab5', label: 'Tab 5', icon: SettingsIcon },
  ]

  const { Story } = defineMeta({
    title: 'Navigation/TabBar',
    component: TabBar,
    args: {
      tabs: iconTabs,
      activeTab: 'home',
    },
    argTypes: {
      tabs: {
        control: { type: 'object' },
        description: 'Array of tab objects with id, label, and optional disabled',
      },
      activeTab: {
        control: { type: 'text' },
        description: 'ID of the currently active tab',
      },
      onTabChange: {
        action: 'tabChanged',
        description: 'Callback when tab is changed',
      },
    },
  })
</script>

<Story name="Overview" parameters={{ layout: 'full' }}>
  {#snippet template()}
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-neutral-800">Basic Navigation</h3>
        <TabBar tabs={basicTabs} activeTab="tab1" />
      </div>

      <div>
        <h3 class="mb-4 text-neutral-800">With Many Tabs</h3>
        <TabBar tabs={manyTabs} activeTab="tab3" />
      </div>

      <div>
        <h3 class="mb-4 text-neutral-800">With Disabled Tabs</h3>
        <TabBar tabs={tabsWithDisabled} activeTab="tab1" />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'full' }}>
  {#snippet template(args)}
    <TabBar
      tabs={args.tabs || []}
      activeTab={args.activeTab}
      onTabChange={args.onTabChange}
      class={args.class}
      id={args.id}
    />
  {/snippet}
</Story>

<Story name="Second Tab Active" args={{ activeTab: 'explore' }} parameters={{ layout: 'full' }}>
  {#snippet template(args)}
    <TabBar
      tabs={args.tabs || []}
      activeTab={args.activeTab}
      onTabChange={args.onTabChange}
      class={args.class}
      id={args.id}
    />
  {/snippet}
</Story>

<Story name="Many Tabs" args={{ tabs: manyTabs }} parameters={{ layout: 'full' }}>
  {#snippet template(args)}
    <TabBar
      tabs={args.tabs || []}
      activeTab={args.activeTab}
      onTabChange={args.onTabChange}
      class={args.class}
      id={args.id}
    />
  {/snippet}
</Story>

<Story name="With Disabled Tabs" args={{ tabs: tabsWithDisabled }} parameters={{ layout: 'full' }}>
  {#snippet template(args)}
    <TabBar
      tabs={args.tabs || []}
      activeTab={args.activeTab}
      onTabChange={args.onTabChange}
      class={args.class}
      id={args.id}
    />
  {/snippet}
</Story>

<Story
  name="Two Tabs Only"
  args={{
    tabs: [
      { id: 'tab1', label: 'Tab 1', icon: InboxIcon },
      { id: 'tab2', label: 'Tab 2', icon: ExploreIcon },
    ],
  }}
  parameters={{ layout: 'full' }}
>
  {#snippet template(args)}
    <TabBar
      tabs={args.tabs || []}
      activeTab={args.activeTab}
      onTabChange={args.onTabChange}
      class={args.class}
      id={args.id}
    />
  {/snippet}
</Story>

<Story
  name="Long Labels"
  args={{
    tabs: [
      { id: 'home', label: 'Home Dashboard', icon: InboxIcon },
      { id: 'analytics', label: 'Analytics Report', icon: CategoriesIcon },
      { id: 'settings', label: 'User Settings', icon: SettingsIcon },
      { id: 'profile', label: 'Profile Management', icon: ProfileIcon },
    ],
  }}
  parameters={{ layout: 'full' }}
>
  {#snippet template(args)}
    <TabBar
      tabs={args.tabs || []}
      activeTab={args.activeTab}
      onTabChange={args.onTabChange}
      class={args.class}
      id={args.id}
    />
  {/snippet}
</Story>

<Story name="Interactive Example" parameters={{ layout: 'full' }}>
  {#snippet template()}
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-neutral-800">App Navigation</h3>
        <TabBar
          tabs={[
            { id: 'home', label: 'Home', icon: InboxIcon },
            { id: 'explore', label: 'Explore', icon: ExploreIcon },
            { id: 'create', label: 'Create', icon: CreateIcon },
            { id: 'profile', label: 'Profile', icon: ProfileIcon },
          ]}
          activeTab="home"
        />
      </div>

      <div>
        <h3 class="mb-4 text-neutral-800">Settings Navigation</h3>
        <TabBar
          tabs={[
            { id: 'general', label: 'General', icon: SettingsIcon },
            { id: 'security', label: 'Security', icon: SettingsIcon },
            { id: 'privacy', label: 'Privacy', icon: SettingsIcon },
            { id: 'notifications', label: 'Notifications', icon: InboxIcon },
            { id: 'billing', label: 'Billing', icon: SettingsIcon, disabled: true },
          ]}
          activeTab="general"
        />
      </div>

      <div>
        <h3 class="mb-4 text-neutral-800">Student Dashboard</h3>
        <TabBar
          tabs={[
            { id: 'classes', label: 'Classes', icon: CategoriesIcon },
            { id: 'homework', label: 'Homework', icon: CreateIcon },
            { id: 'grades', label: 'Grades', icon: StarFilledIcon },
            { id: 'schedule', label: 'Schedule', icon: CategoriesIcon },
            { id: 'resources', label: 'Resources', icon: SearchIcon },
          ]}
          activeTab="classes"
        />
      </div>
    </div>
  {/snippet}
</Story>
