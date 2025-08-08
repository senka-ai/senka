# Senka Layout Engine: Final Architecture

## Executive Summary

The Senka Layout Engine combines intuitive spatial reasoning with sophisticated constraint-based positioning. This creates a powerful yet accessible layout system that enables non-technical users to build complex, responsive layouts through visual tools while maintaining the flexibility for advanced customizations.

**Package**: `@senka-ai/layout-engine` - A dedicated package within the Senka monorepo

## Implementation Status

**Current Version**: 0.0.1 (Alpha)
**Last Updated**: January 2025

### What's Built
- Core type system with comprehensive interfaces
- Six arrangement types (Stack, Row, Grid, Flow, Overlay, Frame)
- ArrangementEngine with platform optimization
- Basic spacing system with semantic scales
- Foundation for auto-layout and constraints

### What's Next
- Complete auto-layout implementation
- Build constraint solver system
- Add responsive breakpoint management
- Create visual control components
- Implement CSS optimization

## Core Design Principles

1. **Progressive Disclosure**: Simple by default, powerful when needed
2. **Spatial Reasoning First**: Think in arrangements, not CSS
3. **Constraint-Based Flexibility**: Relationships and constraints
4. **Modification Safety**: Every change is preview-able and reversible
5. **Responsive Intelligence**: Automatic mobile optimization with override capability
6. **Visual Feedback**: Real-time preview with impact visualization

## Architecture Overview

### 1. Arrangement System

```typescript
interface LayoutContainer {
  // User-friendly arrangement types
  arrangement: {
    type: 'flow' | 'stack' | 'row' | 'grid' | 'overlay' | 'frame'
    direction?: 'horizontal' | 'vertical'
    wrap?: boolean
    reverse?: boolean
  }

  // Auto-layout properties
  autoLayout: {
    mode: 'fixed' | 'hug-contents' | 'fill-container'
    primaryAxis: 'packed' | 'space-between' | 'center'
    counterAxis: 'start' | 'center' | 'end' | 'stretch'
    gap: SpacingValue
    padding: PaddingValue
  }

  // Constraint system
  constraints: {
    horizontal: ConstraintRule
    vertical: ConstraintRule
    aspectRatio?: number | 'preserve'
    minSize?: { width?: number; height?: number }
    maxSize?: { width?: number; height?: number }
  }

  // Smart relationships
  relationships: {
    parent: PositionRelationship
    siblings: ElementRelationship[]
    children: LayoutBehavior
  }
}
```

### 2. Constraint System

```typescript
interface ConstraintRule {
  left?: PinConstraint
  right?: PinConstraint
  top?: PinConstraint
  bottom?: PinConstraint
  centerH?: boolean
  centerV?: boolean

  // Size behavior
  width: 'fixed' | 'fill' | 'hug' | 'relative'
  height: 'fixed' | 'fill' | 'hug' | 'relative'

  // Advanced constraints
  maintainAspectRatio?: boolean
  scaleWithParent?: boolean
}

interface PinConstraint {
  enabled: boolean
  offset: number | 'auto'
  reference: 'parent' | 'sibling' | ElementId
}
```

### 3. Intuitive Spacing System

Combining semantic spacing with precise control:

```typescript
interface SpacingSystem {
  // Semantic spacing (user-friendly)
  scale: {
    none: 0
    tight: 4
    cozy: 8
    normal: 16
    comfortable: 24
    spacious: 32
    custom: number
  }

  // Spacing modes
  mode: 'packed' | 'distribute' | 'space-between'

  // Smart spacing
  auto: {
    betweenSimilar: SpacingValue // e.g., between buttons
    betweenDifferent: SpacingValue // e.g., between sections
    responsive: boolean // auto-adjust for touch on mobile
  }
}
```

### 4. Visual Property Controls

User-friendly controls that map to sophisticated behaviors:

```typescript
interface VisualControls {
  // Arrangement controls (simple mode)
  simple: {
    arrangement: ArrangementPicker // Visual icons for each type
    spacing: SpacingSlider // Visual slider with presets
    alignment: AlignmentGrid // 9-point alignment grid
    distribution: DistributionPicker // Visual distribution options
  }

  // Advanced mode
  advanced: {
    autoLayout: AutoLayoutPanel
    constraints: ConstraintPanel
    effects: EffectsPanel
    responsive: ResponsiveRulesPanel
  }

  // Context-aware suggestions
  ai: {
    suggestLayout: boolean
    optimizeSpacing: boolean
    fixAccessibility: boolean
    improveResponsive: boolean
  }
}
```

### 5. Responsive System with Intelligence

Three-tier system with automatic optimization:

```typescript
interface ResponsiveEngine {
  // Tier 1: Automatic
  automatic: {
    enabled: boolean
    mobileOptimization: 'aggressive' | 'balanced' | 'minimal'
    breakpoints: 'auto' | number[]

    rules: {
      stackRowsOnMobile: boolean
      increaseSpacingForTouch: boolean
      simplifyGridsOnMobile: boolean
      hideNonEssentials: boolean
    }
  }

  // Tier 2: Breakpoint Rules (enhanced)
  breakpointRules: {
    mobile: LayoutOverride
    tablet?: LayoutOverride
    desktop?: LayoutOverride
    custom?: { [breakpoint: number]: LayoutOverride }
  }

  // Tier 3: Container Queries
  containerQueries: {
    enabled: boolean
    rules: ContainerRule[]
  }
}

interface LayoutOverride {
  arrangement?: ArrangementType
  visibility?: 'show' | 'hide' | 'collapse'
  constraints?: Partial<ConstraintRule>
  spacing?: SpacingOverride
  priority?: number // for reordering elements
}
```

### 6. Modification Safety System

Enhanced safety features:

```typescript
interface ModificationSafety {
  // Change preview
  preview: {
    enabled: boolean
    showBefore: boolean
    showAfter: boolean
    showImpactedElements: boolean
    animateTransition: boolean
  }

  // Impact analysis
  impact: {
    affectedElements: ElementId[]
    breakingChanges: Change[]
    performanceImpact: 'none' | 'low' | 'medium' | 'high'
    accessibilityImpact: AccessibilityIssue[]
  }

  // Safety controls
  safety: {
    requireConfirmation: 'never' | 'breaking-only' | 'always'
    autoBackup: boolean
    undoLevels: number
    versionSnapshots: boolean
  }

  // Conflict resolution
  conflicts: {
    detection: 'realtime' | 'on-change' | 'on-save'
    autoResolve: 'never' | 'safe-only' | 'with-permission'
    suggestions: ConflictSuggestion[]
  }
}
```

## Implementation Architecture

### Package Structure

```
packages/layout-engine/
├── src/
│   ├── core/
│   │   ├── arrangements/         # Layout arrangement implementations
│   │   ├── constraints/          # Constraint system
│   │   ├── spacing/              # Spacing calculations
│   │   └── relationships/        # Element relationships
│   ├── responsive/
│   │   ├── breakpoints/          # Breakpoint management
│   │   ├── rules/                # Responsive rules engine
│   │   └── optimization/         # Mobile optimization
│   ├── visual/
│   │   ├── controls/             # Visual control components
│   │   ├── preview/              # Preview system
│   │   └── feedback/             # Visual feedback
│   ├── intelligence/
│   │   ├── suggestions/          # AI-powered suggestions
│   │   ├── optimization/         # Layout optimization
│   │   └── validation/           # Layout validation
│   ├── css/
│   │   ├── generator/            # CSS generation
│   │   ├── optimization/         # CSS optimization
│   │   └── fallbacks/            # Browser compatibility
│   └── index.ts                  # Main exports
├── tests/
├── docs/
└── package.json
```

### Core Components

#### 1. Arrangement Engine

```typescript
class ArrangementEngine {
  // Convert user-friendly arrangements to CSS
  private arrangements = {
    flow: new FlowArrangement(), // flex-wrap
    stack: new StackArrangement(), // flex-direction: column
    row: new RowArrangement(), // flex-direction: row
    grid: new GridArrangement(), // CSS Grid
    overlay: new OverlayArrangement(), // position: relative/absolute
    frame: new FrameArrangement(), // frames
  }

  public generateCSS(container: LayoutContainer): CSSProperties {
    const arrangement = this.arrangements[container.arrangement.type]
    return arrangement.toCSS(container)
  }

  public optimizeForPlatform(container: LayoutContainer, platform: 'web' | 'mobile' | 'native'): LayoutContainer {
    // Platform-specific optimizations
    return this.platformOptimizer.optimize(container, platform)
  }
}
```

#### 2. Constraint Solver

```typescript
class ConstraintSolver {
  // Constraint resolution
  public solve(element: LayoutElement, container: LayoutContainer, viewport: Viewport): ResolvedPosition {
    const constraints = element.constraints
    const parentSize = this.getParentSize(element, container)

    return {
      position: this.resolvePosition(constraints, parentSize),
      size: this.resolveSize(constraints, parentSize),
      transform: this.resolveTransform(element),
    }
  }

  private resolvePosition(constraints: ConstraintRule, parentSize: Size): Position {
    // Implement constraint logic
    // Handle pins, centers, and relative positioning
  }
}
```

#### 3. Responsive Manager

```typescript
class ResponsiveManager {
  // Intelligent responsive behavior
  public generateResponsiveCSS(layout: Layout, config: ResponsiveConfig): ResponsiveCSS {
    const breakpoints = this.calculateBreakpoints(layout, config)
    const rules = this.generateRules(layout, breakpoints)

    return {
      base: this.generateBaseCSS(layout),
      mediaQueries: this.generateMediaQueries(rules, breakpoints),
      containerQueries: this.generateContainerQueries(rules),
    }
  }

  private optimizeForMobile(layout: Layout): Layout {
    // Automatic mobile optimizations
    return {
      ...layout,
      arrangements: this.simplifyArrangements(layout.arrangements),
      spacing: this.adjustSpacingForTouch(layout.spacing),
      visibility: this.optimizeVisibility(layout.elements),
    }
  }
}
```

#### 4. Visual Builder Integration

