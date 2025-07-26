<script lang="ts">
  import type { BaseProps, VariantComponent } from '../../types/component'
  import { createProgressBarStyles } from '../../utils/styles'

  /**
   * Progress Bar component props interface
   * A visual representation of progress on a journey or task completion
   */
  interface Props extends BaseProps, VariantComponent<'default' | 'stepped'> {
    /** Progress value between 0 and 100 @default 0 */
    progress?: number
    /** Maximum value for progress calculation @default 100 */
    max?: number
    /** Current value for progress calculation */
    value?: number
    /** Number of steps for stepped variant @default 5 */
    steps?: number
    /** Current step for stepped variant (0-based) */
    currentStep?: number
    /** Size of the progress bar @default 'medium' */
    size?: 'small' | 'medium' | 'large'
    /** Color variant of the progress bar @default 'primary' */
    color?: 'primary' | 'success' | 'warning' | 'error'
    /** Whether to show the progress text label @default false */
    showLabel?: boolean
    /** Custom label text (overrides default percentage) */
    label?: string
    /** Whether the progress bar is animated @default true */
    animated?: boolean
  }

  let {
    progress = 0,
    max = 100,
    value,
    steps = 5,
    currentStep,
    size = 'medium',
    color = 'primary',
    variant = 'default',
    showLabel = false,
    label,
    animated = true,
    disabled = false,
    class: className = '',
    id,
    ...restProps
  }: Props = $props()

  // Calculate progress percentage
  let progressPercentage = $derived(() => {
    if (value !== undefined && max !== undefined) {
      return Math.min(Math.max((value / max) * 100, 0), 100)
    }
    return Math.min(Math.max(progress, 0), 100)
  })

  // Calculate current step for stepped variant
  let activeStep = $derived(() => {
    if (currentStep !== undefined) {
      return Math.min(Math.max(currentStep, 0), steps - 1)
    }
    // Calculate step based on progress percentage
    const stepProgress = (progressPercentage() / 100) * steps
    return Math.floor(stepProgress)
  })

  // Generate progress label
  let progressLabel = $derived(() => {
    if (label) return label
    if (variant === 'stepped') {
      return `${activeStep() + 1} of ${steps}`
    }
    return `${Math.round(progressPercentage())}%`
  })

  let progressBarClasses = $derived(
    createProgressBarStyles({
      size,
      color,
      animated,
      disabled,
      className,
    })
  )

  // Calculate step width for stepped variant
  let stepWidth = $derived(() => {
    if (variant !== 'stepped') return 0
    return 100 / steps
  })
</script>

<div class={progressBarClasses.container} {id} {...restProps}>
  {#if showLabel}
    <div class={progressBarClasses.label}>
      {progressLabel()}
    </div>
  {/if}

  <div class={progressBarClasses.track}>
    {#if variant === 'stepped'}
      <!-- Stepped Progress Bar -->
      <div class="flex h-full">
        {#each Array(steps) as _, index}
          {@const isActive = index <= activeStep()}
          {@const isCompleted = index < activeStep()}
          <div class="flex-1 bg-neutral-200 border-r border-white last:border-r-0 transition-all duration-200">
            {#if isActive || isCompleted}
              <div class="h-full w-full {color === 'primary' ? 'bg-highlight' : color === 'success' ? 'bg-success' : color === 'warning' ? 'bg-warning' : 'bg-error'} transition-all duration-200"></div>
            {/if}
          </div>
        {/each}
      </div>
    {:else}
      <!-- Default Progress Bar -->
      <div
        class={progressBarClasses.fill}
        style="width: {progressPercentage()}%"
        role="progressbar"
        aria-valuenow={progressPercentage()}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={progressLabel()}
      ></div>
    {/if}
  </div>
</div>