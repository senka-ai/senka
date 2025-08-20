<script lang="ts">
  import Button from '@components/core/Button.svelte'
  import Image from '@components/media/Image.svelte'
  import ImagePlaceholder from '@components/media/ImagePlaceholder.svelte'
  import { ArrowRightIcon } from '@icons'
  import type { CardComponent } from '@type/component'
  import { createCardStyles, createCardContentStyles } from '@utils/styles'

  interface Props extends CardComponent {
    image?: string
    imageAlt?: string
    icon?: any
    buttonText?: string
    showAction?: boolean
    actionType?: 'button' | 'arrow'
    favorite?: boolean
    iconColor?: string
    onButtonClick?: () => void
    onFavoriteClick?: () => void
  }

  let {
    title,
    subtitle,
    description,
    image,
    imageAlt = '',
    icon,
    children,
    buttonText = 'Button',
    showAction = false,
    actionType = 'button',
    variant = 'default',
    favorite = false,
    disabled = false,
    iconColor = 'text-highlight-400',
    class: className = '',
    id,
    onclick,
    onButtonClick,
    onFavoriteClick,
    ...restProps
  }: Props = $props()

  let cardClasses = $derived(
    createCardStyles({
      variant,
      interactive: Boolean(onclick),
      disabled,
      className,
    })
  )

  let contentClasses = $derived(
    createCardContentStyles({
      variant,
    })
  )

  function handleCardClick() {
    if (!disabled && onclick) {
      onclick()
    }
  }

  function handleButtonClick() {
    if (!disabled && onButtonClick) {
      onButtonClick()
    }
  }

  function handleFavoriteClick(event: Event) {
    event.stopPropagation()
    if (!disabled && onFavoriteClick) {
      onFavoriteClick()
    }
  }
</script>

<div class="{cardClasses} flex flex-col" {id} onclick={handleCardClick} {...restProps}>
  <!-- Image or Icon Section -->
  {#if image}
    <Image
      src={image}
      alt={imageAlt}
      class="h-40 w-full {variant === 'default' ? 'rounded-t-2xl' : 'rounded-t-xl'}"
      aspectRatio="auto"
    />
  {:else if children}
    <div
      class="bg-highlight-50 flex items-center justify-center {variant === 'default'
        ? 'h-40 rounded-t-2xl'
        : 'h-32 rounded-t-xl'} {iconColor}"
    >
      {@render children()}
    </div>
  {:else}
    <div class="relative {variant === 'default' ? 'h-40 rounded-t-2xl' : 'h-32 rounded-t-xl'}">
      <ImagePlaceholder variant="default" />
    </div>
  {/if}

  <!-- Content Section -->
  <div class={contentClasses}>
    <!-- Header with Title and Favorite -->
    <div class="mb-2 flex items-start justify-between">
      <div class="min-w-0 flex-1">
        <h3 class="text-heading-s text-primary leading-tight font-semibold">
          {title}
        </h3>
        {#if subtitle}
          <p class="text-body-s text-secondary mt-0.5">
            {subtitle}
          </p>
        {/if}
      </div>

      {#if onFavoriteClick}
        <button
          class="hover:text-error ml-2 p-1 text-neutral-400 transition-colors duration-200"
          onclick={handleFavoriteClick}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg class="h-5 w-5" fill={favorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      {/if}
    </div>

    <!-- Description -->
    {#if description}
      <p class="text-body-s text-secondary mb-4 leading-relaxed">
        {description}
      </p>
    {/if}

    <!-- Action Section -->
    {#if showAction}
      <div class="flex items-center justify-between">
        {#if actionType === 'button'}
          <Button variant="secondary" size="medium" fullWidth={true} onclick={() => handleButtonClick()} {disabled}>
            {buttonText}
          </Button>
        {:else if actionType === 'arrow'}
          <button
            class="text-highlight hover:text-highlight-hover flex items-center transition-colors duration-200"
            onclick={() => handleButtonClick()}
            {disabled}
          >
            <ArrowRightIcon class="h-5 w-5" />
          </button>
        {/if}
      </div>
    {/if}
  </div>
</div>
