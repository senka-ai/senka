<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Tabs from '@ui/components/controls/Tabs.svelte'
  import Card from '@ui/components/content/Card.svelte'
  import TextField from '@ui/components/forms/TextField.svelte'
  import TextArea from '@ui/components/forms/TextArea.svelte'
  import Button from '@ui/components/core/Button.svelte'
  import Badge from '@ui/components/feedback/Badge.svelte'
  import ProgressBar from '@ui/components/feedback/ProgressBar.svelte'

  // State for interactive examples
  let selectedTab = $state('overview')
  let selectedCategory = $state('articles')
  let selectedSection = $state('general')

  const handleTabChange = (value: string) => {
    console.log('Tab changed to:', value)
    selectedTab = value
  }

  const handleCategoryChange = (value: string) => {
    console.log('Category changed to:', value)
    selectedCategory = value
  }

  const handleSectionChange = (value: string) => {
    console.log('Section changed to:', value)
    selectedSection = value
  }

  const { Story } = defineMeta({
    title: 'Controls/Tabs',
    component: Tabs,
    args: {
      tabs: [
        { id: 'overview', label: 'Overview' },
        { id: 'details', label: 'Details' },
        { id: 'settings', label: 'Settings' },
      ],
      activeTab: 'overview',
      size: 'medium',
      fullWidth: false,
      disabled: false,
    },
    argTypes: {
      tabs: {
        control: false,
        description: 'Array of tab objects with id, label, and optional disabled',
      },
      activeTab: {
        control: { type: 'text' },
        description: 'ID of the currently active tab',
      },
      size: {
        control: { type: 'select' },
        options: ['small', 'medium', 'large'],
        description: 'Size of the tabs',
      },
      fullWidth: {
        control: { type: 'boolean' },
        description: 'Whether the tabs take full width with equal distribution',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      onchange: {
        control: false,
        description: 'Function called when tab changes - receives tab ID',
      },
      onclick: {
        control: false,
        description: 'Click handler function',
      },
    },
  })
</script>

<Story name="Overview" parameters={{ layout: 'wide' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Tab Counts Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Tab Counts</h3>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <Tabs
              tabs={[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
              ]}
              activeTab="home"
            />
          </div>
          <div class="flex items-center gap-4">
            <Tabs
              tabs={[
                { id: 'overview', label: 'Overview' },
                { id: 'details', label: 'Details' },
                { id: 'settings', label: 'Settings' },
              ]}
              activeTab="details"
            />
          </div>
          <div class="flex items-center gap-4">
            <Tabs
              tabs={[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'analytics', label: 'Analytics' },
                { id: 'reports', label: 'Reports' },
                { id: 'settings', label: 'Settings' },
              ]}
              activeTab="analytics"
            />
          </div>
        </div>
      </div>

      <!-- Sizes Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Sizes</h3>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <Tabs
              tabs={[
                { id: 'small1', label: 'Small' },
                { id: 'small2', label: 'Size' },
                { id: 'small3', label: 'Demo' },
              ]}
              activeTab="small1"
              size="small"
            />
          </div>
          <div class="flex items-center gap-4">
            <Tabs
              tabs={[
                { id: 'medium1', label: 'Medium' },
                { id: 'medium2', label: 'Size' },
                { id: 'medium3', label: 'Demo' },
              ]}
              activeTab="medium1"
              size="medium"
            />
          </div>
          <div class="flex items-center gap-4">
            <Tabs
              tabs={[
                { id: 'large1', label: 'Large' },
                { id: 'large2', label: 'Size' },
                { id: 'large3', label: 'Demo' },
              ]}
              activeTab="large1"
              size="large"
            />
          </div>
        </div>
      </div>

      <!-- Full Width Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Full Width</h3>
        <div class="space-y-8">
          <div>
            <p class="mb-2 text-sm text-neutral-600">Auto width (default)</p>
            <Tabs
              tabs={[
                { id: 'auto1', label: 'Auto' },
                { id: 'auto2', label: 'Width' },
                { id: 'auto3', label: 'Sizing' },
              ]}
              activeTab="auto1"
            />
          </div>
          <div>
            <p class="mb-2 text-sm text-neutral-600">Full width with equal distribution</p>
            <Tabs
              tabs={[
                { id: 'full1', label: 'Full' },
                { id: 'full2', label: 'Width' },
                { id: 'full3', label: 'Equal' },
              ]}
              activeTab="full1"
              fullWidth={true}
            />
          </div>
          <div>
            <p class="mb-2 text-sm text-neutral-600">Full width with different label lengths</p>
            <Tabs
              tabs={[
                { id: 'var1', label: 'Short' },
                { id: 'var2', label: 'Medium Length' },
                { id: 'var3', label: 'Very Long Tab Name' },
              ]}
              activeTab="var1"
              fullWidth={true}
            />
          </div>
        </div>
      </div>

      <!-- States Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States</h3>
        <div class="space-y-4">
          <div class="flex items-center gap-8">
            <Tabs
              tabs={[
                { id: 'all', label: 'All' },
                { id: 'active', label: 'Active' },
                { id: 'archived', label: 'Archived' },
              ]}
              activeTab="active"
            />
            <span class="text-sm text-neutral-600">Default state</span>
          </div>
          <div class="flex items-center gap-8">
            <Tabs
              tabs={[
                { id: 'public', label: 'Public' },
                { id: 'private', label: 'Private', disabled: true },
                { id: 'shared', label: 'Shared' },
              ]}
              activeTab="public"
            />
            <span class="text-sm text-neutral-600">With disabled tab</span>
          </div>
          <div class="flex items-center gap-8">
            <Tabs
              tabs={[
                { id: 'posts', label: 'Posts' },
                { id: 'comments', label: 'Comments' },
                { id: 'likes', label: 'Likes' },
              ]}
              activeTab="posts"
              disabled={true}
            />
            <span class="text-sm text-neutral-600">Completely disabled</span>
          </div>
        </div>
      </div>

      <!-- Common Use Cases -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Common Use Cases</h3>
        <div class="space-y-2 text-sm text-neutral-600">
          <p>• Content organization (Overview, Details, Settings)</p>
          <p>• Content categories (Articles, Videos, Images)</p>
          <p>• Data filters (All, Recent, Favorites)</p>
          <p>• Form sections (Personal, Security, Preferences)</p>
          <p>• Dashboard views (Analytics, Reports, Users)</p>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Tabs {...args} />
  {/snippet}
</Story>

<Story
  name="Content Categories"
  args={{
    tabs: [
      { id: 'articles', label: 'Articles' },
      { id: 'videos', label: 'Videos' },
      { id: 'images', label: 'Images' },
    ],
    activeTab: 'articles',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Tabs {...args} />
  {/snippet}
</Story>

<Story
  name="Dashboard Navigation"
  args={{
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'reports', label: 'Reports' },
      { id: 'users', label: 'Users' },
    ],
    activeTab: 'analytics',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Tabs {...args} />
  {/snippet}
</Story>

<Story
  name="Project Phases"
  args={{
    tabs: [
      { id: 'planning', label: 'Planning' },
      { id: 'development', label: 'Development' },
      { id: 'testing', label: 'Testing', disabled: true },
      { id: 'deployment', label: 'Deployment', disabled: true },
    ],
    activeTab: 'development',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Tabs {...args} />
  {/snippet}
</Story>

<Story name="Small Size" args={{ size: 'small' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Tabs {...args} />
  {/snippet}
</Story>

<Story name="Medium Size" args={{ size: 'medium' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Tabs {...args} />
  {/snippet}
</Story>

<Story name="Large Size" args={{ size: 'large' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Tabs {...args} />
  {/snippet}
</Story>

<Story name="Full Width" args={{ fullWidth: true }} parameters={{ layout: 'wide' }}>
  {#snippet template(args)}
    <Tabs {...args} />
  {/snippet}
</Story>

<Story
  name="Full Width with Varied Labels"
  args={{
    fullWidth: true,
    tabs: [
      { id: 'short', label: 'Short' },
      { id: 'medium', label: 'Medium Length' },
      { id: 'long', label: 'Very Long Tab Name' },
    ],
    activeTab: 'short',
  }}
  parameters={{ layout: 'wide' }}
>
  {#snippet template(args)}
    <Tabs {...args} />
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Tabs {...args} />
  {/snippet}
</Story>

<Story name="Content Management Example">
  {#snippet template()}
    <div class="max-w-2xl space-y-6">
      <h3 class="text-h3 text-primary font-semibold">Content Library</h3>

      <div class="flex items-center justify-between">
        <p class="text-body-m text-secondary">Browse content by type</p>
        <Tabs
          tabs={[
            { id: 'articles', label: 'Articles' },
            { id: 'videos', label: 'Videos' },
            { id: 'images', label: 'Images' },
          ]}
          activeTab={selectedCategory}
          onchange={handleCategoryChange}
        />
      </div>

      <!-- Content based on selection -->
      {#if selectedCategory === 'articles'}
        <div class="space-y-3">
          <Card variant="compact" title="Getting Started Guide" description="Complete setup tutorial" />
          <Card variant="compact" title="Best Practices" description="Tips for optimization" />
          <Card variant="compact" title="Advanced Features" description="Power user techniques" />
        </div>
      {:else if selectedCategory === 'videos'}
        <div class="space-y-3">
          <Card variant="compact" title="Introduction Video" description="5 minutes • Beginner" />
          <Card variant="compact" title="Live Demo Session" description="30 minutes • Intermediate" />
          <Card variant="compact" title="Expert Walkthrough" description="45 minutes • Advanced" />
        </div>
      {:else if selectedCategory === 'images'}
        <div class="grid grid-cols-3 gap-4">
          <Card variant="compact" title="Screenshots" />
          <Card variant="compact" title="Diagrams" />
          <Card variant="compact" title="Templates" />
        </div>
      {/if}
    </div>
  {/snippet}
</Story>

<Story name="Dashboard Example">
  {#snippet template()}
    <div class="max-w-2xl space-y-6">
      <h3 class="text-h3 text-primary font-semibold">Analytics Dashboard</h3>

      <div class="flex items-center justify-between">
        <p class="text-body-m text-secondary">Select dashboard view</p>
        <Tabs
          tabs={[
            { id: 'overview', label: 'Overview' },
            { id: 'performance', label: 'Performance' },
            { id: 'users', label: 'Users' },
            { id: 'revenue', label: 'Revenue' },
          ]}
          activeTab={selectedTab}
          onchange={handleTabChange}
        />
      </div>

      <!-- Content based on selection -->
      {#if selectedTab === 'overview'}
        <div class="grid grid-cols-2 gap-4">
          <Card variant="compact" title="Total Visitors" description="24,891 this month" />
          <Card variant="compact" title="Page Views" description="87,432 views" />
          <Card variant="compact" title="Bounce Rate" description="34.2% average" />
          <Card variant="compact" title="Session Duration" description="4:23 average" />
        </div>
      {:else if selectedTab === 'performance'}
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <p class="text-body-m text-secondary">Page Load Speed</p>
            <Badge variant="success" value="Fast" />
          </div>
          <ProgressBar progress={85} variant="default" showLabel />
          <div class="flex items-center justify-between">
            <p class="text-body-m text-secondary">Core Web Vitals</p>
            <Badge variant="success" value="Good" />
          </div>
          <ProgressBar progress={92} variant="default" showLabel />
        </div>
      {:else if selectedTab === 'users'}
        <div class="grid grid-cols-3 gap-4">
          <Card variant="compact" title="12,431" description="New Users" />
          <Card variant="compact" title="8,112" description="Returning" />
          <Card variant="compact" title="73%" description="Retention" />
        </div>
      {:else if selectedTab === 'revenue'}
        <div class="grid grid-cols-2 gap-4">
          <Card variant="compact" title="$34,891" description="Monthly Revenue" />
          <Card variant="compact" title="$127.45" description="Average Order" />
        </div>
      {/if}
    </div>
  {/snippet}
</Story>

<Story name="Settings Form Example">
  {#snippet template()}
    <div class="max-w-2xl space-y-6">
      <h3 class="text-h3 text-primary font-semibold">Account Settings</h3>

      <Tabs
        tabs={[
          { id: 'general', label: 'General' },
          { id: 'security', label: 'Security' },
          { id: 'notifications', label: 'Notifications' },
        ]}
        activeTab={selectedSection}
        onchange={handleSectionChange}
        fullWidth={true}
      />

      <!-- Content based on selection -->
      {#if selectedSection === 'general'}
        <div class="space-y-4">
          <TextField label="Display Name" placeholder="Enter your display name" />
          <TextField label="Email Address" type="email" placeholder="your.email@example.com" />
          <TextArea label="Bio" placeholder="Tell us about yourself" rows={3} />
          <div class="flex gap-3 pt-2">
            <Button variant="primary">Save Changes</Button>
            <Button variant="secondary">Cancel</Button>
          </div>
        </div>
      {:else if selectedSection === 'security'}
        <div class="space-y-4">
          <TextField label="Current Password" type="password" placeholder="Enter current password" />
          <TextField label="New Password" type="password" placeholder="Enter new password" />
          <TextField label="Confirm Password" type="password" placeholder="Confirm new password" />
          <div class="flex gap-3 pt-2">
            <Button variant="primary">Update Password</Button>
          </div>
        </div>
      {:else if selectedSection === 'notifications'}
        <div class="space-y-4">
          <Card variant="compact" title="Email Notifications" description="Get updates via email" />
          <Card variant="compact" title="Push Notifications" description="Browser notifications" />
          <Card variant="compact" title="SMS Alerts" description="Text message updates" />
          <div class="flex gap-3 pt-2">
            <Button variant="primary">Save Preferences</Button>
          </div>
        </div>
      {/if}
    </div>
  {/snippet}
</Story>

<Story
  name="Long Tab Names"
  args={{
    tabs: [
      { id: 'general', label: 'General Settings' },
      { id: 'advanced', label: 'Advanced Configuration' },
      { id: 'integration', label: 'Third-party Integrations' },
    ],
    activeTab: 'general',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <div class="space-y-4">
      <Tabs {...args} />
      <p class="text-sm text-neutral-600">Tabs automatically size to accommodate their text content</p>
    </div>
  {/snippet}
</Story>
