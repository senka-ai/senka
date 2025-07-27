# Storybook Story Patterns & Guidelines

## Overview

This document outlines the standardized patterns, conventions, and best practices for creating Storybook stories in the `@senka-ai/ui` component library. All stories must follow these patterns to ensure consistency, maintainability, and excellent developer experience.

**Framework**: Storybook with Svelte CSF (Component Story Format)  
**Svelte Version**: Svelte 5 with runes syntax  
**Story Format**: `@storybook/addon-svelte-csf`

## Core Story Architecture

### 1. File Structure & Naming

```
packages/ui/src/stories/
├── ComponentName.stories.svelte      # Main component stories
├── ExampleName.svelte               # Reusable example components
└── ValidationExample.stories.svelte # Special example stories
```

**Naming Conventions:**

- **Main Stories**: `ComponentName.stories.svelte` (PascalCase)
- **Example Components**: `ExampleName.svelte` (descriptive names)
- **Special Stories**: `FeatureName.stories.svelte` (for cross-component examples)

### 2. Standard Story File Structure

```svelte
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import ComponentName from '../lib/components/category/ComponentName.svelte'
  import { IconName } from '../lib/icons' // If needed

  const { Story } = defineMeta({
    title: 'Category/ComponentName',
    component: ComponentName,
    args: {
      // Default args
    },
    argTypes: {
      // Interactive controls
    },
    parameters: {
      // Story-level parameters
    },
  })
</script>

<!-- Stories follow here -->
```

## Story Patterns & Templates

### 1. Overview Story (Always First)

**Purpose**: Showcase all major variants and use cases in a single view

```svelte
<Story name="Overview" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Variants Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Variants</h3>
        <div class="flex items-start gap-4">
          <Component variant="primary">Content</Component>
          <Component variant="secondary">Content</Component>
          <Component variant="tertiary">Content</Component>
        </div>
      </div>

      <!-- Sizes Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Sizes</h3>
        <div class="flex items-start gap-4">
          <Component size="small">Small</Component>
          <Component size="medium">Medium</Component>
          <Component size="large">Large</Component>
        </div>
      </div>

      <!-- States Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States</h3>
        <div class="flex items-start gap-4">
          <Component disabled>Disabled</Component>
          <Component loading>Loading</Component>
        </div>
      </div>
    </div>
  {/snippet}
</Story>
```

**Key Requirements:**

- **Always first story** in the file
- **Visual organization** with semantic headings
- **Comprehensive coverage** of all major variants
- **No interactive controls** (static showcase)
- **Responsive layout** (`space-y-8`, `flex gap-4`)

### 2. Default Interactive Story

**Purpose**: Primary playground for testing component props

```svelte
<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Component {...args}>
      {#snippet children()}
        Default Content
      {/snippet}
    </Component>
  {/snippet}
</Story>
```

**Key Requirements:**

- **Props spreading**: `{...args}` for all component props
- **Children handling**: Provide default content via snippets
- **Compact layout**: Use `layout: 'compact'` for single components

### 3. Variant Stories

**Purpose**: Individual stories for each major variant

```svelte
<Story name="Primary" args={{ variant: 'primary' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Component {...args}>
      {#snippet children()}Button{/snippet}
    </Component>
  {/snippet}
</Story>

<Story name="Secondary" args={{ variant: 'secondary' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Component {...args}>
      {#snippet children()}Button{/snippet}
    </Component>
  {/snippet}
</Story>
```

### 4. State Stories

**Purpose**: Demonstrate specific states (disabled, loading, error, etc.)

```svelte
<Story name="Disabled" args={{ disabled: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Component {...args}>
      {#snippet children()}Disabled State{/snippet}
    </Component>
  {/snippet}
</Story>

<Story name="Loading" args={{ loading: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Component {...args}>
      {#snippet children()}Loading State{/snippet}
    </Component>
  {/snippet}
</Story>
```

### 5. Complex Example Stories

**Purpose**: Real-world usage scenarios

