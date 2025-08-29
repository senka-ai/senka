<script lang="ts">
  import type { BaseProps, VariantComponent } from '@ui/type/component'
  import { composeClasses } from '@ui/utils/styles'

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

  function createLoaderStyles(options: {
    variant: 'progress' | 'spinner'
    size: 'small' | 'medium' | 'large'
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
    speed: 'slow' | 'normal' | 'fast'
    disabled?: boolean
    className?: string
  }): {
    container: string
    svg: string
    background: string
    foreground: string
    progressText: string
    label: string
    spinAnimation: string
  } {
    const { variant, size, color, speed, disabled = false, className = '' } = options

    // Container styles
    const containerBase = 'relative inline-flex flex-col items-center justify-center gap-2'
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''
    const container = composeClasses(containerBase, disabledStyles, className)

    // SVG size styles
    const svgSizes = {
      small: 'h-8 w-8',
      medium: 'h-12 w-12',
      large: 'h-16 w-16',
    }
    const svg = svgSizes[size]

    // Background circle styles
    const background = 'stroke-neutral-200'

    // Foreground circle styles - colors and animations
    const colorStyles = {
      primary: 'stroke-highlight',
      secondary: 'stroke-neutral-600',
      success: 'stroke-success',
      warning: 'stroke-warning',
      error: 'stroke-error',
    }

    const progressStyles = variant === 'progress' ? 'transition-all duration-300 ease-out' : ''
    const foreground = composeClasses(colorStyles[color], progressStyles)

    // Progress text styles
    const progressTextSizes = {
      small: 'text-[8px]',
      medium: 'text-action-s',
      large: 'text-action-m',
    }
    const progressText = composeClasses(
      'absolute top-0 left-0 w-full h-full flex items-center justify-center font-medium text-neutral-700 pointer-events-none',
      progressTextSizes[size]
    )

    // Label styles
    const label = 'text-body-s text-neutral-600 font-medium'

    // Spinner animation speeds
    const animationSpeeds = {
      slow: 'spin 2s linear infinite',
      normal: 'spin 1.5s linear infinite',
      fast: 'spin 1s linear infinite',
    }
    const spinAnimation = variant === 'spinner' ? animationSpeeds[speed] : ''

    return {
      container,
      svg,
      background,
      foreground,
      progressText,
      label,
      spinAnimation,
    }
  }

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
