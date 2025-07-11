<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Avatar from '../lib/components/Avatar.svelte';

  const { Story } = defineMeta({
    title: 'Components/Avatar',
    component: Avatar,
    args: {
      size: 'medium',
      alt: 'User Avatar'
    },
    argTypes: {
      size: {
        control: { type: 'select' },
        options: ['small', 'medium', 'large', 'xlarge'],
        description: 'Avatar size'
      },
      status: {
        control: { type: 'select' },
        options: ['online', 'offline', 'away', 'busy'],
        description: 'Status indicator'
      },
      src: {
        control: { type: 'text' },
        description: 'Image source URL'
      },
      alt: {
        control: { type: 'text' },
        description: 'Alternative text'
      },
      initials: {
        control: { type: 'text' },
        description: 'Initials to display'
      }
    }
  });
</script>

<Story name="With Image" args={{ 
  src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  alt: 'John Doe'
}}>
  {#snippet template(args)}
    <Avatar {...args} />
  {/snippet}
</Story>

<Story name="With Initials" args={{ 
  initials: 'JD',
  alt: 'John Doe'
}}>
  {#snippet template(args)}
    <Avatar {...args} />
  {/snippet}
</Story>

<Story name="With Status" args={{ 
  initials: 'JD',
  alt: 'John Doe',
  status: 'online'
}}>
  {#snippet template(args)}
    <Avatar {...args} />
  {/snippet}
</Story>

<Story name="All Sizes">
  <div class="flex gap-4 items-center">
    <Avatar size="small" initials="S" alt="Small" />
    <Avatar size="medium" initials="M" alt="Medium" />
    <Avatar size="large" initials="L" alt="Large" />
    <Avatar size="xlarge" initials="XL" alt="Extra Large" />
  </div>
</Story>

<Story name="All Status">
  <div class="flex gap-4 items-center">
    <Avatar initials="ON" alt="Online" status="online" />
    <Avatar initials="OF" alt="Offline" status="offline" />
    <Avatar initials="AW" alt="Away" status="away" />
    <Avatar initials="BS" alt="Busy" status="busy" />
  </div>
</Story>