```svelte
<Story name="With Validation" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Form Example</h3>
      <TextField
        label="Email Address"
        placeholder="Enter your email"
        validationRules={[
          validationRules.required('Email is required'),
          validationRules.email('Please enter a valid email address'),
        ]}
      />
    </div>
  {/snippet}
</Story>
```

## Svelte 5 Patterns in Stories

### 1. Component Children Pattern

**Always use snippet syntax for component children:**

```svelte
<!-- ✅ Correct: Snippet syntax -->
<Component>
  {#snippet children()}
    Content goes here
  {/snippet}
</Component>

<!-- ❌ Wrong: Direct content -->
<Component>Content goes here</Component>
```

### 2. Template Function Pattern

**Use template functions for interactive stories:**

```svelte
<!-- ✅ Correct: Template function with args -->
<Story name="Interactive" args={{ variant: 'primary' }}>
  {#snippet template(args)}
    <Component {...args}>
      {#snippet children()}Content{/snippet}
    </Component>
  {/snippet}
</Story>

<!-- ✅ Correct: Static template -->
<Story name="Overview">
  {#snippet template()}
    <div class="space-y-4">
      <!-- Static content -->
    </div>
  {/snippet}
</Story>
```

### 3. TypeScript-Safe Props Pattern (Required for Components with Required Props)

**For components with required props, use explicit prop mapping instead of spreading to avoid TypeScript errors:**

```svelte
<!-- ❌ Wrong: TypeScript errors with required props -->
<Story name="Default" args={{}}>
  {#snippet template(args)}
    <Component {...args} />
  {/snippet}
</Story>

<!-- ✅ Correct: Explicit prop mapping with fallbacks -->
<Story name="Default" args={{}}>
  {#snippet template(args)}
    <Component
      title={args.title || 'Default Title'}
      description={args.description}
      variant={args.variant}
      disabled={args.disabled}
      onclick={args.onclick}
      {/* Map all other props explicitly */}
    />
  {/snippet}
</Story>
```

**Key Requirements for Required Props:**

- **Explicit mapping**: List all props individually instead of spreading `{...args}`
- **Fallback values**: Use `args.propName || 'fallback'` for required props
- **All props included**: Map every prop the component accepts
- **TypeScript safety**: Ensures TypeScript knows required props will always be provided

**Example with Banner component:**

```svelte
<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Banner
      title={args.title || 'Banner Title'}
      description={args.description}
      buttonText={args.buttonText}
      image={args.image}
      imageAlt={args.imageAlt}
      showTitle={args.showTitle}
      showDescription={args.showDescription}
      showButton={args.showButton}
      showImage={args.showImage}
      variant={args.variant}
      disabled={args.disabled}
      onButtonClick={args.onButtonClick}
      onBannerClick={args.onBannerClick}
    />
  {/snippet}
</Story>
```

**When to Use Each Pattern:**

- **Props spreading (`{...args}`)**: Components with no required props (e.g., Button, TextField)
- **Explicit mapping**: Components with required props (e.g., Banner, Card)

### 3. Event Handler Pattern

**Use direct event props, not on: directives:**

```svelte
<!-- ✅ Correct: Direct event props -->
<Component onclick={() => console.log('clicked')} onchange={(value) => console.log('changed:', value)} />

<!-- ❌ Wrong: on: directives -->
<Component on:click={() => console.log('clicked')} on:change={(e) => console.log('changed:', e.detail)} />
```

### 4. Icon Integration Pattern

```svelte
<!-- With Icon Component -->
<Component leftIcon={ArrowIcon}>
  {#snippet children()}With Icon{/snippet}
</Component>

<!-- With String Icon -->
<Component leftIcon="🚀">
  {#snippet children()}With Emoji{/snippet}
</Component>

<!-- Icon as Children -->
<Component>
  {#snippet children()}
    <ChatIcon class="h-8 w-8" />
  {/snippet}
</Component>
```

## ArgTypes Patterns

### 1. Standard ArgTypes Structure

