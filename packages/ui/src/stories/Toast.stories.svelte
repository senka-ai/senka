<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Toast from '@components/feedback/Toast.svelte'

  const { Story } = defineMeta({
    title: 'Feedback/Toast',
    component: Toast,
    args: {
      title: 'Title',
      description: 'Description. Lorem ipsum dolor sit amet.',
      showTitle: true,
      showDescription: true,
      showCloseButton: true,
      showBorder: false,
      dismissible: true,
      duration: 0,
      variant: 'info',
      disabled: false,
    },
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['info', 'success', 'warning', 'error'],
        description: 'Visual variant of the toast',
      },
      title: {
        control: { type: 'text' },
        description: 'Main title text displayed prominently',
      },
      description: {
        control: { type: 'text' },
        description: 'Supporting description text',
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
        description: 'Whether to show the close button',
      },
      showBorder: {
        control: { type: 'boolean' },
        description: 'Whether to show a border around the toast',
      },
      dismissible: {
        control: { type: 'boolean' },
        description: 'Whether the toast is dismissible',
      },
      duration: {
        control: { type: 'number', min: 0, max: 10000, step: 500 },
        description: 'Auto-dismiss duration in milliseconds (0 = no auto-dismiss)',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      onClose: {
        control: false,
        description: 'Called when the close button is clicked',
      },
      onDismiss: {
        control: false,
        description: 'Called when the toast is dismissed',
      },
    },
  })
</script>

