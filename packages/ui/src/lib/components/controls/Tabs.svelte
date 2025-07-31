<script lang="ts">
  import type { BaseProps, ChangeHandler, InteractiveHandlers } from '../../types/component'

  interface TabItem {
    id: string
    label: string
    disabled?: boolean
  }

  interface Props extends BaseProps, ChangeHandler<string>, InteractiveHandlers {
    tabs: TabItem[]
    activeTab?: string
    size?: 'small' | 'medium' | 'large'
    fullWidth?: boolean
  }

  let {
    tabs = [],
    activeTab = $bindable(),
    size = 'medium',
    fullWidth = false,
    class: className = '',
    id,
    disabled = false,
    onchange,
    onclick,
    onkeydown,
    onfocus,
    onblur,
    ...restProps
  }: Props = $props()

  // Set default active tab if none provided
  $effect(() => {
    if (!activeTab && tabs.length > 0) {
      const firstEnabledTab = tabs.find((tab) => !tab.disabled)
      if (firstEnabledTab) {
        activeTab = firstEnabledTab.id
      }
    }
  })

  function handleTabClick(tab: TabItem) {
    if (disabled || tab.disabled) return

    activeTab = tab.id
    onchange?.(tab.id)
    onclick?.()
  }

  function handleKeyDown(event: KeyboardEvent, tab: TabItem) {
    if (disabled || tab.disabled) return

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        handleTabClick(tab)
        break
      case 'ArrowRight':
        event.preventDefault()
        focusNextTab(tab.id)
        break
      case 'ArrowLeft':
        event.preventDefault()
        focusPreviousTab(tab.id)
        break
    }
    onkeydown?.(event)
  }

  function focusNextTab(currentId: string) {
    const currentIndex = tabs.findIndex((tab) => tab.id === currentId)
    if (currentIndex === -1) return

    // Find next enabled tab
    const enabledTabs = tabs.filter((tab) => !tab.disabled)
    const currentEnabledIndex = enabledTabs.findIndex((tab) => tab.id === currentId)
    const nextEnabledIndex = (currentEnabledIndex + 1) % enabledTabs.length
    const nextTab = enabledTabs[nextEnabledIndex]

    if (nextTab) {
      handleTabClick(nextTab)
    }
  }

  function focusPreviousTab(currentId: string) {
    const currentIndex = tabs.findIndex((tab) => tab.id === currentId)
    if (currentIndex === -1) return

    // Find previous enabled tab
    const enabledTabs = tabs.filter((tab) => !tab.disabled)
    const currentEnabledIndex = enabledTabs.findIndex((tab) => tab.id === currentId)
    const prevEnabledIndex = currentEnabledIndex === 0 ? enabledTabs.length - 1 : currentEnabledIndex - 1
    const prevTab = enabledTabs[prevEnabledIndex]

    if (prevTab) {
      handleTabClick(prevTab)
    }
  }

  let containerClasses = $derived.by(() => {
    const base = 'relative flex'
    const spacing = {
      small: 'gap-4',
      medium: 'gap-6',
      large: 'gap-8',
    }[size]
    const widthClasses = fullWidth ? 'w-full' : ''
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''

    return `${base} ${spacing} ${widthClasses} ${disabledClasses} ${className}`.trim()
  })

  // Typography classes for space reservation
  let activeTypography = $derived({
    small: 'text-h5', // 12px bold
    medium: 'text-h4', // 14px bold
    large: 'text-h3', // 16px bold
  })

  function getTabClasses(tab: TabItem) {
    const isActive = tab.id === activeTab
    const isDisabled = disabled || tab.disabled

    const base = 'relative cursor-pointer text-center whitespace-nowrap focus:outline-none'

    const inactiveTypography = {
      small: 'text-body-s', // 12px regular
      medium: 'text-body-m', // 14px regular
      large: 'text-body-l', // 16px regular
    }[size]

    const typography = isActive ? activeTypography[size] : inactiveTypography

    // Padding based on size
    const padding = {
      small: 'pb-2',
      medium: 'pb-3',
      large: 'pb-4',
    }[size]

    // Color and state classes with smooth transitions
    let colorClasses = ''
    if (isDisabled) {
      colorClasses = 'text-muted cursor-not-allowed opacity-50'
    } else if (isActive) {
      colorClasses = 'text-primary transition-colors duration-200'
    } else {
      colorClasses = 'text-secondary hover:text-primary transition-colors duration-200'
    }

    const widthClasses = fullWidth ? 'flex-1' : ''

    return `${base} ${typography} ${padding} ${colorClasses} ${widthClasses}`.trim()
  }

  // Active tab indicator position and width
  let tabElements: { [key: string]: HTMLButtonElement } = $state({})
  let tabWidths: { [key: string]: number } = $state({})
  let indicatorStyle = $state('')

  // Helper function to schedule layout operations with appropriate timing
  function scheduleLayoutUpdate(callback: () => void, isFullWidth = false) {
    if (isFullWidth) {
      // Full width tabs need extra time for flex layout to settle
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(callback, 10)
        })
      })
    } else {
      // Regular tabs can use standard RAF timing
      requestAnimationFrame(() => {
        requestAnimationFrame(callback)
      })
    }
  }

  function measureAndSetTabWidths() {
    if (fullWidth) {
      // For full width tabs, don't set fixed widths - let CSS flex handle it
      // Just measure current widths for indicator positioning
      tabs.forEach((tab) => {
        const element = tabElements[tab.id]
        if (element) {
          tabWidths[tab.id] = element.offsetWidth
        }
      })
    } else {
      // For non-full width tabs, measure bold state and set fixed widths
      tabs.forEach((tab) => {
        const element = tabElements[tab.id]
        if (element) {
          // Temporarily apply bold typography to measure max width
          const originalClasses = element.className
          const boldTypography = activeTypography[size]
          element.className = `${element.className.replace(/text-\w+/g, '')} ${boldTypography}`

          // Measure the width
          const width = element.offsetWidth
          tabWidths[tab.id] = width

          // Restore original classes
          element.className = originalClasses
        }
      })

      // Apply fixed widths to prevent layout shifts (only for non-full width)
      tabs.forEach((tab) => {
        const element = tabElements[tab.id]
        if (element && tabWidths[tab.id]) {
          element.style.width = `${tabWidths[tab.id]}px`
        }
      })
    }

    updateIndicator()
  }

  function updateIndicator() {
    if (activeTab && tabElements[activeTab] && tabWidths[activeTab]) {
      const activeElement = tabElements[activeTab]
      if (activeElement) {
        const containerRect = activeElement.parentElement?.getBoundingClientRect()
        const rect = activeElement.getBoundingClientRect()

        if (containerRect && rect) {
          const tabWidth = tabWidths[activeTab]
          if (tabWidth) {
            const left = rect.left - containerRect.left
            const width = tabWidth * 0.8 // Make indicator narrower (80% of tab width)
            const offset = (tabWidth - width) / 2 // Center the narrower indicator

            indicatorStyle = `left: ${left + offset}px; width: ${width}px;`
          }
        }
      }
    }
  }

  // Helper to check if all tabs are mounted
  function areAllTabsMounted() {
    return tabs.every((tab) => tabElements[tab.id]) && tabs.length > 0
  }

  // Initial measurement when tabs are mounted
  $effect(() => {
    if (areAllTabsMounted()) {
      scheduleLayoutUpdate(() => measureAndSetTabWidths(), fullWidth)
    }
  })

  // Update indicator when active tab changes
  $effect(() => {
    if (activeTab && tabElements[activeTab] && tabWidths[activeTab]) {
      if (fullWidth) {
        // Full width tabs need extra timing for flex layout
        scheduleLayoutUpdate(() => updateIndicator(), true)
      } else {
        updateIndicator()
      }
    }
  })

  // Re-measure when fullWidth property changes
  $effect(() => {
    if (areAllTabsMounted()) {
      scheduleLayoutUpdate(() => measureAndSetTabWidths(), fullWidth)
    }
  })

  // Handle window resize to re-position indicator
  $effect(() => {
    function handleResize() {
      if (areAllTabsMounted()) {
        scheduleLayoutUpdate(() => measureAndSetTabWidths(), fullWidth)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
</script>

<div class={containerClasses} role="tablist" aria-label="Tabs" {id} {...restProps}>
  {#each tabs as tab}
    <button
      type="button"
      role="tab"
      aria-selected={tab.id === activeTab}
      aria-disabled={disabled || tab.disabled}
      tabindex={disabled || tab.disabled ? -1 : 0}
      class={getTabClasses(tab)}
      disabled={disabled || tab.disabled}
      onclick={() => handleTabClick(tab)}
      onkeydown={(e) => handleKeyDown(e, tab)}
      onfocus={(e) => onfocus?.(e)}
      onblur={(e) => onblur?.(e)}
      bind:this={tabElements[tab.id]}
    >
      {tab.label}
    </button>
  {/each}

  <!-- Animated bottom border indicator -->
  <div
    class="bg-highlight absolute bottom-0 h-1 rounded-full transition-all duration-300 ease-out"
    style={indicatorStyle}
  ></div>
</div>
