/**
 * Focus management utilities for consistent focus handling across components
 *
 * These utilities provide standardized patterns for managing focus states,
 * focus trapping, and keyboard navigation in interactive components.
 *
 * Uses .svelte.ts extension to support Svelte 5 runes
 */

/**
 * Enhanced focus state management with event handling
 */
export function useFocusManagement(
  options: {
    onFocus?: (event: FocusEvent) => void
    onBlur?: (event: FocusEvent) => void
    disabled?: boolean
    autoFocus?: boolean
  } = {}
) {
  let focused = $state(false)
  let element = $state<HTMLElement | null>(null)

  const { onFocus, onBlur, disabled = false, autoFocus = false } = options

  function handleFocus(event: FocusEvent) {
    if (disabled) return

    focused = true
    onFocus?.(event)
  }

  function handleBlur(event: FocusEvent) {
    if (disabled) return

    focused = false
    onBlur?.(event)
  }

  function focus() {
    if (element && !disabled) {
      element.focus()
    }
  }

  function blur() {
    if (element && !disabled) {
      element.blur()
    }
  }

  // Auto-focus on mount if requested
  $effect(() => {
    if (autoFocus && element && !disabled) {
      element.focus()
    }
  })

  return {
    focused: () => focused,
    setElement: (el: HTMLElement | null) => {
      element = el
    },
    handleFocus,
    handleBlur,
    focus,
    blur,
    disabled: () => disabled,
  }
}

/**
 * Focus trap utility for modals and dropdowns
 */
export function useFocusTrap(enabled: boolean = true) {
  let container = $state<HTMLElement | null>(null)
  let firstFocusable = $state<HTMLElement | null>(null)
  let lastFocusable = $state<HTMLElement | null>(null)
  let previouslyFocused = $state<HTMLElement | null>(null)

  const focusableSelector = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"]):not([disabled])',
    '[contenteditable="true"]',
  ].join(',')

  function updateFocusableElements() {
    if (!container) return

    const focusableElements = Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter((el) => {
      const isDisabled = 'disabled' in el && (el as any).disabled
      return !isDisabled && el.tabIndex !== -1
    })

    firstFocusable = focusableElements[0] || null
    lastFocusable = focusableElements[focusableElements.length - 1] || null
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (!enabled || event.key !== 'Tab') return

    updateFocusableElements()

    if (!firstFocusable && !lastFocusable) return

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        event.preventDefault()
        lastFocusable?.focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        event.preventDefault()
        firstFocusable?.focus()
      }
    }
  }

  function activate() {
    if (!enabled || !container) return

    previouslyFocused = document.activeElement as HTMLElement
    updateFocusableElements()

    // Focus first focusable element
    if (firstFocusable) {
      firstFocusable.focus()
    }

    document.addEventListener('keydown', handleKeyDown)
  }

  function deactivate() {
    document.removeEventListener('keydown', handleKeyDown)

    // Restore previous focus
    if (previouslyFocused && document.contains(previouslyFocused)) {
      previouslyFocused.focus()
    }
  }

  // Reactive effect to manage trap state
  $effect(() => {
    if (enabled) {
      activate()
    } else {
      deactivate()
    }

    // Cleanup on destroy
    return () => deactivate()
  })

  return {
    setContainer: (el: HTMLElement | null) => {
      container = el
    },
    activate,
    deactivate,
    updateFocusableElements,
  }
}

/**
 * Keyboard navigation utilities for lists and menus
 */