<Story name="Overview" parameters={{ layout: 'compact' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Variants Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Variants</h3>
        <div class="space-y-4">
          <Toast title="Info" description="This is an informational toast with helpful details." variant="info" />
          <Toast
            title="Success"
            description="Action completed successfully. Everything worked as expected."
            variant="success"
          />
          <Toast
            title="Warning"
            description="Please review this information before proceeding further."
            variant="warning"
          />
          <Toast title="Error" description="There was an issue that needs your immediate attention." variant="error" />
        </div>
      </div>

      <!-- Configuration Options -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Configuration Options</h3>
        <div class="space-y-4">
          <Toast
            title="With Border"
            description="This toast includes a border around the container."
            showBorder={true}
            variant="info"
          />
          <Toast
            title="Title Only"
            description="This description is hidden"
            showDescription={false}
            variant="success"
          />
          <Toast
            title="Without Close Button"
            description="This toast cannot be manually dismissed."
            showCloseButton={false}
            variant="warning"
          />
          <Toast
            title="Description Only"
            description="This toast shows only the description text without a title."
            showTitle={false}
            variant="error"
          />
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Toast
      title={args.title || 'Title'}
      description={args.description}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showCloseButton={args.showCloseButton}
      showBorder={args.showBorder}
      dismissible={args.dismissible}
      duration={args.duration}
      variant={args.variant}
      disabled={args.disabled}
      onClose={args.onClose}
      onDismiss={args.onDismiss}
    />
  {/snippet}
</Story>

<Story
  name="Info Variant"
  args={{
    variant: 'info',
    title: 'Information',
    description: 'Here is some helpful information for you to review.',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Toast
      title={args.title || 'Title'}
      description={args.description}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showCloseButton={args.showCloseButton}
      showBorder={args.showBorder}
      dismissible={args.dismissible}
      duration={args.duration}
      variant={args.variant}
      disabled={args.disabled}
      onClose={args.onClose}
      onDismiss={args.onDismiss}
    />
  {/snippet}
</Story>

<Story
  name="Success Variant"
  args={{
    variant: 'success',
    title: 'Success!',
    description: 'Your action was completed successfully.',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Toast
      title={args.title || 'Title'}
      description={args.description}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showCloseButton={args.showCloseButton}
      showBorder={args.showBorder}
      dismissible={args.dismissible}
      duration={args.duration}
      variant={args.variant}
      disabled={args.disabled}
      onClose={args.onClose}
      onDismiss={args.onDismiss}
    />
  {/snippet}
</Story>

<Story
  name="Warning Variant"
  args={{
    variant: 'warning',
    title: 'Warning',
    description: 'Please review the following before proceeding.',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Toast
      title={args.title || 'Title'}
      description={args.description}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showCloseButton={args.showCloseButton}
      showBorder={args.showBorder}
      dismissible={args.dismissible}
      duration={args.duration}
      variant={args.variant}
      disabled={args.disabled}
      onClose={args.onClose}
      onDismiss={args.onDismiss}
    />
  {/snippet}
</Story>

<Story
  name="Error Variant"
  args={{
    variant: 'error',
    title: 'Error Occurred',
    description: 'There was an issue that needs your attention.',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Toast
      title={args.title || 'Title'}
      description={args.description}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showCloseButton={args.showCloseButton}
      showBorder={args.showBorder}
      dismissible={args.dismissible}
      duration={args.duration}
      variant={args.variant}
      disabled={args.disabled}
      onClose={args.onClose}
      onDismiss={args.onDismiss}
    />
  {/snippet}
</Story>

<Story
  name="Title Only"
  args={{
    showDescription: false,
    title: 'Simple Title Toast',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Toast
      title={args.title || 'Title'}
      description={args.description}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showCloseButton={args.showCloseButton}
      showBorder={args.showBorder}
      dismissible={args.dismissible}
      duration={args.duration}
      variant={args.variant}
      disabled={args.disabled}
      onClose={args.onClose}
      onDismiss={args.onDismiss}
    />
  {/snippet}
</Story>

<Story
  name="Description Only"
  args={{
    showTitle: false,
    description: 'This toast shows only description text without a title.',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Toast
      title={args.title || 'Title'}
      description={args.description}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showCloseButton={args.showCloseButton}
      showBorder={args.showBorder}
      dismissible={args.dismissible}
      duration={args.duration}
      variant={args.variant}
      disabled={args.disabled}
      onClose={args.onClose}
      onDismiss={args.onDismiss}
    />
  {/snippet}
</Story>

<Story
  name="Without Close Button"
  args={{
    showCloseButton: false,
    title: 'Persistent Toast',
    description: 'This toast cannot be manually dismissed.',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Toast
      title={args.title || 'Title'}
      description={args.description}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showCloseButton={args.showCloseButton}
      showBorder={args.showBorder}
      dismissible={args.dismissible}
      duration={args.duration}
      variant={args.variant}
      disabled={args.disabled}
      onClose={args.onClose}
      onDismiss={args.onDismiss}
    />
  {/snippet}
</Story>

<Story
  name="With Border"
  args={{
    showBorder: true,
    title: 'Bordered Toast',
    description: 'This toast includes a border for additional emphasis.',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Toast
      title={args.title || 'Title'}
      description={args.description}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showCloseButton={args.showCloseButton}
      showBorder={args.showBorder}
      dismissible={args.dismissible}
      duration={args.duration}
      variant={args.variant}
      disabled={args.disabled}
      onClose={args.onClose}
      onDismiss={args.onDismiss}
    />
  {/snippet}
</Story>

<Story
  name="Auto Dismiss"
  args={{
    duration: 3000,
    title: 'Auto Dismiss Toast',
    description: 'This toast will automatically disappear after 3 seconds.',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Toast
      title={args.title || 'Title'}
      description={args.description}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showCloseButton={args.showCloseButton}
      showBorder={args.showBorder}
      dismissible={args.dismissible}
      duration={args.duration}
      variant={args.variant}
      disabled={args.disabled}
      onClose={args.onClose}
      onDismiss={args.onDismiss}
    />
  {/snippet}
</Story>

<Story name="Interactive Example" args={{}} parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-6">
      <h3 class="text-lg font-medium">Interactive Toast Examples</h3>

      <Toast
        title="Welcome!"
        description="Thanks for joining our platform. You can dismiss this notification."
        variant="success"
        onClose={() => console.log('Welcome toast closed')}
        onDismiss={() => console.log('Welcome toast dismissed')}
      />

      <Toast
        title="Action Required"
        description="Please verify your email address to continue using all features."
        variant="warning"
        onClose={() => console.log('Warning toast closed')}
        onDismiss={() => console.log('Warning toast dismissed')}
      />

      <Toast
        title="Connection Issues"
        description="We're experiencing some connectivity issues. Please try again later."
        variant="error"
        onClose={() => console.log('Error toast closed')}
        onDismiss={() => console.log('Error toast dismissed')}
      />
    </div>
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Toast
      title={args.title || 'Title'}
      description={args.description}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showCloseButton={args.showCloseButton}
      showBorder={args.showBorder}
      dismissible={args.dismissible}
      duration={args.duration}
      variant={args.variant}
      disabled={args.disabled}
      onClose={args.onClose}
      onDismiss={args.onDismiss}
    />
  {/snippet}
</Story>