```svelte
const { Story } = defineMeta({
  // ... other config
  argTypes: {
    // Enum/Select Controls
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Button variant',
    },

    // Boolean Controls
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },

    // Text Controls
    label: {
      control: { type: 'text' },
      description: 'Field label',
    },

    // Number Controls
    size: {
      control: { type: 'number', min: 12, max: 48, step: 2 },
      description: 'Icon size in pixels',
    },
  },
})
```

### 2. Control Type Mapping

| Prop Type     | Control Type          | Example                |
| ------------- | --------------------- | ---------------------- |
| `boolean`     | `{ type: 'boolean' }` | `disabled`, `loading`  |
| `string enum` | `{ type: 'select' }`  | `variant`, `size`      |
| `string`      | `{ type: 'text' }`    | `label`, `placeholder` |
| `number`      | `{ type: 'number' }`  | `iconSize`, `rows`     |
| `color`       | `{ type: 'color' }`   | `backgroundColor`      |
| `function`    | Hide from controls    | `onclick`, `onchange`  |

### 3. Function Props Handling

**Hide function props from controls but document them:**

```svelte
argTypes: {
  onclick: {
    control: false,
    description: 'Click handler function',
  },
  onchange: {
    control: false,
    description: 'Change handler function - receives new value',
  },
}
```

## Layout & Styling Patterns

### 1. Layout Parameters & Container Sizing

Stories automatically get consistent container styling with appropriate sizing. You can control the container size using the `layout` parameter.

#### Container Sizes

- **`default`** (672px): Most component stories - automatically applied if no parameter is specified
- **`compact`** (448px): Individual components, small forms, simple examples
- **`wide`** (896px): Overview grids, icon galleries, complex layouts
- **`full`**: No max-width constraint for full-width components

#### Usage Examples

```svelte
<!-- For single components -->
parameters={{ layout: 'compact' }}

<!-- For showcases with multiple components -->
parameters={{ layout: 'default' }}

<!-- For overview grids and icon galleries -->
parameters={{ layout: 'wide' }}

<!-- For full-width components -->
parameters={{ layout: 'full' }}
```

#### Detailed Layout Examples

```svelte
<Story name="Icon Grid" args={{}} parameters={{ layout: 'wide' }}>
  {#snippet template(args)}
    <div class="grid grid-cols-8 gap-4">
      <!-- Many icons -->
    </div>
  {/snippet}
</Story>

<Story name="Single Icon" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-center gap-4">
      <Icon {...args} />
      <span>Icon name</span>
    </div>
  {/snippet}
</Story>

<Story name="Full Width Component" args={{}} parameters={{ layout: 'full' }}>
  {#snippet template(args)}
    <NavBar {...args} />
  {/snippet}
</Story>
```

#### Automatic Sizing (Fallback)

If you don't specify a `layout` parameter, the system will automatically apply sizing based on story names:

- Stories with "Icon", "Default", "Basic" in the name get compact sizing
- Stories named "Overview" in Icon stories get wide sizing
- Stories with "Full Width" in the name get full sizing
- All others get default sizing

#### Layout Best Practices

1. **Use parameters for explicit control** - more reliable than relying on name patterns
2. **Choose appropriate sizes** - compact for single components, wide for overviews
3. **Test responsiveness** - ensure your content works within the container constraints

### 2. Container Patterns

```svelte
<!-- Form components - constrained width -->
<div class="max-w-md space-y-4">
  <TextField label="Example" />
</div>

<!-- Card grids - responsive columns -->
<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
  <Card title="Card 1" />
  <Card title="Card 2" />
  <Card title="Card 3" />
</div>

<!-- Button groups - flex with gap -->
<div class="flex items-start gap-4">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
</div>

<!-- Vertical sections - space-y for consistency -->
<div class="space-y-8">
  <section><!-- Section 1 --></section>
  <section><!-- Section 2 --></section>
</div>
```

### 3. Section Headings

