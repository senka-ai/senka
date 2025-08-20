<script lang="ts">
  import Button from '@components/core/Button.svelte'
  import { ImageIcon } from '@icons'
  import type { BaseProps, ChildrenComponent, ClickHandler } from '@type/component'
  import { createBannerStyles } from '@utils/styles'

  /**
   * Banner component props interface
   * An informative component that displays important messages and provides actions for users
   */
  interface Props extends BaseProps, ChildrenComponent, ClickHandler {
    /** Main title text displayed prominently */
    title: string
    /** Supporting description text (optional) */
    description?: string
    /** Text displayed on the action button (optional) */
    buttonText?: string
    /** Image source URL for supporting visual (optional) */
    image?: string
    /** Alt text for the image */
    imageAlt?: string
    /** Whether to show the title @default true */
    showTitle?: boolean
    /** Whether to show the description @default true */
    showDescription?: boolean
    /** Whether to show the action button @default true */
    showButton?: boolean
    /** Whether to show the image @default true */
    showImage?: boolean
    /** Called when the action button is clicked */
    onButtonClick?: () => void
    /** Called when the banner itself is clicked (optional) */
    onBannerClick?: () => void
    /** Visual variant of the banner @default 'default' */
    variant?: 'default' | 'info' | 'success' | 'warning' | 'error'
  }

  let {
    title,
    description,
    buttonText = 'Button',
    image,
    imageAlt = '',
    showTitle = true,
    showDescription = true,
    showButton = true,
    showImage = true,
    onButtonClick,
    onBannerClick,
    variant = 'default',
    disabled = false,
    class: className = '',
    id,
    onclick,
    children,
    ...restProps
  }: Props = $props()

  let bannerClasses = $derived(
    createBannerStyles({
      variant,
      disabled,
      clickable: Boolean(onclick || onBannerClick),
      className,
    })
  )

  function handleBannerClick() {
    if (!disabled && (onclick || onBannerClick)) {
      onclick?.()
      onBannerClick?.()
    }
  }

  function handleButtonClick() {
    if (!disabled && onButtonClick) {
      onButtonClick()
    }
  }
</script>

{#snippet bannerContent()}
  <!-- Content Section -->
  <div class="flex flex-1 flex-col">
    <!-- Title -->
    {#if showTitle && title}
      <h4 class="text-h4">
        {title}
      </h4>
    {/if}

    <!-- Description -->
    {#if showDescription && description}
      <p class="text-body-s mt-1 text-neutral-700">
        {description}
      </p>
    {/if}

    <!-- Button -->
    {#if showButton && (buttonText || children)}
      <div class="mt-4">
        <Button variant="primary" size="medium" onclick={handleButtonClick} {disabled}>
          {buttonText}
        </Button>
      </div>
    {/if}
  </div>

  <!-- Image Section -->
  {#if showImage && image}
    <div class="ml-4 flex-shrink-0">
      <img src={image} alt={imageAlt} class="h-16 w-16 rounded-lg object-cover" />
    </div>
  {:else if showImage && !image}
    <!-- Placeholder when showImage is true but no image provided -->
    <div class="ml-4 flex-shrink-0">
      <div class="flex h-16 w-16 items-center justify-center rounded-lg bg-neutral-100">
        <ImageIcon class="h-8 w-8 text-neutral-400" size={32} />
      </div>
    </div>
  {/if}
{/snippet}

{#if onclick || onBannerClick}
  <button
    class="{bannerClasses} border-none bg-transparent p-0 text-left"
    {id}
    onclick={handleBannerClick}
    {disabled}
    {...restProps}
  >
    {@render bannerContent()}
  </button>
{:else}
  <div class={bannerClasses} {id} {...restProps}>
    {@render bannerContent()}
  </div>
{/if}
