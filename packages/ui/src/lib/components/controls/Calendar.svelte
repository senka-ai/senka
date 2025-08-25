<script lang="ts">
  import type { BaseProps, SizedComponent, ChangeHandler, InteractiveHandlers } from '@ui/type/component'
  import { ArrowLeftIcon, ArrowRightIcon } from '@ui/icons'
  import { createStyleComposer } from '@ui/utils/styles'
  import IconButton from '@ui/components/core/IconButton.svelte'

  interface CalendarLabels {
    /** Month names (12 entries: January, February, ...) */
    months?: string[]
    /** Short month names (12 entries: Jan, Feb, ...) */
    monthsShort?: string[]
    /** Day names (7 entries: Sunday, Monday, ...) */
    days?: string[]
    /** Short day names (7 entries: Sun, Mon, ...) */
    daysShort?: string[]
    /** Very short day names (7 entries: SU, MO, ...) */
    daysMin?: string[]
  }

  interface Props extends BaseProps, SizedComponent, ChangeHandler<Date>, InteractiveHandlers {
    /** Currently selected date */
    selectedDate?: Date
    /** Currently displayed month/year */
    currentMonth?: Date
    /** Today's date (for visual testing consistency) */
    today?: Date
    /** Minimum selectable date */
    minDate?: Date
    /** Maximum selectable date */
    maxDate?: Date
    /** Whether the calendar is read-only */
    readonly?: boolean
    /** Calendar view mode */
    view?: 'month' | 'week'
    /** Start day of week (0 = Sunday, 1 = Monday) */
    startOfWeek?: 0 | 1
    /** Format for displaying dates - fallback for aria-labels */
    locale?: string
    /** Whether calendar should fill container width */
    fullWidth?: boolean
    /** Header navigation layout */
    headerLayout?: 'spread' | 'grouped'
    /** Custom labels for months and days */
    labels?: CalendarLabels
    /** Custom function to determine if a date should be disabled */
    isDateDisabled?: (date: Date) => boolean
  }

  let {
    selectedDate = undefined,
    currentMonth = new Date(),
    today = undefined,
    minDate = undefined,
    maxDate = undefined,
    readonly = false,
    view = 'month',
    startOfWeek = 1,
    locale = 'en-US',
    fullWidth = false,
    headerLayout = 'grouped',
    labels = undefined,
    isDateDisabled: customIsDateDisabled = undefined,
    size = 'medium',
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

  // Default labels for English
  const defaultLabels: Required<CalendarLabels> = {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysMin: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
  }

  // Merge custom labels with defaults
  const currentLabels = $derived({
    months: labels?.months || defaultLabels.months,
    monthsShort: labels?.monthsShort || defaultLabels.monthsShort,
    days: labels?.days || defaultLabels.days,
    daysShort: labels?.daysShort || defaultLabels.daysShort,
    daysMin: labels?.daysMin || defaultLabels.daysMin,
  })

  // Controlled/uncontrolled state management following Svelte 5 patterns
  let internalSelectedDate = $state(selectedDate || new Date())

  // Determine if we're in controlled mode
  const isControlled = $derived(selectedDate !== undefined)

  // The current selected date value
  const currentSelectedDate = $derived(isControlled ? selectedDate! : internalSelectedDate)

  // Update internal state when controlled value changes
  $effect(() => {
    if (selectedDate !== undefined) {
      internalSelectedDate = selectedDate
    }
  })

  // Initialize focused date to selected date or today on mount
  $effect(() => {
    if (!focusedDate) {
      focusedDate = currentSelectedDate || new Date()
    }
  })

  // Track current displayed month
  let displayMonth = $state(new Date(currentMonth))

  // Focus management
  let focusedDate = $state<Date | null>(null)

  // Keep track of DOM button elements for focus management
  let dateButtons = $state<Record<string, HTMLButtonElement>>({})

  // Reference to the calendar grid for focusing
  let calendarGrid = $state<HTMLDivElement | null>(null)

  // Helper to get date key for button tracking
  function getDateKey(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

  // Helper to focus the calendar grid
  function focusCalendarGrid() {
    if (calendarGrid) {
      calendarGrid.focus()
      // Set focused date to selected date or today if no focused date exists
      if (!focusedDate) {
        focusedDate = currentSelectedDate || new Date()
      }
    }
  }

  // Helper to focus a specific date
  function focusDate(date: Date, retryCount = 0) {
    const dateKey = getDateKey(date)
    const button = dateButtons[dateKey]

    if (button) {
      button.focus()
    } else if (retryCount < 3) {
      // Button not found, wait a bit longer and retry
      setTimeout(() => focusDate(date, retryCount + 1), 20)
    }
  }

  // Get month/year info
  const monthYear = $derived({
    month: displayMonth.getMonth(),
    year: displayMonth.getFullYear(),
  })

  // Get month name from custom labels
  const monthName = $derived.by(() => {
    const monthNames = currentLabels.months
    return `${monthNames[monthYear.month]} ${monthYear.year}`
  })

  // Day headers based on start of week and custom labels
  const dayHeaders = $derived.by(() => {
    const days = currentLabels.daysMin
    if (startOfWeek === 1) {
      // Move Sunday to end for Monday start
      return [...days.slice(1), days[0]]
    }
    return days
  })

  // Define day type
  type CalendarDay = {
    date: Date
    isCurrentMonth: boolean
    isToday: boolean
    isSelected: boolean
    isDisabled: boolean
  }

  // Get calendar grid for current month
  const calendarDays = $derived.by((): CalendarDay[] => {
    const firstDay = new Date(monthYear.year, monthYear.month, 1)
    const lastDay = new Date(monthYear.year, monthYear.month + 1, 0)
    const daysInMonth = lastDay.getDate()

    // Get the first day of week for the month (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = firstDay.getDay()

    // Adjust for start of week preference
    if (startOfWeek === 1) {
      firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
    }

    const days: CalendarDay[] = []

    // Add previous month's trailing days
    const prevMonthLastDay = new Date(monthYear.year, monthYear.month, 0).getDate()
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(monthYear.year, monthYear.month - 1, prevMonthLastDay - i)
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isDisabled: true,
      })
    }

    // Add current month's days
    const todayDate = today || new Date()
    todayDate.setHours(0, 0, 0, 0)

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(monthYear.year, monthYear.month, day)
      const isToday = date.getTime() === todayDate.getTime()
      const isSelected = currentSelectedDate ? isSameDate(date, currentSelectedDate) : false
      const isDisabled = isDateDisabled(date)

      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelected,
        isDisabled,
      })
    }

    // Add next month's leading days only if needed to complete partial weeks
    // Calculate how many days we need to complete the current week
    const totalDays = days.length
    const weeksNeeded = Math.ceil(totalDays / 7)
    const daysNeeded = weeksNeeded * 7
    const remainingDays = daysNeeded - totalDays

    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(monthYear.year, monthYear.month + 1, day)
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isDisabled: true,
      })
    }

    return days
  })

  // Helper functions
  function isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  function isDateDisabled(date: Date): boolean {
    // Check min/max date range
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true

    // Check custom validation function
    if (customIsDateDisabled && customIsDateDisabled(date)) return true

    return false
  }

  // Create accessible aria-label using custom labels
  function getDateAriaLabel(date: Date): string {
    const dayName = currentLabels.days[date.getDay()]
    const monthName = currentLabels.months[date.getMonth()]
    const dayNumber = date.getDate()
    const year = date.getFullYear()
    return `${dayName}, ${monthName} ${dayNumber}, ${year}`
  }

  // Navigation functions
  function goToPreviousMonth() {
    if (disabled) return
    displayMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1, 1)
  }

  function goToNextMonth() {
    if (disabled) return
    displayMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 1)
  }

  // Navigation with event stopping
  function handlePreviousMonth(event: MouseEvent | KeyboardEvent) {
    event.stopPropagation()
    goToPreviousMonth()
  }

  function handleNextMonth(event: MouseEvent | KeyboardEvent) {
    event.stopPropagation()
    goToNextMonth()
  }

  // Date selection
  function handleDateClick(day: CalendarDay, event: MouseEvent) {
    if (disabled || readonly || day.isDisabled || !day.isCurrentMonth) return

    // Prevent event from bubbling to calendar container
    event.stopPropagation()

    if (!isControlled) {
      internalSelectedDate = day.date
    }
    onchange?.(day.date)
    focusedDate = day.date
    focusCalendarGrid() // Focus the grid when a date is clicked
    onclick?.()
  }

  // Grid-level keyboard navigation
  function handleGridKeyDown(event: KeyboardEvent) {
    if (disabled || readonly) return

    const currentFocused = focusedDate || currentSelectedDate || new Date()
    let newFocusedDate = new Date(currentFocused)

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        newFocusedDate.setDate(newFocusedDate.getDate() + 1)
        break
      case 'ArrowLeft':
        event.preventDefault()
        newFocusedDate.setDate(newFocusedDate.getDate() - 1)
        break
      case 'ArrowDown':
        event.preventDefault()
        newFocusedDate.setDate(newFocusedDate.getDate() + 7)
        break
      case 'ArrowUp':
        event.preventDefault()
        newFocusedDate.setDate(newFocusedDate.getDate() - 7)
        break
      case 'Home':
        event.preventDefault()
        newFocusedDate.setDate(1)
        break
      case 'End':
        event.preventDefault()
        const lastDay = new Date(newFocusedDate.getFullYear(), newFocusedDate.getMonth() + 1, 0)
        newFocusedDate = lastDay
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        // Find the current focused day and select it
        const focusedDay = calendarDays.find((day) => day.isCurrentMonth && isSameDate(day.date, currentFocused))
        if (focusedDay) {
          // Handle keyboard selection without event propagation concerns
          if (!isControlled) {
            internalSelectedDate = focusedDay.date
          }
          onchange?.(focusedDay.date)
          focusedDate = focusedDay.date
          onclick?.()
        }
        return
      default:
        return // Don't handle other keys
    }

    // Update focused date and month if needed
    focusedDate = newFocusedDate

    // Update display month if needed
    if (
      newFocusedDate.getMonth() !== displayMonth.getMonth() ||
      newFocusedDate.getFullYear() !== displayMonth.getFullYear()
    ) {
      displayMonth = new Date(newFocusedDate.getFullYear(), newFocusedDate.getMonth(), 1)
    }

    // Focus the new date after a brief delay to allow DOM updates
    setTimeout(() => focusDate(newFocusedDate), 10)

    onkeydown?.(event)
  }

  // Style composition
  const createCalendarStyles = createStyleComposer({
    base: 'bg-background',
    variants: {
      default: '',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    sizes: {
      small: 'p-3 w-fit',
      medium: 'p-4 w-fit',
      large: 'p-5 w-fit',
    },
  })

  let containerClasses = $derived(
    createCalendarStyles({
      variant: disabled ? 'disabled' : 'default',
      size,
      className,
      modifiers: {
        'w-full': fullWidth,
      },
    })
  )

  // Day cell styling
  function getDayCellClasses(day: CalendarDay) {
    // Responsive day cell sizing based on fullWidth and size - these define the grid cell size
    const baseSizing = fullWidth
      ? 'aspect-square relative flex items-center justify-center'
      : {
          small: 'w-7 h-7',
          medium: 'w-8.5 h-8.5',
          large: 'w-10 h-10',
        }[size] + ' relative flex items-center justify-center'

    const baseClasses = `${baseSizing} text-h5 transition-all duration-200 cursor-pointer`

    let classes = baseClasses

    if (day.isDisabled || disabled || readonly) {
      classes += ' cursor-not-allowed opacity-50'
    } else if (!day.isCurrentMonth) {
      classes += ' text-neutral-400'
    }

    return classes
  }

  // Inner circle styling for selected/today/hover states
  function getDayInnerClasses(day: CalendarDay) {
    // Circle sizes - larger for fullWidth mode due to responsive cells
    const circleSize = fullWidth
      ? 'w-12 h-12' // Large circles for fullWidth responsive cells
      : {
          small: 'w-8 h-8',
          medium: 'w-9 h-9', // Can be bigger than the w-8.5 container
          large: 'w-11 h-11', // Can be bigger than the w-10 container
        }[size]

    const baseInnerClasses = `absolute inset-0 m-auto ${circleSize} flex items-center justify-center rounded-full transition-all duration-200`
    const isFocused = focusedDate && isSameDate(day.date, focusedDate)

    if (day.isSelected) {
      return `${baseInnerClasses} bg-highlight text-white`
    } else if (day.isToday) {
      return `${baseInnerClasses} bg-highlight-50 text-highlight font-semibold`
    } else if (isFocused) {
      return `${baseInnerClasses} text-neutral-700 bg-neutral-200`
    } else if (!day.isCurrentMonth) {
      return `${baseInnerClasses} text-neutral-400`
    } else {
      // Show circle on hover for all current month days
      return `${baseInnerClasses} text-neutral-700 hover:bg-neutral-200`
    }
  }

  // Icon size based on component size
  const iconSize = $derived(
    {
      small: 16,
      medium: 20,
      large: 24,
    }[size]
  )

  // IconButton size mapping (IconButton sizes: small, medium, large)
  const iconButtonSize = $derived(
    fullWidth
      ? 'medium' // Medium IconButtons for fullWidth mode
      : ({
          small: 'small',
          medium: 'small',
          large: 'medium',
        }[size] as 'small' | 'medium' | 'large')
  )
</script>

<div class={containerClasses} {id} {...restProps} onclick={focusCalendarGrid}>
  <!-- Header with month navigation -->
  {#if headerLayout === 'spread'}
    <!-- Spread layout: Previous arrow | Month name | Next arrow -->
    <div class="mb-4 flex items-center justify-between">
      <div
        role="button"
        tabindex="-1"
        onclick={handlePreviousMonth}
        onkeydown={(e) => (e.key === 'Enter' || e.key === ' ' ? handlePreviousMonth(e) : undefined)}
      >
        <IconButton
          icon={ArrowLeftIcon}
          {iconSize}
          variant="ghost"
          color="neutral"
          size={iconButtonSize}
          {disabled}
          aria-label="Previous month"
          onclick={goToPreviousMonth}
        />
      </div>

      <h4 class="text-h4">
        {monthName}
      </h4>

      <div
        role="button"
        tabindex="-1"
        onclick={handleNextMonth}
        onkeydown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleNextMonth(e) : undefined)}
      >
        <IconButton
          icon={ArrowRightIcon}
          {iconSize}
          variant="ghost"
          color="neutral"
          size={iconButtonSize}
          {disabled}
          aria-label="Next month"
          onclick={goToNextMonth}
        />
      </div>
    </div>
  {:else}
    <!-- Grouped layout: Month name | Both arrows grouped on right -->
    <div class="mb-4 flex items-center justify-between">
      <h4 class="text-h4 {fullWidth ? 'pl-3' : size === 'small' ? 'pl-1' : size === 'medium' ? 'pl-2' : 'pl-3'}">
        {monthName}
      </h4>

      <div class="flex items-center gap-1">
        <div
          role="button"
          tabindex="-1"
          onclick={handlePreviousMonth}
          onkeydown={(e) => (e.key === 'Enter' || e.key === ' ' ? handlePreviousMonth(e) : undefined)}
        >
          <IconButton
            icon={ArrowLeftIcon}
            {iconSize}
            variant="ghost"
            color="neutral"
            size={iconButtonSize}
            {disabled}
            aria-label="Previous month"
            onclick={goToPreviousMonth}
          />
        </div>

        <div
          role="button"
          tabindex="-1"
          onclick={handleNextMonth}
          onkeydown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleNextMonth(e) : undefined)}
        >
          <IconButton
            icon={ArrowRightIcon}
            {iconSize}
            variant="ghost"
            color="neutral"
            size={iconButtonSize}
            {disabled}
            aria-label="Next month"
            onclick={goToNextMonth}
          />
        </div>
      </div>
    </div>
  {/if}

  <!-- Day headers -->
  <div class="mb-2 grid grid-cols-7 gap-1">
    {#each dayHeaders as dayHeader}
      <div class="text-body-xs py-2 text-center font-medium text-neutral-600">
        {dayHeader}
      </div>
    {/each}
  </div>

  <!-- Calendar grid -->
  <div
    bind:this={calendarGrid}
    class="grid grid-cols-7 gap-1"
    role="grid"
    aria-label="Calendar"
    tabindex="0"
    onkeydown={(event) => handleGridKeyDown(event)}
  >
    {#each calendarDays as day}
      <button
        type="button"
        role="gridcell"
        class={getDayCellClasses(day)}
        aria-selected={day.isSelected}
        aria-label={getDateAriaLabel(day.date)}
        tabindex="-1"
        disabled={day.isDisabled || disabled || !day.isCurrentMonth}
        bind:this={dateButtons[getDateKey(day.date)]}
        onclick={(event) => handleDateClick(day, event)}
        onfocus={(e) => {
          focusedDate = day.date
          onfocus?.(e)
        }}
        onblur={(e) => {
          onblur?.(e)
        }}
      >
        <div class={getDayInnerClasses(day)}>
          {day.date.getDate()}
        </div>
      </button>
    {/each}
  </div>
</div>
