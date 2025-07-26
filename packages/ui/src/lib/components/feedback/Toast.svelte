<script lang="ts">
  import { InfoIcon, CheckIcon, WarningIcon, CloseIcon } from '../../icons'
  import type { BaseProps, VariantComponent } from '../../types/component'
  import { createToastStyles } from '../../utils/styles'

  /**
   * Toast component props interface
   * A notification component that displays brief feedback or notifications about operations
   */
  interface Props extends BaseProps, VariantComponent<'info' | 'success' | 'warning' | 'error'> {
    /** Main title text displayed prominently */
    title?: string
    /** Supporting description text (optional) */
    description?: string
    /** Whether to show the title @default true */
    showTitle?: boolean
    /** Whether to show the description @default true */
    showDescription?: boolean
    /** Whether to show the close button @default true */
    showCloseButton?: boolean
    /** Whether to show a border around the toast @default false */
    showBorder?: boolean
    /** Called when the close button is clicked */
    onClose?: () => void
    /** Whether the toast is dismissible @default true */
    dismissible?: boolean
    /** Auto-dismiss duration in milliseconds (0 = no auto-dismiss) @default 0 */
    duration?: number
    /** Called when the toast is dismissed (either by close button or auto-dismiss) */
    onDismiss?: () => void
  }

  let {
    title = 'Title',
    description,
    showTitle = true,
    showDescription = true,
    showCloseButton = true,
    showBorder = false,
    onClose,
    dismissible = true,
    duration = 0,
    onDismiss,
    variant = 'info',
    disabled = false,
    class: className = '',
    id,
    ...restProps
  }: Props = $props()

  // Determine if we have both title and description visible
  let hasBothTitleAndDescription = $derived(showTitle && title && showDescription && description)

  // For single line content, use center alignment
  let singleLine = $derived(!hasBothTitleAndDescription)

  let toastClasses = $derived(
    createToastStyles({
      variant,
      dismissible,
      showBorder,
      singleLine,
      className,
    })
  )

  // Auto-dismiss functionality
  let timeoutId: ReturnType<typeof setTimeout> | undefined = $state()

  $effect(() => {
    if (duration > 0 && onDismiss) {
      timeoutId = setTimeout(() => {
        onDismiss()
      }, duration)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  })

  function handleClose() {
    if (!disabled) {
      onClose?.()
      onDismiss?.()
    }
  }

  // Get the appropriate icon for the variant
  function getVariantIcon() {
    switch (variant) {
      case 'info':
        return InfoIcon
      case 'success':
        return CheckIcon
      case 'warning':
        return WarningIcon
      case 'error':
        return WarningIcon // Using WarningIcon for error as well
      default:
        return InfoIcon
    }
  }

  let VariantIcon = $derived(getVariantIcon())

  // Get the appropriate icon color for the variant
  function getIconColor() {
    switch (variant) {
      case 'info':
        return 'text-highlight-400'
      case 'success':
        return 'text-success-400'
      case 'warning':
        return 'text-warning-400'
      case 'error':
        return 'text-error-400'
      default:
        return 'text-highlight-400'
    }
  }

  let iconColorClass = $derived(getIconColor())
</script>

<div class={toastClasses} {id} {...restProps}>
  <!-- Icon Section -->
  <div class="flex-shrink-0 self-center">
    <VariantIcon class="h-6 w-6 {iconColorClass}" size={24} />
  </div>

  <!-- Content Section -->
  <div class="flex flex-1 flex-col {hasBothTitleAndDescription ? 'gap-1' : ''}">
    <!-- Title -->
    {#if showTitle && title}
      <h4 class="text-h5 font-semibold">
        {title}
      </h4>
    {/if}

    <!-- Description -->
    {#if showDescription && description}
      <p class="text-body-s text-neutral-700">
        {description}
      </p>
    {/if}
  </div>

  <!-- Close Button -->
  {#if showCloseButton && dismissible}
    <div class="flex-shrink-0 self-start">
      <button
        class="p-1 text-neutral-500 transition-colors duration-200 hover:text-neutral-700"
        onclick={handleClose}
        {disabled}
        aria-label="Close notification"
        type="button"
      >
        <CloseIcon class="h-4 w-4" size={16} />
      </button>
    </div>
  {/if}
</div>
