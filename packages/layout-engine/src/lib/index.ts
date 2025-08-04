/**
 * @senka-ai/layout-engine
 *
 * Intuitive layout system for Senka's no-code platform
 */

// Main engine
export { LayoutEngine } from './engine'

// Arrangements
export {
  BaseArrangement,
  StackArrangement,
  RowArrangement,
  GridArrangement,
  FlowArrangement,
  OverlayArrangement,
  FrameArrangement,
  ArrangementEngine,
} from './core/arrangements'

// Types
export * from './types'

// Utilities
export * from './utils'

// Version
export const VERSION = '0.0.1'
