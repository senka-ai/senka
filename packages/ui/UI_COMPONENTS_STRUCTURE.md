# UI Components Structure

This document provides a comprehensive reference of all components in the Senka UI library, organized by category and including semantic descriptions of their purpose and functionality based on the official design documentation.

## Folder Structure

```
packages/ui/src/lib/components/
├── controls/
│   ├── ActionSheet.svelte
│   ├── Calendar.svelte
│   ├── ContentSwitcher.svelte
│   ├── Filter.svelte
│   └── Tabs.svelte
├── core/
│   ├── Button.svelte
│   ├── IconButton.svelte
│   └── ThemeToggle.svelte
├── examples/
│   └── UtilityExample.svelte
├── feedback/
│   ├── Badge.svelte
│   ├── Banner.svelte
│   ├── Dialog.svelte
│   ├── Loader.svelte
│   ├── PaginationDots.svelte
│   ├── ProgressBar.svelte
│   ├── Tag.svelte
│   ├── Toast.svelte
│   └── Tooltip.svelte
├── forms/
│   ├── Checkbox.svelte
│   ├── Dropdown.svelte
│   ├── FormField.svelte
│   ├── NumberInput.svelte
│   ├── RadioButton.svelte
│   ├── RadioGroup.svelte
│   ├── SearchBar.svelte
│   ├── Slider.svelte
│   ├── StarRating.svelte
│   ├── TextArea.svelte
│   ├── TextField.svelte
│   └── Toggle.svelte
├── layout/
│   ├── Accordion.svelte
│   ├── Card.svelte
│   ├── CardHorizontal.svelte
│   ├── Divider.svelte
│   ├── List.svelte
│   ├── ListItem.svelte
│   └── ListTitle.svelte
├── media/
│   ├── Avatar.svelte
│   ├── AvatarPlaceholder.svelte
│   ├── Image.svelte
│   ├── ImagePlaceholder.svelte
│   ├── Video.svelte
│   └── VideoPlaceholder.svelte
└── navigation/
    ├── NavBar.svelte
    └── TabBar.svelte
```

## Component Categories

### 🔧 Controls

Interactive components that allow users to trigger actions or make selections.

**ActionSheet** _(CONTROL)_ - An Action sheet consists of a list of a few options that the user can select. An action sheet is usually placed at the bottom of the screen.

**Calendar** _(CONTROL, INTERACTIVE)_ - A Calendar allows users to view and select dates from a monthly grid layout. Features include month navigation, date selection, keyboard navigation (arrow keys for date navigation, Enter/Space for selection), accessibility support with ARIA attributes, size variants (small, medium, large), disabled and read-only states, date range restrictions, and internationalization support. Supports both controlled and uncontrolled modes for integration flexibility. Commonly used for date pickers, event scheduling, booking systems, and date input forms.

**ContentSwitcher** _(CONTROL, INTERACTIVE)_ - A Content Switcher allows users to toggle between different content sections or views. It displays multiple sections in a horizontal tab-like interface where only one section can be active at a time. Features keyboard navigation (arrow keys, Enter, Space), accessibility support with ARIA attributes, size variants (small, medium, large), full-width option with equal distribution, disabled states for individual sections or the entire component, and form association support. Commonly used for view switching (list/grid), time period filters, data categories, and form section navigation.

**Filter** _(CONTROL, INTERACTIVE)_ - A Filter component provides filtering functionality with optional badge display to show active filter counts. It combines button-like appearance with form input styling, featuring a thin border in the default secondary variant for consistency with form components. Supports multiple variants (primary, secondary, tertiary), size options (small, medium, large), custom icons, active/disabled states, and keyboard navigation. The component displays a badge with the number of active filters when specified. Commonly used for data filtering, search refinement, category selection, and content organization interfaces.

**Tabs** _(CONTROL, INTERACTIVE)_ - A Tabs component provides navigation between different content sections through clickable tab headers. Features include keyboard navigation (arrow keys for tab navigation, Enter/Space for selection), accessibility support with ARIA attributes, size variants (small, medium, large), full-width option with equal distribution, animated bottom border indicator, disabled states for individual tabs or the entire component, and typography differentiation between active and inactive tabs. Designed to prevent font flickering and layout shifts with intelligent width measurement. Commonly used for content organization, dashboard navigation, form sections, and data categorization.

### 🎯 Core

