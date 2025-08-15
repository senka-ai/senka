# Senka Layout Engine: Final Architecture

## Executive Summary

The Senka Layout Engine is a **data-driven layout transformation system** that processes configuration objects into optimized CSS. It serves as the core infrastructure for the Senka platform, converting visual builder actions, AI-generated specifications, and template definitions into production-ready layouts. The engine prioritizes simplicity, serializability, and performance while maintaining the flexibility needed for complex applications.

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

1. **Data-Driven Architecture**: All layouts are serializable configuration objects that can be stored, transmitted, and modified
2. **Single Source of Truth**: One configuration schema serves visual builders, AI generators, and templates
3. **Progressive Complexity**: Simple configurations for basic layouts, advanced options when needed
4. **Platform Agnostic**: Configurations can compile to CSS, React Native styles, or other targets
5. **Modification Safety**: Every change is validated and preview-able before application
6. **Responsive by Default**: Automatic mobile optimization with explicit override capability

## Architecture Overview

### Data Flow Architecture

The layout engine operates as a pure transformation pipeline:

```
Configuration Object → Validation → Optimization → CSS Generation
         ↑                                              ↓
    Visual Builder                                Generated CSS
    AI Generator                                  React Native Styles
    Template System                                  Flutter Widgets
```

Every input is a JSON-serializable configuration object that can be:
- Stored in databases without transformation
- Transmitted over networks efficiently
- Modified through property panels in visual tools
- Generated programmatically by AI systems
- Version controlled in template files

### 1. Configuration Schema

The configuration schema is designed for simplicity and serializability:

```typescript
interface LayoutContainer {
  id: string // Unique identifier for the container
  type: 'flow' | 'stack' | 'row' | 'grid' | 'overlay' | 'frame'
  
  // Layout properties (direct access)
  direction?: 'horizontal' | 'vertical'
  wrap?: boolean
  reverse?: boolean
  
  // Size behavior
  fillContainer?: boolean  // defaults to false (hug-contents)
  fixed?: boolean         // defaults to false
  
  // Spacing (direct properties)
  gap?: SpacingScale | number  // 'normal' | 'tight' | 'spacious' | 16
  padding?: SpacingScale | number | PaddingObject
  
  // Alignment (direct properties)
  align?: 'start' | 'center' | 'end' | 'stretch'  // cross-axis
  justify?: 'packed' | 'space-between' | 'center' | 'space-around'  // main-axis
  
  // Type-specific properties
  columns?: number | 'auto'  // grid
  rows?: number | 'auto'     // grid
  position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'  // overlay
  zIndex?: number           // overlay
  
  // Advanced features (optional complexity)
  constraints?: ConstraintConfig
  relationships?: RelationshipConfig
  responsive?: ResponsiveConfig
  children?: LayoutElement[]
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

### 4. Processing Pipeline

The engine processes configurations through a series of transformation stages:

```typescript
class LayoutEngine {
  // Main transformation pipeline
  process(config: LayoutContainer, options: ProcessOptions): Output {
    // Stage 1: Validation
    const validated = this.validator.validate(config)
    
    // Stage 2: Normalization
    const normalized = this.normalizer.normalize(validated)
    
    // Stage 3: Optimization
    const optimized = this.optimizer.optimize(normalized, options)
    
    // Stage 4: Platform-specific generation
    return this.generator.generate(optimized, options.target)
  }
  
  // Support for different output targets
  generators = {
    css: new CSSGenerator(),
    reactNative: new ReactNativeGenerator(),
    flutter: new FlutterGenerator()
  }
}

