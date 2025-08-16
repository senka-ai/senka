# @senka-ai/layout-showcase

Interactive showcase and demonstration app for the Senka Layout Engine, built with SvelteKit and the Senka UI library.

## Purpose

This package serves as a **live demonstration** and **testing ground** for the `@senka-ai/layout-engine` package. It provides:

- **Interactive demos** of all layout arrangement types
- **Real-time CSS generation** visualization
- **Visual control components** for layout properties
- **Working examples** for developers and designers
- **Integration testing** for the layout engine API

## Features

- 🎮 **Interactive Controls** - Live property panels with immediate feedback
- 📱 **Responsive Preview** - See how layouts adapt across screen sizes
- 🎨 **Visual Components** - Reusable controls for direction, spacing, and alignment
- 📋 **CSS Generation** - Copy generated CSS with one click
- ⚡ **Real-time Updates** - Changes reflected instantly
- 🧪 **Testing Platform** - Validate layout engine functionality

## Technology Stack

- **SvelteKit** - Application framework with file-based routing
- **Svelte 5** - Modern reactive framework with runes
- **TypeScript** - Strict type checking enabled
- **Tailwind CSS v4** - Utility-first styling
- **@senka-ai/ui** - Senka design system components
- **@senka-ai/layout-engine** - Core layout functionality

## Project Structure

```
packages/layout-showcase/
├── src/
│   ├── lib/
│   │   └── components/           # Reusable control components
│   │       ├── AlignmentPicker.svelte    # Cross-axis alignment control
│   │       ├── CSSDisplay.svelte         # CSS output with copy functionality
│   │       ├── DirectionToggle.svelte    # Vertical/horizontal toggle
│   │       ├── PropertyPanel.svelte      # Container for demo controls
│   │       └── SpacingSlider.svelte      # Semantic spacing selector
│   ├── routes/
│   │   ├── +layout.svelte        # Application shell
│   │   ├── +page.svelte          # Homepage with demo navigation
│   │   └── stack-demo/           # Stack arrangement demonstration
│   │       └── +page.svelte
│   ├── app.css                   # Global styles
│   └── app.html                  # HTML template
├── static/                       # Static assets
├── package.json
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

## Available Demos

### Stack Demo (`/stack-demo`)

Interactive demonstration of the Stack arrangement with:

- **Direction Control** - Switch between vertical and horizontal stacking
- **Spacing Control** - Select from semantic spacing scales (tight, normal, spacious, etc.)
- **Alignment Control** - Choose cross-axis alignment (start, center, end, stretch)
- **Live CSS Preview** - See generated CSS properties in real-time
- **Visual Examples** - Three demo elements showing layout behavior

### Reusable Components

#### `PropertyPanel.svelte`

Container component for organizing demo controls:

```svelte
<PropertyPanel title="Stack Properties" description="Adjust settings">
  <!-- Controls go here -->
</PropertyPanel>
```

#### `DirectionToggle.svelte`

Toggle for layout direction:

```svelte
<DirectionToggle value={direction} onchange={handleDirectionChange} />
```

#### `SpacingSlider.svelte`

Semantic spacing selector:

```svelte
<SpacingSlider value={spacing} onchange={handleSpacingChange} />
```

#### `AlignmentPicker.svelte`

Visual alignment picker:

```svelte
<AlignmentPicker value={alignment} onchange={handleAlignmentChange} />
```

#### `CSSDisplay.svelte`

CSS output with copy functionality:

```svelte
<CSSDisplay css={generatedCSS} title="Generated CSS" variant="success" />
```

## Development

### Setup

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Access at http://localhost:5175
```

### Build

```bash
# Build for production
yarn build

# Preview production build
yarn preview
```

### Type Checking

```bash
# Check TypeScript
yarn typecheck

# Check Svelte components
yarn check
```

## Layout Engine Integration

The showcase demonstrates the new **flattened schema** of the layout engine:

### Before (Old Schema)

```typescript
// Required 'as const' assertions
const layout = {
  arrangement: { type: 'stack' as const },
  autoLayout: { mode: 'fill-container' as const },
}
```

### After (New Schema)

```typescript
// Clean, intuitive API
const layout = {
  type: 'stack',
  fillContainer: true,
  gap: 'normal',
}
```

### Example Implementation

```typescript
// Create layout configuration
const testContainer = {
  id: 'demo-stack',
  type: 'stack',
  direction: 'vertical',
  fillContainer: true,
  gap: 'normal',
  align: 'stretch',
}

// Generate CSS
const stackArrangement = new StackArrangement()
const css = stackArrangement.toCSS(testContainer)
```

## Key Benefits Demonstrated

- **No `as const` required** - TypeScript infers types correctly
- **Intuitive property names** - `gap`, `align`, `fillContainer`
- **Direct property access** - No nested objects to navigate
- **Real-time reactivity** - Changes update immediately
- **Visual feedback** - See layout changes instantly

## Future Expansion

The showcase is designed to easily accommodate new arrangement types:

- **Row Demo** - Horizontal layouts with wrapping
- **Grid Demo** - Multi-column grid layouts
- **Flow Demo** - Text-like flowing elements
- **Overlay Demo** - Layered positioning
- **Frame Demo** - Container arrangements
- **Responsive Demo** - Breakpoint behavior
- **Complex Layouts** - Nested arrangement combinations

## Usage in Development

This showcase serves multiple purposes:

1. **API Testing** - Validate layout engine functionality
2. **Visual Documentation** - Show capabilities to stakeholders
3. **Component Development** - Build and test control components
4. **Integration Validation** - Ensure proper UI library integration
5. **Performance Testing** - Monitor real-time update performance

## Contributing

When adding new demos:

1. Create new route directory (e.g., `routes/grid-demo/`)
2. Use existing control components for consistency
3. Follow the established pattern of reactive configuration
4. Include live CSS preview with copy functionality
5. Add navigation link from the homepage

## Related Packages

- **@senka-ai/layout-engine** - Core layout functionality
- **@senka-ai/ui** - Design system components
- **@senka-ai/visual-builder** - Drag-and-drop builder (future)

---

**Status**: Active development | **Version**: 0.0.1 | **Framework**: SvelteKit