```svelte
<!-- Use consistent heading hierarchy -->
<h3 class="mb-4 text-lg font-semibold">Section Title</h3>
<h4 class="mb-2 text-base font-medium">Subsection Title</h4>
```

## Validation & Form Stories

### 1. Validation Example Pattern

```svelte
<Story name="With Validation" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Validation Example</h3>
      <Component
        label="Field Label"
        placeholder="Enter value"
        helperText="Helper text for guidance"
        validationRules={[
          validationRules.required('This field is required'),
          validationRules.minLength(3, 'Minimum 3 characters'),
        ]}
        validateOnChange={true}
      />
    </div>
  {/snippet}
</Story>
```

### 2. Form Example Pattern

```svelte
<Story name="Complete Form" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Registration Form</h3>

      <TextField label="Full Name" placeholder="Enter your full name" validationRules={[validationRules.required()]} />

      <TextField
        label="Email"
        type="email"
        placeholder="your.email@example.com"
        validationRules={[validationRules.required(), validationRules.email()]}
      />

      <Button variant="primary" fullWidth>
        {#snippet children()}Submit{/snippet}
      </Button>
    </div>
  {/snippet}
</Story>
```

## Icon Story Patterns

### 1. Icon Overview Story

**Note**: In Svelte 5, dynamic component rendering uses `{@render component(props)}` instead of `<svelte:component this={component}>`.

```svelte
<Story name="Overview" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-lg font-semibold">All Icons</h3>
        <div class="grid grid-cols-8 gap-4">
          {#each iconList as icon}
            <div class="flex flex-col items-center gap-2 p-2">
              {@render icon.component({ size: 24 })}
              <span class="text-xs text-neutral-600">{icon.name}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/snippet}
</Story>
```

### 2. Individual Icon Stories

```svelte
<Story name="Add Icon" parameters={{ layout: 'compact' }}>
  {#snippet template()}
    <div class="flex items-center gap-4">
      <AddIcon size={16} />
      <AddIcon size={24} />
      <AddIcon size={32} />
    </div>
  {/snippet}
</Story>
```

## Example Component Patterns

### 1. Reusable Example Components

Create separate `.svelte` files for complex examples:

```svelte
<!-- RadioGroupExample.svelte -->
<script lang="ts">
  import RadioButton from '../lib/components/forms/RadioButton.svelte'

  let selectedOption = $state('option1')
</script>

<div class="space-y-4">
  <p class="text-neutral-600">Select one option:</p>
  <div class="flex flex-col gap-3">
    <label class="flex cursor-pointer items-center gap-2">
      <RadioButton
        checked={selectedOption === 'option1'}
        onchange={() => (selectedOption = 'option1')}
        name="example-group"
        value="option1"
      />
      <span>Option 1</span>
    </label>
    <!-- More options... -->
  </div>
  <p class="text-sm text-neutral-600">Selected: {selectedOption}</p>
</div>
```

### 2. Using Example Components in Stories

```svelte
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import RadioGroupExample from './RadioGroupExample.svelte'

  const { Story } = defineMeta({
    title: 'Forms/Radio Group Example',
    component: RadioGroupExample,
  })
</script>

<Story name="Interactive Example">
  {#snippet template()}
    <RadioGroupExample />
  {/snippet}
</Story>
```

## Story Organization Rules

### 1. Story Order Priority

1. **Overview** - Always first
2. **Default** - Interactive playground
3. **Variants** - Each major variant
4. **Sizes** - Each size option
5. **States** - Special states (disabled, loading, error)
6. **Complex Examples** - Real-world usage
7. **Edge Cases** - Unusual configurations

### 2. Story Naming Conventions

```svelte
<!-- ✅ Good story names -->
"Overview" // Main showcase "Default" // Interactive playground "Primary" // Variant name "Small" // Size name "Disabled"
// State name "With Validation" // Feature description "Complete Form" // Example description

<!-- ❌ Bad story names -->
"Story 1" // Non-descriptive "Test" // Vague "Example1" // Numbered without context
```

