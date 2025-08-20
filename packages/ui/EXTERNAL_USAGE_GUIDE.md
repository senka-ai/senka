# External Usage Guide for @senka-ai/ui

This guide explains how external applications, projects, and libraries can integrate and use the `@senka-ai/ui` component library.

## Overview

`@senka-ai/ui` is a modern Svelte 5 component library that provides:

- 29+ production-ready UI components
- 48+ SVG icon components
- Complete design system with semantic colors
- Light/dark theme support
- TypeScript definitions
- Accessibility standards compliance

## Quick Start

### 1. Installation

```bash
# Install the UI library
npm install @senka-ai/ui

# Install required peer dependencies
npm install -D svelte@^5.0.0 tailwindcss@^4.0.0 @tailwindcss/vite
```

### 2. Vite Configuration

Update your `vite.config.js` to include Tailwind CSS v4:

```javascript
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss(), svelte()],
})
```

### 3. Import Styles

Import the complete UI library styles in your main CSS file:

```css
/* app.css or main.css */
@import '@senka-ai/ui/styles';

/* Your custom styles */
body {
  margin: 0;
  font-family: Inter, sans-serif;
}
```

### 4. Update Svelte 5 App Entry

For Svelte 5 applications, use the new `mount` API:

```javascript
// main.js
import './app.css'
import App from './App.svelte'
import { mount } from 'svelte'

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
```

## Using Components

### Basic Component Usage

```svelte
<script>
  import { Button, Card, TextField } from '@senka-ai/ui'

  let inputValue = ''

  const handleClick = () => {
    console.log('Button clicked!')
  }

  const handleInputChange = (value) => {
    inputValue = value
  }
</script>

<Card title="Welcome" description="Get started with Senka UI">
  <TextField label="Your Name" placeholder="Enter your name..." value={inputValue} onchange={handleInputChange} />

  <Button variant="primary" onclick={handleClick}>Submit</Button>
</Card>
```

### Using Icons

Import icons separately from the icons package:

```svelte
<script>
  import { Button } from '@senka-ai/ui'
  import { AddIcon, HeartFilledIcon, SearchIcon } from '@senka-ai/ui/icons'
</script>

<!-- Button with left icon -->
<Button variant="secondary">
  {#snippet leftIcon(size)}
    <AddIcon {size} />
  {/snippet}
  Add Item
</Button>

<!-- Button with right icon -->
<Button variant="tertiary">
  Favorite
  {#snippet rightIcon(size)}
    <HeartFilledIcon {size} />
  {/snippet}
</Button>

<!-- Standalone icon -->
<SearchIcon class="text-highlight h-6 w-6" />
```

### Theme Integration

Enable theme switching with the built-in ThemeToggle component:

```svelte
<script>
  import { ThemeToggle } from '@senka-ai/ui'
</script>

<header>
  <h1>My App</h1>
  <ThemeToggle />
</header>
```

Or programmatically control themes:

```svelte
<script>
  import { useTheme } from '@senka-ai/ui'

  const theme = useTheme()

  const switchToDark = () => {
    theme.set('dark')
  }

  const switchToLight = () => {
    theme.set('light')
  }

  const toggleTheme = () => {
    theme.toggle()
  }
</script>
```

## Available Components

### Core Components

- `Button` - Primary, secondary, and tertiary button variants
- `IconButton` - Icon-only button for compact interfaces
- `ThemeToggle` - Light/dark theme switcher

### Form Components

- `TextField` - Single-line text input with validation
- `TextArea` - Multi-line text input
- `Checkbox` - Single or grouped checkboxes
- `RadioButton` / `RadioGroup` - Radio button selections
- `Dropdown` - Select dropdown with options
- `NumberInput` - Numeric input with increment/decrement
- `Slider` - Range slider input
- `Toggle` - On/off switch
- `StarRating` - Interactive star rating
- `SearchBar` - Search input with icon

### Layout Components

- `Card` - Content container with title and description
- `CardHorizontal` - Horizontal layout card variant
- `List` / `ListItem` / `ListTitle` - Structured list components
- `Accordion` - Collapsible content sections
- `Divider` - Visual content separator

### Feedback Components

- `Badge` - Status indicators and notifications
- `Tag` - Content labels and categories
- `Toast` - Temporary notifications
- `Banner` - Persistent message display
- `Dialog` - Modal dialogs and confirmations
- `Tooltip` - Contextual information overlay
- `Loader` - Loading states and progress
- `ProgressBar` - Progress visualization
- `PaginationDots` - Page navigation indicators

### Navigation Components

- `NavBar` - Top navigation with title and controls
- `TabBar` - Bottom tab navigation
- `Tabs` - Horizontal tab navigation
- `ContentSwitcher` - Toggle between content views

### Control Components

- `ActionSheet` - Bottom sheet with action options
- `Calendar` - Date picker and calendar view
- `Filter` - Filtering controls with badge counts
- `Stepper` - Multi-step process navigation

### Media Components

- `Avatar` / `AvatarPlaceholder` - User profile images
- `Image` / `ImagePlaceholder` - Image display with loading states
- `Video` / `VideoPlaceholder` - Video players with placeholders
- `MapPlaceholder` - Map component placeholder
- `LocationPin` - Interactive location markers

