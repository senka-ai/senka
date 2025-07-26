<script lang="ts">
  import { CloseIcon } from '../../icons'
  import type { BaseProps } from '../../types/component'
  import { createDialogStyles } from '../../utils/styles'
  import Button from '../core/Button.svelte'

  /**
   * Dialog component props interface
   * A modal dialog that interrupts the user journey for important actions or information
   */
  interface Props extends BaseProps {
    /** Whether the dialog is open @default false */
    open?: boolean
    /** Dialog title text */
    title?: string
    /** Dialog description/body text */
    description?: string
    /** Whether to show the title @default true */
    showTitle?: boolean
    /** Whether to show the description @default true */
    showDescription?: boolean
    /** Whether to show the close button (X) @default true */
    showCloseButton?: boolean
    /** Whether clicking the backdrop closes the dialog @default true */
    closeOnBackdrop?: boolean
    /** Whether pressing Escape closes the dialog @default true */
    closeOnEscape?: boolean
    /** Primary button text @default 'OK' */
    primaryButtonText?: string
    /** Secondary button text @default 'Cancel' */
    secondaryButtonText?: string
    /** Tertiary button text (for 3-button variant) */
    tertiaryButtonText?: string
    /** Primary button variant @default 'primary' */
    primaryButtonVariant?: 'primary' | 'secondary' | 'tertiary'
    /** Secondary button variant @default 'secondary' */
    secondaryButtonVariant?: 'primary' | 'secondary' | 'tertiary'
    /** Tertiary button variant @default 'tertiary' */
    tertiaryButtonVariant?: 'primary' | 'secondary' | 'tertiary'
    /** Whether to show the primary button @default true */
    showPrimaryButton?: boolean
    /** Whether to show the secondary button @default true */
    showSecondaryButton?: boolean
    /** Whether to show the tertiary button @default false */
    showTertiaryButton?: boolean
    /** Called when the primary button is clicked */
    onPrimaryClick?: () => void
    /** Called when the secondary button is clicked */
    onSecondaryClick?: () => void
    /** Called when the tertiary button is clicked */
    onTertiaryClick?: () => void
    /** Called when the dialog should be closed (close button, backdrop, escape) */
    onClose?: () => void
    /** Custom dialog content (overrides title/description) */
    children?: any
  }

  let {
    open = false,
    title = 'Dialog Title',
    description = 'This is the dialog description explaining what action is being taken.',
    showTitle = true,
    showDescription = true,
    showCloseButton = true,
    closeOnBackdrop = true,
    closeOnEscape = true,
    primaryButtonText = 'OK',
    secondaryButtonText = 'Cancel',
    tertiaryButtonText = 'Maybe Later',
    primaryButtonVariant = 'primary',
    secondaryButtonVariant = 'secondary',
    tertiaryButtonVariant = 'tertiary',
    showPrimaryButton = true,
    showSecondaryButton = true,
    showTertiaryButton = false,
    onPrimaryClick,
    onSecondaryClick,
    onTertiaryClick,
    onClose,
    disabled = false,
    class: className = '',
    id,
    children,
    ...restProps
  }: Props = $props()

  let dialogClasses = $derived(
    createDialogStyles({
      disabled,
      className,
    })
  )

  // Handle backdrop click
  const handleBackdropClick = (event: MouseEvent) => {
    if (closeOnBackdrop && event.target === event.currentTarget) {
      onClose?.()
    }
  }

  // Handle escape key
  const handleKeyDown = (event: KeyboardEvent) => {
    if (closeOnEscape && event.key === 'Escape') {
      onClose?.()
    }
  }

  // Handle close button click
  const handleCloseClick = () => {
    onClose?.()
  }

  // Handle button clicks
  const handlePrimaryClick = () => {
    if (!disabled) {
      onPrimaryClick?.()
    }
  }

  const handleSecondaryClick = () => {
    if (!disabled) {
      onSecondaryClick?.()
    }
  }

  const handleTertiaryClick = () => {
    if (!disabled) {
      onTertiaryClick?.()
    }
  }

  // Determine button layout
  let hasMultipleButtons = $derived(
    (showPrimaryButton ? 1 : 0) + (showSecondaryButton ? 1 : 0) + (showTertiaryButton ? 1 : 0) > 1
  )

  // Focus management - focus the dialog when it opens
  let dialogElement: HTMLElement | undefined = $state()

  $effect(() => {
    if (open && dialogElement) {
      dialogElement.focus()
    }
  })

  // Handle document event listeners
  $effect(() => {
    if (open) {
      const handleDocumentKeyDown = (event: KeyboardEvent) => {
        handleKeyDown(event)
      }

      document.addEventListener('keydown', handleDocumentKeyDown)
      // Prevent body scroll when dialog is open
      document.body.style.overflow = 'hidden'

      return () => {
        document.removeEventListener('keydown', handleDocumentKeyDown)
        document.body.style.overflow = ''
      }
    }
  })
</script>

{#if open}
  <!-- Backdrop/Overlay -->
  <div class={dialogClasses.backdrop} onclick={handleBackdropClick} role="presentation">
    <!-- Dialog Container -->
    <div
      bind:this={dialogElement}
      class={dialogClasses.container}
      role="dialog"
      aria-modal="true"
      aria-labelledby={showTitle ? 'dialog-title' : undefined}
      aria-describedby={showDescription ? 'dialog-description' : undefined}
      tabindex="-1"
      {id}
      {...restProps}
    >
      <!-- Close Button -->
      {#if showCloseButton}
        <button
          class={dialogClasses.closeButton}
          onclick={handleCloseClick}
          aria-label="Close dialog"
          type="button"
          {disabled}
        >
          <CloseIcon class="h-5 w-5" size={20} />
        </button>
      {/if}

      <!-- Dialog Content -->
      <div class={dialogClasses.content}>
        {#if children}
          {@render children()}
        {:else}
          <!-- Title -->
          {#if showTitle && title}
            <h2 id="dialog-title" class={dialogClasses.title}>
              {title}
            </h2>
          {/if}

          <!-- Description -->
          {#if showDescription && description}
            <p id="dialog-description" class={dialogClasses.description}>
              {description}
            </p>
          {/if}
        {/if}
      </div>

      <!-- Button Actions -->
      {#if showPrimaryButton || showSecondaryButton || showTertiaryButton}
        <div class={dialogClasses.actions}>
          <!-- Tertiary Button (leftmost when shown) -->
          {#if showTertiaryButton}
            <Button
              variant={tertiaryButtonVariant}
              onclick={handleTertiaryClick}
              {disabled}
              fullWidth={!hasMultipleButtons}
            >
              {#snippet children()}{tertiaryButtonText}{/snippet}
            </Button>
          {/if}

          <!-- Secondary Button -->
          {#if showSecondaryButton}
            <Button
              variant={secondaryButtonVariant}
              onclick={handleSecondaryClick}
              {disabled}
              fullWidth={!hasMultipleButtons}
            >
              {#snippet children()}{secondaryButtonText}{/snippet}
            </Button>
          {/if}

          <!-- Primary Button (rightmost/emphasized) -->
          {#if showPrimaryButton}
            <Button
              variant={primaryButtonVariant}
              onclick={handlePrimaryClick}
              {disabled}
              fullWidth={!hasMultipleButtons}
            >
              {#snippet children()}{primaryButtonText}{/snippet}
            </Button>
          {/if}
        </div>
      {/if}
    </div>
  </div>
{/if}