### 3. Title Organization

```svelte
// Component categories 'Core/Button' // Core components 'Forms/TextField' // Form components 'Layout/Card' // Layout
components 'Navigation/TabBar' // Navigation components 'Media/Image' // Media components 'Feedback/Badge' // Feedback
components 'Icons/All Icons' // Icon collections 'Examples/Validation' // Cross-component examples
```

## Documentation & Comments

### 1. Component Documentation

```svelte
const { Story } = defineMeta({
  title: 'Forms/TextField',
  component: TextField,
  parameters: {
    docs: {
      description: {
        component: 'A text input field with validation support, icons, and accessibility features.',
      },
    },
  },
  // ... rest of config
})
```

### 2. ArgType Documentation

```svelte
argTypes: {
  variant: {
    control: { type: 'select' },
    options: ['primary', 'secondary', 'tertiary'],
    description: 'Visual style variant of the button',
    table: {
      defaultValue: { summary: 'primary' },
      type: { summary: 'string' },
    },
  },
}
```

### 3. Story-Level Documentation

```svelte
<Story
  name="Password Requirements"
  args={{}}
  parameters={{
    docs: {
      description: {
        story: 'Demonstrates complex password validation with multiple rules and real-time feedback.',
      },
    },
  }}
>
```

## Testing Integration

### 1. Visual Testing Requirements

**MANDATORY: Every new component must include visual tests alongside Storybook stories.**

When creating a new component, you must:

1. **Create comprehensive Storybook stories** (as documented in this guide)
2. **Add the component to visual tests** following the existing pattern
3. **Ensure the Overview story** is optimized for visual testing

#### Adding Visual Tests for New Components

Follow the existing pattern in `@packages/ui/tests/visual/all-components.spec.ts`:

1. **Add your component** to the `allComponents` array:

```typescript
const allComponents = [
  // ... existing components
  { name: 'YourNewComponent', story: 'overview', section: 'category-yournewcomponent' },
]
```

2. **Follow the naming convention**:
   - `name`: Component name (PascalCase)
   - `story`: Always use `'overview'` (the Overview story)
   - `section`: Storybook section ID (`'category-componentname'`)

#### Example Addition

```typescript
// Add to the allComponents array
{ name: 'Loader', story: 'overview', section: 'feedback-loader' },
```

This automatically creates visual regression tests for both light and dark themes using the Overview story.

### 2. Visual Testing Considerations

**Design stories for visual regression testing:**

```svelte
<!-- Good for visual testing - consistent layout -->
<Story name="All Variants" parameters={{ layout: 'compact' }}>
  {#snippet template()}
    <div class="grid grid-cols-3 gap-4 p-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    </div>
  {/snippet}
</Story>
```

### 2. Accessibility Testing

**Include accessibility features in stories:**

```svelte
<Story name="Accessibility Features">
  {#snippet template()}
    <div class="space-y-4">
      <TextField
        label="Required Field"
        required
        aria-describedby="help-text"
        helperText="This field is required for account creation"
      />
    </div>
  {/snippet}
</Story>
```

## Component Composition in Stories

### Use Library Components Over Raw HTML

**When creating stories that need additional elements (forms, containers, buttons, etc.), always use existing UI components from the same library instead of creating new markup with custom styling.**

#### ✅ Correct: Use Library Components

```svelte
<Story name="Custom Content Example">
  {#snippet template()}
    <Dialog open={true}>
      {#snippet children()}
        <div class="space-y-4">
          <h2 class="text-h3 font-semibold text-neutral-900">Contact Form</h2>
          <div class="space-y-3">
            <!-- Use library components -->
            <TextField label="Name" placeholder="Your name" showLabel={false} />
            <TextField label="Email" type="email" placeholder="Your email" showLabel={false} />
            <TextArea label="Message" placeholder="Your message" rows={3} showLabel={false} />
          </div>
        </div>
      {/snippet}
    </Dialog>
  {/snippet}
</Story>

<Story name="Interactive Example">
  {#snippet template()}
    <div class="space-y-4">
      <!-- Use library Button component -->
      <Button onclick={handleAction} fullWidth>
        {#snippet children()}Start Process{/snippet}
      </Button>

      <!-- Use library Loader component -->
      <Loader variant="progress" progress={progressValue} showProgress />
    </div>
  {/snippet}
</Story>
```

