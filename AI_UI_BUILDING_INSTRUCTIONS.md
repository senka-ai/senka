# AI Instructions for Building Senka UI

## 🤖 AI MANDATORY READING ORDER

When building ANY UI in Senka packages, AI MUST read these files in this EXACT order:

1. **THIS FILE** - Core rules and patterns
2. **`packages/ui/UI_ARCHITECTURE.md`** - Component library architecture
3. **`packages/ui/src/lib/index.ts`** - Available components list
4. **`packages/layout-engine/README.md`** - Layout system usage
5. **Component source files** - Read the actual component implementation before using

## 🚨 CRITICAL DECISION TREE FOR AI

When you need to create ANY UI element, follow this decision tree:

```
Need UI Element?
├── Is it a layout container?
│   ├── YES → Use Container from @senka-ai/ui
│   └── NO → Continue
├── Is it content presentation?
│   ├── YES → Use Card (rich content), Banner (notifications), Accordion (collapsible) from @senka-ai/ui
│   └── NO → Continue
├── Is it a form control?
│   ├── YES → Use TextField, Dropdown, Toggle, etc. from @senka-ai/ui
│   └── NO → Continue
├── Is it a layout arrangement?
│   ├── YES → Use RowArrangement, StackArrangement from @senka-ai/layout-engine
│   └── NO → Continue
├── Is it a button or action?
│   ├── YES → Use Button or IconButton from @senka-ai/ui
│   └── NO → Continue
├── Is it a display element?
│   ├── YES → Use Badge, Tag, ProgressBar from @senka-ai/ui
│   └── NO → Continue
└── STOP! → Don't create custom components. Find the right UI library component.
```

## 📋 AI PRE-BUILD CHECKLIST

Before writing ANY code, AI must:

- [ ] Import ONLY from `@senka-ai/ui` and `@senka-ai/layout-engine`
- [ ] Identify which UI components to use (no custom components)
- [ ] Plan layout using layout-engine arrangements
- [ ] Verify semantic colors are available
- [ ] Check if icons are needed (import from UI library)

## 🎯 PATTERN MATCHING FOR AI

### When User Says → AI Should Use

| User Request                | UI Library Component                               | Layout Engine               |
| --------------------------- | -------------------------------------------------- | --------------------------- |
| "Create a settings panel"   | `Container` with `TextField`, `Toggle`, `Dropdown` | `StackArrangement`          |
| "Add a property editor"     | `Container` with `RadioGroup`, `Slider`            | `StackArrangement`          |
| "Create a simple container" | `Container` with content                           | `StackArrangement`          |
| "Show product info"         | `Card` with title, description, image, actions     | Built-in card layout        |
| "Build a control group"     | `ContentSwitcher` or `RadioGroup`                  | `RowArrangement`            |
| "Make a list of items"      | `List` with `ListItem`                             | Built-in list layout        |
| "Add spacing controls"      | `Slider` with semantic values                      | N/A                         |
| "Create alignment picker"   | `RadioGroup` with alignment options                | N/A                         |
| "Add action buttons"        | `Button` with variants                             | `RowArrangement` for groups |
| "Show status"               | `Badge` or `Tag`                                   | N/A                         |
| "Add divider"               | `Divider`                                          | N/A                         |

## 🛠️ COMPONENT USAGE TEMPLATES FOR AI

### Template 1: Property Control Panel (Layout Container)

```svelte
<script lang="ts">
  import { Container, RadioGroup, Slider, Toggle, Divider } from '@senka-ai/ui'
  import { StackArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  const stack = new StackArrangement()
  const config = { type: 'stack', gap: 'normal', padding: 'normal' }
</script>

<Container padding="normal" background>
  <div style={cssPropertiesToString(stack.toCSS(config))}>
    <RadioGroup {options} {value} {onchange} />
    <Divider />
    <Slider {min} {max} {value} {onchange} />
    <Divider />
    <Toggle {label} {value} {onchange} />
  </div>
</Container>
```

### Template 1a: Content Presentation (Rich Card)

```svelte
<script lang="ts">
  import { Card } from '@senka-ai/ui'
</script>

<Card
  title="Product Name"
  subtitle="Category"
  description="Detailed product description..."
  image="/product.jpg"
  buttonText="Add to Cart"
  showAction={true}
  onclick={handleAddToCart}
/>
```

### Template 2: Button Group

```svelte
<script lang="ts">
  import { Button } from '@senka-ai/ui'
  import { RowArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  const row = new RowArrangement()
  const config = { type: 'row', gap: 'normal', align: 'center' }
</script>

<div style={cssPropertiesToString(row.toCSS(config))}>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
</div>
```

### Template 3: Form Layout

```svelte
<script lang="ts">
  import { Container, TextField, Dropdown, Button } from '@senka-ai/ui'
  import { StackArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  const stack = new StackArrangement()
  const config = { type: 'stack', gap: 'normal', fillContainer: true }
</script>

<Container padding="normal" background>
  <div style={cssPropertiesToString(stack.toCSS(config))}>
    <TextField label="Name" fullWidth />
    <Dropdown label="Type" {options} fullWidth />
    <Button variant="primary" fullWidth>Submit</Button>
  </div>
</Container>
```

## ❌ AI MUST NEVER DO

1. **NEVER use custom Tailwind classes**

   ```svelte
   <!-- NEVER DO THIS -->
   <div class="flex gap-4 p-6 space-y-4">
   ```

