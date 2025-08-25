<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Banner from '@ui/components/content/Banner.svelte'

  const { Story } = defineMeta({
    title: 'Content/Banner',
    component: Banner,
    args: {
      title: 'Banner Title',
      description: 'This is a description of the banner content that provides additional context.',
      buttonText: 'Button',
      showTitle: true,
      showDescription: true,
      showButton: true,
      showImage: true,
      variant: 'default',
      disabled: false,
    },
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['default', 'info', 'success', 'warning', 'error'],
        description: 'Visual variant of the banner',
      },
      title: {
        control: { type: 'text' },
        description: 'Main title text displayed prominently',
      },
      description: {
        control: { type: 'text' },
        description: 'Supporting description text',
      },
      buttonText: {
        control: { type: 'text' },
        description: 'Text displayed on the action button',
      },
      image: {
        control: { type: 'text' },
        description: 'Image source URL for supporting visual',
      },
      imageAlt: {
        control: { type: 'text' },
        description: 'Alt text for the image',
      },
      showTitle: {
        control: { type: 'boolean' },
        description: 'Whether to show the title',
      },
      showDescription: {
        control: { type: 'boolean' },
        description: 'Whether to show the description',
      },
      showButton: {
        control: { type: 'boolean' },
        description: 'Whether to show the action button',
      },
      showImage: {
        control: { type: 'boolean' },
        description: 'Whether to show the image',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      onButtonClick: {
        control: false,
        description: 'Called when the action button is clicked',
      },
      onBannerClick: {
        control: false,
        description: 'Called when the banner itself is clicked',
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
          <Banner
            title="Default Banner"
            description="This is a default banner with neutral styling for general information."
            buttonText="Action"
            variant="default"
          />
          <Banner
            title="Info Banner"
            description="This is an informational banner with blue styling for helpful tips."
            buttonText="Learn More"
            variant="info"
          />
          <Banner
            title="Success Banner"
            description="This is a success banner with green styling for positive feedback."
            buttonText="Continue"
            variant="success"
          />
          <Banner
            title="Warning Banner"
            description="This is a warning banner with orange styling for cautionary messages."
            buttonText="Review"
            variant="warning"
          />
          <Banner
            title="Error Banner"
            description="This is an error banner with red styling for critical issues."
            buttonText="Fix Issues"
            variant="error"
          />
        </div>
      </div>

      <!-- Configuration Options -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Configuration Options</h3>
        <div class="space-y-4">
          <Banner
            title="With Image"
            description="Banner with image placeholder shown on the right side."
            buttonText="View Details"
            showImage={true}
          />
          <Banner
            title="Without Image"
            description="Banner without image, showing only text content and button."
            buttonText="Continue"
            showImage={false}
          />
          <Banner
            title="Title Only"
            description="This description is hidden"
            buttonText="This button is hidden"
            showDescription={false}
            showButton={false}
          />
          <Banner
            title="Without Button"
            description="Banner that only displays information without any action button."
            showButton={false}
          />
        </div>
      </div>

      <!-- Interactive States -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States</h3>
        <div class="space-y-4">
          <Banner
            title="Clickable Banner"
            description="This entire banner can be clicked and has hover effects."
            buttonText="Secondary Action"
            onBannerClick={() => console.log('Banner clicked')}
          />
          <Banner
            title="Disabled Banner"
            description="This banner is disabled and cannot be interacted with."
            buttonText="Disabled"
            disabled={true}
          />
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Banner
      title={args.title || 'Banner Title'}
      description={args.description}
      buttonText={args.buttonText}
      image={args.image}
      imageAlt={args.imageAlt}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showButton={args.showButton}
      showImage={args.showImage}
      variant={args.variant}
      disabled={args.disabled}
      onButtonClick={args.onButtonClick}
      onBannerClick={args.onBannerClick}
    />
  {/snippet}
</Story>

<Story
  name="Info Variant"
  args={{
    variant: 'info',
    title: 'Information Notice',
    description: 'Here is some helpful information for you to review.',
    buttonText: 'Learn More',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Banner
      title={args.title || 'Banner Title'}
      description={args.description}
      buttonText={args.buttonText}
      image={args.image}
      imageAlt={args.imageAlt}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showButton={args.showButton}
      showImage={args.showImage}
      variant={args.variant}
      disabled={args.disabled}
      onButtonClick={args.onButtonClick}
      onBannerClick={args.onBannerClick}
    />
  {/snippet}
</Story>

<Story
  name="Success Variant"
  args={{
    variant: 'success',
    title: 'Success!',
    description: 'Your action was completed successfully.',
    buttonText: 'Continue',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Banner
      title={args.title || 'Banner Title'}
      description={args.description}
      buttonText={args.buttonText}
      image={args.image}
      imageAlt={args.imageAlt}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showButton={args.showButton}
      showImage={args.showImage}
      variant={args.variant}
      disabled={args.disabled}
      onButtonClick={args.onButtonClick}
      onBannerClick={args.onBannerClick}
    />
  {/snippet}
</Story>

<Story
  name="Warning Variant"
  args={{
    variant: 'warning',
    title: 'Warning',
    description: 'Please review the following before proceeding.',
    buttonText: 'Review',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Banner
      title={args.title || 'Banner Title'}
      description={args.description}
      buttonText={args.buttonText}
      image={args.image}
      imageAlt={args.imageAlt}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showButton={args.showButton}
      showImage={args.showImage}
      variant={args.variant}
      disabled={args.disabled}
      onButtonClick={args.onButtonClick}
      onBannerClick={args.onBannerClick}
    />
  {/snippet}
</Story>

<Story
  name="Error Variant"
  args={{
    variant: 'error',
    title: 'Error Occurred',
    description: 'There was an issue that needs your attention.',
    buttonText: 'Fix Issues',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Banner
      title={args.title || 'Banner Title'}
      description={args.description}
      buttonText={args.buttonText}
      image={args.image}
      imageAlt={args.imageAlt}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showButton={args.showButton}
      showImage={args.showImage}
      variant={args.variant}
      disabled={args.disabled}
      onButtonClick={args.onButtonClick}
      onBannerClick={args.onBannerClick}
    />
  {/snippet}
</Story>

<Story name="Without Image" args={{ showImage: false }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Banner
      title={args.title || 'Banner Title'}
      description={args.description}
      buttonText={args.buttonText}
      image={args.image}
      imageAlt={args.imageAlt}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showButton={args.showButton}
      showImage={args.showImage}
      variant={args.variant}
      disabled={args.disabled}
      onButtonClick={args.onButtonClick}
      onBannerClick={args.onBannerClick}
    />
  {/snippet}
</Story>

<Story name="Without Button" args={{ showButton: false }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Banner
      title={args.title || 'Banner Title'}
      description={args.description}
      buttonText={args.buttonText}
      image={args.image}
      imageAlt={args.imageAlt}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showButton={args.showButton}
      showImage={args.showImage}
      variant={args.variant}
      disabled={args.disabled}
      onButtonClick={args.onButtonClick}
      onBannerClick={args.onBannerClick}
    />
  {/snippet}
</Story>

<Story
  name="Title Only"
  args={{
    showDescription: false,
    showButton: false,
    showImage: false,
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Banner
      title={args.title || 'Banner Title'}
      description={args.description}
      buttonText={args.buttonText}
      image={args.image}
      imageAlt={args.imageAlt}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showButton={args.showButton}
      showImage={args.showImage}
      variant={args.variant}
      disabled={args.disabled}
      onButtonClick={args.onButtonClick}
      onBannerClick={args.onBannerClick}
    />
  {/snippet}
</Story>

<Story
  name="With Custom Image"
  args={{
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=center',
    imageAlt: 'Sample image',
    title: 'Banner with Image',
    description: 'This banner includes a custom image from an external source.',
  }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <Banner
      title={args.title || 'Banner Title'}
      description={args.description}
      buttonText={args.buttonText}
      image={args.image}
      imageAlt={args.imageAlt}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showButton={args.showButton}
      showImage={args.showImage}
      variant={args.variant}
      disabled={args.disabled}
      onButtonClick={args.onButtonClick}
      onBannerClick={args.onBannerClick}
    />
  {/snippet}
</Story>

<Story name="Interactive Example" args={{}} parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-6">
      <h3 class="text-lg font-medium">Interactive Banner Example</h3>

      <Banner
        title="Notification Settings"
        description="You can customize how you receive notifications and updates from the platform."
        buttonText="Manage Settings"
        variant="info"
        onButtonClick={() => console.log('Button clicked: Managing settings')}
        onBannerClick={() => console.log('Banner clicked: Opening notification settings')}
      />

      <Banner
        title="Action Required"
        description="Please complete your profile to unlock all platform features."
        buttonText="Complete Profile"
        variant="warning"
        onButtonClick={() => console.log('Button clicked: Completing profile')}
      />

      <Banner
        title="Welcome!"
        description="Thank you for joining our platform. Get started by exploring the features below."
        buttonText="Get Started"
        variant="success"
        showImage={false}
        onButtonClick={() => console.log('Button clicked: Getting started')}
      />
    </div>
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Banner
      title={args.title || 'Banner Title'}
      description={args.description}
      buttonText={args.buttonText}
      image={args.image}
      imageAlt={args.imageAlt}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showButton={args.showButton}
      showImage={args.showImage}
      variant={args.variant}
      disabled={args.disabled}
      onButtonClick={args.onButtonClick}
      onBannerClick={args.onBannerClick}
    />
  {/snippet}
</Story>
