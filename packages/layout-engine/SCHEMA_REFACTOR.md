# Layout Engine Schema Refactor

## Problem Statement

The current layout engine schema requires `as const` assertions in TypeScript due to nested literal types:

```typescript
// Current - requires as const
const layout = {
  arrangement: { type: 'stack' as const },
  autoLayout: { mode: 'fill-container' as const }
}
```

This creates friction for developers and makes the API more verbose than necessary.

## Root Cause Analysis

The issue stems from **unnecessary nesting** in the configuration schema:

1. **Arrangement nesting**: `arrangement: { type: 'stack' }` - the type determines everything, so why nest?
2. **AutoLayout separation**: `autoLayout: { mode: 'fill-container' }` - why separate from arrangement?
3. **Deep property paths**: Accessing properties requires multiple levels of navigation

## Proposed Solution: Flat Schema

### New Schema Design

```typescript
interface LayoutContainer {
  id: string
  type: 'stack' | 'row' | 'grid' | 'flow' | 'overlay' | 'frame'
  
  // Direction (for stack/row/flow)
  direction?: 'horizontal' | 'vertical'
  wrap?: boolean
  reverse?: boolean
  
  // Layout mode (replaces autoLayout.mode)
  fillContainer?: boolean  // defaults to false (hug-contents)
  fixed?: boolean         // defaults to false
  
  // Spacing (direct properties)
  gap?: SpacingScale | number  // 'normal' | 'tight' | 'spacious' | 16
  padding?: SpacingScale | number | PaddingObject
  
  // Alignment (direct properties)
  align?: 'start' | 'center' | 'end' | 'stretch'  // cross-axis
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around'  // main-axis
  
  // Grid-specific
  columns?: number | 'auto'
  rows?: number | 'auto'
  
  // Advanced features (optional complexity)
  constraints?: ConstraintRule
  responsive?: ResponsiveConfig
  
  // Children
  children?: LayoutElement[]
}
```

### Benefits

#### 1. No `as const` Required

```typescript
// Before - requires as const
const layout = {
  arrangement: { type: 'stack' as const },
  autoLayout: { mode: 'fill-container' as const, gap: { scale: 'normal' as const } }
}

// After - just works
const layout = {
  type: 'stack',
  fillContainer: true,
  gap: 'normal'
}
```

#### 2. More Intuitive API

```typescript
// Clear and readable
{
  type: 'grid',
  columns: 3,
  gap: 'normal',
  padding: 'comfortable',
  fillContainer: true
}

// vs old verbose version
{
  arrangement: { type: 'grid' },
  grid: { columns: 3 },
  autoLayout: { 
    mode: 'fill-container',
    gap: { scale: 'normal' },
    padding: { all: { scale: 'comfortable' } }
  }
}
```

#### 3. AI-Friendly Generation

```typescript
// Natural language to configuration is straightforward
"Create a stack with normal spacing" → { type: 'stack', gap: 'normal' }
"Make a 3-column grid that fills the container" → { type: 'grid', columns: 3, fillContainer: true }
```

#### 4. Progressive Complexity

```typescript
// Start simple
{ type: 'stack' }

// Add properties as needed
{ type: 'stack', gap: 'comfortable', fillContainer: true }

// Advanced features when required
{ type: 'stack', gap: 'comfortable', constraints: {...}, responsive: {...} }
```

## Implementation Plan

### Phase 1: Update Type Definitions

```typescript
// layout-engine/src/lib/types/index.ts

// Replace the old interface entirely
export interface LayoutContainer {
  id: string
  type: ArrangementType
  
  // Layout properties
  direction?: Direction
  wrap?: boolean
  reverse?: boolean
  
  // Size behavior
  fillContainer?: boolean
  fixed?: boolean
  
  // Spacing - now direct properties
  gap?: SpacingValue | SpacingScale | number
  padding?: PaddingValue | SpacingScale | number
  
  // Alignment - now direct properties
  align?: Alignment
  justify?: Distribution
  
  // Type-specific
  columns?: number | 'auto'  // grid
  rows?: number | 'auto'     // grid
  position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' // overlay
  
  // Advanced (unchanged)
  constraints?: ConstraintConfig
  responsive?: ResponsiveConfig
  children?: LayoutElement[]
}

// Type guards for specific arrangements
export function isGridContainer(container: LayoutContainer): boolean {
  return container.type === 'grid'
}

export function isStackContainer(container: LayoutContainer): boolean {
  return container.type === 'stack'
}
```

### Phase 2: Update Arrangement Classes

