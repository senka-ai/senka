# UI Composition Rules for Senka Packages

## 🚨 CRITICAL: AI MUST READ THIS BEFORE BUILDING ANY UI

This document defines **STRICT RULES** for building UI in the Senka platform. These rules ensure consistency, maintainability, and proper usage of the design system.

## Core Principle: UI Library First, Layout Engine Second

**EVERY UI element must be composed using:**

1. **Components from `@senka-ai/ui`** - The ONLY source for UI components
2. **Layout from `@senka-ai/layout-engine`** - For arrangement and positioning
3. **NO custom Tailwind classes** - Until layout-engine is complete, minimal custom layout classes are allowed temporarily

## ❌ FORBIDDEN PRACTICES

### 1. NO Custom Tailwind Utility Classes

```svelte
<!-- ❌ WRONG: Custom Tailwind utilities -->
<div class="flex gap-2 space-y-6 p-4">

<!-- ✅ CORRECT: Use layout-engine or UI components -->
<div style={cssPropertiesToString(rowArrangement.toCSS(config))}>
```

### 2. NO Arbitrary Colors

```svelte
<!-- ❌ WRONG: Non-semantic colors -->
<div class="text-gray-600 bg-blue-50">
<span class="text-tertiary"> <!-- tertiary doesn't exist -->

<!-- ✅ CORRECT: Only semantic colors from UI library -->
<div class="text-secondary bg-highlight-50">
```

### 3. NO Emoji Icons

```svelte
<!-- ❌ WRONG: Emoji as icons -->
<Button leftIcon="🚀">

<!-- ✅ CORRECT: Import and use icon components -->
import { RocketIcon } from '@senka-ai/ui'
<Button leftIcon={RocketIcon}>
```

### 4. NO Inline SVG

```svelte
<!-- ❌ WRONG: Inline SVG markup -->
<svg viewBox="0 0 24 24">...</svg>

<!-- ✅ CORRECT: Use icon components -->
import {ImageIcon} from '@senka-ai/ui'
<ImageIcon size={24} />
```

## ✅ CORRECT PATTERNS

### Pattern 1: Container Composition

When you need a simple container with specific layout:

```svelte
<script lang="ts">
  import { Container, Button, Badge } from '@senka-ai/ui'
  import { StackArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  const stack = new StackArrangement()
  const containerConfig = {
    id: 'my-container',
    type: 'stack',
    gap: 'normal',
    padding: 'comfortable',
    fillContainer: true,
  }
</script>

<!-- Use Container for simple containers, not divs with custom classes -->
<Container padding="normal" background>
  <div style={cssPropertiesToString(stack.toCSS(containerConfig))}>
    <!-- Content here -->
  </div>
</Container>
```

When you need content presentation with rich features:

```svelte
<script lang="ts">
  import { Card } from '@senka-ai/ui'
</script>

<!-- Use Card for rich content presentation, NOT as a general container -->
<Card
  title="Product Name"
  subtitle="Category"
  description="Product description here..."
  image="/product.jpg"
  buttonText="View Details"
  showAction={true}
  onclick={handleViewDetails}
/>
```

### Pattern 2: Control Groups

When building control panels or property editors:

```svelte
<script lang="ts">
  import { Container, RadioGroup, Slider, Toggle, Divider } from '@senka-ai/ui'

  // Use existing form components for controls
  let alignment = $state('center')
  let spacing = $state(16)
  let wrapEnabled = $state(false)
</script>

<Container padding="normal" background>
  <!-- Use RadioGroup for single selection -->
  <RadioGroup
    label="Alignment"
    options={[
      { value: 'start', label: 'Start' },
      { value: 'center', label: 'Center' },
      { value: 'end', label: 'End' },
    ]}
    value={alignment}
    onchange={(v) => (alignment = v)}
  />

  <Divider />

  <!-- Use Slider for numeric values -->
  <Slider label="Spacing" min={0} max={32} step={4} value={spacing} onchange={(v) => (spacing = v)} />

  <Divider />

  <!-- Use Toggle for boolean values -->
  <Toggle label="Enable wrapping" value={wrapEnabled} onchange={(v) => (wrapEnabled = v)} />
</Container>
```

### Pattern 3: Lists and Items

When displaying lists of items:

```svelte
<script lang="ts">
  import { List, ListItem, ListTitle, Button } from '@senka-ai/ui'

  let items = [
    { id: 1, title: 'Item 1', description: 'Description 1' },
    { id: 2, title: 'Item 2', description: 'Description 2' },
  ]
</script>

<!-- Use List components, not custom divs -->
<List>
  <ListTitle>My Items</ListTitle>
  {#each items as item}
    <ListItem title={item.title} description={item.description} onclick={() => handleItemClick(item)}>
      <Button size="small" variant="secondary">Edit</Button>
    </ListItem>
  {/each}
</List>
```

### Pattern 4: Form Layouts

When building forms:

```svelte
<script lang="ts">
  import { TextField, TextArea, Dropdown, Button, Container } from '@senka-ai/ui'
  import { StackArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  const formStack = new StackArrangement()
  const formConfig = {
    id: 'form-layout',
    type: 'stack',
    gap: 'normal',
    fillContainer: true,
  }
</script>

<Container padding="normal" background>
  <div style={cssPropertiesToString(formStack.toCSS(formConfig))}>
    <TextField label="Name" placeholder="Enter your name" fullWidth />

    <TextArea label="Description" placeholder="Enter description" rows={4} fullWidth />

    <Dropdown label="Category" options={categories} fullWidth />

    <Button variant="primary" fullWidth>Save Settings</Button>
  </div>
</Container>
```

