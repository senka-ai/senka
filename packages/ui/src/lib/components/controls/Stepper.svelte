<!-- @senka-ai/ui/src/lib/components/controls/Stepper.svelte -->
<!-- Stepper component for displaying progress through a sequence of steps -->
<!-- Allows navigation through multi-step processes with visual progress indication -->
<!-- RELEVANT FILES: PaginationDots.svelte, ProgressBar.svelte, Tabs.svelte, component.ts -->

<script lang="ts">
  import { CheckIcon } from '@icons'
  import type { BaseProps, SizedComponent, ChangeHandler, InteractiveHandlers } from '@type/component'
  import { createStyleComposer } from '@utils/styles'

  export interface StepItem {
    /** Unique identifier for the step */
    id: string
    /** Display title for the step */
    title: string
    /** Whether this step is disabled/non-interactive */
    disabled?: boolean
  }

  interface Props extends BaseProps, SizedComponent, ChangeHandler<number>, InteractiveHandlers {
    /** Array of step definitions */
    steps: StepItem[]
    /** Current active step index (0-based) */
    currentStep?: number
    /** Whether steps can be clicked for navigation */
    interactive?: boolean
    /** Whether to show step titles below indicators */
    showTitles?: boolean
    /** Whether to show connector lines between steps */
    showConnectors?: boolean
    /** Layout orientation */
    orientation?: 'horizontal'
  }

  let {
    steps = [],
    currentStep = 0,
    size = 'medium',
    interactive = true,
    showTitles = true,
    showConnectors = true,
    orientation = 'horizontal',
    disabled = false,
    class: className = '',
    id,
    onchange,
    onclick,
    onkeydown,
    onfocus,
    onblur,
    ...restProps
  }: Props = $props()

  // Validate currentStep is within bounds
  let activeStep = $derived(() => {
    return Math.min(Math.max(currentStep ?? 0, 0), steps.length - 1)
  })

  // Handle step click navigation
  function handleStepClick(stepIndex: number) {
    if (!interactive || disabled || steps[stepIndex]?.disabled) return
    onchange?.(stepIndex)
    onclick?.()
  }

  // Handle keyboard navigation
  function handleKeyDown(event: KeyboardEvent, stepIndex: number) {
    if (!interactive || disabled || steps[stepIndex]?.disabled) return

    let targetIndex = stepIndex

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        targetIndex = Math.min(stepIndex + 1, steps.length - 1)
        break
      case 'ArrowLeft':
        event.preventDefault()
        targetIndex = Math.max(stepIndex - 1, 0)
        break
      case 'Home':
        event.preventDefault()
        targetIndex = 0
        break
      case 'End':
        event.preventDefault()
        targetIndex = steps.length - 1
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        handleStepClick(stepIndex)
        return
    }

    // Skip disabled steps
    while (targetIndex !== stepIndex && steps[targetIndex]?.disabled) {
      if (targetIndex > stepIndex) {
        targetIndex++
        if (targetIndex >= steps.length) break
      } else {
        targetIndex--
        if (targetIndex < 0) break
      }
    }

    if (targetIndex !== stepIndex && targetIndex >= 0 && targetIndex < steps.length) {
      handleStepClick(targetIndex)
    }

    onkeydown?.(event)
  }

  // Style composition for container
  const createStepperStyles = createStyleComposer({
    base: 'flex items-start',
    variants: {
      horizontal: 'flex-row',
    },
    sizes: {
      small: 'gap-2',
      medium: 'gap-4',
      large: 'gap-6',
    },
  })

  let containerClasses = $derived.by(() => {
    const baseClasses = createStepperStyles({
      variant: orientation,
      size,
      disabled,
      className,
    })

    // Add width distribution when connectors are hidden
    const widthClasses = showConnectors ? '' : 'w-full justify-between'

    return `${baseClasses} ${widthClasses}`.trim()
  })

  // Step indicator size mapping
  const stepIndicatorSize = $derived(() => {
    return {
      small: 'h-6 w-6 text-caption-m',
      medium: 'h-8 w-8 text-caption-l',
      large: 'h-10 w-10 text-caption-l',
    }[size]
  })

  // Check icon size mapping
  const checkIconSize = $derived(() => {
    return {
      small: 10,
      medium: 14,
      large: 16,
    }[size]
  })

  // Step title typography
  const stepTitleClasses = $derived(() => {
    return {
      small: 'text-h5 mt-2.5',
      medium: 'text-h5 mt-3',
      large: 'text-h5 mt-3.5',
    }[size]
  })

  // Get state for a specific step
  function getStepState(stepIndex: number): 'completed' | 'current' | 'pending' {
    if (stepIndex < activeStep()) return 'completed'
    if (stepIndex === activeStep()) return 'current'
    return 'pending'
  }

  // Get classes for step indicator
  function getStepIndicatorClasses(stepIndex: number) {
    const state = getStepState(stepIndex)
    const isDisabled = disabled || steps[stepIndex]?.disabled
    const isInteractive = interactive && !isDisabled

    let classes = `inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 ${stepIndicatorSize()}`

    // State-based styling
    switch (state) {
      case 'completed':
        classes += ' bg-highlight-100 text-highlight'
        break
      case 'current':
        classes += ' bg-highlight text-white'
        break
      case 'pending':
        classes += ' bg-surface  text-muted'
        break
    }

    // Interactive states
    if (isInteractive) {
      classes += ' cursor-pointer'
      if (state === 'pending') {
        classes += ' hover:border-neutral-400 hover:text-secondary'
      }
    } else {
      classes += ' cursor-default'
    }

    if (isDisabled) {
      classes += ' opacity-50 cursor-not-allowed'
    }

    return classes
  }

  // Get classes for step title
  function getStepTitleClasses(stepIndex: number) {
    const state = getStepState(stepIndex)
    const isDisabled = disabled || steps[stepIndex]?.disabled

    let classes = `text-center ${stepTitleClasses()}`

    // State-based styling
    switch (state) {
      case 'completed':
        classes += ' text-secondary'
        break
      case 'current':
        classes += ' text-primary'
        break
      case 'pending':
        classes += ' text-muted'
        break
    }

    if (isDisabled) {
      classes += ' opacity-50'
    }

    return classes
  }

  // Get classes for connector line between steps
  function getConnectorClasses(stepIndex: number) {
    const isCompleted = stepIndex < activeStep()
    const marginTop = {
      small: 'mt-3',
      medium: 'mt-4',
      large: 'mt-5',
    }[size]

    let classes = `flex-1 h-0.5 ${marginTop} mx-2 transition-colors duration-200`

    if (isCompleted) {
      classes += ' bg-highlight-100'
    } else {
      classes += ' bg-neutral-300'
    }

    return classes
  }
