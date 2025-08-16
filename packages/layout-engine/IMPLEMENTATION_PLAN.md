# Layout Engine Implementation Plan

## Overview

This document outlines the step-by-step implementation plan for the `@senka-ai/layout-engine` package, following the architecture defined in LAYOUT_SYSTEM_FINAL.md.

## Current Implementation Status (January 2025)

### ✅ **COMPLETED - SCHEMA REFACTOR**

- **Flattened schema implementation** - No more `as const` assertions needed
- Package structure and configuration
- Core type definitions with **flat LayoutContainer interface**
- **All six arrangement implementations** (Stack, Row, Grid, Flow, Frame, Overlay)
- ArrangementEngine orchestrator with platform optimization
- **Enhanced spacing utilities** - Supports direct numbers, strings, and objects
- CSS generation utilities
- Build configuration (Vite, TypeScript)
- **Layout showcase integration** - Working demo with new API
- **Validation system updated** for flat schema

### 🚧 In Progress / Future Enhancements

- Constraint system (types defined, solver partially implemented)
- Responsive system (types defined, engine partially implemented)
- Visual control components (Svelte 5)
- CSS optimization and minification
- Container queries support
- Comprehensive testing suite
- Integration with visual builder

### ❌ Deprecated / Removed

- Old nested schema (arrangement.type, autoLayout object)
- `as const` assertion requirements
- Complex nested configuration objects

## Package Setup

### Initial Structure

```
packages/layout-engine/
├── src/
│   ├── lib/
│   │   ├── core/
│   │   │   ├── arrangements/
│   │   │   ├── constraints/
│   │   │   ├── spacing/
│   │   │   └── relationships/
│   │   ├── responsive/
│   │   │   ├── breakpoints/
│   │   │   ├── rules/
│   │   │   └── optimization/
│   │   ├── css/
│   │   │   ├── generator/
│   │   │   ├── optimization/
│   │   │   └── fallbacks/
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── tests/
│   └── stories/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── README.md
└── CHANGELOG.md
```

## Implementation Phases

### Phase 1: Core Foundation (Week 1-2)

#### 1.1 Package Configuration

- [ ] Create package.json with proper dependencies
- [ ] Configure TypeScript with strict mode
- [ ] Set up Vite for building
- [ ] Configure Vitest for testing
- [ ] Set up Storybook for visual testing

#### 1.2 Type Definitions

- [ ] Create core interfaces in `types/index.ts`:
  - `LayoutContainer`
  - `ArrangementType`
  - `ConstraintRule`
  - `SpacingSystem`
  - `ResponsiveEngine`

#### 1.3 Basic Arrangements

- [ ] Implement `StackArrangement` class
- [ ] Implement `RowArrangement` class
- [ ] Implement `GridArrangement` class
- [ ] Create `ArrangementEngine` orchestrator
- [ ] Add CSS generation for each arrangement

#### 1.4 Spacing System

- [ ] Create semantic spacing scale
- [ ] Implement spacing utilities
- [ ] Add responsive spacing adjustments
- [ ] Create spacing validator

### Phase 2: Constraint System (Week 3-4)

#### 2.1 Constraint Types

- [ ] Implement `PinConstraint` interface
- [ ] Create constraint validation
- [ ] Add constraint conflict detection

#### 2.2 Constraint Solver

- [ ] Implement `ConstraintSolver` class
- [ ] Add position resolution logic
- [ ] Add size resolution logic
- [ ] Handle relative constraints

#### 2.3 Relationship Management

- [ ] Create parent-child relationships
- [ ] Implement sibling relationships
- [ ] Add dependency tracking
- [ ] Create relationship validator

### Phase 3: Responsive System (Week 5-6)

#### 3.1 Breakpoint Management

- [ ] Create default breakpoints
- [ ] Implement custom breakpoint support
- [ ] Add breakpoint validation
- [ ] Create breakpoint utilities

#### 3.2 Responsive Rules

- [ ] Implement automatic mobile optimization
- [ ] Create rule override system
- [ ] Add container query support
- [ ] Build responsive preview system

#### 3.3 Mobile Optimization

- [ ] Auto-stack rows on mobile
- [ ] Touch-friendly spacing
- [ ] Grid simplification
- [ ] Performance optimizations

### Phase 4: CSS Generation (Week 7-8)

#### 4.1 CSS Generator

- [ ] Create modular CSS generator
- [ ] Add vendor prefixes
- [ ] Implement CSS optimization
- [ ] Add minification support

#### 4.2 CSS Classes

- [ ] Generate reusable utility classes
- [ ] Create component-specific classes
- [ ] Add responsive modifiers
- [ ] Implement CSS variables

#### 4.3 Browser Compatibility

- [ ] Add fallback generation
- [ ] Create polyfill detection
- [ ] Add feature detection
- [ ] Test cross-browser support

### Phase 5: Visual Controls (Week 9-10)

#### 5.1 Control Components

- [ ] Create ArrangementPicker component
- [ ] Build SpacingSlider component
- [ ] Implement AlignmentGrid component
- [ ] Add DistributionPicker component

#### 5.2 Advanced Controls

- [ ] Build constraint panel
- [ ] Create responsive rules editor
- [ ] Add visual feedback system
- [ ] Implement undo/redo

#### 5.3 Preview System

- [ ] Create live preview component
- [ ] Add device frame previews
- [ ] Implement impact visualization
- [ ] Build comparison views

### Phase 6: Integration & Testing (Week 11-12)

#### 6.1 Package Integration

- [ ] Create public API exports
- [ ] Add TypeScript declarations
- [ ] Write integration examples
- [ ] Create migration guide

#### 6.2 Testing Suite

- [ ] Unit tests for arrangements
- [ ] Integration tests for constraints
- [ ] Visual regression tests
- [ ] Performance benchmarks