interface ProcessOptions {
  target: 'css' | 'react-native' | 'flutter'
  optimize: boolean
  minify: boolean
  responsive: ResponsiveStrategy
  platform: 'web' | 'mobile' | 'desktop'
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

## Configuration API Design

### Factory Functions for Developer Convenience

While the core engine processes pure data objects, factory functions provide type-safe configuration creation:

```typescript
// Simple factory functions that return properly typed configurations
export const layout = {
  stack: (id: string, options?: StackOptions): LayoutContainer => ({
    id,
    type: 'stack',
    direction: 'vertical',
    gap: 'normal',
    ...options
  }),
  
  grid: (id: string, columns: number | 'auto' = 'auto'): LayoutContainer => ({
    id,
    type: 'grid',
    columns,
    gap: 'normal'
  })
}

// Usage remains serializable - no 'as const' needed!
const config = layout.stack('main', { direction: 'horizontal' })
// config is a plain object that can be JSON.stringify'd
```

These factories:
- Return plain, serializable objects
- Provide type safety automatically
- Apply sensible defaults
- Remain optional (direct object creation still works)
- No `as const` assertions needed

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

The arrangement engine transforms configuration objects into platform-specific output:

```typescript
class ArrangementEngine {
  // Pure data transformation - no state, fully deterministic
  private arrangements = {
    flow: new FlowArrangement(),
    stack: new StackArrangement(),
    row: new RowArrangement(),
    grid: new GridArrangement(),
    overlay: new OverlayArrangement(),
    frame: new FrameArrangement(),
  }

  // Transform configuration to CSS (pure function)
  public toCSS(container: LayoutContainer): CSSProperties {
    const arrangement = this.arrangements[container.type]
    return arrangement.transform(container)
  }

  // Configuration remains unchanged, returns new optimized version
  public optimize(container: LayoutContainer, platform: Platform): LayoutContainer {
    return this.optimizer.optimize(container, platform)
  }
}
```

Key principles:
- Pure functions with no side effects
- Input configurations are never mutated
- Output is always serializable
- Deterministic results (same input = same output)

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

#### 4. Integration Layer

The engine provides clear integration points for platform components:

```typescript
interface LayoutEngineAPI {
  // Core transformation
  process(config: LayoutContainer, options?: ProcessOptions): Output
  
  // Validation and analysis
  validate(config: LayoutContainer): ValidationResult
  analyze(config: LayoutContainer): AnalysisReport
  
  // Optimization suggestions
  suggest(config: LayoutContainer): Suggestion[]
  optimize(config: LayoutContainer): LayoutContainer
  
  // Preview generation
  preview(config: LayoutContainer, viewport: Viewport): PreviewData
  diff(before: LayoutContainer, after: LayoutContainer): Diff
}

// Visual Builder Integration
class VisualBuilderAdapter {
  private engine = new LayoutEngine()
  
  // Visual actions generate configuration updates
  onPropertyChange(property: string, value: any) {
    const newConfig = this.updateConfig(this.currentConfig, property, value)
    const preview = this.engine.preview(newConfig, this.viewport)
    this.renderPreview(preview)
  }
  
  // Configurations are serialized for storage
  save() {
    return JSON.stringify(this.currentConfig)
  }
}

// AI Integration
class AILayoutAdapter {
  private engine = new LayoutEngine()
  
  // AI generates configuration objects
  generateFromPrompt(prompt: string): LayoutContainer {
    const config = this.ai.interpret(prompt)
    return this.engine.validate(config).valid ? config : this.fallback
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
// Visual builder generates and modifies configuration objects
import { LayoutEngine } from '@senka-ai/layout-engine'

class VisualBuilder {
  private currentLayout: LayoutContainer
  private engine = new LayoutEngine()

  // User actions modify configuration
  handleDrop(element: Element, position: Position) {
    this.currentLayout = this.modifyLayout(this.currentLayout, {
      action: 'add',
      element,
      position
    })
    
    // Generate CSS for preview
    const css = this.engine.process(this.currentLayout, { target: 'css' })
    this.updatePreview(css)
  }
  
  // Save configuration to database
  save() {
    return this.storage.save(this.currentLayout) // Plain JSON
  }
}
```

### With AI Engine (`@senka-ai/ai-engine`)

```typescript
// AI generates configuration objects from natural language
class AILayoutGenerator {
  generateLayout(prompt: string): LayoutContainer {
    // AI interprets prompt and creates configuration
    return {
      id: 'ai-generated',
      type: 'stack',
      direction: 'vertical',
      fillContainer: true,
      gap: 'normal'
    }
  }
}
```

### With Template Engine (`@senka-ai/template-engine`)

```typescript
// Templates are configuration objects with variables
interface Template {
  name: string
  config: LayoutContainer  // Base configuration
  variables: Variable[]    // Customizable properties
  
  // Apply customizations
  customize(values: Record<string, any>): LayoutContainer {
    return applyVariables(this.config, values)
  }
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

## Architectural Benefits

### Data-Driven Design Advantages

1. **Universal Compatibility**: Configuration objects work everywhere - databases, APIs, files
2. **Platform Agnostic**: Same configuration can generate CSS, React Native, Flutter
3. **Time Travel**: Easy undo/redo by storing configuration history
4. **Collaboration**: Multiple users can modify configurations simultaneously
5. **AI-Friendly**: Simple for AI to generate and understand
6. **Debugging**: Configuration objects are inspectable and understandable

### Simplicity Through Constraints

By focusing on data transformation rather than complex APIs:
- **Reduced Complexity**: One way to represent layouts
- **Clear Mental Model**: Configuration in → Styles out
- **Testability**: Pure functions are easy to test
- **Maintainability**: Less code, fewer abstractions
- **Performance**: Optimizations can focus on transformation speed

## Conclusion

The Senka Layout Engine achieves power through simplicity. By treating layouts as data and focusing on pure transformation functions, it creates a system that is simultaneously:

- **Simple enough** for non-technical users (through visual tools)
- **Flexible enough** for complex applications
- **Efficient enough** for production use
- **Portable enough** for multiple platforms

This data-driven architecture ensures the layout engine remains a stable, reliable foundation for the entire Senka platform, enabling rapid innovation in visual builders, AI generators, and template systems without changing the core engine.