Essential interactive elements that form the foundation of user interfaces.

**Button** _(CONTROL)_ - Buttons communicate actions users can perform by tapping it. They are typically placed where the user can take any action throughout your UI – such as in Dialogs, Forms, Banners, Cards, etc. Use different types of buttons to reflect the hierarchy of actions: Primary (filled button), Secondary (outlined button), and Tertiary (text-only button). Supports text content with optional left and right icons.

**IconButton** - A specialized button component designed specifically for icon-only interactions, providing a compact touch target for actions.

**ThemeToggle** - A specialized control component that allows users to switch between light and dark themes in the application.

### 💬 Feedback

Components that provide users with information, status updates, and system responses.

**Badge** _(INFORMATIVE)_ - A Badge can indicate a status or notification through a small amount of information. Use the Badge to draw the user's attention to some UI component. It can carry different types of content such as a number or an icon.

**Banner** _(INFORMATIVE)_ - A banner displays an important and succinct message and provides actions for users. The banner can be used for notifications or to highlight specific content. They may or may not contain a supporting image.

**Dialog** _(INFORMATIVE)_ - A dialog interrupts the journey with information, details or urgent actions. A dialog has one or more actions and must inform the user of their result.

**Loader** _(PROGRESS)_ - A loader is a non-interactive component that tells the user to wait for a certain activity to be completed. The loader component of this kit can be used to indicate progress (similar to a progress bar) or to represent loading spinners (no progress indication).

**PaginationDots** _(PROGRESS)_ - Pagination Dots are used to indicate progress through pages. They display a series of dots where one dot represents the current active page. Features interactive navigation, keyboard support, multiple sizes, and accessibility compliance. Avoid using Pagination Dots with a very large number of pages.

**ProgressBar** _(PROGRESS)_ - A progress bar is a visual representation of how the user is progressing on a certain journey. A progress bar is not interactive, but needs to be kept up to date. Available in continuous progress bar and stepped variants.

**Tag** _(CONTENT)_ - Use tags to label or categorise items using keywords. Available in different styles with optional left and right icons.

**Toast** _(INFORMATIVE)_ - Use a toast to provide brief feedback or notification on an operation. It should appear for a short period of time. Available in different styles (info, success, warning, error) with customizable title and description.

**Tooltip** _(INFORMATIVE)_ - A tooltip provides contextual information when hovering over elements. It displays a title and optional description with positioning relative to the trigger element. Available in multiple sizes and positions (top, bottom, left, right) with customizable content and controlled/uncontrolled visibility modes.

### 📝 Forms

Input components that allow users to enter, select, and manipulate data.

**Checkbox** _(INPUT, INTERACTIVE)_ - A checkbox allows the user to select a value from a small set of options. It should be used when multiple options can be selected. Available in different sizes with selected state management.

**Dropdown** _(INPUT)_ - A Dropdown Menu allows the user to select a value from a small set of options. It should be used when only one option can be selected. Usually it's used combined with a text field or some similar component. Supports different visual states and customizable options.

**FormField** - Container component that provides consistent structure and styling for form input elements, including labels, validation, and help text.

**NumberInput** _(INPUT)_ - The Number Input is used to enter numerical values and includes controls for increasing or decreasing the value. Features increment/decrement buttons, title labels, support text, and various visual states.

**RadioButton** _(INPUT, INTERACTIVE)_ - A radio button allows the user to select a value from a small set of options. It should be used when only one option can be selected. Available in different sizes with selected state management.

**RadioGroup** - Container component that manages a collection of radio buttons, ensuring only one option can be selected at a time.

**SearchBar** _(INPUT)_ - Search allows users to quickly find content. Features a search icon and placeholder text with customizable content.

**Slider** _(INPUT)_ - Sliders allow users to enter values from a range. Avoid sliders when the range is too large. Supports value display, title labels, and customizable slider bar values.

**TextArea** _(INPUT)_ - Text Area is a component that allows the user to enter long text. For short inputs, it is recommended to use the Text Field. Supports title labels, placeholder text, support text, and different visual states.

**TextField** _(INPUT)_ - Text Field is a component that allows the user to enter text. For long inputs, it is recommended to use the Text Area. Features title labels, placeholder text, support text, icons, and various states including error handling.

**Toggle** _(INPUT, INTERACTIVE)_ - A toggle allows the user to select one of two option. The toggle must be used when the user can turn something on or off. Features on/off states with visual feedback.

