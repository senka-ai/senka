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
<Component>
  Content goes here
</Component>
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

### 3. Event Handler Pattern

**Use direct event props, not on: directives:**

```svelte
<!-- ✅ Correct: Direct event props -->
<Component 
  onclick={() => console.log('clicked')}
  onchange={(value) => console.log('changed:', value)}
/>

<!-- ❌ Wrong: on: directives -->
<Component 
  on:click={() => console.log('clicked')}
  on:change={(e) => console.log('changed:', e.detail)}
/>
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

| Prop Type | Control Type | Example |
|-----------|--------------|---------|
| `boolean` | `{ type: 'boolean' }` | `disabled`, `loading` |
| `string enum` | `{ type: 'select' }` | `variant`, `size` |
| `string` | `{ type: 'text' }` | `label`, `placeholder` |
| `number` | `{ type: 'number' }` | `iconSize`, `rows` |
| `color` | `{ type: 'color' }` | `backgroundColor` |
| `function` | Hide from controls | `onclick`, `onchange` |

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

### 1. Layout Parameters

```svelte
<!-- For single components -->
parameters={{ layout: 'compact' }}

<!-- For showcases with multiple components -->
parameters={{ layout: 'default' }}

<!-- For full-width components -->
parameters={{ layout: 'wide' }}
```

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
      
      <TextField
        label="Full Name"
        placeholder="Enter your full name"
        validationRules={[validationRules.required()]}
      />

      <TextField
        label="Email"
        type="email"
        placeholder="your.email@example.com"
        validationRules={[
          validationRules.required(),
          validationRules.email()
        ]}
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

```svelte
<Story name="Overview" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-lg font-semibold">All Icons</h3>
        <div class="grid grid-cols-8 gap-4">
          {#each iconList as icon}
            <div class="flex flex-col items-center gap-2 p-2">
              <svelte:component this={icon.component} size={24} />
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
"Overview"           // Main showcase
"Default"           // Interactive playground
"Primary"           // Variant name
"Small"             // Size name
"Disabled"          // State name
"With Validation"   // Feature description
"Complete Form"     // Example description

<!-- ❌ Bad story names -->
"Story 1"           // Non-descriptive
"Test"              // Vague
"Example1"          // Numbered without context
```

### 3. Title Organization

```svelte
// Component categories
'Core/Button'           // Core components
'Forms/TextField'       // Form components
'Layout/Card'           // Layout components
'Navigation/TabBar'     // Navigation components
'Media/Image'           // Media components
'Feedback/Badge'        // Feedback components
'Icons/All Icons'       // Icon collections
'Examples/Validation'   // Cross-component examples
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

### 1. Visual Testing Considerations

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
```

### 2. Story Structure Anti-Patterns

```svelte
<!-- ❌ Don't repeat component props manually -->
<Component 
  variant={args.variant} 
  size={args.size} 
  disabled={args.disabled}
/>

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