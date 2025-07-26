<script lang="ts">
  import { onMount } from 'svelte'
  import { toggleTheme, useTheme } from '../../theme.svelte'
  import { SunIcon, MoonIcon } from '../../icons'
  import type { BaseProps, ExtendedSizedComponent } from '../../types/component'

  interface Props extends BaseProps, ExtendedSizedComponent {}

  let { class: className = '', size = 'medium' }: Props = $props()

  // Get reactive theme reference
  const theme = useTheme()

  let toggleClasses = $derived.by(() => {
    const base = 'relative inline-flex items-center justify-center rounded-full transition-colors duration-200'
    const hover = 'hover:bg-neutral-200'

    const sizes = {
      xs: 'h-6 w-6',
      small: 'h-8 w-8',
      medium: 'h-10 w-10',
      large: 'h-12 w-12',
    }

    return `${base} ${hover} ${sizes[size]} ${className}`
  })

  let iconSize = $derived.by(() => {
    const sizes = {
      xs: 12,
      small: 16,
      medium: 20,
      large: 24,
    }
    return sizes[size]
  })

  // Cleanup subscription on component destroy
  onMount(() => {
    return () => {
      theme.destroy?.()
    }
  })
</script>

<button
  class={toggleClasses}
  onclick={toggleTheme}
  aria-label="Toggle theme"
  title="Toggle between light and dark theme"
>
  {#if theme.current === 'light'}
    <!-- Moon icon for light theme (click to go dark) -->
    <MoonIcon size={iconSize} />
  {:else}
    <!-- Sun icon for dark theme (click to go light) -->
    <SunIcon size={iconSize} />
  {/if}
</button>
