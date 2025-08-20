<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import CardHorizontal from '@components/content/CardHorizontal.svelte'
  import { ChatIcon, ProfileIcon, HeartFilledIcon } from '@icons'

  const { Story } = defineMeta({
    title: 'Content/CardHorizontal',
    component: CardHorizontal,
    args: {
      title: 'Title',
      subtitle: 'Subtitle',
      iconType: 'image',
      buttonText: 'Button',
      showAction: true,
      actionType: 'button',
      disabled: false,
    },
    argTypes: {
      iconType: {
        control: { type: 'select' },
        options: ['image', 'custom'],
        description: 'Type of icon to display',
      },
      actionType: {
        control: { type: 'select' },
        options: ['button', 'arrow'],
        description: 'Type of action element',
      },
      showAction: {
        control: { type: 'boolean' },
        description: 'Show action element',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
    },
  })
</script>

<Story name="Overview" args={{}} parameters={{ layout: 'wide' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Basic Variants -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Basic Variants</h3>
        <div class="grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p class="text-body-s text-secondary mb-2">With Button Action</p>
            <CardHorizontal
              title="Product Name"
              subtitle="Product description"
              buttonText="Add to Cart"
              showAction={true}
              actionType="button"
            />
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">With Arrow Action</p>
            <CardHorizontal
              title="Navigate Item"
              subtitle="Click to view details"
              showAction={true}
              actionType="arrow"
            />
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">No Action</p>
            <CardHorizontal title="Information Only" subtitle="Read-only content" showAction={false} />
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">Disabled</p>
            <CardHorizontal title="Disabled Item" subtitle="Not available" buttonText="Unavailable" disabled={true} />
          </div>
        </div>
      </div>

      <!-- With Image -->
      <div>
        <h3 class="text-h4 text-primary mb-4">With Image</h3>
        <div>
          <CardHorizontal
            title="Profile Card"
            subtitle="User information"
            image="https://picsum.photos/80/80"
            imageAlt="Profile picture"
            buttonText="View Profile"
            showAction={true}
            actionType="button"
          />
        </div>
      </div>

      <!-- With Custom Icons -->
      <div>
        <h3 class="text-h4 text-primary mb-4">With Custom Icons</h3>
        <div class="max-w-md space-y-4">
          <CardHorizontal title="Favorite Item" subtitle="Added to favorites" iconType="custom" showAction={false}>
            <HeartFilledIcon class="h-6 w-6 text-red-500" />
          </CardHorizontal>
          <CardHorizontal
            title="User Profile"
            subtitle="Account settings"
            iconType="custom"
            actionType="arrow"
            showAction={true}
          >
            <ProfileIcon class="h-6 w-6 text-blue-500" />
          </CardHorizontal>
          <CardHorizontal
            title="Chat Message"
            subtitle="New conversation"
            iconType="custom"
            buttonText="Reply"
            showAction={true}
            actionType="button"
          >
            <ChatIcon class="h-6 w-6 text-green-500" />
          </CardHorizontal>
        </div>
      </div>

      <!-- Real World Examples -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Real World Examples</h3>
        <div class="max-w-lg space-y-4">
          <CardHorizontal
            title="John Doe"
            subtitle="Software Engineer • Online"
            image="https://picsum.photos/80/80?random=1"
            imageAlt="John Doe"
            actionType="arrow"
            showAction={true}
          />
          <CardHorizontal
            title="Design System"
            subtitle="Updated 2 hours ago"
            iconType="custom"
            buttonText="Open"
            showAction={true}
            actionType="button"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
              </svg>
            </div>
          </CardHorizontal>
          <CardHorizontal
            title="Meeting Reminder"
            subtitle="Team standup in 15 minutes"
            iconType="custom"
            showAction={false}
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </CardHorizontal>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <CardHorizontal
      title={args.title || 'Title'}
      subtitle={args.subtitle}
      image={args.image}
      imageAlt={args.imageAlt}
      iconType={args.iconType || 'image'}
      buttonText={args.buttonText}
      showAction={args.showAction ?? true}
      actionType={args.actionType || 'button'}
      iconColor={args.iconColor}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onclick={args.onclick}
      onButtonClick={args.onButtonClick}
    >
      {#if args.children}
        {@render args.children()}
      {/if}
    </CardHorizontal>
  {/snippet}
</Story>

<Story
  name="With Image"
  args={{ image: 'https://picsum.photos/80/80', imageAlt: 'Sample image' }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <CardHorizontal
      title={args.title || 'Title'}
      subtitle={args.subtitle}
      image={args.image}
      imageAlt={args.imageAlt}
      iconType={args.iconType || 'image'}
      buttonText={args.buttonText}
      showAction={args.showAction ?? true}
      actionType={args.actionType || 'button'}
      iconColor={args.iconColor}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onclick={args.onclick}
      onButtonClick={args.onButtonClick}
    >
      {#if args.children}
        {@render args.children()}
      {/if}
    </CardHorizontal>
  {/snippet}
</Story>

<Story name="Avatar Type" args={{ title: 'Avatar Card', iconType: 'custom' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <CardHorizontal
      title={args.title || 'Card Title'}
      subtitle={args.subtitle}
      image={args.image}
      imageAlt={args.imageAlt}
      iconType={args.iconType || 'image'}
      buttonText={args.buttonText}
      showAction={args.showAction ?? true}
      actionType={args.actionType || 'button'}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onclick={args.onclick}
      onButtonClick={args.onButtonClick}
    >
      <ProfileIcon class="h-6 w-6" />
    </CardHorizontal>
  {/snippet}
</Story>

<Story name="Heart Type" args={{ title: 'Heart Card', iconType: 'custom' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <CardHorizontal
      title={args.title || 'Card Title'}
      subtitle={args.subtitle}
      image={args.image}
      imageAlt={args.imageAlt}
      iconType={args.iconType || 'image'}
      buttonText={args.buttonText}
      showAction={args.showAction ?? true}
      actionType={args.actionType || 'button'}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onclick={args.onclick}
      onButtonClick={args.onButtonClick}
    >
      <HeartFilledIcon class="h-6 w-6" />
    </CardHorizontal>
  {/snippet}
</Story>

<Story name="Custom Icon" args={{ iconType: 'custom' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <CardHorizontal
      title={args.title || 'Title'}
      subtitle={args.subtitle}
      image={args.image}
      imageAlt={args.imageAlt}
      iconType={args.iconType || 'image'}
      buttonText={args.buttonText}
      showAction={args.showAction ?? true}
      actionType={args.actionType || 'button'}
      iconColor={args.iconColor}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onclick={args.onclick}
      onButtonClick={args.onButtonClick}
    >
      <ChatIcon class="text-highlight h-6 w-6" />
    </CardHorizontal>
  {/snippet}
</Story>

<Story name="Arrow Action" args={{ actionType: 'arrow' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <CardHorizontal
      title={args.title || 'Title'}
      subtitle={args.subtitle}
      image={args.image}
      imageAlt={args.imageAlt}
      iconType={args.iconType || 'image'}
      buttonText={args.buttonText}
      showAction={args.showAction ?? true}
      actionType={args.actionType || 'button'}
      iconColor={args.iconColor}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onclick={args.onclick}
      onButtonClick={args.onButtonClick}
    >
      {#if args.children}
        {@render args.children()}
      {/if}
    </CardHorizontal>
  {/snippet}
</Story>

<Story name="No Action" args={{ showAction: false }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <CardHorizontal
      title={args.title || 'Title'}
      subtitle={args.subtitle}
      image={args.image}
      imageAlt={args.imageAlt}
      iconType={args.iconType || 'image'}
      buttonText={args.buttonText}
      showAction={args.showAction ?? true}
      actionType={args.actionType || 'button'}
      iconColor={args.iconColor}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onclick={args.onclick}
      onButtonClick={args.onButtonClick}
    >
      {#if args.children}
        {@render args.children()}
      {/if}
    </CardHorizontal>
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <CardHorizontal
      title={args.title || 'Title'}
      subtitle={args.subtitle}
      image={args.image}
      imageAlt={args.imageAlt}
      iconType={args.iconType || 'image'}
      buttonText={args.buttonText}
      showAction={args.showAction ?? true}
      actionType={args.actionType || 'button'}
      iconColor={args.iconColor}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onclick={args.onclick}
      onButtonClick={args.onButtonClick}
    >
      {#if args.children}
        {@render args.children()}
      {/if}
    </CardHorizontal>
  {/snippet}
</Story>

<Story name="Clickable Card" parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <CardHorizontal
      title={args.title || 'Card Title'}
      subtitle={args.subtitle}
      image={args.image}
      imageAlt={args.imageAlt}
      iconType={args.iconType || 'image'}
      buttonText={args.buttonText}
      showAction={args.showAction ?? true}
      actionType={args.actionType || 'button'}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onclick={() => console.log('Card clicked')}
      onButtonClick={() => console.log('Button clicked')}
    />
  {/snippet}
</Story>

<Story name="Text Only" args={{ iconType: 'image', showAction: false }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <CardHorizontal
      title={args.title || 'Title'}
      subtitle={args.subtitle}
      image={args.image}
      imageAlt={args.imageAlt}
      iconType={args.iconType || 'image'}
      buttonText={args.buttonText}
      showAction={args.showAction ?? true}
      actionType={args.actionType || 'button'}
      iconColor={args.iconColor}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onclick={args.onclick}
      onButtonClick={args.onButtonClick}
    >
      {#if args.children}
        {@render args.children()}
      {/if}
    </CardHorizontal>
  {/snippet}
</Story>

<Story name="All Examples" args={{}} parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-6">
      <!-- Image Variants -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Image Variants</h3>
        <div class="space-y-3">
          <CardHorizontal
            title="With Image + Button"
            subtitle="Subtitle"
            image="https://picsum.photos/80/80"
            imageAlt="Sample image"
            buttonText="Button"
            showAction={true}
            actionType="button"
          />
          <CardHorizontal
            title="With Image + Arrow"
            subtitle="Subtitle"
            iconType="image"
            showAction={true}
            actionType="arrow"
          />
          <CardHorizontal title="With Image Only" subtitle="Subtitle" iconType="image" showAction={false} />
        </div>
      </div>

      <!-- Avatar Variants -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Avatar Variants</h3>
        <div class="space-y-3">
          <CardHorizontal
            title="Avatar + Button"
            subtitle="Subtitle"
            iconType="custom"
            buttonText="Button"
            showAction={true}
            actionType="button"
          >
            <ProfileIcon class="h-6 w-6" />
          </CardHorizontal>
          <CardHorizontal
            title="Avatar + Arrow"
            subtitle="Subtitle"
            iconType="custom"
            showAction={true}
            actionType="arrow"
          >
            <ProfileIcon class="h-6 w-6" />
          </CardHorizontal>
          <CardHorizontal title="Avatar Only" subtitle="Subtitle" iconType="custom" showAction={false}>
            <ProfileIcon class="h-6 w-6" />
          </CardHorizontal>
        </div>
      </div>

      <!-- Heart Variants -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Heart Variants</h3>
        <div class="space-y-3">
          <CardHorizontal
            title="Heart + Button"
            subtitle="Subtitle"
            iconType="custom"
            buttonText="Button"
            showAction={true}
            actionType="button"
          >
            <HeartFilledIcon class="h-6 w-6" />
          </CardHorizontal>
          <CardHorizontal
            title="Heart + Arrow"
            subtitle="Subtitle"
            iconType="custom"
            showAction={true}
            actionType="arrow"
          >
            <HeartFilledIcon class="h-6 w-6" />
          </CardHorizontal>
          <CardHorizontal title="Heart Only" subtitle="Subtitle" iconType="custom" showAction={false}>
            <HeartFilledIcon class="h-6 w-6" />
          </CardHorizontal>
        </div>
      </div>

      <!-- Text Only Variants -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Text Only Variants</h3>
        <div class="space-y-3">
          <CardHorizontal
            title="Text + Button"
            subtitle="Subtitle"
            buttonText="Button"
            showAction={true}
            actionType="button"
          />
          <CardHorizontal title="Text + Arrow" subtitle="Subtitle" showAction={true} actionType="arrow" />
          <CardHorizontal title="Text Only" subtitle="Subtitle" showAction={false} />
        </div>
      </div>

      <!-- Special States -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Special States</h3>
        <div class="space-y-3">
          <CardHorizontal
            title="Clickable Card"
            subtitle="Click the entire card"
            iconType="custom"
            buttonText="Button"
            showAction={true}
            onclick={() => console.log('Card clicked')}
            onButtonClick={() => console.log('Button clicked')}
          >
            <ProfileIcon class="h-6 w-6" />
          </CardHorizontal>
          <CardHorizontal
            title="Disabled Card"
            subtitle="Cannot interact"
            iconType="custom"
            buttonText="Button"
            showAction={true}
            disabled={true}
          >
            <HeartFilledIcon class="h-6 w-6" />
          </CardHorizontal>
        </div>
      </div>
    </div>
  {/snippet}
</Story>
