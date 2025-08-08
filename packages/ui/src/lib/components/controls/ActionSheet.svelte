<script lang="ts">
  import type { BaseProps, ChildrenComponent } from '@type/component'
  import { createActionSheetStyles } from '@utils/styles'
  import { createKeyboardHandler, KeySets } from '@utils/events'
  import { CloseIcon } from '@icons'
  import IconButton from '@components/core/IconButton.svelte'

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