#### 6.3 Documentation

- [ ] API documentation
- [ ] Usage examples
- [ ] Storybook stories
- [ ] Best practices guide

## Key Implementation Files

### 1. Core Types (`src/lib/types/index.ts`) - ✅ UPDATED

```typescript
export interface LayoutContainer {
  id: string
  type: 'flow' | 'stack' | 'row' | 'grid' | 'overlay' | 'frame'

  // Layout properties (direct access)
  direction?: 'horizontal' | 'vertical'
  wrap?: boolean
  reverse?: boolean

  // Size behavior
  fillContainer?: boolean
  fixed?: boolean

  // Spacing (direct properties)
  gap?: SpacingScale | number
  padding?: SpacingScale | number | PaddingObject

  // Alignment (direct properties)
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'packed' | 'space-between' | 'center' | 'space-around'

  // Type-specific properties
  columns?: number | 'auto' // grid
  rows?: number | 'auto' // grid
  position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' // overlay
  zIndex?: number // overlay

  // Advanced features (optional)
  constraints?: ConstraintConfig
  relationships?: RelationshipConfig
  responsive?: ResponsiveConfig
  children?: LayoutElement[]
}

// No more nested ArrangementConfig or AutoLayoutConfig!
```

### 2. Arrangement Engine (`src/lib/core/arrangements/engine.ts`)

```typescript
export class ArrangementEngine {
  private arrangements: Map<string, BaseArrangement>

  constructor() {
    this.registerArrangements()
  }

  generateCSS(container: LayoutContainer): CSSProperties {
    // Implementation
  }

  optimizeForPlatform(container: LayoutContainer, platform: Platform): LayoutContainer {
    // Implementation
  }
}
```

### 3. Constraint Solver (`src/lib/core/constraints/solver.ts`)

```typescript
export class ConstraintSolver {
  solve(element: LayoutElement, container: LayoutContainer, viewport: Viewport): ResolvedPosition {
    // Implementation
  }

  private resolvePosition(constraints: ConstraintRule, parentSize: Size): Position {
    // Implementation
  }

  private resolveSize(constraints: ConstraintRule, parentSize: Size): Size {
    // Implementation
  }
}
```

### 4. Responsive Manager (`src/lib/responsive/manager.ts`)

```typescript
export class ResponsiveManager {
  generateResponsiveCSS(layout: Layout, config: ResponsiveConfig): ResponsiveCSS {
    // Implementation
  }

  optimizeForMobile(layout: Layout): Layout {
    // Implementation
  }

  private calculateBreakpoints(layout: Layout, config: ResponsiveConfig): Breakpoint[] {
    // Implementation
  }
}
```

## Testing Strategy

### Unit Tests

- Test each arrangement type individually
- Test constraint resolution logic
- Test spacing calculations
- Test responsive rule application

### Integration Tests

- Test arrangement + constraints together
- Test responsive behavior across breakpoints
- Test CSS generation output
- Test platform optimizations

### Visual Tests

- Storybook stories for each arrangement
- Visual regression tests for layouts
- Interactive control testing
- Responsive preview testing

## Performance Considerations

### Optimization Goals

- CSS output < 2KB for typical layouts
- Layout calculation < 16ms
- No layout shifts during responsive changes
- Minimal reflows during updates

### Caching Strategy

- Cache calculated layouts
- Memoize CSS generation
- Cache breakpoint calculations
- Store resolved constraints

## Dependencies

### Production Dependencies

- None (pure TypeScript/JavaScript)

### Development Dependencies

- `svelte`: ^5.0.0 (peer dependency)
- `typescript`: ^5.3.0
- `vite`: ^5.0.0
- `vitest`: ^1.0.0
- `@storybook/svelte-vite`: ^7.6.0
- `@vitest/ui`: ^1.0.0

## Success Criteria

### Technical Metrics

- [x] **Flattened schema implemented** - No `as const` assertions needed
- [x] **100% TypeScript coverage** for core types
- [x] **Zero nested configuration objects**
- [x] Zero runtime dependencies
- [x] Full browser compatibility
- [ ] > 90% test coverage (future enhancement)
- [ ] <2KB CSS output average (future optimization)

### User Experience Metrics

- [x] **Intuitive API** - `{ type: 'stack', gap: 'normal' }`
- [x] **TypeScript inference** - No type casting required
- [x] **Layout showcase demo** working with new API
- [ ] Arrangement selection < 1 second (future)
- [ ] Live preview updates < 16ms (future)
- [ ] Visual controls intuitive (future)

## ✅ COMPLETED MILESTONES

1. **✅ Schema Refactor**: Flattened LayoutContainer interface
2. **✅ Core Implementation**: All six arrangement types updated
3. **✅ Enhanced Spacing**: Direct number/string/object support
4. **✅ CSS Generation**: Updated for flat properties
5. **✅ Validation**: Updated for new schema
6. **✅ Documentation**: All examples updated to new API
7. **✅ Layout Showcase**: Working demo with new schema

## Next Steps (Future Enhancements)

1. **Visual Controls**: Create Svelte components for controls
2. **Comprehensive Testing**: Full test suite with visual regression
3. **Constraint System**: Complete constraint solver implementation
4. **Responsive Features**: Enhanced breakpoint and mobile optimization
5. **Performance**: CSS optimization and caching
6. **Integration**: Deep integration with visual builder

## Timeline

- **Weeks 1-2**: Core foundation
- **Weeks 3-4**: Constraint system
- **Weeks 5-6**: Responsive features
- **Weeks 7-8**: CSS generation
- **Weeks 9-10**: Visual controls
- **Weeks 11-12**: Integration & polish

Total estimated time: 12 weeks for full implementation