export function useKeyboardNavigation<T>(options: {
  items: T[]
  onSelect?: (item: T, index: number) => void
  onEscape?: () => void
  loop?: boolean
  orientation?: 'horizontal' | 'vertical'
}) {
  let activeIndex = $state(0)
  const { items, onSelect, onEscape, loop = true, orientation = 'vertical' } = options

  function setActiveIndex(index: number) {
    if (items.length === 0) return

    if (loop) {
      activeIndex = ((index % items.length) + items.length) % items.length
    } else {
      activeIndex = Math.max(0, Math.min(index, items.length - 1))
    }
  }

  function moveNext() {
    setActiveIndex(activeIndex + 1)
  }

  function movePrevious() {
    setActiveIndex(activeIndex - 1)
  }

  function selectCurrent() {
    if (items[activeIndex]) {
      onSelect?.(items[activeIndex], activeIndex)
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    const keys =
      orientation === 'vertical'
        ? { next: 'ArrowDown', previous: 'ArrowUp' }
        : { next: 'ArrowRight', previous: 'ArrowLeft' }

    switch (event.key) {
      case keys.next:
        event.preventDefault()
        moveNext()
        break

      case keys.previous:
        event.preventDefault()
        movePrevious()
        break

      case 'Enter':
      case ' ':
        event.preventDefault()
        selectCurrent()
        break

      case 'Escape':
        event.preventDefault()
        onEscape?.()
        break

      case 'Home':
        event.preventDefault()
        setActiveIndex(0)
        break

      case 'End':
        event.preventDefault()
        setActiveIndex(items.length - 1)
        break
    }
  }

  return {
    activeIndex: () => activeIndex,
    setActiveIndex,
    moveNext,
    movePrevious,
    selectCurrent,
    handleKeyDown,
  }
}

/**
 * Focus visible utility for better UX
 * Only shows focus rings when navigating via keyboard
 */
export function useFocusVisible() {
  let focusVisible = $state(false)
  let hadKeyboardEvent = $state(false)

  function handleKeyDown(event: KeyboardEvent) {
    if (event.metaKey || event.altKey || event.ctrlKey) return
    hadKeyboardEvent = true
  }

  function handlePointerDown() {
    hadKeyboardEvent = false
  }

  function handleFocus() {
    focusVisible = hadKeyboardEvent
  }

  function handleBlur() {
    focusVisible = false
  }

  // Set up global event listeners
  $effect(() => {
    document.addEventListener('keydown', handleKeyDown, true)
    document.addEventListener('mousedown', handlePointerDown, true)
    document.addEventListener('pointerdown', handlePointerDown, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      document.removeEventListener('mousedown', handlePointerDown, true)
      document.removeEventListener('pointerdown', handlePointerDown, true)
    }
  })

  return {
    focusVisible: () => focusVisible,
    handleFocus,
    handleBlur,
  }
}

/**
 * Auto-focus management for components
 */
export function useAutoFocus(shouldAutoFocus: boolean = false, delay: number = 0) {
  let element = $state<HTMLElement | null>(null)

  $effect(() => {
    if (shouldAutoFocus && element) {
      if (delay > 0) {
        setTimeout(() => element?.focus(), delay)
      } else {
        element.focus()
      }
    }
  })

  return {
    setElement: (el: HTMLElement | null) => {
      element = el
    },
  }
}

/**
 * Focus restoration utility
 * Saves and restores focus when components mount/unmount
 */
export function useFocusRestore() {
  let previouslyFocused = $state<HTMLElement | null>(null)

  function save() {
    previouslyFocused = document.activeElement as HTMLElement
  }

  function restore() {
    if (previouslyFocused && document.contains(previouslyFocused)) {
      previouslyFocused.focus()
    }
  }

  // Auto-save on mount
  $effect(() => {
    save()

    // Auto-restore on destroy
    return () => restore()
  })

  return {
    save,
    restore,
    previouslyFocused: () => previouslyFocused,
  }
}

/**
 * Click outside detection with focus management
 */
export function useClickOutside(callback: () => void, enabled: boolean = true) {
  let element = $state<HTMLElement | null>(null)

  function handleClick(event: MouseEvent) {
    if (!enabled || !element) return

    if (!element.contains(event.target as Node)) {
      callback()
    }
  }

  $effect(() => {
    if (enabled) {
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }
  })

  return {
    setElement: (el: HTMLElement | null) => {
      element = el
    },
  }
}

/**
 * Roving tabindex management for composite components
 */
export function useRovingTabIndex<T>(items: T[], initialIndex: number = 0) {
  let activeIndex = $state(initialIndex)

  function getTabIndex(index: number): number {
    return index === activeIndex ? 0 : -1
  }

  function getAriaSelected(index: number): boolean {
    return index === activeIndex
  }

  function setActiveIndex(index: number) {
    activeIndex = Math.max(0, Math.min(index, items.length - 1))
  }

  return {
    activeIndex: () => activeIndex,
    setActiveIndex,
    getTabIndex,
    getAriaSelected,
  }
}

/**
 * Focus management constants and utilities
 */
export const FocusConstants = {
  FOCUSABLE_SELECTORS: [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"]):not([disabled])',
    '[contenteditable="true"]',
  ],

  NAVIGATION_KEYS: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'],
  ACTIVATION_KEYS: ['Enter', ' '],
  ESCAPE_KEYS: ['Escape'],
} as const

/**
 * Utility to find all focusable elements within a container
 */
export function findFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FocusConstants.FOCUSABLE_SELECTORS.join(','))).filter(
    (el) => {
      const isDisabled = 'disabled' in el && (el as any).disabled
      return el.offsetWidth > 0 && el.offsetHeight > 0 && !isDisabled
    }
  )
}

/**
 * Utility to focus the first focusable element in a container
 */
export function focusFirstElement(container: HTMLElement): boolean {
  const focusableElements = findFocusableElements(container)
  const firstElement = focusableElements[0]

  if (firstElement) {
    firstElement.focus()
    return true
  }

  return false
}

/**
 * Utility to focus the last focusable element in a container
 */
export function focusLastElement(container: HTMLElement): boolean {
  const focusableElements = findFocusableElements(container)
  const lastElement = focusableElements[focusableElements.length - 1]

  if (lastElement) {
    lastElement.focus()
    return true
  }

  return false
}