```typescript
// layout-engine/src/lib/core/arrangements/stack.ts

export class StackArrangement extends BaseArrangement {
  toCSS(container: LayoutContainer): CSSProperties {
    const css: CSSProperties = {
      display: 'flex',
      flexDirection: container.direction === 'horizontal' ? 'row' : 'column',
    }
    
    // Handle wrap
    if (container.wrap) {
      css.flexWrap = 'wrap'
    }
    
    // Handle reverse
    if (container.reverse) {
      css.flexDirection = container.direction === 'horizontal' 
        ? 'row-reverse' 
        : 'column-reverse'
    }
    
    // Handle size behavior
    if (container.fillContainer) {
      css.width = '100%'
      css.height = '100%'
    } else if (!container.fixed) {
      // Default is hug-contents
      css.width = 'fit-content'
      css.height = 'fit-content'
    }
    
    // Handle spacing directly
    if (container.gap !== undefined) {
      css.gap = this.resolveSpacing(container.gap)
    }
    
    if (container.padding !== undefined) {
      css.padding = this.resolveSpacing(container.padding)
    }
    
    // Handle alignment
    if (container.align) {
      css.alignItems = this.mapAlignment(container.align)
    }
    
    if (container.justify) {
      css.justifyContent = this.mapJustification(container.justify)
    }
    
    return css
  }
  
  private resolveSpacing(value: SpacingValue | SpacingScale | number): string {
    if (typeof value === 'number') return `${value}px`
    if (typeof value === 'string') return SPACING_SCALE[value] + 'px'
    return getSpacingValue(value) + 'px'
  }
}
```

### Phase 3: Update Layout Showcase

```typescript
// packages/layout-showcase/src/routes/stack-demo/+page.svelte

// No more as const needed!
const testContainer = $derived({
  id: 'demo-stack',
  type: 'stack',
  direction,
  fillContainer: true,
  gap: spacing,
  align: alignment,
})

// Even simpler for basic cases
const simpleStack = {
  id: 'simple',
  type: 'stack',
  gap: 'normal'
}
```

## Implementation Strategy

Since the layout-engine is at version 0.0.1 (Alpha) with no external consumers, we can do a **clean refactor** without migration support:

### Direct Refactor Approach

1. **Update Types**: Replace the old schema with the new flattened schema
2. **Update Arrangements**: Modify all arrangement classes to use new schema
3. **Update Tests**: Rewrite tests with new schema
4. **Update Showcase**: Update layout-showcase to use new schema
5. **Update Docs**: Ensure all documentation uses new schema

### No Migration Needed Because:

- **Alpha Stage**: Version 0.0.1 means no production dependencies
- **Internal Only**: All consumers are within the Senka monorepo
- **No Breaking Changes**: No external users to break
- **Clean Slate**: Perfect timing to fix the schema before v1.0

### Implementation Steps

```bash
# Step 1: Update layout-engine types
- Replace LayoutContainer interface with flattened version
- Remove nested arrangement and autoLayout types

# Step 2: Update arrangement implementations
- Modify toCSS methods to use flat properties
- Simplify property access

# Step 3: Update layout-showcase
- Remove all 'as const' assertions
- Use new flat schema

# Step 4: Run tests and fix
- yarn typecheck
- yarn test
```

## Validation Rules

### Type-Specific Property Validation

```typescript
const VALID_PROPERTIES = {
  stack: ['direction', 'wrap', 'reverse', 'gap', 'padding', 'align', 'justify'],
  row: ['wrap', 'reverse', 'gap', 'padding', 'align', 'justify'],
  grid: ['columns', 'rows', 'gap', 'padding'],
  flow: ['direction', 'wrap', 'gap', 'padding'],
  overlay: ['position', 'zIndex'],
  frame: ['padding']
}

function validateContainer(container: LayoutContainerV2): ValidationResult {
  const validProps = VALID_PROPERTIES[container.type]
  const errors = []
  
  // Check for invalid properties
  for (const prop of Object.keys(container)) {
    if (!validProps.includes(prop) && !COMMON_PROPS.includes(prop)) {
      errors.push({
        type: 'invalid-property',
        message: `Property '${prop}' is not valid for type '${container.type}'`
      })
    }
  }
  
  return { valid: errors.length === 0, errors }
}
```

## Performance Considerations

The flattened schema actually improves performance:

1. **Faster property access**: No nested object traversal
2. **Smaller payload size**: Less nesting means smaller JSON
3. **Simpler validation**: Direct property checking
4. **Better caching**: Simpler objects are easier to memoize

## Conclusion

This refactor solves the `as const` problem while making the entire API simpler and more intuitive. The flattened schema:

- Eliminates TypeScript friction
- Reduces configuration verbosity
- Improves developer experience
- Maintains full backward compatibility
- Aligns better with how developers think about layouts

The migration can be done gradually with full backward compatibility, ensuring a smooth transition for all consumers of the layout engine.