<script lang="ts">
  import { ProfileIcon } from '@icons'
  import type { BaseProps, ExtendedSizedComponent } from '@type/component'

  interface Props extends BaseProps, ExtendedSizedComponent {}

  let { class: className = '', size = 'medium' }: Props = $props()

  let containerClasses = $derived.by(() => {
    const base = 'flex items-center justify-center w-full h-full'

    return `${base} ${className}`
  })

  let iconClasses = $derived.by(() => {
    const base = 'text-highlight-100'

    const iconSizes = {
      xs: 'w-6 h-6',
      small: 'w-8 h-8',
      medium: 'w-11 h-11',
      large: 'w-16 h-16',
    }

    return `${base} ${iconSizes[size]}`
  })
</script>

<div class={containerClasses}>
  <ProfileIcon class={iconClasses} />
</div>
