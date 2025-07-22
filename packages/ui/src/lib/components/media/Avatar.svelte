<script lang="ts">
  import AvatarPlaceholder from './AvatarPlaceholder.svelte'
  import type { BaseProps, ExtendedSizedComponent, StatusComponent } from '../../types/component'
  import { createAvatarStyles } from '../../utils/styles'
  import { AvatarRenderer } from '../../utils/rendering'

  interface Props extends BaseProps, ExtendedSizedComponent, StatusComponent {
    src?: string
    alt?: string
    initials?: string
  }

  let { src, alt = '', size = 'medium', initials, status, class: className = '' }: Props = $props()

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
      class="h-full w-full object-cover {imageBorderRadius}"
      onerror={() => {
        // Handle image load error by falling back to initials/placeholder
        src = undefined
      }}
    />
  {:else if renderType === 'initials' && displayInitials}
    <span class="select-none">
      {displayInitials}
    </span>
  {:else}
    <!-- Generic person SVG fallback -->
    <AvatarPlaceholder {size} />
  {/if}

  {#if status}
    <span class={statusClasses} aria-label={`Status: ${status}`}></span>
  {/if}
</div>