</script>

<div
  class={containerClasses}
  role="progressbar"
  aria-valuenow={activeStep() + 1}
  aria-valuemin={1}
  aria-valuemax={steps.length}
  aria-valuetext={`Step ${activeStep() + 1} of ${steps.length}: ${steps[activeStep()]?.title}`}
  {id}
  {...restProps}
>
  {#each steps as step, index}
    {@const stepState = getStepState(index)}
    {@const isDisabled = disabled || step.disabled}
    {@const isInteractive = interactive && !isDisabled}

    <!-- Step container -->
    <div class="flex flex-col items-center">
      <!-- Step indicator -->
      <button
        type="button"
        class={getStepIndicatorClasses(index)}
        disabled={!isInteractive}
        tabindex={isInteractive ? 0 : -1}
        aria-label={`Step ${index + 1}: ${step.title}`}
        aria-current={stepState === 'current' ? 'step' : undefined}
        onclick={() => handleStepClick(index)}
        onkeydown={(e) => handleKeyDown(e, index)}
        onfocus={(e) => onfocus?.(e)}
        onblur={(e) => onblur?.(e)}
      >
        {#if stepState === 'completed'}
          <CheckIcon size={checkIconSize()} />
        {:else}
          {index + 1}
        {/if}
      </button>

      <!-- Step title -->
      {#if showTitles}
        <span class={getStepTitleClasses(index)}>
          {step.title}
        </span>
      {/if}
    </div>

    <!-- Connector line (except for last step) -->
    {#if showConnectors && index < steps.length - 1}
      <div class={getConnectorClasses(index)}></div>
    {/if}
  {/each}
</div>
