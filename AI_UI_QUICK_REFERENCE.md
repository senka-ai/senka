# 🤖 AI Quick Reference: Building Senka UI

## ⚡ INSTANT DECISION GUIDE

```
What do you need? → What to use:

Container?          → Card, Accordion, Dialog
Form control?       → TextField, Toggle, Dropdown, RadioGroup, Slider
Button?            → Button, IconButton
Layout?            → StackArrangement, RowArrangement (from layout-engine)
List?              → List, ListItem, ListTitle
Status indicator?   → Badge, Tag, ProgressBar
Separator?         → Divider
Tabs/switching?    → Tabs, ContentSwitcher, TabBar
```

## 🎯 ONE-LINE RULES

1. **NEVER** write custom CSS classes
2. **ALWAYS** import from `@senka-ai/ui` or `@senka-ai/layout-engine`
3. **ONLY** use semantic colors (`text-primary`, `bg-surface`, etc.)
4. **NO** emoji icons - use icon components
5. **NO** inline SVG - use icon components

## 📦 IMPORTS TEMPLATE

```svelte
<script lang="ts">
  // UI Components
  import { Card, Button, Toggle, RadioGroup, Slider, Divider } from '@senka-ai/ui'

  // Layout
  import { StackArrangement, RowArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  // Icons (if needed)
  import { ArrowRightIcon, CheckIcon } from '@senka-ai/ui'
</script>
```

## 🏗️ LAYOUT TEMPLATE

```svelte
<!-- Stack Layout (vertical) -->
<script>
  const stack = new StackArrangement()
  const stackConfig = { type: 'stack', gap: 'normal', padding: 'normal' }
</script>
<div style={cssPropertiesToString(stack.toCSS(stackConfig))}>
  <!-- content -->
</div>

<!-- Row Layout (horizontal) -->
<script>
  const row = new RowArrangement()
  const rowConfig = { type: 'row', gap: 'normal', align: 'center' }
</script>
<div style={cssPropertiesToString(row.toCSS(rowConfig))}>
  <!-- content -->
</div>
```

## 🎨 SEMANTIC COLORS ONLY

```
Text:       text-primary, text-secondary, text-muted
Background: bg-background, bg-surface, bg-surface-elevated
Borders:    border-default, border-strong
States:     text/bg/border-[highlight|success|warning|error]
Scales:     bg-[color]-[50|100|200|300|400]
```

## ✅ COMPONENT CHEAT SHEET

### Containers

```svelte
<Card title="Title" subtitle="Subtitle">
  <!-- content -->
</Card>
```

### Forms

```svelte
<TextField label="Name" fullWidth />
<Toggle label="Enable" value={enabled} onchange={(v) => (enabled = v)} />
<RadioGroup options={opts} value={selected} onchange={(v) => (selected = v)} />
<Slider min={0} max={100} value={val} onchange={(v) => (val = v)} />
<Dropdown options={opts} value={selected} fullWidth />
```

### Buttons

```svelte
<Button variant="primary">
  {#snippet children()}Click me{/snippet}
</Button>
```

### Lists

```svelte
<List>
  <ListTitle>Items</ListTitle>
  <ListItem title="Item 1" description="Description" />
</List>
```

### Feedback

```svelte
<Badge variant="success">Active</Badge>
<Tag>Label</Tag>
<ProgressBar value={50} max={100} />
<Divider />
```

## 🚫 NEVER DO THIS

```svelte
<!-- ❌ Custom classes -->
<div class="flex gap-4 p-6">

<!-- ❌ Non-semantic colors -->
<div class="text-gray-600 bg-blue-50">

<!-- ❌ Emoji icons -->
<Button leftIcon="🚀">

<!-- ❌ Inline SVG -->
<svg viewBox="0 0 24 24">...</svg>

<!-- ❌ Custom styled elements -->
<div class="custom-panel rounded-lg border-2">
```

## ✅ ALWAYS DO THIS

```svelte
<!-- ✅ Use UI components -->
<Card title="Section">

<!-- ✅ Semantic colors -->
<div class="text-primary bg-surface">

<!-- ✅ Icon components -->
<Button leftIcon={ArrowRightIcon}>

<!-- ✅ Layout engine -->
<div style={cssPropertiesToString(stack.toCSS(config))}>
```

## 🎯 VALIDATION CHECKLIST

Before committing:

- [ ] All imports from `@senka-ai/ui` or `@senka-ai/layout-engine`?
- [ ] Zero custom CSS classes?
- [ ] Only semantic colors?
- [ ] No emoji icons?
- [ ] No inline SVG?
- [ ] Layout handled by layout-engine?

## 🚀 COMPLETE EXAMPLE

```svelte
<script lang="ts">
  import { Card, RadioGroup, Slider, Toggle, Button, Divider } from '@senka-ai/ui'
  import { StackArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  let alignment = $state('center')
  let spacing = $state(16)
  let enabled = $state(false)

  const stack = new StackArrangement()
  const config = { type: 'stack', gap: 'normal', padding: 'normal' }

  const alignOpts = [
    { value: 'start', label: 'Start' },
    { value: 'center', label: 'Center' },
    { value: 'end', label: 'End' },
  ]
</script>

<Card title="Settings">
  <div style={cssPropertiesToString(stack.toCSS(config))}>
    <RadioGroup label="Alignment" options={alignOpts} value={alignment} onchange={(v) => (alignment = v)} />

    <Divider />

    <Slider label="Spacing" min={0} max={32} value={spacing} onchange={(v) => (spacing = v)} />

    <Divider />

    <Toggle label="Enable feature" value={enabled} onchange={(v) => (enabled = v)} />

    <Divider />

    <Button variant="primary" fullWidth>
      {#snippet children()}Apply{/snippet}
    </Button>
  </div>
</Card>
```

**Remember: If you're writing custom CSS, you're doing it wrong!**
