<script lang="ts">
  import type { BaseProps, ChildrenComponent } from '@ui/type/component'
  import { composeClasses } from '@ui/utils/styles'
  import { createKeyboardHandler, KeySets } from '@ui/utils/events'
  import { CloseIcon } from '@ui/icons'
  import IconButton from '@ui/components/core/IconButton.svelte'

  /**
   * ActionSheet component props interface
   * A list of options that the user can select, usually placed at the bottom of the screen
   */
  interface Props extends BaseProps, ChildrenComponent {
    /** Whether the action sheet is open/visible @default false */
    open?: boolean
    /** Function called when the action sheet should be closed */
    onClose?: () => void
    /** Action sheet title */
    title?: string
    /** Whether to show the close button @default true */
    showCloseButton?: boolean
    /** Position of the action sheet @default 'bottom' */
    position?: 'bottom' | 'top'
    /** Animation speed @default 'normal' */
    animationSpeed?: 'slow' | 'normal' | 'fast'
    /** Whether clicking outside closes the sheet @default true */
    closeOnOutsideClick?: boolean
    /** Whether pressing escape closes the sheet @default true */
    closeOnEscape?: boolean
  }

  let {
    open = false,
    onClose,
    title,
    showCloseButton = true,
    position = 'bottom',
    animationSpeed = 'normal',
    closeOnOutsideClick = true,
    closeOnEscape = true,
    disabled = false,
    class: className = '',
    id,
    children,
    ...restProps
  }: Props = $props()

  function createActionSheetStyles(options: {
    open: boolean
    position: 'bottom' | 'top'
    animationSpeed: 'slow' | 'normal' | 'fast'
    disabled?: boolean
    className?: string
  }): {
    backdrop: string
    container: string
    header: string
    title: string
    content: string
  } {
    const { open, position, animationSpeed, disabled = false, className = '' } = options

    // Animation duration mapping
    const animationDurations = {
      slow: 'duration-500',
      normal: 'duration-300',
      fast: 'duration-200',
    }

    // Backdrop styles
    const backdrop = composeClasses(
      'fixed inset-0 z-50 flex items-end justify-center bg-black/50 transition-opacity',
      animationDurations[animationSpeed],
      open ? 'opacity-100' : 'opacity-0 pointer-events-none',
      position === 'top' ? 'items-start' : 'items-end',
      disabled && 'pointer-events-none'
    )

    // Container styles with position-based transforms
    const positionStyles = {
      bottom: open ? 'translate-y-0' : 'translate-y-full',
      top: open ? 'translate-y-0' : '-translate-y-full',
    }

    const container = composeClasses(
      'w-full max-w-md transform rounded-t-2xl bg-background shadow-xl transition-transform',
      position === 'top' ? 'rounded-t-none rounded-b-2xl' : '',
      animationDurations[animationSpeed],
      positionStyles[position],
      disabled && 'opacity-50',
      className
    )

    // Header styles
    const header = 'flex items-center justify-between border-b border-default px-6 py-4'

    // Title styles
    const title = 'text-heading-s font-semibold text-primary'

    // Content styles
    const content = 'p-4'

    return {
      backdrop,
      container,
      header,
      title,
      content,
    }
  }

  let actionSheetClasses = $derived(
    createActionSheetStyles({
      open,
      position,
      animationSpeed,
      disabled,
      className,
    })
  )

  // Handle close actions
  const handleClose = () => {
    if (!disabled && onClose) {
      onClose()
    }
  }

  const handleBackdropClick = (event: MouseEvent) => {
    if (closeOnOutsideClick && event.target === event.currentTarget) {
      handleClose()
    }
  }

  // Handle keyboard events
  const handleKeyDown = createKeyboardHandler(handleClose, {
    keys: [...KeySets.ESCAPE],
    preventDefault: true,
    disabled: !closeOnEscape || disabled,
  })

  // Focus management
  let sheetElement: HTMLDivElement | undefined = $state()

  $effect(() => {
    if (open && sheetElement) {
      // Focus the sheet when it opens
      sheetElement.focus()
    }
  })

  $effect(() => {
    if (open && closeOnEscape) {
      const handleDocumentKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleClose()
        }
      }
      document.addEventListener('keydown', handleDocumentKeyDown)
      return () => document.removeEventListener('keydown', handleDocumentKeyDown)
    }
  })
</script>

<!-- Backdrop -->
{#if open}
  <div class={actionSheetClasses.backdrop} onclick={handleBackdropClick} role="presentation">
    <!-- Action Sheet Container -->
    <div
      bind:this={sheetElement}
      class={actionSheetClasses.container}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'action-sheet-title' : undefined}
      tabindex="-1"
      onkeydown={handleKeyDown}
      {id}
      {...restProps}
    >
      <!-- Header -->
      {#if title || showCloseButton}
        <div class={actionSheetClasses.header}>
          {#if title}
            <h2 id="action-sheet-title" class={actionSheetClasses.title}>
              {title}
            </h2>
          {/if}

          {#if showCloseButton}
            <IconButton
              variant="ghost"
              color="neutral"
              size="small"
              icon={CloseIcon}
              onclick={handleClose}
              aria-label="Close action sheet"
              {disabled}
            />
          {/if}
        </div>
      {/if}

      <!-- Content -->
      <div class={actionSheetClasses.content}>
        {#if children}
          {@render children()}
        {/if}
      </div>
    </div>
  </div>
{/if}
