<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Dialog from '@components/feedback/Dialog.svelte'
  import Button from '@components/core/Button.svelte'
  import TextField from '@components/forms/TextField.svelte'
  import TextArea from '@components/forms/TextArea.svelte'

  // State for interactive example
  let showConfirmDialog = $state(false)
  let showSaveDialog = $state(false)
  let showAlertDialog = $state(false)

  const handleDelete = () => {
    showConfirmDialog = false
    showAlertDialog = true
  }

  const handleSave = () => {
    showSaveDialog = false
    showAlertDialog = true
  }

  const { Story } = defineMeta({
    title: 'Feedback/Dialog',
    component: Dialog,
    args: {
      open: false,
      title: 'Dialog Title',
      description: 'This is the dialog description explaining what action is being taken.',
      showTitle: true,
      showDescription: true,
      showCloseButton: true,
      closeOnBackdrop: true,
      closeOnEscape: true,
      primaryButtonText: 'OK',
      secondaryButtonText: 'Cancel',
      tertiaryButtonText: 'Maybe Later',
      primaryButtonVariant: 'primary',
      secondaryButtonVariant: 'secondary',
      tertiaryButtonVariant: 'tertiary',
      showPrimaryButton: true,
      showSecondaryButton: true,
      showTertiaryButton: false,
      disabled: false,
    },
    argTypes: {
      open: {
        control: { type: 'boolean' },
        description: 'Whether the dialog is open',
      },
      title: {
        control: { type: 'text' },
        description: 'Dialog title text',
      },
      description: {
        control: { type: 'text' },
        description: 'Dialog description/body text',
      },
      showTitle: {
        control: { type: 'boolean' },
        description: 'Whether to show the title',
      },
      showDescription: {
        control: { type: 'boolean' },
        description: 'Whether to show the description',
      },
      showCloseButton: {
        control: { type: 'boolean' },
        description: 'Whether to show the close button (X)',
      },
      closeOnBackdrop: {
        control: { type: 'boolean' },
        description: 'Whether clicking backdrop closes dialog',
      },
      closeOnEscape: {
        control: { type: 'boolean' },
        description: 'Whether pressing Escape closes dialog',
      },
      primaryButtonText: {
        control: { type: 'text' },
        description: 'Primary button text',
      },
      secondaryButtonText: {
        control: { type: 'text' },
        description: 'Secondary button text',
      },
      tertiaryButtonText: {
        control: { type: 'text' },
        description: 'Tertiary button text',
      },
      primaryButtonVariant: {
        control: { type: 'select' },
        options: ['primary', 'secondary', 'tertiary'],
        description: 'Primary button variant',
      },
      secondaryButtonVariant: {
        control: { type: 'select' },
        options: ['primary', 'secondary', 'tertiary'],
        description: 'Secondary button variant',
      },
      tertiaryButtonVariant: {
        control: { type: 'select' },
        options: ['primary', 'secondary', 'tertiary'],
        description: 'Tertiary button variant',
      },
      showPrimaryButton: {
        control: { type: 'boolean' },
        description: 'Whether to show primary button',
      },
      showSecondaryButton: {
        control: { type: 'boolean' },
        description: 'Whether to show secondary button',
      },
      showTertiaryButton: {
        control: { type: 'boolean' },
        description: 'Whether to show tertiary button',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      onPrimaryClick: {
        control: false,
        description: 'Primary button click handler',
      },
      onSecondaryClick: {
        control: false,
        description: 'Secondary button click handler',
      },
      onTertiaryClick: {
        control: false,
        description: 'Tertiary button click handler',
      },
      onClose: {
        control: false,
        description: 'Dialog close handler',
      },
    },
  })
</script>

<Story name="Overview" parameters={{ layout: 'full' }}>
  {#snippet template()}
    <div class="space-y-8 p-8">
      <!-- 3-Button Dialog -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">3-Button Dialog</h3>
        <div class="relative h-64 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
          <Dialog
            open={true}
            title="Save Changes"
            description="You have unsaved changes. Would you like to save them before leaving?"
            primaryButtonText="Save"
            secondaryButtonText="Cancel"
            tertiaryButtonText="Don't Save"
            showTertiaryButton={true}
          />
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{ open: true }} parameters={{ layout: 'full' }}>
  {#snippet template(args)}
    <div class="p-8">
      <p class="mb-4 text-sm text-neutral-600">Toggle the "open" control to see the dialog</p>
      <Dialog
        open={args.open}
        title={args.title}
        description={args.description}
        showTitle={args.showTitle}
        showDescription={args.showDescription}
        showCloseButton={args.showCloseButton}
        closeOnBackdrop={args.closeOnBackdrop}
        closeOnEscape={args.closeOnEscape}
        primaryButtonText={args.primaryButtonText}
        secondaryButtonText={args.secondaryButtonText}
        tertiaryButtonText={args.tertiaryButtonText}
        primaryButtonVariant={args.primaryButtonVariant}
        secondaryButtonVariant={args.secondaryButtonVariant}
        tertiaryButtonVariant={args.tertiaryButtonVariant}
        showPrimaryButton={args.showPrimaryButton}
        showSecondaryButton={args.showSecondaryButton}
        showTertiaryButton={args.showTertiaryButton}
        disabled={args.disabled}
        onPrimaryClick={() => console.log('Primary clicked')}
        onSecondaryClick={() => console.log('Secondary clicked')}
        onTertiaryClick={() => console.log('Tertiary clicked')}
        onClose={() => console.log('Dialog closed')}
      />
    </div>
  {/snippet}
</Story>

<Story name="Two Button Dialog" args={{ open: true, showTertiaryButton: false }} parameters={{ layout: 'full' }}>
  {#snippet template(args)}
    <Dialog
      open={args.open}
      title="Confirm Deletion"
      description="Are you sure you want to delete this item? This action cannot be undone."
      primaryButtonText="Delete"
      secondaryButtonText="Cancel"
      showTertiaryButton={false}
      onPrimaryClick={() => console.log('Delete confirmed')}
      onSecondaryClick={() => console.log('Delete cancelled')}
      onClose={() => console.log('Dialog closed')}
    />
  {/snippet}
</Story>

<Story name="Three Button Dialog" args={{ open: true, showTertiaryButton: true }} parameters={{ layout: 'full' }}>
  {#snippet template(args)}
    <Dialog
      open={args.open}
      title="Save Changes"
      description="You have unsaved changes. Would you like to save them before leaving?"
      primaryButtonText="Save"
      secondaryButtonText="Cancel"
      tertiaryButtonText="Don't Save"
      showTertiaryButton={true}
      onPrimaryClick={() => console.log('Save clicked')}
      onSecondaryClick={() => console.log('Cancel clicked')}
      onTertiaryClick={() => console.log("Don't Save clicked")}
      onClose={() => console.log('Dialog closed')}
    />
  {/snippet}
</Story>

<Story name="Alert Dialog" args={{ open: true }} parameters={{ layout: 'full' }}>
  {#snippet template(args)}
    <Dialog
      open={args.open}
      title="Error"
      description="Something went wrong while processing your request. Please try again later."
      primaryButtonText="OK"
      showSecondaryButton={false}
      showTertiaryButton={false}
      onPrimaryClick={() => console.log('OK clicked')}
      onClose={() => console.log('Dialog closed')}
    />
  {/snippet}
</Story>

<Story name="No Close Button" args={{ open: true, showCloseButton: false }} parameters={{ layout: 'full' }}>
  {#snippet template(args)}
    <Dialog
      open={args.open}
      title="Required Action"
      description="You must complete this action to continue."
      showCloseButton={false}
      closeOnBackdrop={false}
      closeOnEscape={false}
      primaryButtonText="Continue"
      showSecondaryButton={false}
      onPrimaryClick={() => console.log('Continue clicked')}
    />
  {/snippet}
</Story>

<Story name="Disabled State" args={{ open: true, disabled: true }} parameters={{ layout: 'full' }}>
  {#snippet template(args)}
    <Dialog
      open={args.open}
      title="Processing..."
      description="Please wait while we process your request."
      primaryButtonText="OK"
      secondaryButtonText="Cancel"
      disabled={true}
      onPrimaryClick={() => console.log('Primary clicked')}
      onSecondaryClick={() => console.log('Secondary clicked')}
      onClose={() => console.log('Dialog closed')}
    />
  {/snippet}
</Story>

<Story name="Custom Content" args={{ open: true }} parameters={{ layout: 'full' }}>
  {#snippet template(args)}
    <Dialog
      open={args.open}
      primaryButtonText="Submit"
      secondaryButtonText="Cancel"
      onPrimaryClick={() => console.log('Submit clicked')}
      onSecondaryClick={() => console.log('Cancel clicked')}
      onClose={() => console.log('Dialog closed')}
    >
      {#snippet children()}
        <div class="space-y-4">
          <h2 class="text-h3 font-semibold text-neutral-900">Contact Form</h2>
          <div class="space-y-3">
            <TextField label="Name" placeholder="Your name" showLabel={false} />
            <TextField label="Email" type="email" placeholder="Your email" showLabel={false} />
            <TextArea label="Message" placeholder="Your message" rows={3} showLabel={false} />
          </div>
        </div>
      {/snippet}
    </Dialog>
  {/snippet}
</Story>

<Story name="Interactive Example" args={{}} parameters={{ layout: 'full' }}>
  {#snippet template()}
    <div class="space-y-4 p-8">
      <h3 class="mb-4 text-lg font-medium">Dialog Examples</h3>

      <div class="space-y-3">
        <Button onclick={() => (showConfirmDialog = true)}>
          {#snippet children()}Show Confirmation Dialog{/snippet}
        </Button>

        <Button onclick={() => (showSaveDialog = true)}>
          {#snippet children()}Show Save Dialog{/snippet}
        </Button>

        <Button onclick={() => (showAlertDialog = true)}>
          {#snippet children()}Show Alert Dialog{/snippet}
        </Button>
      </div>

      <!-- Confirmation Dialog -->
      <Dialog
        open={showConfirmDialog}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onPrimaryClick={handleDelete}
        onSecondaryClick={() => (showConfirmDialog = false)}
        onClose={() => (showConfirmDialog = false)}
      />

      <!-- Save Dialog -->
      <Dialog
        open={showSaveDialog}
        title="Unsaved Changes"
        description="You have unsaved changes. Would you like to save them before leaving?"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        tertiaryButtonText="Don't Save"
        showTertiaryButton={true}
        onPrimaryClick={handleSave}
        onSecondaryClick={() => (showSaveDialog = false)}
        onTertiaryClick={() => (showSaveDialog = false)}
        onClose={() => (showSaveDialog = false)}
      />

      <!-- Alert Dialog -->
      <Dialog
        open={showAlertDialog}
        title="Success"
        description="Your action has been completed successfully."
        primaryButtonText="OK"
        showSecondaryButton={false}
        onPrimaryClick={() => (showAlertDialog = false)}
        onClose={() => (showAlertDialog = false)}
      />
    </div>
  {/snippet}
</Story>
