<script lang="ts">
  import AvatarPlaceholder from '@ui/components/media/AvatarPlaceholder.svelte'
  import type { BaseProps, ExtendedSizedComponent, StatusComponent } from '@ui/type/component'
  import { createStyleComposer } from '@ui/utils/styles'
  import { AvatarRenderer } from '@ui/utils/rendering'

  interface Props extends BaseProps, ExtendedSizedComponent, StatusComponent {
    src?: string
    alt?: string
    initials?: string
  }

  let { src, alt = '', size = 'medium', initials, status, class: className = '' }: Props = $props()

  const createAvatarStyles = createStyleComposer({
    base: 'relative inline-flex items-center justify-center bg-highlight-50 text-neutral-600 font-medium',
    variants: {
      default: '',
      bordered: 'ring-2 ring-white shadow-sm',
    },
    sizes: {
      xs: 'h-8 w-8 text-body-s rounded-xl',
      small: 'h-10 w-10 text-body-s rounded-2xl',
      medium: 'h-14 w-14 text-body-m rounded-2xl',
      large: 'h-20 w-20 text-body-l rounded-3xl',
    },
  })

  // Use style composition utility for consistent avatar styling
  let avatarClasses = $derived(
    createAvatarStyles({
      variant: 'default',
      size,
      className,
    })
  )

  // Use updated rendering utility that matches original Avatar design
  let statusClasses = $derived(AvatarRenderer.getStatusClasses(status, size))

  // Restore original initials logic (the utility doesn't handle the priority correctly)
  let displayInitials = $derived.by(() => {
    if (initials) return initials
    if (alt) {
      return alt
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    return ''
  })

  // Determine what to render based on available data
  let renderType = $derived(AvatarRenderer.getRenderType(src, displayInitials))

  // Get border radius for images to match avatar container
  let imageBorderRadius = $derived.by(() => {
    const borderRadius = {
      xs: 'rounded-lg',
      small: 'rounded-xl',
      medium: 'rounded-xl',
      large: 'rounded-2xl',
    }
    return borderRadius[size]
  })
</script>

<div class={avatarClasses}>
  {#if renderType === 'image' && src}
    <img
      {src}
      {alt}
      class="absolute inset-0 h-full w-full object-cover {imageBorderRadius}"
      onerror={() => {
        // Handle image load error by falling back to initials/placeholder
        src = undefined
      }}
    />
  {:else if renderType === 'initials' && displayInitials}
    <div class="absolute inset-0 flex items-center justify-center">
      <span class="select-none">
        {displayInitials}
      </span>
    </div>
  {:else}
    <!-- Generic person SVG fallback -->
    <div class="absolute inset-0">
      <AvatarPlaceholder {size} />
    </div>
  {/if}

  {#if status}
    <span class={statusClasses} aria-label={`Status: ${status}`}></span>
  {/if}
</div>