## Component Selection Guide

### For Layout Structure

- **Container** - Layout container for structural organization (use this for most containers)
- **Accordion** - Collapsible sections
- **Dialog** - Modal overlays
- **List** - Structured item lists

### For Content Presentation

- **Card** - Rich content with title, image, actions (not for general containers!)
- **Banner** - Important notifications
- **Tag** - Labels and categories

### For Controls

- **Button** - Actions and selections
- **Toggle** - Boolean on/off
- **RadioGroup** - Single selection from options
- **Checkbox** - Multiple selections
- **Slider** - Numeric range selection
- **Dropdown** - Selection from many options

### For Display

- **Badge** - Status indicators
- **Tag** - Labels and categories
- **ProgressBar** - Progress indication
- **Toast** - Temporary notifications
- **Tooltip** - Contextual help

### For Layout

- **Divider** - Visual separation
- **List/ListItem** - Structured lists
- **TabBar** - Navigation between views
- **ContentSwitcher** - Toggle between content

### For Input

- **TextField** - Single line text
- **TextArea** - Multi-line text
- **NumberInput** - Numeric input
- **SearchBar** - Search functionality

## Semantic Color Usage

### Available Semantic Colors

```typescript
// Text colors
'text-primary' // Main text
'text-secondary' // Supporting text
'text-muted' // Disabled/inactive

// Background colors
'bg-background' // Page background
'bg-surface' // Component surface
'bg-surface-elevated' // Raised surface

// State colors (with 50-400 scale)
'text-highlight' // Primary actions
'text-success' // Success states
'text-warning' // Warning states
'text-error' // Error states

// Border colors
'border-default' // Standard borders
'border-strong' // Emphasized borders
```

## Temporary Layout Classes (Until layout-engine is complete)

**ONLY these Tailwind classes are allowed temporarily:**

```css
/* Positioning - to be replaced by layout-engine */
.relative
.absolute
.fixed

/* Display - to be replaced by layout-engine */
.block
.inline-block
.hidden

/* Size constraints - to be replaced by layout-engine */
.w-full
.h-full
.min-w-0
.max-w-full

/* Overflow - to be replaced by layout-engine */
.overflow-hidden
.overflow-auto
```

## Validation Checklist

Before committing any UI code, verify:

- [ ] ✅ All components imported from `@senka-ai/ui`
- [ ] ✅ Layout handled by `@senka-ai/layout-engine` or temporary allowed classes
- [ ] ✅ Only semantic colors from the design system used
- [ ] ✅ No emoji icons - only icon components
- [ ] ✅ No inline SVG markup
- [ ] ✅ No custom spacing classes (use layout-engine)
- [ ] ✅ No arbitrary color values
- [ ] ✅ All text uses semantic typography classes
- [ ] ✅ Forms use UI library form components
- [ ] ✅ Layout uses Container, content presentation uses Card/Banner

## Example: Complete Property Panel

Here's how to build a property panel correctly:

```svelte
<script lang="ts">
  import { Container, RadioGroup, Slider, Toggle, Divider, Button, ContentSwitcher } from '@senka-ai/ui'
  import { StackArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  // State
  let layoutType = $state('row')
  let spacing = $state(16)
  let alignment = $state('center')
  let wrapEnabled = $state(false)

  // Layout configuration
  const stack = new StackArrangement()
  const panelConfig = {
    id: 'property-panel',
    type: 'stack',
    gap: 'normal',
    padding: 'normal',
    fillContainer: true,
  }

  // Options
  const layoutOptions = [
    { value: 'row', label: 'Row' },
    { value: 'stack', label: 'Stack' },
    { value: 'grid', label: 'Grid' },
  ]

  const alignmentOptions = [
    { value: 'start', label: 'Start' },
    { value: 'center', label: 'Center' },
    { value: 'end', label: 'End' },
    { value: 'stretch', label: 'Stretch' },
  ]
</script>

<Container padding="normal" background>
  <div style={cssPropertiesToString(stack.toCSS(panelConfig))}>
    <!-- Layout Type Selection -->
    <ContentSwitcher options={layoutOptions} value={layoutType} onchange={(v) => (layoutType = v)} />

    <Divider />

    <!-- Alignment Controls -->
    <RadioGroup label="Alignment" options={alignmentOptions} value={alignment} onchange={(v) => (alignment = v)} />

    <Divider />

    <!-- Spacing Control -->
    <Slider label="Spacing (px)" min={0} max={48} step={4} value={spacing} onchange={(v) => (spacing = v)} showValue />

    <Divider />

    <!-- Wrap Toggle -->
    <Toggle
      label="Enable wrapping"
      helperText="Allow items to wrap to next line"
      value={wrapEnabled}
      onchange={(v) => (wrapEnabled = v)}
    />

    <Divider />

    <!-- Action Buttons -->
    <Button variant="primary" fullWidth>Apply Changes</Button>

    <Button variant="secondary" fullWidth>Reset to Defaults</Button>
  </div>
</Container>
```

## Summary

**The Golden Rule**: If you're writing custom CSS classes or creating custom styled components, you're doing it wrong. Always compose from:

1. UI Library components (`@senka-ai/ui`)
2. Layout Engine arrangements (`@senka-ai/layout-engine`)
3. Semantic design system colors and typography

This ensures consistency, maintainability, and a professional appearance across the entire Senka platform.
