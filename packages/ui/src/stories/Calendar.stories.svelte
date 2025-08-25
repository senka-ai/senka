<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Calendar from '@ui/components/controls/Calendar.svelte'
  import Toast from '@ui/components/feedback/Toast.svelte'

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()

  // Fixed dates for visual testing consistency
  const VISUAL_TEST_YEAR = 2025
  const VISUAL_TEST_MONTH = 6 // July (0-indexed)
  const VISUAL_TEST_DAY = 15 // Mid-month to avoid edge cases
  const VISUAL_TEST_TODAY = 10 // Fixed "today" date for consistent visual tests

  // Use fixed dates for visual consistency
  // Visual tests add ?visualTest=true to the URL, Storybook browser viewing doesn't
  const isVisualTest = window?.location?.search?.includes('visualTest=true')
  const testYear = isVisualTest ? VISUAL_TEST_YEAR : currentYear
  const testMonth = isVisualTest ? VISUAL_TEST_MONTH : currentMonth

  // For Storybook: calculate selected day as 5 days before/after current day, staying in same month
  const testDay = (() => {
    if (isVisualTest) {
      return VISUAL_TEST_DAY
    }

    const today = new Date()
    const currentDayOfMonth = today.getDate()
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

    // Try 5 days after first, then 5 days before if that goes outside the month
    const fiveDaysAfter = currentDayOfMonth + 5
    const fiveDaysBefore = currentDayOfMonth - 5

    if (fiveDaysAfter <= daysInMonth) {
      return fiveDaysAfter
    } else if (fiveDaysBefore >= 1) {
      return fiveDaysBefore
    } else {
      // Fallback: stay in middle of month if both options go outside
      return Math.floor(daysInMonth / 2)
    }
  })()

  const testToday = isVisualTest ? new Date(VISUAL_TEST_YEAR, VISUAL_TEST_MONTH, VISUAL_TEST_TODAY) : new Date()

  // Comprehensive interactive state management for ALL calendar examples
  let calendarStates = $state({
    // Main stories
    default: new Date(testYear, testMonth, testDay),
    interactive: new Date(testYear, testMonth, testDay),
    booking: new Date(testYear, testMonth, testDay),

    // Overview section
    overviewSmall: new Date(testYear, testMonth, testDay),
    overviewMedium: new Date(testYear, testMonth, testDay),
    overviewLarge: new Date(testYear, testMonth, testDay),
    overviewSundayStart: new Date(testYear, testMonth, testDay),
    overviewMondayStart: new Date(testYear, testMonth, testDay),
    overviewDefault: new Date(testYear, testMonth, testDay),
    overviewReadonly: new Date(testYear, testMonth, testDay),
    overviewDisabled: new Date(testYear, testMonth, testDay),
    overviewGrouped: new Date(testYear, testMonth, testDay),
    overviewSpread: new Date(testYear, testMonth, testDay),
    overviewFixed: new Date(testYear, testMonth, testDay),
    overviewFullWidth: new Date(testYear, testMonth, testDay),

    // Individual story variants
    small: new Date(testYear, testMonth, testDay),
    medium: new Date(testYear, testMonth, testDay),
    large: new Date(testYear, testMonth, testDay),
    sundayStart: new Date(testYear, testMonth, testDay),
    mondayStart: new Date(testYear, testMonth, testDay),
    readonly: new Date(testYear, testMonth, testDay),
    disabled: new Date(testYear, testMonth, testDay),
    fullWidth: new Date(testYear, testMonth, testDay),
    spreadHeader: new Date(testYear, testMonth, testDay),

    // Date range examples
    hotelBooking: new Date(testYear, testMonth, testDay + 7),
    eventRegistration: new Date(testYear, testMonth, testDay + 14),
    limitedAvailability: new Date(testYear, testMonth, 20),

    // Custom validation examples
    businessHours: new Date(testYear, testMonth, testDay + (7 - new Date().getDay() + 1)),
    holidayBlackout: new Date(testYear, testMonth, testDay + 3),
    complexRules: new Date(testYear, testMonth, testDay % 2 === 0 ? testDay + 2 : testDay + 1),

    // Language examples
    englishShort: new Date(testYear, testMonth, testDay),
    spanish: new Date(testYear, testMonth, testDay),
    spanishShort: new Date(testYear, testMonth, testDay),
    french: new Date(testYear, testMonth, testDay),
  })

  // Generic handler for calendar state updates
  function createCalendarHandler(stateKey: string) {
    return (date: Date) => {
      ;(calendarStates as any)[stateKey] = date
      console.log(`${stateKey} calendar date selected:`, date)
    }
  }

  const { Story } = defineMeta({
    title: 'Controls/Calendar',
    component: Calendar,
    args: {
      selectedDate: new Date(testYear, testMonth, testDay), // day 25 for Storybook, day 15 for visual tests
      currentMonth: new Date(testYear, testMonth, testDay), // Ensure calendar shows the selected date's month
      today: testToday, // Current date for Storybook, fixed date for visual tests
      size: 'medium',
      disabled: false,
      readonly: false,
      view: 'month',
      startOfWeek: 1,
      locale: 'en-US',
    },
    argTypes: {
      selectedDate: {
        control: { type: 'date' },
        description: 'Currently selected date',
      },
      currentMonth: {
        control: { type: 'date' },
        description: 'Currently displayed month',
      },
      size: {
        control: { type: 'select' },
        options: ['small', 'medium', 'large'],
        description: 'Calendar size',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      readonly: {
        control: { type: 'boolean' },
        description: 'Read-only state',
      },
      view: {
        control: { type: 'select' },
        options: ['month', 'week'],
        description: 'Calendar view mode',
      },
      startOfWeek: {
        control: { type: 'select' },
        options: [0, 1],
        description: 'Start of week (0 = Sunday, 1 = Monday)',
        mapping: {
          Sunday: 0,
          Monday: 1,
        },
      },
      locale: {
        control: { type: 'text' },
        description: 'Locale for date formatting',
      },
      fullWidth: {
        control: { type: 'boolean' },
        description: 'Whether calendar should fill container width',
      },
      headerLayout: {
        control: { type: 'select' },
        options: ['spread', 'grouped'],
        description: 'Header navigation layout - spread or grouped arrows',
      },
      labels: {
        control: { type: 'object' },
        description: 'Custom labels for months and days',
      },
      isDateDisabled: {
        control: false,
        description: 'Custom function to determine if a date should be disabled',
      },
      minDate: {
        control: { type: 'date' },
        description: 'Minimum selectable date',
      },
      maxDate: {
        control: { type: 'date' },
        description: 'Maximum selectable date',
      },
      onchange: {
        control: false,
        description: 'Called when date selection changes - receives selected Date',
      },
      onclick: {
        control: false,
        description: 'Called when a date is clicked',
      },
    },
  })
</script>

<Story name="Overview" parameters={{ layout: 'full' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Sizes Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Sizes</h3>
        <div class="flex flex-wrap items-start gap-8">
          <div class="flex flex-col items-center gap-2">
            <Calendar
              size="small"
              selectedDate={calendarStates.overviewSmall}
              currentMonth={calendarStates.overviewSmall}
              today={testToday}
              onchange={createCalendarHandler('overviewSmall')}
            />
            <span class="text-sm text-neutral-600">Small</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Calendar
              size="medium"
              selectedDate={calendarStates.overviewMedium}
              currentMonth={calendarStates.overviewMedium}
              today={testToday}
              onchange={createCalendarHandler('overviewMedium')}
            />
            <span class="text-sm text-neutral-600">Medium</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Calendar
              size="large"
              selectedDate={calendarStates.overviewLarge}
              currentMonth={calendarStates.overviewLarge}
              today={testToday}
              onchange={createCalendarHandler('overviewLarge')}
            />
            <span class="text-sm text-neutral-600">Large</span>
          </div>
        </div>
      </div>

      <!-- Different Start of Week -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Start of Week</h3>
        <div class="flex flex-wrap items-start gap-8">
          <div class="flex flex-col items-center gap-2">
            <Calendar
              startOfWeek={0}
              selectedDate={calendarStates.overviewSundayStart}
              currentMonth={calendarStates.overviewSundayStart}
              today={testToday}
              onchange={createCalendarHandler('overviewSundayStart')}
            />
            <span class="text-sm text-neutral-600">Sunday Start</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Calendar
              startOfWeek={1}
              selectedDate={calendarStates.overviewMondayStart}
              currentMonth={calendarStates.overviewMondayStart}
              today={testToday}
              onchange={createCalendarHandler('overviewMondayStart')}
            />
            <span class="text-sm text-neutral-600">Monday Start</span>
          </div>
        </div>
      </div>

      <!-- States Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States</h3>
        <div class="flex flex-wrap items-start gap-8">
          <div class="flex flex-col items-center gap-2">
            <Calendar
              selectedDate={calendarStates.overviewDefault}
              currentMonth={calendarStates.overviewDefault}
              today={testToday}
              onchange={createCalendarHandler('overviewDefault')}
            />
            <span class="text-sm text-neutral-600">Default</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Calendar
              selectedDate={calendarStates.overviewReadonly}
              currentMonth={calendarStates.overviewReadonly}
              today={testToday}
              readonly
              onchange={createCalendarHandler('overviewReadonly')}
            />
            <span class="text-sm text-neutral-600">Read-only</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Calendar
              selectedDate={calendarStates.overviewDisabled}
              currentMonth={calendarStates.overviewDisabled}
              today={testToday}
              disabled
              onchange={createCalendarHandler('overviewDisabled')}
            />
            <span class="text-sm text-neutral-600">Disabled</span>
          </div>
        </div>
      </div>

      <!-- Header Layout Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Header Layout</h3>
        <div class="flex flex-wrap items-start gap-8">
          <div class="flex flex-col items-center gap-2">
            <Calendar
              selectedDate={calendarStates.overviewGrouped}
              currentMonth={calendarStates.overviewGrouped}
              today={testToday}
              headerLayout="grouped"
              onchange={createCalendarHandler('overviewGrouped')}
            />
            <span class="text-sm text-neutral-600">Grouped Layout (Default)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Calendar
              selectedDate={calendarStates.overviewSpread}
              currentMonth={calendarStates.overviewSpread}
              today={testToday}
              headerLayout="spread"
              onchange={createCalendarHandler('overviewSpread')}
            />
            <span class="text-sm text-neutral-600">Spread Layout</span>
          </div>
        </div>
      </div>

      <!-- Width Behavior Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Width Behavior</h3>
        <div class="flex space-y-6">
          <div class="flex flex-col gap-2">
            <span class="text-sm text-neutral-600">Fixed Width (Default)</span>
            <div class="flex justify-start">
              <Calendar
                selectedDate={calendarStates.overviewFixed}
                currentMonth={calendarStates.overviewFixed}
                today={testToday}
                onchange={createCalendarHandler('overviewFixed')}
              />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-sm text-neutral-600">Full Width (Adaptive)</span>
            <div class="min-w-md">
              <Calendar
                selectedDate={calendarStates.overviewFullWidth}
                currentMonth={calendarStates.overviewFullWidth}
                today={testToday}
                fullWidth
                onchange={createCalendarHandler('overviewFullWidth')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Calendar {...args} selectedDate={calendarStates.default} onchange={createCalendarHandler('default')} />
  {/snippet}
</Story>

<Story name="Small" args={{ size: 'small' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Calendar {...args} selectedDate={calendarStates.small} onchange={createCalendarHandler('small')} />
  {/snippet}
</Story>

<Story name="Medium" args={{ size: 'medium' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Calendar {...args} selectedDate={calendarStates.medium} onchange={createCalendarHandler('medium')} />
  {/snippet}
</Story>

<Story name="Large" args={{ size: 'large', headerLayout: 'spread' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Calendar {...args} selectedDate={calendarStates.large} onchange={createCalendarHandler('large')} />
  {/snippet}
</Story>

<Story name="Sunday Start" args={{ startOfWeek: 0, size: 'medium' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Calendar {...args} selectedDate={calendarStates.sundayStart} onchange={createCalendarHandler('sundayStart')} />
  {/snippet}
</Story>

<Story name="Monday Start" args={{ startOfWeek: 1, size: 'medium' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Calendar {...args} selectedDate={calendarStates.mondayStart} onchange={createCalendarHandler('mondayStart')} />
  {/snippet}
</Story>

<Story name="Read-only" args={{ readonly: true, size: 'medium' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Calendar {...args} selectedDate={calendarStates.readonly} onchange={createCalendarHandler('readonly')} />
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true, size: 'medium' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Calendar {...args} selectedDate={calendarStates.disabled} onchange={createCalendarHandler('disabled')} />
  {/snippet}
</Story>

<Story name="Full Width" args={{ fullWidth: true }} parameters={{ layout: 'default' }}>
  {#snippet template(args)}
    <div class="max-w-lg">
      <Calendar {...args} selectedDate={calendarStates.fullWidth} onchange={createCalendarHandler('fullWidth')} />
    </div>
  {/snippet}
</Story>

<Story name="Spread Header" args={{ headerLayout: 'spread', size: 'medium' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Calendar {...args} selectedDate={calendarStates.spreadHeader} onchange={createCalendarHandler('spreadHeader')} />
  {/snippet}
</Story>

<Story name="With Date Range" parameters={{ layout: 'wide' }}>
  {#snippet template()}
    <div class="space-y-8">
      <h3 class="text-lg font-medium">Date Range Restrictions</h3>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Future Booking -->
        <div class="flex flex-col items-center gap-4">
          <div class="text-center">
            <h4 class="mb-2 text-base font-medium">Hotel Booking</h4>
            <p class="mb-4 text-sm text-neutral-600">Only future dates available</p>
          </div>
          <Calendar
            selectedDate={calendarStates.hotelBooking}
            minDate={new Date()}
            maxDate={new Date(testYear + 1, testMonth, testDay)}
            onchange={createCalendarHandler('hotelBooking')}
          />
        </div>

        <!-- Event Registration -->
        <div class="flex flex-col items-center gap-4">
          <div class="text-center">
            <h4 class="mb-2 text-base font-medium">Event Registration</h4>
            <p class="mb-4 text-sm text-neutral-600">Registration closes in 2 months</p>
          </div>
          <Calendar
            selectedDate={calendarStates.eventRegistration}
            minDate={new Date(testYear, testMonth, testDay + 1)}
            maxDate={new Date(testYear, testMonth + 2, testDay)}
            onchange={createCalendarHandler('eventRegistration')}
          />
        </div>

        <!-- Limited Availability -->
        <div class="flex flex-col items-center gap-4">
          <div class="text-center">
            <h4 class="mb-2 text-base font-medium">Limited Availability</h4>
            <p class="mb-4 text-sm text-neutral-600">Only mid-month slots available</p>
          </div>
          <Calendar
            selectedDate={calendarStates.limitedAvailability}
            minDate={new Date(testYear, testMonth, 15)}
            maxDate={new Date(testYear, testMonth, testDay)}
            onchange={createCalendarHandler('limitedAvailability')}
          />
        </div>
      </div>

      <Toast
        variant="info"
        title="Date Range Features"
        description="Disabled dates appear grayed out and are not selectable. This is perfect for booking systems, event registration, and any scenario requiring date restrictions."
        dismissible={false}
      />
    </div>
  {/snippet}
</Story>

<Story name="Custom Date Rules" parameters={{ layout: 'wide' }}>
  {#snippet template()}
    <div class="space-y-8">
      <h3 class="text-lg font-medium">Custom Date Validation</h3>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Weekdays Only -->
        <div class="flex flex-col items-center gap-4">
          <div class="text-center">
            <h4 class="mb-2 text-base font-medium">Business Hours</h4>
            <p class="mb-4 text-sm text-neutral-600">Weekdays only (Mon-Fri)</p>
          </div>
          <Calendar
            selectedDate={calendarStates.businessHours}
            isDateDisabled={(date) => {
              const day = date.getDay()
              return day === 0 || day === 6 // Disable Sunday (0) and Saturday (6)
            }}
            onchange={createCalendarHandler('businessHours')}
          />
        </div>

        <!-- Specific Dates Blocked -->
        <div class="flex flex-col items-center gap-4">
          <div class="text-center">
            <h4 class="mb-2 text-base font-medium">Holiday Blackout</h4>
            <p class="mb-4 text-sm text-neutral-600">Holidays are unavailable</p>
          </div>
          <Calendar
            selectedDate={calendarStates.holidayBlackout}
            isDateDisabled={(date) => {
              // Block some example "holiday" dates
              const day = date.getDate()
              const month = date.getMonth()
              // Block 25th (Christmas-like), 1st (New Year-like), and 4th (July 4th-like)
              return month === testMonth && (day === 1 || day === 4 || day === 25)
            }}
            onchange={createCalendarHandler('holidayBlackout')}
          />
        </div>

        <!-- Complex Rules -->
        <div class="flex flex-col items-center gap-4">
          <div class="text-center">
            <h4 class="mb-2 text-base font-medium">Complex Rules</h4>
            <p class="mb-4 text-sm text-neutral-600">Only even dates on weekdays</p>
          </div>
          <Calendar
            selectedDate={calendarStates.complexRules}
            isDateDisabled={(date) => {
              const day = date.getDay()
              const dateNum = date.getDate()
              // Disable weekends OR odd dates
              return day === 0 || day === 6 || dateNum % 2 !== 0
            }}
            onchange={createCalendarHandler('complexRules')}
          />
        </div>
      </div>

      <Toast
        variant="success"
        title="Custom Validation"
        description="The isDateDisabled function gives you complete control over which dates are selectable. Perfect for business rules, holidays, appointments, and complex scheduling logic."
        dismissible={false}
      />
    </div>
  {/snippet}
</Story>

<Story name="Custom Labels" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <h3 class="text-lg font-medium">Custom Language Support</h3>

      <!-- Custom Labels Grid -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div class="flex flex-col items-center gap-2">
          <Calendar
            selectedDate={calendarStates.englishShort}
            labels={{
              months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            }}
            onchange={createCalendarHandler('englishShort')}
          />
          <span class="text-sm text-neutral-600">English Short</span>
        </div>

        <div class="flex flex-col items-center gap-2">
          <Calendar
            selectedDate={calendarStates.spanish}
            headerLayout="spread"
            labels={{
              months: [
                'Enero',
                'Febrero',
                'Marzo',
                'Abril',
                'Mayo',
                'Junio',
                'Julio',
                'Agosto',
                'Septiembre',
                'Octubre',
                'Noviembre',
                'Diciembre',
              ],
              daysMin: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
              days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            }}
            onchange={createCalendarHandler('spanish')}
          />
          <span class="text-sm text-neutral-600">Spanish</span>
        </div>

        <div class="flex flex-col items-center gap-2">
          <Calendar
            selectedDate={calendarStates.spanishShort}
            headerLayout="spread"
            labels={{
              months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
              daysMin: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
              days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            }}
            onchange={createCalendarHandler('spanishShort')}
          />
          <span class="text-sm text-neutral-600">Spanish Short</span>
        </div>

        <div class="flex flex-col items-center gap-2">
          <Calendar
            selectedDate={calendarStates.french}
            startOfWeek={1}
            labels={{
              months: [
                'Janvier',
                'Février',
                'Mars',
                'Avril',
                'Mai',
                'Juin',
                'Juillet',
                'Août',
                'Septembre',
                'Octobre',
                'Novembre',
                'Décembre',
              ],
              daysMin: ['DI', 'LU', 'MA', 'ME', 'JE', 'VE', 'SA'],
              days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            }}
            onchange={createCalendarHandler('french')}
          />
          <span class="text-sm text-neutral-600">French</span>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Interactive Example" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Date Picker</h3>
      <div class="space-y-4">
        <div class="border-default rounded-lg border p-4">
          <Calendar
            selectedDate={calendarStates.interactive}
            onchange={createCalendarHandler('interactive')}
            onclick={() => console.log('Date clicked')}
          />
        </div>

        <Toast
          variant="info"
          title="Instructions"
          description="Click on any date to select it. Click on the calendar grid and use arrow keys to navigate dates. Use Home/End to jump to start/end of month. Use Enter/Space to select the focused date."
          dismissible={false}
        />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Event Booking Example" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Book an Appointment</h3>
      <div class="space-y-4">
        <div class="border-default rounded-lg border p-4">
          <Calendar
            selectedDate={calendarStates.booking}
            minDate={new Date()}
            maxDate={new Date(testYear, 11, 31)}
            onchange={createCalendarHandler('booking')}
          />
        </div>

        <Toast
          variant="info"
          title="Tip"
          description="Only future dates through end of year are available for booking."
          dismissible={false}
        />
      </div>
    </div>
  {/snippet}
</Story>