**StarRating** _(INPUT, INTERACTIVE)_ - Star Rating is a component which allows users to give a rating of 0 to 5 on a certain topic. It is often used to measure the preference level of the user regarding some content. Features interactive star selection, hover preview, keyboard navigation, and support for custom maximum ratings.

### 📐 Layout

Structural components that organize and present content in organized patterns.

**Accordion** _(CONTENT, INTERACTIVE)_ - An accordion allows the user to show and hide content sections. Features expandable/collapsible sections with title and content areas and state management.

**Card** - Cards are containers that group information about a subject. Cards can contain images, text, tags, call to actions, links, descriptions, icons, etc. Available in multiple variants with configurable elements like icons, visuals, tags, titles, descriptions, and buttons.

**CardHorizontal** - Horizontal layout variant of the Card component displaying content in side-by-side format with title, subtitle, and optional action elements.

**Divider** _(CONTENT)_ - A divider can visually separate elements in the UI. Simple visual separator with no configurable properties.

**List** - Container component for organizing and displaying multiple related items in a structured, vertical layout.

**ListItem** - Used to list related items. It has simple styling or controls to support the content and provide actions to users. Features title, description, left/right icons, and optional controls like buttons, toggles, or checkboxes.

**ListTitle** _(CONTENT)_ - The list title serves to make clear what kind of content the list is about. It should be placed above the list items. Supports right control elements like Edit buttons or search icons.

### 🖼️ Media

Components for displaying and managing visual content like images, videos, and user representations.

**Avatar** _(ASSETS)_ - Use an Avatar to represent pictures of people. Available in different sizes with consistent circular styling.

**AvatarPlaceholder** - Fallback component used when user profile images are not available, providing a default visual representation.

**Image** _(ASSETS)_ - Use this as a placeholder for images. Simple image container with no configurable properties.

**ImagePlaceholder** - Fallback component displayed when images are loading or unavailable, maintaining layout structure.

**Video** _(ASSETS)_ - Use this as a placeholder for videos. Simple video container with play button styling and no configurable properties.

**VideoPlaceholder** - Fallback component shown when videos are loading or unavailable, maintaining layout consistency.

### 🧭 Navigation

Components that facilitate movement and orientation within the application.

**NavBar** _(NAVIGATION)_ - The nav bar appears at the top of the screen, allowing navigation through pages. The nav bar should provide a title of the current screen, clarifying the user's location in the app — unless it's redundant. The nav can also have controls that affect the screen content. Features page title, left/right controls with icons and text.

**TabBar** _(NAVIGATION)_ - Tab Bars help users easily navigate between the core functions of your app. Tab bar items must have the same level of navigation hierarchy. Available with multiple tabs and selected state management.

### 🔧 Examples

**UtilityExample** - Reference component demonstrating utility patterns and implementation examples for developers.

## Component Properties Overview

### Common Properties

Most components share these standard properties:

- **Show/Hide toggles** - Control visibility of optional elements
- **Text properties** - Customizable labels, descriptions, and content
- **State management** - Interactive components include state properties
- **Style variants** - Multiple visual styles and sizes where applicable
- **Icon support** - Many components support left/right icons or icon-only modes

### Interaction States

Interactive components typically support these states:

- **Default** - Normal, inactive state
- **Active/Selected** - Currently selected or active state
- **Disabled** - Non-interactive, unavailable state
- **Focus** - Keyboard or accessibility focus state
- **Error** - Invalid or error state (for form components)

## Usage Guidelines

### Component Selection

- Use **Button** for primary actions, **IconButton** for space-constrained actions
- Choose **TextField** for single-line input, **TextArea** for multi-line content
- Use **Dialog** for urgent actions, **Toast** for brief feedback, **Banner** for persistent messages
- Select **Dropdown** for single selection from small sets, **RadioGroup** for mutually exclusive options
- Use **Card** for content grouping, **List** for structured data presentation

### Accessibility Considerations

- All interactive components support keyboard navigation
- Form components include proper labeling and validation states
- Media components provide fallback content and loading states
- Navigation components maintain clear hierarchy and structure

### Design System Integration

Components are designed to work seamlessly with:

- Tailwind CSS v4 styling system
- Svelte 5 reactivity patterns
- Responsive design principles
- Light/dark theme support via ThemeToggle