2. **NEVER use non-semantic colors**

   ```svelte
   <!-- NEVER DO THIS -->
   <div class="text-gray-600 bg-blue-50">
   ```

3. **NEVER use emoji as icons**

   ```svelte
   <!-- NEVER DO THIS -->
   <Button leftIcon="🚀">
   ```

4. **NEVER create custom styled components**

   ```svelte
   <!-- NEVER DO THIS -->
   <div class="custom-panel rounded-lg border-2 p-4">
   ```

5. **NEVER use inline SVG**
   ```svelte
   <!-- NEVER DO THIS -->
   <svg viewBox="0 0 24 24">...</svg>
   ```

## ✅ AI MUST ALWAYS DO

1. **ALWAYS import from UI library**

   ```svelte
   import {(Card, Button, Toggle)} from '@senka-ai/ui'
   ```

2. **ALWAYS use semantic colors**

   ```svelte
   <div class="text-primary bg-surface border-default">
   ```

3. **ALWAYS use layout-engine for arrangements**

   ```svelte
   import {RowArrangement} from '@senka-ai/layout-engine'
   ```

4. **ALWAYS use icon components**

   ```svelte
   // Preferred: UI library icons
   import { ArrowRightIcon } from '@senka-ai/ui/icons'
   <Button leftIcon={ArrowRightIcon}>
   ```

5. **ALWAYS use snippet pattern for children**
   ```svelte
   <Button>Click me</Button>
   ```

## 🔍 AI VALIDATION PROMPTS

Before generating code, AI should ask itself:

1. "Am I importing everything from @senka-ai/ui or @senka-ai/layout-engine?"
2. "Am I using any custom CSS classes?"
3. "Are all my colors semantic (text-primary, bg-surface, etc.)?"
4. "Am I using the right UI component for this purpose?"
5. "Is my layout handled by layout-engine?"

## 📊 SEMANTIC VALUE MAPPINGS FOR AI

### Spacing Values

```typescript
'none' → 0
'tight' → 4px
'cozy' → 8px
'normal' → 16px
'comfortable' → 24px
'spacious' → 32px
```

### Component Sizes

```typescript
'xs' → Extra small
'small' → Small
'medium' → Medium (default)
'large' → Large
```

### Variants

```typescript
'primary' → Main action
'secondary' → Secondary action
'tertiary' → Tertiary action
'success' → Success state
'warning' → Warning state
'error' → Error state
```

## 🏗️ AI BUILDING WORKFLOW

1. **Identify Requirements**
   - What UI elements are needed?
   - What interactions are required?
   - What data needs to be displayed?

2. **Map to Components**
   - Container → Card
   - Controls → RadioGroup, Slider, Toggle
   - Actions → Button
   - Layout → StackArrangement, RowArrangement

3. **Write Imports**

   ```svelte
   import {[components]} from '@senka-ai/ui' import {[arrangements]} from '@senka-ai/layout-engine'
   ```

4. **Structure Layout**

   ```svelte
   const arrangement = new [Arrangement]()
   const config = { type: '[type]', gap: '[spacing]' }
   ```

5. **Compose UI**
   - Use UI components
   - Apply layout with cssPropertiesToString
   - Use semantic colors only

## 🎨 QUICK REFERENCE FOR AI

### Available Layout Components

- `Container` - Layout container for structural organization
- `Accordion` - Collapsible sections
- `Dialog` - Modal overlays
- `List` - Structured item lists
- `Divider` - Visual separators

### Available Content Components

- `Card` - Rich content with title, image, actions
- `Banner` - Important notifications
- `Tag` - Labels and categories

### Available Controls

- `Button` - Actions
- `Toggle` - On/off
- `RadioGroup` - Single selection
- `Checkbox` - Multiple selection
- `Slider` - Range selection
- `Dropdown` - Many options
- `ContentSwitcher` - Tab-like switching

### Available Inputs

- `TextField` - Single line
- `TextArea` - Multi-line
- `NumberInput` - Numbers
- `SearchBar` - Search

### Available Display

- `Badge` - Status
- `Tag` - Labels
- `ProgressBar` - Progress
- `Divider` - Separation
- `Toast` - Notifications
- `Tooltip` - Help text

### Available Layouts (from layout-engine)

- `StackArrangement` - Vertical/horizontal stack
- `RowArrangement` - Horizontal row
- `GridArrangement` - Grid layout
- `FlowArrangement` - Flow layout
- `OverlayArrangement` - Layered layout

### Available Icons

#### @senka-ai/ui/icons

- `ArrowUpIcon`, `ArrowDownIcon`, `ArrowLeftIcon`, `ArrowRightIcon`
- `AddIcon`, `CloseIcon`, `EditIcon`, `DeleteIcon`
- `CheckIcon`, `WarningIcon`, `InfoIcon`, `SuccessIcon`
- `SettingsIcon`, `SearchIcon`, `FilterIcon`, `SortIcon`
- And many more standard UI icons

## 🚀 AI SUCCESS METRICS

Your generated code is successful when:

- ✅ Zero custom CSS classes
- ✅ 100% UI library components
- ✅ 100% semantic colors
- ✅ Layout handled by layout-engine
- ✅ No inline styles (except from layout-engine)
- ✅ No emoji icons
- ✅ Clean, readable component composition

## FINAL INSTRUCTION TO AI

**REMEMBER**: You are building professional, production-ready UI using ONLY the Senka UI library and layout engine. Every decision should prioritize using existing components over creating custom solutions. When in doubt, check what's available in the UI library first!
