<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import ThemeToggle from '../lib/components/ThemeToggle.svelte'

  const { Story } = defineMeta({
    title: 'Components/ThemeToggle',
    component: ThemeToggle,
    args: {
      size: 'medium',
      class: '',
    },
    argTypes: {
      size: {
        control: { type: 'select' },
        options: ['small', 'medium', 'large'],
        description: 'The size of the theme toggle button',
      },
      class: {
        control: { type: 'text' },
        description: 'Additional CSS classes to apply',
      },
    },
    parameters: {
      docs: {
        description: {
          component:
            "A theme toggle component that switches between light and dark themes. The component automatically detects system preference and persists the user's choice in localStorage.",
        },
      },
    },
  })
</script>

<Story name="Default" args={{}}>
  {#snippet template(args)}
    <ThemeToggle {...args} />
  {/snippet}
</Story>

<Story name="Small" args={{ size: 'small' }}>
  {#snippet template(args)}
    <ThemeToggle {...args} />
  {/snippet}
</Story>

<Story name="Medium" args={{ size: 'medium' }}>
  {#snippet template(args)}
    <ThemeToggle {...args} />
  {/snippet}
</Story>

<Story name="Large" args={{ size: 'large' }}>
  {#snippet template(args)}
    <ThemeToggle {...args} />
  {/snippet}
</Story>

<Story name="All Sizes">
  {#snippet template()}
    <div class="space-y-4">
      <h3 class="text-primary text-lg font-semibold">Theme Toggle Sizes</h3>
      <div class="flex items-center gap-4">
        <div class="flex flex-col items-center gap-2">
          <ThemeToggle size="small" />
          <span class="text-secondary text-sm">Small</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <ThemeToggle size="medium" />
          <span class="text-secondary text-sm">Medium</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <ThemeToggle size="large" />
          <span class="text-secondary text-sm">Large</span>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="In Context">
  {#snippet template()}
    <div class="bg-background border-default rounded-lg border p-6">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-primary text-xl font-bold">Settings</h2>
        <ThemeToggle />
      </div>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-secondary">Theme</span>
          <span class="text-muted">Toggle between light and dark mode</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-secondary">Notifications</span>
          <span class="text-muted">Enabled</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-secondary">Language</span>
          <span class="text-muted">English</span>
        </div>
      </div>
    </div>
  {/snippet}
</Story>