## Design System Integration

### Semantic Colors

The library provides a comprehensive semantic color system that automatically adapts to light/dark themes:

```css
/* Background colors */
.bg-background         /* Main background */
.bg-surface           /* Component surfaces */
.bg-surface-elevated  /* Elevated surfaces */

/* Text colors */
.text-primary         /* Primary text */
.text-secondary       /* Secondary text */
.text-muted          /* Muted/disabled text */

/* State colors */
.bg-highlight         /* Brand/accent color */
.bg-success          /* Success states */
.bg-warning          /* Warning states */
.bg-error            /* Error states */

/* CSS variables for custom styling */
var(--color-highlight-400)
var(--color-success-50)
var(--color-text-primary)
var(--color-border-default)
```

### Typography System

```css
/* Heading styles */
.text-h1, .text-h2, .text-h3, .text-h4, .text-h5

/* Body text */
.text-body-xl, .text-body-l, .text-body-m, .text-body-s, .text-body-xs

/* Action text (for buttons) */
.text-action-l, .text-action-m, .text-action-s

/* Caption text */
.text-caption-m
```

## Form Validation

The library includes a comprehensive validation system:

```svelte
<script>
  import { TextField, validationRules } from '@senka-ai/ui'
</script>

<TextField
  label="Email Address"
  placeholder="Enter your email..."
  validationRules={[validationRules.required(), validationRules.email()]}
  validateOnBlur={true}
  validateOnChange={false}
/>

<TextField
  label="Password"
  type="password"
  validationRules={[validationRules.required(), validationRules.minLength(8, 'Password must be at least 8 characters')]}
/>
```

## Available Icons

The library includes 48+ SVG icons organized by category:

```javascript
// UI Icons
import { AddIcon, CloseIcon, EditIcon, DeleteIcon, SettingsIcon } from '@senka-ai/ui/icons'

// Navigation
import { ArrowUpIcon, ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon } from '@senka-ai/ui/icons'

// Content
import { ImageIcon, VideoIcon, CameraIcon, PlayIcon } from '@senka-ai/ui/icons'

// Communication
import { ChatIcon, SendIcon, InboxIcon } from '@senka-ai/ui/icons'

// Status
import { CheckIcon, WarningIcon, SuccessIcon, InfoIcon } from '@senka-ai/ui/icons'

// Social
import { GoogleIcon, AppleIcon, FacebookIcon, LinkedInIcon } from '@senka-ai/ui/icons'

// Theme
import { SunIcon, MoonIcon } from '@senka-ai/ui/icons'

// Interactive
import { HeartFilledIcon, HeartOutlinedIcon, StarFilledIcon, StarOutlinedIcon } from '@senka-ai/ui/icons'
```

## TypeScript Support

The library provides complete TypeScript definitions:

```typescript
import type { ButtonLikeComponent, FormField } from '@senka-ai/ui/types'

// Component interfaces are exported for custom component development
interface CustomButtonProps extends ButtonLikeComponent {
  customProp?: string
}
```

## Accessibility Features

All components include:

- **Keyboard Navigation**: Arrow keys, Enter, Space, Escape support
- **Screen Reader Support**: Proper ARIA attributes and semantic markup
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Independence**: Information not conveyed by color alone
- **WCAG Compliance**: Meets accessibility contrast and interaction standards

## Performance Considerations

- **Tree Shaking**: Import only the components you use
- **CSS Variables**: Runtime theme switching without JavaScript calculations
- **SVG Icons**: Optimized vector icons with minimal overhead
- **No Runtime Dependencies**: Pure peer dependency architecture

## Troubleshooting

### Common Issues

1. **Missing Tailwind CSS**: Ensure `@tailwindcss/vite` is installed and configured
2. **Theme Not Working**: Import `@senka-ai/ui/styles` in your main CSS file
3. **Icons Not Found**: Import from `@senka-ai/ui/icons`, not the main package
4. **Svelte 5 Errors**: Use `mount()` instead of `new Component()` for app initialization

### Bundle Size Optimization

```javascript
// Import only specific components
import { Button, Card } from '@senka-ai/ui'

// Import only needed icons
import { AddIcon, SearchIcon } from '@senka-ai/ui/icons'

// Avoid importing everything
// ❌ import * from '@senka-ai/ui'
```

## Example Project Structure

```
my-app/
├── src/
│   ├── lib/
│   │   └── components/
│   │       └── CustomComponent.svelte
│   ├── routes/
│   │   └── +page.svelte
│   ├── app.css              # Import @senka-ai/ui/styles here
│   └── main.js              # Use mount() for Svelte 5
├── package.json             # Include peer dependencies
├── vite.config.js           # Configure tailwindcss plugin
└── svelte.config.js
```

## Support

- **Documentation**: [Component documentation in Storybook](https://storybook.senka.ai)
- **GitHub Issues**: [Report bugs and feature requests](https://github.com/senka-ai/senka/issues)
- **TypeScript**: Full type definitions included with IntelliSense support

## License

MIT License - See the [LICENSE](./LICENSE) file for details.
