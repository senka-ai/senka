<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import ActionSheet from '../lib/components/controls/ActionSheet.svelte'
  import ListItem from '../lib/components/layout/ListItem.svelte'
  import Button from '../lib/components/core/Button.svelte'
  import { AddIcon, EditIcon, DeleteIcon, SendIcon, CameraIcon, ImageIcon, SettingsIcon } from '../lib/icons'

  // State for interactive examples
  let showBasicSheet = $state(false)
  let showOptionsSheet = $state(false)
  let showDestructiveSheet = $state(false)
  let showTopSheet = $state(true)
  let showPhotoSheet = $state(false)

  const handleBasicAction = (action: string) => {
    console.log('Action selected:', action)
    showBasicSheet = false
    showOptionsSheet = false
    showDestructiveSheet = false
    showTopSheet = false
    showPhotoSheet = false
  }

  const { Story } = defineMeta({
    title: 'Controls/ActionSheet',
    component: ActionSheet,
    args: {
      open: false,
      title: 'Action Sheet Title',
      showCloseButton: true,
      position: 'bottom',
      animationSpeed: 'normal',
      closeOnOutsideClick: true,
      closeOnEscape: true,
      disabled: false,
    },
    argTypes: {
      open: {
        control: { type: 'boolean' },
        description: 'Whether the action sheet is open/visible',
      },
      title: {
        control: { type: 'text' },
        description: 'Action sheet title',
      },
      showCloseButton: {
        control: { type: 'boolean' },
        description: 'Whether to show the close button',
      },
      position: {
        control: { type: 'select' },
        options: ['bottom', 'top'],
        description: 'Position of the action sheet',
      },
      animationSpeed: {
        control: { type: 'select' },
        options: ['slow', 'normal', 'fast'],
        description: 'Animation speed',
      },
      closeOnOutsideClick: {
        control: { type: 'boolean' },
        description: 'Whether clicking outside closes the sheet',
      },
      closeOnEscape: {
        control: { type: 'boolean' },
        description: 'Whether pressing escape closes the sheet',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      onClose: {
        control: false,
        description: 'Function called when the action sheet should be closed',
      },
    },
  })
</script>

<Story name="Overview" parameters={{ layout: 'wide' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Positions Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Positions</h3>
        <div class="flex items-start gap-4">
          <Button onclick={() => (showBasicSheet = true)}>
            {#snippet children()}Bottom Sheet{/snippet}
          </Button>
          <Button onclick={() => (showTopSheet = true)}>
            {#snippet children()}Top Sheet{/snippet}
          </Button>
        </div>
      </div>

      <!-- Content Variants Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Content Types</h3>
        <div class="flex items-start gap-4">
          <Button variant="secondary" onclick={() => (showOptionsSheet = true)}>
            {#snippet children()}Options Menu{/snippet}
          </Button>
          <Button variant="secondary" onclick={() => (showDestructiveSheet = true)}>
            {#snippet children()}With Destructive Action{/snippet}
          </Button>
          <Button variant="secondary" onclick={() => (showPhotoSheet = true)}>
            {#snippet children()}Photo Actions{/snippet}
          </Button>
        </div>
      </div>

      <!-- Example Use Cases -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Common Use Cases</h3>
        <div class="space-y-2 text-sm text-neutral-600">
          <p>• Share actions (Copy link, Send email, Post to social)</p>
          <p>• Photo actions (Camera, Gallery, Remove)</p>
          <p>• Edit actions (Edit, Duplicate, Delete)</p>
          <p>• Export options (PDF, Excel, Print)</p>
        </div>
      </div>
    </div>

    <!-- Basic Bottom Sheet -->
    <ActionSheet open={showBasicSheet} title="Choose Action" onClose={() => (showBasicSheet = false)}>
      {#snippet children()}
        <div class="space-y-1">
          <ListItem
            title="Edit"
            description="Make changes to this item"
            leftIcon={EditIcon}
            clickable={true}
            onclick={() => handleBasicAction('edit')}
          />
          <ListItem
            title="Share"
            description="Share with others"
            leftIcon={SendIcon}
            clickable={true}
            onclick={() => handleBasicAction('share')}
          />
          <ListItem
            title="Add to Collection"
            leftIcon={AddIcon}
            clickable={true}
            onclick={() => handleBasicAction('add')}
          />
        </div>
      {/snippet}
    </ActionSheet>

    <!-- Top Position Sheet -->
    <ActionSheet open={showTopSheet} title="Top Action Sheet" position="top" onClose={() => (showTopSheet = false)}>
      {#snippet children()}
        <div class="space-y-1">
          <ListItem title="Top Action 1" clickable={true} onclick={() => handleBasicAction('top1')} />
          <ListItem title="Top Action 2" clickable={true} onclick={() => handleBasicAction('top2')} />
        </div>
      {/snippet}
    </ActionSheet>

    <!-- Options Menu Sheet -->
    <ActionSheet open={showOptionsSheet} title="More Options" onClose={() => (showOptionsSheet = false)}>
      {#snippet children()}
        <div class="space-y-1">
          <ListItem
            title="Settings"
            description="Preferences and configuration"
            clickable={true}
            onclick={() => handleBasicAction('settings')}
          />
          <ListItem
            title="Help"
            description="Get support and documentation"
            clickable={true}
            onclick={() => handleBasicAction('help')}
          />
          <ListItem title="About" clickable={true} onclick={() => handleBasicAction('about')} />
        </div>
      {/snippet}
    </ActionSheet>

    <!-- Destructive Action Sheet -->
    <ActionSheet open={showDestructiveSheet} title="Confirm Action" onClose={() => (showDestructiveSheet = false)}>
      {#snippet children()}
        <div class="space-y-1">
          <ListItem title="Edit Item" leftIcon={EditIcon} clickable={true} onclick={() => handleBasicAction('edit')} />
          <ListItem
            title="Delete Item"
            description="This action cannot be undone"
            leftIcon={DeleteIcon}
            class="text-error-600"
            clickable={true}
            onclick={() => handleBasicAction('delete')}
          />
        </div>
      {/snippet}
    </ActionSheet>

    <!-- Photo Actions Sheet -->
    <ActionSheet open={showPhotoSheet} title="Choose Photo Source" onClose={() => (showPhotoSheet = false)}>
      {#snippet children()}
        <div class="space-y-1">
          <ListItem
            title="Take Photo"
            description="Use camera to take a new photo"
            leftIcon={CameraIcon}
            clickable={true}
            onclick={() => handleBasicAction('camera')}
          />
          <ListItem
            title="Choose from Gallery"
            description="Select existing photo"
            leftIcon={ImageIcon}
            clickable={true}
            onclick={() => handleBasicAction('gallery')}
          />
        </div>
      {/snippet}
    </ActionSheet>
  {/snippet}
</Story>

<Story name="Default" args={{ open: true, position: 'bottom' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ActionSheet
      open={args.open}
      title="Bottom Action Sheet"
      position={args.position}
      onClose={() => console.log('Close')}
    >
      {#snippet children()}
        <div class="space-y-1">
          <ListItem
            title="Bottom Action"
            description="This sheet slides up from bottom"
            clickable={true}
            onclick={() => console.log('Bottom action')}
          />
        </div>
      {/snippet}
    </ActionSheet>
  {/snippet}
</Story>

<Story name="Top Position" args={{ open: true, position: 'top' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ActionSheet
      open={args.open}
      title="Top Action Sheet"
      position={args.position}
      onClose={() => console.log('Close')}
    >
      {#snippet children()}
        <div class="space-y-1">
          <ListItem
            title="Top Action"
            description="This sheet slides down from top"
            clickable={true}
            onclick={() => console.log('Top action')}
          />
        </div>
      {/snippet}
    </ActionSheet>
  {/snippet}
</Story>

<Story name="With Icons" args={{ open: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ActionSheet open={args.open} title="Actions with Icons" onClose={() => console.log('Close')}>
      {#snippet children()}
        <div class="space-y-1">
          <ListItem
            title="Edit"
            description="Make changes to this item"
            leftIcon={EditIcon}
            clickable={true}
            onclick={() => console.log('Edit')}
          />
          <ListItem
            title="Share"
            description="Share with others"
            leftIcon={SendIcon}
            clickable={true}
            onclick={() => console.log('Share')}
          />
          <ListItem
            title="Delete"
            description="Remove this item"
            leftIcon={DeleteIcon}
            class="text-error-600"
            clickable={true}
            onclick={() => console.log('Delete')}
          />
        </div>
      {/snippet}
    </ActionSheet>
  {/snippet}
</Story>

<Story name="Destructive Actions" args={{ open: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ActionSheet open={args.open} title="Confirm Action" onClose={() => console.log('Close')}>
      {#snippet children()}
        <div class="space-y-1">
          <ListItem title="Edit Item" leftIcon={EditIcon} clickable={true} onclick={() => console.log('Edit')} />
          <ListItem
            title="Delete Item"
            description="This action cannot be undone"
            leftIcon={DeleteIcon}
            class="text-error-600"
            clickable={true}
            onclick={() => console.log('Delete')}
          />
        </div>
      {/snippet}
    </ActionSheet>
  {/snippet}
</Story>

<Story name="Without Close Button" args={{ open: true, showCloseButton: false }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ActionSheet
      open={args.open}
      title="No Close Button"
      showCloseButton={args.showCloseButton}
      onClose={() => console.log('Close')}
    >
      {#snippet children()}
        <div class="space-y-1">
          <ListItem title="Action 1" clickable={true} onclick={() => console.log('Action 1')} />
          <ListItem title="Cancel" clickable={true} onclick={() => console.log('Cancel')} />
        </div>
      {/snippet}
    </ActionSheet>
  {/snippet}
</Story>

<Story name="Animation Speeds" args={{ open: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="space-y-4">
      <p class="text-sm text-neutral-600">Action sheets with different animation speeds (use controls to test)</p>
      <ActionSheet
        open={args.open}
        title="Animation Speed Test"
        animationSpeed={args.animationSpeed || 'normal'}
        onClose={() => console.log('Close')}
      >
        {#snippet children()}
          <div class="space-y-1">
            <ListItem
              title="Test Action"
              description={`Animation speed: ${args.animationSpeed || 'normal'}`}
              clickable={true}
              onclick={() => console.log('Test action')}
            />
          </div>
        {/snippet}
      </ActionSheet>
    </div>
  {/snippet}
</Story>

<Story name="Interactive Example">
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Photo Management</h3>
      <p class="text-neutral-600">A real-world example of using action sheets for photo management actions.</p>

      <div class="space-y-3">
        <Button variant="primary" fullWidth leftIcon={CameraIcon} onclick={() => (showPhotoSheet = true)}>
          {#snippet children()}Add Photo{/snippet}
        </Button>

        <Button variant="secondary" fullWidth leftIcon={SettingsIcon} onclick={() => (showOptionsSheet = true)}>
          {#snippet children()}More Options{/snippet}
        </Button>
      </div>

      <!-- Photo Action Sheet -->
      <ActionSheet open={showPhotoSheet} title="Add Photo" onClose={() => (showPhotoSheet = false)}>
        {#snippet children()}
          <div class="space-y-1">
            <ListItem
              title="Take Photo"
              description="Use camera to take a new photo"
              leftIcon={CameraIcon}
              clickable={true}
              onclick={() => handleBasicAction('camera')}
            />
            <ListItem
              title="Choose from Gallery"
              description="Select from existing photos"
              leftIcon={ImageIcon}
              clickable={true}
              onclick={() => handleBasicAction('gallery')}
            />
          </div>
        {/snippet}
      </ActionSheet>

      <!-- Options Action Sheet -->
      <ActionSheet open={showOptionsSheet} title="Photo Options" onClose={() => (showOptionsSheet = false)}>
        {#snippet children()}
          <div class="space-y-1">
            <ListItem
              title="Share Album"
              description="Share with friends and family"
              leftIcon={SendIcon}
              clickable={true}
              onclick={() => handleBasicAction('share')}
            />
            <ListItem
              title="Export Photos"
              description="Download all photos"
              clickable={true}
              onclick={() => handleBasicAction('export')}
            />
            <ListItem
              title="Delete Album"
              description="This will remove all photos"
              leftIcon={DeleteIcon}
              class="text-error-600"
              clickable={true}
              onclick={() => handleBasicAction('delete')}
            />
          </div>
        {/snippet}
      </ActionSheet>
    </div>
  {/snippet}
</Story>