#### ❌ Wrong: Raw HTML with Custom Styling

```svelte
<Story name="Custom Content Example">
  {#snippet template()}
    <Dialog open={true}>
      {#snippet children()}
        <div class="space-y-4">
          <h2 class="text-h3 font-semibold text-neutral-900">Contact Form</h2>
          <div class="space-y-3">
            <!-- Don't use raw HTML inputs -->
            <input type="text" placeholder="Your name" class="w-full rounded-lg border px-3 py-2" />
            <input type="email" placeholder="Your email" class="w-full rounded-lg border px-3 py-2" />
            <textarea placeholder="Your message" rows="3" class="w-full rounded-lg border px-3 py-2"></textarea>
          </div>
        </div>
      {/snippet}
    </Dialog>
  {/snippet}
</Story>

<Story name="Interactive Example">
  {#snippet template()}
    <div class="space-y-4">
      <!-- Don't use raw HTML buttons -->
      <button onclick={handleAction} class="w-full rounded-lg bg-blue-500 px-4 py-2 text-white"> Start Process </button>

      <!-- Don't create custom loading indicators -->
      <div class="flex items-center justify-center">
        <div class="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    </div>
  {/snippet}
</Story>
```

#### Key Benefits of Using Library Components

1. **Consistency**: Maintains visual and behavioral consistency across all stories
2. **Accessibility**: Library components include proper ARIA attributes and keyboard navigation
3. **Maintainability**: Updates to library components automatically improve all stories
4. **Documentation**: Stories serve as examples of how components work together
5. **Testing**: Ensures component interactions are tested in realistic scenarios

#### Component Import Pattern

```svelte
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import MainComponent from '../lib/components/category/MainComponent.svelte'

  // Import other library components as needed
  import Button from '../lib/components/core/Button.svelte'
  import TextField from '../lib/components/forms/TextField.svelte'
  import TextArea from '../lib/components/forms/TextArea.svelte'
  import Card from '../lib/components/layout/Card.svelte'
  import Badge from '../lib/components/feedback/Badge.svelte'

  // ... story configuration
</script>
```

#### Real-World Examples

**Form Validation Story:**

```svelte
<Story name="Contact Form">
  {#snippet template()}
    <Card variant="default">
      {#snippet children()}
        <div class="space-y-4">
          <TextField
            label="Full Name"
            placeholder="Enter your full name"
            validationRules={[validationRules.required()]}
          />
          <TextField
            label="Email"
            type="email"
            placeholder="your.email@example.com"
            validationRules={[validationRules.required(), validationRules.email()]}
          />
          <TextArea label="Message" placeholder="How can we help you?" rows={4} />
          <Button variant="primary" fullWidth>
            {#snippet children()}Send Message{/snippet}
          </Button>
        </div>
      {/snippet}
    </Card>
  {/snippet}
</Story>
```

**Dashboard Example:**

```svelte
<Story name="Dashboard Widget">
  {#snippet template()}
    <Card variant="default">
      {#snippet children()}
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Analytics</h3>
            <Badge variant="success">Live</Badge>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="text-center">
              <Loader variant="progress" progress={75} showProgress color="success" />
              <p class="mt-2 text-sm text-neutral-600">Server Health</p>
            </div>
            <div class="text-center">
              <Loader variant="spinner" color="primary" />
              <p class="mt-2 text-sm text-neutral-600">Loading Data</p>
            </div>
          </div>

          <Button variant="secondary" fullWidth>
            {#snippet children()}Refresh Dashboard{/snippet}
          </Button>
        </div>
      {/snippet}
    </Card>
  {/snippet}
</Story>
```

