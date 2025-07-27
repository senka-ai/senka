<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import IconButton from '../lib/components/core/IconButton.svelte'
  import {
    CloseIcon,
    AddIcon,
    EditIcon,
    DeleteIcon,
    SearchIcon,
    SettingsIcon,
    CameraIcon,
    SendIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    HamburgerMenuIcon,
    HeartOutlinedIcon,
    HeartFilledIcon,
    CheckIcon,
    WarningIcon,
    InfoIcon,
  } from '../lib/icons'

  // State for interactive examples
  let isLiked = $state(false)
  let showExampleModal = $state(false)

  const handleLike = () => {
    isLiked = !isLiked
  }

  const { Story } = defineMeta({
    title: 'Core/IconButton',
    component: IconButton,
    args: {
      'aria-label': 'Icon button',
      variant: 'ghost',
      color: 'default',
      size: 'medium',
      disabled: false,
      loading: false,
      icon: CloseIcon,
    },
    argTypes: {
      'aria-label': {
        control: { type: 'text' },
        description: 'Accessibility label (required)',
      },
      variant: {
        control: { type: 'select' },
        options: ['ghost', 'outlined', 'filled'],
        description: 'Button variant',
      },
      color: {
        control: { type: 'select' },
        options: ['default', 'neutral', 'success', 'warning', 'error'],
        description: 'Semantic color',
      },
      size: {
        control: { type: 'select' },
        options: ['small', 'medium', 'large'],
        description: 'Button size',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      loading: {
        control: { type: 'boolean' },
        description: 'Loading state',
      },
      icon: {
        control: false,
        description: 'Icon component to display',
      },
      iconSize: {
        control: { type: 'number' },
        description: 'Icon size in pixels (auto-sized if not provided)',
      },
    },
  })
</script>

<Story name="Overview" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Variants Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Variants</h3>
        <div class="flex items-center gap-4">
          <IconButton variant="ghost" icon={SettingsIcon} aria-label="Settings (Ghost)" />
          <IconButton variant="outlined" icon={EditIcon} aria-label="Edit (Outlined)" />
          <IconButton variant="filled" icon={AddIcon} aria-label="Add (Filled)" />
        </div>
      </div>

      <!-- Sizes Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Sizes</h3>
        <div class="text-highlight flex items-center gap-4">
          <IconButton size="small" variant="filled" icon={SearchIcon} aria-label="Search (Small)" />
          <IconButton size="medium" variant="filled" icon={SearchIcon} aria-label="Search (Medium)" />
          <IconButton size="large" variant="filled" icon={SearchIcon} aria-label="Search (Large)" />
        </div>
      </div>

      <!-- Semantic Colors Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Semantic Colors</h3>
        <div class="space-y-3">
          <div>
            <h4 class="mb-2 text-sm font-medium text-neutral-700">Ghost Variant</h4>
            <div class="flex items-center gap-2">
              <IconButton variant="ghost" color="default" icon={SettingsIcon} aria-label="Default" />
              <IconButton variant="ghost" color="neutral" icon={SettingsIcon} aria-label="Neutral" />
              <IconButton variant="ghost" color="success" icon={CheckIcon} aria-label="Success" />
              <IconButton variant="ghost" color="warning" icon={WarningIcon} aria-label="Warning" />
              <IconButton variant="ghost" color="error" icon={DeleteIcon} aria-label="Error" />
            </div>
          </div>
          <div>
            <h4 class="mb-2 text-sm font-medium text-neutral-700">Outlined Variant</h4>
            <div class="flex items-center gap-2">
              <IconButton variant="outlined" color="default" icon={EditIcon} aria-label="Default" />
              <IconButton variant="outlined" color="neutral" icon={EditIcon} aria-label="Neutral" />
              <IconButton variant="outlined" color="success" icon={CheckIcon} aria-label="Success" />
              <IconButton variant="outlined" color="warning" icon={WarningIcon} aria-label="Warning" />
              <IconButton variant="outlined" color="error" icon={DeleteIcon} aria-label="Error" />
            </div>
          </div>
          <div>
            <h4 class="mb-2 text-sm font-medium text-neutral-700">Filled Variant</h4>
            <div class="flex items-center gap-2">
              <IconButton variant="filled" color="default" icon={AddIcon} aria-label="Default" />
              <IconButton variant="filled" color="neutral" icon={AddIcon} aria-label="Neutral" />
              <IconButton variant="filled" color="success" icon={CheckIcon} aria-label="Success" />
              <IconButton variant="filled" color="warning" icon={WarningIcon} aria-label="Warning" />
              <IconButton variant="filled" color="error" icon={DeleteIcon} aria-label="Error" />
            </div>
          </div>
        </div>
      </div>

      <!-- States Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States</h3>
        <div class="flex items-center gap-4">
          <IconButton variant="outlined" icon={CameraIcon} aria-label="Normal State" />
          <IconButton variant="outlined" icon={CameraIcon} aria-label="Disabled State" disabled />
          <IconButton variant="filled" icon={SendIcon} aria-label="Loading State" loading />
        </div>
      </div>

      <!-- Common Use Cases Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Common Use Cases</h3>
        <div class="space-y-4">
          <!-- Navigation -->
          <div>
            <h4 class="mb-2 text-sm font-medium text-neutral-700">Navigation</h4>
            <div class="flex items-center gap-2">
              <IconButton variant="ghost" color="neutral" icon={ArrowLeftIcon} aria-label="Go back" />
              <IconButton variant="ghost" color="neutral" icon={HamburgerMenuIcon} aria-label="Open menu" />
              <IconButton variant="ghost" color="neutral" icon={ArrowRightIcon} aria-label="Go forward" />
            </div>
          </div>

          <!-- Action Buttons -->
          <div>
            <h4 class="mb-2 text-sm font-medium text-neutral-700">Actions</h4>
            <div class="flex items-center gap-2">
              <IconButton variant="outlined" color="default" icon={AddIcon} aria-label="Add item" />
              <IconButton variant="outlined" color="neutral" icon={EditIcon} aria-label="Edit item" />
              <IconButton variant="outlined" color="error" icon={DeleteIcon} aria-label="Delete item" />
            </div>
          </div>

          <!-- Close Buttons -->
          <div>
            <h4 class="mb-2 text-sm font-medium text-neutral-700">Close Buttons</h4>
            <div class="flex items-center gap-2">
              <IconButton variant="ghost" color="neutral" icon={CloseIcon} aria-label="Close dialog" />
              <IconButton variant="outlined" color="neutral" icon={CloseIcon} aria-label="Close panel" />
            </div>
          </div>

          <!-- Utility Buttons -->
          <div>
            <h4 class="mb-2 text-sm font-medium text-neutral-700">Utility</h4>
            <div class="flex items-center gap-2">
              <IconButton variant="ghost" color="neutral" icon={SearchIcon} aria-label="Search" />
              <IconButton variant="ghost" color="neutral" icon={SettingsIcon} aria-label="Settings" />
              <IconButton variant="filled" color="default" icon={CameraIcon} aria-label="Take photo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <IconButton
      aria-label={args['aria-label'] || 'Icon button'}
      variant={args.variant}
      size={args.size}
      icon={args.icon || CloseIcon}
      iconSize={args.iconSize}
      disabled={args.disabled}
      loading={args.loading}
    />
  {/snippet}
</Story>

<Story name="Ghost Variant" args={{ variant: 'ghost' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-center gap-4">
      <IconButton {...args} icon={SettingsIcon} aria-label="Settings" />
      <IconButton {...args} icon={EditIcon} aria-label="Edit" />
      <IconButton {...args} icon={SearchIcon} aria-label="Search" />
    </div>
  {/snippet}
</Story>

<Story name="Outlined Variant" args={{ variant: 'outlined' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-center gap-4">
      <IconButton {...args} icon={AddIcon} aria-label="Add" />
      <IconButton {...args} icon={EditIcon} aria-label="Edit" />
      <IconButton {...args} icon={DeleteIcon} aria-label="Delete" />
    </div>
  {/snippet}
</Story>

<Story name="Filled Variant" args={{ variant: 'filled' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-center gap-4">
      <IconButton {...args} icon={AddIcon} aria-label="Add" />
      <IconButton {...args} icon={CameraIcon} aria-label="Camera" />
      <IconButton {...args} icon={SendIcon} aria-label="Send" />
    </div>
  {/snippet}
</Story>

<Story name="Neutral Color" args={{ color: 'neutral' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-center gap-4">
      <IconButton {...args} variant="ghost" icon={SettingsIcon} aria-label="Neutral (Ghost)" />
      <IconButton {...args} variant="outlined" icon={SettingsIcon} aria-label="Neutral (Outlined)" />
      <IconButton {...args} variant="filled" icon={SettingsIcon} aria-label="Neutral (Filled)" />
    </div>
  {/snippet}
</Story>

<Story name="Success Color" args={{ color: 'success' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-center gap-4">
      <IconButton {...args} variant="ghost" icon={CheckIcon} aria-label="Success (Ghost)" />
      <IconButton {...args} variant="outlined" icon={CheckIcon} aria-label="Success (Outlined)" />
      <IconButton {...args} variant="filled" icon={CheckIcon} aria-label="Success (Filled)" />
    </div>
  {/snippet}
</Story>

<Story name="Warning Color" args={{ color: 'warning' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-center gap-4">
      <IconButton {...args} variant="ghost" icon={WarningIcon} aria-label="Warning (Ghost)" />
      <IconButton {...args} variant="outlined" icon={WarningIcon} aria-label="Warning (Outlined)" />
      <IconButton {...args} variant="filled" icon={WarningIcon} aria-label="Warning (Filled)" />
    </div>
  {/snippet}
</Story>

<Story name="Error Color" args={{ color: 'error' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-center gap-4">
      <IconButton {...args} variant="ghost" icon={DeleteIcon} aria-label="Error (Ghost)" />
      <IconButton {...args} variant="outlined" icon={DeleteIcon} aria-label="Error (Outlined)" />
      <IconButton {...args} variant="filled" icon={DeleteIcon} aria-label="Error (Filled)" />
    </div>
  {/snippet}
</Story>

<Story name="Small Size" args={{ size: 'small' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-center gap-4">
      <IconButton {...args} variant="ghost" icon={SearchIcon} aria-label="Search" />
      <IconButton {...args} variant="outlined" icon={EditIcon} aria-label="Edit" />
      <IconButton {...args} variant="filled" icon={AddIcon} aria-label="Add" />
    </div>
  {/snippet}
</Story>

<Story name="Medium Size" args={{ size: 'medium' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-center gap-4">
      <IconButton {...args} variant="ghost" icon={SearchIcon} aria-label="Search" />
      <IconButton {...args} variant="outlined" icon={EditIcon} aria-label="Edit" />
      <IconButton {...args} variant="filled" icon={AddIcon} aria-label="Add" />
    </div>
  {/snippet}
</Story>

<Story name="Large Size" args={{ size: 'large' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-center gap-4">
      <IconButton {...args} variant="ghost" icon={SearchIcon} aria-label="Search" />
      <IconButton {...args} variant="outlined" icon={EditIcon} aria-label="Edit" />
      <IconButton {...args} variant="filled" icon={AddIcon} aria-label="Add" />
    </div>
  {/snippet}
</Story>

<Story name="Disabled State" args={{ disabled: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-center gap-4">
      <IconButton {...args} variant="ghost" icon={SettingsIcon} aria-label="Settings (Disabled)" />
      <IconButton {...args} variant="outlined" icon={EditIcon} aria-label="Edit (Disabled)" />
      <IconButton {...args} variant="filled" icon={AddIcon} aria-label="Add (Disabled)" />
      <IconButton {...args} variant="ghost" color="error" icon={DeleteIcon} aria-label="Delete (Disabled)" />
    </div>
  {/snippet}
</Story>

<Story name="Loading State" args={{ loading: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-center gap-4">
      <IconButton {...args} variant="ghost" icon={SendIcon} aria-label="Sending..." />
      <IconButton {...args} variant="filled" icon={SendIcon} aria-label="Sending..." />
    </div>
  {/snippet}
</Story>

<Story name="Interactive Example">
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Photo Gallery Interface</h3>
      <p class="text-neutral-600">A real-world example showing icon buttons in a typical interface.</p>

      <!-- Header with navigation and actions -->
      <div class="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-4">
        <div class="flex items-center gap-2">
          <IconButton variant="ghost" color="neutral" icon={ArrowLeftIcon} aria-label="Go back" />
          <h4 class="text-body-m font-medium">Photo Gallery</h4>
        </div>
        <div class="flex items-center gap-1">
          <IconButton variant="ghost" color="neutral" icon={SearchIcon} aria-label="Search photos" />
          <IconButton variant="ghost" color="neutral" icon={SettingsIcon} aria-label="Gallery settings" />
          <IconButton variant="ghost" color="neutral" icon={HamburgerMenuIcon} aria-label="More options" />
        </div>
      </div>

      <!-- Photo actions -->
      <div class="flex items-center justify-between rounded-lg border border-neutral-200 p-4">
        <div class="flex items-center gap-3">
          <div class="bg-highlight-100 h-16 w-16 rounded-lg"></div>
          <div>
            <p class="text-body-m font-medium">Summer vacation.jpg</p>
            <p class="text-body-s text-neutral-600">2.4 MB • JPG</p>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <IconButton
            variant="ghost"
            icon={isLiked ? HeartFilledIcon : HeartOutlinedIcon}
            aria-label={isLiked ? 'Unlike photo' : 'Like photo'}
            onclick={handleLike}
          />
          <IconButton variant="ghost" color="neutral" icon={EditIcon} aria-label="Edit photo" />
          <IconButton variant="ghost" color="error" icon={DeleteIcon} aria-label="Delete photo" />
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flex gap-3">
        <IconButton
          variant="filled"
          color="default"
          icon={AddIcon}
          aria-label="Add new photo"
          onclick={() => (showExampleModal = true)}
        />
        <IconButton variant="outlined" color="default" icon={CameraIcon} aria-label="Take photo" />
        <IconButton variant="outlined" color="default" icon={SendIcon} aria-label="Share photos" />
      </div>

      <!-- Example modal simulation -->
      {#if showExampleModal}
        <div class="border-highlight-200 bg-highlight-50 rounded-lg border p-4">
          <div class="flex items-start justify-between">
            <div>
              <h5 class="text-body-m font-medium">Add New Photo</h5>
              <p class="text-body-s text-neutral-600">Modal opened successfully!</p>
            </div>
            <IconButton
              variant="ghost"
              color="neutral"
              icon={CloseIcon}
              aria-label="Close modal"
              onclick={() => (showExampleModal = false)}
            />
          </div>
        </div>
      {/if}
    </div>
  {/snippet}
</Story>
