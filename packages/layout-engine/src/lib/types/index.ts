/**
 * Core type definitions for the Senka Layout Engine
 */

// Basic types
export type ElementId = string
export type Platform = 'web' | 'mobile' | 'native'

// Arrangement types
export type ArrangementType = 'flow' | 'stack' | 'row' | 'grid' | 'overlay' | 'frame'
export type Direction = 'horizontal' | 'vertical'
export type Alignment = 'start' | 'center' | 'end' | 'stretch'
export type Distribution = 'packed' | 'space-between' | 'space-around' | 'space-evenly' | 'center'

// Spacing types
export type SpacingScale = 'none' | 'tight' | 'cozy' | 'normal' | 'comfortable' | 'spacious' | 'custom'
export type SpacingMode = 'packed' | 'distribute' | 'space-between'

export interface SpacingValue {
  scale: SpacingScale
  custom?: number
}

export interface PaddingValue {
  top?: SpacingValue
  right?: SpacingValue
  bottom?: SpacingValue
  left?: SpacingValue
  all?: SpacingValue
}

// Size types
export type SizeBehavior = 'fixed' | 'fill' | 'hug' | 'relative'

export interface Size {
  width?: number
  height?: number
}

export interface Position {
  x: number
  y: number
}

// Constraint types
export interface PinConstraint {
  enabled: boolean
  offset: number | 'auto'
  reference?: 'parent' | 'sibling' | ElementId
}

export interface ConstraintRule {
  left?: PinConstraint
  right?: PinConstraint
  top?: PinConstraint
  bottom?: PinConstraint
  centerH?: boolean
  centerV?: boolean
  width: SizeBehavior
  height: SizeBehavior
  maintainAspectRatio?: boolean
  scaleWithParent?: boolean
}

// Arrangement configuration
export interface ArrangementConfig {
  type: ArrangementType
  direction?: Direction
  wrap?: boolean
  reverse?: boolean
}

// Auto-layout configuration
export interface AutoLayoutConfig {
  mode: 'fixed' | 'hug-contents' | 'fill-container'
  primaryAxis: Distribution
  counterAxis: Alignment
  gap: SpacingValue
  padding: PaddingValue
}

// Constraint configuration
export interface ConstraintConfig {
  horizontal: ConstraintRule
  vertical: ConstraintRule
  aspectRatio?: number | 'preserve'
  minSize?: Size
  maxSize?: Size
}

// Relationship types
export interface PositionRelationship {
  type: 'absolute' | 'relative' | 'sticky'
  reference?: ElementId
}

export interface ElementRelationship {
  id: ElementId
  type: 'follows' | 'precedes' | 'aligns-with' | 'avoids'
  axis?: 'horizontal' | 'vertical' | 'both'
}

export interface LayoutBehavior {
  type: 'auto' | 'manual'
  distribution?: Distribution
  alignment?: Alignment
}

export interface RelationshipConfig {
  parent: PositionRelationship
  siblings: ElementRelationship[]
  children: LayoutBehavior
}

// Responsive types
export type MobileOptimization = 'aggressive' | 'balanced' | 'minimal'
export type ResponsiveBreakpoint = 'mobile' | 'tablet' | 'desktop'

export interface ResponsiveRules {
  stackRowsOnMobile: boolean
  increaseSpacingForTouch: boolean
  simplifyGridsOnMobile: boolean
  hideNonEssentials: boolean
}

export interface LayoutOverride {
  arrangement?: ArrangementConfig
  visibility?: 'show' | 'hide' | 'collapse'
  constraints?: Partial<ConstraintRule>
  spacing?: SpacingOverride
  priority?: number
}

export interface SpacingOverride {
  scale?: SpacingScale
  gap?: SpacingValue
  padding?: PaddingValue
}

export interface ContainerRule {
  minWidth?: number
  maxWidth?: number
  layout: LayoutOverride
}

export interface ResponsiveConfig {
  automatic?: {
    enabled: boolean
    mobileOptimization: MobileOptimization
    breakpoints: 'auto' | number[]
    rules: ResponsiveRules
  }
  breakpointRules?: {
    mobile?: LayoutOverride
    tablet?: LayoutOverride
    desktop?: LayoutOverride
    custom?: Record<number, LayoutOverride>
  }
  containerQueries?: {
    enabled: boolean
    rules: ContainerRule[]
  }
}

// Grid-specific configuration
export interface GridConfig {
  columns: number | 'auto'
  rows?: number | 'auto'
  columnMinWidth?: number
  aspectRatio?: number
  gap?: SpacingValue
}

// Overlay-specific configuration
export interface OverlayConfig {
  position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom'
  zIndex?: number
  backdrop?: boolean
  customPosition?: Position
}

// Main layout container - flattened schema
export interface LayoutContainer {
  id: ElementId
  type: ArrangementType
  
