<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import { AddIcon } from '../lib/icons'

  const { Story } = defineMeta({
    title: 'Icons/Individual Icons',
    component: AddIcon,
    args: {
      size: 24,
    },
    argTypes: {
      size: {
        control: { type: 'range', min: 12, max: 64, step: 4 },
        description: 'Icon size in pixels',
      },
      class: {
        control: { type: 'text' },
        description: 'CSS classes for styling',
      },
    },
  })
</script>

<script>
  import {
    SearchIcon,
    SettingsIcon,
    ProfileIcon,
    EditIcon,
    DeleteIcon,
    CheckIcon,
    CloseIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    EyeVisibleIcon,
    EyeInvisibleIcon,
    HeartFilledIcon,
    HeartOutlinedIcon,
    StarFilledIcon,
    StarOutlinedIcon,
    ShoppingBagFilledIcon,
    ShoppingBagOutlinedIcon,
  } from '../lib/icons'
</script>

<Story name="Add Icon" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-start gap-4">
      <AddIcon {...args} />
      <span class="text-sm">Add Icon</span>
    </div>
  {/snippet}
</Story>

<Story name="Search Icon" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-start gap-4">
      <SearchIcon {...args} />
      <span class="text-sm">Search Icon</span>
    </div>
  {/snippet}
</Story>

<Story name="Settings Icon" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-start gap-4">
      <SettingsIcon {...args} />
      <span class="text-sm">Settings Icon</span>
    </div>
  {/snippet}
</Story>

<Story name="Profile Icon" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-start gap-4">
      <ProfileIcon {...args} />
      <span class="text-sm">Profile Icon</span>
    </div>
  {/snippet}
</Story>

<Story name="Edit Icon" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-start gap-4">
      <EditIcon {...args} />
      <span class="text-sm">Edit Icon</span>
    </div>
  {/snippet}
</Story>

<Story name="Delete Icon" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-start gap-4">
      <DeleteIcon {...args} />
      <span class="text-sm">Delete Icon</span>
    </div>
  {/snippet}
</Story>

<Story name="Check Icon" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-start gap-4">
      <CheckIcon {...args} />
      <span class="text-sm">Check Icon</span>
    </div>
  {/snippet}
</Story>

<Story name="Close Icon" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-start gap-4">
      <CloseIcon {...args} />
      <span class="text-sm">Close Icon</span>
    </div>
  {/snippet}
</Story>

<Story name="Arrow Icons" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex justify-start">
      <div class="flex flex-col items-center gap-4">
        <div class="flex flex-col items-center gap-2">
          <ArrowUpIcon {...args} />
          <span class="text-xs">Up</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <ArrowDownIcon {...args} />
          <span class="text-xs">Down</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <ArrowLeftIcon {...args} />
          <span class="text-xs">Left</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <ArrowRightIcon {...args} />
          <span class="text-xs">Right</span>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Eye Icons" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex justify-start">
      <div class="flex flex-col items-center gap-4">
        <div class="flex flex-col items-center gap-2">
          <EyeVisibleIcon {...args} />
          <span class="text-xs">Visible</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <EyeInvisibleIcon {...args} />
          <span class="text-xs">Invisible</span>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Heart Icons" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex justify-start">
      <div class="flex flex-col items-center gap-4">
        <div class="flex flex-col items-center gap-2">
          <HeartFilledIcon {...args} />
          <span class="text-xs">Filled</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <HeartOutlinedIcon {...args} />
          <span class="text-xs">Outlined</span>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Star Icons" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex justify-start">
      <div class="flex flex-col items-center gap-4">
        <div class="flex flex-col items-center gap-2">
          <StarFilledIcon {...args} />
          <span class="text-xs">Filled</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <StarOutlinedIcon {...args} />
          <span class="text-xs">Outlined</span>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Shopping Bag Icons" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex justify-start">
      <div class="flex flex-col items-center gap-4">
        <div class="flex flex-col items-center gap-2">
          <ShoppingBagFilledIcon {...args} />
          <span class="text-xs">Filled</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <ShoppingBagOutlinedIcon {...args} />
          <span class="text-xs">Outlined</span>
        </div>
      </div>
    </div>
  {/snippet}
</Story>
