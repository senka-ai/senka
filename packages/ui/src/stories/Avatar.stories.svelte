<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Avatar from '../lib/components/media/Avatar.svelte'

  const { Story } = defineMeta({
    title: 'Media/Avatar',
    component: Avatar,
    args: {
      size: 'medium',
      alt: 'User Avatar',
    },
    argTypes: {
      size: {
        control: { type: 'select' },
        options: ['xs', 'small', 'medium', 'large'],
        description: 'Avatar size',
      },
      status: {
        control: { type: 'select' },
        options: ['online', 'offline', 'away', 'busy'],
        description: 'Status indicator',
      },
      src: {
        control: { type: 'text' },
        description: 'Image source URL',
      },
      alt: {
        control: { type: 'text' },
        description: 'Alternative text',
      },
      initials: {
        control: { type: 'text' },
        description: 'Initials to display',
      },
    },
  })
</script>

<Story name="Overview" args={{}}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Basic Types -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Basic Types</h3>
        <div class="flex items-center gap-6">
          <div class="text-center">
            <Avatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="John Doe" 
              size="medium" 
            />
            <p class="text-body-s text-secondary mt-2">With Image</p>
          </div>
          <div class="text-center">
            <Avatar initials="JD" alt="John Doe" size="medium" />
            <p class="text-body-s text-secondary mt-2">With Initials</p>
          </div>
          <div class="text-center">
            <Avatar alt="" size="medium" />
            <p class="text-body-s text-secondary mt-2">Default SVG</p>
          </div>
        </div>
      </div>

      <!-- All Sizes -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Sizes</h3>
        <div class="flex items-center gap-6">
          <div class="text-center">
            <Avatar size="xs" initials="XS" alt="Extra Small" />
            <p class="text-body-s text-secondary mt-2">Extra Small</p>
          </div>
          <div class="text-center">
            <Avatar size="small" initials="S" alt="Small" />
            <p class="text-body-s text-secondary mt-2">Small</p>
          </div>
          <div class="text-center">
            <Avatar size="medium" initials="M" alt="Medium" />
            <p class="text-body-s text-secondary mt-2">Medium</p>
          </div>
          <div class="text-center">
            <Avatar size="large" initials="L" alt="Large" />
            <p class="text-body-s text-secondary mt-2">Large</p>
          </div>
        </div>
      </div>

      <!-- With Status Indicators -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Status Indicators</h3>
        <div class="flex items-center gap-6">
          <div class="text-center">
            <Avatar initials="ON" alt="Online" status="online" size="medium" />
            <p class="text-body-s text-secondary mt-2">Online</p>
          </div>
          <div class="text-center">
            <Avatar initials="AW" alt="Away" status="away" size="medium" />
            <p class="text-body-s text-secondary mt-2">Away</p>
          </div>
          <div class="text-center">
            <Avatar initials="BS" alt="Busy" status="busy" size="medium" />
            <p class="text-body-s text-secondary mt-2">Busy</p>
          </div>
          <div class="text-center">
            <Avatar initials="OF" alt="Offline" status="offline" size="medium" />
            <p class="text-body-s text-secondary mt-2">Offline</p>
          </div>
        </div>
      </div>

      <!-- Real Examples -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Real Examples</h3>
        <div class="flex items-center gap-4">
          <Avatar 
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
            alt="Sarah Johnson" 
            status="online" 
            size="large" 
          />
          <Avatar 
            initials="MK" 
            alt="Mike Kim" 
            status="away" 
            size="large" 
          />
          <Avatar 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
            alt="Alex Chen" 
            status="busy" 
            size="large" 
          />
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story
  name="With Image"
  args={{
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    alt: 'John Doe',
  }}
>
  {#snippet template(args)}
    <Avatar {...args} />
  {/snippet}
</Story>

<Story
  name="With Initials"
  args={{
    initials: 'JD',
    alt: 'John Doe',
  }}
>
  {#snippet template(args)}
    <Avatar {...args} />
  {/snippet}
</Story>

<Story
  name="With Status"
  args={{
    initials: 'JD',
    alt: 'John Doe',
    status: 'online',
  }}
>
  {#snippet template(args)}
    <Avatar {...args} />
  {/snippet}
</Story>

<Story name="With SVG" args={{ alt: '' }}>
  {#snippet template(args)}
    <Avatar {...args} />
  {/snippet}
</Story>

<Story name="All Sizes" args={{}}>
  {#snippet template()}
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <Avatar size="xs" initials="XS" alt="Extra Small" />
        <Avatar size="small" initials="S" alt="Small" />
        <Avatar size="medium" initials="M" alt="Medium" />
        <Avatar size="large" initials="L" alt="Large" />
      </div>
      <div class="flex items-center gap-4">
        <Avatar size="xs" initials="XS" alt="Extra Small" status="online" />
        <Avatar size="small" initials="S" alt="Small" status="online" />
        <Avatar size="medium" initials="M" alt="Medium" status="online" />
        <Avatar size="large" initials="L" alt="Large" status="online" />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="All Status">
  {#snippet template()}
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <Avatar initials="ON" alt="Online" status="online" />
        <Avatar initials="OF" alt="Offline" status="offline" />
        <Avatar initials="AW" alt="Away" status="away" />
        <Avatar initials="BS" alt="Busy" status="busy" />
      </div>
      <div class="flex items-center gap-4">
        <Avatar size="xs" initials="ON" alt="Online" status="online" />
        <Avatar size="xs" initials="OF" alt="Offline" status="offline" />
        <Avatar size="xs" initials="AW" alt="Away" status="away" />
        <Avatar size="xs" initials="BS" alt="Busy" status="busy" />
      </div>
    </div>
  {/snippet}
</Story>