```typescript
interface LayoutBuilderIntegration {
  // Drag and drop
  dragDrop: {
    onDragStart: (element: DragElement) => DragPreview
    onDragOver: (position: Position) => DropPreview
    onDrop: (element: DragElement, position: Position) => Layout
  }

  // Visual controls
  controls: {
    showArrangementPicker: (container: Container) => void
    showConstraintPanel: (element: Element) => void
    showSpacingControls: (selection: Selection) => void
    showResponsivePanel: () => void
  }

  // Real-time preview
  preview: {
    updateLive: (changes: LayoutChange[]) => void
    showImpact: (change: LayoutChange) => ImpactVisualization
    compareStates: (before: Layout, after: Layout) => Comparison
  }

  // AI assistance
  ai: {
    suggestLayout: (content: Content[]) => LayoutSuggestion[]
    improveLayout: (layout: Layout) => Improvement[]
    fixAccessibility: (layout: Layout) => AccessibilityFix[]
  }
}
```

## User Experience Flows

### Flow 1: Quick Layout Creation (Beginner)

1. **Choose arrangement type** → Visual icons show Flow, Stack, Row, Grid
2. **Drop in components** → Smart positioning with automatic spacing
3. **Adjust spacing** → Simple slider with presets (Tight/Normal/Spacious)
4. **Preview mobile** → Automatic responsive optimization applied
5. **Done** → Professional layout in under 2 minutes

### Flow 2: Precision (Advanced)

1. **Create frame** → Container with auto-layout enabled
2. **Set constraints** → Pin elements to edges, set fill/hug behavior
3. **Define relationships** → Elements maintain relative positions
4. **Add responsive rules** → Different constraints per breakpoint
5. **Test and refine** → Live preview across all screen sizes

### Flow 3: Template Customization

1. **Select template** → Industry-specific layout template
2. **AI analyzes content** → Suggests optimal arrangements
3. **One-click optimize** → Spacing, alignment, and responsive behavior
4. **Custom tweaks** → Visual controls for fine-tuning
5. **Export** → Optimized CSS with fallbacks

## Integration Points

### With Visual Builder (`@senka-ai/visual-builder`)

```typescript
// Visual builder uses layout engine
import { LayoutEngine, VisualControls } from '@senka-ai/layout-engine'

const builder = {
  layoutEngine: new LayoutEngine(),
  controls: new VisualControls(),

  onElementDrop: (element, position) => {
    const suggestion = layoutEngine.suggestPlacement(element, position)
    return layoutEngine.applyLayout(suggestion)
  },
}
```

### With AI Engine (`@senka-ai/ai-engine`)

```typescript
// AI engine provides intelligent suggestions
interface AILayoutIntegration {
  analyzeContent: (elements: Element[]) => LayoutSuggestion
  optimizeLayout: (layout: Layout) => OptimizedLayout
  generateFromDescription: (description: string) => Layout
  fixAccessibility: (layout: Layout) => AccessibleLayout
}
```

### With Template Engine (`@senka-ai/template-engine`)

```typescript
// Templates include layout definitions
interface TemplateLayout {
  baseLayout: LayoutDefinition
  variations: LayoutVariation[]
  responsivePresets: ResponsivePreset[]
  customizationPoints: CustomizationPoint[]
}
```

## Performance Optimizations

### CSS Generation

- **Minimal Output**: Generate only necessary CSS
- **Reuse Classes**: Common patterns share CSS classes
- **Smart Defaults**: Leverage browser defaults where possible
- **Tree Shaking**: Remove unused layout code

### Runtime Performance

- **Virtual Layout**: Calculate layouts without DOM manipulation
- **Batch Updates**: Group layout changes for efficiency
- **Lazy Calculation**: Calculate only visible elements
- **Cache Results**: Memoize expensive calculations

## Migration Path

### Phase 1: Core Engine

- Basic arrangements (Stack, Row, Grid)
- Simple constraints
- CSS generation
- Basic responsive

### Phase 2: Visual Integration

- Drag and drop integration
- Visual controls
- Live preview
- Undo/redo system

### Phase 3: Advanced Features

- Constraints
- AI suggestions
- Container queries
- Performance optimization

### Phase 4: Polish & Scale

- Template integration
- Advanced responsive
- Accessibility features
- Cross-platform optimization

## Success Metrics

### User Experience

- **Time to first layout**: < 30 seconds
- **Complex layout creation**: < 5 minutes
- **Modification success rate**: > 95%
- **Mobile optimization**: 100% automatic

### Technical Quality

- **CSS output size**: < 2KB average
- **Lighthouse score**: > 95
- **Accessibility score**: WCAG AA compliant
- **Browser support**: 98%+ coverage

### Platform Integration

- **Visual builder compatibility**: 100%
- **Template system integration**: Seamless
- **AI suggestion accuracy**: > 85%
- **Cross-platform consistency**: 100%

## Conclusion

By implementing this as a dedicated `@senka-ai/layout-engine` package, Senka will have a powerful, flexible, and user-friendly layout system that enables non-technical users to create professional layouts while providing the depth needed for complex applications.