This pattern ensures that stories not only demonstrate individual components but also show how the entire design system works together cohesively.

## Common Mistakes to Avoid

### 1. Svelte 5 Anti-Patterns

```svelte
<!-- ❌ Don't use on: directives -->
<Button on:click={() => {}}>Click me</Button>

<!-- ✅ Use direct event props -->
<Button onclick={() => {}}>Click me</Button>

<!-- ❌ Don't use direct content in components -->
<Button>Click me</Button>

<!-- ✅ Use snippet syntax -->
<Button>
  {#snippet children()}Click me{/snippet}
</Button>

<!-- ❌ Don't use svelte:component for dynamic components -->
<svelte:component this={component} prop="value" />

<!-- ✅ Use @render for dynamic components -->
{@render component({ prop: "value" })}
```

### 2. Story Structure Anti-Patterns

```svelte
<!-- ❌ Don't repeat component props manually -->
<Component variant={args.variant} size={args.size} disabled={args.disabled} />

<!-- ✅ Use props spreading -->
<Component {...args} />

<!-- ❌ Don't hardcode all props in interactive stories -->
<Story name="Default" args={{ variant: 'primary' }}>
  {#snippet template()}
    <Component variant="primary">Content</Component>
  {/snippet}
</Story>

<!-- ✅ Use args spreading for flexibility -->
<Story name="Default" args={{ variant: 'primary' }}>
  {#snippet template(args)}
    <Component {...args}>Content</Component>
  {/snippet}
</Story>
```

### 3. Layout Anti-Patterns

```svelte
<!-- ❌ Don't use inconsistent spacing -->
<div style="margin: 10px; padding: 5px;">

<!-- ✅ Use Tailwind utility classes -->
<div class="space-y-4 p-4">

<!-- ❌ Don't use fixed dimensions without responsive considerations -->
<div style="width: 300px;">

<!-- ✅ Use responsive utilities -->
<div class="w-full max-w-md">
```

## Quality Checklist

### Before Submitting Stories

- [ ] **Overview story** showcases all major variants
- [ ] **Default story** uses `{...args}` spreading
- [ ] **All stories** use Svelte 5 snippet syntax
- [ ] **Event handlers** use direct props (not `on:`)
- [ ] **Layout parameters** are appropriate
- [ ] **ArgTypes** have proper descriptions
- [ ] **Story names** are descriptive and consistent
- [ ] **Responsive layouts** use Tailwind utilities
- [ ] **Icons** are properly imported and used
- [ ] **Validation examples** include realistic rules
- [ ] **Documentation** is complete and helpful
- [ ] **Visual consistency** across all stories
- [ ] **Component added** to `@packages/ui/tests/visual/all-components.spec.ts`
- [ ] **Overview story optimized** for visual regression testing (static content, consistent layouts)
- [ ] **Library components used** instead of raw HTML in complex examples

### Story Quality Standards

1. **Completeness**: All component features demonstrated
2. **Clarity**: Each story has a clear purpose
3. **Consistency**: Follows established patterns
4. **Responsiveness**: Works on different screen sizes
5. **Accessibility**: Includes proper labels and ARIA attributes
6. **Performance**: No unnecessary re-renders or heavy computations
7. **Documentation**: Comprehensive descriptions and examples

## Future Considerations

### 1. Advanced Patterns (Planned)

- **Multi-component stories** for complex interactions
- **Animation stories** for transition demonstrations
- **Theme variation stories** for light/dark mode testing
- **Mobile-specific stories** for responsive behavior
- **Performance stories** for optimization validation

### 2. Story Enhancement Opportunities

- **Interactive demos** with real-time code editing
- **Copy-paste code snippets** for easy implementation
- **Design token integration** for consistent styling
- **Automated screenshot generation** for documentation
- **Cross-browser compatibility** testing integration

This document serves as the definitive guide for creating consistent, high-quality Storybook stories in the Senka UI library. All new component stories must follow these patterns to maintain the library's professional standards and developer experience.