  // Layout properties (formerly in arrangement)
  direction?: Direction
  wrap?: boolean
  reverse?: boolean
  
  // Size behavior (replaces autoLayout.mode)
  fillContainer?: boolean  // defaults to false (hug-contents)
  fixed?: boolean         // defaults to false
  
  // Spacing (direct properties from autoLayout)
  gap?: SpacingValue | SpacingScale | number
  padding?: PaddingValue | SpacingScale | number
  
  // Alignment (direct properties from autoLayout)
  align?: Alignment        // counterAxis alignment
  justify?: Distribution   // primaryAxis distribution
  
  // Type-specific properties
  columns?: number | 'auto'  // grid
  rows?: number | 'auto'     // grid
  position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'  // overlay
  zIndex?: number           // overlay
  
  // Advanced features (unchanged)
  constraints?: ConstraintConfig
  relationships?: RelationshipConfig
  responsive?: ResponsiveConfig
  children?: LayoutElement[]
}

// Layout element
export interface LayoutElement {
  id: ElementId
  type: 'component' | 'container'
  content?: any
  layout?: LayoutContainer
  constraints?: ConstraintRule
  visibility?: 'show' | 'hide' | 'collapse'
}

// CSS generation types
export interface CSSProperties {
  [property: string]: string | number
}

export interface ResponsiveCSS {
  base: string
  mediaQueries: Record<string, string>
  containerQueries?: Record<string, string>
}

// Validation types
export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
}

export interface ValidationError {
  type: string
  message: string
  path?: string
}

export interface ValidationWarning {
  type: string
  message: string
  path?: string
}

// Modification safety types
export interface ModificationPreview {
  before: LayoutContainer
  after: LayoutContainer
  impact: ModificationImpact
}

export interface ModificationImpact {
  affectedElements: ElementId[]
  breakingChanges: Change[]
  performanceImpact: 'none' | 'low' | 'medium' | 'high'
  accessibilityImpact: AccessibilityIssue[]
}

export interface Change {
  type: 'layout' | 'spacing' | 'constraint' | 'responsive'
  element: ElementId
  property: string
  oldValue: any
  newValue: any
}

export interface AccessibilityIssue {
  type: 'contrast' | 'spacing' | 'touch-target' | 'focus'
  severity: 'error' | 'warning'
  message: string
}

// Engine options
export interface LayoutEngineOptions {
  cssOptimization?: boolean
  vendorPrefixes?: boolean
  minify?: boolean
  cache?: boolean
}

// Layout builder integration types
export interface DragElement {
  id: ElementId
  type: string
  content?: any
}

export interface DragPreview {
  element: DragElement
  position: Position
  valid: boolean
  hint?: string
}

export interface DropPreview {
  position: Position
  container: ElementId
  index?: number
  valid: boolean
}

export interface Layout {
  root: LayoutContainer
  elements: Map<ElementId, LayoutElement>
}

export interface LayoutChange {
  type: 'add' | 'remove' | 'update' | 'move'
  element?: LayoutElement
  property?: string
  value?: any
  from?: Position
  to?: Position
}

export interface ImpactVisualization {
  affectedElements: ElementId[]
  highlights: Record<ElementId, string>
  arrows?: Arrow[]
}

// Type guards for specific arrangements
export function isGridContainer(container: LayoutContainer): boolean {
  return container.type === 'grid'
}

export function isStackContainer(container: LayoutContainer): boolean {
  return container.type === 'stack'
}

export function isRowContainer(container: LayoutContainer): boolean {
  return container.type === 'row'
}

export function isFlowContainer(container: LayoutContainer): boolean {
  return container.type === 'flow'
}

export function isOverlayContainer(container: LayoutContainer): boolean {
  return container.type === 'overlay'
}

export function isFrameContainer(container: LayoutContainer): boolean {
  return container.type === 'frame'
}

export interface Arrow {
  from: Position
  to: Position
  type: 'move' | 'affect' | 'dependency'
}

export interface Comparison {
  before: Layout
  after: Layout
  changes: LayoutChange[]
  visualization: ImpactVisualization
}

// AI integration types
export interface Content {
  type: string
  data: any
}

export interface LayoutSuggestion {
  layout: LayoutContainer
  score: number
  reason: string
}

export interface Improvement {
  type: 'spacing' | 'alignment' | 'responsive' | 'accessibility'
  description: string
  apply: () => LayoutContainer
}

export interface AccessibilityFix {
  issue: AccessibilityIssue
  fix: () => LayoutContainer
}

// Resolved types (after constraint solving)
export interface ResolvedPosition {
  position: Position
  size: Size
  transform?: Transform
}

export interface Transform {
  rotate?: number
  scale?: { x: number; y: number }
  translate?: { x: number; y: number }
}

export interface Viewport {
  width: number
  height: number
}
