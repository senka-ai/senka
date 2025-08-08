<script lang="ts">
  import type { BaseProps, VariantComponent } from '@type/component'
  import { createLoaderStyles } from '@utils/styles'

  /**
   * Loader component props interface
   * A non-interactive component that tells the user to wait for a certain activity to be completed
   */
  interface Props extends BaseProps, VariantComponent<'progress' | 'spinner'> {
    /** Progress value (0-100) for progress variant @default 0 */
    progress?: number
    /** Size of the loader @default 'medium' */
    size?: 'small' | 'medium' | 'large'
    /** Color theme @default 'primary' */
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
    /** Whether to show progress text @default false */
    showProgress?: boolean
    /** Animation speed @default 'normal' */
    speed?: 'slow' | 'normal' | 'fast'
    /** Custom label text */
    label?: string
    /** Whether to show the label @default false */
    showLabel?: boolean
  }

  let {
    variant = 'spinner',
    progress = 0,
    size = 'medium',
    color = 'primary',
    showProgress = false,
    speed = 'normal',
    label = 'Loading...',
    showLabel = false,
    disabled = false,
    class: className = '',
    id,
    ...restProps
  }: Props = $props()

  // Clamp progress between 0 and 100
  let clampedProgress = $derived(Math.max(0, Math.min(100, progress)))

  let loaderClasses = $derived(
    createLoaderStyles({
      variant,
      size,
      color,
      speed,
      disabled,
      className,
    })
  )

  // Calculate stroke dash array for progress circle
  let radius = $derived(() => {
    const sizes = { small: 18, medium: 20, large: 22 }
    return sizes[size]
  })

  let circumference = $derived(2 * Math.PI * radius())
  let strokeDashoffset = $derived(circumference - (clampedProgress / 100) * circumference)
</script>

<div class={loaderClasses.container} role="status" aria-live="polite" aria-label={label} {id} {...restProps}>
  <!-- SVG Loader with Progress Text -->
  <div class="relative">
    <svg class={loaderClasses.svg} viewBox="0 0 50 50" aria-hidden="true">
      <!-- Background circle -->
      <circle class={loaderClasses.background} cx="25" cy="25" r={radius()} fill="none" stroke-width="5" />

      <!-- Progress/Spinner circle -->
      <circle
        class={loaderClasses.foreground}
        cx="25"
        cy="25"
        r={radius()}
        fill="none"
        stroke-width="5"
        stroke-linecap="round"
        stroke-dasharray={variant === 'progress'
          ? circumference
          : variant === 'spinner'
            ? `${circumference * 0.25} ${circumference}`
            : undefined}
        stroke-dashoffset={variant === 'progress' ? strokeDashoffset : undefined}
        style={variant === 'spinner'
          ? `animation: ${loaderClasses.spinAnimation}; transform-origin: 50% 50%;`
          : undefined}
      />
    </svg>

    <!-- Progress Text -->
    {#if variant === 'progress' && showProgress}
      <div class={loaderClasses.progressText}>
        {Math.round(clampedProgress)}%
      </div>
    {/if}
  </div>

  <!-- Label -->
  {#if showLabel && label}
    <div class={loaderClasses.label}>
      {label}
    </div>
  {/if}
</div>
