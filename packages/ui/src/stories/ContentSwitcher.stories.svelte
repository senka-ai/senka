<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import ContentSwitcher from '../lib/components/controls/ContentSwitcher.svelte'
  import Card from '../lib/components/layout/Card.svelte'
  import CardHorizontal from '../lib/components/layout/CardHorizontal.svelte'
  import Badge from '../lib/components/feedback/Badge.svelte'
  import Button from '../lib/components/core/Button.svelte'
  import TextField from '../lib/components/forms/TextField.svelte'
  import TextArea from '../lib/components/forms/TextArea.svelte'
  import Toggle from '../lib/components/forms/Toggle.svelte'
  import Dropdown from '../lib/components/forms/Dropdown.svelte'
  import ProgressBar from '../lib/components/feedback/ProgressBar.svelte'
  import Loader from '../lib/components/feedback/Loader.svelte'

  // State for interactive examples
  let selectedSection = $state('personal')
  let selectedTab = $state('overview')
  let selectedView = $state('grid')

  const handleSectionChange = (value: string) => {
    console.log('Section changed to:', value)
    selectedSection = value
  }

  const handleTabChange = (value: string) => {
    console.log('Tab changed to:', value)
    selectedTab = value
  }

  const handleViewChange = (value: string) => {
    console.log('View changed to:', value)
    selectedView = value
  }

  const { Story } = defineMeta({
    title: 'Controls/ContentSwitcher',
    component: ContentSwitcher,
    args: {
      items: [
        { id: 'overview', label: 'Overview' },
        { id: 'details', label: 'Details' },
        { id: 'settings', label: 'Settings' },
      ],
      selectedId: 'overview',
      size: 'small',
      fullWidth: false,
      disabled: false,
    },
    argTypes: {
      items: {
        control: false,
        description: 'Array of content sections with id and label',
      },
      selectedId: {
        control: { type: 'text' },
        description: 'ID of the currently selected section',
      },
      size: {
        control: { type: 'select' },
        options: ['small', 'medium', 'large'],
        description: 'Size of the content switcher',
      },
      fullWidth: {
        control: { type: 'boolean' },
        description: 'Whether the switcher takes full width with equal distribution',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      name: {
        control: { type: 'text' },
        description: 'Name attribute for form association',
      },
      onchange: {
        control: false,
        description: 'Function called when selection changes - receives selected ID',
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
      <!-- Section Counts Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Section Counts</h3>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <ContentSwitcher
              items={[
                { id: 'list', label: 'List' },
                { id: 'grid', label: 'Grid' },
              ]}
              selectedId="list"
            />
            <span class="text-sm text-neutral-600">Two sections</span>
          </div>
          <div class="flex items-center gap-4">
            <ContentSwitcher
              items={[
                { id: 'all', label: 'All' },
                { id: 'active', label: 'Active' },
                { id: 'archived', label: 'Archived' },
              ]}
              selectedId="active"
            />
            <span class="text-sm text-neutral-600">Three sections</span>
          </div>
          <div class="flex items-center gap-4">
            <ContentSwitcher
              items={[
                { id: 'day', label: 'Day' },
                { id: 'week', label: 'Week' },
                { id: 'month', label: 'Month' },
                { id: 'year', label: 'Year' },
              ]}
              selectedId="month"
            />
            <span class="text-sm text-neutral-600">Four sections</span>
          </div>
        </div>
      </div>

      <!-- Sizes Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Sizes</h3>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <ContentSwitcher
              items={[
                { id: 'small1', label: 'Small' },
                { id: 'small2', label: 'Size' },
                { id: 'small3', label: 'Demo' },
              ]}
              selectedId="small1"
              size="small"
            />
            <span class="text-sm text-neutral-600">Small size</span>
          </div>
          <div class="flex items-center gap-4">
            <ContentSwitcher
              items={[
                { id: 'medium1', label: 'Medium' },
                { id: 'medium2', label: 'Size' },
                { id: 'medium3', label: 'Demo' },
              ]}
              selectedId="medium1"
              size="medium"
            />
            <span class="text-sm text-neutral-600">Medium size</span>
          </div>
          <div class="flex items-center gap-4">
            <ContentSwitcher
              items={[
                { id: 'large1', label: 'Large' },
                { id: 'large2', label: 'Size' },
                { id: 'large3', label: 'Demo' },
              ]}
              selectedId="large1"
              size="large"
            />
            <span class="text-sm text-neutral-600">Large size</span>
          </div>
        </div>
      </div>

      <!-- Full Width Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Full Width</h3>
        <div class="space-y-4">
          <div>
            <p class="mb-2 text-sm text-neutral-600">Auto width (default)</p>
            <ContentSwitcher
              items={[
                { id: 'auto1', label: 'Auto' },
                { id: 'auto2', label: 'Width' },
                { id: 'auto3', label: 'Sizing' },
              ]}
              selectedId="auto1"
            />
          </div>
          <div>
            <p class="mb-2 text-sm text-neutral-600">Full width with equal distribution</p>
            <ContentSwitcher
              items={[
                { id: 'full1', label: 'Full' },
                { id: 'full2', label: 'Width' },
                { id: 'full3', label: 'Equal' },
              ]}
              selectedId="full1"
              fullWidth={true}
            />
          </div>
          <div>
            <p class="mb-2 text-sm text-neutral-600">Full width with different label lengths</p>
            <ContentSwitcher
              items={[
                { id: 'var1', label: 'Short' },
                { id: 'var2', label: 'Medium Length' },
                { id: 'var3', label: 'Very Long Section Name' },
              ]}
              selectedId="var1"
              fullWidth={true}
            />
          </div>
        </div>
      </div>

      <!-- States Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States</h3>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <ContentSwitcher
              items={[
                { id: 'inbox', label: 'Inbox' },
                { id: 'sent', label: 'Sent' },
                { id: 'drafts', label: 'Drafts' },
              ]}
              selectedId="inbox"
            />
            <span class="text-sm text-neutral-600">Default state</span>
          </div>
          <div class="flex items-center gap-4">
            <ContentSwitcher
              items={[
                { id: 'public', label: 'Public' },
                { id: 'private', label: 'Private', disabled: true },
                { id: 'shared', label: 'Shared' },
              ]}
              selectedId="public"
            />
            <span class="text-sm text-neutral-600">With disabled section</span>
          </div>
          <div class="flex items-center gap-4">
            <ContentSwitcher
              items={[
                { id: 'posts', label: 'Posts' },
                { id: 'comments', label: 'Comments' },
                { id: 'likes', label: 'Likes' },
              ]}
              selectedId="posts"
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
          <p>• Content views (List, Grid, Card)</p>
          <p>• Time periods (Day, Week, Month, Year)</p>
          <p>• Data filters (All, Active, Archived)</p>
          <p>• Display modes (Summary, Detailed, Analytics)</p>
          <p>• Content types (Posts, Comments, Reviews)</p>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ContentSwitcher {...args} />
  {/snippet}
</Story>

<Story
  name="View Mode Toggle"
  args={{
    items: [
      { id: 'cards', label: 'Cards' },
      { id: 'table', label: 'Table' },
    ],
    selectedId: 'cards',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <ContentSwitcher {...args} />
  {/snippet}
</Story>

<Story
  name="Time Period Filter"
  args={{
    items: [
      { id: 'today', label: 'Today' },
      { id: 'week', label: 'This Week' },
      { id: 'month', label: 'This Month' },
      { id: 'quarter', label: 'Quarter' },
    ],
    selectedId: 'week',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <ContentSwitcher {...args} />
  {/snippet}
</Story>

<Story
  name="Content Type Filter"
  args={{
    items: [
      { id: 'articles', label: 'Articles' },
      { id: 'videos', label: 'Videos', disabled: true },
      { id: 'podcasts', label: 'Podcasts' },
    ],
    selectedId: 'articles',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <ContentSwitcher {...args} />
  {/snippet}
</Story>

<Story name="Small Size" args={{ size: 'small' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ContentSwitcher {...args} />
  {/snippet}
</Story>

<Story name="Medium Size" args={{ size: 'medium' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ContentSwitcher {...args} />
  {/snippet}
</Story>

<Story name="Large Size" args={{ size: 'large' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ContentSwitcher {...args} />
  {/snippet}
</Story>

<Story name="Full Width" args={{ fullWidth: true }} parameters={{ layout: 'wide' }}>
  {#snippet template(args)}
    <ContentSwitcher {...args} />
  {/snippet}
</Story>

<Story
  name="Full Width with Varied Labels"
  args={{
    fullWidth: true,
    items: [
      { id: 'short', label: 'Short' },
      { id: 'medium', label: 'Medium Length' },
      { id: 'long', label: 'Very Long Section Name' },
    ],
    selectedId: 'short',
  }}
  parameters={{ layout: 'wide' }}
>
  {#snippet template(args)}
    <ContentSwitcher {...args} />
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ContentSwitcher {...args} />
  {/snippet}
</Story>

<Story name="View Switcher Example">
  {#snippet template()}
    <div class="max-w-2xl space-y-6">
      <h3 class="text-h3 text-primary font-semibold">Product Gallery</h3>

      <div class="flex items-center justify-between">
        <p class="text-body-m text-secondary">Choose how to view products</p>
        <ContentSwitcher
          items={[
            { id: 'grid', label: 'Grid' },
            { id: 'list', label: 'List' },
            { id: 'cards', label: 'Cards' },
          ]}
          selectedId={selectedView}
          onchange={handleViewChange}
        />
      </div>

      <!-- Content based on selection -->
      {#if selectedView === 'grid'}
        <div class="grid grid-cols-3 gap-4">
          <Card variant="compact" title="Product A" />
          <Card variant="compact" title="Product B" />
          <Card variant="compact" title="Product C" />
          <Card variant="compact" title="Product D" />
          <Card variant="compact" title="Product E" />
          <Card variant="compact" title="Product F" />
        </div>
      {:else if selectedView === 'list'}
        <div class="space-y-3">
          <CardHorizontal title="Product A" subtitle="Available in stock" />
          <CardHorizontal title="Product B" subtitle="Limited quantity" />
          <CardHorizontal title="Product C" subtitle="Pre-order available" />
        </div>
      {:else if selectedView === 'cards'}
        <div class="grid grid-cols-2 gap-4">
          <Card variant="default" title="Featured Product" description="Special promotion this week" />
          <Card variant="default" title="Best Seller" description="Most popular item" />
        </div>
      {/if}
    </div>
  {/snippet}
</Story>

<Story name="Dashboard Tabs Example">
  {#snippet template()}
    <div class="max-w-2xl space-y-6">
      <h3 class="text-h3 text-primary font-semibold">Analytics Dashboard</h3>

      <div class="flex items-center justify-between">
        <p class="text-body-m text-secondary">Select data view</p>
        <ContentSwitcher
          items={[
            { id: 'overview', label: 'Overview' },
            { id: 'performance', label: 'Performance' },
            { id: 'users', label: 'Users' },
            { id: 'revenue', label: 'Revenue' },
          ]}
          selectedId={selectedTab}
          onchange={handleTabChange}
        />
      </div>

      <!-- Content based on selection -->
      {#if selectedTab === 'overview'}
        <div class="grid grid-cols-2 gap-4">
          <Card variant="compact" title="Total Visitors" description="12,543 this month" />
          <Card variant="compact" title="Conversion Rate" description="3.24% overall" />
        </div>
      {:else if selectedTab === 'performance'}
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <p class="text-body-m text-secondary">Page Load Time</p>
            <Badge variant="success" value="1.2s" />
          </div>
          <div class="flex items-center justify-between">
            <p class="text-body-m text-secondary">Time to First Byte</p>
            <Badge variant="success" value="0.3s" />
          </div>
          <div class="flex items-center justify-between">
            <p class="text-body-m text-secondary">Core Web Vitals</p>
            <Badge variant="success" value="Good" />
          </div>
        </div>
      {:else if selectedTab === 'users'}
        <div class="grid grid-cols-3 gap-4">
          <Card variant="compact" title="8,431" description="New Users" />
          <Card variant="compact" title="4,112" description="Returning" />
          <Card variant="compact" title="68%" description="Retention" />
        </div>
      {:else if selectedTab === 'revenue'}
        <div class="grid grid-cols-2 gap-4">
          <Card variant="compact" title="$24,891" description="Monthly Revenue" />
          <Card variant="compact" title="$87.45" description="Average Order" />
        </div>
      {/if}
    </div>
  {/snippet}
</Story>

<Story name="Form Sections Example">
  {#snippet template()}
    <div class="max-w-2xl space-y-6">
      <h3 class="text-h3 text-primary font-semibold">Profile Settings</h3>

      <ContentSwitcher
        items={[
          { id: 'personal', label: 'Personal' },
          { id: 'security', label: 'Security' },
          { id: 'preferences', label: 'Preferences' },
        ]}
        selectedId={selectedSection}
        onchange={handleSectionChange}
        name="profile-section"
      />

      <!-- Content based on selection -->
      {#if selectedSection === 'personal'}
        <div class="space-y-4">
          <TextField label="Full Name" placeholder="Enter your full name" />
          <TextField label="Email Address" type="email" placeholder="your.email@example.com" />
          <TextField label="Phone Number" type="tel" placeholder="+1 (555) 123-4567" />
          <div class="flex gap-3 pt-2">
            <Button variant="primary">
              {#snippet children()}Save Changes{/snippet}
            </Button>
            <Button variant="secondary">
              {#snippet children()}Cancel{/snippet}
            </Button>
          </div>
        </div>
      {:else if selectedSection === 'security'}
        <div class="space-y-4">
          <TextField label="Current Password" type="password" placeholder="Enter current password" />
          <TextField label="New Password" type="password" placeholder="Enter new password" />
          <div class="flex items-center justify-between">
            <p class="text-body-m text-primary">Two-Factor Authentication</p>
            <Toggle checked={true} />
          </div>
          <div class="flex gap-3 pt-2">
            <Button variant="primary">
              {#snippet children()}Update Password{/snippet}
            </Button>
          </div>
        </div>
      {:else if selectedSection === 'preferences'}
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <p class="text-body-m text-primary">Email Notifications</p>
            <Toggle checked={true} />
          </div>
          <div class="flex items-center justify-between">
            <p class="text-body-m text-primary">Dark Mode</p>
            <Toggle checked={false} />
          </div>
          <Dropdown
            label="Language"
            placeholder="Select language"
            options={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Spanish' },
              { value: 'fr', label: 'French' },
              { value: 'de', label: 'German' },
              { value: 'zh', label: 'Chinese' },
            ]}
          />
          <div class="flex gap-3 pt-2">
            <Button variant="primary">
              {#snippet children()}Save Preferences{/snippet}
            </Button>
          </div>
        </div>
      {/if}
    </div>
  {/snippet}
</Story>

<Story
  name="Status Categories"
  args={{
    items: [
      { id: 'new', label: 'New' },
      { id: 'in-progress', label: 'In Progress' },
      { id: 'review', label: 'Under Review' },
      { id: 'completed', label: 'Completed Tasks' },
    ],
    selectedId: 'review',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <div class="space-y-4">
      <ContentSwitcher {...args} />
      <p class="text-sm text-neutral-600">Each button sizes naturally to accommodate its text content</p>
    </div>
  {/snippet}
</Story>
